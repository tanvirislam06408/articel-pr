"use client";

import React, { useState, useEffect } from "react";
import { ArrowUp } from "lucide-react";
import { toBengaliNumber } from "@/lib/utils";

export function ReadingTools() {
  const [scrollProgress, setScrollProgress] = useState(0);
  const [showScrollTop, setShowScrollTop] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const totalScroll = window.scrollY || document.documentElement.scrollTop;
      const windowHeight =
        document.documentElement.scrollHeight - document.documentElement.clientHeight;
      if (windowHeight > 0) {
        const progress = (totalScroll / windowHeight) * 100;
        setScrollProgress(Math.min(100, Math.max(0, progress)));
      }
      setShowScrollTop(totalScroll > 400);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <>
      {/* Top Reading Progress Bar Track */}
      <div
        className="fixed top-0 left-0 right-0 h-1.5 z-50 bg-stone-200/60 dark:bg-stone-800/70 backdrop-blur-xs pointer-events-none overflow-hidden"
        role="progressbar"
        aria-valuenow={Math.round(scrollProgress)}
        aria-valuemin={0}
        aria-valuemax={100}
        aria-label="পঠন অগ্রগতি"
      >
        <div
          className="h-full bg-gradient-to-r from-[#0E5A44] via-[#008767] to-[#00A87E] transition-[width] duration-150 ease-out shadow-[0_0_10px_rgba(0,135,103,0.5)]"
          style={{ width: `${scrollProgress}%` }}
        />
      </div>

      {/* Floating Scroll to Top with Reading Progress % */}
      {showScrollTop && (
        <button
          onClick={scrollToTop}
          title="উপরে ফিরে যান"
          className="fixed bottom-6 right-6 z-40 p-2.5 rounded-full bg-[#FAF8F5] dark:bg-stone-800 text-[#008767] dark:text-emerald-400 border border-[#E5E0D8] dark:border-stone-700 shadow-lg hover:bg-emerald-50 dark:hover:bg-stone-700 hover:scale-105 active:scale-95 transition-all duration-200 flex items-center gap-1.5 text-xs font-mono group cursor-pointer"
        >
          <ArrowUp className="w-4 h-4 transition-transform group-hover:-translate-y-0.5" />
          <span className="font-semibold pr-1">
            {toBengaliNumber(Math.round(scrollProgress))}%
          </span>
        </button>
      )}
    </>
  );
}

