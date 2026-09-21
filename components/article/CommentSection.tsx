"use client";

import React, { useState, useEffect } from "react";
import { api } from "@/lib/api";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Heart, MessageSquare, Reply, Send, User, CheckCircle2 } from "lucide-react";
import { toBengaliNumber } from "@/lib/utils";

interface Comment {
  id: string;
  authorName: string;
  authorEmail: string;
  content: string;
  parentId?: string | null;
  createdAt: string;
  replies?: Comment[];
}

interface CommentSectionProps {
  articleSlug: string;
  initialLikes?: number;
}

export function CommentSection({
  articleSlug,
  initialLikes = 0,
}: CommentSectionProps) {
  const [comments, setComments] = useState<Comment[]>([]);
  const [likes, setLikes] = useState(initialLikes);
  const [hasLiked, setHasLiked] = useState(false);
  const [isLiking, setIsLiking] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  // Form states
  const [authorName, setAuthorName] = useState("");
  const [authorEmail, setAuthorEmail] = useState("");
  const [content, setContent] = useState("");
  const [replyToId, setReplyToId] = useState<string | null>(null);
  const [replyToName, setReplyToName] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const fetchComments = async () => {
    try {
      const res = await api.comments.getByArticle(articleSlug);
      if (res.data) {
        setComments(res.data.comments || []);
        if (res.data.likesCount !== undefined) {
          setLikes(res.data.likesCount);
        }
      }
    } catch (err) {
      console.error("Failed to load comments:", err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchComments();
  }, [articleSlug]);

  const handleLike = async () => {
    if (isLiking) return;
    setIsLiking(true);
    setHasLiked(true);
    setLikes((prev) => prev + 1);

    try {
      const res = await api.comments.likeArticle(articleSlug);
      if (res.data?.likes) {
        setLikes(res.data.likes);
      }
    } catch (err) {
      console.error("Failed to register like:", err);
    } finally {
      setIsLiking(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!authorName.trim() || !authorEmail.trim() || !content.trim()) {
      setErrorMessage("দয়া করে আপনার নাম, ইমেইল এবং মন্তব্য পূরণ করুন।");
      return;
    }

    setIsSubmitting(true);
    setErrorMessage(null);

    try {
      await api.comments.addComment(articleSlug, {
        authorName,
        authorEmail,
        content,
        parentId: replyToId,
      });

      setContent("");
      setReplyToId(null);
      setReplyToName(null);
      setSuccessMessage("আপনার মন্তব্য সফলভাবে প্রকাশিত হয়েছে!");
      setTimeout(() => setSuccessMessage(null), 4000);

      // Refresh comments
      await fetchComments();
    } catch (err: any) {
      setErrorMessage(err.message || "মন্তব্য প্রকাশে ব্যর্থ হয়েছে।");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="mt-12 pt-8 border-t border-[#E5E0D8]">
      {/* Article Reactions & Claps Bar */}
      <div className="flex items-center justify-between p-4 rounded-xl bg-gradient-to-r from-emerald-50/50 to-stone-50 border border-emerald-100 mb-10">
        <div>
          <h4 className="font-serif font-bold text-base text-[#181A1B]">
            লেখাটি আপনার চিন্তাকে নাড়া দিয়েছে?
          </h4>
          <p className="text-xs text-stone-500 mt-0.5">
            অনুপ্রেরণা ছড়িয়ে দিতে এবং লেখককে উৎসাহিত করতে ভালো লাগা প্রকাশ করুন।
          </p>
        </div>

        <button
          onClick={handleLike}
          disabled={isLiking}
          className={`flex items-center gap-2 px-4 py-2 rounded-full transition-all transform active:scale-95 shadow-sm ${
            hasLiked
              ? "bg-rose-500 text-white shadow-rose-200"
              : "bg-white text-stone-700 hover:bg-rose-50 hover:text-rose-600 border border-stone-200"
          }`}
        >
          <Heart
            className={`w-4 h-4 ${hasLiked ? "fill-white" : "hover:fill-rose-500"}`}
          />
          <span className="text-sm font-semibold">
            {toBengaliNumber(likes)} পছন্দ
          </span>
        </button>
      </div>

      {/* Comment Section Header */}
      <div className="flex items-center gap-2 mb-6">
        <MessageSquare className="w-5 h-5 text-[#008767]" />
        <h3 className="font-serif text-xl font-bold text-[#181A1B]">
          পাঠকের মতামত ({toBengaliNumber(comments.length)})
        </h3>
      </div>

      {/* Comment Form */}
      <form
        onSubmit={handleSubmit}
        className="p-5 rounded-xl bg-white border border-[#E5E0D8] shadow-xs mb-8"
      >
        <h4 className="text-sm font-semibold text-stone-800 mb-3">
          {replyToId ? (
            <span className="flex items-center gap-2 text-[#008767]">
              <Reply className="w-3.5 h-3.5" />
              <span>{replyToName}-এর মন্তব্যের উত্তর দিচ্ছেন</span>
              <button
                type="button"
                onClick={() => {
                  setReplyToId(null);
                  setReplyToName(null);
                }}
                className="text-xs text-stone-400 hover:text-stone-600 underline ml-2"
              >
                বাতিল করুন
              </button>
            </span>
          ) : (
            "আপনার মূল্যবান মতামত লিখুন"
          )}
        </h4>

        {successMessage && (
          <div className="flex items-center gap-2 p-3 bg-emerald-50 text-emerald-800 rounded-lg text-xs font-medium mb-3 border border-emerald-200">
            <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
            <span>{successMessage}</span>
          </div>
        )}

        {errorMessage && (
          <div className="p-3 bg-rose-50 text-rose-800 rounded-lg text-xs font-medium mb-3 border border-rose-200">
            {errorMessage}
          </div>
        )}

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-3">
          <Input
            placeholder="আপনার নাম *"
            value={authorName}
            onChange={(e) => setAuthorName(e.target.value)}
            required
            className="bg-stone-50/50"
          />
          <Input
            type="email"
            placeholder="আপনার ইমেইল (প্রকাশিত হবে না) *"
            value={authorEmail}
            onChange={(e) => setAuthorEmail(e.target.value)}
            required
            className="bg-stone-50/50"
          />
        </div>

        <Textarea
          placeholder="মননশীল আলোচনা ও অন্তর্দৃষ্টি প্রকাশ করুন..."
          rows={3}
          value={content}
          onChange={(e) => setContent(e.target.value)}
          required
          className="mb-3 bg-stone-50/50"
        />

        <div className="flex justify-end">
          <Button
            type="submit"
            disabled={isSubmitting}
            className="bg-[#008767] hover:bg-[#007055] text-white flex items-center gap-1.5"
          >
            <Send className="w-3.5 h-3.5" />
            <span>{isSubmitting ? "প্রকাশ হচ্ছে..." : "মন্তব্য পাঠান"}</span>
          </Button>
        </div>
      </form>

      {/* Comments List */}
      {isLoading ? (
        <div className="py-8 text-center text-sm text-stone-400">
          মন্তব্য লোড হচ্ছে...
        </div>
      ) : comments.length === 0 ? (
        <div className="py-8 text-center text-sm text-stone-500 bg-[#FAF8F5] rounded-xl border border-dashed border-[#E5E0D8]">
          এখনও কোনো মন্তব্য নেই। প্রথম মন্তব্যটি আপনিই করুন!
        </div>
      ) : (
        <div className="space-y-4">
          {comments.map((comment) => (
            <div
              key={comment.id}
              className="p-4 rounded-xl bg-white border border-[#E5E0D8]/80 shadow-2xs"
            >
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-full bg-[#008767]/10 text-[#008767] flex items-center justify-center font-bold text-xs">
                    {comment.authorName.charAt(0)}
                  </div>
                  <div>
                    <span className="font-semibold text-sm text-[#181A1B] block">
                      {comment.authorName}
                    </span>
                    <span className="text-[11px] text-stone-400 block">
                      {new Intl.DateTimeFormat("bn-BD", {
                        day: "numeric",
                        month: "short",
                        year: "numeric",
                      }).format(new Date(comment.createdAt))}
                    </span>
                  </div>
                </div>

                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => {
                    setReplyToId(comment.id);
                    setReplyToName(comment.authorName);
                  }}
                  className="h-7 text-xs text-stone-500 hover:text-[#008767] flex items-center gap-1"
                >
                  <Reply className="w-3 h-3" /> উত্তর দিন
                </Button>
              </div>

              <p className="text-sm text-stone-700 leading-relaxed pl-10">
                {comment.content}
              </p>

              {/* Nested Replies */}
              {comment.replies && comment.replies.length > 0 && (
                <div className="mt-3 pl-10 space-y-3 border-l-2 border-[#008767]/20 ml-4">
                  {comment.replies.map((reply) => (
                    <div
                      key={reply.id}
                      className="p-3 bg-stone-50 rounded-lg border border-stone-100"
                    >
                      <div className="flex items-center gap-2 mb-1">
                        <span className="font-semibold text-xs text-[#181A1B]">
                          {reply.authorName}
                        </span>
                        <span className="text-[10px] text-stone-400">
                          {new Intl.DateTimeFormat("bn-BD", {
                            day: "numeric",
                            month: "short",
                            year: "numeric",
                          }).format(new Date(reply.createdAt))}
                        </span>
                      </div>
                      <p className="text-xs text-stone-700 leading-relaxed">
                        {reply.content}
                      </p>
                    </div>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
