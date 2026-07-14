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
  title: "توهاتسو MFS150A — قوة 150 حصان لأعمال البحر | توهاتسو أرابيا",
  description:
    "محرك توهاتسو MFS150A الجديد بقوة 150 حصان: الأخف في فئته، عزم 4-2-1، حقن إلكتروني EFI، ومولّد 41 أمبير. مناسب لقوارب الرحلات والتأجير والنزهات الطويلة. اطلب عرض سعر عبر واتساب.",
  keywords: [
    "توهاتسو 150",
    "MFS150A",
    "محرك قارب 150 حصان",
    "محركات توهاتسو السعودية",
    "محرك رحلات بحرية",
    "محرك قارب تأجير",
  ],
  openGraph: {
    title: "توهاتسو MFS150A — قوة تدفع رحلتك للأمام",
    description:
      "150 حصان بقوة سلسة، وزن هو الأخف في فئته، واقتصاد يخدم أعمال الرحلات البحرية والتأجير.",
    images: [
      {
        url: "/og.png",
        width: 1730,
        height: 909,
        alt: "توهاتسو MFS150A — قوة تدفع رحلتك للأمام",
      },
    ],
    locale: "ar_SA",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "توهاتسو MFS150A — قوة تدفع رحلتك للأمام",
    description: "محرك 150 حصان الجديد لأعمال الرحلات البحرية والتأجير.",
    images: ["/og.png"],
  },
};

export const viewport: Viewport = {
  themeColor: "#020B14",
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
