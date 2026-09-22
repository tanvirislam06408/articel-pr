"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  PenSquare,
  BookOpen,
  FolderTree,
  BarChart2,
  Settings,
  LogOut,
  X,
  ExternalLink,
} from "lucide-react";
import { BrandIcon } from "@/components/ui/BrandIcon";

interface AdminSidebarProps {
  isMobileOpen?: boolean;
  onMobileClose?: () => void;
}

export function AdminSidebar({
  isMobileOpen = false,
  onMobileClose,
}: AdminSidebarProps) {
  const pathname = usePathname();

  const navItems = [
    {
      label: "ড্যাশবোর্ড",
      href: "/admin/dashboard",
      icon: LayoutDashboard,
      badge: undefined,
    },
    {
      label: "নতুন লেখা",
      href: "/admin/articles/new",
      icon: PenSquare,
      badge: "তৈরি",
    },
    {
      label: "সব লেখা",
      href: "/admin/articles",
      icon: BookOpen,
      badge: undefined,
    },
    {
      label: "ক্যাটাগরি",
      href: "/admin/categories",
      icon: FolderTree,
      badge: undefined,
    },
    {
      label: "বিশ্লেষণ",
      href: "/admin/analytics",
      icon: BarChart2,
      badge: undefined,
    },
  ];

  const bottomItems = [
    {
      label: "সেটিংস",
      href: "/admin/settings",
      icon: Settings,
    },
    {
      label: "লগআউট",
      href: "/admin/login",
      icon: LogOut,
      isDestructive: true,
    },
  ];

  const sidebarContent = (
    <div className="flex flex-col justify-between h-full p-4 sm:p-5">
      {/* Brand & Workspace Name */}
      <div className="space-y-6">
        <div className="flex items-center justify-between border-b border-[#E6DFD3] pb-4">
          <Link
            href="/admin/dashboard"
            className="flex items-center gap-2.5 focus:outline-hidden group"
          >
            <BrandIcon className="w-8 h-8 shrink-0 transition-transform group-hover:scale-105" />
            <div>
              <span className="font-serif font-black text-xl text-[#181A1B] group-hover:text-[#0E5A44] transition-colors block leading-tight">
                মনন
              </span>
              <span className="text-[10px] font-mono uppercase tracking-wider text-[#0E5A44] font-semibold block">
                ADMIN PANEL
              </span>
            </div>
          </Link>

          {isMobileOpen && (
            <button
              onClick={onMobileClose}
              className="md:hidden p-1.5 rounded-xs text-[#737D86] hover:text-[#181A1B] hover:bg-[#F2ECE1]"
              aria-label="মেনু বন্ধ করুন"
            >
              <X className="w-5 h-5" />
            </button>
          )}
        </div>

        {/* Navigation List */}
        <nav className="space-y-1" aria-label="অ্যাডমিন সাইডবার">
          {navItems.map((item) => {
            const isActive = pathname === item.href || (item.href === "/admin/dashboard" && pathname === "/admin/dashboard");
            const Icon = item.icon;

            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={onMobileClose}
                className={`flex items-center justify-between px-3 py-2.5 rounded-xs text-xs font-medium transition-all group ${
                  isActive
                    ? "bg-[#0E5A44] text-[#FFFFFF] shadow-2xs"
                    : "text-[#4A535A] hover:bg-[#F2ECE1] hover:text-[#181A1B]"
                }`}
              >
                <div className="flex items-center gap-3">
                  <Icon
                    className={`w-4 h-4 transition-colors ${
                      isActive ? "text-[#FFFFFF]" : "text-[#737D86] group-hover:text-[#0E5A44]"
                    }`}
                  />
                  <span>{item.label}</span>
                </div>

                {item.badge && (
                  <span
                    className={`text-[9px] font-mono px-1.5 py-0.5 rounded-2xs ${
                      isActive
                        ? "bg-[#FFFFFF]/20 text-[#FFFFFF]"
                        : "bg-[#E8F3EE] text-[#0E5A44]"
                    }`}
                  >
                    {item.badge}
                  </span>
                )}
              </Link>
            );
          })}
        </nav>
      </div>

      {/* Bottom Area: Settings, Public Site Link & Logout */}
      <div className="space-y-3 pt-4 border-t border-[#E6DFD3]">
        <Link
          href="/"
          target="_blank"
          className="flex items-center justify-between px-3 py-2 rounded-xs text-xs text-[#525B62] bg-[#FAF8F5] border border-[#E6DFD3] hover:border-[#0E5A44] hover:text-[#0E5A44] transition-colors"
        >
          <span className="flex items-center gap-2">
            <span>পাবলিক ওয়েবসাইট</span>
          </span>
          <ExternalLink className="w-3 h-3" />
        </Link>

        <div className="space-y-1">
          {bottomItems.map((item) => {
            const Icon = item.icon;
            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={onMobileClose}
                className={`flex items-center gap-3 px-3 py-2 rounded-xs text-xs font-medium transition-colors ${
                  item.isDestructive
                    ? "text-[#DC2626] hover:bg-[#FEF2F2]"
                    : "text-[#525B62] hover:bg-[#F2ECE1] hover:text-[#181A1B]"
                }`}
              >
                <Icon className="w-4 h-4 text-current" />
                <span>{item.label}</span>
              </Link>
            );
          })}
        </div>

        <div className="pt-2 text-[10px] text-[#737D86] font-mono border-t border-[#F2ECE1] text-center">
          মনন ইঞ্জিন সংস্করণ ১.০
        </div>
      </div>
    </div>
  );

  return (
    <>
      {/* Desktop Fixed Sidebar */}
      <aside className="hidden md:flex flex-col w-60 bg-[#FAF8F5] border-r border-[#E6DFD3] shrink-0 min-h-screen sticky top-0 h-screen overflow-y-auto">
        {sidebarContent}
      </aside>

      {/* Mobile Drawer Sheet */}
      {isMobileOpen && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label="মোবাইল অ্যাডমিন মেনু"
          className="fixed inset-0 z-50 md:hidden bg-black/60 backdrop-blur-xs flex animate-in fade-in duration-200"
          onClick={onMobileClose}
        >
          <div
            className="w-72 max-w-[80vw] bg-[#FAF8F5] h-full shadow-2xl border-r border-[#E6DFD3]"
            onClick={(e) => e.stopPropagation()}
          >
            {sidebarContent}
          </div>
        </div>
      )}
    </>
  );
}
