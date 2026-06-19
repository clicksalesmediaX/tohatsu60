import type { Metadata, Viewport } from "next";
import { Alexandria, IBM_Plex_Sans_Arabic } from "next/font/google";
import "./globals.css";
import { MetaPixel } from "@/components/analytics/MetaPixel";

const alexandria = Alexandria({
  variable: "--font-alexandria",
  subsets: ["arabic", "latin"],
  weight: ["400", "600", "700", "800"],
});

const plexArabic = IBM_Plex_Sans_Arabic({
  variable: "--font-plex-arabic",
  subsets: ["arabic", "latin"],
  weight: ["300", "400", "500"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://tohatsuarabia.com"),
  title: "توهاتسو 60 — قوة يابانية لأهل البحر | توهاتسو أرابيا",
  description:
    "محرك توهاتسو 60 حصان — موثوقية يابانية منذ 1922، الأخف وزنًا في فئته، وحقن إلكتروني EFI. صُنع ليكون رفيق الصيادين في مياه المملكة. اطلب عرض سعر من توهاتسو أرابيا.",
  openGraph: {
    title: "توهاتسو 60 — قوة يابانية لأهل البحر",
    description:
      "الأخف وزنًا في فئته، حقن إلكتروني EFI، وموثوقية يابانية منذ 1922 — عبر توهاتسو أرابيا في المملكة.",
    images: ["/images/engine-hero.jpg"],
    locale: "ar_SA",
    type: "website",
  },
};

export const viewport: Viewport = {
  themeColor: "#06131D",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="ar"
      dir="rtl"
      className={`${alexandria.variable} ${plexArabic.variable}`}
    >
      <body>
        <MetaPixel />
        {children}
      </body>
    </html>
  );
}
