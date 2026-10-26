"use client";

import Link from "next/link";
import { useLanguage, LanguageSwitcher } from "./language-provider";
import { AtomMark } from "./experience-chrome";

export function SitePageHeader({ current }: { current: "history" | "frontier" }) {
  const { t, language } = useLanguage();
  return (
    <header className="site-page-header">
      <Link href="/" className="wordmark page-brand">
        <AtomMark className="brand-symbol" />
        <span className="wordmark-text">
          <span className="wordmark-main">
            {language === "zh" ? "核电站原理" : "Nuclear Power Plant"}
          </span>
          <span className="wordmark-alt">
            {language === "zh" ? "深圳中学" : "SHENZHEN MIDDLE SCHOOL"}
          </span>
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
