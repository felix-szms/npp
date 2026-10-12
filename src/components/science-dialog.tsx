"use client";

import { useEffect, useRef } from "react";
import { useLanguage } from "./language-provider";

function ExternalLinkArrow() {
  return (
    <svg
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="none"
      aria-hidden="true"
    >
      <path
        d="M6 18 18 6M6 6h12v12"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function ScienceDialog({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) {
  const { t } = useLanguage();
  const dialog = useRef<HTMLDialogElement>(null);
  useEffect(() => {
    if (open && !dialog.current?.open) dialog.current?.showModal();
    else if (!open && dialog.current?.open) dialog.current.close();
  }, [open]);
  return (
    <dialog
      ref={dialog}
      className="about-dialog"
      aria-labelledby="about-title"
      onClose={onClose}
      onClick={(event) => {
        if (event.target === event.currentTarget) onClose();
      }}
    >
      <button
        className="dialog-close"
        aria-label={t(
          "Close about the experience")}
        onClick={onClose}
      >
        ×
      </button>
      <p className="section-kicker">
        {t("Nuclear Power Plant / Chapter 01")}
      </p>
      <h2 id="about-title">
        {t("A world within.")}
        <br />
        <em>{t("A world ahead.")}</em>
      </h2>
      <p>
        {t(
          "From a single atom to an entire city — an exploration of the science behind nuclear energy. This first chapter begins with the nucleus of uranium-235.")}
      </p>
      <p>
        {t(
          "Its 92 protons define it as uranium. Add 143 neutrons and you have 235 nucleons, giving this isotope its name.")}
      </p>
      <p>
        {t(
          "The fission fragments are unstable: barium-141 (half-life about 18 minutes) and krypton-92 keep decaying through beta emission into longer chains — the origin of spent fuel's radioactivity.")}
      </p>
      <p className="science-note">
        {t(
          "This is a conceptual model, not a physical simulation. Colors identify particle types; positions, sizes, spacing, and motion are illustrative. The ambient motes are atmosphere, not emitted particles. Electrons are outside this view.")}
      </p>
      <p className="science-note">
        {t(
          "An independent educational and artistic project. This simplified experience is not engineering guidance, a safety analysis or reactor-operator training. Source links do not imply endorsement by the cited organizations.")}
      </p>
      <h3 className="science-subheading">
        {t("By the numbers")}
      </h3>
      <dl className="science-numbers">
        <div>
          <dt>{t("Energy per fission")}</dt>
          <dd>
            {t(
              "≈ 200 MeV (≈ 3.2×10⁻¹¹ J) — hundreds of millions of times the energy of a chemical bond.")}
          </dd>
        </div>
        <div>
          <dt>{t("Mass into energy")}</dt>
          <dd>
            {t(
              "E = mc²: when 1 kg of uranium-235 fissions completely, about 1 gram of mass becomes energy — roughly 2,500 tonnes of coal.")}
          </dd>
        </div>
      </dl>
      <p className="science-note">
        {t(
          "Next: fusion. Light nuclei release even more energy per kilogram when they combine — the other end of the binding-energy curve. The Sun runs on fusion, and tokamaks such as China's EAST are pursuing it on Earth.")}
      </p>
      <p className="science-note">
        {t(
          "References: U.S. NRC (chain reaction, PWR circuits) · U.S. EIA (electricity generation). Citation does not imply endorsement.")}
      </p>
      <a href="/audio/CREDITS.md" target="_blank" rel="noreferrer">
        {t("Sound sources & CC0 licenses")}{" "}
        <ExternalLinkArrow />
      </a>
    </dialog>
  );
}
