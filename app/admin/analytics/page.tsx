"use client";

import React, { useState } from "react";
import { AdminSidebar } from "@/components/admin/AdminSidebar";
import { AdminHeader } from "@/components/admin/AdminHeader";
import { AnalyticsChart } from "@/components/admin/AnalyticsChart";
import { INITIAL_ADMIN_ARTICLES } from "@/lib/data/admin-articles";
import { toBengaliNumber } from "@/lib/utils";
import { Sparkles } from "lucide-react";

export default function AdminAnalyticsPage() {
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);

  const topArticles = [...INITIAL_ADMIN_ARTICLES]
    .filter((a) => a.status === "published")
    .sort((a, b) => b.views - a.views);

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

          {/* Key Metrics */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="p-5 bg-[#FFFFFF] border border-[#E6DFD3] rounded-xs">
              <span className="text-xs text-[#737D86] font-medium block mb-1">মাসিক অনন্য পাঠক</span>
              <span className="font-serif font-black text-2xl sm:text-3xl text-[#181A1B]">
                {toBengaliNumber("12,340")}
              </span>
              <span className="text-[11px] text-[#0E5A44] font-medium block mt-1.5">
                +১৪% গত মাসের তুলনায়
              </span>
            </div>

            <div className="p-5 bg-[#FFFFFF] border border-[#E6DFD3] rounded-xs">
              <span className="text-xs text-[#737D86] font-medium block mb-1">গড় পাঠ সময় (Dwell Time)</span>
              <span className="font-serif font-black text-2xl sm:text-3xl text-[#181A1B]">
                {toBengaliNumber("5")} মিনিট {toBengaliNumber("42")} সেকেন্ড
              </span>
              <span className="text-[11px] text-[#0E5A44] font-medium block mt-1.5">
                উচ্চ মানের সম্পৃক্ততা
              </span>
            </div>

            <div className="p-5 bg-[#FFFFFF] border border-[#E6DFD3] rounded-xs">
              <span className="text-xs text-[#737D86] font-medium block mb-1">নিউজলেটার ওপেন রেট</span>
              <span className="font-serif font-black text-2xl sm:text-3xl text-[#181A1B]">
                {toBengaliNumber("64.2")}%
              </span>
              <span className="text-[11px] text-[#0E5A44] font-medium block mt-1.5">
                শিল্প গড়ের চেয়ে অনেক বেশি
              </span>
            </div>
          </div>

          {/* Chart */}
          <AnalyticsChart />

          {/* Most Read Articles */}
          <div className="bg-[#FFFFFF] border border-[#E6DFD3] rounded-xs p-6 space-y-4">
            <h2 className="font-serif font-bold text-lg text-[#181A1B]">
              সর্বাধিক পঠিত প্রবন্ধসমূহ (Top Performing)
            </h2>
            <div className="divide-y divide-[#F2ECE1]">
              {topArticles.map((art, idx) => (
                <div key={art.id} className="py-3 flex items-center justify-between gap-4 text-xs">
                  <div className="flex items-center gap-3">
                    <span className="font-mono text-xs font-bold text-[#737D86] w-5">
                      {toBengaliNumber(idx + 1)}.
                    </span>
                    <div>
                      <h3 className="font-serif font-bold text-sm text-[#181A1B]">{art.title}</h3>
                      <span className="text-[11px] text-[#737D86] font-sans">
                        বিভাগ: {art.category} • লেখক: {art.author}
                      </span>
                    </div>
                  </div>

                  <div className="flex items-center gap-4 text-right shrink-0">
                    <div>
                      <span className="font-mono font-bold text-[#0E5A44] block">
                        {toBengaliNumber(art.views.toLocaleString("en-US"))} ভিউ
                      </span>
                      <span className="text-[10px] text-[#737D86]">পাঠ সময়: {art.readTime}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
