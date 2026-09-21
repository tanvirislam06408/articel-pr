"use client";

import React, { useEffect } from "react";
import { Article } from "@/lib/data/articles";
import { EditorialArt } from "@/components/ui/EditorialArt";
import { X, Clock, Bookmark, Share2, Check, ArrowLeft, ShieldCheck } from "lucide-react";

interface ArticleModalProps {
  article: Article | null;
  onClose: () => void;
  isBookmarked: boolean;
  onBookmarkToggle: (articleId: string) => void;
}

export function ArticleModal({
  article,
  onClose,
  isBookmarked,
  onBookmarkToggle,
}: ArticleModalProps) {
  const [copied, setCopied] = React.useState(false);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
      }
    };
    if (article) {
      document.body.style.overflow = "hidden";
      window.addEventListener("keydown", handleKeyDown);
    }
    return () => {
      document.body.style.overflow = "unset";
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [article, onClose]);

  if (!article) return null;

  const handleCopy = () => {
    if (typeof window !== "undefined") {
      navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-article-title"
      className="fixed inset-0 z-50 flex items-center justify-center p-0 sm:p-4 md:p-6 bg-black/60 backdrop-blur-xs overflow-y-auto animate-in fade-in duration-200"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-3xl bg-[#FAF8F5] border border-[#E6DFD3] shadow-2xl rounded-none sm:rounded-xs my-auto max-h-[92vh] flex flex-col overflow-hidden text-[#181A1B]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Sticky Top Bar */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-[#E6DFD3] bg-[#FFFFFF] sticky top-0 z-20">
          <div className="flex items-center gap-2 text-xs text-[#0E5A44] font-medium">
            <span className="px-2 py-0.5 bg-[#E8F3EE] rounded-2xs">{article.topicTitle}</span>
            <span className="text-[#D9D2C4]">•</span>
            <span className="flex items-center gap-1 text-[#737D86]">
              <Clock className="w-3.5 h-3.5" />
              {article.readTime}
            </span>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => onBookmarkToggle(article.id)}
              className={`p-2 border rounded-xs transition-colors flex items-center gap-1.5 text-xs ${
                isBookmarked
                  ? "bg-[#E8F3EE] border-[#0E5A44] text-[#0E5A44]"
                  : "bg-[#FAF8F5] border-[#E6DFD3] text-[#525B62] hover:bg-[#F2ECE1]"
              }`}
              title={isBookmarked ? "সংরক্ষণ বাতিল" : "সংরক্ষণ করুন"}
            >
              <Bookmark className={`w-3.5 h-3.5 ${isBookmarked ? "fill-current" : ""}`} />
              <span className="hidden sm:inline">{isBookmarked ? "সংরক্ষিত" : "সংরক্ষণ"}</span>
            </button>

            <button
              onClick={handleCopy}
              className="p-2 bg-[#FAF8F5] border border-[#E6DFD3] hover:bg-[#F2ECE1] rounded-xs text-[#525B62] text-xs flex items-center gap-1"
              title="লিংক কপি করুন"
            >
              {copied ? <Check className="w-3.5 h-3.5 text-[#0E5A44]" /> : <Share2 className="w-3.5 h-3.5" />}
              <span className="hidden sm:inline">{copied ? "কপি হয়েছে" : "শেয়ার"}</span>
            </button>

            <button
              onClick={onClose}
              className="p-2 rounded-xs border border-[#E6DFD3] text-[#525B62] hover:bg-[#F2ECE1] transition-colors ml-2"
              aria-label="বন্ধ করুন"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Modal Scrollable Content */}
        <div className="overflow-y-auto p-6 sm:p-10 space-y-6">
          {/* Visual Header */}
          <div className="w-full">
            <EditorialArt theme={article.artTheme} variant="hero" className="w-full" />
          </div>

          {/* Kicker & Title */}
          <div>
            <span className="text-xs font-mono uppercase tracking-wider text-[#0E5A44] block mb-2">
              {article.kicker}
            </span>
            <h2
              id="modal-article-title"
              className="font-serif font-black text-2xl sm:text-3xl md:text-4xl text-[#181A1B] leading-tight"
            >
              {article.title}
            </h2>
          </div>

          {/* Author Byline */}
          <div className="flex items-center gap-3 py-3 border-y border-[#E6DFD3] text-xs text-[#525B62]">
            <div className="w-9 h-9 rounded-full bg-[#E8F3EE] text-[#0E5A44] font-serif font-bold flex items-center justify-center text-sm border border-[#0E5A44]/20">
              {article.author.name[0]}
            </div>
            <div>
              <p className="font-bold text-[#181A1B]">{article.author.name}</p>
              <p className="text-[11px] text-[#737D86]">{article.author.role}</p>
            </div>
            <div className="ml-auto text-right font-mono text-[11px] text-[#737D86]">
              {article.publishedDate}
            </div>
          </div>

          {/* Body Article Content with Drop Cap */}
          <div className="space-y-4 text-[#181A1B] font-serif text-base sm:text-lg leading-relaxed">
            <p className="drop-cap">
              {article.excerpt}
            </p>

            <p className="text-sm sm:text-base text-[#4A535A] leading-relaxed">
              {article.contentSnippet ||
                "আমাদের দৈনন্দিন মস্তিষ্কের গঠন এবং অনুভূতি সরাসরি নির্ভর করে আমরা কোন ধরনের উদ্দীপনা প্রতিনিয়ত গ্রহণ করছি তার ওপর। যখন আমরা ক্ষতিকর অবচেতন চক্রগুলো ভেঙে একটি সচেতন রুটিন তৈরি করি, তখন ধীরে ধীরে আমাদের একাগ্রতা ও আত্মনিয়ন্ত্রণ ফিরে আসে।"}
            </p>

            <blockquote className="p-4 bg-[#F2ECE1] border-l-4 border-[#0E5A44] font-serif italic text-sm sm:text-base text-[#181A1B] my-6">
              &ldquo;প্রকৃত স্বাধীনতা হলো নিজের তাৎক্ষণিক আবেগের দাস না হয়ে দীর্ঘমেয়াদী লক্ষ্যের প্রতি অবিচল থাকা।&rdquo;
            </blockquote>

            <h3 className="font-serif font-bold text-xl text-[#181A1B] pt-3">
              বাস্তব জীবনে অনুশীলনের ৩টি সূত্র:
            </h3>

            <ul className="list-disc list-inside space-y-2 text-sm text-[#4A535A] font-sans">
              <li><strong>প্রথম সূত্র:</strong> অবচেতন ব্যবহারের সময়গুলো ডায়েরিতে নোট করুন।</li>
              <li><strong>দ্বিতীয় সূত্র:</strong> ঘুমাতে যাওয়ার ১ ঘণ্টা আগে সব স্ক্রিন বন্ধ রাখুন।</li>
              <li><strong>তৃতীয় সূত্র:</strong> কোনো অস্বাস্থ্যকর লোভ জাগলে গভীর শ্বাস নিয়ে ১০ মিনিট অপেক্ষা করুন।</li>
            </ul>
          </div>

          {/* Ethics / Support Notice */}
          <div className="mt-8 p-4 bg-[#F7F3EB] border border-[#E6DFD3] rounded-xs flex items-center gap-3 text-xs text-[#525B62]">
            <ShieldCheck className="w-5 h-5 text-[#0E5A44] shrink-0" />
            <span>
              মনন-এর সকল প্রবন্ধ আচরণগত বিজ্ঞান ও মনস্তত্ত্বের আলোকে প্রণীত। মননশীল জীবনচর্চার অংশ হিসেবে এটি পাঠের জন্য উন্মুক্ত।
            </span>
          </div>
        </div>

        {/* Modal Footer */}
        <div className="p-4 border-t border-[#E6DFD3] bg-[#FFFFFF] flex items-center justify-between text-xs">
          <button
            onClick={onClose}
            className="flex items-center gap-1.5 text-[#525B62] hover:text-[#181A1B] cursor-pointer"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>হোমপেজে ফিরে যান</span>
          </button>
          <a
            href="#newsletter"
            onClick={onClose}
            className="px-4 py-1.5 bg-[#0E5A44] text-[#FFFFFF] font-medium rounded-xs hover:bg-[#094030] transition-colors"
          >
            নিউজলেটার যুক্ত হন
          </a>
        </div>
      </div>
    </div>
  );
}
