export interface AdminArticle {
  id: string;
  title: string;
  slug: string;
  category: string;
  categorySlug: string;
  status: "published" | "draft";
  publishedDate: string;
  views: number;
  author: string;
  readTime: string;
}

export interface DashboardMetric {
  id: string;
  label: string;
  value: number;
  formattedValue?: string;
  changePercent: string;
  isPositive: boolean;
  period: string;
}

export interface AnalyticsDataPoint {
  date: string;
  views: number;
  reads: number;
}

export const INITIAL_ADMIN_ARTICLES: AdminArticle[] = [
  {
    id: "art-1",
    title: "ডোপামিন লুপ ও আধুনিক আসক্তি: কেন আমরা বারবার স্ক্রিনে ফিরে যাই এবং কীভাবে মুক্তি পাব?",
    slug: "dopamine-loop-and-digital-addiction-breakdown",
    category: "পর্নোগ্রাফি ও ডোপামিন রিবুট",
    categorySlug: "porn-recovery",
    status: "published",
    publishedDate: "২১ সেপ্টেম্বর ২০২৬",
    views: 4820,
    author: "ডা. রাইয়ান আহমেদ",
    readTime: "৮ মিনিট",
  },
  {
    id: "art-2",
    title: "ডিজিটাল জীবনে মনোযোগ ফিরিয়ে আনার কয়েকটি বৈজ্ঞানিক উপায়",
    slug: "reclaiming-attention-in-digital-age",
    category: "মনোযোগ ও গভীর কাজ",
    categorySlug: "attention-focus",
    status: "published",
    publishedDate: "১৯ সেপ্টেম্বর ২০২৬",
    views: 3410,
    author: "তানজিম হোসাইন",
    readTime: "৬ মিনিট",
  },
  {
    id: "art-3",
    title: "অতিরিক্ত স্ক্রিন টাইম কীভাবে আমাদের দৈনন্দিন অভ্যাস বদলে দেয়",
    slug: "how-screen-time-alters-habits",
    category: "ডিজিটাল সুস্থতা",
    categorySlug: "digital-wellness",
    status: "published",
    publishedDate: "১৮ সেপ্টেম্বর ২০২৬",
    views: 2950,
    author: "আবরার ফাইয়াজ",
    readTime: "৫ মিনিট",
  },
  {
    id: "art-4",
    title: "নিজেকে নিয়ন্ত্রণ করার অভ্যাস কীভাবে তৈরি করবেন: আর্জ সার্ফিং পদ্ধতি",
    slug: "mastering-self-regulation-urge-surfing",
    category: "আত্মনিয়ন্ত্রণ ও ইচ্ছাশক্তি",
    categorySlug: "self-control",
    status: "published",
    publishedDate: "১৬ সেপ্টেম্বর ২০২৬",
    views: 2180,
    author: "ডা. মায়িশা করিম",
    readTime: "৬ মিনিট",
  },
  {
    id: "art-5",
    title: "সকালের প্রথম ৬০ মিনিট: ঘুম থেকে উঠেই ফোন স্পর্শ না করার মানসিক প্রভাব",
    slug: "atomic-habits-of-mindful-morning",
    category: "স্বাস্থ্যকর অভ্যাস রূপান্তর",
    categorySlug: "habits",
    status: "published",
    publishedDate: "১২ সেপ্টেম্বর ২০২৬",
    views: 1890,
    author: "নাজমুল হক",
    readTime: "৪ মিনিট",
  },
  {
    id: "art-6",
    title: "ভার্চুয়াল কোলাহল বনাম মনের প্রশান্তি: ডিজিটাল মিনিমালিজমের রূপরেখা",
    slug: "digital-minimalism-framework",
    category: "ডিজিটাল সুস্থতা",
    categorySlug: "digital-wellness",
    status: "draft",
    publishedDate: "খসড়া হিসেবে সংরক্ষিত",
    views: 0,
    author: "মনন সম্পাদকীয় দল",
    readTime: "৭ মিনিট",
  },
  {
    id: "art-7",
    title: "সোশ্যাল মিডিয়ার অদৃশ্য একাকীত্ব ও রক্ত-মাংসের মানুষের সান্নিধ্য",
    slug: "loneliness-in-hyperconnected-world",
    category: "বাস্তব সম্পর্ক ও নৈকট্য",
    categorySlug: "relationships",
    status: "draft",
    publishedDate: "খসড়া হিসেবে সংরক্ষিত",
    views: 0,
    author: "সাবরিনা চৌধুরী",
    readTime: "৫ মিনিট",
  },
  {
    id: "art-8",
    title: "স্টোইক দর্শন ও আধুনিক মানুষ: যা নিয়ন্ত্রণে নেই তা নিয়ে উদ্বেগহীন থাকার শিল্প",
    slug: "stoic-calmness-hyperconnected-world",
    category: "মানসিক দৃঢ়তা ও দর্শন",
    categorySlug: "mental-resilience",
    status: "published",
    publishedDate: "৮ সেপ্টেম্বর ২০২৬",
    views: 3200,
    author: "মাহমুদুর রহমান",
    readTime: "৭ মিনিট",
  },
];

export const INITIAL_METRICS: DashboardMetric[] = [
  {
    id: "total-articles",
    label: "মোট লেখা",
    value: 8,
    changePercent: "+২ এই মাসে",
    isPositive: true,
    period: "সর্বমোট আর্কাইভ",
  },
  {
    id: "published-articles",
    label: "প্রকাশিত লেখা",
    value: 6,
    changePercent: "+৩ গত সপ্তাহে",
    isPositive: true,
    period: "পাবলিক সাইটে দৃশ্যমান",
  },
  {
    id: "draft-articles",
    label: "খসড়া লেখা",
    value: 2,
    changePercent: "সম্পাদনা চলছে",
    isPositive: false,
    period: "অপ্রকাশিত খসড়া",
  },
  {
    id: "total-views",
    label: "মোট ভিউ",
    value: 18450,
    changePercent: "+১৮.৫% বৃদ্ধি",
    isPositive: true,
    period: "গত ৩০ দিনের সামগ্রিক পাঠ",
  },
];

export const WEEKLY_ANALYTICS: AnalyticsDataPoint[] = [
  { date: "১৫ সেপ্টে", views: 1850, reads: 1220 },
  { date: "১৬ সেপ্টে", views: 2100, reads: 1480 },
  { date: "১৭ সেপ্টে", views: 1980, reads: 1390 },
  { date: "১৮ সেপ্টে", views: 2740, reads: 1910 },
  { date: "১৯ সেপ্টে", views: 3120, reads: 2240 },
  { date: "২০ সেপ্টে", views: 3450, reads: 2610 },
  { date: "২১ সেপ্টে", views: 3210, reads: 2430 },
];
