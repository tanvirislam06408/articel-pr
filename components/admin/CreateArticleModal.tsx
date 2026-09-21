"use client";

import React, { useState, useEffect } from "react";
import { api } from "@/lib/api";
import { TOPICS } from "@/lib/data/topics";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { X, Sparkles, Send, CheckCircle2, AlertCircle } from "lucide-react";

interface CreateArticleModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
  editArticle?: any | null;
}

export function CreateArticleModal({
  isOpen,
  onClose,
  onSuccess,
  editArticle,
}: CreateArticleModalProps) {
  const [title, setTitle] = useState("");
  const [kicker, setKicker] = useState("");
  const [excerpt, setExcerpt] = useState("");
  const [content, setContent] = useState("");
  const [topicId, setTopicId] = useState("digital-wellness");
  const [artTheme, setArtTheme] = useState("focus");
  const [isFeatured, setIsFeatured] = useState(false);
  const [isEditorPick, setIsEditorPick] = useState(false);
  const [isLeadCover, setIsLeadCover] = useState(false);
  const [status, setStatus] = useState<"published" | "draft">("published");

  const [topics, setTopics] = useState(TOPICS);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  useEffect(() => {
    api.topics
      .getAll()
      .then((res) => {
        if (res.data && res.data.length > 0) {
          setTopics(res.data);
        }
      })
      .catch(() => {});
  }, []);

  useEffect(() => {
    if (editArticle) {
      setTitle(editArticle.title || "");
      setKicker(editArticle.kicker || "");
      setExcerpt(editArticle.excerpt || "");
      setContent(editArticle.content || editArticle.excerpt || "");
      setTopicId(editArticle.categorySlug || editArticle.topicId || "digital-wellness");
      setStatus(editArticle.status === "draft" ? "draft" : "published");
    } else {
      setTitle("");
      setKicker("");
      setExcerpt("");
      setContent("");
      setTopicId("digital-wellness");
      setStatus("published");
      setIsFeatured(false);
      setIsEditorPick(false);
      setIsLeadCover(false);
    }
  }, [editArticle, isOpen]);

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);

    if (!title.trim() || !kicker.trim() || !excerpt.trim() || !content.trim()) {
      setErrorMessage("দয়া করে শিরোনাম, কিকার, সারসংক্ষেপ এবং মূল বিষয়বস্তু পূরণ করুন।");
      return;
    }

    setIsLoading(true);

    try {
      if (editArticle?.id) {
        await api.articles.update(editArticle.id, {
          title,
          kicker,
          excerpt,
          content,
          topicId,
          artTheme,
          isFeatured,
          isEditorPick,
          isLeadCover,
          status,
        });
      } else {
        await api.articles.create({
          title,
          kicker,
          excerpt,
          content,
          topicId,
          artTheme,
          isFeatured,
          isEditorPick,
          isLeadCover,
          status,
        });
      }

      onSuccess();
      onClose();
    } catch (err: any) {
      setErrorMessage(err.message || "প্রবন্ধ সংরক্ষণ করতে ব্যর্থ হয়েছে।");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-in fade-in duration-200">
      <div className="relative w-full max-w-2xl bg-[#FAF8F5] border border-[#E6DFD3] rounded-xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh]">
        {/* Modal Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-[#E6DFD3] bg-white">
          <div className="flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-[#008767]" />
            <h3 className="font-serif font-bold text-lg text-[#181A1B]">
              {editArticle ? "প্রবন্ধ সম্পাদনা করুন" : "নতুন প্রবন্ধ লিখুন ও প্রকাশ করুন"}
            </h3>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-stone-400 hover:text-stone-700 rounded-md transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Form Body */}
        <form onSubmit={handleSubmit} className="overflow-y-auto p-6 space-y-4">
          {errorMessage && (
            <div className="p-3 bg-rose-50 border border-rose-200 rounded-lg text-xs text-rose-700 flex items-center gap-2">
              <AlertCircle className="w-4 h-4 shrink-0" />
              <span>{errorMessage}</span>
            </div>
          )}

          <div>
            <label className="block text-xs font-semibold text-stone-700 mb-1">
              প্রবন্ধের শিরোনাম *
            </label>
            <Input
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="যেমন: ডোপামিন লুপ ও আধুনিক আসক্তি..."
              required
              className="bg-white text-base font-serif"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-stone-700 mb-1">
                কিকার / উপ-বিভাগ *
              </label>
              <Input
                value={kicker}
                onChange={(e) => setKicker(e.target.value)}
                placeholder="যেমন: বিশেষ অনুসন্ধান ও নিউরোসায়েন্স"
                required
                className="bg-white text-xs"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-stone-700 mb-1">
                প্রধান বিভাগ (Topic) *
              </label>
              <select
                value={topicId}
                onChange={(e) => setTopicId(e.target.value)}
                className="w-full h-10 px-3 py-2 bg-white border border-[#E5E0D8] rounded-md text-xs text-[#181A1B] focus:outline-none focus:ring-2 focus:ring-[#008767]"
              >
                {topics.map((t) => (
                  <option key={t.id} value={t.id}>
                    {t.title}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-stone-700 mb-1">
              সারসংক্ষেপ (Excerpt) *
            </label>
            <Textarea
              value={excerpt}
              onChange={(e) => setExcerpt(e.target.value)}
              placeholder="প্রবন্ধের মূল বক্তব্য বা শুরুর চুম্বক অংশ..."
              rows={2}
              required
              className="bg-white text-xs font-serif"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-stone-700 mb-1">
              সম্পূর্ণ বিষয়বস্তু (Article Content) *
            </label>
            <Textarea
              value={content}
              onChange={(e) => setContent(e.target.value)}
              placeholder="সম্পূর্ণ মননশীল বিশ্লেষণ ও প্যারাগ্রাফ লিখুন..."
              rows={8}
              required
              className="bg-white text-sm font-serif leading-relaxed"
            />
          </div>

          {/* Additional Options */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 p-3 bg-stone-100/60 rounded-lg text-xs">
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={isFeatured}
                onChange={(e) => setIsFeatured(e.target.checked)}
                className="rounded text-[#008767] focus:ring-[#008767]"
              />
              <span>ফিচার্ড প্রবন্ধ</span>
            </label>

            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={isLeadCover}
                onChange={(e) => setIsLeadCover(e.target.checked)}
                className="rounded text-[#008767] focus:ring-[#008767]"
              />
              <span>লিড কভার স্টোরি</span>
            </label>

            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={isEditorPick}
                onChange={(e) => setIsEditorPick(e.target.checked)}
                className="rounded text-[#008767] focus:ring-[#008767]"
              />
              <span>সম্পাদকের পছন্দ</span>
            </label>
          </div>

          {/* Status Select */}
          <div className="flex items-center justify-between pt-2">
            <div className="flex items-center gap-2">
              <span className="text-xs font-semibold text-stone-700">অবস্থা:</span>
              <select
                value={status}
                onChange={(e) => setStatus(e.target.value as any)}
                className="px-3 py-1.5 bg-white border border-[#E5E0D8] rounded-md text-xs font-medium"
              >
                <option value="published">প্রকাশিত (Published)</option>
                <option value="draft">খসড়া (Draft)</option>
              </select>
            </div>

            <div className="flex items-center gap-2">
              <Button type="button" variant="outline" size="sm" onClick={onClose}>
                বাতিল
              </Button>
              <Button
                type="submit"
                disabled={isLoading}
                size="sm"
                className="bg-[#008767] hover:bg-[#007055] text-white flex items-center gap-1.5"
              >
                <Send className="w-3.5 h-3.5" />
                <span>{isLoading ? "সংরক্ষণ হচ্ছে..." : "সংরক্ষণ ও প্রকাশ করুন"}</span>
              </Button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
