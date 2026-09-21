"use client";

import React, { useState, useEffect, useId } from "react";
import { Search, X, BookOpen, Clock, ArrowRight, CornerDownLeft } from "lucide-react";
import { ARTICLES, Article } from "@/lib/data/articles";
import { TOPICS } from "@/lib/data/topics";
import { toBengaliNumber } from "@/lib/utils";

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectArticle?: (article: Article) => void;
}

export function SearchModal({ isOpen, onClose, onSelectArticle }: SearchModalProps) {
  const [query, setQuery] = useState("");
  const searchInputId = useId();

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        if (isOpen) {
          onClose();
        }
      }
      if (e.key === "Escape" && isOpen) {
        onClose();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose]);

  // Lock body scroll when search is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  if (!isOpen) return null;

  const filteredArticles = query.trim()
    ? ARTICLES.filter(
        (art) =>
          art.title.toLowerCase().includes(query.toLowerCase()) ||
          art.excerpt.toLowerCase().includes(query.toLowerCase()) ||
          art.topicTitle.toLowerCase().includes(query.toLowerCase()) ||
          art.author.name.toLowerCase().includes(query.toLowerCase())
      )
    : [];

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="নিবন্ধ ও বিষয় অনুসন্ধান"
      className="fixed inset-0 z-50 flex items-start justify-center pt-16 sm:pt-24 px-4 bg-black/60 backdrop-blur-xs transition-opacity animate-in fade-in duration-200"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-2xl bg-[#FAF8F5] border border-[#E6DFD3] shadow-2xl rounded-sm overflow-hidden flex flex-col max-h-[80vh] text-[#181A1B]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Search Header Input */}
        <div className="flex items-center gap-3 px-5 py-4 border-b border-[#E6DFD3] bg-[#FFFFFF]">
          <Search className="w-5 h-5 text-[#737D86] shrink-0" aria-hidden="true" />
          <label htmlFor={searchInputId} className="sr-only">
            নিবন্ধ, লেখক বা বিষয় লিখে অনুসন্ধান করুন
          </label>
          <input
            id={searchInputId}
            type="text"
            placeholder="নিবন্ধ, লেখক বা বিষয় লিখে খুঁজুন... (যেমন: ডোপামিন, মনোযোগ, স্ক্রিনটাইম)"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            autoFocus
            className="flex-1 bg-transparent text-[#181A1B] placeholder-[#737D86] text-base focus:outline-hidden font-sans"
          />
          {query && (
            <button
              onClick={() => setQuery("")}
              className="text-[#737D86] hover:text-[#181A1B] p-1 rounded-sm focus:outline-hidden focus:ring-1 focus:ring-[#0E5A44]"
              aria-label="অনুসন্ধান টেক্সট মুছুন"
            >
              <X className="w-4 h-4" />
            </button>
          )}
          <button
            onClick={onClose}
            className="text-xs px-2.5 py-1 border border-[#E6DFD3] rounded-sm text-[#525B62] hover:bg-[#F2ECE1] transition-colors"
          >
            ESC
          </button>
        </div>

        {/* Results / Suggestions Container */}
        <div className="overflow-y-auto p-5 space-y-5">
          {query.trim() === "" ? (
            <div>
              <div className="text-xs font-semibold text-[#737D86] uppercase tracking-wider mb-3 flex items-center gap-2">
                <span>জনপ্রিয় অনুসন্ধান বিষয়সমূহ</span>
              </div>
              <div className="flex flex-wrap gap-2">
                {TOPICS.map((topic) => (
                  <button
                    key={topic.id}
                    onClick={() => setQuery(topic.title)}
                    className="text-xs px-3 py-1.5 bg-[#FFFFFF] border border-[#E6DFD3] hover:border-[#0E5A44] hover:text-[#0E5A44] transition-all rounded-sm text-[#4A535A] flex items-center gap-1.5"
                  >
                    <span>{topic.title}</span>
                    <span className="text-[10px] text-[#737D86]">({toBengaliNumber(topic.articleCount)})</span>
                  </button>
                ))}
              </div>

              <div className="mt-6 pt-5 border-t border-[#E6DFD3]">
                <p className="text-xs text-[#737D86] leading-relaxed">
                  পরামর্শ: আপনি নির্দিষ্ট কীওয়ার্ড যেমন <strong>‘ডোপামিন’</strong>, <strong>‘পর্নোগ্রাফি’</strong>, <strong>‘ডিপ ওয়ার্ক’</strong>, অথবা <strong>‘ইচ্ছাশক্তি’</strong> লিখে নিখুঁত ফলাফল পেতে পারেন।
                </p>
              </div>
            </div>
          ) : filteredArticles.length > 0 ? (
            <div className="space-y-3">
              <div className="text-xs font-semibold text-[#737D86] uppercase tracking-wider mb-1">
                প্রাপ্ত ফলাফল ({filteredArticles.length}টি নিবন্ধ)
              </div>
              {filteredArticles.map((article) => (
                <div
                  key={article.id}
                  onClick={() => {
                    if (onSelectArticle) onSelectArticle(article);
                    onClose();
                  }}
                  className="group p-4 bg-[#FFFFFF] border border-[#E6DFD3] hover:border-[#0E5A44] hover:bg-[#F7F3EB] transition-all cursor-pointer rounded-sm"
                >
                  <div className="flex items-center justify-between text-xs text-[#0E5A44] font-medium mb-1.5">
                    <span className="bg-[#E8F3EE] px-2 py-0.5 rounded-xs">{article.topicTitle}</span>
                    <span className="flex items-center gap-1 text-[#737D86]">
                      <Clock className="w-3 h-3" />
                      {article.readTime}
                    </span>
                  </div>
                  <h4 className="font-serif text-base font-bold text-[#181A1B] group-hover:text-[#0E5A44] transition-colors leading-snug">
                    {article.title}
                  </h4>
                  <p className="text-xs text-[#525B62] line-clamp-2 mt-1.5 leading-relaxed font-sans">
                    {article.excerpt}
                  </p>
                  <div className="mt-2.5 pt-2 border-t border-[#F2ECE1] flex items-center justify-between text-[11px] text-[#737D86]">
                    <span>লেখক: {article.author.name}</span>
                    <span className="flex items-center gap-1 text-[#0E5A44] font-medium group-hover:translate-x-0.5 transition-transform">
                      পড়ুন <ArrowRight className="w-3 h-3" />
                    </span>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-10">
              <BookOpen className="w-10 h-10 text-[#D9D2C4] mx-auto mb-3" />
              <p className="text-base font-serif text-[#181A1B] font-semibold">কোনো নিবন্ধ খুঁজে পাওয়া যায়নি</p>
              <p className="text-xs text-[#737D86] mt-1 max-w-sm mx-auto">
                &lsquo;{query}&rsquo; শব্দের সাথে মিল রেখে কোনো লেখা মেলেনি। অনুগ্রহ করে ভিন্ন শব্দ বা বিষয় দিয়ে পুনরায় চেষ্টা করুন।
              </p>
            </div>
          )}
        </div>

        {/* Search Footer */}
        <div className="px-5 py-3 border-t border-[#E6DFD3] bg-[#F7F3EB] flex items-center justify-between text-[11px] text-[#737D86]">
          <span className="flex items-center gap-1.5">
            <kbd className="px-1.5 py-0.5 bg-[#FFFFFF] border border-[#E6DFD3] rounded-xs font-mono text-[10px]">
              ESC
            </kbd>{" "}
            দিয়ে বন্ধ করুন
          </span>
          <span className="flex items-center gap-1.5">
            <kbd className="px-1.5 py-0.5 bg-[#FFFFFF] border border-[#E6DFD3] rounded-xs font-mono text-[10px] flex items-center">
              <CornerDownLeft className="w-2.5 h-2.5" />
            </kbd>{" "}
            নির্বাচিত লেখা খুলুন
          </span>
        </div>
      </div>
    </div>
  );
}
