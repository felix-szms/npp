"use client";

import Link from "next/link";
import { useLanguage, LanguageSwitcher } from "./language-provider";
import { AtomMark } from "./experience-chrome";

export function SitePageHeader({ current }: { current: "history" | "frontier" }) {
  const { t, language } = useLanguage();
  return (
    <header className="site-page-header">
      <Link href="/" className="page-brand">
        <AtomMark />
        <span className="page-wordmark">
          {t("Nuclear Power Plant Principles")}
          <em>{language === "zh" ? "深圳中学" : "SHENZHEN MIDDLE SCHOOL"}</em>
        </span>
      </Link>
      <nav className="page-nav" aria-label={t("Page navigation")}>
        <Link
          href="/history"
          className={`page-nav-link${current === "history" ? " active" : ""}`}
        >
          {t("History")}
        </Link>
        <Link
          href="/frontier"
          className={`page-nav-link${current === "frontier" ? " active" : ""}`}
        >
          {t("Frontier")}
        </Link>
        <LanguageSwitcher />
      </nav>
    </header>
  );
}
