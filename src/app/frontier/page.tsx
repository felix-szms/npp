"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { useLanguage, usePageTitles } from "@/components/language-provider";
import { SitePageHeader } from "@/components/site-page-header";
import { FrontierIcon } from "@/components/frontier-icon";
import { FusionDemo } from "@/components/fusion-demo";
import { FRONTIER_CARDS, type FrontierCard } from "@/lib/frontier";

type CategoryFilter = "all" | FrontierCard["category"];

export default function FrontierPage() {
  const { t, language } = useLanguage();
  usePageTitles({
    en: "Frontier Nuclear Energy · Shenzhen Middle School",
    zh: "前沿核能 · 深圳中学",
  });
  const [category, setCategory] = useState<CategoryFilter>("all");
  const [openId, setOpenId] = useState<string | null>(null);

  const categories: { value: CategoryFilter; label: string }[] = useMemo(
    () => [
      { value: "all", label: t("All directions") },
      { value: "fission", label: t("Advanced fission") },
      { value: "smr", label: t("Small modular reactors") },
      { value: "fusion", label: t("Fusion") },
      { value: "nonElectric", label: t("Beyond electricity") },
    ],
    [t],
  );

  const cards = useMemo(
    () =>
      category === "all"
        ? FRONTIER_CARDS
        : FRONTIER_CARDS.filter((c) => c.category === category),
    [category],
  );

  return (
    <div className="page-shell">
      <SitePageHeader current="frontier" />

      <main className="page-main">
        <section className="page-hero">
          <p className="page-kicker">{t("Nuclear Power Plant Principles")}</p>
          <h1>
            {t("Smaller, hotter,")}
            <br />
            <em>{t("cleaner.")}</em>
          </h1>
          <p className="page-lead">
            {t(
              "The pressurized water reactor of chapter three is today's workhorse. These are the directions it is heading — pick a card to open it up, and fire the fusion demo.",
            )}
          </p>
        </section>

        <div
          className="filter-row"
          role="group"
          aria-label={t("Filter directions by category")}
        >
          {categories.map((c) => (
            <button
              key={c.value}
              type="button"
              className={`filter-chip${category === c.value ? " selected" : ""}`}
              aria-pressed={category === c.value}
              onClick={() => setCategory(c.value)}
            >
              {c.label}
            </button>
          ))}
        </div>

        <div className="frontier-grid page-grid">
          {cards.map((card) => {
            const open = openId === card.id;
            return (
              <article
                key={card.id}
                className={`frontier-card page-card${open ? " open" : ""}`}
                data-icon={card.icon}
              >
                <button
                  type="button"
                  className="frontier-card-head"
                  aria-expanded={open}
                  onClick={() => setOpenId(open ? null : card.id)}
                >
                  <h3>
                    <span className="frontier-icon">
                      <FrontierIcon kind={card.icon} />
                    </span>
                    {language === "zh" ? card.titleZh : card.titleEn}
                  </h3>
                  <span className="chevron" aria-hidden="true">
                    {open ? "−" : "+"}
                  </span>
                </button>
                {open ? (
                  <div className="frontier-card-body">
                    <ul>
                      {(language === "zh" ? card.pointsZh : card.pointsEn).map(
                        (p) => (
                          <li key={p}>{p}</li>
                        ),
                      )}
                    </ul>
                    <p className="frontier-status">
                      {language === "zh" ? card.statusZh : card.statusEn}
                    </p>
                    {card.icon === "fusion" ? <FusionDemo /> : null}
                  </div>
                ) : null}
              </article>
            );
          })}
        </div>

        <footer className="page-footer">
          <Link href="/history" className="page-cta ghost">
            {t("← Back to the history")}
          </Link>
          <Link href="/" className="page-cta">
            {t("Back to the interactive journey")}
          </Link>
        </footer>
      </main>
    </div>
  );
}
