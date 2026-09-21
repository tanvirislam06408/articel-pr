import React from "react";
import { ArrowDown, Sparkles, BookOpen, Compass, ShieldCheck } from "lucide-react";

export function EditorialHero() {
  return (
    <section className="w-full bg-[#FAF8F5] border-b border-[#E6DFD3] pt-8 pb-12 sm:pt-12 sm:pb-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Main Editorial Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          {/* Left / Center Lead Thesis Column */}
          <div className="lg:col-span-8 space-y-6">
            {/* Editorial Kicker Badge */}
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-[#F2ECE1] border border-[#E6DFD3] rounded-xs text-xs text-[#0E5A44] font-medium tracking-wide">
              <Sparkles className="w-3.5 h-3.5 text-[#0E5A44]" />
              <span>মননশীল জীবন ও ডিজিটাল সচেতনতা</span>
            </div>

            {/* Main Editorial Headline */}
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-[3.25rem] font-serif font-black text-[#181A1B] leading-[1.22] tracking-tight">
              ডিজিটাল কোলাহলের যুগে নিজের মনোযোগ, অভ্যাস ও জীবনকে আরও সচেতনভাবে পরিচালনা করা।
            </h1>

            {/* Lead Supporting Paragraph */}
            <p className="text-base sm:text-lg md:text-xl text-[#4A535A] font-serif leading-relaxed max-w-3xl">
              অবিরাম নোটিফিকেশন, তাৎক্ষণিক ডোপামিন স্পাইক ও অবচেতন আসক্তির অদৃশ্য জালে বন্দী না হয়ে—বিজ্ঞানের আলো ও শান্ত মনস্তত্ত্বের মাধ্যমে নিজের চিন্তাশক্তি, আত্মনিয়ন্ত্রণ ও বাস্তব সম্পর্কের ভারসাম্য ফিরিয়ে আনার একটি মননশীল অনুসন্ধান।
            </p>

            {/* Editorial Action Bar */}
            <div className="pt-2 flex flex-wrap items-center gap-4">
              <a
                href="#featured-story"
                className="inline-flex items-center gap-2 px-6 py-3 bg-[#0E5A44] hover:bg-[#094030] text-[#FFFFFF] font-medium text-sm rounded-xs transition-all shadow-xs group"
              >
                <BookOpen className="w-4 h-4" />
                <span>প্রচ্ছদ নিবন্ধ পড়ুন</span>
                <ArrowDown className="w-4 h-4 group-hover:translate-y-0.5 transition-transform" />
              </a>

              <a
                href="#start-here"
                className="inline-flex items-center gap-2 px-5 py-3 bg-[#FFFFFF] hover:bg-[#F2ECE1] border border-[#E6DFD3] text-[#181A1B] font-medium text-sm rounded-xs transition-colors"
              >
                <Compass className="w-4 h-4 text-[#0E5A44]" />
                <span>কোথা থেকে শুরু করবেন?</span>
              </a>
            </div>

            {/* Quick Trust Indicators / Editorial Pillars */}
            <div className="pt-6 border-t border-[#E6DFD3]/80 grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs text-[#525B62]">
              <div className="flex items-start gap-2">
                <ShieldCheck className="w-4 h-4 text-[#0E5A44] shrink-0 mt-0.5" />
                <div>
                  <strong className="text-[#181A1B] font-semibold block">বিজ্ঞানভিত্তিক তথ্য</strong>
                  <span>নিউরোসায়েন্স ও আচরণগত গবেষণার আলোকে বিশ্লেষণ।</span>
                </div>
              </div>
              <div className="flex items-start gap-2">
                <ShieldCheck className="w-4 h-4 text-[#0E5A44] shrink-0 mt-0.5" />
                <div>
                  <strong className="text-[#181A1B] font-semibold block">বিচারহীন দৃষ্টিভঙ্গি</strong>
                  <span>দোষারোপ নয়, বরং সহানুভূতি ও উত্তরণের বাস্তবসম্মত পথ।</span>
                </div>
              </div>
              <div className="flex items-start gap-2">
                <ShieldCheck className="w-4 h-4 text-[#0E5A44] shrink-0 mt-0.5" />
                <div>
                  <strong className="text-[#181A1B] font-semibold block">বাস্তবমুখী রূপরেখা</strong>
                  <span>প্রাত্যহিক জীবনে সহজেই বাস্তবায়নযোগ্য অভ্যাস ও নিয়ম।</span>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Editorial Note / Issue Manifesto */}
          <div className="lg:col-span-4 bg-[#FFFFFF] border border-[#E6DFD3] p-6 sm:p-7 shadow-xs relative">
            <div className="absolute top-0 left-0 w-full h-1 bg-[#0E5A44]"></div>
            
            <div className="flex items-center justify-between text-xs text-[#737D86] font-mono border-b border-[#F2ECE1] pb-3 mb-4">
              <span>সম্পাদকীয় নিবেদন</span>
              <span>শরৎ ২০২৬</span>
            </div>

            <blockquote className="font-serif text-[#181A1B] text-base sm:text-lg leading-snug italic border-l-2 border-[#0E5A44] pl-3.5 my-4">
              &ldquo;আমাদের মনোযোগই আমাদের জীবন। আমরা যাকে মনোযোগ দিই, অবচেতনভাবে আমরা ঠিক সেটাই হয়ে উঠি।&rdquo;
            </blockquote>

            <p className="text-xs text-[#525B62] font-sans leading-relaxed mt-4">
              আধুনিক ডিজিটাল বিশ্বে দৃষ্টি আকর্ষণের জন্য কোটি কোটি ডলার ব্যয় হচ্ছে। আপনার বিভ্রান্তি তাদের মুনাফা। কিন্তু সচেতন হওয়া মানে নিজের মনের নিয়ন্ত্রণ নিজের হাতে ফিরিয়ে নেওয়া।
            </p>

            <div className="mt-6 pt-4 border-t border-[#F2ECE1] flex items-center justify-between">
              <div>
                <span className="font-serif font-bold text-sm text-[#181A1B] block">মনন পরিষদ</span>
                <span className="text-[11px] text-[#737D86]">সম্পাদকীয় মতামত</span>
              </div>
              <a
                href="#philosophy"
                className="text-xs text-[#0E5A44] font-medium hover:underline inline-flex items-center gap-1"
              >
                <span>আমাদের দর্শন</span>
                <span>→</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
