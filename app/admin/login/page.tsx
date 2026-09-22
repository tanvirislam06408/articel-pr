"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Lock, Mail, Eye, EyeOff, ArrowRight, ShieldCheck, AlertCircle, ArrowLeft } from "lucide-react";
import { useAuth } from "@/lib/auth-context";

export default function AdminLoginPage() {
  const router = useRouter();
  const { login } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const handleLogin = async (e: React.FormEvent) => {
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

    try {
      await login({ email: email.trim(), password });
      router.push("/admin/dashboard");
    } catch (err: any) {
      setErrorMessage(
        err.message || "লগইন ব্যর্থ হয়েছে। ইমেইল এবং পাসওয়ার্ড পুনরায় পরীক্ষা করুন।"
      );
    } finally {
      setIsLoading(false);
    }
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
        <div className="w-full max-w-md space-y-6">
          {/* Header Title */}
          <div className="text-center space-y-2">
            <div className="inline-flex items-center justify-center w-12 h-12 rounded-sm bg-[#0E5A44]/10 text-[#0E5A44] mb-1">
              <Lock className="w-6 h-6" />
            </div>
            <h1 className="font-serif text-2xl sm:text-3xl font-bold tracking-tight text-[#181A1B]">
              মনন সম্পাদকীয় প্যানেল
            </h1>
            <p className="text-xs text-[#525B62] max-w-xs mx-auto leading-relaxed">
              নিবন্ধ পরিচালনা, বিভাগ সম্পাদনা ও প্রকাশনা বিশ্লেষণ করতে আপনার প্রাতিষ্ঠানিক একাউন্টে প্রবেশ করুন।
            </p>
          </div>

          {/* Login Card */}
          <div className="bg-[#FFFFFF] border border-[#E6DFD3] rounded-sm p-6 sm:p-8 shadow-xs space-y-5">
            {/* Error Message */}
            {errorMessage && (
              <div
                role="alert"
                className="p-3 bg-[#FCF0EE] border border-[#F5C2BC] rounded-xs flex items-start gap-2.5 text-xs text-[#BC3226]"
              >
                <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
                <span className="leading-snug">{errorMessage}</span>
              </div>
            )}

            <form onSubmit={handleLogin} className="space-y-4">
              {/* Email Input */}
              <div className="space-y-1.5">
                <label
                  htmlFor="admin-email"
                  className="block text-xs font-semibold text-[#181A1B]"
                >
                  প্রাতিষ্ঠানিক ইমেইল
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
                    placeholder="name@example.com"
                    className="w-full pl-9 pr-3 py-2.5 bg-[#FAF8F5] border border-[#E6DFD3] rounded-xs text-xs text-[#181A1B] placeholder-[#737D86] focus:outline-hidden focus:border-[#0E5A44] focus:bg-[#FFFFFF] transition-colors"
                  />
                </div>
              </div>

              {/* Password Input */}
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
