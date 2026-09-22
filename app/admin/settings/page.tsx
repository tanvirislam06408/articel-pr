"use client";

import React, { useState, useEffect } from "react";
import { AdminSidebar } from "@/components/admin/AdminSidebar";
import { AdminHeader } from "@/components/admin/AdminHeader";
import { SlidersHorizontal, Save, CheckCircle2, AlertCircle } from "lucide-react";
import { useAuth } from "@/lib/auth-context";
import { api } from "@/lib/api";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";

export default function AdminSettingsPage() {
  const { user, refreshUser } = useAuth();
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);
  const [name, setName] = useState(user?.name || "এডমিন মনন");
  const [bio, setBio] = useState(user?.bio || "মনন সাময়িকীর প্রধান সম্পাদক");
  const [avatarUrl, setAvatarUrl] = useState(user?.avatarUrl || "");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [saved, setSaved] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  useEffect(() => {
    if (user) {
      setName(user.name);
      if (user.bio) setBio(user.bio);
      if (user.avatarUrl) setAvatarUrl(user.avatarUrl);
    }
  }, [user]);

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setErrorMessage(null);

    try {
      const updateData: any = { name, bio, avatarUrl };
      if (password.trim()) {
        updateData.password = password.trim();
      }

      await api.auth.updateProfile(updateData);
      await refreshUser();
      setSaved(true);
      setPassword("");
      setTimeout(() => setSaved(false), 3500);
    } catch (err: any) {
      setErrorMessage(err.message || "সেটিংস সংরক্ষণ ব্যর্থ হয়েছে।");
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
          title="সেটিংস"
          breadcrumb="সিস্টেম পরিচালনা"
        />

        <main className="flex-1 p-4 sm:p-6 lg:p-8 max-w-4xl w-full mx-auto space-y-6">
          {saved && (
            <div
              role="status"
              className="p-3.5 bg-[#E8F3EE] border border-[#0E5A44] rounded-xs text-xs text-[#0E5A44] flex items-center gap-2 shadow-sm animate-in fade-in duration-150"
            >
              <CheckCircle2 className="w-4 h-4 shrink-0" />
              <span className="font-medium">প্রোফাইল ও সেটিংস সফলভাবে সংরক্ষিত হয়েছে।</span>
            </div>
          )}

          {errorMessage && (
            <div className="p-3 bg-rose-50 border border-rose-200 rounded-xs text-xs text-rose-700 flex items-center gap-2">
              <AlertCircle className="w-4 h-4 shrink-0" />
              <span>{errorMessage}</span>
            </div>
          )}

          <div className="space-y-1 border-b border-[#E6DFD3] pb-6">
            <div className="inline-flex items-center gap-1.5 text-[11px] font-mono text-[#0E5A44] uppercase tracking-wider">
              <SlidersHorizontal className="w-3.5 h-3.5" />
              <span>EDITORIAL PREFERENCES & CONFIGURATION</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-serif font-black text-[#181A1B] tracking-tight">
              প্রকাশনা ও প্রোফাইল সেটিংস
            </h1>
            <p className="text-xs sm:text-sm text-[#525B62] font-serif">
              মনন সাময়িকীর সাধারণ বিবরণ, মেটাডাটা ও সম্পাদকের তথ্য আপডেট করুন।
            </p>
          </div>

          <form onSubmit={handleSave} className="space-y-6">
            {/* Editor Profile Info */}
            <div className="bg-[#FFFFFF] border border-[#E6DFD3] rounded-xs p-6 space-y-4 shadow-2xs">
              <h2 className="font-serif font-bold text-base text-[#181A1B] border-b border-[#F2ECE1] pb-2">
                সম্পাদকীয় প্রোফাইল ও পরিচিতি
              </h2>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="block text-xs font-semibold text-[#181A1B]">
                    সম্পাদকের নাম
                  </label>
                  <Input
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="block text-xs font-semibold text-[#181A1B]">
                    ইমেইল (লগইন আইডি)
                  </label>
                  <Input
                    value={user?.email || ""}
                    disabled
                    className="opacity-70 bg-stone-100"
                  />
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="block text-xs font-semibold text-[#181A1B]">
                  সম্পাদকীয় পরিচিতি / বায়ো
                </label>
                <Textarea
                  value={bio}
                  onChange={(e) => setBio(e.target.value)}
                  rows={3}
                />
              </div>

              <div className="space-y-1.5">
                <label className="block text-xs font-semibold text-[#181A1B]">
                  নতুন পাসওয়ার্ড (পরিবর্তন করতে চাইলে লিখুন)
                </label>
                <Input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="কমপক্ষে ৬ বর্ণ লিখুন..."
                />
              </div>

              <div className="flex justify-end pt-2">
                <Button
                  type="submit"
                  disabled={isLoading}
                  className="bg-[#0E5A44] hover:bg-[#094030] text-white flex items-center gap-1.5"
                >
                  <Save className="w-4 h-4" />
                  <span>{isLoading ? "সংরক্ষণ হচ্ছে..." : "পরিবর্তন সংরক্ষণ করুন"}</span>
                </Button>
              </div>
            </div>
          </form>
        </main>
      </div>
    </div>
  );
}
