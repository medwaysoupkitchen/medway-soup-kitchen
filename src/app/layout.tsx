import type { Metadata } from "next";
import { Nunito, Nunito_Sans } from "next/font/google";
import { Toaster } from "@/components/ui/sonner";
import "./globals.css";

const nunito = Nunito({
  variable: "--font-nunito",
  subsets: ["latin"],
  weight: ["700", "800", "900"],
});

const nunitoSans = Nunito_Sans({
  variable: "--font-nunito-sans",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "Medway Soup Kitchen CIC | Serving Our Own",
  description:
    "Community-led initiative providing freshly prepared meals to individuals facing hardship across Medway, Kent. Donate, volunteer, or support us today.",
  keywords: [
    "Medway",
    "soup kitchen",
    "CIC",
    "community interest company",
    "food poverty",
    "Kent",
    "volunteer",
    "donate",
    "Chatham",
    "Gillingham",
    "Rochester",
    "Street Angels",
  ],
  openGraph: {
    title: "Medway Soup Kitchen CIC | Serving Our Own",
    description:
      "Built by local people. Supporting local people. Freshly cooked meals distributed every week to those in need across Medway.",
    type: "website",
    locale: "en_GB",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${nunito.variable} ${nunitoSans.variable} antialiased`}
      >
        {children}
        <Toaster position="top-right" richColors />
      </body>
    </html>
  );
}
