import React from "react";
import { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { api, API_BASE_URL } from "@/lib/api";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { ReadingTools } from "@/components/ui/ReadingTools";
import { SocialShare } from "@/components/article/SocialShare";
import { CommentSection } from "@/components/article/CommentSection";
import { ArticleReaderClient } from "./ArticleReaderClient";
import { ArrowLeft, Clock, Calendar, User, Bookmark, Share2 } from "lucide-react";
import { Badge } from "@/components/ui/badge";

interface PageProps {
  params: Promise<{
    slug: string;
  }>;
}

// Dynamic SEO metadata generator
export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  try {
    const res = await fetch(`${API_BASE_URL}/articles/${slug}`, {
      next: { revalidate: 60 },
    });
    if (!res.ok) {
      return {
        title: "লেখা পাওয়া যায়নি | মনন",
      };
    }
    const json = await res.json();
    const article = json.data;

    return {
      title: `${article.title} | মনন সাময়িকী`,
      description: article.excerpt,
      keywords: [article.topicTitle || "মনন", "বাংলা প্রবন্ধ", "ডিজিটাল সুস্থতা", "ডিপ ওয়ার্ক"],
      authors: [{ name: article.author?.name || "মনন সম্পাদকীয় পরিষদ" }],
      openGraph: {
        title: article.title,
        description: article.excerpt,
        type: "article",
        publishedTime: article.createdAt,
        authors: [article.author?.name || "মনন"],
        locale: "bn_BD",
      },
      twitter: {
        card: "summary_large_image",
        title: article.title,
        description: article.excerpt,
      },
    };
  } catch {
    return {
      title: "মনন | সচেতন জীবনের সাময়িকী",
    };
  }
}

async function getArticleData(slug: string) {
  try {
    const res = await fetch(`${API_BASE_URL}/articles/${slug}`, {
      next: { revalidate: 60 },
    });
    if (!res.ok) return null;
    const json = await res.json();
    return json.data;
  } catch (err) {
    console.error("Error fetching article in SSR:", err);
    return null;
  }
}

export default async function ArticlePage({ params }: PageProps) {
  const { slug } = await params;
  const article = await getArticleData(slug);

  if (!article) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-[#FAF8F5] text-[#181A1B] flex flex-col font-sans transition-colors duration-300">
      <ReadingTools />
      <Header />

      <main className="flex-1 w-full max-w-4xl mx-auto px-4 sm:px-6 py-8 md:py-12">
        {/* Navigation Breadcrumb */}
        <div className="flex items-center justify-between gap-4 mb-8">
          <Link
            href="/"
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-stone-500 hover:text-[#008767] transition-colors group"
          >
            <ArrowLeft className="w-3.5 h-3.5 transition-transform group-hover:-translate-x-1" />
            <span>মূল পাতায় ফিরে যান</span>
          </Link>

          {article.topicTitle && (
            <Badge variant="emerald" className="text-xs">
              {article.topicTitle}
            </Badge>
          )}
        </div>

        {/* Client Interactive Reader wrapper for Theme, Font-size, and Bookmarking */}
        <ArticleReaderClient article={article} />
      </main>

      <Footer />
    </div>
  );
}
