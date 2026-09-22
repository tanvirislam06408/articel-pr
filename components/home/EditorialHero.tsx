import React from "react";
import { ArrowDown, Feather, BookOpen, Compass, ShieldCheck } from "lucide-react";

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
              <Feather className="w-3.5 h-3.5 text-[#0E5A44]" />
              <span>আত্মশুদ্ধি, মনস্তত্ত্ব ও ডিজিটাল সংযম</span>
            </div>

            {/* Main Editorial Headline */}
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-[3.25rem] font-serif font-black text-[#181A1B] leading-[1.22] tracking-tight">
              ডিজিটাল কোলাহলের যুগে নফসের লাগাম, মনোযোগের হেফাজত ও আত্মশুদ্ধির সাধনা।
            </h1>

            {/* Lead Supporting Paragraph */}
            <p className="text-base sm:text-lg md:text-xl text-[#4A535A] font-serif leading-relaxed max-w-3xl">
              অবিরাম ক্ষণস্থায়ী ডোপামিন স্পাইক ও পর্দার প্রলোভনে জীবন ও রুহকে বিনষ্ট না করে—কোরআনিক প্রজ্ঞা, তাজকিয়াতুন নাফস ও আধুনিক মনস্তত্ত্বের সমন্বয়ে আত্মনিয়ন্ত্রণ, দৃষ্টির সংযম ও হৃদয়ের গভীর প্রশান্তি ফিরিয়ে আনার একটি মননশীল অনুসন্ধান।
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
                  <strong className="text-[#181A1B] font-semibold block">তাজকিয়া ও আত্মনিয়ন্ত্রণ</strong>
                  <span>নফসের কুপ্রবৃত্তি ও তাৎক্ষণিক প্রলোভন সংযত করার মানসিক শক্তি।</span>
                </div>
              </div>
              <div className="flex items-start gap-2">
                <ShieldCheck className="w-4 h-4 text-[#0E5A44] shrink-0 mt-0.5" />
                <div>
                  <strong className="text-[#181A1B] font-semibold block">বিজ্ঞান ও মনস্তত্ত্ব</strong>
                  <span>নিউরোসায়েন্স ও আচরণগত গবেষণার আলোকে আসক্তি মুক্তির রূপরেখা।</span>
                </div>
              </div>
              <div className="flex items-start gap-2">
                <ShieldCheck className="w-4 h-4 text-[#0E5A44] shrink-0 mt-0.5" />
                <div>
                  <strong className="text-[#181A1B] font-semibold block">সময়ের আমানত ও প্রশান্তি</strong>
                  <span>দৃষ্টি, চিন্তা ও জীবনের সদ্ব্যবহারের মাধ্যমে অন্তরের গভীর স্থৈর্য।</span>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Editorial Note / Issue Manifesto */}
          <div className="lg:col-span-4 bg-[#FFFFFF] border border-[#E6DFD3] p-6 sm:p-7 shadow-xs relative">
            <div className="absolute top-0 left-0 w-full h-1 bg-[#0E5A44]"></div>
            
            <div className="flex items-center justify-between text-xs text-[#737D86] font-mono border-b border-[#F2ECE1] pb-3 mb-4">
              <span>সম্পাদকীয় নিবেদন</span>
              <span>শরৎ সংস্করণ</span>
            </div>

            <blockquote className="font-serif text-[#181A1B] text-base sm:text-lg leading-snug italic border-l-2 border-[#0E5A44] pl-3.5 my-4">
              &ldquo;নিশ্চয় সফলকাম হয়েছে সে, যে নিজের আত্মাকে পরিশুদ্ধ করেছে।&rdquo;
              <span className="block text-[11px] font-sans not-italic text-[#737D86] mt-1">
                — সূরা আশ-শামস, আয়াত: ৯
              </span>
            </blockquote>

            <p className="text-xs text-[#525B62] font-sans leading-relaxed mt-4">
              আমাদের দৃষ্টি, সময় ও অন্তরের মনোযোগ হলো এক পরম আমানত। অ্যালগরিদমের ক্ষতিকর জালে নিজেকে হারিয়ে না ফেলে আত্মসচেতনতা (মুহাসাবাহ) ও ইচ্ছাশক্তির মাধ্যমে রূহানী স্থিরতা অর্জন করাই জীবনের প্রকৃত সৌন্দর্য।
            </p>

            <div className="mt-6 pt-4 border-t border-[#F2ECE1] flex items-center justify-between">
              <div>
                <span className="font-serif font-bold text-sm text-[#181A1B] block">মনন পরিষদ</span>
                <span className="text-[11px] text-[#737D86]">সম্পাদকীয় দর্শন</span>
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
