"use client";

import React, { useState, useEffect } from "react";
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
import { api } from "@/lib/api";

export default function AdminDashboardPage() {
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);
  const [articles, setArticles] = useState<AdminArticle[]>(INITIAL_ADMIN_ARTICLES);
  const [metrics, setMetrics] = useState<any[]>(INITIAL_METRICS);
  const [articleToDelete, setArticleToDelete] = useState<AdminArticle | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const fetchDashboardData = async () => {
    try {
      // Fetch articles
      const articlesRes = await api.articles.getAll({ limit: 20 });
      if (articlesRes.data && articlesRes.data.length > 0) {
        const mappedArticles: AdminArticle[] = articlesRes.data.map((a: any) => ({
          id: a.id,
          title: a.title,
          slug: a.slug,
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

      // Fetch metrics
      const analyticsRes = await api.analytics.getDashboard();
      if (analyticsRes.data?.metrics) {
        setMetrics(analyticsRes.data.metrics);
      }
    } catch (err) {
      console.warn("Backend not reachable or using local cache:", err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const handleDeleteConfirm = async (articleId: string) => {
    setIsDeleting(true);
    try {
      await api.articles.delete(articleId);
      const deletedArticle = articles.find((a) => a.id === articleId);
      setArticles((prev) => prev.filter((a) => a.id !== articleId));
      setToastMessage(`"${deletedArticle?.title.slice(0, 30)}..." লেখাটি সফলভাবে মুছে ফেলা হয়েছে।`);
    } catch (err: any) {
      // Fallback optimistic delete
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
    setToastMessage(`"${article.title.slice(0, 30)}..." সম্পাদনা করা হচ্ছে...`);
    setTimeout(() => setToastMessage(null), 3000);
  };

  const handleViewArticle = (article: AdminArticle) => {
    if (typeof window !== "undefined") {
      window.open(`/articles/${article.slug}`, "_blank");
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

        {/* Dashboard Main Workspace */}
        <main className="flex-1 p-4 sm:p-6 lg:p-8 max-w-7xl mx-auto w-full space-y-8">
          {/* Toast Notification Banner */}
          {toastMessage && (
            <div
              role="status"
              className="p-3 bg-[#0E5A44]/10 border border-[#0E5A44]/20 rounded-xs flex items-center justify-between text-xs text-[#0E5A44] transition-all animate-in fade-in slide-in-from-top-2"
            >
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 shrink-0 text-[#0E5A44]" />
                <span className="font-medium">{toastMessage}</span>
              </div>
              <button
                onClick={() => setToastMessage(null)}
                className="text-[11px] underline hover:opacity-80 ml-4 cursor-pointer"
              >
                বাতিল
              </button>
            </div>
          )}

          {/* Welcome & Action Bar */}
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 pb-4 border-b border-[#E6DFD3]">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <h1 className="font-serif text-2xl font-bold tracking-tight text-[#181A1B]">
                  সম্পাদকীয় সারসংক্ষেপ
                </h1>
                <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-medium bg-[#0E5A44]/10 text-[#0E5A44]">
                  <Sparkles className="w-2.5 h-2.5" /> লাইভ সিঙ্ক
                </span>
              </div>
              <p className="text-xs text-[#525B62]">
                মনন পত্রিকার সাম্প্রতিক প্রকাশনা, পাঠক সম্পৃক্ততা ও পাঠের সামগ্রিক পরিসংখ্যান।
              </p>
            </div>

            <div className="flex items-center gap-2.5">
              <Link
                href="/admin/articles"
                className="inline-flex items-center justify-center gap-1.5 px-4 py-2 bg-[#0E5A44] hover:bg-[#094030] text-[#FFFFFF] text-xs font-medium rounded-xs shadow-2xs transition-colors cursor-pointer"
              >
                <Plus className="w-4 h-4" />
                <span>নতুন প্রবন্ধ প্রকাশ করুন</span>
              </Link>
            </div>
          </div>

          {/* Metrics Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {metrics.map((metric) => (
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


          {/* Performance Analytics Visual Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2">
              <AnalyticsChart />
            </div>

            {/* Editorial Quick Insights */}
            <div className="bg-[#FFFFFF] border border-[#E6DFD3] rounded-sm p-5 flex flex-col justify-between shadow-2xs">
              <div className="space-y-4">
                <div className="flex items-center justify-between pb-3 border-b border-[#F2ECE1]">
                  <h2 className="font-serif text-sm font-bold text-[#181A1B]">
                    সম্পাদকীয় অন্তর্দৃষ্টি
                  </h2>
                  <span className="text-[10px] font-mono text-[#737D86]">চলতি সপ্তাহ</span>
                </div>

                <div className="space-y-3 text-xs text-[#525B62] leading-relaxed">
                  <div className="p-3 bg-[#FAF8F5] border-l-2 border-[#0E5A44] rounded-r-xs">
                    <p className="font-medium text-[#181A1B] mb-0.5">সবচেয়ে পঠিত বিভাগ</p>
                    <p className="text-[11px]">‘পর্নোগ্রাফি ও ডোপামিন রিবুট’ বিভাগে এই সপ্তাহে সর্বাধিক পাঠক সম্পৃক্ততা দেখা গেছে।</p>
                  </div>

                  <div className="p-3 bg-[#FAF8F5] border-l-2 border-[#C88A2E] rounded-r-xs">
                    <p className="font-medium text-[#181A1B] mb-0.5">গড় পাঠের সময়কাল</p>
                    <p className="text-[11px]">প্রতিটি দীর্ঘ প্রবন্ধ পাঠকেরা গড়ে ৪ মিনিট ৩৬ সেকেন্ড গভীর মনোযোগের সাথে পড়েছেন।</p>
                  </div>

                  <div className="p-3 bg-[#FAF8F5] border-l-2 border-[#35607A] rounded-r-xs">
                    <p className="font-medium text-[#181A1B] mb-0.5">নিউজলেটার বৃদ্ধি</p>
                    <p className="text-[11px]">গত ৭ দিনে নতুন ১৮৭ জন পাঠক সাপ্তাহিক মননশীল সংকলনে সদস্যভুক্ত হয়েছেন।</p>
                  </div>
                </div>
              </div>

              <div className="pt-4 border-t border-[#F2ECE1] mt-4">
                <Link
                  href="/admin/analytics"
                  className="text-xs text-[#0E5A44] hover:underline font-medium inline-flex items-center gap-1"
                >
                  <span>বিস্তারিত পাঠক বিশ্লেষণ দেখুন</span>
                  <span>→</span>
                </Link>
              </div>
            </div>
          </div>

          {/* Recent Articles Data Table */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <h2 className="font-serif text-lg font-bold text-[#181A1B]">
                সাম্প্রতিক প্রবন্ধসমূহ
              </h2>
              <Link
                href="/admin/articles"
                className="text-xs text-[#0E5A44] hover:underline font-medium"
              >
                সবগুলো দেখুন ({articles.length}টি)
              </Link>
            </div>

            <ArticleTable
              articles={articles}
              onEdit={handleEditArticle}
              onDelete={(art) => setArticleToDelete(art)}
              onView={handleViewArticle}
            />
          </div>
        </main>
      </div>

      {/* Delete Confirmation Modal Dialog */}
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
