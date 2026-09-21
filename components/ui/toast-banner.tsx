"use client";

import React from "react";
import { CheckCircle2, AlertCircle, Info, X } from "lucide-react";
import { cn } from "@/lib/utils";

export interface ToastBannerProps {
  type?: "success" | "error" | "info";
  message: string;
  onClose?: () => void;
  className?: string;
}

export function ToastBanner({
  type = "success",
  message,
  onClose,
  className,
}: ToastBannerProps) {
  const typeConfig = {
    success: {
      bg: "bg-emerald-50 border-emerald-200 text-emerald-800",
      icon: <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />,
    },
    error: {
      bg: "bg-rose-50 border-rose-200 text-rose-800",
      icon: <AlertCircle className="w-4 h-4 text-rose-600 shrink-0" />,
    },
    info: {
      bg: "bg-sky-50 border-sky-200 text-sky-800",
      icon: <Info className="w-4 h-4 text-sky-600 shrink-0" />,
    },
  };

  const current = typeConfig[type];

  return (
    <div
      role="alert"
      className={cn(
        "p-3.5 rounded-lg border flex items-center justify-between gap-3 text-xs font-medium shadow-xs animate-in fade-in slide-in-from-top-2 duration-200",
        current.bg,
        className
      )}
    >
      <div className="flex items-center gap-2.5">
        {current.icon}
        <span className="leading-snug">{message}</span>
      </div>
      {onClose && (
        <button
          onClick={onClose}
          className="p-1 hover:opacity-75 rounded transition-opacity cursor-pointer"
          aria-label="Close"
        >
          <X className="w-3.5 h-3.5" />
        </button>
      )}
    </div>
  );
}
