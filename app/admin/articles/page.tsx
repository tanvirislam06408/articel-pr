"use client";

import React, { useState } from "react";
import Link from "next/link";
import { AdminSidebar } from "@/components/admin/AdminSidebar";
import { AdminHeader } from "@/components/admin/AdminHeader";
import { ArticleTable } from "@/components/admin/ArticleTable";
import { DeleteDialog } from "@/components/admin/DeleteDialog";
import { INITIAL_ADMIN_ARTICLES, AdminArticle } from "@/lib/data/admin-articles";
import { Plus, Sparkles, CheckCircle2 } from "lucide-react";

export default function AdminArticlesPage() {
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);
  const [articles, setArticles] = useState<AdminArticle[]>(INITIAL_ADMIN_ARTICLES);
  const [articleToDelete, setArticleToDelete] = useState<AdminArticle | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const handleDeleteConfirm = (articleId: string) => {
    setIsDeleting(true);
    setTimeout(() => {
      const deletedArticle = articles.find((a) => a.id === articleId);
      setArticles((prev) => prev.filter((a) => a.id !== articleId));
      setIsDeleting(false);
      setArticleToDelete(null);

      setToastMessage(`"${deletedArticle?.title.slice(0, 30)}..." লেখাটি সফলভাবে মুছে ফেলা হয়েছে।`);
      setTimeout(() => setToastMessage(null), 3500);
    }, 450);
  };

  const handleEditArticle = (article: AdminArticle) => {
    setToastMessage(`"${article.title.slice(0, 30)}..." সম্পাদনা মোড উন্মুক্ত করা হচ্ছে...`);
    setTimeout(() => setToastMessage(null), 3000);
  };

  const handleViewArticle = (article: AdminArticle) => {
    if (typeof window !== "undefined") {
      window.open(`/#${article.slug}`, "_blank");
    }
  };

  return (
    <div className="min-h-screen bg-[#FAF8F5] text-[#181A1B] flex font-sans selection:bg-[#0E5A44]/15 selection:text-[#0E5A44]">
      <AdminSidebar
        isMobileOpen={isMobileSidebarOpen}
        onMobileClose={() => setIsMobileSidebarOpen(false)}
      />

      <div className="flex-1 flex flex-col min-w-0 min-h-screen">
        <AdminHeader
          onMobileMenuToggle={() => setIsMobileSidebarOpen(true)}
          title="সব লেখা"
          breadcrumb="আর্কাইভ পরিচালনা"
        />

        <main className="flex-1 p-4 sm:p-6 lg:p-8 max-w-7xl w-full mx-auto space-y-6">
          {toastMessage && (
            <div
              role="status"
              className="p-3.5 bg-[#E8F3EE] border border-[#0E5A44] rounded-xs text-xs text-[#0E5A44] flex items-center justify-between gap-3 shadow-sm animate-in fade-in duration-150"
            >
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 shrink-0" />
                <span className="font-medium">{toastMessage}</span>
              </div>
              <button
                onClick={() => setToastMessage(null)}
                className="text-[11px] underline cursor-pointer"
              >
                বন্ধ
              </button>
            </div>
          )}

          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#E6DFD3] pb-6">
            <div className="space-y-1">
              <div className="inline-flex items-center gap-1.5 text-[11px] font-mono text-[#0E5A44] uppercase tracking-wider">
                <Sparkles className="w-3.5 h-3.5" />
                <span>ALL ARTICLES REPOSITORY</span>
              </div>
              <h1 className="text-2xl sm:text-3xl font-serif font-black text-[#181A1B] tracking-tight">
                সকল প্রবন্ধ তালিকা
              </h1>
              <p className="text-xs sm:text-sm text-[#525B62] font-serif">
                প্রকাশিত ও অপ্রকাশিত সকল লেখার সম্পূর্ণ ভাণ্ডার ও ব্যবস্থাপনা।
              </p>
            </div>

            <Link
              href="/admin/articles/new"
              className="inline-flex items-center gap-2 px-4 py-2.5 bg-[#0E5A44] hover:bg-[#094030] text-[#FFFFFF] text-xs sm:text-sm font-medium rounded-xs transition-colors shadow-2xs cursor-pointer"
            >
              <Plus className="w-4 h-4" />
              <span>নতুন লেখা তৈরি করুন</span>
            </Link>
          </div>

          <ArticleTable
            articles={articles}
            onEdit={handleEditArticle}
            onDelete={(art) => setArticleToDelete(art)}
            onView={handleViewArticle}
          />
        </main>
      </div>

      <DeleteDialog
        isOpen={Boolean(articleToDelete)}
        article={articleToDelete}
        onClose={() => setArticleToDelete(null)}
        onConfirm={handleDeleteConfirm}
        isDeleting={isDeleting}
      />
    </div>
  );
}
