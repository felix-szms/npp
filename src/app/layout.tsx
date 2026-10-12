import type { Metadata } from "next";
import "@fontsource-variable/inter";
import "@fontsource-variable/jetbrains-mono";
import "@fontsource-variable/noto-serif-sc";
import "./globals.css";

export const metadata: Metadata = {
  // The localized <title> is rendered by LanguageProvider once the active
  // language is known, so it is deliberately not part of static metadata.
  description:
    "核电站原理 · Nuclear Power Plant Principles — an interactive journey from uranium-235 and nuclear fission through a pressurized water reactor to an illuminated city. 从铀-235 与核裂变出发，途经压水反应堆，直到一座被点亮的城市。",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
