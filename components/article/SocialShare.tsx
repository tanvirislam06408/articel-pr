"use client";

import React, { useState } from "react";
import { Share2, Check, Copy } from "lucide-react";
import { Button } from "@/components/ui/button";

interface SocialShareProps {
  title: string;
  url?: string;
}

export function SocialShare({ title, url }: SocialShareProps) {
  const [copied, setCopied] = useState(false);
  const currentUrl =
    url || (typeof window !== "undefined" ? window.location.href : "");

  const handleCopy = () => {
    if (typeof navigator !== "undefined" && navigator.clipboard) {
      navigator.clipboard.writeText(currentUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    }
  };

  const shareFacebook = () => {
    window.open(
      `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(
        currentUrl
      )}`,
      "_blank"
    );
  };

  const shareWhatsApp = () => {
    window.open(
      `https://api.whatsapp.com/send?text=${encodeURIComponent(
        `${title} - ${currentUrl}`
      )}`,
      "_blank"
    );
  };

  const shareTwitter = () => {
    window.open(
      `https://twitter.com/intent/tweet?text=${encodeURIComponent(
        title
      )}&url=${encodeURIComponent(currentUrl)}`,
      "_blank"
    );
  };

  return (
    <div className="flex items-center flex-wrap gap-2 py-3 border-y border-[#E5E0D8]/60 my-6">
      <span className="text-xs font-medium text-stone-500 flex items-center gap-1 mr-2">
        <Share2 className="w-3.5 h-3.5" /> শেয়ার করুন:
      </span>
      <Button
        variant="outline"
        size="sm"
        onClick={shareFacebook}
        className="h-8 text-xs font-normal hover:bg-blue-50 hover:text-blue-600 hover:border-blue-200"
      >
        Facebook
      </Button>
      <Button
        variant="outline"
        size="sm"
        onClick={shareWhatsApp}
        className="h-8 text-xs font-normal hover:bg-emerald-50 hover:text-emerald-600 hover:border-emerald-200"
      >
        WhatsApp
      </Button>
      <Button
        variant="outline"
        size="sm"
        onClick={shareTwitter}
        className="h-8 text-xs font-normal hover:bg-sky-50 hover:text-sky-600 hover:border-sky-200"
      >
        X (Twitter)
      </Button>
      <Button
        variant="secondary"
        size="sm"
        onClick={handleCopy}
        className="h-8 text-xs font-normal flex items-center gap-1"
      >
        {copied ? (
          <>
            <Check className="w-3.5 h-3.5 text-emerald-600" /> লিংক কপি হয়েছে!
          </>
        ) : (
          <>
            <Copy className="w-3.5 h-3.5" /> লিংক কপি
          </>
        )}
      </Button>
    </div>
  );
}
