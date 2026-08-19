import type { Metadata } from "next";
import { Inter, Outfit } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
});

const outfit = Outfit({
  subsets: ["latin"],
  variable: "--font-heading",
  display: "swap",
});

/* Single source for the canonical origin. Change it here if the domain moves —
   metadataBase resolves every relative OG/canonical URL on every page. */
export const SITE_URL = "https://www.drawcode.in";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "Drawcode | Premium End-to-End Digital Solutions",
    /* child pages set only their own name; this appends the brand */
    template: "%s | Drawcode",
  },
  description: "Accelerate your digital transformation with Drawcode. We deliver custom software development, high-end web & mobile apps, UI/UX design, cloud services, ERP & CRM solutions, and digital marketing to empower your business.",
  alternates: { canonical: "/" },
  keywords: [
    "Drawcode",
    "Digital Transformation",
    "Website Development",
    "Custom Software Development",
    "Mobile App Development",
    "UI/UX Design",
    "ERP and CRM Solutions",
    "Business Automation",
    "Cloud Services",
    "Digital Marketing",
    "SaaS Development"
  ],
  authors: [{ name: "Drawcode Team" }],
  openGraph: {
    title: "Drawcode | Premium End-to-End Digital Solutions",
    description: "Empowering businesses with custom software, mobile apps, web development, cloud solutions, and business automation.",
    url: SITE_URL,
    type: "website",
    locale: "en_US",
    siteName: "Drawcode",
    /* the image itself comes from app/opengraph-image.tsx */
  },
  twitter: {
    card: "summary_large_image",
    title: "Drawcode | Premium End-to-End Digital Solutions",
    description: "Empowering businesses with custom software, mobile apps, web development, cloud solutions, and business automation.",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, "max-image-preview": "large" },
  },
};

export const viewport = {
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} ${outfit.variable}`}>
      <body>{children}</body>
    </html>
  );
}
