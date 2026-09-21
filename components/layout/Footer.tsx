"use client";

import React from "react";
import Link from "next/link";
import { TOPICS } from "@/lib/data/topics";

import { toBengaliNumber } from "@/lib/utils";
import { ArrowUp } from "lucide-react";

export function Footer() {
  const scrollToTop = () => {
    if (typeof window !== "undefined") {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  return (
    <footer className="w-full bg-[#121516] text-[#FAF8F5] border-t border-[#262D33] pt-14 pb-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Top 4-Column Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 pb-12 border-b border-[#262D33]">
          {/* Col 1: Brand & Editorial Statement (Col 1-5) */}
          <div className="lg:col-span-5 space-y-4">
            <div className="flex items-center gap-2">
              <span className="font-serif font-black text-3xl sm:text-4xl text-[#FAF8F5] tracking-tight">
                মনন
              </span>
            </div>
            <p className="text-[11px] font-mono text-[#68D391] uppercase tracking-widest">
              MONON • JOURNAL OF MINDFUL LIVING
            </p>
            <p className="text-xs sm:text-sm text-[#9CA3AF] font-serif leading-relaxed max-w-sm">
              মনন হলো আধুনিক কোলাহলপূর্ণ ডিজিটাল জীবনে নিজের মনোযোগ, আত্মনিয়ন্ত্রণ ও সুস্থ অভ্যাস পুনরুদ্ধারের একটি স্বাধীন বাংলা সম্পাদকীয় সাময়িকী। বিজ্ঞানসম্মত মনস্তত্ত্ব ও মানবিক সহানুভূতির মেলবন্ধন।
            </p>

            <div className="pt-2 text-xs text-[#9CA3AF] space-y-1 font-sans">
              <p>যোগাযোগ: <span className="font-mono text-[#FAF8F5]">contact@monon-journal.org</span></p>
              <p>সম্পাদকীয় কার্যালয়: ঢাকা, বাংলাদেশ</p>
            </div>
          </div>

          {/* Col 2: Navigation Links (Col 6-7) */}
          <div className="lg:col-span-2 space-y-3">
            <h4 className="font-serif font-bold text-sm text-[#FAF8F5] uppercase tracking-wider border-b border-[#262D33] pb-2">
              বিভাগসমূহ
            </h4>
            <ul className="space-y-2 text-xs text-[#9CA3AF]">
              <li>
                <Link href="/" className="hover:text-[#68D391] transition-colors">প্রধান পাতা</Link>
              </li>
              <li>
                <a href="#featured-story" className="hover:text-[#68D391] transition-colors">প্রচ্ছদ নিবন্ধ</a>
              </li>
              <li>
                <a href="#topics" className="hover:text-[#68D391] transition-colors">প্রধান বিষয়সমূহ</a>
              </li>
              <li>
                <a href="#latest-articles" className="hover:text-[#68D391] transition-colors">সাম্প্রতিক প্রবন্ধ</a>
              </li>
              <li>
                <a href="#start-here" className="hover:text-[#68D391] transition-colors">কোথা থেকে শুরু করবেন?</a>
              </li>
              <li>
                <a href="#philosophy" className="hover:text-[#68D391] transition-colors">সম্পাদনা দর্শন</a>
              </li>
            </ul>
          </div>

          {/* Col 3: Core Topics (Col 8-10) */}
          <div className="lg:col-span-3 space-y-3">
            <h4 className="font-serif font-bold text-sm text-[#FAF8F5] uppercase tracking-wider border-b border-[#262D33] pb-2">
              মূল বিষয়াবলি
            </h4>
            <ul className="space-y-2 text-xs text-[#9CA3AF]">
              {TOPICS.slice(0, 5).map((topic) => (
                <li key={topic.id}>
                  <a href="#topics" className="hover:text-[#68D391] transition-colors flex items-center justify-between">
                    <span>{topic.title}</span>
                    <span className="font-mono text-[10px] text-[#6B7280]">({toBengaliNumber(topic.articleCount)})</span>
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 4: Legal & Ethics (Col 11-12) */}
          <div className="lg:col-span-2 space-y-3">
            <h4 className="font-serif font-bold text-sm text-[#FAF8F5] uppercase tracking-wider border-b border-[#262D33] pb-2">
              নীতিমালা ও শর্ত
            </h4>
            <ul className="space-y-2 text-xs text-[#9CA3AF]">
              <li>
                <a href="#philosophy" className="hover:text-[#68D391] transition-colors">সম্পাদনা নীতিমালা</a>
              </li>
              <li>
                <a href="#philosophy" className="hover:text-[#68D391] transition-colors">গোপনীয়তা নীতি</a>
              </li>
              <li>
                <a href="#philosophy" className="hover:text-[#68D391] transition-colors">দায়মুক্তি বিজ্ঞপ্তি</a>
              </li>
              <li>
                <a href="#contact-story" className="hover:text-[#68D391] transition-colors">চিঠি ও অভিজ্ঞতা পাঠান</a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Colophon & Copyright */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[#9CA3AF]">
          <div className="flex items-center gap-2">
            <span>© ২০২৬ মনন। সর্বস্বত্ব সংরক্ষিত।</span>
            <span className="hidden md:inline text-[#3E4C56]">•</span>
            <span className="hidden md:inline">বাংলা ভাষায় মননশীল ডিজিটাল সুস্থতার প্রথম প্রকাশনা</span>
          </div>

          <div className="flex items-center gap-4">
            <button
              onClick={scrollToTop}
              className="flex items-center gap-1.5 text-xs text-[#9CA3AF] hover:text-[#FAF8F5] transition-colors px-3 py-1 bg-[#1C2226] rounded-xs border border-[#2A343D] cursor-pointer"
              aria-label="পাতার শীর্ষে ফিরে যান"
            >
              <span>শীর্ষে যান</span>
              <ArrowUp className="w-3 h-3" />
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
}
