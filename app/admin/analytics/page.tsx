"use client";

import React, { useState, useEffect } from "react";
import { AdminSidebar } from "@/components/admin/AdminSidebar";
import { AdminHeader } from "@/components/admin/AdminHeader";
import { AnalyticsChart } from "@/components/admin/AnalyticsChart";
import { INITIAL_ADMIN_ARTICLES } from "@/lib/data/admin-articles";
import { toBengaliNumber } from "@/lib/utils";
import { Sparkles, Eye, BookOpen, Users, FolderTree } from "lucide-react";
import { api } from "@/lib/api";

export default function AdminAnalyticsPage() {
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);
  const [topArticles, setTopArticles] = useState<any[]>(INITIAL_ADMIN_ARTICLES);
  const [metrics, setMetrics] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    api.analytics
      .getDashboard()
      .then((res) => {
        if (res.data) {
          if (res.data.popularArticles) {
            setTopArticles(res.data.popularArticles);
          }
          if (res.data.metrics) {
            setMetrics(res.data.metrics);
          }
        }
      })
      .catch((err) => {
        console.warn("Could not fetch live analytics:", err);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, []);

  return (
    <div className="min-h-screen bg-[#FAF8F5] text-[#181A1B] flex font-sans selection:bg-[#0E5A44]/15 selection:text-[#0E5A44]">
      <AdminSidebar
        isMobileOpen={isMobileSidebarOpen}
        onMobileClose={() => setIsMobileSidebarOpen(false)}
      />

      <div className="flex-1 flex flex-col min-w-0 min-h-screen">
        <AdminHeader
          onMobileMenuToggle={() => setIsMobileSidebarOpen(true)}
          title="বিশ্লেষণ"
          breadcrumb="পাঠক পরিসংখ্যান"
        />

        <main className="flex-1 p-4 sm:p-6 lg:p-8 max-w-7xl w-full mx-auto space-y-8">
          <div className="space-y-1 border-b border-[#E6DFD3] pb-6">
            <div className="inline-flex items-center gap-1.5 text-[11px] font-mono text-[#0E5A44] uppercase tracking-wider">
              <Sparkles className="w-3.5 h-3.5" />
              <span>READER ENGAGEMENT & ANALYTICS</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-serif font-black text-[#181A1B] tracking-tight">
              পাঠক সম্পৃক্ততা ও বিশ্লেষণ
            </h1>
            <p className="text-xs sm:text-sm text-[#525B62] font-serif">
              আপনার প্রকাশনার পাঠকপ্রিয় বিষয় ও পাঠের গভীরতার তথ্যভিত্তিক পর্যালোচনা।
            </p>
          </div>

          {/* Key Metrics Live */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {metrics.length > 0 ? (
              metrics.map((m) => (
                <div key={m.id} className="p-5 bg-[#FFFFFF] border border-[#E6DFD3] rounded-xs shadow-2xs">
                  <span className="text-xs text-[#737D86] font-medium block mb-1">{m.label}</span>
                  <span className="font-serif font-black text-2xl sm:text-3xl text-[#181A1B]">
                    {toBengaliNumber(m.value)}
                  </span>
                  <span className="text-[11px] text-[#0E5A44] font-medium block mt-1.5">
                    {m.changePercent} • {m.period}
                  </span>
                </div>
              ))
            ) : (
              <>
                <div className="p-5 bg-[#FFFFFF] border border-[#E6DFD3] rounded-xs shadow-2xs">
                  <span className="text-xs text-[#737D86] font-medium block mb-1">মোট পাঠ সংখ্যা</span>
                  <span className="font-serif font-black text-2xl sm:text-3xl text-[#181A1B]">
                    {toBengaliNumber("11,160")}
                  </span>
                  <span className="text-[11px] text-[#0E5A44] font-medium block mt-1.5">+১২.৪% গত ৩০ দিনে</span>
                </div>
                <div className="p-5 bg-[#FFFFFF] border border-[#E6DFD3] rounded-xs shadow-2xs">
                  <span className="text-xs text-[#737D86] font-medium block mb-1">প্রকাশিত প্রবন্ধ</span>
                  <span className="font-serif font-black text-2xl sm:text-3xl text-[#181A1B]">
                    {toBengaliNumber(topArticles.length)}টি
                  </span>
                  <span className="text-[11px] text-[#0E5A44] font-medium block mt-1.5">নিয়মিত হালনাগাদ</span>
                </div>
              </>
            )}
          </div>

          {/* Chart Section */}
          <div className="bg-[#FFFFFF] border border-[#E6DFD3] rounded-sm p-6 shadow-2xs">
            <AnalyticsChart />
          </div>

          {/* Top Read Articles Table */}
          <div className="bg-[#FFFFFF] border border-[#E6DFD3] rounded-sm p-6 shadow-2xs space-y-4">
            <h2 className="font-serif font-bold text-lg text-[#181A1B]">
              সর্বাধিক পঠিত শীর্ষ প্রবন্ধসমূহ
            </h2>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead>
                  <tr className="border-b border-[#E6DFD3] text-[#737D86] font-mono">
                    <th className="pb-3 font-medium">প্রবন্ধের শিরোনাম</th>
                    <th className="pb-3 font-medium">বিভাগ</th>
                    <th className="pb-3 font-medium">লেখক</th>
                    <th className="pb-3 font-medium text-right">পাঠ সংখ্যা (Views)</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#F2ECE1]">
                  {topArticles.map((art) => (
                    <tr key={art.id} className="hover:bg-[#FAF8F5] transition-colors">
                      <td className="py-3.5 pr-4 font-serif font-semibold text-[#181A1B] max-w-xs truncate">
                        <a href={`/articles/${art.slug}`} target="_blank" rel="noreferrer" className="hover:text-[#0E5A44]">
                          {art.title}
                        </a>
                      </td>
                      <td className="py-3.5 pr-4 text-[#525B62]">{art.category || art.topicTitle || "সাধারণ"}</td>
                      <td className="py-3.5 pr-4 text-[#525B62]">{art.author || art.author?.name || "মনন সম্পাদক"}</td>
                      <td className="py-3.5 text-right font-mono font-bold text-[#0E5A44]">
                        {toBengaliNumber(art.views || 0)}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
