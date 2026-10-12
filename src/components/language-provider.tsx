"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import { ZH_TEXT } from "@/lib/zh";

type Language = "en" | "zh";
type LanguageContextValue = {
  language: Language;
  setLanguage: (language: Language) => void;
  t: (english: string) => string;
};

const LanguageContext = createContext<LanguageContextValue | null>(null);

const TITLES: Record<Language, string> = {
  en: "Nuclear Power Plant Principles · 核电站原理",
  zh: "核电站原理 · Nuclear Power Plant Principles",
};

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, updateLanguage] = useState<Language>("en");

  useEffect(() => {
    try {
      const saved = localStorage.getItem("nuclume-language");
      if (saved === "en" || saved === "zh") {
        updateLanguage(saved);
        return;
      }
      // First visit: follow the browser language.
      const preferred = navigator.language?.toLowerCase() ?? "";
      if (preferred.startsWith("zh")) updateLanguage("zh");
    } catch {}
  }, []);

  useEffect(() => {
    document.documentElement.lang = language === "zh" ? "zh-CN" : language;
    // Next.js metadata re-asserts its own <title> right after hydration;
    // re-apply ours one tick later so the localized title sticks.
    const apply = () => {
      document.title = TITLES[language];
    };
    apply();
    const id = window.setTimeout(apply, 250);
    return () => window.clearTimeout(id);
  }, [language]);

  const setLanguage = useCallback((next: Language) => {
    updateLanguage(next);
    try {
      localStorage.setItem("nuclume-language", next);
    } catch {}
  }, []);
  const t = useCallback(
    (english: string) =>
      language === "zh" ? (ZH_TEXT[english] ?? english) : english,
    [language],
  );
  const value = useMemo(
    () => ({ language, setLanguage, t }),
    [language, setLanguage, t],
  );

  return (
    <LanguageContext.Provider value={value}>
      {/* Sole owner of the document title (layout metadata declares none):
          rendering it keeps React's hoistable in sync with the language. */}
      <title>{TITLES[language]}</title>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) throw new Error("LanguageProvider is missing");
  return context;
}

export function LanguageSwitcher() {
  const { language, setLanguage, t } = useLanguage();
  return (
    <div
      className="language-switcher"
      role="group"
      aria-label={t("Language")}
    >
      <button
        type="button"
        lang="en"
        aria-label="English"
        aria-pressed={language === "en"}
        onClick={() => setLanguage("en")}
      >
        EN
      </button>
      <button
        type="button"
        lang="zh-CN"
        aria-label="简体中文"
        aria-pressed={language === "zh"}
        onClick={() => setLanguage("zh")}
      >
        中文
      </button>
    </div>
  );
}
