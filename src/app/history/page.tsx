"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { useLanguage, usePageTitles } from "@/components/language-provider";
import { SitePageHeader } from "@/components/site-page-header";
import { GENERATION_BANDS, HISTORY_ENTRIES } from "@/lib/history";

type GenFilter = 0 | 1 | 2 | 3 | 4;
type RegionFilter = "world" | "china" | "shenzhen";

export default function HistoryPage() {
  const { t, language } = useLanguage();
  usePageTitles({
    en: "Nuclear History · Shenzhen Middle School",
    zh: "核电简史 · 深圳中学",
  });
  const [gen, setGen] = useState<GenFilter>(0);
  const [regions, setRegions] = useState<RegionFilter[]>([]);

  const toggleRegion = (region: RegionFilter) => {
    setRegions((prev) =>
      prev.includes(region)
        ? prev.filter((r) => r !== region)
        : [...prev, region],
    );
  };

  const visible = useMemo(
    () =>
      HISTORY_ENTRIES.filter(
        (e) =>
          (gen === 0 || e.generation === gen) &&
          (regions.length === 0 || regions.includes(e.region)),
      ),
    [gen, regions],
  );

  const sections = useMemo(
    () =>
      GENERATION_BANDS.map((band, i) => ({
        band,
        genValue: (i + 1) as 1 | 2 | 3 | 4,
        entries: visible.filter((e) => e.generation === i + 1),
      })).filter((s) => s.entries.length > 0),
    [visible],
  );

  useEffect(() => {
    if (
      window.matchMedia("(prefers-reduced-motion: reduce)").matches
    )
      return;
    const nodes = document.querySelectorAll<HTMLElement>(".history-card");
    const observer = new IntersectionObserver(
      (records) => {
        for (const r of records) {
          if (r.isIntersecting) {
            r.target.classList.add("revealed");
            observer.unobserve(r.target);
          }
        }
      },
      { rootMargin: "0px 0px -40px 0px" },
    );
    nodes.forEach((n) => observer.observe(n));
    return () => observer.disconnect();
  }, [gen, regions]);

  const regionLabel: Record<RegionFilter, string> = {
    world: t("World"),
    china: t("China"),
    shenzhen: t("Shenzhen"),
  };

  return (
    <div className="page-shell">
      <SitePageHeader current="history" />

      <main className="page-main">
        <section className="page-hero">
          <p className="page-kicker">{t("Nuclear Power Plant Principles")}</p>
          <h1>
            {t("Eighty years,")}
            <br />
            <em>{t("from pile to city.")}</em>
          </h1>
          <p className="page-lead">
            {t(
              "From a secret pile of graphite in Chicago to the largest nuclear program on Earth — follow the milestones that made nuclear power real, and see where Shenzhen appears on the line.",
            )}
          </p>
        </section>

        <section
          className="generation-bands interactive"
          aria-label={t("Four generations of reactors")}
        >
          {GENERATION_BANDS.map((band, i) => (
            <button
              key={band.label}
              type="button"
              className={`generation-band${gen === i + 1 ? " selected" : ""}`}
              aria-pressed={gen === i + 1}
              onClick={() => setGen(gen === i + 1 ? 0 : ((i + 1) as 1 | 2 | 3 | 4))}
            >
              <p className="generation-label">
                {language === "zh" ? band.labelZh : band.label}
                <span>{band.span}</span>
              </p>
              <p>{language === "zh" ? band.zh : band.en}</p>
            </button>
          ))}
        </section>

        <div
          className="filter-row"
          role="group"
          aria-label={t("Filter milestones by region")}
        >
          {(["world", "china", "shenzhen"] as RegionFilter[]).map((r) => (
            <button
              key={r}
              type="button"
              className={`filter-chip region-${r}${regions.includes(r) ? " selected" : ""}`}
              aria-pressed={regions.includes(r)}
              onClick={() => toggleRegion(r)}
            >
              {regionLabel[r]}
            </button>
          ))}
          {gen !== 0 || regions.length > 0 ? (
            <button
              type="button"
              className="filter-chip reset"
              onClick={() => {
                setGen(0);
                setRegions([]);
              }}
            >
              {t("Show all")}
            </button>
          ) : null}
        </div>

        {sections.length === 0 ? (
          <p className="empty-note">{t("No milestones match the filters.")}</p>
        ) : (
          sections.map(({ band, genValue, entries }) => (
            <section
              key={band.label}
              className="history-section"
              aria-label={`${language === "zh" ? band.labelZh : band.label} · ${band.span}`}
            >
              <header className="history-section-head">
                <span className="section-index">
                  {String(genValue).padStart(2, "0")}
                </span>
                <h2>
                  {language === "zh" ? band.labelZh : band.label}
                  <em>{band.span}</em>
                </h2>
              </header>
              <ol className="history-timeline">
                {entries.map((e) => (
                  <li
                    key={e.year + e.en}
                    className="history-entry history-card"
                    data-region={e.region}
                  >
                    <span className="history-year">{e.year}</span>
                    <span className="history-node" aria-hidden="true" />
                    <p className="history-text">
                      <span className="history-region">
                        {regionLabel[e.region]}
                      </span>
                      {language === "zh" ? e.zh : e.en}
                    </p>
                  </li>
                ))}
              </ol>
            </section>
          ))
        )}

        <footer className="page-footer">
          <Link href="/frontier" className="page-cta">
            {t("Continue to the frontier →")}
          </Link>
          <Link href="/" className="page-cta ghost">
            {t("Back to the interactive journey")}
          </Link>
        </footer>
      </main>
    </div>
  );
}
