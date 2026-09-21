"use client";

import React, { useState, useEffect } from "react";
import { ReadingToolbar, ReadingTheme, FontSize } from "@/components/article/ReadingToolbar";
import { SocialShare } from "@/components/article/SocialShare";
import { CommentSection } from "@/components/article/CommentSection";
import { Button } from "@/components/ui/button";
import { Bookmark, Clock, Calendar, User, Check, Eye } from "lucide-react";
import { toBengaliNumber } from "@/lib/utils";

interface ArticleReaderClientProps {
  article: any;
}

export function ArticleReaderClient({ article }: ArticleReaderClientProps) {
  const [theme, setTheme] = useState<ReadingTheme>("light");
  const [fontSize, setFontSize] = useState<FontSize>("base");
  const [isBookmarked, setIsBookmarked] = useState(false);

  useEffect(() => {
    try {
      const saved = localStorage.getItem("monon_saved_articles");
      if (saved) {
        const ids: string[] = JSON.parse(saved);
        setIsBookmarked(ids.includes(article.id));
      }
    } catch {
      // Ignore
    }
  }, [article.id]);

  const toggleBookmark = () => {
    try {
      const saved = localStorage.getItem("monon_saved_articles");
      let ids: string[] = saved ? JSON.parse(saved) : [];
      if (ids.includes(article.id)) {
        ids = ids.filter((id) => id !== article.id);
        setIsBookmarked(false);
      } else {
        ids.push(article.id);
        setIsBookmarked(true);
      }
      localStorage.setItem("monon_saved_articles", JSON.stringify(ids));
    } catch {
      // Ignore
    }
  };

  const getThemeClasses = () => {
    switch (theme) {
      case "sepia":
        return "bg-[#F4ECD8] text-[#433422] p-6 sm:p-10 rounded-2xl shadow-xs border border-[#E5DEC9]";
      case "dark":
        return "bg-[#181A1B] text-[#E0DED9] p-6 sm:p-10 rounded-2xl shadow-xs border border-stone-800";
      default:
        return "bg-transparent text-[#181A1B]";
    }
  };

  const getFontSizeClasses = () => {
    switch (fontSize) {
      case "sm":
        return "text-base leading-relaxed";
      case "lg":
        return "text-xl leading-loose";
      case "xl":
        return "text-2xl leading-loose";
      default:
        return "text-lg leading-relaxed";
    }
  };

  return (
    <div>
      {/* Interactive Reading Controls */}
      <ReadingToolbar
        theme={theme}
        onThemeChange={setTheme}
        fontSize={fontSize}
        onFontSizeChange={setFontSize}
        readTime={article.readTime}
      />

      <article className={`transition-all duration-300 ${getThemeClasses()}`}>
        {/* Article Kicker & Category */}
        <div className="mb-4">
          <span className="text-xs font-bold tracking-wider uppercase text-[#008767]">
            {article.kicker || "বিশেষ পর্যালোচনা"}
          </span>
        </div>

        {/* Title */}
        <h1 className="font-serif text-2xl sm:text-4xl md:text-5xl font-extrabold tracking-tight leading-[1.25] mb-6">
          {article.title}
        </h1>

        {/* Excerpt Lead */}
        <p className="text-base sm:text-xl font-serif text-stone-600 dark:text-stone-300 leading-relaxed italic mb-8 pb-6 border-b border-[#E5E0D8] dark:border-stone-800">
          {article.excerpt}
        </p>

        {/* Meta Bar (Author, Date, Read Time, Views, Bookmark) */}
        <div className="flex flex-wrap items-center justify-between gap-4 mb-8 text-xs text-stone-500 dark:text-stone-400">
          <div className="flex items-center gap-3">
            {article.author?.avatarUrl ? (
              <img
                src={article.author.avatarUrl}
                alt={article.author.name}
                className="w-10 h-10 rounded-full object-cover border border-[#E5E0D8]"
              />
            ) : (
              <div className="w-10 h-10 rounded-full bg-[#008767]/10 text-[#008767] flex items-center justify-center font-bold">
                {article.author?.name?.charAt(0) || "ম"}
              </div>
            )}
            <div>
              <span className="font-semibold text-sm text-[#181A1B] dark:text-stone-100 block">
                {article.author?.name || "মনন লেখক"}
              </span>
              <span className="text-stone-400 text-xs">
                {article.author?.role || "লেখক ও গবেষক"}
              </span>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <span className="flex items-center gap-1">
              <Calendar className="w-3.5 h-3.5" />
              {article.publishedDate}
            </span>
            <span className="flex items-center gap-1">
              <Clock className="w-3.5 h-3.5" />
              {article.readTime}
            </span>
            {article.views !== undefined && (
              <span className="flex items-center gap-1">
                <Eye className="w-3.5 h-3.5" />
                {toBengaliNumber(article.views)} পঠিত
              </span>
            )}
            <Button
              variant={isBookmarked ? "default" : "outline"}
              size="sm"
              onClick={toggleBookmark}
              className={`h-8 text-xs flex items-center gap-1 ${
                isBookmarked
                  ? "bg-[#008767] text-white"
                  : "hover:bg-emerald-50 hover:text-[#008767]"
              }`}
            >
              <Bookmark
                className={`w-3.5 h-3.5 ${isBookmarked ? "fill-white" : ""}`}
              />
              <span>{isBookmarked ? "সংরক্ষিত" : "সংরক্ষণ করুন"}</span>
            </Button>
          </div>
        </div>

        {/* Main Article Body with Drop Cap */}
        <div
          className={`prose prose-stone dark:prose-invert max-w-none font-serif text-justify ${getFontSizeClasses()}`}
        >
          {article.content.split("\n\n").map((paragraph: string, index: number) => {
            if (index === 0 && paragraph.length > 0) {
              const firstChar = paragraph.charAt(0);
              const remaining = paragraph.slice(1);
              return (
                <p key={index} className="mb-6 leading-relaxed">
                  <span className="float-left text-5xl sm:text-6xl font-serif font-black pr-3 pt-1 text-[#008767] leading-none select-none">
                    {firstChar}
                  </span>
                  {remaining}
                </p>
              );
            }
            return (
              <p key={index} className="mb-6 leading-relaxed">
                {paragraph}
              </p>
            );
          })}
        </div>

        {/* Social Share Bar */}
        <SocialShare title={article.title} />

        {/* Author Bio Card */}
        {article.author && (
          <div className="p-6 rounded-2xl bg-white dark:bg-stone-900 border border-[#E5E0D8] dark:border-stone-800 shadow-2xs my-8 flex items-start gap-4">
            {article.author.avatarUrl ? (
              <img
                src={article.author.avatarUrl}
                alt={article.author.name}
                className="w-14 h-14 rounded-full object-cover shrink-0 border border-stone-200"
              />
            ) : (
              <div className="w-14 h-14 rounded-full bg-[#008767]/10 text-[#008767] flex items-center justify-center font-bold text-xl shrink-0">
                {article.author.name.charAt(0)}
              </div>
            )}
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-[#008767] block mb-1">
                লেখক পরিচিতি
              </span>
              <h4 className="font-serif font-bold text-lg text-[#181A1B] dark:text-stone-100">
                {article.author.name}
              </h4>
              <p className="text-xs text-stone-500 dark:text-stone-400 mb-2">
                {article.author.role}
              </p>
              <p className="text-xs text-stone-600 dark:text-stone-300 leading-relaxed">
                {article.author.bio ||
                  "মনন সাময়িকীর নিয়মিত লেখক ও মনস্তাত্ত্বিক রূপান্তরের গবেষক।"}
              </p>
            </div>
          </div>
        )}
      </article>

      {/* Live Comments & Likes Section */}
      <CommentSection articleSlug={article.slug} initialLikes={0} />
    </div>
  );
}
