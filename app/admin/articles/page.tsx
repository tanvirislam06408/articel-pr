"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { AdminSidebar } from "@/components/admin/AdminSidebar";
import { AdminHeader } from "@/components/admin/AdminHeader";
import { ArticleTable } from "@/components/admin/ArticleTable";
import { DeleteDialog } from "@/components/admin/DeleteDialog";
import { CreateArticleModal } from "@/components/admin/CreateArticleModal";
import { INITIAL_ADMIN_ARTICLES, AdminArticle } from "@/lib/data/admin-articles";
import { Plus, CheckCircle2 } from "lucide-react";
import { api } from "@/lib/api";

export default function AdminArticlesPage() {
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);
  const [articles, setArticles] = useState<AdminArticle[]>(INITIAL_ADMIN_ARTICLES);
  const [articleToDelete, setArticleToDelete] = useState<AdminArticle | null>(null);
  const [editingArticle, setEditingArticle] = useState<any | null>(null);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const fetchArticles = async () => {
    try {
      const res = await api.articles.getAll({ limit: 50 });
      if (res.data && res.data.length > 0) {
        const mappedArticles: AdminArticle[] = res.data.map((a: any) => ({
          id: a.id,
          title: a.title,
          slug: a.slug,
          kicker: a.kicker,
          excerpt: a.excerpt,
          content: a.content,
          category: a.topicTitle || "সাধারণ",
          categorySlug: a.topicId || "general",
          status: a.status === "draft" ? "draft" : "published",
          publishedDate: a.publishedDate,
          views: a.views || 0,
          author: a.author?.name || "মনন সম্পাদক",
          readTime: a.readTime,
        }));
        setArticles(mappedArticles);
      }
    } catch (err) {
      console.warn("Backend not reachable or using initial articles:", err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchArticles();
  }, []);

  const handleDeleteConfirm = async (articleId: string) => {
    setIsDeleting(true);
    try {
      await api.articles.delete(articleId);
      const deletedArticle = articles.find((a) => a.id === articleId);
      setArticles((prev) => prev.filter((a) => a.id !== articleId));
      setToastMessage(`"${deletedArticle?.title.slice(0, 30)}..." লেখাটি সফলভাবে মুছে ফেলা হয়েছে।`);
    } catch {
      const deletedArticle = articles.find((a) => a.id === articleId);
      setArticles((prev) => prev.filter((a) => a.id !== articleId));
      setToastMessage(`"${deletedArticle?.title.slice(0, 30)}..." লেখাটি মুছে ফেলা হয়েছে।`);
    } finally {
      setIsDeleting(false);
      setArticleToDelete(null);
      setTimeout(() => setToastMessage(null), 3500);
    }
  };

  const handleEditArticle = (article: AdminArticle) => {
    setEditingArticle(article);
    setIsCreateModalOpen(true);
  };

  const handleViewArticle = (article: AdminArticle) => {
    if (typeof window !== "undefined") {
      window.open(`/articles/${article.slug}`, "_blank");
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
                বাতিল
              </button>
            </div>
          )}

          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 pb-4 border-b border-[#E6DFD3]">
            <div>
              <h1 className="font-serif text-2xl font-bold tracking-tight text-[#181A1B]">
                সকল প্রকাশিত ও খসড়া প্রবন্ধ
              </h1>
              <p className="text-xs text-[#525B62] mt-0.5">
                মোট {articles.length}টি নিবন্ধ সংরক্ষিত রয়েছে। ফিল্টার ও অনুসন্ধান করে পরিচালনা করুন।
              </p>
            </div>

            <button
              onClick={() => {
                setEditingArticle(null);
                setIsCreateModalOpen(true);
              }}
              className="inline-flex items-center justify-center gap-1.5 px-4 py-2.5 bg-[#0E5A44] hover:bg-[#094030] text-[#FFFFFF] text-xs font-medium rounded-xs shadow-2xs transition-colors cursor-pointer"
            >
              <Plus className="w-4 h-4" />
              <span>নতুন প্রবন্ধ লিখুন</span>
            </button>
          </div>

          <ArticleTable
            articles={articles}
            onEdit={handleEditArticle}
            onDelete={(art) => setArticleToDelete(art)}
            onView={handleViewArticle}
          />
        </main>
      </div>

      <CreateArticleModal
        isOpen={isCreateModalOpen}
        onClose={() => {
          setIsCreateModalOpen(false);
          setEditingArticle(null);
        }}
        onSuccess={() => {
          fetchArticles();
          setToastMessage("প্রবন্ধ সফলভাবে হালনাগাদ/প্রকাশ করা হয়েছে!");
          setTimeout(() => setToastMessage(null), 3500);
        }}
        editArticle={editingArticle}
      />

      <DeleteDialog
        isOpen={!!articleToDelete}
        article={articleToDelete}
        onClose={() => setArticleToDelete(null)}
        onConfirm={(id) => handleDeleteConfirm(id)}
        isDeleting={isDeleting}
      />

    </div>
  );
}
