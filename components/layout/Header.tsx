"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { Search, Menu, X, Bookmark, ArrowRight } from "lucide-react";
import { TOPICS } from "@/lib/data/topics";
import { toBengaliNumber } from "@/lib/utils";

interface HeaderProps {
  onOpenSearch: () => void;
  savedArticlesCount?: number;
}

export function Header({ onOpenSearch, savedArticlesCount = 0 }: HeaderProps) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 40);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      {/* Top Editorial Bar */}
      <header className="w-full bg-[#FAF8F5] text-[#181A1B] border-b border-[#E6DFD3] text-xs">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-2 flex flex-col sm:flex-row items-center justify-between gap-2 border-b border-[#E6DFD3]/60 sm:border-none">
          <div className="flex items-center gap-3 text-[#525B62]">
            <span className="font-serif italic font-medium text-[#181A1B]">সোমবার, ২১ সেপ্টেম্বর ২০২৬</span>
            <span className="hidden md:inline text-[#D9D2C4]">•</span>
            <span className="hidden md:inline font-sans text-[11px] text-[#737D86]">
              সংখ্যা: শরৎ সংস্করণ • প্রথম বর্ষ
            </span>
          </div>

          <div className="flex items-center gap-4 text-[#525B62] text-[11px]">
            <span className="hidden lg:inline text-[#737D86] italic">
              &ldquo;নিজের মনোযোগ, অভ্যাস ও ডিজিটাল জীবনকে সচেতনভাবে পরিচালনা করা&rdquo;
            </span>
            <div className="flex items-center gap-3">
              <button
                onClick={onOpenSearch}
                className="hover:text-[#0E5A44] transition-colors flex items-center gap-1 cursor-pointer"
                title="অনুসন্ধান করুন (Ctrl + K)"
              >
                <Search className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">খুঁজুন</span>
              </button>
              <a
                href="#latest-articles"
                className="hover:text-[#0E5A44] transition-colors flex items-center gap-1"
              >
                <Bookmark className="w-3.5 h-3.5" />
                <span>সংরক্ষণ ({toBengaliNumber(savedArticlesCount)})</span>
              </a>
            </div>
          </div>
        </div>

        {/* Masthead Branding Section */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8 border-b border-[#E6DFD3] flex flex-col items-center justify-center text-center">
          <Link
            href="/"
            className="group inline-flex flex-col items-center focus:outline-hidden"
            aria-label="মনন হোমপেজ"
          >
            <span className="text-4xl sm:text-5xl md:text-6xl font-serif font-black tracking-tight text-[#181A1B] group-hover:text-[#0E5A44] transition-colors">
              মনন
            </span>
            <span className="text-[11px] sm:text-xs font-mono uppercase tracking-[0.25em] text-[#737D86] mt-1">
              MONON • JOURNAL OF MINDFUL LIVING
            </span>
          </Link>
          <p className="text-xs sm:text-sm font-serif text-[#525B62] mt-2 max-w-md italic">
            সচেতন জীবন, গভীর মনোযোগ ও ডিজিটাল সুস্থতার মননশীল সাময়িকী
          </p>
        </div>

        {/* Sticky Editorial Main Navigation */}
        <nav
          aria-label="প্রধান নেভিগেশন"
          className={`sticky top-0 z-40 bg-[#FAF8F5]/95 backdrop-blur-md transition-shadow duration-200 border-b border-[#E6DFD3] ${
            isScrolled ? "shadow-xs" : ""
          }`}
        >
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between h-13">
            {/* Desktop Navigation Links */}
            <div className="hidden md:flex items-center gap-7 text-[14px] font-medium text-[#181A1B]">
              <Link
                href="/"
                className="text-[#0E5A44] font-semibold border-b-2 border-[#0E5A44] pb-0.5 hover:text-[#0E5A44] transition-colors"
              >
                প্রধান
              </Link>
              <a
                href="#featured-story"
                className="hover:text-[#0E5A44] transition-colors pb-0.5"
              >
                প্রচ্ছদ কাহিনী
              </a>
              <a
                href="#topics"
                className="hover:text-[#0E5A44] transition-colors pb-0.5"
              >
                বিষয়সমূহ
              </a>
              <a
                href="#latest-articles"
                className="hover:text-[#0E5A44] transition-colors pb-0.5"
              >
                প্রবন্ধসমূহ
              </a>
              <a
                href="#start-here"
                className="hover:text-[#0E5A44] transition-colors pb-0.5"
              >
                কোথা থেকে শুরু?
              </a>
              <a
                href="#philosophy"
                className="hover:text-[#0E5A44] transition-colors pb-0.5"
              >
                সম্পাদনা দর্শন
              </a>
            </div>

            {/* Mobile Brand Small Logo */}
            <div className="md:hidden flex items-center gap-2">
              <Link href="/" className="font-serif font-black text-xl text-[#181A1B]">
                মনন
              </Link>
            </div>

            {/* Right Nav Action Elements */}
            <div className="flex items-center gap-3">
              {/* Search Shortcut Bar */}
              <button
                onClick={onOpenSearch}
                className="hidden sm:flex items-center gap-2 px-3 py-1.5 bg-[#FFFFFF] border border-[#E6DFD3] hover:border-[#0E5A44] rounded-xs text-xs text-[#525B62] transition-colors cursor-pointer"
                aria-label="নিবন্ধ খুঁজুন"
              >
                <Search className="w-3.5 h-3.5 text-[#737D86]" />
                <span>অনুসন্ধান...</span>
                <kbd className="hidden lg:inline text-[10px] font-mono bg-[#FAF8F5] border border-[#E6DFD3] px-1 py-0.5 rounded-xs text-[#737D86]">
                  ⌘K
                </kbd>
              </button>

              {/* Mobile Search Icon */}
              <button
                onClick={onOpenSearch}
                className="sm:hidden p-2 text-[#525B62] hover:text-[#181A1B]"
                aria-label="অনুসন্ধান"
              >
                <Search className="w-5 h-5" />
              </button>

              {/* Story Submission / Contact CTA Button */}
              <a
                href="#contact-story"
                className="hidden sm:inline-flex items-center gap-1.5 px-4 py-1.5 bg-[#0E5A44] hover:bg-[#094030] text-[#FFFFFF] text-xs font-medium rounded-xs transition-colors shadow-2xs"
              >
                <span>চিঠি পাঠান</span>
                <ArrowRight className="w-3 h-3" />
              </a>

              {/* Mobile Menu Toggle */}
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="md:hidden p-2 text-[#181A1B] hover:text-[#0E5A44] transition-colors"
                aria-expanded={mobileMenuOpen}
                aria-label={mobileMenuOpen ? "মেনু বন্ধ করুন" : "মেনু খুলুন"}
              >
                {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>
          </div>
        </nav>
      </header>

      {/* Mobile Drawer Navigation Menu */}
      {mobileMenuOpen && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label="মোবাইল নেভিগেশন মেনু"
          className="fixed inset-0 z-50 md:hidden bg-black/60 backdrop-blur-xs flex justify-end transition-opacity duration-300"
          onClick={() => setMobileMenuOpen(false)}
        >
          <div
            className="w-[85%] max-w-sm bg-[#FAF8F5] h-full shadow-2xl flex flex-col justify-between border-l border-[#E6DFD3] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Drawer Header */}
            <div>
              <div className="flex items-center justify-between p-5 border-b border-[#E6DFD3]">
                <div>
                  <span className="font-serif font-black text-2xl text-[#181A1B]">মনন</span>
                  <p className="text-[10px] font-mono text-[#737D86] tracking-wider">
                    JOURNAL OF MINDFUL LIVING
                  </p>
                </div>
                <button
                  onClick={() => setMobileMenuOpen(false)}
                  className="p-1.5 rounded-sm hover:bg-[#E6DFD3]/50 text-[#525B62]"
                  aria-label="মেনু বন্ধ করুন"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>

              {/* Navigation Links */}
              <div className="p-5 space-y-4">
                <nav className="flex flex-col space-y-3 text-base font-medium">
                  <Link
                    href="/"
                    onClick={() => setMobileMenuOpen(false)}
                    className="text-[#0E5A44] font-semibold py-1 border-b border-[#E6DFD3]/40"
                  >
                    প্রধান পাতা
                  </Link>
                  <a
                    href="#featured-story"
                    onClick={() => setMobileMenuOpen(false)}
                    className="text-[#181A1B] hover:text-[#0E5A44] py-1 border-b border-[#E6DFD3]/40"
                  >
                    প্রচ্ছদ কাহিনী
                  </a>
                  <a
                    href="#topics"
                    onClick={() => setMobileMenuOpen(false)}
                    className="text-[#181A1B] hover:text-[#0E5A44] py-1 border-b border-[#E6DFD3]/40"
                  >
                    বিষয়সমূহ
                  </a>
                  <a
                    href="#latest-articles"
                    onClick={() => setMobileMenuOpen(false)}
                    className="text-[#181A1B] hover:text-[#0E5A44] py-1 border-b border-[#E6DFD3]/40"
                  >
                    প্রবন্ধসমূহ
                  </a>
                  <a
                    href="#start-here"
                    onClick={() => setMobileMenuOpen(false)}
                    className="text-[#181A1B] hover:text-[#0E5A44] py-1 border-b border-[#E6DFD3]/40"
                  >
                    কোথা থেকে শুরু করবেন?
                  </a>
                  <a
                    href="#philosophy"
                    onClick={() => setMobileMenuOpen(false)}
                    className="text-[#181A1B] hover:text-[#0E5A44] py-1 border-b border-[#E6DFD3]/40"
                  >
                    আমাদের সম্পাদনা দর্শন
                  </a>
                </nav>

                {/* Topics in Mobile Menu */}
                <div className="pt-4 border-t border-[#E6DFD3]">
                  <span className="text-xs font-bold font-serif text-[#737D86] uppercase tracking-wider block mb-2">
                    বিষয় বিভাগসমূহ
                  </span>
                  <div className="grid grid-cols-1 gap-2">
                    {TOPICS.slice(0, 5).map((topic) => (
                      <a
                        key={topic.id}
                        href="#topics"
                        onClick={() => setMobileMenuOpen(false)}
                        className="text-xs text-[#4A535A] hover:text-[#0E5A44] flex items-center justify-between py-1"
                      >
                        <span>{topic.title}</span>
                        <span className="text-[10px] text-[#737D86] font-mono">
                          {toBengaliNumber(topic.articleCount)}টি লেখা
                        </span>
                      </a>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Drawer Bottom CTA */}
            <div className="p-5 border-t border-[#E6DFD3] bg-[#F7F3EB] space-y-3">
              <a
                href="#contact-story"
                onClick={() => setMobileMenuOpen(false)}
                className="w-full flex items-center justify-center gap-2 py-2.5 bg-[#0E5A44] text-[#FFFFFF] text-sm font-medium rounded-xs text-center"
              >
                <span>আপনার অভিজ্ঞতা বা চিঠি পাঠান</span>
              </a>
              <p className="text-[11px] text-[#737D86] text-center">
                শান্ত, তথ্যভিত্তিক ও মননশীল যোগাযোগের আশ্রয়।
              </p>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
