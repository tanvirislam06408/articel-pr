import React from "react";
import { PHILOSOPHY_PILLARS } from "@/lib/data/articles";
import { ShieldCheck, BookMarked, Lightbulb } from "lucide-react";

export function EditorialPhilosophy() {
  return (
    <section id="philosophy" className="w-full bg-[#FAF8F5] py-12 sm:py-16 border-b border-[#E6DFD3]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="max-w-3xl mb-10">
          <div className="inline-flex items-center gap-1.5 text-xs font-mono uppercase tracking-wider text-[#0E5A44] mb-2">
            <BookMarked className="w-3.5 h-3.5" />
            <span>OUR EDITORIAL CHARTER & BELIEFS</span>
          </div>
          <h2 className="font-serif font-black text-2xl sm:text-3xl md:text-4xl text-[#181A1B] leading-tight mb-4">
            আমাদের সম্পাদনা দর্শন ও প্রতিশ্রুতি
          </h2>
          <p className="text-sm sm:text-base text-[#4A535A] font-serif leading-relaxed">
            আমরা বিশ্বাস করি যে ডিজিটাল যুগে মানসিক শান্তি ও আত্মনিয়ন্ত্রণ বজায় রাখা কোনো বিলাসিতা নয়, বরং একটি মৌলিক মানবিক প্রয়োজনীয়তা। আমাদের প্রতিটি লেখার পেছনে চারটি প্রধান মূল্যবোধ কাজ করে:
          </p>
        </div>

        {/* 4 Pillars Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {PHILOSOPHY_PILLARS.map((pillar) => (
            <div
              key={pillar.number}
              className="p-6 sm:p-8 bg-[#FFFFFF] border border-[#E6DFD3] flex flex-col justify-between hover:border-[#0E5A44] transition-all group"
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <span className="font-mono text-xs font-bold text-[#0E5A44] px-2 py-0.5 bg-[#E8F3EE] rounded-2xs">
                    স্তম্ভ {pillar.number}
                  </span>
                  <Lightbulb className="w-4 h-4 text-[#D9D2C4] group-hover:text-[#0E5A44] transition-colors" />
                </div>

                <h3 className="font-serif font-bold text-lg sm:text-xl text-[#181A1B] group-hover:text-[#0E5A44] transition-colors mb-3">
                  {pillar.title}
                </h3>

                <p className="text-xs sm:text-sm text-[#525B62] font-sans leading-relaxed">
                  {pillar.description}
                </p>
              </div>

              <div className="mt-6 pt-4 border-t border-[#F2ECE1] flex items-center gap-2 text-xs text-[#737D86]">
                <ShieldCheck className="w-4 h-4 text-[#0E5A44]" />
                <span>সম্পাদনা পরিষদের অঙ্গীকার</span>
              </div>
            </div>
          ))}
        </div>

        {/* Medical & Scientific Transparency Disclaimer */}
        <div className="mt-8 p-5 bg-[#F2ECE1] border border-[#E6DFD3] rounded-xs flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 text-xs text-[#525B62]">
          <div className="space-y-1 max-w-3xl">
            <strong className="text-[#181A1B] font-semibold block">
              স্বচ্ছতা ও তথ্যমূলক সতর্কবার্তা:
            </strong>
            <p className="leading-relaxed">
              মনন-এ প্রকাশিত প্রবন্ধগুলো সচেতনতামূলক ও গবেষণালব্ধ তথ্যের ওপর ভিত্তি করে রচিত। এগুলো কোনো সরাসরি চিকিৎসা বা সাইকিয়াট্রিক প্রেসক্রিপশন নয়। তীব্র মানসিক বা আচরণগত সংকটে সর্বদা নিবন্ধিত বিশেষজ্ঞ বা মনোচিকিৎসকের পরামর্শ নেওয়া উচিত।
            </p>
          </div>
          <div className="shrink-0 text-xs font-mono text-[#0E5A44] font-semibold">
            মনন নীতিমালা • ২০২৬
          </div>
        </div>
      </div>
    </section>
  );
}
