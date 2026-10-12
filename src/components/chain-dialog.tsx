"use client";

import { useEffect, useRef, useState } from "react";
import { useLanguage } from "./language-provider";

// Interactive chain-reaction demonstration.
//
// This is an illustrative model, not a physical simulation. Each fission
// releases 2 or 3 neutrons (average ≈ 2.4). Every newborn neutron's fate is
// pre-decided from the control-rod setting so the measured growth factor
// matches the displayed k: cause fission, be absorbed by a control rod, or
// escape the vessel. That keeps the pedagogy exact — at k ≈ 1 each fission
// causes on average one further fission (criticality).

const W = 640;
const H = 400;
const VESSEL = { x: 78, y: 58, w: 484, h: 300 };
const ROD_AREA = 0.44; // fraction of vessel height the rods can reach
const NUCLEUS_R = 7;
const NEUTRON_SPEED = 150; // px/s
const FRAGMENT_SPEED = 90;

type Fate = "fission" | "absorbed" | "escaped";

interface Nucleus {
  x: number;
  y: number;
  split: boolean;
  flash: number;
}
interface Neutron {
  x: number;
  y: number;
  vx: number;
  vy: number;
  gen: number;
  fate: Fate;
}
interface Fragment {
  x: number;
  y: number;
  vx: number;
  vy: number;
  life: number;
}
interface Mark {
  x: number;
  y: number;
  life: number;
  kind: "absorbed" | "escaped";
}

function buildNuclei(): Nucleus[] {
  const nuclei: Nucleus[] = [];
  const cols = 8;
  const rows = 6;
  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < cols; c++) {
      nuclei.push({
        x: VESSEL.x + ((c + 0.5) * VESSEL.w) / cols,
        y: VESSEL.y + VESSEL.h * (0.34 + (0.62 * (r + 0.5)) / rows),
        split: false,
        flash: 0,
      });
    }
  }
  return nuclei;
}

function kFromInsertion(insertion: number) {
  return 2.4 * (1 - (insertion / 100) * 0.85);
}

export function ChainDemoButton() {
  const { t } = useLanguage();
  const [open, setOpen] = useState(false);
  return (
    <>
      <button
        type="button"
        className="reaction-action"
        onClick={() => setOpen(true)}
      >
        {t("Chain reaction")}{" "}
        <span aria-hidden="true">⌗</span>
      </button>
      <ChainDialog open={open} onClose={() => setOpen(false)} />
    </>
  );
}

function ChainDialog({ open, onClose }: { open: boolean; onClose: () => void }) {
  const { t } = useLanguage();
  const dialog = useRef<HTMLDialogElement>(null);
  const canvas = useRef<HTMLCanvasElement>(null);
  const frame = useRef(0);
  const running = useRef(false);
  const [insertion, setInsertion] = useState(30);
  const [running_, setRunning] = useState(false);
  const [stats, setStats] = useState({ gen: 0, fissions: 0, free: 0 });
  const state = useRef({
    nuclei: buildNuclei(),
    neutrons: [] as Neutron[],
    fragments: [] as Fragment[],
    marks: [] as Mark[],
    gen: 0,
    fissions: 0,
    lastTick: 0,
    uiClock: 0,
  });

  useEffect(() => {
    if (open && !dialog.current?.open) dialog.current?.showModal();
    else if (!open && dialog.current?.open) dialog.current.close();
  }, [open]);

  const insertionRef = useRef(insertion);
  insertionRef.current = insertion;

  const reset = () => {
    const s = state.current;
    s.nuclei = buildNuclei();
    s.neutrons = [];
    s.fragments = [];
    s.marks = [];
    s.gen = 0;
    s.fissions = 0;
    // One neutron enters from the left.
    s.neutrons.push({
      x: VESSEL.x - 30,
      y: VESSEL.y + VESSEL.h / 2,
      vx: NEUTRON_SPEED,
      vy: 0,
      gen: 0,
      fate: "fission",
    });
    setStats({ gen: 0, fissions: 0, free: 1 });
  };

  useEffect(() => {
    if (!open) {
      running.current = false;
      setRunning(false);
      cancelAnimationFrame(frame.current);
      return;
    }
    reset();
    const context = canvas.current?.getContext("2d");
    if (!context) return;

    const aim = (n: Neutron, tx: number, ty: number) => {
      const d = Math.hypot(tx - n.x, ty - n.y) || 1;
      n.vx = ((tx - n.x) / d) * NEUTRON_SPEED;
      n.vy = ((ty - n.y) / d) * NEUTRON_SPEED;
    };

    const step = (dt: number) => {
      const s = state.current;
      const k = kFromInsertion(insertionRef.current);

      for (const n of s.neutrons) {
        n.x += n.vx * dt;
        n.y += n.vy * dt;

        if (n.fate === "absorbed") {
          const rodBottom = VESSEL.y + VESSEL.h * ROD_AREA * (insertionRef.current / 100);
          if (n.y <= rodBottom) {
            s.marks.push({ x: n.x, y: n.y, life: 1, kind: "absorbed" });
            n.vx = 0;
            n.vy = 0;
            (n as Neutron & { dead?: boolean }).dead = true;
          }
          continue;
        }
        if (n.fate === "escaped") {
          if (
            n.x < VESSEL.x ||
            n.x > VESSEL.x + VESSEL.w ||
            n.y < VESSEL.y ||
            n.y > VESSEL.y + VESSEL.h
          ) {
            (n as Neutron & { dead?: boolean }).dead = true;
          }
          continue;
        }
        // fated to cause a fission: check for a nucleus hit
        for (const nucleus of s.nuclei) {
          if (nucleus.split) continue;
          if (Math.hypot(n.x - nucleus.x, n.y - nucleus.y) < NUCLEUS_R + 3) {
            nucleus.split = true;
            nucleus.flash = 1;
            s.fissions += 1;
            for (let i = 0; i < 2; i++) {
              const angle = Math.random() * Math.PI * 2;
              s.fragments.push({
                x: nucleus.x,
                y: nucleus.y,
                vx: Math.cos(angle) * FRAGMENT_SPEED,
                vy: Math.sin(angle) * FRAGMENT_SPEED,
                life: 1,
              });
            }
            const count = Math.random() < 0.6 ? 2 : 3; // average ≈ 2.4
            s.gen = Math.max(s.gen, n.gen + 1);
            // Deterministically scale surviving children so growth matches the
            // displayed k: at k ≈ 1 each fission passes the chain to exactly
            // one neutron instead of dying out by small-number chance.
            const fatedCount = Math.min(
              count,
              Math.floor(k) + (Math.random() < k - Math.floor(k) ? 1 : 0),
            );
            const absorbShare = (insertionRef.current / 100) * 0.7;
            for (let i = 0; i < count; i++) {
              const fate: Fate =
                i < fatedCount
                  ? "fission"
                  : Math.random() < absorbShare
                    ? "absorbed"
                    : "escaped";
              const child: Neutron = {
                x: nucleus.x,
                y: nucleus.y,
                vx: 0,
                vy: 0,
                gen: n.gen + 1,
                fate,
              };
              if (fate === "fission") {
                const alive = s.nuclei.filter((x) => !x.split);
                if (alive.length === 0) {
                  child.fate = "escaped";
                } else {
                  const target = alive[Math.floor(Math.random() * alive.length)];
                  aim(child, target.x, target.y);
                }
              } else if (fate === "absorbed") {
                const rodBottom =
                  VESSEL.y + VESSEL.h * ROD_AREA * (insertionRef.current / 100);
                aim(child, child.x + (Math.random() - 0.5) * 200, rodBottom - 8);
              } else {
                const side = Math.random();
                aim(
                  child,
                  side < 0.4
                    ? VESSEL.x + VESSEL.w + 40
                    : side < 0.7
                      ? VESSEL.x - 40
                      : child.x + (Math.random() - 0.5) * 300,
                  side < 0.7
                    ? child.y + (Math.random() - 0.5) * 160
                    : VESSEL.y + VESSEL.h + 40,
                );
              }
              s.neutrons.push(child);
            }
            (n as Neutron & { dead?: boolean }).dead = true;
            break;
          }
        }
      }
      s.neutrons = s.neutrons.filter((n) => !(n as Neutron & { dead?: boolean }).dead);
      for (const f of s.fragments) {
        f.x += f.vx * dt;
        f.y += f.vy * dt;
        f.life -= dt * 0.9;
      }
      s.fragments = s.fragments.filter((f) => f.life > 0);
      for (const m of s.marks) m.life -= dt * 1.4;
      s.marks = s.marks.filter((m) => m.life > 0);
      for (const nucleus of s.nuclei)
        if (nucleus.flash > 0) nucleus.flash = Math.max(0, nucleus.flash - dt * 2.2);
    };

    const draw = () => {
      const s = state.current;
      const dpr = Math.min(2, window.devicePixelRatio || 1);
      const canvasEl = canvas.current!;
      if (canvasEl.width !== W * dpr) {
        canvasEl.width = W * dpr;
        canvasEl.height = H * dpr;
      }
      const ctx = canvasEl.getContext("2d")!;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      ctx.clearRect(0, 0, W, H);

      // vessel
      ctx.strokeStyle = "#3a4a57";
      ctx.lineWidth = 1;
      ctx.strokeRect(VESSEL.x, VESSEL.y, VESSEL.w, VESSEL.h);

      // control rods
      const depth = VESSEL.h * ROD_AREA * (insertionRef.current / 100);
      for (let i = 0; i < 5; i++) {
        const x = VESSEL.x + ((i + 1) * VESSEL.w) / 6;
        ctx.fillStyle = "#5d7f96";
        ctx.fillRect(x - 7, 0, 14, VESSEL.y + depth);
        ctx.fillStyle = "#9edcff";
        ctx.fillRect(x - 7, VESSEL.y + depth - 3, 14, 3);
      }

      // nuclei
      for (const nucleus of s.nuclei) {
        if (nucleus.split) {
          if (nucleus.flash > 0) {
            ctx.strokeStyle = `rgba(240, 212, 164, ${nucleus.flash * 0.8})`;
            ctx.lineWidth = 1.5;
            ctx.beginPath();
            ctx.arc(nucleus.x, nucleus.y, NUCLEUS_R + 6 * (1 - nucleus.flash), 0, Math.PI * 2);
            ctx.stroke();
          }
        } else {
          ctx.fillStyle = "#caaa7d";
          ctx.beginPath();
          ctx.arc(nucleus.x, nucleus.y, NUCLEUS_R, 0, Math.PI * 2);
          ctx.fill();
          ctx.fillStyle = "#0b141b";
          ctx.font = "600 8px sans-serif";
          ctx.textAlign = "center";
          ctx.textBaseline = "middle";
          ctx.fillText("U", nucleus.x, nucleus.y + 0.5);
        }
      }

      // fragments
      for (const f of s.fragments) {
        ctx.fillStyle = `rgba(240, 212, 164, ${f.life * 0.9})`;
        ctx.beginPath();
        ctx.arc(f.x, f.y, 3.5, 0, Math.PI * 2);
        ctx.fill();
      }

      // neutrons (trail + dot, tinted by generation)
      for (const n of s.neutrons) {
        const hue = 200 - Math.min(60, n.gen * 7);
        ctx.strokeStyle = `hsla(${hue}, 70%, 70%, 0.5)`;
        ctx.lineWidth = 1.5;
        ctx.beginPath();
        ctx.moveTo(n.x - n.vx * 0.08, n.y - n.vy * 0.08);
        ctx.lineTo(n.x, n.y);
        ctx.stroke();
        ctx.fillStyle = `hsl(${hue}, 80%, 78%)`;
        ctx.beginPath();
        ctx.arc(n.x, n.y, 3, 0, Math.PI * 2);
        ctx.fill();
      }

      // absorption / escape marks
      for (const m of s.marks) {
        ctx.strokeStyle =
          m.kind === "absorbed"
            ? `rgba(158, 220, 255, ${m.life * 0.8})`
            : `rgba(140, 155, 189, ${m.life * 0.6})`;
        ctx.lineWidth = 1.5;
        ctx.beginPath();
        ctx.arc(m.x, m.y, 4 + (1 - m.life) * 8, 0, Math.PI * 2);
        ctx.stroke();
      }
    };

    const loop = (now: number) => {
      frame.current = requestAnimationFrame(loop);
      const s = state.current;
      if (!s.lastTick) s.lastTick = now;
      const dt = Math.min(0.05, (now - s.lastTick) / 1000);
      s.lastTick = now;
      if (running.current) step(dt);
      s.uiClock += dt;
      if (s.uiClock > 0.15) {
        s.uiClock = 0;
        setStats({ gen: s.gen, fissions: s.fissions, free: s.neutrons.length });
      }
      draw();
    };
    frame.current = requestAnimationFrame(loop);
    return () => {
      cancelAnimationFrame(frame.current);
      running.current = false;
    };
  }, [open]);

  const k = kFromInsertion(insertion);
  const regime =
    k > 1.15
      ? {
          label: t("Supercritical · rapid growth"),
          tone: "super",
        }
      : k >= 0.9
        ? {
            label: t("Critical · steady release"),
            tone: "critical",
          }
        : {
            label: t("Subcritical · the chain dies out"),
            tone: "sub",
          };
  const fuelLeft = 48 - stats.fissions;
  const finished = running_ && stats.free === 0;

  return (
    <dialog
      ref={dialog}
      className="chain-dialog"
      aria-labelledby="chain-title"
      onClose={onClose}
      onClick={(event) => {
        if (event.target === event.currentTarget) onClose();
      }}
    >
      <button
        className="dialog-close"
        aria-label={t(
          "Close chain reaction demo")}
        onClick={onClose}
      >
        ×
      </button>
      <p className="section-kicker">{t("INTERACTIVE")}</p>
      <h2 id="chain-title">{t("Chain reaction")}</h2>
      <p className="chain-intro">
        {t(
          "Each fission releases 2–3 neutrons that can trigger further fissions. Insert the control rods so that, on average, each fission causes exactly one new fission (k ≈ 1). That balance — criticality — is how a reactor sustains steady heat.")}
      </p>
      <div className="chain-stage" data-regime={regime.tone}>
        <canvas ref={canvas} width={W} height={H} role="img" aria-label={t(
          "Animated diagram: uranium nuclei in a vessel; neutrons cause fissions or are absorbed by control rods.")} />
        <div className="chain-readout">
          <span>
            {t("Generation")} <strong>{stats.gen}</strong>
          </span>
          <span>
            {t("Fissions")} <strong>{stats.fissions}</strong>
          </span>
          <span>
            {t("Free neutrons")} <strong>{stats.free}</strong>
          </span>
          <span>
            k <strong>{k.toFixed(2)}</strong>
          </span>
          <span className={`chain-regime chain-regime--${regime.tone}`}>
            {regime.label}
          </span>
        </div>
        {finished && (
          <p className="chain-ended" role="status">
            {fuelLeft === 0
              ? t("All fuel nuclei have fissioned.")
              : t("No free neutrons remain — the chain has stopped.")}
          </p>
        )}
      </div>
      <div className="chain-controls">
        <label>
          {t("Control rod insertion")}
          <input
            type="range"
            min={0}
            max={100}
            value={insertion}
            onChange={(event) => setInsertion(Number(event.target.value))}
          />
          <output>{insertion}%</output>
        </label>
        <button
          type="button"
          className="chain-start"
          onClick={() => {
            reset();
            running.current = true;
            setRunning(true);
          }}
        >
          {t("Start")} <span aria-hidden="true">↻</span>
        </button>
      </div>
      <p className="chain-note">
        {t(
          "Illustrative demonstration · not a physical simulation. Fuel quantity, speeds and probabilities are simplified.")}
      </p>
      <ul className="chain-legend">
        <li>
          <i className="sw sw-nucleus" /> {t("Uranium-235 nucleus")}
        </li>
        <li>
          <i className="sw sw-neutron" /> {t("Neutron")}
        </li>
        <li>
          <i className="sw sw-fragment" /> {t("Fission fragments")}
        </li>
        <li>
          <i className="sw sw-rod" /> {t("Control rod")}
        </li>
      </ul>
    </dialog>
  );
}
