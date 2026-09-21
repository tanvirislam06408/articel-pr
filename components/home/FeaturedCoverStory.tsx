"use client";

import React, { useState } from "react";
import Link from "next/link";
import { FEATURED_COVER_ARTICLE, Article } from "@/lib/data/articles";
import { EditorialArt } from "@/components/ui/EditorialArt";
import { Clock, Bookmark, ArrowRight, Check, Share2, Sparkles, BookOpen } from "lucide-react";

interface FeaturedCoverStoryProps {
  article?: Article | any;
  onBookmarkToggle?: (articleId: string) => void;
  isBookmarked?: boolean;
}

export function FeaturedCoverStory({
  article = FEATURED_COVER_ARTICLE,
  onBookmarkToggle,
  isBookmarked = false,
}: FeaturedCoverStoryProps) {
  const [copied, setCopied] = useState(false);

  const handleShare = () => {
    if (typeof window !== "undefined") {
      const shareUrl = `${window.location.origin}/articles/${article.slug}`;
      navigator.clipboard.writeText(shareUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <section id="featured-story" className="w-full bg-[#FAF8F5] py-12 sm:py-16 border-b border-[#E6DFD3]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header with Editorial Badge */}
        <div className="flex items-center justify-between border-b-2 border-[#181A1B] pb-3 mb-8">
          <div className="flex items-center gap-3">
            <span className="font-serif font-bold text-xl sm:text-2xl text-[#181A1B] tracking-tight">
              প্রধান প্রচ্ছদ নিবন্ধ
            </span>
            <span className="hidden sm:inline-block px-2.5 py-0.5 bg-[#0E5A44] text-[#FFFFFF] text-[11px] font-medium rounded-2xs">
              বিশেষ প্রচ্ছদ
            </span>
          </div>
          <div className="text-xs font-mono text-[#737D86]">
            শরৎ সংখ্যা • প্রচ্ছদ কাহিনী
          </div>
        </div>

        {/* Feature Story Grid */}
        <div className="bg-[#FFFFFF] border border-[#E6DFD3] shadow-xs overflow-hidden">
          <div className="grid grid-cols-1 lg:grid-cols-12">
            {/* Visual Column */}
            <div className="lg:col-span-7 bg-[#1C262B] relative flex flex-col justify-between p-6 sm:p-8 md:p-10 border-b lg:border-b-0 lg:border-r border-[#E6DFD3]">
              <div className="absolute top-4 left-4 z-20">
                <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-[#FAF8F5]/90 backdrop-blur-xs text-[#0E5A44] text-xs font-medium rounded-xs border border-[#E6DFD3]">
                  <Sparkles className="w-3 h-3 text-[#0E5A44]" />
                  {article.kicker || "বিশেষ অনুসন্ধান"}
                </span>
              </div>

              <div className="my-auto py-8">
                <EditorialArt theme={article.artTheme || "dopamine"} variant="hero" className="w-full shadow-lg" />
              </div>

              <div className="flex items-center justify-between text-xs text-[#F7FAFC]/75 pt-4 border-t border-[#FFFFFF]/15 font-mono">
                <span>চিত্ররূপ: নিউরাল সার্কিট ও মনোযোগ পুনরুজ্জীবন</span>
                <span>মনন ভিজ্যুয়াল ডেস্ক</span>
              </div>
            </div>

            {/* Content Column */}
            <div className="lg:col-span-5 p-6 sm:p-8 md:p-10 flex flex-col justify-between space-y-6">
              <div className="space-y-4">
                {/* Meta Bar */}
                <div className="flex flex-wrap items-center gap-2 text-xs text-[#525B62] border-b border-[#F2ECE1] pb-3">
                  <span className="font-semibold text-[#0E5A44]">{article.topicTitle || "বিশেষ বিভাগ"}</span>
                  <span className="text-[#D9D2C4]">•</span>
                  <span className="flex items-center gap-1">
                    <Clock className="w-3.5 h-3.5 text-[#737D86]" />
                    {article.readTime}
                  </span>
                  <span className="text-[#D9D2C4]">•</span>
                  <span>{article.publishedDate}</span>
                </div>

                {/* Main Headline Linked to Route */}
                <Link href={`/articles/${article.slug}`} className="block group">
                  <h2 className="text-2xl sm:text-3xl md:text-[2rem] font-serif font-black text-[#181A1B] leading-tight group-hover:text-[#0E5A44] transition-colors">
                    {article.title}
                  </h2>
                </Link>

                {/* Author Info */}
                <div className="flex items-center gap-3 py-1">
                  <div className="w-10 h-10 rounded-full bg-[#F2ECE1] border border-[#E6DFD3] flex items-center justify-center font-serif font-bold text-sm text-[#0E5A44]">
                    {article.author?.name ? article.author.name.charAt(0) : "ম"}
                  </div>
                  <div>
                    <h3 className="text-xs font-bold text-[#181A1B] leading-none mb-0.5">
                      {article.author?.name || "মনন লেখক"}
                    </h3>
                    <p className="text-[11px] text-[#737D86]">{article.author?.role || "সম্পাদকীয় পরিষদ"}</p>
                  </div>
                </div>

                {/* Excerpt with Drop Cap */}
                <p className="text-sm sm:text-base text-[#4A535A] font-serif leading-relaxed drop-cap pt-1">
                  {article.excerpt}
                </p>
              </div>

              {/* Action Buttons */}
              <div className="pt-6 border-t border-[#F2ECE1] flex flex-wrap items-center justify-between gap-3">
                <div className="flex items-center gap-2">
                  <Link
                    href={`/articles/${article.slug}`}
                    className="inline-flex items-center gap-2 px-5 py-2.5 bg-[#0E5A44] hover:bg-[#094030] text-[#FFFFFF] text-xs sm:text-sm font-medium rounded-xs transition-colors group cursor-pointer shadow-xs"
                  >
                    <span>পূর্ণ প্রবন্ধ পড়ুন</span>
                    <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                  </Link>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => onBookmarkToggle?.(article.id)}
                    className={`p-2.5 border rounded-xs transition-colors flex items-center gap-1.5 text-xs cursor-pointer ${
                      isBookmarked
                        ? "bg-[#E8F3EE] border-[#0E5A44] text-[#0E5A44]"
                        : "bg-[#FAF8F5] border-[#E6DFD3] text-[#525B62] hover:bg-[#F2ECE1]"
                    }`}
                    title={isBookmarked ? "সংরক্ষণ বাতিল করুন" : "সংরক্ষণ করুন"}
                    aria-label="নিবন্ধ সংরক্ষণ করুন"
                  >
                    <Bookmark className={`w-4 h-4 ${isBookmarked ? "fill-current" : ""}`} />
                    <span className="hidden sm:inline">{isBookmarked ? "সংরক্ষিত" : "সংরক্ষণ"}</span>
                  </button>

                  <button
                    onClick={handleShare}
                    className="p-2.5 bg-[#FAF8F5] border border-[#E6DFD3] hover:bg-[#F2ECE1] rounded-xs text-[#525B62] transition-colors flex items-center gap-1.5 text-xs cursor-pointer"
                    title="লিংক কপি করুন"
                    aria-label="প্রবন্ধ শেয়ার করুন"
                  >
                    {copied ? <Check className="w-4 h-4 text-[#0E5A44]" /> : <Share2 className="w-4 h-4" />}
                    <span className="hidden sm:inline">{copied ? "কপি হয়েছে!" : "শেয়ার"}</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
