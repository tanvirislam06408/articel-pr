import React from "react";

interface StatusBadgeProps {
  status: "published" | "draft";
}

export function StatusBadge({ status }: StatusBadgeProps) {
  if (status === "published") {
    return (
      <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-2xs text-[11px] font-medium bg-[#E8F3EE] text-[#0E5A44] border border-[#C2DFD3]">
        <span className="w-1.5 h-1.5 rounded-full bg-[#0E5A44]"></span>
        <span>প্রকাশিত</span>
      </span>
    );
  }

  return (
    <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-2xs text-[11px] font-medium bg-[#FEF6EA] text-[#C67D26] border border-[#EED7B5]">
      <span className="w-1.5 h-1.5 rounded-full bg-[#C67D26]"></span>
      <span>খসড়া</span>
    </span>
  );
}
