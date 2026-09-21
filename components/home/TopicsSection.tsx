"use client";

import React from "react";
import { TOPICS } from "@/lib/data/topics";
import { toBengaliNumber } from "@/lib/utils";
import {
  Smartphone,
  ShieldAlert,
  Compass,
  Brain,
  Repeat,
  HeartHandshake,
  Sparkles,
  ArrowRight,
} from "lucide-react";

interface TopicsSectionProps {
  selectedTopicId?: string | null;
  onSelectTopic?: (topicId: string | null) => void;
}

export function TopicsSection({
  selectedTopicId,
  onSelectTopic,
}: TopicsSectionProps) {
  const getTopicIcon = (iconName: string) => {
    const props = { className: "w-5 h-5 text-[#0E5A44] shrink-0" };
    switch (iconName) {
      case "Smartphone":
        return <Smartphone {...props} />;
      case "ShieldAlert":
        return <ShieldAlert {...props} />;
      case "Compass":
        return <Compass {...props} />;
      case "Brain":
        return <Brain {...props} />;
      case "Repeat":
        return <Repeat {...props} />;
      case "HeartHandshake":
        return <HeartHandshake {...props} />;
      case "Sparkles":
      default:
        return <Sparkles {...props} />;
    }
  };

  return (
    <section id="topics" className="w-full bg-[#FAF8F5] py-12 sm:py-16 border-b border-[#E6DFD3]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between border-b-2 border-[#181A1B] pb-4 mb-8 gap-3">
          <div>
            <span className="text-xs font-mono uppercase tracking-wider text-[#737D86] block mb-1">
              EDITORIAL PILLARS & DISCIPLINES
            </span>
            <h2 className="font-serif font-black text-2xl sm:text-3xl text-[#181A1B]">
              আমাদের প্রধান বিষয়সমূহ
            </h2>
          </div>
          <p className="text-xs sm:text-sm text-[#525B62] max-w-md font-serif">
            ডিজিটাল বিভ্রান্তি থেকে মুক্ত হয়ে সচেতন মন ও জীবন গড়ে তোলার প্রতিটি শাখার সুবিন্যস্ত অনুসন্ধান।
          </p>
        </div>

        {/* Filter Reset if selected */}
        {selectedTopicId && (
          <div className="mb-6 flex items-center justify-between p-3 bg-[#E8F3EE] border border-[#0E5A44]/30 rounded-xs">
            <span className="text-xs text-[#0E5A44] font-medium">
              বর্তমানে নির্বাচিত বিষয় অনুযায়ী প্রবন্ধ প্রদর্শিত হচ্ছে
            </span>
            <button
              onClick={() => onSelectTopic?.(null)}
              className="text-xs font-semibold text-[#0E5A44] hover:underline cursor-pointer"
            >
              সব বিষয় দেখুন (রিসেট)
            </button>
          </div>
        )}

        {/* Editorial Topics Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-px bg-[#E6DFD3] border border-[#E6DFD3]">
          {TOPICS.map((topic) => {
            const isSelected = selectedTopicId === topic.id;
            return (
              <div
                key={topic.id}
                onClick={() => {
                  onSelectTopic?.(isSelected ? null : topic.id);
                  const el = document.getElementById("latest-articles");
                  if (el) el.scrollIntoView({ behavior: "smooth" });
                }}
                className={`p-6 sm:p-7 flex flex-col justify-between transition-all cursor-pointer group ${
                  isSelected
                    ? "bg-[#F7F3EB] border-2 border-[#0E5A44]"
                    : "bg-[#FFFFFF] hover:bg-[#FAF8F5]"
                }`}
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <div className="w-10 h-10 rounded-xs bg-[#FAF8F5] border border-[#E6DFD3] flex items-center justify-center group-hover:border-[#0E5A44] transition-colors">
                      {getTopicIcon(topic.iconName)}
                    </div>
                    <span className="text-[11px] font-mono text-[#737D86] px-2 py-0.5 bg-[#FAF8F5] border border-[#E6DFD3] rounded-2xs">
                      {toBengaliNumber(topic.articleCount)}টি নিবন্ধ
                    </span>
                  </div>

                  <h3 className="font-serif font-bold text-lg sm:text-xl text-[#181A1B] group-hover:text-[#0E5A44] transition-colors mb-2">
                    {topic.title}
                  </h3>

                  <p className="text-xs text-[#525B62] font-sans leading-relaxed mb-4">
                    {topic.shortDesc}
                  </p>
                </div>

                <div className="pt-4 border-t border-[#F2ECE1] flex items-center justify-between">
                  <span className="text-[11px] italic font-serif text-[#737D86] line-clamp-1">
                    &ldquo;{topic.featuredQuote}&rdquo;
                  </span>
                  <span className="text-xs text-[#0E5A44] font-medium flex items-center gap-1 shrink-0 ml-2 group-hover:translate-x-1 transition-transform">
                    নিবন্ধসমূহ <ArrowRight className="w-3 h-3" />
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
