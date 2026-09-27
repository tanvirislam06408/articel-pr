"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/lib/auth-context";

export default function AdminRootPage() {
  const router = useRouter();
  const { isAuthenticated, isLoading } = useAuth();

  useEffect(() => {
    if (!isLoading) {
      if (isAuthenticated) {
        router.replace("/admin/dashboard");
      } else {
        router.replace("/admin/login");
      }
    }
  }, [isAuthenticated, isLoading, router]);

  return (
    <div className="min-h-screen bg-[#FAF8F5] flex items-center justify-center font-sans">
      <div className="flex flex-col items-center gap-3">
        <div className="w-8 h-8 border-2 border-[#0E5A44] border-t-transparent rounded-full animate-spin"></div>
        <p className="text-xs text-[#525B62] font-mono tracking-wide">
          মনন সম্পাদকীয় প্যানেল লোড হচ্ছে...
        </p>
      </div>
    </div>
  );
}
