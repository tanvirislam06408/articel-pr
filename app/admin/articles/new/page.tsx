"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { AdminSidebar } from "@/components/admin/AdminSidebar";
import { AdminHeader } from "@/components/admin/AdminHeader";
import { TOPICS, Topic } from "@/lib/data/topics";
import { ArrowLeft, Save, Send, CheckCircle2, FileText, AlertCircle } from "lucide-react";
import { api } from "@/lib/api";

export default function NewArticlePage() {
  const router = useRouter();
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);
  const [topics, setTopics] = useState<Topic[]>(TOPICS);
  const [title, setTitle] = useState("");
  const [kicker, setKicker] = useState("বিশেষ অনুসন্ধান");
  const [category, setCategory] = useState(TOPICS[0].id);
  const [excerpt, setExcerpt] = useState("");
  const [content, setContent] = useState("");
  const [isSaving, setIsSaving] = useState(false);
  const [savedSuccess, setSavedSuccess] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  useEffect(() => {
    api.topics
      .getAll()
      .then((res) => {
        if (res.data && res.data.length > 0) {
          setTopics(res.data);
          setCategory(res.data[0].id);
        }
      })
      .catch(() => {});
  }, []);

  const handleSave = async (publishState: "published" | "draft") => {
    setErrorMessage(null);

    if (!title.trim() || !excerpt.trim() || !content.trim()) {
      setErrorMessage("অনুগ্রহ করে শিরোনাম, সারসংক্ষেপ এবং মূল বিবরণ পূরণ করুন।");
      return;
    }

    setIsSaving(true);

    try {
      await api.articles.create({
        title: title.trim(),
        kicker: kicker.trim() || "বিশেষ পর্যালোচনা",
        excerpt: excerpt.trim(),
        content: content.trim(),
        topicId: category,
        status: publishState,
      });

      setSavedSuccess(true);
      setTimeout(() => {
        router.push("/admin/articles");
      }, 1000);
    } catch (err: any) {
      setErrorMessage(err.message || "প্রবন্ধ সংরক্ষণ করতে সমস্যা হয়েছে।");
    } finally {
      setIsSaving(false);
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
                লেখাটি সফলভাবে সংরক্ষিত হয়েছে! আর্কাইভে ফিরে যাওয়া হচ্ছে...
              </span>
            </div>
          )}

          {errorMessage && (
            <div className="p-3 bg-rose-50 border border-rose-200 rounded-xs text-xs text-rose-700 flex items-center gap-2">
              <AlertCircle className="w-4 h-4 shrink-0" />
              <span>{errorMessage}</span>
            </div>
          )}

          {/* Top Bar Action Navigation */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#E6DFD3] pb-4">
            <Link
              href="/admin/articles"
              className="inline-flex items-center gap-2 text-xs text-[#525B62] hover:text-[#0E5A44] transition-colors"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>প্রবন্ধ তালিকায় ফিরে যান</span>
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
                প্রবন্ধের শিরোনাম *
              </label>
              <input
                id="article-title"
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="যেমন: ডিজিটাল কোলাহলে মনোযোগ পুনরুদ্ধারের উপায়..."
                className="w-full px-4 py-3 bg-[#FAF8F5] border border-[#E6DFD3] rounded-xs text-base sm:text-lg font-serif font-bold text-[#181A1B] placeholder-[#737D86] focus:outline-hidden focus:border-[#0E5A44] focus:bg-[#FFFFFF] transition-colors"
                required
              />
            </div>

            {/* Category Selector */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <label htmlFor="article-category" className="block text-xs font-bold text-[#181A1B]">
                  বিষয় বা ক্যাটাগরি *
                </label>
                <select
                  id="article-category"
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  className="w-full px-3 py-2.5 bg-[#FAF8F5] border border-[#E6DFD3] rounded-xs text-xs text-[#181A1B] focus:outline-hidden focus:border-[#0E5A44] focus:bg-[#FFFFFF] transition-colors cursor-pointer"
                >
                  {topics.map((t) => (
                    <option key={t.id} value={t.id}>
                      {t.title}
                    </option>
                  ))}
                </select>
              </div>

              <div className="space-y-1.5">
                <label htmlFor="kicker" className="block text-xs font-bold text-[#181A1B]">
                  উপ-শিরোনাম / কিকার
                </label>
                <input
                  id="kicker"
                  type="text"
                  value={kicker}
                  onChange={(e) => setKicker(e.target.value)}
                  placeholder="যেমন: বিশেষ অনুসন্ধান ও আচরণবিজ্ঞান"
                  className="w-full px-3 py-2.5 bg-[#FAF8F5] border border-[#E6DFD3] rounded-xs text-xs text-[#181A1B] focus:outline-hidden focus:border-[#0E5A44] focus:bg-[#FFFFFF] transition-colors"
                />
              </div>
            </div>

            {/* Excerpt Summary */}
            <div className="space-y-1.5">
              <label htmlFor="article-excerpt" className="block text-xs font-bold text-[#181A1B]">
                সারসংক্ষেপ / ভূমিকা (Excerpt) *
              </label>
              <textarea
                id="article-excerpt"
                rows={3}
                value={excerpt}
                onChange={(e) => setExcerpt(e.target.value)}
                placeholder="প্রবন্ধের মূল বক্তব্য বা দুটি বাক্যের আকর্ষণীয় সারসংক্ষেপ..."
                className="w-full px-3 py-2.5 bg-[#FAF8F5] border border-[#E6DFD3] rounded-xs text-xs text-[#181A1B] placeholder-[#737D86] focus:outline-hidden focus:border-[#0E5A44] focus:bg-[#FFFFFF] transition-colors font-serif leading-relaxed"
                required
              />
            </div>

            {/* Body Content Editor */}
            <div className="space-y-1.5">
              <div className="flex items-center justify-between">
                <label htmlFor="article-content" className="block text-xs font-bold text-[#181A1B]">
                  মূল প্রবন্ধের বিবরণ *
                </label>
                <span className="text-[11px] text-[#737D86] font-mono flex items-center gap-1">
                  <FileText className="w-3 h-3" />
                  সম্পূর্ণ পাঠযোগ্য রচনা
                </span>
              </div>
              <textarea
                id="article-content"
                rows={12}
                value={content}
                onChange={(e) => setContent(e.target.value)}
                placeholder="এখানে বিস্তারিত প্রবন্ধ ও প্যারাগ্রাফ লিখুন..."
                className="w-full p-4 bg-[#FAF8F5] border border-[#E6DFD3] rounded-xs text-sm font-serif text-[#181A1B] placeholder-[#737D86] focus:outline-hidden focus:border-[#0E5A44] focus:bg-[#FFFFFF] transition-colors leading-relaxed"
                required
              />
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
