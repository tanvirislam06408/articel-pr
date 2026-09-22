import type { Metadata } from "next";
import { Noto_Serif_Bengali, Hind_Siliguri, Geist_Mono } from "next/font/google";
import "./globals.css";

const notoSerifBengali = Noto_Serif_Bengali({
  variable: "--font-serif-bn",
  subsets: ["bengali", "latin"],
  weight: ["400", "500", "600", "700", "900"],
  display: "swap",
});

const hindSiliguri = Hind_Siliguri({
  variable: "--font-sans-bn",
  subsets: ["bengali", "latin"],
  weight: ["300", "400", "500", "600", "700"],
  display: "swap",
});

const geistMono = Geist_Mono({
  variable: "--font-mono-code",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "মনন | সচেতন জীবন, গভীর মনোযোগ ও ডিজিটাল সুস্থতার সাময়িকী",
  description:
    "ডিজিটাল কোলাহল, পর্দার আসক্তি ও তাৎক্ষণিক তৃপ্তির ঊর্ধ্বে উঠে গভীর মনোযোগ, আত্মনিয়ন্ত্রণ ও অর্থপূর্ণ জীবন গড়ার চিন্তাশীল বাংলা সাময়িকী।",
  keywords: [
    "ডিজিটাল সুস্থতা",
    "পর্নোগ্রাফি আসক্তি থেকে মুক্তি",
    "মনোযোগ ও ফোকাস",
    "আত্মনিয়ন্ত্রণ",
    "অভ্যাস পরিবর্তন",
    "মানসিক স্বাস্থ্য",
    "মননশীল জীবন",
    "বাংলা প্রবন্ধ",
  ],
  authors: [{ name: "মনন সম্পাদকীয় পরিষদ" }],
  openGraph: {
    title: "মনন — মননশীল জীবন ও ডিজিটাল সুস্থতার সাময়িকী",
    description:
      "নিজের মনোযোগ, অভ্যাস ও ডিজিটাল জীবনকে আরও সচেতনভাবে পরিচালনা করার গভীর বাংলা পাঠ ও দিকনির্দেশনা।",
    type: "website",
    locale: "bn_BD",
  },
  icons: {
    icon: "/favicon.svg",
    shortcut: "/favicon.svg",
    apple: "/logo.svg",
  },
};

import { AuthProvider } from "@/lib/auth-context";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="bn"
      className={`${notoSerifBengali.variable} ${hindSiliguri.variable} ${geistMono.variable} scroll-smooth antialiased`}
    >
      <body className="min-h-screen bg-[#FAF8F5] text-[#181A1B] font-sans selection:bg-[#0E5A44]/15 selection:text-[#0E5A44] transition-colors duration-300">
        <AuthProvider>{children}</AuthProvider>
      </body>
    </html>
  );
}

