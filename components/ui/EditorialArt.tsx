import React from "react";

interface EditorialArtProps {
  theme: "dopamine" | "focus" | "solitude" | "screen" | "connection" | "resilience" | "habits" | "nature";
  className?: string;
  variant?: "hero" | "card" | "thumbnail" | "banner";
}

export function EditorialArt({ theme, className = "", variant = "card" }: EditorialArtProps) {
  const getThemeContent = () => {
    switch (theme) {
      case "dopamine":
        return (
          <div className="relative w-full h-full bg-gradient-to-br from-[#1C262B] via-[#0F352E] to-[#121B1F] overflow-hidden flex items-center justify-center">
            {/* Concentric Signal Waves & Neural Pathways */}
            <svg className="absolute inset-0 w-full h-full opacity-35" viewBox="0 0 400 300" fill="none">
              <circle cx="200" cy="150" r="130" stroke="#68D391" strokeWidth="1" strokeDasharray="4 6" />
              <circle cx="200" cy="150" r="95" stroke="#E2E8F0" strokeWidth="1" opacity="0.4" />
              <circle cx="200" cy="150" r="60" stroke="#F6AD55" strokeWidth="1.5" strokeDasharray="6 6" />
              <circle cx="200" cy="150" r="28" fill="#E53E3E" opacity="0.6" />
              <path d="M50 150 Q120 70 200 150 T350 150" stroke="#68D391" strokeWidth="1.5" fill="none" opacity="0.5" />
              <path d="M80 220 Q200 40 320 220" stroke="#CBD5E1" strokeWidth="1" fill="none" opacity="0.3" />
              <line x1="200" y1="20" x2="200" y2="280" stroke="#E2E8F0" strokeWidth="0.75" strokeDasharray="2 4" opacity="0.3" />
            </svg>
            <div className="relative z-10 flex flex-col items-center text-center px-4">
              <span className="text-[10px] font-mono tracking-widest text-[#68D391] uppercase mb-1">
                NEURAL CIRCUIT & ATTENTION LOOP
              </span>
              <span className="text-xs font-serif text-[#F7FAFC]/80 italic">
                ডোপামিন চক্র ও মস্তিষ্কের স্বাভাবিক ভারসাম্য
              </span>
            </div>
          </div>
        );

      case "focus":
        return (
          <div className="relative w-full h-full bg-gradient-to-br from-[#1A252C] to-[#243B42] overflow-hidden flex items-center justify-center">
            <svg className="absolute inset-0 w-full h-full opacity-40" viewBox="0 0 400 300" fill="none">
              <rect x="140" y="70" width="120" height="160" rx="4" stroke="#FAF8F5" strokeWidth="1.5" fill="none" opacity="0.7" />
              <line x1="160" y1="100" x2="240" y2="100" stroke="#68D391" strokeWidth="2" />
              <line x1="160" y1="120" x2="230" y2="120" stroke="#FAF8F5" strokeWidth="1" opacity="0.6" />
              <line x1="160" y1="140" x2="240" y2="140" stroke="#FAF8F5" strokeWidth="1" opacity="0.6" />
              <line x1="160" y1="160" x2="210" y2="160" stroke="#FAF8F5" strokeWidth="1" opacity="0.6" />
              <circle cx="200" cy="150" r="120" stroke="#E2E8F0" strokeWidth="0.75" strokeDasharray="4 8" opacity="0.3" />
              <path d="M0 150 L400 150" stroke="#CBD5E1" strokeWidth="0.5" opacity="0.2" />
            </svg>
            <div className="relative z-10 text-center px-4">
              <span className="text-[10px] font-mono tracking-widest text-[#E2E8F0] uppercase block mb-1">
                DEEP CONCENTRATION
              </span>
              <span className="text-xs font-serif text-[#CBD5E1]/90 italic">
                নিবিড় পাঠ ও অবিচল একাগ্রতা
              </span>
            </div>
          </div>
        );

      case "solitude":
        return (
          <div className="relative w-full h-full bg-gradient-to-br from-[#2D2A26] to-[#45372E] overflow-hidden flex items-center justify-center">
            <svg className="absolute inset-0 w-full h-full opacity-35" viewBox="0 0 400 300" fill="none">
              <circle cx="200" cy="120" r="50" fill="#E2E8F0" opacity="0.15" />
              <path d="M120 250 C160 210 240 210 280 250" stroke="#FAF8F5" strokeWidth="1.5" fill="none" opacity="0.6" />
              <circle cx="200" cy="170" r="18" fill="#FAF8F5" opacity="0.4" />
              <line x1="80" y1="260" x2="320" y2="260" stroke="#E2E8F0" strokeWidth="1" opacity="0.4" />
            </svg>
            <div className="relative z-10 text-center px-4">
              <span className="text-[10px] font-mono tracking-widest text-[#FBD38D] uppercase block mb-1">
                INNER REFLECTION
              </span>
              <span className="text-xs font-serif text-[#FAF8F5]/85 italic">
                আত্মসমালোচনা ও মানসিক আরোগ্য
              </span>
            </div>
          </div>
        );

      case "screen":
        return (
          <div className="relative w-full h-full bg-gradient-to-br from-[#1E293B] via-[#0F172A] to-[#1E293B] overflow-hidden flex items-center justify-center">
            <svg className="absolute inset-0 w-full h-full opacity-40" viewBox="0 0 400 300" fill="none">
              {/* Minimal device frame silhouette */}
              <rect x="150" y="60" width="100" height="180" rx="16" stroke="#94A3B8" strokeWidth="1.5" fill="none" />
              <line x1="180" y1="75" x2="220" y2="75" stroke="#94A3B8" strokeWidth="2" strokeLinecap="round" />
              <circle cx="200" cy="225" r="4" fill="#94A3B8" />
              <circle cx="200" cy="140" r="30" stroke="#38BDF8" strokeWidth="1" strokeDasharray="3 3" />
              <line x1="70" y1="150" x2="330" y2="150" stroke="#475569" strokeWidth="0.75" strokeDasharray="2 4" />
            </svg>
            <div className="relative z-10 text-center px-4">
              <span className="text-[10px] font-mono tracking-widest text-[#38BDF8] uppercase block mb-1">
                INTENTIONAL BOUNDARIES
              </span>
              <span className="text-xs font-serif text-[#F8FAFC]/85 italic">
                প্রযুক্তির সুস্থ সীমারেখা
              </span>
            </div>
          </div>
        );

      case "habits":
        return (
          <div className="relative w-full h-full bg-gradient-to-br from-[#1E3A2F] to-[#132A22] overflow-hidden flex items-center justify-center">
            <svg className="absolute inset-0 w-full h-full opacity-35" viewBox="0 0 400 300" fill="none">
              <circle cx="150" cy="150" r="50" stroke="#86EFAC" strokeWidth="1.5" fill="none" />
              <circle cx="250" cy="150" r="50" stroke="#FDE047" strokeWidth="1.5" fill="none" />
              <path d="M150 100 A50 50 0 0 1 250 200" stroke="#FFFFFF" strokeWidth="2" fill="none" strokeDasharray="5 5" />
            </svg>
            <div className="relative z-10 text-center px-4">
              <span className="text-[10px] font-mono tracking-widest text-[#86EFAC] uppercase block mb-1">
                MICRO REPETITION
              </span>
              <span className="text-xs font-serif text-[#F0FDF4]/85 italic">
                দৈনন্দিন অভ্যাসের রূপান্তর
              </span>
            </div>
          </div>
        );

      case "connection":
        return (
          <div className="relative w-full h-full bg-gradient-to-br from-[#2D1B36] to-[#1A1024] overflow-hidden flex items-center justify-center">
            <svg className="absolute inset-0 w-full h-full opacity-35" viewBox="0 0 400 300" fill="none">
              <circle cx="160" cy="140" r="35" stroke="#D8B4FE" strokeWidth="1.5" />
              <circle cx="240" cy="140" r="35" stroke="#F472B6" strokeWidth="1.5" />
              <path d="M160 140 Q200 180 240 140" stroke="#FFFFFF" strokeWidth="1.5" fill="none" />
            </svg>
            <div className="relative z-10 text-center px-4">
              <span className="text-[10px] font-mono tracking-widest text-[#E9D5FF] uppercase block mb-1">
                HUMAN PROXIMITY
              </span>
              <span className="text-xs font-serif text-[#FAF5FF]/85 italic">
                বাস্তব মানবিক সান্নিধ্য
              </span>
            </div>
          </div>
        );

      case "resilience":
        return (
          <div className="relative w-full h-full bg-gradient-to-br from-[#262D33] to-[#181F24] overflow-hidden flex items-center justify-center">
            <svg className="absolute inset-0 w-full h-full opacity-35" viewBox="0 0 400 300" fill="none">
              <polygon points="200,60 280,220 120,220" stroke="#FCD34D" strokeWidth="1.5" fill="none" />
              <circle cx="200" cy="165" r="30" stroke="#FAF8F5" strokeWidth="1" strokeDasharray="3 3" />
            </svg>
            <div className="relative z-10 text-center px-4">
              <span className="text-[10px] font-mono tracking-widest text-[#FCD34D] uppercase block mb-1">
                STOIC ENDURANCE
              </span>
              <span className="text-xs font-serif text-[#F8FAFC]/85 italic">
                মানসিক স্থৈর্য ও অবিচলতা
              </span>
            </div>
          </div>
        );

      case "nature":
      default:
        return (
          <div className="relative w-full h-full bg-gradient-to-br from-[#1E332D] via-[#152420] to-[#101917] overflow-hidden flex items-center justify-center">
            <svg className="absolute inset-0 w-full h-full opacity-35" viewBox="0 0 400 300" fill="none">
              <path d="M50 240 Q150 120 250 240 T400 240" stroke="#A7F3D0" strokeWidth="1.5" fill="none" />
              <circle cx="200" cy="90" r="32" stroke="#FEF3C7" strokeWidth="1" opacity="0.6" />
              <line x1="50" y1="240" x2="350" y2="240" stroke="#E2E8F0" strokeWidth="1" opacity="0.4" />
            </svg>
            <div className="relative z-10 text-center px-4">
              <span className="text-[10px] font-mono tracking-widest text-[#A7F3D0] uppercase block mb-1">
                SERENITY & CLARITY
              </span>
              <span className="text-xs font-serif text-[#ECFDF5]/85 italic">
                প্রকৃতি ও শান্ত আত্মানুসন্ধান
              </span>
            </div>
          </div>
        );
    }
  };

  const getVariantStyles = () => {
    switch (variant) {
      case "hero":
        return "h-64 sm:h-80 md:h-[420px] w-full rounded-none border border-[#E6DFD3]/60";
      case "thumbnail":
        return "h-24 w-28 sm:h-28 sm:w-36 shrink-0 rounded-none border border-[#E6DFD3]/60";
      case "banner":
        return "h-48 sm:h-64 w-full rounded-none border border-[#E6DFD3]/60";
      case "card":
      default:
        return "h-48 sm:h-56 w-full rounded-none border-b border-[#E6DFD3]/60";
    }
  };

  return (
    <div
      className={`relative overflow-hidden transition-all duration-500 group-hover:scale-[1.01] ${getVariantStyles()} ${className}`}
      aria-hidden="true"
    >
      {getThemeContent()}
    </div>
  );
}
