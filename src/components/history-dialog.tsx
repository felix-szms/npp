"use client";

import { useEffect, useRef } from "react";
import { useLanguage } from "./language-provider";
import { GENERATION_BANDS, HISTORY_ENTRIES } from "@/lib/history";

export function HistoryDialog({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) {
  const { t, language } = useLanguage();
  const dialog = useRef<HTMLDialogElement>(null);
  useEffect(() => {
    if (open && !dialog.current?.open) dialog.current?.showModal();
    else if (!open && dialog.current?.open) dialog.current.close();
  }, [open]);
  return (
    <dialog
      ref={dialog}
      className="about-dialog history-dialog"
      aria-labelledby="history-title"
      onClose={onClose}
      onClick={(event) => {
        if (event.target === event.currentTarget) onClose();
      }}
    >
      <button
        className="dialog-close"
        aria-label={t("Close nuclear history")}
        onClick={onClose}
      >
        ×
      </button>
      <p className="section-kicker">
        {t("Nuclear Power Plant / History")}
      </p>
      <h2 id="history-title">
        {t("From pile to city.")}
        <br />
        <em>{t("Eighty years in one line.")}</em>
      </h2>
      <div className="generation-bands">
        {GENERATION_BANDS.map((band) => (
          <div key={band.label} className="generation-band">
            <p className="generation-label">
              {language === "zh" ? band.labelZh : band.label}
              <span>{band.span}</span>
            </p>
            <p>{language === "zh" ? band.zh : band.en}</p>
          </div>
        ))}
      </div>
      <ol className="history-timeline">
        {HISTORY_ENTRIES.map((entry) => (
          <li
            key={entry.year + entry.en}
            className="history-entry"
            data-region={entry.region}
          >
            <span className="history-year">{entry.year}</span>
            <span className="history-node" aria-hidden="true" />
            <p className="history-text">
              <span className="history-region">
                {entry.region === "shenzhen"
                  ? language === "zh"
                    ? "深圳"
                    : "SHENZHEN"
                  : entry.region === "china"
                    ? language === "zh"
                      ? "中国"
                      : "CHINA"
                    : language === "zh"
                      ? "世界"
                      : "WORLD"}
              </span>
              {language === "zh" ? entry.zh : entry.en}
            </p>
          </li>
        ))}
      </ol>
    </dialog>
  );
}
