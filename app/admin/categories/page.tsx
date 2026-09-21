"use client";

import React, { useState, useEffect } from "react";
import { AdminSidebar } from "@/components/admin/AdminSidebar";
import { AdminHeader } from "@/components/admin/AdminHeader";
import { TOPICS, Topic } from "@/lib/data/topics";
import { toBengaliNumber } from "@/lib/utils";
import { FolderTree, Plus, Sparkles, X, CheckCircle2, AlertCircle, Loader2 } from "lucide-react";
import { api } from "@/lib/api";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";

export default function AdminCategoriesPage() {
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);
  const [topics, setTopics] = useState<Topic[]>(TOPICS);
  const [isCreateOpen, setIsCreateOpen] = useState(false);
  const [title, setTitle] = useState("");
  const [shortDesc, setShortDesc] = useState("");
  const [featuredQuote, setFeaturedQuote] = useState("");
  const [badgeColor, setBadgeColor] = useState("emerald");
  const [isLoading, setIsLoading] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const fetchTopics = async () => {
    try {
      const res = await api.topics.getAll();
      if (res.data && res.data.length > 0) {
        setTopics(res.data);
      }
    } catch (err) {
      console.warn("Backend not reachable or using static topics:", err);
    }
  };

  useEffect(() => {
    fetchTopics();
  }, []);

  const handleCreateCategory = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim() || !shortDesc.trim()) return;

    setIsLoading(true);
    try {
      await api.topics.create({
        title,
        shortDesc,
        featuredQuote,
        badgeColor,
      });

      setTitle("");
      setShortDesc("");
      setFeaturedQuote("");
      setIsCreateOpen(false);
      setToastMessage("নতুন ক্যাটাগরি সফলভাবে তৈরি করা হয়েছে!");
      setTimeout(() => setToastMessage(null), 3500);
      await fetchTopics();
    } catch (err: any) {
      alert(err.message || "ক্যাটাগরি তৈরি করতে ব্যর্থ হয়েছে।");
    } finally {
      setIsLoading(false);
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
          title="ক্যাটাগরি"
          breadcrumb="বিষয় বিভাজন"
        />

        <main className="flex-1 p-4 sm:p-6 lg:p-8 max-w-7xl w-full mx-auto space-y-6">
          {toastMessage && (
            <div className="p-3.5 bg-[#E8F3EE] border border-[#0E5A44] rounded-xs text-xs text-[#0E5A44] flex items-center gap-2 shadow-sm animate-in fade-in duration-150">
              <CheckCircle2 className="w-4 h-4 shrink-0" />
              <span>{toastMessage}</span>
            </div>
          )}

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
              onClick={() => setIsCreateOpen(true)}
              type="button"
              className="inline-flex items-center gap-2 px-4 py-2.5 bg-[#0E5A44] hover:bg-[#094030] text-[#FFFFFF] text-xs sm:text-sm font-medium rounded-xs transition-colors shadow-2xs cursor-pointer"
            >
              <Plus className="w-4 h-4" />
              <span>নতুন ক্যাটাগরি তৈরি</span>
            </button>
          </div>

          {/* Categories Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {topics.map((topic) => (
              <div
                key={topic.id}
                className="p-5 bg-[#FFFFFF] border border-[#E6DFD3] rounded-xs flex flex-col justify-between hover:border-[#0E5A44] transition-all group shadow-2xs"
              >
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <div className="w-8 h-8 rounded-xs bg-[#FAF8F5] border border-[#E6DFD3] flex items-center justify-center text-[#0E5A44]">
                      <FolderTree className="w-4 h-4" />
                    </div>
                    <span className="text-[11px] font-mono text-[#0E5A44] bg-[#E8F3EE] px-2 py-0.5 rounded-2xs font-medium">
                      {toBengaliNumber(topic.articleCount || 0)}টি নিবন্ধ
                    </span>
                  </div>

                  <h3 className="font-serif font-bold text-base text-[#181A1B] group-hover:text-[#0E5A44] transition-colors mb-1.5">
                    {topic.title}
                  </h3>

                  <p className="text-xs text-[#525B62] leading-relaxed mb-4">
                    {topic.shortDesc}
                  </p>
                </div>

                {topic.featuredQuote && (
                  <div className="pt-3 border-t border-[#F2ECE1] text-[11px] italic text-[#737D86] font-serif">
                    “{topic.featuredQuote}”
                  </div>
                )}
              </div>
            ))}
          </div>
        </main>
      </div>

      {/* Create Category Modal */}
      {isCreateOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-in fade-in duration-200">
          <div className="relative w-full max-w-md bg-white border border-[#E6DFD3] rounded-xl shadow-2xl p-6">
            <div className="flex items-center justify-between pb-3 border-b border-[#E6DFD3] mb-4">
              <h3 className="font-serif font-bold text-base text-[#181A1B]">
                নতুন ক্যাটাগরি তৈরি করুন
              </h3>
              <button
                onClick={() => setIsCreateOpen(false)}
                className="p-1 text-stone-400 hover:text-stone-700"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleCreateCategory} className="space-y-3">
              <div>
                <label className="block text-xs font-semibold text-stone-700 mb-1">
                  ক্যাটাগরির নাম *
                </label>
                <Input
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="যেমন: মননশীলতা ও নীরবতা"
                  required
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-stone-700 mb-1">
                  সংক্ষিপ্ত বিবরণ *
                </label>
                <Textarea
                  value={shortDesc}
                  onChange={(e) => setShortDesc(e.target.value)}
                  placeholder="এই বিভাগের মূল উদ্দেশ্য..."
                  rows={2}
                  required
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-stone-700 mb-1">
                  ফিচার্ড বাণী / উদ্ধৃতি
                </label>
                <Input
                  value={featuredQuote}
                  onChange={(e) => setFeaturedQuote(e.target.value)}
                  placeholder="যেমন: প্রযুক্তি আপনার হাতিয়ার হোক..."
                />
              </div>

              <div className="flex justify-end gap-2 pt-3">
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={() => setIsCreateOpen(false)}
                >
                  বাতিল
                </Button>
                <Button
                  type="submit"
                  disabled={isLoading}
                  size="sm"
                  className="bg-[#008767] hover:bg-[#007055] text-white flex items-center gap-1.5 cursor-pointer disabled:opacity-50"
                >
                  {isLoading && <Loader2 className="w-3.5 h-3.5 animate-spin text-white" />}
                  <span>{isLoading ? "তৈরি হচ্ছে..." : "সংরক্ষণ করুন"}</span>
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
}
