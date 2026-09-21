"use client";

import React from "react";
import { Menu, Globe, Bell } from "lucide-react";
import Link from "next/link";

interface AdminHeaderProps {
  onMobileMenuToggle: () => void;
  title?: string;
  breadcrumb?: string;
}

export function AdminHeader({
  onMobileMenuToggle,
  title = "ড্যাশবোর্ড",
  breadcrumb = "সম্পাদকীয় প্যানেল",
}: AdminHeaderProps) {
  return (
    <header className="w-full bg-[#FFFFFF] border-b border-[#E6DFD3] sticky top-0 z-30">
      <div className="px-4 sm:px-6 lg:px-8 py-3 flex items-center justify-between gap-4">
        {/* Left Area: Mobile Menu Button & Breadcrumb */}
        <div className="flex items-center gap-3">
          <button
            onClick={onMobileMenuToggle}
            className="md:hidden p-2 text-[#525B62] hover:text-[#181A1B] hover:bg-[#FAF8F5] rounded-xs transition-colors"
            aria-label="সাইডবার মেনু খুলুন"
          >
            <Menu className="w-5 h-5" />
          </button>

          <div className="flex items-center gap-2 text-xs font-sans">
            <span className="text-[#737D86] hidden sm:inline">{breadcrumb}</span>
            <span className="text-[#D9D2C4] hidden sm:inline">/</span>
            <span className="font-semibold text-[#181A1B]">{title}</span>
          </div>
        </div>

        {/* Right Area: Public site link, Notifications, Admin Profile */}
        <div className="flex items-center gap-3">
          {/* Quick link to public website */}
          <Link
            href="/"
            target="_blank"
            className="hidden sm:inline-flex items-center gap-1.5 px-2.5 py-1 text-xs text-[#525B62] hover:text-[#0E5A44] hover:bg-[#FAF8F5] border border-[#E6DFD3] rounded-2xs transition-colors"
          >
            <Globe className="w-3.5 h-3.5 text-[#0E5A44]" />
            <span>ওয়েবসাইট দেখুন</span>
          </Link>

          {/* Notification icon */}
          <button
            className="p-1.5 text-[#737D86] hover:text-[#181A1B] hover:bg-[#FAF8F5] rounded-xs transition-colors relative"
            aria-label="বিজ্ঞপ্তি"
          >
            <Bell className="w-4 h-4" />
            <span className="absolute top-1 right-1 w-1.5 h-1.5 bg-[#0E5A44] rounded-full"></span>
          </button>

          <div className="h-4 w-px bg-[#E6DFD3]"></div>

          {/* Admin User Profile */}
          <div className="flex items-center gap-2.5 pl-1">
            <div className="w-7 h-7 rounded-full bg-[#E8F3EE] border border-[#0E5A44]/30 text-[#0E5A44] flex items-center justify-center font-serif font-bold text-xs">
              স
            </div>
            <div className="hidden sm:block text-left">
              <span className="text-xs font-bold text-[#181A1B] block leading-none">
                তানভীর হাসান
              </span>
              <span className="text-[10px] text-[#737D86] leading-none">
                প্রধান সম্পাদক
              </span>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
