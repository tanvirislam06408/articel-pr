"use client";

import React, { useState } from "react";
import { START_HERE_STEPS } from "@/lib/data/articles";
import { CheckCircle2, Compass, ArrowRight, Lightbulb, CheckSquare, Square } from "lucide-react";

export function StartHereGuide() {
  const [activeStepIndex, setActiveStepIndex] = useState(0);
  const [completedSteps, setCompletedSteps] = useState<number[]>([]);

  const toggleStepCompleted = (index: number) => {
    if (completedSteps.includes(index)) {
      setCompletedSteps(completedSteps.filter((i) => i !== index));
    } else {
      setCompletedSteps([...completedSteps, index]);
    }
  };

  const activeStep = START_HERE_STEPS[activeStepIndex];

  return (
    <section id="start-here" className="w-full bg-[#FAF8F5] py-12 sm:py-16 border-b border-[#E6DFD3]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between border-b-2 border-[#181A1B] pb-4 mb-8 gap-4">
          <div>
            <div className="inline-flex items-center gap-1.5 text-xs font-mono uppercase tracking-wider text-[#0E5A44] mb-1">
              <Compass className="w-3.5 h-3.5" />
              <span>READER&apos;S ONBOARDING & ROADMAP</span>
            </div>
            <h2 className="font-serif font-black text-2xl sm:text-3xl md:text-4xl text-[#181A1B]">
              কোথা থেকে শুরু করবেন?
            </h2>
          </div>
          <p className="text-xs sm:text-sm text-[#525B62] font-serif max-w-md">
            ডিজিটাল কোলাহল ও অস্বাস্থ্যকর আসক্তি থেকে উত্তরণের জন্য ৪-ধাপের একটি পরীক্ষিত মনস্তাত্ত্বিক রূপরেখা।
          </p>
        </div>

        {/* 4 Steps Interactive Navigator */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Step Selector List (Col 1-5) */}
          <div className="lg:col-span-5 space-y-3">
            {START_HERE_STEPS.map((step, idx) => {
              const isSelected = activeStepIndex === idx;
              const isDone = completedSteps.includes(idx);
              return (
                <div
                  key={step.stepNumber}
                  onClick={() => setActiveStepIndex(idx)}
                  className={`p-4 sm:p-5 border transition-all cursor-pointer rounded-xs flex items-start gap-4 ${
                    isSelected
                      ? "bg-[#FFFFFF] border-[#0E5A44] shadow-sm"
                      : "bg-[#FAF8F5] border-[#E6DFD3] hover:bg-[#F7F3EB]"
                  }`}
                >
                  <div
                    className={`w-8 h-8 rounded-full flex items-center justify-center font-mono text-xs font-bold shrink-0 transition-colors ${
                      isSelected
                        ? "bg-[#0E5A44] text-[#FFFFFF]"
                        : "bg-[#E6DFD3] text-[#525B62]"
                    }`}
                  >
                    {step.stepNumber}
                  </div>

                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between gap-2 mb-1">
                      <span className="text-[10px] font-mono text-[#737D86] uppercase tracking-wider">
                        {step.tag}
                      </span>
                      {isDone && (
                        <span className="inline-flex items-center gap-1 text-[10px] text-[#0E5A44] font-medium bg-[#E8F3EE] px-1.5 py-0.5 rounded-2xs">
                          <CheckCircle2 className="w-3 h-3" />
                          সম্পন্ন
                        </span>
                      )}
                    </div>
                    <h3
                      className={`font-serif font-bold text-sm sm:text-base leading-snug ${
                        isSelected ? "text-[#0E5A44]" : "text-[#181A1B]"
                      }`}
                    >
                      {step.title}
                    </h3>
                  </div>
                </div>
              );
            })}

            <div className="p-4 bg-[#F2ECE1] border border-[#E6DFD3] text-xs text-[#525B62] rounded-xs flex items-center justify-between">
              <span>আপনার অগ্রগতি: ৪টির মধ্যে {completedSteps.length}টি ধাপ চিহ্নিত</span>
              <span className="font-mono font-bold text-[#0E5A44]">
                {Math.round((completedSteps.length / START_HERE_STEPS.length) * 100)}%
              </span>
            </div>
          </div>

          {/* Right Step Detailed Breakdown Card (Col 6-12) */}
          <div className="lg:col-span-7 bg-[#FFFFFF] border border-[#E6DFD3] p-6 sm:p-8 md:p-10 shadow-xs relative">
            <div className="flex items-center justify-between border-b border-[#F2ECE1] pb-4 mb-6">
              <span className="text-xs font-mono font-bold text-[#0E5A44] px-2.5 py-1 bg-[#E8F3EE] rounded-2xs">
                ধাপ {activeStep.stepNumber} / ০৪
              </span>
              <span className="text-xs text-[#737D86] font-mono">{activeStep.tag}</span>
            </div>

            <h3 className="font-serif font-black text-xl sm:text-2xl text-[#181A1B] leading-snug mb-4">
              {activeStep.title}
            </h3>

            <p className="text-sm sm:text-base text-[#4A535A] font-serif leading-relaxed mb-6">
              {activeStep.description}
            </p>

            {/* Practical Action Tip Box */}
            <div className="p-4 sm:p-5 bg-[#FAF8F5] border-l-4 border-[#0E5A44] border-t border-r border-b border-[#E6DFD3] rounded-xs mb-6">
              <div className="flex items-start gap-3">
                <Lightbulb className="w-5 h-5 text-[#C67D26] shrink-0 mt-0.5" />
                <div>
                  <h4 className="text-xs font-bold text-[#181A1B] uppercase tracking-wider mb-1">
                    আজকের কার্যকর পদক্ষেপ:
                  </h4>
                  <p className="text-xs sm:text-sm text-[#525B62] font-sans leading-relaxed">
                    {activeStep.actionTip}
                  </p>
                </div>
              </div>
            </div>

            {/* Action Bar */}
            <div className="pt-4 border-t border-[#F2ECE1] flex flex-wrap items-center justify-between gap-4">
              <button
                onClick={() => toggleStepCompleted(activeStepIndex)}
                className="inline-flex items-center gap-2 px-4 py-2 bg-[#FAF8F5] border border-[#E6DFD3] hover:bg-[#F2ECE1] text-xs font-medium text-[#181A1B] rounded-xs transition-colors cursor-pointer"
              >
                {completedSteps.includes(activeStepIndex) ? (
                  <>
                    <CheckSquare className="w-4 h-4 text-[#0E5A44]" />
                    <span>ধাপটি সম্পন্ন হিসেবে চিহ্নিত</span>
                  </>
                ) : (
                  <>
                    <Square className="w-4 h-4 text-[#737D86]" />
                    <span>ধাপটি সম্পন্ন হয়েছে? ক্লিক করুন</span>
                  </>
                )}
              </button>

              {activeStepIndex < START_HERE_STEPS.length - 1 ? (
                <button
                  onClick={() => setActiveStepIndex(activeStepIndex + 1)}
                  className="inline-flex items-center gap-1.5 px-4 py-2 bg-[#0E5A44] text-[#FFFFFF] text-xs font-medium rounded-xs hover:bg-[#094030] transition-colors cursor-pointer"
                >
                  <span>পরবর্তী ধাপ ({START_HERE_STEPS[activeStepIndex + 1].stepNumber})</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              ) : (
                <a
                  href="#newsletter"
                  className="inline-flex items-center gap-1.5 px-4 py-2 bg-[#0E5A44] text-[#FFFFFF] text-xs font-medium rounded-xs hover:bg-[#094030] transition-colors"
                >
                  <span>সাপ্তাহিক রুটিন পেতে যোগ দিন</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </a>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
