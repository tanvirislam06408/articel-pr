"use client";

import React, { useState } from "react";
import { AdminSidebar } from "@/components/admin/AdminSidebar";
import { AdminHeader } from "@/components/admin/AdminHeader";
import { TOPICS } from "@/lib/data/topics";
import { toBengaliNumber } from "@/lib/utils";
import { FolderTree, Plus, Sparkles } from "lucide-react";

export default function AdminCategoriesPage() {
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);

  return (
    <div className="min-h-screen bg-[#FAF8F5] text-[#181A1B] flex font-sans selection:bg-[#0E5A44]/15 selection:text-[#0E5A44]">
      <AdminSidebar
        isMobileOpen={isMobileSidebarOpen}
        onMobileClose={() => setIsMobileSidebarOpen(false)}
      />

      <div className="flex-1 flex flex-col min-w-0 min-h-screen">
        <AdminHeader
          onMobileMenuToggle={() => setIsMobileSidebarOpen(true)}
          title="ক্যাটাগরি"
          breadcrumb="বিষয় বিভাজন"
        />

        <main className="flex-1 p-4 sm:p-6 lg:p-8 max-w-7xl w-full mx-auto space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#E6DFD3] pb-6">
            <div className="space-y-1">
              <div className="inline-flex items-center gap-1.5 text-[11px] font-mono text-[#0E5A44] uppercase tracking-wider">
                <Sparkles className="w-3.5 h-3.5" />
                <span>CATEGORIES & TAXONOMY</span>
              </div>
              <h1 className="text-2xl sm:text-3xl font-serif font-black text-[#181A1B] tracking-tight">
                বিষয় ও ক্যাটাগরি ব্যবস্থাপনা
              </h1>
              <p className="text-xs sm:text-sm text-[#525B62] font-serif">
                প্রকাশনার সকল মূল বিষয় ও উপশাখার তালিকা ও বিন্যাস।
              </p>
            </div>

            <button
              type="button"
              className="inline-flex items-center gap-2 px-4 py-2.5 bg-[#0E5A44] hover:bg-[#094030] text-[#FFFFFF] text-xs sm:text-sm font-medium rounded-xs transition-colors shadow-2xs cursor-pointer"
            >
              <Plus className="w-4 h-4" />
              <span>নতুন ক্যাটাগরি তৈরি</span>
            </button>
          </div>

          {/* Categories Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {TOPICS.map((topic) => (
              <div
                key={topic.id}
                className="p-5 bg-[#FFFFFF] border border-[#E6DFD3] rounded-xs flex flex-col justify-between hover:border-[#0E5A44] transition-all group"
              >
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <div className="w-8 h-8 rounded-xs bg-[#FAF8F5] border border-[#E6DFD3] flex items-center justify-center text-[#0E5A44]">
                      <FolderTree className="w-4 h-4" />
                    </div>
                    <span className="text-[11px] font-mono text-[#0E5A44] bg-[#E8F3EE] px-2 py-0.5 rounded-2xs font-medium">
                      {toBengaliNumber(topic.articleCount)}টি নিবন্ধ
                    </span>
                  </div>

                  <h3 className="font-serif font-bold text-base text-[#181A1B] group-hover:text-[#0E5A44] transition-colors mb-1.5">
                    {topic.title}
                  </h3>

                  <p className="text-xs text-[#525B62] leading-relaxed">
                    {topic.shortDesc}
                  </p>
                </div>

                <div className="mt-4 pt-3 border-t border-[#F2ECE1] flex items-center justify-between text-[11px] text-[#737D86]">
                  <span className="font-mono">/{topic.slug}</span>
                  <span className="text-[#0E5A44] font-medium hover:underline cursor-pointer">
                    সম্পাদনা
                  </span>
                </div>
              </div>
            ))}
          </div>
        </main>
      </div>
    </div>
  );
}
