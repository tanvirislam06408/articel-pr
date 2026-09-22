import React from "react";

interface BrandIconProps {
  className?: string;
  size?: number;
}

export function BrandIcon({ className = "w-6 h-6", size }: BrandIconProps) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 48 48"
      fill="none"
      width={size}
      height={size}
      className={className}
      aria-hidden="true"
    >
      <defs>
        <linearGradient id="monon-brand-grad" x1="4" y1="4" x2="44" y2="44" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#0E5A44" />
          <stop offset="50%" stopColor="#008767" />
          <stop offset="100%" stopColor="#094030" />
        </linearGradient>
        <linearGradient id="monon-brand-gold" x1="12" y1="12" x2="36" y2="36" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#F3E7C4" />
          <stop offset="100%" stopColor="#D4AF37" />
        </linearGradient>
      </defs>

      {/* Base Badge */}
      <rect x="2" y="2" width="44" height="44" rx="12" fill="url(#monon-brand-grad)" />
      <rect x="3.5" y="3.5" width="41" height="41" rx="10.5" stroke="#FAF8F5" strokeOpacity="0.2" strokeWidth="1.5" />

      {/* Concentric Ring */}
      <circle cx="24" cy="24" r="17" stroke="#FAF8F5" strokeOpacity="0.18" strokeDasharray="2 3" strokeWidth="1" />

      {/* Open Journal / Book Pages */}
      <path
        d="M24 16C21 14 16 14.5 13 16V31C16 29.5 21 29 24 31C27 29 32 29.5 35 31V16C32 14.5 27 14 24 16Z"
        fill="#FAF8F5"
        fillOpacity="0.95"
      />
      <path d="M24 16V31" stroke="#0E5A44" strokeWidth="1.5" strokeLinecap="round" />

      {/* Mindful Quill Feather Flame */}
      <path
        d="M24 11C22 14 20.5 17 21 19.5C21.5 22 23.5 23 24 23C24.5 23 26.5 22 27 19.5C27.5 17 26 14 24 11Z"
        fill="url(#monon-brand-gold)"
      />

      {/* Center Bengali dot */}
      <circle cx="24" cy="27" r="1.5" fill="#0E5A44" />
    </svg>
  );
}
