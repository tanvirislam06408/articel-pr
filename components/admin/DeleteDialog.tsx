"use client";

import React, { useEffect } from "react";
import { AlertTriangle, X, Loader2 } from "lucide-react";
import { AdminArticle } from "@/lib/data/admin-articles";


interface DeleteDialogProps {
  isOpen: boolean;
  article: AdminArticle | null;
  onClose: () => void;
  onConfirm: (articleId: string) => void;
  isDeleting?: boolean;
}

export function DeleteDialog({
  isOpen,
  article,
  onClose,
  onConfirm,
  isDeleting = false,
}: DeleteDialogProps) {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isOpen && !isDeleting) {
        onClose();
      }
    };
    if (isOpen) {
      document.body.style.overflow = "hidden";
      window.addEventListener("keydown", handleKeyDown);
    }
    return () => {
      document.body.style.overflow = "unset";
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen, onClose, isDeleting]);

  if (!isOpen || !article) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="delete-dialog-title"
      aria-describedby="delete-dialog-desc"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-in fade-in duration-150"
      onClick={() => {
        if (!isDeleting) onClose();
      }}
    >
      <div
        className="w-full max-w-md bg-[#FAF8F5] border border-[#E6DFD3] rounded-xs shadow-xl p-6 text-[#181A1B] relative space-y-4"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header with warning icon */}
        <div className="flex items-start justify-between gap-3">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-full bg-[#FEF2F2] border border-[#FEE2E2] flex items-center justify-center text-[#DC2626] shrink-0">
              <AlertTriangle className="w-5 h-5" />
            </div>
            <div>
              <h3
                id="delete-dialog-title"
                className="font-serif font-bold text-lg text-[#181A1B]"
              >
                লেখাটি মুছে ফেলতে চান?
              </h3>
              <p
                id="delete-dialog-desc"
                className="text-xs text-[#DC2626] font-medium"
              >
                এই কাজটি পূর্বাবস্থায় ফেরানো যাবে না।
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            disabled={isDeleting}
            className="p-1 rounded-xs text-[#737D86] hover:text-[#181A1B] hover:bg-[#F2ECE1] transition-colors"
            aria-label="বন্ধ করুন"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Article Summary Box */}
        <div className="p-3 bg-[#FFFFFF] border border-[#E6DFD3] rounded-xs text-xs space-y-1">
          <span className="text-[10px] font-mono uppercase text-[#737D86] block">
            নির্বাচিত প্রবন্ধ:
          </span>
          <p className="font-serif font-bold text-sm text-[#181A1B] line-clamp-2">
            &ldquo;{article.title}&rdquo;
          </p>
          <div className="flex items-center gap-2 text-[11px] text-[#525B62] pt-1">
            <span>বিভাগ: {article.category}</span>
            <span>•</span>
            <span>লেখক: {article.author}</span>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="pt-2 flex items-center justify-end gap-2.5">
          <button
            type="button"
            onClick={onClose}
            disabled={isDeleting}
            className="px-4 py-2 bg-[#FFFFFF] border border-[#E6DFD3] hover:bg-[#F2ECE1] text-[#525B62] text-xs font-medium rounded-xs transition-colors cursor-pointer"
          >
            বাতিল
          </button>

          <button
            type="button"
            onClick={() => onConfirm(article.id)}
            disabled={isDeleting}
            className="px-4 py-2 bg-[#DC2626] hover:bg-[#B91C1C] text-[#FFFFFF] text-xs font-medium rounded-xs transition-colors shadow-2xs cursor-pointer flex items-center gap-1.5 disabled:opacity-50"
          >
            {isDeleting && <Loader2 className="w-3.5 h-3.5 animate-spin text-white" />}
            <span>{isDeleting ? "মুছে ফেলা হচ্ছে..." : "মুছে ফেলুন"}</span>
          </button>

        </div>
      </div>
    </div>
  );
}
