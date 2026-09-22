export interface Topic {
  id: string;
  slug: string;
  title: string;
  shortDesc: string;
  articleCount: number;
  featuredQuote: string;
  badgeColor: string;
  iconName: string;
}

export const TOPICS: Topic[] = [
  {
    id: "digital-wellness",
    slug: "digital-wellness",
    title: "ডিজিটাল সুস্থতা",
    shortDesc: "পর্দার অতিব্যবহার ও নোটিফিকেশনের গোলকধাঁধা কাটিয়ে প্রযুক্তির সাথে স্বাস্থ্যকর সীমারেখা তৈরির বিজ্ঞান।",
    articleCount: 12,
    featuredQuote: "প্রযুক্তি আপনার হাতিয়ার হোক, আপনার মনোযোগের মালিক নয়।",
    badgeColor: "emerald",
    iconName: "Smartphone",
  },
  {
    id: "porn-recovery",
    slug: "porn-recovery",
    title: "পর্নোগ্রাফি ও ডোপামিন রিবুট",
    shortDesc: "পর্নোগ্রাফির নিউরো-মনস্তাত্ত্বিক ক্ষতি, আসক্তির চক্র ভাঙা ও আত্মমর্যাদাপূর্ণ সুস্থ মানসিকতায় প্রত্যাবর্তন।",
    articleCount: 9,
    featuredQuote: "উত্তরণের প্রথম ধাপ আত্মগ্লানি নয়, সচেতন মনস্তাত্ত্বিক উপলব্ধি।",
    badgeColor: "rose",
    iconName: "ShieldAlert",
  },
  {
    id: "attention-focus",
    slug: "attention-focus",
    title: "মনোযোগ ও গভীর কাজ",
    shortDesc: "অবিরাম বিক্ষিপ্ততার যুগে ডিপ ওয়ার্ক (Deep Work), দীর্ঘস্থায়ী একাগ্রতা ও চিন্তা করার ক্ষমতা পুনরুদ্ধার।",
    articleCount: 14,
    featuredQuote: "আপনার জীবনের মান নির্ধারিত হয় আপনার মনোযোগের গভীরতা দিয়ে।",
    badgeColor: "teal",
    iconName: "Compass",
  },
  {
    id: "self-control",
    slug: "self-control",
    title: "আত্মনিয়ন্ত্রণ ও ইচ্ছাশক্তি",
    shortDesc: "তাৎক্ষণিক তৃপ্তির লোভ সংবরণ, দীর্ঘমেয়াদী লক্ষ্যের প্রতি নিষ্ঠা এবং অভ্যন্তরীণ মানসিক স্থিতি।",
    articleCount: 11,
    featuredQuote: "আত্মনিয়ন্ত্রণ স্বাধীনতা কেড়ে নেয় না, বরং প্রকৃত স্বাধীনতা তৈরি করে।",
    badgeColor: "amber",
    iconName: "Brain",
  },
  {
    id: "habits",
    slug: "habits",
    title: "স্বাস্থ্যকর অভ্যাস রূপান্তর",
    shortDesc: "অবচেতন ধ্বংসাত্মক চক্রগুলো ভেঙে কার্যকর রুটিন ও টেকসই অভ্যাস গড়ে তোলার মনস্তত্ত্ব।",
    articleCount: 16,
    featuredQuote: "আমরা প্রতিনিয়ত যা করি তারই প্রতিচ্ছবি আমরা নিজেরা।",
    badgeColor: "blue",
    iconName: "Repeat",
  },
  {
    id: "relationships",
    slug: "relationships",
    title: "বাস্তব সম্পর্ক ও নৈকট্য",
    shortDesc: "সোশ্যাল মিডিয়ার কৃত্রিম সংযোগের বাইরে রক্ত-মাংসের মানুষের সাথে গভীর, অর্থপূর্ণ ও সংবেদনশীল বন্ধন।",
    articleCount: 8,
    featuredQuote: "উপস্থিতিই হলো ভালোবাসার সবচেয়ে বিরল ও মূল্যবান রূপ।",
    badgeColor: "violet",
    iconName: "HeartHandshake",
  },
  {
    id: "mental-resilience",
    slug: "mental-resilience",
    title: "মানসিক দৃঢ়তা ও দর্শন",
    shortDesc: "জীবনের চাপ, একাকীত্ব ও বিভ্রান্তির মুহূর্তে আত্মবিশ্বাস ও শান্ত মানসিক স্থৈর্য ধরে রাখার দিশা।",
    articleCount: 10,
    featuredQuote: "বাইরের কোলাহল যত তীব্রই হোক, মনের ভেতরের গভীর প্রশান্তি রক্ষা করা সম্ভব।",
    badgeColor: "stone",
    iconName: "Lightbulb",
  },
];
