"use client";

import { useEffect, useRef } from "react";
import { CITY_PLACES, POWER_PART_IDS, POWER_PARTS } from "@/lib/power";
import {
  ZH_POWER_PARTS,
  ZH_CITY_PLACES,
  ZH_SOURCE_PREFIX,
} from "@/lib/zh";
import type { PowerController } from "./use-power";
import { useLanguage } from "./language-provider";

export function PowerHotspots({
  power,
  fallback,
}: {
  power: PowerController;
  fallback: boolean;
}) {
  const { t, language } = useLanguage();
  const parts = language === "zh" ? ZH_POWER_PARTS : POWER_PARTS;
  const places = language === "zh" ? ZH_CITY_PLACES : CITY_PLACES;
  return (
    <>
      <div
        className={`power-hotspots${fallback ? " is-illustrated" : ""}`}
        hidden={
          power.stage !== "ready" || power.transfer !== null || power.roomOpen
        }
        aria-label={t(
          "Explore the energy journey")}
        data-city={
          !power.roomOpen &&
          power.stage === "ready" &&
          (!power.selected || power.selected === "city")
            ? ""
            : undefined
        }
      >
        {POWER_PART_IDS.map((id, index) => (
          <button
            key={id}
            ref={(node) => {
              power.hotspots.current[index] = node;
            }}
            className={`reactor-hotspot power-hotspot power-hotspot-${id}`}
            aria-label={parts[id].label}
            aria-pressed={power.selected === id}
            aria-controls="power-detail"
            onClick={() => {
              if (power.selected === id) power.setCityPlace(null);
              power.setSelected(power.selected === id ? null : id);
            }}
          >
            <span>{POWER_PARTS[id].number}</span>
            <span className="hotspot-label">{parts[id].label}</span>
          </button>
        ))}
        <button
          ref={power.roomHotspot}
          className="control-room-entry"
          aria-label={t("Enter the control room")}
          aria-controls="power-detail"
          aria-expanded={power.roomOpen}
          onClick={power.enterRoom}
        >
          <span aria-hidden="true">⌖</span>
          <span>
            {t("Control room")}
            <small>{t("Enter & explore ↗")}</small>
          </span>
        </button>
        {power.stage === "ready" &&
          !power.transfer &&
          (!power.selected || power.selected === "city") && (
            <div
              className="city-exploration"
              role="group"
              aria-label={t(
                "Explore the illuminated city")}
            >
              <button
                aria-pressed={power.cityPlace === "home"}
                onClick={() => power.exploreCity("home")}
              >
                {t("Home")}
              </button>
              <button
                aria-pressed={power.cityPlace === "hospital"}
                onClick={() => power.exploreCity("hospital")}
              >
                {t("Hospital")}
              </button>
              <button
                aria-pressed={power.cityPlace === null}
                onClick={() => power.exploreCity(null)}
              >
                {t("Neighborhood")}
              </button>
            </div>
          )}
        {!fallback && (
          <div
            className="city-camera-controls"
            role="group"
            aria-label={t("City camera")}
          >
            <button
              aria-label={t("Zoom out of the city")}
              onClick={() => power.zoomCity(1 / 1.35)}
            >
              −
            </button>
            <output
              ref={power.zoomLabel}
              aria-label={t("Zoom level")}
            >
              100%
            </output>
            <button
              aria-label={t("Zoom in on the city")}
              onClick={() => power.zoomCity(1.35)}
            >
              +
            </button>
            <button className="city-camera-reset" onClick={power.resetCityView}>
              {t("Reset view")}
            </button>
            <span>
              {t(
                "Scroll to zoom · Drag to explore")}
            </span>
          </div>
        )}
      </div>
      <p className="sr-only" id="city-navigation-help">
        {t(
          "Use the mouse wheel or pinch to zoom. Drag to move around the city. With the scene focused, use arrow keys to pan, plus and minus to zoom, and Home to reset.")}
      </p>
      {power.labelPlace && !power.roomOpen && (
        <div
          ref={power.cityLabel}
          className={`city-object-label${fallback ? " is-illustrated" : ""}`}
          aria-hidden="true"
        >
          {places[power.labelPlace].label}
        </div>
      )}
    </>
  );
}

export function PowerControls({
  power,
  onReturn,
  onReplay,
}: {
  power: PowerController;
  onReturn: () => void;
  onReplay: () => void;
}) {
  const { t, language } = useLanguage();
  const heading = useRef<HTMLHeadingElement>(null);
  const wasInside = useRef(false);
  const part = power.transfer
    ? power.transfer === "steaming" ||
      power.transfer === "turbine" ||
      power.transfer === "leaving"
      ? "turbine"
      : "heat"
    : (power.selected ?? (power.stage === "ready" ? "city" : power.stage));
  const transferMoving =
    power.transfer === "following" ||
    power.transfer === "steaming" ||
    power.transfer === "returning";
  const content = (language === "zh" ? ZH_POWER_PARTS : POWER_PARTS)[part];
  const places = language === "zh" ? ZH_CITY_PLACES : CITY_PLACES;
  const place =
    !power.transfer &&
    power.stage === "ready" &&
    power.selected === "city" &&
    power.cityPlace
      ? places[power.cityPlace]
      : null;
  const cityOverview =
    power.stage === "ready" &&
    !power.transfer &&
    (!power.selected || power.selected === "city") &&
    !place;
  useEffect(() => {
    if (!power.transfer) heading.current?.focus({ preventScroll: true });
  }, [power.run, power.transferRun]);
  useEffect(() => {
    if (power.transfer === "reading" || power.transfer === "turbine")
      heading.current?.focus({ preventScroll: true });
  }, [power.transfer]);
  useEffect(() => {
    if (power.roomOpen) heading.current?.focus({ preventScroll: true });
    else if (wasInside.current)
      power.roomHotspot.current?.focus({ preventScroll: true });
    wasInside.current = power.roomOpen;
  }, [power.roomOpen, power.roomHotspot]);
  useEffect(() => {
    if (!power.roomOpen) return;
    const close = (event: KeyboardEvent) => {
      if (event.key === "Escape") power.leaveRoom();
    };
    window.addEventListener("keydown", close);
    return () => window.removeEventListener("keydown", close);
  }, [power.roomOpen, power.leaveRoom]);
  if (power.roomOpen)
    return (
      <>
        <button className="reaction-back" onClick={power.leaveRoom}>
          <span aria-hidden="true">←</span>{" "}
          {t("Return to the energy journey")}
        </button>
        <div className="reactor-copy power-copy control-room-copy">
          <div id="power-detail" aria-live="polite" aria-atomic="true">
            <p className="section-kicker">
              {t(
                "PEOPLE / SYSTEMS / OVERSIGHT")}
            </p>
            <h1 id="power-title" ref={heading} tabIndex={-1}>
              {t("Inside the")}
              <br />
              {t("control room.")}
            </h1>
            <p className="reactor-description">
              {t(
                "Behind the technology, people. Trained teams monitor the plant, follow procedures and oversee its systems.")}
            </p>
            <dl className="control-room-notes">
              <div>
                <dt>{t("Observe")}</dt>
                <dd>
                  {t(
                    "The wall brings the plant’s separate systems into one view.")}
                </dd>
              </div>
              <div>
                <dt>{t("Understand")}</dt>
                <dd>
                  {t(
                    "Workstations help operators review conditions and coordinate their work.")}
                </dd>
              </div>
            </dl>
          </div>
          <button className="reaction-action" onClick={power.leaveRoom}>
            {t("Return to the landscape")}{" "}
            <span aria-hidden="true">↗</span>
          </button>
          <p className="reactor-note">
            {t(
              "Illustrative room and displays. No live data or operating controls.")}
            <br />
            {t(
              "Your journey is preserved. Press Esc to return.")}
          </p>
        </div>
      </>
    );
  return (
    <>
      <button className="reaction-back" onClick={onReturn}>
        <span aria-hidden="true">←</span>{" "}
        {t("Return to reactor")}
      </button>
      <div
        className="reactor-copy power-copy"
        data-stage={power.stage}
        data-transfer={power.transfer ?? "none"}
        data-guided-subject={power.transfer ? part : undefined}
        data-city-beat={power.cityBeat}
        data-city-place={place ? power.cityPlace : "overview"}
        data-overview={cityOverview ? "" : undefined}
      >
        <div id="power-detail" aria-live="polite" aria-atomic="true">
          <p className="section-kicker">
            {power.stage === "ready" && !power.selected && !power.transfer
              ? t(
                  "FROM A SINGLE ATOM TO AN ENTIRE CITY")
              : `${content.number} / ${content.label.toLocaleUpperCase(language)}`}
          </p>
          <h1 id="power-title" ref={heading} tabIndex={-1}>
            {cityOverview ? (
              <>
                {t("From")}
                <br />
                {t("nuclear energy")}
                <br />
                {t("to ")}
                <em>{t("everyday life.")}</em>
              </>
            ) : power.transfer === "following" ? (
              t("Follow the heat.")
            ) : power.transfer === "steaming" ? (
              t("Follow the steam.")
            ) : power.transfer === "returning" ? (
              t("Back to heat transfer.")
            ) : (
              (place?.label ?? content.title)
            )}
          </h1>
          <p className="reactor-description">
            {cityOverview
              ? t(
                  "A controlled chain reaction creates heat. Heat becomes electricity. Electricity powers homes, hospitals and everyday life.")
              : power.transfer === "following"
                ? t(
                    "Pressurized primary water carries heat out of the reactor. Follow its sealed pipe to the steam generator.")
                : power.transfer === "steaming"
                  ? t(
                      "A separate circuit begins here. Steam leaves the steam generator through the secondary line and expands through the turbine, turning its blades.")
                  : power.transfer === "returning"
                    ? t(
                        "Follow the secondary line back to its heat source. We are retracing the camera's route; steam flow does not reverse.")
                    : (place?.description ?? content.description)}
          </p>
          {power.transfer && (
            <p className="reactor-note">
              {power.transfer === "following" ||
              power.transfer === "reading" ? (
                <>
                  {t(
                    "Primary: liquid inside the tubes.")}
                  <br />
                  {t(
                    "Secondary: separate water around the tubes, becoming steam.")}
                </>
              ) : power.transfer === "steaming" ||
                power.transfer === "returning" ? (
                (
                  "Only secondary steam reaches the turbine. Primary water remains in its own sealed circuit.")
              ) : (
                (
                  "The blades turn a shaft. That motion drives the generator; the turbine does not store electricity.")
              )}
            </p>
          )}
        </div>
        {cityOverview && (
          <div className="city-finale">
            <p className="city-closing">
              {t(
                "From the smallest of things, a world of possibilities.")}
            </p>
            <p className="city-signature-links">
              <span>核电站原理 · Nuclear Power Plant</span>
            </p>
          </div>
        )}
        <div className="reactor-actions">
          {power.transfer === "reading" || power.transfer === "turbine" ? (
            <button className="reaction-action" onClick={power.continuePower}>
              {power.transfer === "reading"
                ? t("Continue to turbine")
                : t("Continue to generator")}{" "}
              <span aria-hidden="true">↗</span>
            </button>
          ) : power.transfer ? (
            <span className="reactor-scale">
              {power.transfer === "following" ? (
                <>
                  {t("PRIMARY WATER")} <span>→</span>{" "}
                  {t("HEAT TRANSFER")}
                </>
              ) : power.transfer === "leaving" ? (
                <>
                  {t("MOTION")} <span>→</span>{" "}
                  {t("ELECTRICITY")}
                </>
              ) : power.transfer === "returning" ? (
                t("RETURNING TO HEAT TRANSFER")
              ) : (
                <>
                  {t("SECONDARY STEAM")} <span>→</span>{" "}
                  {t("TURBINE")}
                </>
              )}
            </span>
          ) : power.stage === "ready" ? (
            <button className="reaction-action" onClick={onReplay}>
              {t("Replay this phase")}{" "}
              <span aria-hidden="true">↺</span>
            </button>
          ) : (
            <span className="reactor-scale">
              {t("HEAT")} <span>→</span> {t("MOTION")}{" "}
              <span>→</span> {t("LIGHT")}
            </span>
          )}
          {transferMoving && (
            <button className="reactor-overview" onClick={power.skipTransfer}>
              {power.transfer === "steaming"
                ? t("Skip to turbine")
                : t("Skip to heat transfer")}{" "}
              <span aria-hidden="true">↗</span>
            </button>
          )}
          {(power.transfer === "steaming" || power.transfer === "turbine") && (
            <button className="reactor-overview" onClick={power.returnToHeat}>
              {t("Back to heat transfer")}{" "}
              <span aria-hidden="true">←</span>
            </button>
          )}
          {(power.transfer === "reading" || power.transfer === "turbine") && (
            <button className="reactor-overview" onClick={power.replayTransfer}>
              {t("Replay this route")}{" "}
              <span aria-hidden="true">↺</span>
            </button>
          )}
          {power.selected && !power.transfer && (
            <button
              className="reactor-overview"
              onClick={() => {
                power.hotspots.current[
                  POWER_PART_IDS.indexOf(power.selected!)
                ]?.focus({ preventScroll: true });
                power.setSelected(null);
                power.setCityPlace(null);
              }}
            >
              {t("Overview")} <span aria-hidden="true">×</span>
            </button>
          )}
          {!power.transfer && power.stage !== "ready" && (
            <button
              className="reactor-overview"
              onClick={() => {
                power.finish();
                heading.current?.focus({ preventScroll: true });
              }}
            >
              {t("Skip to illuminated city")}{" "}
              <span aria-hidden="true">↗</span>
            </button>
          )}
        </div>
        <p className="reactor-note">
          {t(
            "Conceptual · not to scale. Flow, speed and output are illustrative.")}
          <br />
          {t(
            "Ancillary systems omitted. Primary water stays in its own circuit.")}
        </p>
        {power.stage === "ready" && (
          <span className="reactor-source">
            {language === "zh"
              ? `${ZH_SOURCE_PREFIX}${content.sourceLabel}`
              : t(
                  `Reference: ${content.sourceLabel}`)}
          </span>
        )}
      </div>
    </>
  );
}
