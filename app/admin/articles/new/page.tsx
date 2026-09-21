"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { AdminSidebar } from "@/components/admin/AdminSidebar";
import { AdminHeader } from "@/components/admin/AdminHeader";
import { TOPICS } from "@/lib/data/topics";
import { ArrowLeft, Save, Send, CheckCircle2, FileText } from "lucide-react";

export default function NewArticlePage() {
  const router = useRouter();
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState(TOPICS[0].id);
  const [excerpt, setExcerpt] = useState("");
  const [content, setContent] = useState("");
  const [status, setStatus] = useState<"published" | "draft">("draft");
  const [isSaving, setIsSaving] = useState(false);
  const [savedSuccess, setSavedSuccess] = useState(false);

  const handleSave = (publishState: "published" | "draft") => {
    setStatus(publishState);
    setIsSaving(true);

    setTimeout(() => {
      setIsSaving(false);
      setSavedSuccess(true);
      setTimeout(() => {
        router.push("/admin/dashboard");
      }, 1200);
    }, 600);
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
          title="নতুন লেখা"
          breadcrumb="সম্পাদকীয় রচনা"
        />

        <main className="flex-1 p-4 sm:p-6 lg:p-8 max-w-4xl w-full mx-auto space-y-6">
          {savedSuccess && (
            <div
              role="status"
              className="p-4 bg-[#E8F3EE] border border-[#0E5A44] rounded-xs text-xs text-[#0E5A44] flex items-center gap-2 shadow-sm animate-in fade-in duration-200"
            >
              <CheckCircle2 className="w-5 h-5 shrink-0" />
              <span className="font-medium">
                লেখাটি সফলভাবে {status === "published" ? "প্রকাশিত" : "খসড়া হিসেবে সংরক্ষিত"} হয়েছে! ড্যাশবোর্ডে ফিরে যাওয়া হচ্ছে...
              </span>
            </div>
          )}

          {/* Top Bar Action Navigation */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#E6DFD3] pb-4">
            <Link
              href="/admin/dashboard"
              className="inline-flex items-center gap-2 text-xs text-[#525B62] hover:text-[#0E5A44] transition-colors"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>ড্যাশবোর্ডে ফিরে যান</span>
            </Link>

            <div className="flex items-center gap-2.5">
              <button
                type="button"
                onClick={() => handleSave("draft")}
                disabled={isSaving}
                className="px-3.5 py-2 bg-[#FFFFFF] border border-[#E6DFD3] hover:bg-[#F2ECE1] text-[#525B62] text-xs font-medium rounded-xs transition-colors flex items-center gap-1.5 cursor-pointer disabled:opacity-50"
              >
                <Save className="w-3.5 h-3.5" />
                <span>খসড়া সংরক্ষণ</span>
              </button>

              <button
                type="button"
                onClick={() => handleSave("published")}
                disabled={isSaving}
                className="px-4 py-2 bg-[#0E5A44] hover:bg-[#094030] text-[#FFFFFF] text-xs font-medium rounded-xs transition-colors shadow-2xs flex items-center gap-1.5 cursor-pointer disabled:opacity-50"
              >
                <Send className="w-3.5 h-3.5" />
                <span>{isSaving ? "সংরক্ষণ হচ্ছে..." : "প্রকাশ করুন"}</span>
              </button>
            </div>
          </div>

          {/* Article Editor Form */}
          <div className="bg-[#FFFFFF] border border-[#E6DFD3] rounded-xs shadow-xs p-6 sm:p-8 space-y-6">
            {/* Title Input */}
            <div className="space-y-1.5">
              <label htmlFor="article-title" className="block text-xs font-bold text-[#181A1B]">
                প্রবন্ধের শিরোনাম
              </label>
              <input
                id="article-title"
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="যেমন: ডিজিটাল কোলাহলে মনোযোগ পুনরুদ্ধারের উপায়..."
                className="w-full px-4 py-3 bg-[#FAF8F5] border border-[#E6DFD3] rounded-xs text-base sm:text-lg font-serif font-bold text-[#181A1B] placeholder-[#737D86] focus:outline-hidden focus:border-[#0E5A44] focus:bg-[#FFFFFF] transition-colors"
              />
            </div>

            {/* Category Selector */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <label htmlFor="article-category" className="block text-xs font-bold text-[#181A1B]">
                  বিষয় বা ক্যাটাগরি
                </label>
                <select
                  id="article-category"
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  className="w-full px-3 py-2.5 bg-[#FAF8F5] border border-[#E6DFD3] rounded-xs text-xs text-[#181A1B] focus:outline-hidden focus:border-[#0E5A44] focus:bg-[#FFFFFF] transition-colors"
                >
                  {TOPICS.map((t) => (
                    <option key={t.id} value={t.id}>
                      {t.title}
                    </option>
                  ))}
                </select>
              </div>

              <div className="space-y-1.5">
                <label htmlFor="author-name" className="block text-xs font-bold text-[#181A1B]">
                  লেখকের নাম ও পদবী
                </label>
                <input
                  id="author-name"
                  type="text"
                  defaultValue="তানভীর হাসান (সম্পাদক)"
                  className="w-full px-3 py-2.5 bg-[#FAF8F5] border border-[#E6DFD3] rounded-xs text-xs text-[#181A1B] focus:outline-hidden focus:border-[#0E5A44] focus:bg-[#FFFFFF] transition-colors"
                />
              </div>
            </div>

            {/* Excerpt Summary */}
            <div className="space-y-1.5">
              <label htmlFor="article-excerpt" className="block text-xs font-bold text-[#181A1B]">
                সারসংক্ষেপ / ভূমিকা (Excerpt)
              </label>
              <textarea
                id="article-excerpt"
                rows={3}
                value={excerpt}
                onChange={(e) => setExcerpt(e.target.value)}
                placeholder="প্রবন্ধের মূল বক্তব্য বা দুটি বাক্যের আকর্ষণীয় সারসংক্ষেপ..."
                className="w-full px-3 py-2.5 bg-[#FAF8F5] border border-[#E6DFD3] rounded-xs text-xs text-[#181A1B] placeholder-[#737D86] focus:outline-hidden focus:border-[#0E5A44] focus:bg-[#FFFFFF] transition-colors font-serif leading-relaxed"
              />
            </div>

            {/* Body Content Editor */}
            <div className="space-y-1.5">
              <div className="flex items-center justify-between">
                <label htmlFor="article-content" className="block text-xs font-bold text-[#181A1B]">
                  মূল প্রবন্ধের বিবরণ
                </label>
                <span className="text-[11px] text-[#737D86] font-mono flex items-center gap-1">
                  <FileText className="w-3 h-3" />
                  মার্কডাউন সমর্থিত
                </span>
              </div>
              <textarea
                id="article-content"
                rows={12}
                value={content}
                onChange={(e) => setContent(e.target.value)}
                placeholder="এখানে বিস্তারিত প্রবন্ধ লিখুন..."
                className="w-full p-4 bg-[#FAF8F5] border border-[#E6DFD3] rounded-xs text-sm font-serif text-[#181A1B] placeholder-[#737D86] focus:outline-hidden focus:border-[#0E5A44] focus:bg-[#FFFFFF] transition-colors leading-relaxed"
              />
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
