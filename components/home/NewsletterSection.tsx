"use client";

import React, { useState } from "react";
import { Send, CheckCircle2, Shield, Lock, HeartHandshake, AlertCircle, RefreshCw, Loader2 } from "lucide-react";
import { api } from "@/lib/api";


export function NewsletterSection() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage("");

    if (!email.trim() || !email.includes("@")) {
      setStatus("error");
      setErrorMessage("অনুগ্রহ করে একটি সঠিক ইমেইল ঠিকানা প্রদান করুন।");
      return;
    }

    if (!message.trim() || message.trim().length < 10) {
      setStatus("error");
      setErrorMessage("অনুগ্রহ করে আপনার বার্তা বা অভিজ্ঞতার বিবরণ বিস্তারিত লিখুন (কমপক্ষে ১০ বর্ণ)।");
      return;
    }

    setStatus("loading");

    try {
      const response = await api.contact.sendMessage({
        name: name.trim() || "বেনামী পাঠক",
        email: email.trim(),
        message: message.trim(),
      });

      if (response.success) {
        setStatus("success");
        setName("");
        setEmail("");
        setMessage("");
      } else {
        setStatus("error");
        setErrorMessage(response.message || "বার্তা পাঠানো সম্ভব হয়নি।");
      }
    } catch (err: any) {
      // Fallback to local Next.js api
      try {
        const fallbackRes = await fetch("/api/contact", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            name: name.trim() || "বেনামী পাঠক",
            email: email.trim(),
            message: message.trim(),
          }),
        });
        const data = await fallbackRes.json();
        if (fallbackRes.ok && data.success) {
          setStatus("success");
          setName("");
          setEmail("");
          setMessage("");
        } else {
          setStatus("error");
          setErrorMessage(data.message || err.message || "বার্তা পাঠানো সম্ভব হয়নি।");
        }
      } catch {
        setStatus("error");
        setErrorMessage(err.message || "সার্ভারের সাথে সংযোগ স্থাপন করা যায়নি।");
      }
    }
  };


  const handleReset = () => {
    setStatus("idle");
    setErrorMessage("");
  };

  return (
    <section id="contact-story" className="w-full bg-[#14181B] text-[#FAF8F5] py-16 sm:py-24 border-t border-b border-[#262D33] relative overflow-hidden">
      {/* Subtle Background Glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-3/4 h-32 bg-[#0E5A44]/10 blur-3xl pointer-events-none" />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="space-y-8">
          {/* Section Header */}
          <div className="text-center space-y-4 max-w-2xl mx-auto">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-[#1F2B2A] text-[#68D391] border border-[#0E5A44]/40 rounded-xs text-xs font-mono uppercase tracking-widest">
              <HeartHandshake className="w-3.5 h-3.5 text-[#68D391]" />
              <span>গোপন ও সহমর্মিতাপূর্ণ যোগাযোগ</span>
            </div>

            <h2 className="text-2xl sm:text-3xl md:text-4xl font-serif font-black tracking-tight text-[#FAF8F5] leading-snug">
              আপনার লড়াই ও উত্তরণের গল্প আমাদের লিখুন
            </h2>

            <p className="text-xs sm:text-sm md:text-base text-[#9CA3AF] font-serif leading-relaxed">
              পর্দার আসক্তি, ডোপামিন লুপ, একাকীত্ব বা কোনো ক্ষতিকর অভ্যাসের সাথে লড়াই করছেন? নাকি কোনো অস্বাস্থ্যকর চক্র ভেঙে নতুন জীবনে ফিরে এসেছেন? নিঃসংকোচে আপনার অনুভূতি বা অভিজ্ঞতার কথা আমাদের জানান। প্রতিটি চিঠি সম্পূর্ণ গোপনে সরাসরি আমাদের সম্পাদকের ইনবক্সে পৌঁছাবে।
            </p>
          </div>

          {/* Form Card or Success Confirmation */}
          <div className="bg-[#1C2226] border border-[#2A343D] rounded-xs shadow-xl p-6 sm:p-10 transition-all">
            {status === "success" ? (
              <div className="py-8 text-center space-y-4 animate-in fade-in zoom-in-95 duration-300">
                <div className="w-14 h-14 rounded-full bg-[#0E5A44]/20 border border-[#0E5A44] flex items-center justify-center mx-auto text-[#68D391]">
                  <CheckCircle2 className="w-7 h-7" />
                </div>
                
                <h3 className="font-serif font-bold text-xl sm:text-2xl text-[#FFFFFF]">
                  আপনার চিঠিটি সফলভাবে আমাদের সম্পাদকের কাছে পৌঁছেছে
                </h3>

                <p className="text-xs sm:text-sm text-[#D1D5DB] font-serif max-w-lg mx-auto leading-relaxed">
                  নিজের অনুভূতি ও লড়াইয়ের গল্প শেয়ার করার সাহসিকতাকে আমরা আন্তরিক শ্রদ্ধা জানাই। আপনার এই চিঠিটি সম্পূর্ণ গোপনে সংরক্ষিত থাকবে এবং সম্পাদক ব্যক্তিগতভাবে আপনার সাথে যোগাযোগ করবেন।
                </p>

                <div className="pt-4">
                  <button
                    type="button"
                    onClick={handleReset}
                    className="inline-flex items-center gap-2 px-5 py-2.5 bg-[#262D33] hover:bg-[#323B42] text-xs font-medium text-[#FAF8F5] rounded-xs border border-[#3E4C56] transition-colors cursor-pointer"
                  >
                    <RefreshCw className="w-3.5 h-3.5 text-[#68D391]" />
                    <span>আরেকটি বার্তা পাঠান</span>
                  </button>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5">
                {status === "error" && errorMessage && (
                  <div
                    role="alert"
                    className="p-3.5 bg-[#3B1E1E] border border-[#7F1D1D] rounded-xs flex items-start gap-2.5 text-xs text-[#FCA5A5] animate-in fade-in duration-150"
                  >
                    <AlertCircle className="w-4 h-4 shrink-0 mt-0.5 text-[#F87171]" />
                    <span>{errorMessage}</span>
                  </div>
                )}

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {/* Name or Alias */}
                  <div className="space-y-1.5">
                    <label htmlFor="story-name" className="block text-xs font-medium text-[#D1D5DB]">
                      আপনার নাম <span className="text-[#9CA3AF] text-[11px]">(পরিচয় গোপন রাখতে চাইলে ছদ্মনাম)</span>
                    </label>
                    <input
                      id="story-name"
                      type="text"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="যেমন: অনিক আহমেদ বা ছদ্মনাম"
                      className="w-full px-3.5 py-2.5 bg-[#121516] border border-[#2A343D] text-[#FAF8F5] placeholder-[#6B7280] text-xs sm:text-sm focus:outline-hidden focus:border-[#68D391] focus:ring-1 focus:ring-[#68D391] rounded-xs transition-colors"
                    />
                  </div>

                  {/* Email */}
                  <div className="space-y-1.5">
                    <label htmlFor="story-email" className="block text-xs font-medium text-[#D1D5DB]">
                      ইমেইল ঠিকানা <span className="text-[#F87171]">*</span> <span className="text-[#9CA3AF] text-[11px]">(উত্তর পাওয়ার জন্য)</span>
                    </label>
                    <input
                      id="story-email"
                      type="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="your.email@example.com"
                      className="w-full px-3.5 py-2.5 bg-[#121516] border border-[#2A343D] text-[#FAF8F5] placeholder-[#6B7280] text-xs sm:text-sm focus:outline-hidden focus:border-[#68D391] focus:ring-1 focus:ring-[#68D391] rounded-xs transition-colors font-sans"
                    />
                  </div>
                </div>

                {/* Message / Story Body */}
                <div className="space-y-1.5">
                  <div className="flex items-center justify-between">
                    <label htmlFor="story-message" className="block text-xs font-medium text-[#D1D5DB]">
                      আপনার গল্প, অনুভূতি বা লড়াইয়ের বিবরণ <span className="text-[#F87171]">*</span>
                    </label>
                    <span className="text-[10px] text-[#68D391] font-mono flex items-center gap-1">
                      <Lock className="w-3 h-3" /> শতভাগ গোপনীয়
                    </span>
                  </div>
                  <textarea
                    id="story-message"
                    required
                    rows={5}
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="কোথায় আপনার মূল সংগ্রাম, কোন অভ্যাসে আটকে যাচ্ছেন, বা কীভাবে কোনো বাধা অতিক্রম করেছেন—খোলা মনে লিখুন..."
                    className="w-full p-3.5 bg-[#121516] border border-[#2A343D] text-[#FAF8F5] placeholder-[#6B7280] text-xs sm:text-sm font-serif focus:outline-hidden focus:border-[#68D391] focus:ring-1 focus:ring-[#68D391] rounded-xs transition-colors leading-relaxed"
                  />
                </div>

                {/* Submit Action & Reassurances */}
                <div className="pt-2 flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-t border-[#262D33]">
                  <div className="flex items-center gap-2 text-[11px] text-[#9CA3AF] font-sans">
                    <Shield className="w-3.5 h-3.5 text-[#68D391] shrink-0" />
                    <span>আপনার পরিচয় ও বার্তা কোনো তৃতীয় পক্ষের কাছে হস্তান্তর করা হবে না।</span>
                  </div>

                  <button
                    type="submit"
                    disabled={status === "loading"}
                    className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-[#0E5A44] hover:bg-[#0B4837] text-[#FFFFFF] text-xs sm:text-sm font-medium rounded-xs transition-all shadow-md cursor-pointer disabled:opacity-50 shrink-0"
                  >
                    {status === "loading" ? (
                      <>
                        <RefreshCw className="w-4 h-4 animate-spin text-[#68D391]" />
                        <span>পাঠানো হচ্ছে...</span>
                      </>
                    ) : (
                      <>
                        <span>গোপনে চিঠি পাঠান</span>
                        <Send className="w-3.5 h-3.5" />
                      </>
                    )}
                  </button>
                </div>
              </form>
            )}
          </div>

          {/* Editorial Ethics Trust Badges */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-4 border-t border-[#262D33] text-center text-xs text-[#9CA3AF]">
            <div className="flex items-center justify-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-[#68D391]" />
              <span>১০০% বিচারহীন দৃষ্টিভঙ্গি</span>
            </div>
            <div className="flex items-center justify-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-[#68D391]" />
              <span>সম্পাদকের ব্যক্তিগত পর্যবেক্ষণ</span>
            </div>
            <div className="flex items-center justify-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-[#68D391]" />
              <span>সহমর্মিতাপূর্ণ আন্তরিক সাড়া</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
