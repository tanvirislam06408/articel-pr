"use client";

import React, { useState } from "react";
import { AdminArticle } from "@/lib/data/admin-articles";
import { StatusBadge } from "@/components/admin/StatusBadge";
import { ArticleActions } from "@/components/admin/ArticleActions";
import { toBengaliNumber } from "@/lib/utils";
import { Search, Plus, BookOpen, Eye, Calendar, User } from "lucide-react";
import Link from "next/link";

interface ArticleTableProps {
  articles: AdminArticle[];
  onEdit?: (article: AdminArticle) => void;
  onDelete?: (article: AdminArticle) => void;
  onView?: (article: AdminArticle) => void;
}

export function ArticleTable({
  articles,
  onEdit,
  onDelete,
  onView,
}: ArticleTableProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedStatus, setSelectedStatus] = useState<"all" | "published" | "draft">("all");

  const filteredArticles = articles.filter((art) => {
    const matchesSearch =
      art.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      art.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
      art.author.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesStatus =
      selectedStatus === "all" ? true : art.status === selectedStatus;

    return matchesSearch && matchesStatus;
  });

  const publishedCount = articles.filter((a) => a.status === "published").length;
  const draftCount = articles.filter((a) => a.status === "draft").length;

  return (
    <div className="bg-[#FFFFFF] border border-[#E6DFD3] rounded-xs shadow-2xs overflow-hidden">
      {/* Table Toolbar */}
      <div className="p-4 sm:p-5 border-b border-[#E6DFD3] flex flex-col md:flex-row md:items-center justify-between gap-3">
        {/* Status Filter Tabs */}
        <div className="flex items-center gap-1.5 overflow-x-auto text-xs pb-1 md:pb-0">
          <button
            onClick={() => setSelectedStatus("all")}
            className={`px-3 py-1.5 rounded-2xs border transition-colors cursor-pointer whitespace-nowrap ${
              selectedStatus === "all"
                ? "bg-[#0E5A44] text-[#FFFFFF] border-[#0E5A44] font-medium"
                : "bg-[#FAF8F5] text-[#525B62] border-[#E6DFD3] hover:bg-[#F2ECE1]"
            }`}
          >
            সব ({toBengaliNumber(articles.length)})
          </button>
          <button
            onClick={() => setSelectedStatus("published")}
            className={`px-3 py-1.5 rounded-2xs border transition-colors cursor-pointer whitespace-nowrap ${
              selectedStatus === "published"
                ? "bg-[#0E5A44] text-[#FFFFFF] border-[#0E5A44] font-medium"
                : "bg-[#FAF8F5] text-[#525B62] border-[#E6DFD3] hover:bg-[#F2ECE1]"
            }`}
          >
            প্রকাশিত ({toBengaliNumber(publishedCount)})
          </button>
          <button
            onClick={() => setSelectedStatus("draft")}
            className={`px-3 py-1.5 rounded-2xs border transition-colors cursor-pointer whitespace-nowrap ${
              selectedStatus === "draft"
                ? "bg-[#0E5A44] text-[#FFFFFF] border-[#0E5A44] font-medium"
                : "bg-[#FAF8F5] text-[#525B62] border-[#E6DFD3] hover:bg-[#F2ECE1]"
            }`}
          >
            খসড়া ({toBengaliNumber(draftCount)})
          </button>
        </div>

        {/* Search & Actions Bar */}
        <div className="flex items-center gap-2.5">
          <div className="relative flex-1 sm:w-64">
            <Search className="w-3.5 h-3.5 text-[#737D86] absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="শিরোনাম বা বিভাগ দিয়ে খুঁজুন..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-8 pr-3 py-1.5 bg-[#FAF8F5] border border-[#E6DFD3] rounded-2xs text-xs text-[#181A1B] placeholder-[#737D86] focus:outline-hidden focus:border-[#0E5A44] focus:bg-[#FFFFFF] transition-colors"
            />
          </div>

          <Link
            href="/admin/articles/new"
            className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 bg-[#0E5A44] hover:bg-[#094030] text-[#FFFFFF] text-xs font-medium rounded-2xs transition-colors shadow-2xs shrink-0"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>নতুন লেখা</span>
          </Link>
        </div>
      </div>

      {/* Desktop Table View */}
      <div className="hidden md:block overflow-x-auto">
        <table className="w-full text-left text-xs text-[#181A1B] border-collapse">
          <thead>
            <tr className="border-b border-[#E6DFD3] bg-[#FAF8F5] text-[#525B62] font-medium">
              <th scope="col" className="py-3 px-4 font-sans">প্রবন্ধের শিরোনাম</th>
              <th scope="col" className="py-3 px-4 font-sans">ক্যাটাগরি</th>
              <th scope="col" className="py-3 px-4 font-sans">অবস্থা</th>
              <th scope="col" className="py-3 px-4 font-sans">প্রকাশের তারিখ</th>
              <th scope="col" className="py-3 px-4 font-sans text-right">ভিউ সংখ্যা</th>
              <th scope="col" className="py-3 px-4 font-sans text-center w-16">অ্যাকশন</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[#F2ECE1]">
            {filteredArticles.length > 0 ? (
              filteredArticles.map((art) => (
                <tr
                  key={art.id}
                  className="hover:bg-[#FAF8F5] transition-colors group"
                >
                  <td className="py-3.5 px-4 font-serif font-bold text-sm text-[#181A1B] group-hover:text-[#0E5A44] transition-colors max-w-sm">
                    <button
                      onClick={() => onView?.(art)}
                      className="text-left hover:underline focus:outline-hidden cursor-pointer line-clamp-1"
                    >
                      {art.title}
                    </button>
                    <span className="text-[11px] text-[#737D86] font-sans font-normal block mt-0.5">
                      লেখক: {art.author} • পাঠ সময়: {art.readTime}
                    </span>
                  </td>
                  <td className="py-3.5 px-4 text-[#525B62] whitespace-nowrap">
                    <span className="text-xs bg-[#FAF8F5] border border-[#E6DFD3] px-2 py-0.5 rounded-2xs">
                      {art.category}
                    </span>
                  </td>
                  <td className="py-3.5 px-4 whitespace-nowrap">
                    <StatusBadge status={art.status} />
                  </td>
                  <td className="py-3.5 px-4 text-[#737D86] whitespace-nowrap font-sans">
                    {art.publishedDate}
                  </td>
                  <td className="py-3.5 px-4 text-right font-mono font-medium text-[#181A1B] whitespace-nowrap">
                    {art.views > 0 ? toBengaliNumber(art.views.toLocaleString("en-US")) : "—"}
                  </td>
                  <td className="py-3.5 px-4 text-center">
                    <ArticleActions
                      article={art}
                      onEdit={onEdit}
                      onDelete={onDelete}
                      onView={onView}
                    />
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={6} className="py-12 text-center text-[#737D86]">
                  <BookOpen className="w-8 h-8 text-[#D9D2C4] mx-auto mb-2" />
                  <p className="font-serif font-bold text-sm text-[#181A1B]">কোনো প্রবন্ধ পাওয়া যায়নি</p>
                  <p className="text-xs mt-1">অনুসন্ধান ফিল্টার পরিবর্তন করে পুনরায় চেষ্টা করুন।</p>
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Mobile Card / List View */}
      <div className="md:hidden divide-y divide-[#F2ECE1]">
        {filteredArticles.length > 0 ? (
          filteredArticles.map((art) => (
            <div key={art.id} className="p-4 space-y-2.5 bg-[#FFFFFF]">
              <div className="flex items-start justify-between gap-2">
                <div className="space-y-1">
                  <span className="text-[10px] text-[#737D86] bg-[#FAF8F5] border border-[#E6DFD3] px-2 py-0.5 rounded-2xs">
                    {art.category}
                  </span>
                  <h4
                    onClick={() => onView?.(art)}
                    className="font-serif font-bold text-sm text-[#181A1B] pt-0.5 cursor-pointer leading-snug"
                  >
                    {art.title}
                  </h4>
                </div>
                <ArticleActions
                  article={art}
                  onEdit={onEdit}
                  onDelete={onDelete}
                  onView={onView}
                />
              </div>

              <div className="flex flex-wrap items-center justify-between text-[11px] text-[#737D86] pt-1">
                <div className="flex items-center gap-2">
                  <StatusBadge status={art.status} />
                  <span className="flex items-center gap-1 font-sans">
                    <User className="w-3 h-3" />
                    {art.author}
                  </span>
                </div>

                <div className="flex items-center gap-3 font-mono">
                  <span className="flex items-center gap-1">
                    <Calendar className="w-3 h-3" />
                    {art.publishedDate}
                  </span>
                  {art.views > 0 && (
                    <span className="flex items-center gap-1 text-[#0E5A44] font-medium">
                      <Eye className="w-3 h-3" />
                      {toBengaliNumber(art.views.toLocaleString("en-US"))}
                    </span>
                  )}
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="py-10 text-center text-[#737D86] p-4">
            <BookOpen className="w-8 h-8 text-[#D9D2C4] mx-auto mb-2" />
            <p className="font-serif font-bold text-sm text-[#181A1B]">কোনো প্রবন্ধ মেলেনি</p>
          </div>
        )}
      </div>

      {/* Table Footer Count Summary */}
      <div className="p-3.5 bg-[#FAF8F5] border-t border-[#E6DFD3] flex items-center justify-between text-xs text-[#737D86]">
        <span>
          সর্বমোট {toBengaliNumber(filteredArticles.length)}টি প্রবন্ধ প্রদর্শিত হচ্ছে
        </span>
        <span className="font-mono text-[11px]">
          পৃষ্ঠা ১ / ১
        </span>
      </div>
    </div>
  );
}
