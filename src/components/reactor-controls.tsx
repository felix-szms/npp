"use client";

import { useEffect, useRef } from "react";
import {
  REACTOR_PART_IDS,
  REACTOR_PARTS,
  REACTOR_ANNOTATIONS,
  type ReactorStage,
} from "@/lib/reactor";
import {
  ZH_REACTOR_CHAPTERS,
  ZH_REACTOR_PARTS,
  ZH_REACTOR_HOTSPOT_NOTES,
  ZH_REACTOR_ANNOTATIONS,
} from "@/lib/zh";
import type { ReactorController } from "./use-reactor";
import { useLanguage } from "./language-provider";

const chapters: Record<
  ReactorStage,
  { number: string; title: string; text: string }
> = {
  pellet: {
    number: "01 / THE PELLET",
    title: "One event.\nA larger world.",
    text: "We are changing scale. Fission happens within a ceramic uranium dioxide pellet.",
  },
  rod: {
    number: "02 / THE FUEL ROD",
    title: "A story,\nrepeated.",
    text: "Pellets are stacked inside sealed metal tubes. Together, fuel rods form an assembly.",
  },
  core: {
    number: "03 / THE CORE",
    title: "A new\nperspective.",
    text: "Fuel, neutron absorbers and circulating water, held within a steel pressure vessel.",
  },
  ready: {
    number: "03 — Reactor",
    title: "Inside\nthe reactor.",
    text: "Extreme conditions.\nExtraordinary purpose.\nA closer look at how fission heat\nbegins a much larger journey.",
  },
};

const hotspotNotes = {
  fuel: "Uranium fuel generates heat through fission",
  control: "Absorb neutrons to regulate the reaction",
  coolant: "Pressurized water carries heat to a separate circuit",
};

export function ReactorHotspots({
  reactor,
  fallback,
}: {
  reactor: ReactorController;
  fallback: boolean;
}) {
  const { t, language } = useLanguage();
  const parts = language === "zh" ? ZH_REACTOR_PARTS : REACTOR_PARTS;
  return (
    <div
      className={`reactor-hotspots${fallback ? " is-illustrated" : ""}`}
      hidden={reactor.stage !== "ready"}
      aria-label={t("Explore the reactor")}
      data-selected={reactor.selected ?? "none"}
    >
      {!fallback && (
        <div
          className="reactor-camera-controls"
          role="group"
          aria-label={t("Reactor camera")}
        >
          <button
            aria-label={t("Zoom out of the reactor")}
            onClick={() => reactor.zoomView(1 / 1.35)}
          >
            −
          </button>
          <output
            ref={reactor.zoomLabel}
            aria-label={t("Zoom level")}
            aria-live="off"
          >
            100%
          </output>
          <button
            aria-label={t("Zoom in on the reactor")}
            onClick={() => reactor.zoomView(1.35)}
          >
            +
          </button>
          <button className="reactor-camera-reset" onClick={reactor.resetView}>
            {t("Reset view")}
          </button>
          <span>
            {t(
              "Scroll / pinch to zoom · Drag to explore")}
          </span>
        </div>
      )}
      <p className="sr-only" id="reactor-navigation-help">
        {t(
          "Use the mouse wheel or pinch to zoom. Drag to explore the reactor. With the scene focused, use arrow keys to pan, plus and minus to zoom, and Home to reset.")}
      </p>
      {REACTOR_PART_IDS.map((id, index) => (
        <button
          key={id}
          ref={(node) => {
            reactor.hotspots.current[index] = node;
          }}
          className={`reactor-hotspot hotspot-${id}`}
          aria-label={parts[id].label}
          aria-pressed={reactor.selected === id}
          aria-controls="reactor-detail"
          onClick={() =>
            reactor.setSelected(reactor.selected === id ? null : id)
          }
        >
          <span className="reactor-hotspot-marker" aria-hidden="true">
            {REACTOR_PARTS[id].number}
          </span>
          <span className="hotspot-label">
            {parts[id].label}
            <small className="reactor-hotspot-note" aria-hidden="true">
              {language === "zh"
                ? ZH_REACTOR_HOTSPOT_NOTES[id]
                : t(hotspotNotes[id])}
            </small>
          </span>
        </button>
      ))}
      {reactor.selected && (
        <div
          ref={reactor.label}
          className={`reactor-object-label label-${reactor.selected}`}
          aria-hidden="true"
        >
          {parts[reactor.selected].detail}
        </div>
      )}
      {!fallback &&
        !reactor.selected &&
        REACTOR_ANNOTATIONS.map((annotation, index) => (
          <div
            key={annotation.label}
            ref={(node) => {
              reactor.annotations.current[index] = node;
            }}
            className={`reactor-annotation annotation-${annotation.side}`}
            aria-hidden="true"
          >
            {language === "zh" ? (
              ZH_REACTOR_ANNOTATIONS[annotation.label].label
            ) : (
              t(annotation.label)
            )}
            <small>
              {language === "zh" ? (
                ZH_REACTOR_ANNOTATIONS[annotation.label].detail
              ) : (
                <>{t(annotation.detail)}</>
              )}
            </small>
          </div>
        ))}
    </div>
  );
}

export function ReactorControls({
  reactor,
  onReturn,
  onReplay,
  onContinue,
}: {
  reactor: ReactorController;
  onReturn: () => void;
  onReplay: () => void;
  onContinue: () => void;
}) {
  const { t, language } = useLanguage();
  const heading = useRef<HTMLHeadingElement>(null);
  const chapter = (language === "zh" ? ZH_REACTOR_CHAPTERS : chapters)[
    reactor.stage
  ];
  const parts = language === "zh" ? ZH_REACTOR_PARTS : REACTOR_PARTS;
  const part = reactor.selected ? parts[reactor.selected] : null;
  useEffect(() => {
    heading.current?.focus({ preventScroll: true });
  }, [reactor.run]);

  return (
    <>
      <button className="reaction-back" onClick={onReturn}>
        <span aria-hidden="true">←</span>{" "}
        {t("Return to fission")}
      </button>
      <div
        className="reactor-copy"
        data-stage={reactor.stage}
        data-selected={reactor.selected ?? "none"}
      >
        <div id="reactor-detail" aria-live="polite" aria-atomic="true">
          <p className="section-kicker">
            {part
              ? `${part.number} / ${part.label.toLocaleUpperCase(language)}`
              : chapter.number}
          </p>
          <h1 id="reactor-title" ref={heading} tabIndex={-1}>
            {part?.title ?? chapter.title}
          </h1>
          <p className="reactor-description">
            {part?.description ?? chapter.text}
          </p>
          {part && <p className="reactor-detail-note">{part.note}</p>}
        </div>
        <div className="reactor-actions">
          {reactor.stage === "ready" && (
            <button
              id="power-entry"
              className="reaction-action reactor-entry"
              onClick={onContinue}
            >
              {reactor.selected === "coolant"
                ? t("Follow the coolant")
                : t("Power the city")}{" "}
              <span aria-hidden="true">↗</span>
            </button>
          )}
          {reactor.stage === "ready" && (
            <button className="reaction-action" onClick={onReplay}>
              {t("Replay this view")}{" "}
              <span aria-hidden="true">↺</span>
            </button>
          )}
          {part && (
            <button
              className="reactor-overview"
              onClick={() => {
                reactor.hotspots.current[
                  REACTOR_PART_IDS.indexOf(reactor.selected!)
                ]?.focus({ preventScroll: true });
                reactor.setSelected(null);
              }}
            >
              {t("Overview")} <span aria-hidden="true">×</span>
            </button>
          )}
          {reactor.stage !== "ready" && (
            <span className="reactor-scale">
              ATOM <span>→</span> {t("PELLET")} <span>→</span>{" "}
              {t("CORE")}
            </span>
          )}
        </div>
        <p className="reactor-note">
          {t(
            "Conceptual · not to scale. Cut surfaces reveal the interior.")}
          <br />
          {reactor.stage === "ready"
            ? t(
                "Flow, heat and component counts are illustrative.")
            : t(
                "This is a change of scale, not a transformation of fission products.")}
        </p>
        {reactor.stage === "ready" && (
          <span className="reactor-source">
            {t("Scientific reference: U.S. NRC")}
          </span>
        )}
      </div>
    </>
  );
}
