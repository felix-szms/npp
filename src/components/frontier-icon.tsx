import type { FrontierCard } from "@/lib/frontier";

export function FrontierIcon({ kind }: { kind: FrontierCard["icon"] }) {
  const common = {
    width: 26,
    height: 26,
    viewBox: "0 0 26 26",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: 1.2,
    "aria-hidden": true,
  } as const;
  switch (kind) {
    case "smr":
      return (
        <svg {...common}>
          <rect x="4" y="12" width="7" height="10" rx="1" />
          <rect x="15" y="12" width="7" height="10" rx="1" />
          <path d="M7.5 8v4M18.5 8v4" />
          <path d="M4 5h18" strokeDasharray="2 3" />
        </svg>
      );
    case "htgr":
      return (
        <svg {...common}>
          <path d="M13 3l8.7 5v10L13 23l-8.7-5V8z" />
          <circle cx="13" cy="13" r="2.6" />
          <path d="M13 6.5v4M19 16.5l-3.4-2M7 16.5l3.4-2" />
        </svg>
      );
    case "sfr":
      return (
        <svg {...common}>
          <path d="M5 16c2-2.5 4-2.5 6 0s4 2.5 6 0 3-2 4-1" />
          <path d="M5 11c2-2.5 4-2.5 6 0s4 2.5 6 0 3-2 4-1" opacity="0.55" />
          <circle cx="13" cy="4.5" r="1.6" />
        </svg>
      );
    case "msr":
      return (
        <svg {...common}>
          <path d="M4 17h18M4 20h18" opacity="0.6" />
          <path d="M8 17c0-3 2.2-5 5-5s5 2 5 5" />
          <path d="M13 12V7M11 9l2-2 2 2" />
        </svg>
      );
    case "fusion":
      return (
        <svg {...common}>
          <circle cx="10" cy="13" r="2.4" />
          <circle cx="17" cy="13" r="2.4" />
          <path d="M13 5c3.5 1 5.5 3.5 6 6M13 5c-3.5 1-5.5 3.5-6 6" opacity="0.5" />
          <path d="M19 5.5l.9 2 2 .9-2 .9-.9 2-.9-2-2-.9 2-.9z" />
        </svg>
      );
    case "multi":
      return (
        <svg {...common}>
          <circle cx="13" cy="11" r="3" />
          <path d="M13 4v2M13 16v2M6 11h2M18 11h2M8 6l1.4 1.4M16.6 14.6L18 16M18 6l-1.4 1.4M9.4 14.6L8 16" opacity="0.55" />
          <path d="M5 21h16" strokeDasharray="3 3" />
        </svg>
      );
  }
}
