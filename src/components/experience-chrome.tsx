"use client";

import { useEffect } from "react";
import { ISOTOPE } from "@/lib/nucleus";
import { JourneyNavigation } from "./journey-navigation";
import { LanguageSwitcher, useLanguage } from "./language-provider";
import type { JourneyController, JourneyPhase } from "./use-journey";

export function AtomMark({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 32 32" aria-hidden="true">
      <ellipse
        cx="16"
        cy="16"
        rx="13"
        ry="5.4"
        transform="rotate(28 16 16)"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.1"
        opacity="0.75"
      />
      <ellipse
        cx="16"
        cy="16"
        rx="13"
        ry="5.4"
        transform="rotate(-28 16 16)"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.1"
        opacity="0.75"
      />
      <circle cx="16" cy="16" r="3.1" fill="currentColor" />
      <circle cx="26.8" cy="10.2" r="1.7" fill="currentColor" />
      <circle cx="5.2" cy="21.8" r="1.7" fill="currentColor" opacity="0.55" />
    </svg>
  );
}

export function ExperienceHeader({
  journey,
  available,
  onNavigate,
  onHome,
  audio,
}: {
  journey: JourneyController;
  available: boolean[];
  onNavigate: (phase: JourneyPhase) => void;
  onHome: () => void;
  audio: { enabled: boolean; available: boolean; toggle: () => void };
}) {
  const { t, language } = useLanguage();
  return (
    <header className="site-header">
      <div className="brand">
        <a
          className="wordmark"
          href="/"
          aria-label={t("Nuclear Power Plant home")}
          onClick={(event) => {
            event.preventDefault();
            onHome();
          }}
        >
          <AtomMark className="brand-symbol" />
          <span className="wordmark-text">
            <span className="wordmark-main">
              {language === "zh" ? "核电站原理" : "Nuclear Power Plant"}
            </span>
            <span className="wordmark-alt">
              {language === "zh" ? "Nuclear Power Plant" : "核电站原理"}
            </span>
          </span>
        </a>
      </div>
      <JourneyNavigation
        journey={journey}
        available={available}
        onNavigate={onNavigate}
      />
      <LanguageSwitcher />
      <button
        type="button"
        className="sound-control"
        aria-label={
          audio.enabled
            ? t("Turn sound design off")
            : t("Turn sound design on")
        }
        title={t("Optional sound design")}
        aria-pressed={audio.enabled}
        disabled={!audio.available}
        onClick={audio.toggle}
      >
        <svg
          width="18"
          height="18"
          viewBox="0 0 24 24"
          fill="none"
          aria-hidden="true"
        >
          <path
            d="m11 5-5 4H3v6h3l5 4V5Z"
            stroke="currentColor"
            strokeWidth="1.3"
            strokeLinejoin="round"
          />
          <path
            d={
              audio.enabled
                ? "M15 8a6 6 0 0 1 0 8m3-11a10 10 0 0 1 0 14"
                : "m16 9 6 6m0-6-6 6"
            }
            stroke="currentColor"
            strokeWidth="1.3"
            strokeLinecap="round"
          />
        </svg>
      </button>
    </header>
  );
}

export function MotionControl({
  phase,
  playing,
  reducedMotion,
  unavailable,
  guided,
  onToggle,
}: {
  phase: JourneyPhase;
  playing: boolean;
  reducedMotion: boolean;
  unavailable: boolean;
  guided: boolean;
  onToggle: () => void;
}) {
  const { t } = useLanguage();
  return (
    <button
      className="motion-control"
      data-guided={guided ? "" : undefined}
      aria-label={
        phase === 3
          ? playing
            ? t("Pause city motion")
            : t("Resume city motion")
          : phase === 2
            ? playing
              ? t("Pause reactor motion")
              : t("Resume reactor motion")
            : phase === 1
              ? playing
                ? t("Pause reaction")
                : t("Resume reaction")
              : playing
                ? t("Pause rotation")
                : t("Resume rotation")
      }
      aria-pressed={!playing}
      disabled={reducedMotion || unavailable}
      onClick={onToggle}
    >
      <svg
        width="14"
        height="14"
        viewBox="0 0 24 24"
        fill="none"
        aria-hidden="true"
      >
        <path
          d={
            playing && !reducedMotion ? "M9 5v14m6-14v14" : "m9 5 10 7-10 7V5Z"
          }
          stroke="currentColor"
          strokeWidth="1.4"
        />
      </svg>
      <span>
        {playing && !reducedMotion
          ? t("Pause motion")
          : t("Motion paused")}
      </span>
    </button>
  );
}

export function AtomReticle({
  visible,
  animated,
}: {
  visible: boolean;
  animated: boolean;
}) {
  const { t } = useLanguage();
  return (
    <div
      className="atom-reticle"
      hidden={!visible}
      data-motion={animated ? "playing" : "paused"}
    >
      <svg
        className="atom-reticle-ring"
        viewBox="0 0 1000 1000"
        aria-hidden="true"
      >
        <defs>
          <linearGradient id="reticle-stroke" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0" stopColor="var(--amber)" stopOpacity="0.05" />
            <stop offset="0.4" stopColor="var(--amber)" stopOpacity="0.4" />
            <stop offset="0.7" stopColor="var(--blue)" stopOpacity="0.13" />
            <stop offset="1" stopColor="var(--amber)" stopOpacity="0.42" />
          </linearGradient>
        </defs>
        <circle
          cx="500"
          cy="500"
          r="465"
          fill="none"
          stroke="url(#reticle-stroke)"
          strokeWidth="0.8"
        />
        <circle
          className="reticle-motion"
          cx="500"
          cy="500"
          r="465"
          fill="none"
          stroke="var(--amber)"
          strokeWidth="1"
          opacity="0.35"
          pathLength="1000"
          strokeDasharray="34 210 2 92 14 315 2 331"
        />
      </svg>
      <div className="atom-annotation atom-annotation--isotope">
        <i className="annotation-leader" aria-hidden="true" />
        <span>
          {ISOTOPE.protons} {t("PROTONS")}
          <br />
          {ISOTOPE.neutrons} {t("NEUTRONS")}
          <br />
          {t("URANIUM")}–{ISOTOPE.massNumber}
        </span>
      </div>
      <div className="atom-annotation atom-annotation--potential">
        <span>
          {t("NUCLEAR")}
          <br />
          {t("POTENTIAL")}
        </span>
        <i className="annotation-leader" aria-hidden="true" />
      </div>
    </div>
  );
}
