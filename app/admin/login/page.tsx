"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Lock, Mail, Eye, EyeOff, ArrowRight, ShieldCheck, AlertCircle, ArrowLeft } from "lucide-react";

export default function AdminLoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("editor@monon-journal.org");
  const [password, setPassword] = useState("admin12345");
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage("");

    if (!email.trim() || !password.trim()) {
      setErrorMessage("অনুগ্রহ করে ইমেইল এবং পাসওয়ার্ড দুটিই সঠিকভাবে পূরণ করুন।");
      return;
    }

    if (!email.includes("@")) {
      setErrorMessage("সঠিক ইমেইল ঠিকানা প্রদান করুন।");
      return;
    }

    setIsLoading(true);

    // Simulated login delay for authentic UX
    setTimeout(() => {
      setIsLoading(false);
      // Success: redirect to dashboard
      router.push("/admin/dashboard");
    }, 750);
  };

  return (
    <div className="min-h-screen bg-[#FAF8F5] text-[#181A1B] flex flex-col justify-between font-sans selection:bg-[#0E5A44]/15 selection:text-[#0E5A44]">
      {/* Top Bar with Return Link */}
      <header className="w-full border-b border-[#E6DFD3] bg-[#FAF8F5]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3.5 flex items-center justify-between">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-xs text-[#525B62] hover:text-[#0E5A44] transition-colors"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>মূল ওয়েবসাইটে ফিরে যান</span>
          </Link>

          <span className="text-[11px] font-mono text-[#737D86]">
            মনন সম্পাদকীয় ডেক • অভ্যন্তরীণ প্রবেশদ্বার
          </span>
        </div>
      </header>

      {/* Main Login Card Area */}
      <main className="flex-1 flex items-center justify-center px-4 py-12 sm:px-6 lg:px-8">
        <div className="w-full max-w-md space-y-8">
          {/* Brand Header */}
          <div className="text-center space-y-2">
            <Link href="/" className="inline-block focus:outline-hidden group">
              <span className="text-4xl sm:text-5xl font-serif font-black tracking-tight text-[#181A1B] group-hover:text-[#0E5A44] transition-colors">
                মনন
              </span>
            </Link>
            <p className="text-[10px] font-mono uppercase tracking-[0.25em] text-[#737D86]">
              EDITORIAL WORKSPACE ACCESS
            </p>
            <h1 className="text-xl sm:text-2xl font-serif font-bold text-[#181A1B] pt-3">
              অ্যাডমিন প্যানেলে প্রবেশ করুন
            </h1>
            <p className="text-xs sm:text-sm text-[#525B62] font-serif max-w-xs mx-auto">
              আপনার প্রকাশনা পরিচালনা করতে লগইন করুন।
            </p>
          </div>

          {/* Login Form Container */}
          <div className="bg-[#FFFFFF] border border-[#E6DFD3] rounded-xs shadow-xs p-6 sm:p-8 space-y-6">
            {errorMessage && (
              <div
                role="alert"
                className="p-3.5 bg-[#FEF2F2] border border-[#FEE2E2] rounded-xs flex items-start gap-2.5 text-xs text-[#DC2626] animate-in fade-in duration-150"
              >
                <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
                <span>{errorMessage}</span>
              </div>
            )}

            <form onSubmit={handleLogin} className="space-y-4">
              {/* Email Field */}
              <div className="space-y-1.5">
                <label
                  htmlFor="admin-email"
                  className="block text-xs font-semibold text-[#181A1B]"
                >
                  ইমেইল ঠিকানা
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-[#737D86]">
                    <Mail className="w-4 h-4" />
                  </div>
                  <input
                    id="admin-email"
                    type="email"
                    autoComplete="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="editor@monon-journal.org"
                    className="w-full pl-9 pr-3 py-2.5 bg-[#FAF8F5] border border-[#E6DFD3] rounded-xs text-xs text-[#181A1B] placeholder-[#737D86] focus:outline-hidden focus:border-[#0E5A44] focus:bg-[#FFFFFF] transition-colors"
                  />
                </div>
              </div>

              {/* Password Field */}
              <div className="space-y-1.5">
                <div className="flex items-center justify-between">
                  <label
                    htmlFor="admin-password"
                    className="block text-xs font-semibold text-[#181A1B]"
                  >
                    পাসওয়ার্ড
                  </label>
                </div>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-[#737D86]">
                    <Lock className="w-4 h-4" />
                  </div>
                  <input
                    id="admin-password"
                    type={showPassword ? "text" : "password"}
                    autoComplete="current-password"
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••••••••"
                    className="w-full pl-9 pr-10 py-2.5 bg-[#FAF8F5] border border-[#E6DFD3] rounded-xs text-xs text-[#181A1B] placeholder-[#737D86] focus:outline-hidden focus:border-[#0E5A44] focus:bg-[#FFFFFF] transition-colors font-mono"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute inset-y-0 right-0 pr-3 flex items-center text-[#737D86] hover:text-[#181A1B] transition-colors cursor-pointer"
                    aria-label={showPassword ? "পাসওয়ার্ড লুকান" : "পাসওয়ার্ড দেখুন"}
                  >
                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={isLoading}
                className="w-full mt-2 py-3 px-4 bg-[#0E5A44] hover:bg-[#094030] text-[#FFFFFF] text-xs sm:text-sm font-medium rounded-xs transition-all shadow-2xs flex items-center justify-center gap-2 cursor-pointer disabled:opacity-60"
              >
                <span>{isLoading ? "যাচাই করা হচ্ছে..." : "লগইন করুন"}</span>
                {!isLoading && <ArrowRight className="w-4 h-4" />}
              </button>
            </form>

            {/* Editorial Privacy & Security Notice */}
            <div className="pt-4 border-t border-[#F2ECE1] flex items-center justify-center gap-2 text-[11px] text-[#737D86]">
              <ShieldCheck className="w-3.5 h-3.5 text-[#0E5A44]" />
              <span>নিরাপদ এনক্রিপ্টেড সংযোগ • কেবল অনুমোদিত কর্মীদের জন্য</span>
            </div>
          </div>

          {/* Quick Demo Helper Hint */}
          <div className="p-3 bg-[#F7F3EB] border border-[#E6DFD3] rounded-xs text-center text-[11px] text-[#525B62]">
            <p>ডেমো ব্যবহারের জন্য ইতিমধ্যে তথ্য পূরণ করা রয়েছে। সরাসরি <strong>লগইন করুন</strong> চাপুন।</p>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="w-full border-t border-[#E6DFD3] py-4 bg-[#FAF8F5] text-center text-xs text-[#737D86]">
        <div className="max-w-7xl mx-auto px-4">
          <span>© ২০২৬ মনন। সকল অধিকার সংরক্ষিত।</span>
        </div>
      </footer>
    </div>
  );
}
