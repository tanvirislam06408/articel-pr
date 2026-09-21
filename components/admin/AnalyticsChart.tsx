"use client";

import React, { useState } from "react";
import { WEEKLY_ANALYTICS } from "@/lib/data/admin-articles";
import { toBengaliNumber } from "@/lib/utils";
import { TrendingUp, Calendar, ArrowUpRight } from "lucide-react";

export function AnalyticsChart() {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const data = WEEKLY_ANALYTICS;

  const maxViews = Math.max(...data.map((d) => d.views));
  const svgWidth = 500;
  const svgHeight = 160;
  const paddingX = 30;
  const paddingY = 20;

  // Compute points
  const points = data.map((d, idx) => {
    const x = paddingX + (idx / (data.length - 1)) * (svgWidth - 2 * paddingX);
    const y = svgHeight - paddingY - (d.views / (maxViews * 1.15)) * (svgHeight - 2 * paddingY);
    return { x, y, data: d };
  });

  const linePath = points.reduce((acc, curr, idx) => {
    return `${acc} ${idx === 0 ? "M" : "L"} ${curr.x} ${curr.y}`;
  }, "");

  const areaPath = `${linePath} L ${points[points.length - 1].x} ${svgHeight - paddingY} L ${points[0].x} ${svgHeight - paddingY} Z`;

  const totalViewsInPeriod = data.reduce((acc, curr) => acc + curr.views, 0);
  const averageDailyViews = Math.round(totalViewsInPeriod / data.length);

  return (
    <div className="p-5 sm:p-6 bg-[#FFFFFF] border border-[#E6DFD3] rounded-xs shadow-2xs space-y-4">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-[#F2ECE1] pb-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="font-serif font-bold text-base sm:text-lg text-[#181A1B]">
              পাঠক সম্পৃক্ততা ও ভিউ ট্রেন্ড
            </span>
            <span className="inline-flex items-center gap-1 text-[11px] font-medium text-[#0E5A44] bg-[#E8F3EE] px-2 py-0.5 rounded-2xs">
              <TrendingUp className="w-3 h-3" />
              +১২.৪% বৃদ্ধি
            </span>
          </div>
          <p className="text-xs text-[#737D86] font-sans">
            গত ৭ দিনের সামগ্রিক পাঠক এনগেজমেন্ট ও দৈনিক ভিউ নিরীক্ষণ
          </p>
        </div>

        <div className="flex items-center gap-2 text-xs font-mono text-[#525B62]">
          <span className="px-2.5 py-1 bg-[#FAF8F5] border border-[#E6DFD3] rounded-2xs flex items-center gap-1.5">
            <Calendar className="w-3.5 h-3.5 text-[#0E5A44]" />
            <span>১৫ — ২১ সেপ্টেম্বর</span>
          </span>
        </div>
      </div>

      {/* SVG Chart */}
      <div className="relative pt-2">
        <svg
          viewBox={`0 0 ${svgWidth} ${svgHeight}`}
          className="w-full h-40 sm:h-48 overflow-visible"
          aria-label="সাপ্তাহিক ভিউ গ্রাফ"
        >
          {/* Subtle horizontal grid lines */}
          <line
            x1={paddingX}
            y1={paddingY}
            x2={svgWidth - paddingX}
            y2={paddingY}
            stroke="#F2ECE1"
            strokeDasharray="3 3"
            strokeWidth="1"
          />
          <line
            x1={paddingX}
            y1={svgHeight / 2}
            x2={svgWidth - paddingX}
            y2={svgHeight / 2}
            stroke="#F2ECE1"
            strokeDasharray="3 3"
            strokeWidth="1"
          />
          <line
            x1={paddingX}
            y1={svgHeight - paddingY}
            x2={svgWidth - paddingX}
            y2={svgHeight - paddingY}
            stroke="#E6DFD3"
            strokeWidth="1"
          />

          {/* Area Fill */}
          <path
            d={areaPath}
            fill="url(#forest-gradient)"
            opacity="0.18"
          />

          {/* Line Stroke */}
          <path
            d={linePath}
            fill="none"
            stroke="#0E5A44"
            strokeWidth="2.25"
            strokeLinecap="round"
            strokeLinejoin="round"
          />

          {/* Linear Gradient Definition */}
          <defs>
            <linearGradient id="forest-gradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#0E5A44" stopOpacity="0.8" />
              <stop offset="100%" stopColor="#0E5A44" stopOpacity="0" />
            </linearGradient>
          </defs>

          {/* Interactive Data Points */}
          {points.map((pt, idx) => {
            const isHovered = hoveredIndex === idx;
            return (
              <g key={pt.data.date}>
                <circle
                  cx={pt.x}
                  cy={pt.y}
                  r={isHovered ? 5.5 : 3.5}
                  fill={isHovered ? "#0E5A44" : "#FFFFFF"}
                  stroke="#0E5A44"
                  strokeWidth={isHovered ? "2.5" : "1.5"}
                  className="transition-all duration-150 cursor-pointer"
                  onMouseEnter={() => setHoveredIndex(idx)}
                  onMouseLeave={() => setHoveredIndex(null)}
                />

                {/* X-axis date labels */}
                <text
                  x={pt.x}
                  y={svgHeight - 4}
                  textAnchor="middle"
                  className={`text-[10px] font-sans ${
                    isHovered ? "fill-[#0E5A44] font-bold" : "fill-[#737D86]"
                  }`}
                >
                  {pt.data.date}
                </text>
              </g>
            );
          })}
        </svg>

        {/* Hover Tooltip Overlay */}
        {hoveredIndex !== null && (
          <div
            className="absolute top-2 right-4 bg-[#181A1B] text-[#FAF8F5] p-2.5 rounded-xs shadow-md text-xs font-mono border border-[#333] pointer-events-none animate-in fade-in duration-100"
          >
            <p className="text-[11px] text-[#9CA3AF] font-sans">
              {data[hoveredIndex].date} ২০২৬
            </p>
            <p className="font-bold text-[#68D391] mt-0.5">
              মোট ভিউ: {toBengaliNumber(data[hoveredIndex].views.toLocaleString("en-US"))}
            </p>
            <p className="text-[10px] text-[#CBD5E1]">
              সম্পূর্ণ পাঠ: {toBengaliNumber(data[hoveredIndex].reads.toLocaleString("en-US"))}
            </p>
          </div>
        )}
      </div>

      {/* Footer Mini Stats */}
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 pt-3 border-t border-[#F2ECE1] text-xs">
        <div>
          <span className="text-[#737D86] text-[11px] block">৭ দিনের মোট ভিউ</span>
          <span className="font-serif font-bold text-sm text-[#181A1B]">
            {toBengaliNumber(totalViewsInPeriod.toLocaleString("en-US"))}
          </span>
        </div>
        <div>
          <span className="text-[#737D86] text-[11px] block">দৈনিক গড় পাঠক</span>
          <span className="font-serif font-bold text-sm text-[#181A1B]">
            {toBengaliNumber(averageDailyViews.toLocaleString("en-US"))}
          </span>
        </div>
        <div className="col-span-2 sm:col-span-1 flex items-center sm:justify-end">
          <a
            href="#all-articles"
            className="text-[11px] text-[#0E5A44] font-medium hover:underline inline-flex items-center gap-1"
          >
            <span>বিস্তারিত এনালিটিক্স</span>
            <ArrowUpRight className="w-3 h-3" />
          </a>
        </div>
      </div>
    </div>
  );
}
