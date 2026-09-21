"use client";

import React, { useState } from "react";
import { Mail, ArrowRight, CheckCircle2, Shield } from "lucide-react";

export function NewsletterSection() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !email.includes("@")) {
      setStatus("error");
      setErrorMessage("অনুগ্রহ করে একটি সঠিক ইমেইল ঠিকানা প্রদান করুন।");
      return;
    }
    setStatus("loading");
    setTimeout(() => {
      setStatus("success");
      setEmail("");
    }, 600);
  };

  return (
    <section id="newsletter" className="w-full bg-[#181A1B] text-[#FAF8F5] py-14 sm:py-20 border-b border-[#E6DFD3]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center space-y-6">
          {/* Tag */}
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-[#243B42] text-[#A7F3D0] rounded-xs text-xs font-mono uppercase tracking-widest">
            <Mail className="w-3.5 h-3.5" />
            <span>সাপ্তাহিক মনন বার্তা</span>
          </div>

          {/* Headline */}
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-serif font-black tracking-tight text-[#FAF8F5] leading-tight">
            প্রতি সপ্তাহে আপনার ইনবক্সে চিন্তার মতো কিছু।
          </h2>

          {/* Subtitle */}
          <p className="text-sm sm:text-base md:text-lg text-[#D1D5DB] font-serif max-w-2xl mx-auto leading-relaxed">
            কোনো অপ্রয়োজনীয় বিজ্ঞাপনী মেইল নয়। প্রতি রবিবার সকালে কেবল একটি গভীর নিবন্ধ, আচরণগত মনস্তত্ত্বের অন্তর্দৃষ্টি ও শান্ত মননের ভাবনা আপনার ইনবক্সে পৌঁছে যাবে।
          </p>

          {/* Form */}
          {status === "success" ? (
            <div className="p-6 bg-[#0E5A44]/30 border border-[#0E5A44] rounded-xs max-w-lg mx-auto text-center space-y-2 animate-in fade-in duration-300">
              <CheckCircle2 className="w-8 h-8 text-[#68D391] mx-auto" />
              <h3 className="font-serif font-bold text-lg text-[#FFFFFF]">আপনাকে স্বাগতম!</h3>
              <p className="text-xs text-[#E2E8F0]">
                আপনার ইমেইলটি সফলভাবে যুক্ত হয়েছে। আগামী রবিবার আমাদের প্রথম মননশীল চিঠিটি আপনার ইনবক্সে পাবেন।
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="max-w-xl mx-auto space-y-3">
              <div className="flex flex-col sm:flex-row gap-2">
                <div className="relative flex-1">
                  <input
                    type="email"
                    placeholder="আপনার ইমেইল ঠিকানা লিখুন..."
                    value={email}
                    onChange={(e) => {
                      setEmail(e.target.value);
                      if (status === "error") setStatus("idle");
                    }}
                    className="w-full px-4 py-3 bg-[#262D33] border border-[#3E4C56] text-[#FFFFFF] placeholder-[#9CA3AF] text-sm focus:outline-hidden focus:border-[#68D391] rounded-xs transition-colors"
                    aria-label="ইমেইল ইনপুট"
                  />
                </div>
                <button
                  type="submit"
                  disabled={status === "loading"}
                  className="px-6 py-3 bg-[#0E5A44] hover:bg-[#0C4E3B] text-[#FFFFFF] text-sm font-medium rounded-xs transition-all flex items-center justify-center gap-2 cursor-pointer shrink-0 disabled:opacity-50"
                >
                  <span>{status === "loading" ? "যুক্ত হচ্ছে..." : "সাবস্ক্রাইব করুন"}</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>

              {status === "error" && (
                <p className="text-xs text-[#F87171] text-left">{errorMessage}</p>
              )}

              {/* Privacy / Anti-Spam note */}
              <div className="flex items-center justify-center gap-2 text-[11px] text-[#9CA3AF] pt-2 font-sans">
                <Shield className="w-3.5 h-3.5 text-[#68D391]" />
                <span>আমরা আপনার ব্যক্তিগত তথ্যের গোপনীয়তা রক্ষা করি। এক ক্লিকেই আনসাবস্ক্রাইব করা সম্ভব।</span>
              </div>
            </form>
          )}

          {/* Social Proof / Reader Count */}
          <div className="pt-6 border-t border-[#2A343D] flex flex-wrap items-center justify-center gap-6 text-xs text-[#9CA3AF] font-mono">
            <span>✓ ৪,২০০+ সচেতন পাঠক</span>
            <span>✓ প্রতি রবিবার সকালে</span>
            <span>✓ ১০০% স্প্যামমুক্ত</span>
          </div>
        </div>
      </div>
    </section>
  );
}
