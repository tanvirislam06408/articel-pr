"use client";

import React, { useState } from "react";
import { AdminSidebar } from "@/components/admin/AdminSidebar";
import { AdminHeader } from "@/components/admin/AdminHeader";
import { Sparkles, Save, CheckCircle2 } from "lucide-react";

export default function AdminSettingsPage() {
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);
  const [saved, setSaved] = useState(false);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
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
              <span className="font-medium">সেটিংস পরিবর্তনগুলো সফলভাবে সংরক্ষিত হয়েছে।</span>
            </div>
          )}

          <div className="space-y-1 border-b border-[#E6DFD3] pb-6">
            <div className="inline-flex items-center gap-1.5 text-[11px] font-mono text-[#0E5A44] uppercase tracking-wider">
              <Sparkles className="w-3.5 h-3.5" />
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
            {/* General Publication Info */}
            <div className="bg-[#FFFFFF] border border-[#E6DFD3] rounded-xs p-6 space-y-4">
              <h2 className="font-serif font-bold text-base text-[#181A1B] border-b border-[#F2ECE1] pb-2">
                প্রকাশনার সাধারণ তথ্য
              </h2>

              <div className="space-y-1.5">
                <label className="block text-xs font-bold text-[#181A1B]">
                  সাময়িকীর নাম
                </label>
                <input
                  type="text"
                  defaultValue="মনন | মননশীল জীবন ও ডিজিটাল সুস্থতার সাময়িকী"
                  className="w-full px-3 py-2 bg-[#FAF8F5] border border-[#E6DFD3] rounded-xs text-xs text-[#181A1B] focus:outline-hidden focus:border-[#0E5A44]"
                />
              </div>

              <div className="space-y-1.5">
                <label className="block text-xs font-bold text-[#181A1B]">
                  সম্পাদকীয় স্লোগান / ট্যাগলাইন
                </label>
                <input
                  type="text"
                  defaultValue="নিজের মনোযোগ, অভ্যাস ও ডিজিটাল জীবনকে সচেতনভাবে পরিচালনা করা"
                  className="w-full px-3 py-2 bg-[#FAF8F5] border border-[#E6DFD3] rounded-xs text-xs text-[#181A1B] focus:outline-hidden focus:border-[#0E5A44]"
                />
              </div>
            </div>

            {/* Profile Info */}
            <div className="bg-[#FFFFFF] border border-[#E6DFD3] rounded-xs p-6 space-y-4">
              <h2 className="font-serif font-bold text-base text-[#181A1B] border-b border-[#F2ECE1] pb-2">
                প্রধান সম্পাদকের বিবরণ
              </h2>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="block text-xs font-bold text-[#181A1B]">
                    সম্পাদকের নাম
                  </label>
                  <input
                    type="text"
                    defaultValue="তানভীর হাসান"
                    className="w-full px-3 py-2 bg-[#FAF8F5] border border-[#E6DFD3] rounded-xs text-xs text-[#181A1B] focus:outline-hidden focus:border-[#0E5A44]"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="block text-xs font-bold text-[#181A1B]">
                    ইমেইল ঠিকানা
                  </label>
                  <input
                    type="email"
                    defaultValue="editor@monon-journal.org"
                    className="w-full px-3 py-2 bg-[#FAF8F5] border border-[#E6DFD3] rounded-xs text-xs text-[#181A1B] focus:outline-hidden focus:border-[#0E5A44]"
                  />
                </div>
              </div>
            </div>

            {/* Save Button */}
            <div className="flex justify-end">
              <button
                type="submit"
                className="px-5 py-2.5 bg-[#0E5A44] hover:bg-[#094030] text-[#FFFFFF] text-xs font-medium rounded-xs transition-colors shadow-2xs flex items-center gap-2 cursor-pointer"
              >
                <Save className="w-4 h-4" />
                <span>পরিবর্তন সংরক্ষণ করুন</span>
              </button>
            </div>
          </form>
        </main>
      </div>
    </div>
  );
}
