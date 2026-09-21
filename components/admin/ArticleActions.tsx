"use client";

import React, { useState, useRef, useEffect } from "react";
import { MoreHorizontal, Edit3, Trash2, ExternalLink } from "lucide-react";
import { AdminArticle } from "@/lib/data/admin-articles";

interface ArticleActionsProps {
  article: AdminArticle;
  onEdit?: (article: AdminArticle) => void;
  onDelete?: (article: AdminArticle) => void;
  onView?: (article: AdminArticle) => void;
}

export function ArticleActions({
  article,
  onEdit,
  onDelete,
  onView,
}: ArticleActionsProps) {
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen]);

  return (
    <div className="relative inline-block text-left" ref={menuRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="p-1.5 rounded-xs text-[#737D86] hover:text-[#181A1B] hover:bg-[#F2ECE1] transition-colors focus:outline-hidden focus:ring-1 focus:ring-[#0E5A44] cursor-pointer"
        aria-expanded={isOpen}
        aria-haspopup="true"
        aria-label="অ্যাকশন মেনু"
      >
        <MoreHorizontal className="w-4 h-4" />
      </button>

      {isOpen && (
        <div
          className="absolute right-0 mt-1 w-36 bg-[#FFFFFF] border border-[#E6DFD3] rounded-xs shadow-lg py-1 z-30 animate-in fade-in-50 zoom-in-95 duration-100"
          role="menu"
          aria-orientation="vertical"
        >
          <button
            onClick={() => {
              setIsOpen(false);
              onView?.(article);
            }}
            className="w-full text-left px-3 py-1.5 text-xs text-[#4A535A] hover:bg-[#FAF8F5] hover:text-[#0E5A44] flex items-center gap-2 transition-colors cursor-pointer"
            role="menuitem"
          >
            <ExternalLink className="w-3.5 h-3.5" />
            <span>দেখুন</span>
          </button>

          <button
            onClick={() => {
              setIsOpen(false);
              onEdit?.(article);
            }}
            className="w-full text-left px-3 py-1.5 text-xs text-[#4A535A] hover:bg-[#FAF8F5] hover:text-[#0E5A44] flex items-center gap-2 transition-colors cursor-pointer"
            role="menuitem"
          >
            <Edit3 className="w-3.5 h-3.5" />
            <span>সম্পাদনা</span>
          </button>

          <div className="my-1 border-t border-[#F2ECE1]"></div>

          <button
            onClick={() => {
              setIsOpen(false);
              onDelete?.(article);
            }}
            className="w-full text-left px-3 py-1.5 text-xs text-[#DC2626] hover:bg-[#FEF2F2] flex items-center gap-2 transition-colors cursor-pointer"
            role="menuitem"
          >
            <Trash2 className="w-3.5 h-3.5" />
            <span>মুছে ফেলুন</span>
          </button>
        </div>
      )}
    </div>
  );
}
