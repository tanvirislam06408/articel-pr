"use client";

import React, { useState } from "react";
import Link from "next/link";
import { ARTICLES, Article } from "@/lib/data/articles";
import { TOPICS, Topic } from "@/lib/data/topics";
import { toBengaliNumber } from "@/lib/utils";
import { EditorialArt } from "@/components/ui/EditorialArt";
import { Clock, Bookmark, ArrowRight, BookOpen } from "lucide-react";

interface LatestArticlesProps {
  articles?: Article[];
  topics?: Topic[];
  selectedTopicId?: string | null;
  onSelectTopic?: (topicId: string | null) => void;
  savedArticleIds?: string[];
  onBookmarkToggle?: (articleId: string) => void;
}

export function LatestArticles({
  articles = ARTICLES,
  topics = TOPICS,
  selectedTopicId,
  onSelectTopic,
  savedArticleIds = [],
  onBookmarkToggle,
}: LatestArticlesProps) {
  const [activeTab, setActiveTab] = useState<string>("all");

  // Filter articles based on tab or selected topic
  const filteredArticles = articles.filter((art) => {
    // If a global topic is selected
    if (selectedTopicId) {
      return art.topicId === selectedTopicId;
    }
    // If tab is not "all"
    if (activeTab === "saved") {
      return savedArticleIds.includes(art.id);
    }
    if (activeTab !== "all") {
      return art.topicId === activeTab;
    }
    return true;
  });

  return (
    <section id="latest-articles" className="w-full bg-[#FAF8F5] py-12 sm:py-16 border-b border-[#E6DFD3]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Title & Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between border-b-2 border-[#181A1B] pb-4 mb-6 gap-4">
          <div>
            <span className="text-xs font-mono uppercase tracking-wider text-[#737D86] block mb-1">
              CURATED ESSAYS & IN-DEPTH ANALYSES
            </span>
            <h2 className="font-serif font-black text-2xl sm:text-3xl text-[#181A1B]">
              সাম্প্রতিক ও নির্বাচিত প্রবন্ধসমূহ
            </h2>
          </div>

          {/* Category Filter Tabs */}
          <div className="flex items-center gap-1.5 overflow-x-auto pb-1 max-w-full text-xs">
            <button
              onClick={() => {
                setActiveTab("all");
                if (onSelectTopic) onSelectTopic(null);
              }}
              className={`px-3 py-1.5 rounded-2xs border transition-colors whitespace-nowrap cursor-pointer ${
                activeTab === "all" && !selectedTopicId
                  ? "bg-[#0E5A44] border-[#0E5A44] text-[#FFFFFF]"
                  : "bg-[#FFFFFF] border-[#E6DFD3] text-[#525B62] hover:bg-[#F2ECE1]"
              }`}
            >
              সকল প্রবন্ধ ({toBengaliNumber(articles.length)})
            </button>

            {topics.slice(0, 5).map((t) => (
              <button
                key={t.id}
                onClick={() => {
                  setActiveTab(t.id);
                  if (onSelectTopic) onSelectTopic(t.id);
                }}
                className={`px-3 py-1.5 rounded-2xs border transition-colors whitespace-nowrap cursor-pointer ${
                  (activeTab === t.id || selectedTopicId === t.id)
                    ? "bg-[#0E5A44] border-[#0E5A44] text-[#FFFFFF]"
                    : "bg-[#FFFFFF] border-[#E6DFD3] text-[#525B62] hover:bg-[#F2ECE1]"
                }`}
              >
                {t.title}
              </button>
            ))}

            <button
              onClick={() => {
                setActiveTab("saved");
                if (onSelectTopic) onSelectTopic(null);
              }}
              className={`px-3 py-1.5 rounded-2xs border transition-colors whitespace-nowrap flex items-center gap-1 cursor-pointer ${
                activeTab === "saved"
                  ? "bg-[#0E5A44] border-[#0E5A44] text-[#FFFFFF]"
                  : "bg-[#FFFFFF] border-[#E6DFD3] text-[#525B62] hover:bg-[#F2ECE1]"
              }`}
            >
              <Bookmark className="w-3 h-3" />
              <span>সংরক্ষিত ({toBengaliNumber(savedArticleIds.length)})</span>
            </button>
          </div>
        </div>

        {/* If filtered list is empty */}
        {filteredArticles.length === 0 ? (
          <div className="text-center py-16 bg-[#FFFFFF] border border-[#E6DFD3] rounded-xs">
            <BookOpen className="w-10 h-10 text-[#D9D2C4] mx-auto mb-3" />
            <h3 className="font-serif font-bold text-lg text-[#181A1B]">এই বিভাগে কোনো সংরক্ষিত নিবন্ধ নেই</h3>
            <p className="text-xs text-[#737D86] mt-1">
              যে কোনো নিবন্ধের পাশে থাকা বুকমার্ক আইকনটিতে ক্লিক করে সংরক্ষণ করতে পারেন।
            </p>
            <button
              onClick={() => {
                setActiveTab("all");
                if (onSelectTopic) onSelectTopic(null);
              }}
              className="mt-4 px-4 py-2 bg-[#0E5A44] text-[#FFFFFF] text-xs font-medium rounded-xs cursor-pointer"
            >
              সকল প্রবন্ধ দেখুন
            </button>
          </div>
        ) : (
          /* Editorial Asymmetric Articles Grid */
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
            {/* Left Big Feature (Col 1-7) */}
            {filteredArticles.length > 0 && (
              <div className="md:col-span-7 bg-[#FFFFFF] border border-[#E6DFD3] flex flex-col justify-between overflow-hidden group shadow-2xs">
                <div>
                  <div className="relative overflow-hidden">
                    <EditorialArt theme={filteredArticles[0].artTheme} variant="banner" />
                    <div className="absolute top-3 left-3 bg-[#FAF8F5]/90 backdrop-blur-xs px-2.5 py-0.5 border border-[#E6DFD3] rounded-2xs text-[11px] font-semibold text-[#0E5A44]">
                      {filteredArticles[0].topicTitle}
                    </div>
                  </div>

                  <div className="p-6 sm:p-8 space-y-4">
                    <div className="flex items-center gap-3 text-xs text-[#737D86] font-mono">
                      <span>{filteredArticles[0].publishedDate}</span>
                      <span>•</span>
                      <span className="flex items-center gap-1 text-[#0E5A44] font-sans font-medium">
                        <Clock className="w-3 h-3" />
                        {filteredArticles[0].readTime}
                      </span>
                    </div>

                    <Link href={`/articles/${filteredArticles[0].slug}`} className="block">
                      <h3 className="font-serif font-black text-xl sm:text-2xl text-[#181A1B] group-hover:text-[#0E5A44] transition-colors leading-snug">
                        {filteredArticles[0].title}
                      </h3>
                    </Link>

                    <p className="text-sm text-[#4A535A] font-serif leading-relaxed">
                      {filteredArticles[0].excerpt}
                    </p>

                    <div className="pt-3 flex items-center justify-between text-xs text-[#737D86] border-t border-[#F2ECE1]">
                      <span className="font-sans">লেখক: {filteredArticles[0].author?.name || "মনন সম্পাদক"}</span>
                      <span className="italic font-serif">{filteredArticles[0].author?.role || "লেখক"}</span>
                    </div>
                  </div>
                </div>

                <div className="p-6 sm:p-8 pt-0 flex items-center justify-between">
                  <Link
                    href={`/articles/${filteredArticles[0].slug}`}
                    className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-semibold text-[#0E5A44] hover:underline cursor-pointer group/link"
                  >
                    <span>পূর্ণ প্রবন্ধ পড়ুন</span>
                    <ArrowRight className="w-3.5 h-3.5 group-hover/link:translate-x-1 transition-transform" />
                  </Link>

                  <button
                    onClick={() => onBookmarkToggle?.(filteredArticles[0].id)}
                    className="p-2 text-[#737D86] hover:text-[#0E5A44] transition-colors cursor-pointer"
                    aria-label="নিবন্ধ বুকমার্ক করুন"
                  >
                    <Bookmark
                      className={`w-4 h-4 ${
                        savedArticleIds.includes(filteredArticles[0].id) ? "fill-[#0E5A44] text-[#0E5A44]" : ""
                      }`}
                    />
                  </button>
                </div>
              </div>
            )}

            {/* Right Stack of Articles (Col 8-12) */}
            <div className="md:col-span-5 space-y-4">
              {filteredArticles.slice(1, 5).map((art) => (
                <article
                  key={art.id}
                  className="p-5 bg-[#FFFFFF] border border-[#E6DFD3] hover:border-[#0E5A44] transition-all flex flex-col justify-between group shadow-2xs"
                >
                  <div>
                    <div className="flex items-center justify-between text-[11px] text-[#737D86] mb-2 font-mono">
                      <span className="text-[#0E5A44] font-semibold font-sans">{art.topicTitle}</span>
                      <span className="flex items-center gap-1">
                        <Clock className="w-3 h-3" />
                        {art.readTime}
                      </span>
                    </div>

                    <Link href={`/articles/${art.slug}`} className="block mb-2">
                      <h4 className="font-serif font-bold text-base sm:text-lg text-[#181A1B] group-hover:text-[#0E5A44] transition-colors leading-snug">
                        {art.title}
                      </h4>
                    </Link>

                    <p className="text-xs text-[#525B62] font-sans line-clamp-2 leading-relaxed">
                      {art.excerpt}
                    </p>
                  </div>

                  <div className="mt-4 pt-3 border-t border-[#F2ECE1] flex items-center justify-between text-xs">
                    <Link
                      href={`/articles/${art.slug}`}
                      className="text-[#0E5A44] font-medium hover:underline inline-flex items-center gap-1"
                    >
                      <span>পাঠ করুন</span>
                      <ArrowRight className="w-3 h-3" />
                    </Link>

                    <button
                      onClick={() => onBookmarkToggle?.(art.id)}
                      className="text-[#737D86] hover:text-[#0E5A44] p-1 cursor-pointer"
                      aria-label="বুকমার্ক"
                    >
                      <Bookmark
                        className={`w-3.5 h-3.5 ${
                          savedArticleIds.includes(art.id) ? "fill-[#0E5A44] text-[#0E5A44]" : ""
                        }`}
                      />
                    </button>
                  </div>
                </article>
              ))}
            </div>
          </div>
        )}

        {/* Bottom Editorial Quote Strip */}
        <div className="mt-10 p-6 sm:p-8 bg-[#FAF8F5] border-t border-b border-[#E6DFD3] text-center max-w-4xl mx-auto">
          <blockquote className="font-serif italic text-base sm:text-xl text-[#181A1B] leading-relaxed">
            &ldquo;তাৎক্ষণিক উদ্দীপনার আসক্তি থেকে মুক্তি পাওয়া কোনো এক রাতের যুদ্ধ নয়; এটি হলো নিজের মস্তিষ্ক ও মনকে প্রতিদিন একটু একটু করে শান্ত করা এবং বাস্তব পৃথিবীর গভীর সৌন্দর্যকে আবার অনুভব করতে শেখা।&rdquo;
          </blockquote>
          <span className="block mt-3 text-xs font-mono text-[#737D86]">
            — মননীয় গবেষণা ও সম্পাদনা পরিষদ
          </span>
        </div>
      </div>
    </section>
  );
}
