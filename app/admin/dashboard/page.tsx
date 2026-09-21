"use client";

import React, { useState } from "react";
import Link from "next/link";
import { AdminSidebar } from "@/components/admin/AdminSidebar";
import { AdminHeader } from "@/components/admin/AdminHeader";
import { MetricCard } from "@/components/admin/MetricCard";
import { AnalyticsChart } from "@/components/admin/AnalyticsChart";
import { ArticleTable } from "@/components/admin/ArticleTable";
import { DeleteDialog } from "@/components/admin/DeleteDialog";
import {
  INITIAL_ADMIN_ARTICLES,
  INITIAL_METRICS,
  AdminArticle,
} from "@/lib/data/admin-articles";
import { Plus, Sparkles, CheckCircle2 } from "lucide-react";

export default function AdminDashboardPage() {
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);
  const [articles, setArticles] = useState<AdminArticle[]>(INITIAL_ADMIN_ARTICLES);
  const [articleToDelete, setArticleToDelete] = useState<AdminArticle | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Compute live metrics based on articles state
  const totalCount = articles.length;
  const publishedCount = articles.filter((a) => a.status === "published").length;
  const draftCount = articles.filter((a) => a.status === "draft").length;
  const totalViews = articles.reduce((acc, a) => acc + a.views, 0);

  const liveMetrics = [
    {
      ...INITIAL_METRICS[0],
      value: totalCount,
    },
    {
      ...INITIAL_METRICS[1],
      value: publishedCount,
    },
    {
      ...INITIAL_METRICS[2],
      value: draftCount,
    },
    {
      ...INITIAL_METRICS[3],
      value: totalViews,
    },
  ];

  const handleDeleteConfirm = (articleId: string) => {
    setIsDeleting(true);
    setTimeout(() => {
      const deletedArticle = articles.find((a) => a.id === articleId);
      setArticles((prev) => prev.filter((a) => a.id !== articleId));
      setIsDeleting(false);
      setArticleToDelete(null);

      // Trigger temporary success notification
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
      {/* Sidebar Navigation */}
      <AdminSidebar
        isMobileOpen={isMobileSidebarOpen}
        onMobileClose={() => setIsMobileSidebarOpen(false)}
      />

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0 min-h-screen">
        {/* Top Header */}
        <AdminHeader
          onMobileMenuToggle={() => setIsMobileSidebarOpen(true)}
          title="ড্যাশবোর্ড"
          breadcrumb="সম্পাদকীয় ডেক"
        />

        {/* Main Dashboard Body */}
        <main className="flex-1 p-4 sm:p-6 lg:p-8 max-w-7xl w-full mx-auto space-y-8">
          {/* Toast Alert Feedback */}
          {toastMessage && (
            <div
              role="status"
              className="p-3.5 bg-[#E8F3EE] border border-[#0E5A44] rounded-xs text-xs text-[#0E5A44] flex items-center justify-between gap-3 shadow-sm animate-in fade-in slide-in-from-top-2 duration-200"
            >
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 shrink-0" />
                <span className="font-medium">{toastMessage}</span>
              </div>
              <button
                onClick={() => setToastMessage(null)}
                className="text-[11px] underline cursor-pointer hover:opacity-80"
              >
                বন্ধ
              </button>
            </div>
          )}

          {/* Top Title & Primary Quick Action Bar */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#E6DFD3] pb-6">
            <div className="space-y-1">
              <div className="inline-flex items-center gap-1.5 text-[11px] font-mono text-[#0E5A44] uppercase tracking-wider">
                <Sparkles className="w-3.5 h-3.5" />
                <span>EDITORIAL WORKSPACE</span>
              </div>
              <h1 className="text-2xl sm:text-3xl font-serif font-black text-[#181A1B] tracking-tight">
                ড্যাশবোর্ড
              </h1>
              <p className="text-xs sm:text-sm text-[#525B62] font-serif">
                আপনার প্রকাশনার সাম্প্রতিক কার্যক্রম ও পাঠক এনগেজমেন্ট এক নজরে দেখুন।
              </p>
            </div>

            <div className="flex items-center gap-3">
              <Link
                href="/admin/articles/new"
                className="inline-flex items-center gap-2 px-4 py-2.5 bg-[#0E5A44] hover:bg-[#094030] text-[#FFFFFF] text-xs sm:text-sm font-medium rounded-xs transition-colors shadow-2xs cursor-pointer group"
              >
                <Plus className="w-4 h-4 group-hover:rotate-90 transition-transform" />
                <span>নতুন লেখা তৈরি করুন</span>
              </Link>
            </div>
          </div>

          {/* 1. Metric Cards Grid */}
          <section aria-label="প্রধান মেট্রিকসমূহ">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {liveMetrics.map((metric) => (
                <MetricCard
                  key={metric.id}
                  id={metric.id}
                  label={metric.label}
                  value={metric.value}
                  changePercent={metric.changePercent}
                  isPositive={metric.isPositive}
                  period={metric.period}
                />
              ))}
            </div>
          </section>

          {/* 2. Analytics Overview Chart Section */}
          <section aria-label="বিশ্লেষণ ও পাঠক সম্পৃক্ততা">
            <AnalyticsChart />
          </section>

          {/* 3. Recent Articles Management Table Section */}
          <section aria-label="সাম্প্রতিক প্রবন্ধ তালিকা" className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="font-serif font-bold text-lg sm:text-xl text-[#181A1B]">
                  সাম্প্রতিক প্রবন্ধসমূহ
                </h2>
                <p className="text-xs text-[#737D86]">
                  আর্কাইভের সাম্প্রতিক প্রকাশিত ও খসড়া লেখাগুলো পরিচালনা করুন
                </p>
              </div>

              <span className="text-xs font-mono text-[#737D86] hidden sm:inline">
                স্বয়ংক্রিয় সিঙ্ক চালু
              </span>
            </div>

            <ArticleTable
              articles={articles}
              onEdit={handleEditArticle}
              onDelete={(art) => setArticleToDelete(art)}
              onView={handleViewArticle}
            />
          </section>
        </main>
      </div>

      {/* Delete Confirmation Modal Dialog */}
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
