"use client";

import { useEffect, useRef, useState } from "react";
import { useLanguage } from "./language-provider";

type FusionStage = "idle" | "running" | "done";

const W = 320;
const H = 168;
const CX = W / 2;
const CY = H / 2;

// Animation timeline (seconds): approach 0-1.4, flash 1.4-1.8, products 1.8-3.4.
export function FusionDemo() {
  const { t } = useLanguage();
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const stageRef = useRef<FusionStage>("idle");
  const startRef = useRef(0);
  const rafRef = useRef(0);
  const [stage, setStage] = useState<FusionStage>("idle");
  const reduced = useRef(false);

  useEffect(() => {
    reduced.current = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const dpr = Math.min(2, window.devicePixelRatio || 1);
    canvas.width = W * dpr;
    canvas.height = H * dpr;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    ctx.scale(dpr, dpr);
    draw(ctx, 0, reduced.current ? "done" : "idle");
    return () => cancelAnimationFrame(rafRef.current);
  }, []);

  const run = () => {
    stageRef.current = "running";
    setStage("running");
    startRef.current = performance.now();
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d");
    if (!ctx || !canvas) return;
    const dpr = Math.min(2, window.devicePixelRatio || 1);
    ctx.setTransform(1, 0, 0, 1, 0, 0);
    ctx.scale(dpr, dpr);
    const tick = (now: number) => {
      const elapsed = Math.min((now - startRef.current) / 1000, 3.4);
      draw(ctx, elapsed, "running");
      if (elapsed < 3.4) {
        rafRef.current = requestAnimationFrame(tick);
      } else {
        stageRef.current = "done";
        setStage("done");
      }
    };
    rafRef.current = requestAnimationFrame(tick);
  };

  const start = () => {
    if (reduced.current) {
      stageRef.current = "done";
      setStage("done");
      const ctx = canvasRef.current?.getContext("2d");
      if (ctx) {
        const dpr = Math.min(2, window.devicePixelRatio || 1);
        ctx.setTransform(1, 0, 0, 1, 0, 0);
        ctx.scale(dpr, dpr);
        draw(ctx, 3.4, "done");
      }
      return;
    }
    run();
  };

  return (
    <div className="fusion-demo">
      <canvas ref={canvasRef} width={W} height={H} aria-label={t("Fusion demonstration diagram")} />
      <button
        type="button"
        className="fusion-start"
        onClick={start}
      >
        {stage === "done"
          ? t("Replay fusion")
          : t("Start fusion →")}
      </button>
    </div>
  );
}

function draw(ctx: CanvasRenderingContext2D, elapsed: number, stage: FusionStage) {
  ctx.clearRect(0, 0, W, H);
  ctx.fillStyle = "#0b1017";
  ctx.fillRect(0, 0, W, H);

  // faint energy grid
  ctx.strokeStyle = "rgba(138, 173, 200, 0.08)";
  ctx.lineWidth = 1;
  for (let gx = 0; gx <= W; gx += 32) {
    ctx.beginPath();
    ctx.moveTo(gx, 0);
    ctx.lineTo(gx, H);
    ctx.stroke();
  }
  for (let gy = 0; gy <= H; gy += 32) {
    ctx.beginPath();
    ctx.moveTo(0, gy);
    ctx.lineTo(W, gy);
    ctx.stroke();
  }

  const done = stage === "done" || elapsed >= 3.4;
  const flash = !done && elapsed >= 1.4 && elapsed < 1.8;
  const products = done || elapsed >= 1.8;

  if (flash) {
    const k = (elapsed - 1.4) / 0.4;
    const r = 18 + k * 46;
    const grad = ctx.createRadialGradient(CX, CY, 0, CX, CY, r);
    grad.addColorStop(0, `rgba(240, 212, 164, ${0.95 * (1 - k)})`);
    grad.addColorStop(1, "rgba(240, 212, 164, 0)");
    ctx.fillStyle = grad;
    ctx.beginPath();
    ctx.arc(CX, CY, r, 0, Math.PI * 2);
    ctx.fill();
  }

  if (!products) {
    // D approaches from the left, T from the right.
    const progress = done ? 1 : Math.min(elapsed / 1.4, 1);
    const ease = progress * progress * (3 - 2 * progress);
    const dx = CX - 46 - ease * (CX - 46 - CX + 26);
    const tx = CX + 46 + ease * (CX + 26 - CX - 46);
    drawNucleus(ctx, dx, CY, 11, 1, "#8aadc8", "D");
    drawNucleus(ctx, tx, CY, 12, 2, "#caaa7d", "T");
  } else {
    const travel = done ? 1 : Math.min((elapsed - 1.8) / 1.6, 1);
    // helium-4 drifts up slowly, neutron dashes away fast.
    const hx = CX - 6 + travel * 4;
    const hy = CY - travel * 26;
    drawNucleus(ctx, hx, hy, 13, 4, "#caaa7d", "He-4");
    const nx = CX + 18 + travel * 120;
    const ny = CY + 14 - travel * 34;
    ctx.fillStyle = "#e8eef4";
    ctx.beginPath();
    ctx.arc(nx, ny, 3, 0, Math.PI * 2);
    ctx.fill();
    ctx.strokeStyle = "rgba(232, 238, 244, 0.35)";
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.moveTo(CX + 18, CY + 14);
    ctx.lineTo(nx, ny);
    ctx.stroke();
    ctx.font = "10px ui-monospace, monospace";
    ctx.fillStyle = "#e8eef4";
    ctx.fillText("n", nx + 6, ny + 3);
    // energy label
    ctx.fillStyle = "#caaa7d";
    ctx.font = "11px ui-monospace, monospace";
    ctx.fillText("17.6 MeV", CX + 30, CY - 34 - travel * 6);
  }

  if (stage === "idle" && !done) {
    ctx.fillStyle = "rgba(196, 210, 220, 0.55)";
    ctx.font = "10px ui-monospace, monospace";
    ctx.textAlign = "center";
    ctx.fillText("2H + 3H → 4He + n", CX, H - 14);
    ctx.textAlign = "left";
  }
}

function drawNucleus(
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number,
  radius: number,
  nucleons: number,
  color: string,
  label: string,
) {
  const positions = [
    [-0.34, -0.28],
    [0.36, -0.22],
    [-0.3, 0.34],
    [0.32, 0.36],
    [0, 0],
  ];
  ctx.fillStyle = color;
  for (let i = 0; i < nucleons; i++) {
    const [ox, oy] = positions[i % positions.length];
    ctx.beginPath();
    ctx.arc(x + ox * radius, y + oy * radius, radius * 0.42, 0, Math.PI * 2);
    ctx.fill();
  }
  ctx.strokeStyle = "rgba(9, 13, 18, 0.8)";
  ctx.lineWidth = 1;
  ctx.beginPath();
  ctx.arc(x, y, radius, 0, Math.PI * 2);
  ctx.stroke();
  ctx.fillStyle = "#0a0e13";
  ctx.font = "bold 9px ui-monospace, monospace";
  ctx.textAlign = "center";
  ctx.fillText(label, x, y + 3);
  ctx.textAlign = "left";
}
