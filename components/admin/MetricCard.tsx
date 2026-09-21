import React from "react";
import { toBengaliNumber } from "@/lib/utils";
import { BookOpen, CheckCircle2, FileEdit, Eye } from "lucide-react";

interface MetricCardProps {
  id: string;
  label: string;
  value: number;
  changePercent: string;
  isPositive: boolean;
  period: string;
}

export function MetricCard({
  id,
  label,
  value,
  changePercent,
  isPositive,
  period,
}: MetricCardProps) {
  const getMetricIcon = () => {
    switch (id) {
      case "total-articles":
        return <BookOpen className="w-4 h-4 text-[#0E5A44]" />;
      case "published-articles":
        return <CheckCircle2 className="w-4 h-4 text-[#0E5A44]" />;
      case "draft-articles":
        return <FileEdit className="w-4 h-4 text-[#C67D26]" />;
      case "total-views":
      default:
        return <Eye className="w-4 h-4 text-[#0E5A44]" />;
    }
  };

  const formattedNum = value.toLocaleString("en-US");
  const bnValue = toBengaliNumber(formattedNum);

  return (
    <div className="p-5 bg-[#FFFFFF] border border-[#E6DFD3] rounded-xs flex flex-col justify-between hover:border-[#0E5A44]/40 transition-colors shadow-2xs">
      <div className="flex items-center justify-between gap-2 mb-3">
        <span className="text-xs font-medium text-[#737D86] font-sans">{label}</span>
        <div className="w-7 h-7 rounded-xs bg-[#FAF8F5] border border-[#E6DFD3] flex items-center justify-center">
          {getMetricIcon()}
        </div>
      </div>

      <div>
        <div className="text-2xl sm:text-3xl font-serif font-black text-[#181A1B] tracking-tight mb-1.5">
          {bnValue}
        </div>

        <div className="flex items-center justify-between text-[11px] pt-2 border-t border-[#F2ECE1]">
          <span
            className={`font-medium ${
              isPositive ? "text-[#0E5A44]" : "text-[#737D86]"
            }`}
          >
            {changePercent}
          </span>
          <span className="text-[#737D86]">{period}</span>
        </div>
      </div>
    </div>
  );
}
