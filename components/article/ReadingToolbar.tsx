"use client";

import React from "react";
import { Moon, Sun, BookOpen, Type } from "lucide-react";
import { Button } from "@/components/ui/button";

export type ReadingTheme = "light" | "sepia" | "dark";
export type FontSize = "sm" | "base" | "lg" | "xl";

interface ReadingToolbarProps {
  theme: ReadingTheme;
  onThemeChange: (theme: ReadingTheme) => void;
  fontSize: FontSize;
  onFontSizeChange: (size: FontSize) => void;
  readTime?: string;
}

export function ReadingToolbar({
  theme,
  onThemeChange,
  fontSize,
  onFontSizeChange,
  readTime,
}: ReadingToolbarProps) {
  return (
    <div className="sticky top-16 z-30 mb-8 py-2.5 px-4 rounded-xl bg-white/80 dark:bg-stone-900/80 backdrop-blur border border-[#E5E0D8] dark:border-stone-800 shadow-sm flex flex-wrap items-center justify-between gap-3">
      {/* Read Time Info */}
      <div className="flex items-center gap-2 text-xs font-medium text-stone-600 dark:text-stone-400">
        <BookOpen className="w-3.5 h-3.5 text-[#008767]" />
        <span>রিডার মোড {readTime ? `• ${readTime}` : ""}</span>
      </div>

      {/* Controls */}
      <div className="flex items-center gap-2">
        {/* Font size adjustments */}
        <div className="flex items-center border border-[#E5E0D8] dark:border-stone-800 rounded-lg p-0.5 bg-[#FAF8F5] dark:bg-stone-800">
          <button
            onClick={() => onFontSizeChange("sm")}
            className={`px-2 py-1 text-xs rounded transition-colors ${
              fontSize === "sm"
                ? "bg-white dark:bg-stone-700 shadow-xs font-bold text-[#008767]"
                : "text-stone-600 dark:text-stone-400"
            }`}
            title="ছোট ফন্ট"
          >
            A-
          </button>
          <button
            onClick={() => onFontSizeChange("base")}
            className={`px-2 py-1 text-xs rounded transition-colors ${
              fontSize === "base"
                ? "bg-white dark:bg-stone-700 shadow-xs font-bold text-[#008767]"
                : "text-stone-600 dark:text-stone-400"
            }`}
            title="স্বাভাবিক ফন্ট"
          >
            A
          </button>
          <button
            onClick={() => onFontSizeChange("lg")}
            className={`px-2 py-1 text-xs rounded transition-colors ${
              fontSize === "lg"
                ? "bg-white dark:bg-stone-700 shadow-xs font-bold text-[#008767]"
                : "text-stone-600 dark:text-stone-400"
            }`}
            title="বড় ফন্ট"
          >
            A+
          </button>
          <button
            onClick={() => onFontSizeChange("xl")}
            className={`px-2 py-1 text-xs rounded transition-colors ${
              fontSize === "xl"
                ? "bg-white dark:bg-stone-700 shadow-xs font-bold text-[#008767]"
                : "text-stone-600 dark:text-stone-400"
            }`}
            title="অতি বড় ফন্ট"
          >
            A++
          </button>
        </div>

        {/* Theme Selectors */}
        <div className="flex items-center border border-[#E5E0D8] dark:border-stone-800 rounded-lg p-0.5 bg-[#FAF8F5] dark:bg-stone-800">
          <button
            onClick={() => onThemeChange("light")}
            className={`p-1.5 rounded transition-colors ${
              theme === "light"
                ? "bg-white dark:bg-stone-700 shadow-xs text-amber-600"
                : "text-stone-600 dark:text-stone-400"
            }`}
            title="সাদা মোড"
          >
            <Sun className="w-3.5 h-3.5" />
          </button>
          <button
            onClick={() => onThemeChange("sepia")}
            className={`px-2 py-1 text-xs rounded transition-colors font-medium ${
              theme === "sepia"
                ? "bg-[#F4ECD8] text-[#5C4033] shadow-xs"
                : "text-stone-600 dark:text-stone-400"
            }`}
            title="সেপিয়া / কাগজের মোড"
          >
            কাগজ
          </button>
          <button
            onClick={() => onThemeChange("dark")}
            className={`p-1.5 rounded transition-colors ${
              theme === "dark"
                ? "bg-stone-900 text-amber-400 shadow-xs"
                : "text-stone-600 dark:text-stone-400"
            }`}
            title="ডার্ক মোড"
          >
            <Moon className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </div>
  );
}
