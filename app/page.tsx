"use client";

import React, { useState, useEffect } from "react";
import { Header } from "@/components/layout/Header";
import { EditorialHero } from "@/components/home/EditorialHero";
import { FeaturedCoverStory } from "@/components/home/FeaturedCoverStory";
import { TopicsSection } from "@/components/home/TopicsSection";
import { LatestArticles } from "@/components/home/LatestArticles";
import { StartHereGuide } from "@/components/home/StartHereGuide";
import { EditorialPhilosophy } from "@/components/home/EditorialPhilosophy";
import { NewsletterSection } from "@/components/home/NewsletterSection";
import { Footer } from "@/components/layout/Footer";
import { SearchModal } from "@/components/ui/SearchModal";
import { ArticleModal } from "@/components/ui/ArticleModal";
import { ReadingTools } from "@/components/ui/ReadingTools";
import { Article, FEATURED_COVER_ARTICLE, ARTICLES } from "@/lib/data/articles";
import { TOPICS, Topic } from "@/lib/data/topics";
import { api } from "@/lib/api";

export default function Home() {
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [selectedArticle, setSelectedArticle] = useState<Article | null>(null);
  const [selectedTopicId, setSelectedTopicId] = useState<string | null>(null);
  const [articles, setArticles] = useState<Article[]>(ARTICLES);
  const [leadCover, setLeadCover] = useState<Article>(FEATURED_COVER_ARTICLE);
  const [topics, setTopics] = useState<Topic[]>(TOPICS);
  const [savedArticleIds, setSavedArticleIds] = useState<string[]>(() => {
    if (typeof window !== "undefined") {
      try {
        const saved = localStorage.getItem("monon_saved_articles");
        return saved ? JSON.parse(saved) : [];
      } catch {
        return [];
      }
    }
    return [];
  });

  // Fetch live backend data
  useEffect(() => {
    // 1. Fetch Lead Cover Article
    api.articles
      .getLeadCover()
      .then((res) => {
        if (res.data) setLeadCover(res.data);
      })
      .catch(() => {});

    // 2. Fetch All Published Articles
    api.articles
      .getAll({ limit: 50 })
      .then((res) => {
        if (res.data && res.data.length > 0) {
          setArticles(res.data);
        }
      })
      .catch(() => {});

    // 3. Fetch Topics
    api.topics
      .getAll()
      .then((res) => {
        if (res.data && res.data.length > 0) {
          setTopics(res.data);
        }
      })
      .catch(() => {});
  }, []);

  const handleBookmarkToggle = (articleId: string) => {
    setSavedArticleIds((prev) => {
      let updated: string[];
      if (prev.includes(articleId)) {
        updated = prev.filter((id) => id !== articleId);
      } else {
        updated = [...prev, articleId];
      }
      try {
        localStorage.setItem("monon_saved_articles", JSON.stringify(updated));
      } catch {
        // Ignore storage errors
      }
      return updated;
    });
  };

  return (
    <div className="min-h-screen bg-[#FAF8F5] text-[#181A1B] flex flex-col font-sans">
      {/* Top Reading Progress Bar */}
      <ReadingTools />

      {/* Header & Masthead */}
      <Header
        onOpenSearch={() => setIsSearchOpen(true)}
        savedArticlesCount={savedArticleIds.length}
      />

      {/* Main Editorial Content Sections */}
      <main className="flex-1 w-full">
        {/* 1. Hero Section (Intentional Living Thesis & Editorial Note) */}
        <EditorialHero />

        {/* 2. Featured Centerpiece Cover Story */}
        <FeaturedCoverStory
          article={leadCover}
          onBookmarkToggle={handleBookmarkToggle}
          isBookmarked={savedArticleIds.includes(leadCover.id)}
        />

        {/* 3. Topics & Core Editorial Disciplines */}
        <TopicsSection
          topics={topics}
          selectedTopicId={selectedTopicId}
          onSelectTopic={(topicId) => setSelectedTopicId(topicId)}
        />

        {/* 4. Latest & Curated Articles Editorial Grid */}
        <LatestArticles
          articles={articles}
          topics={topics}
          selectedTopicId={selectedTopicId}
          onSelectTopic={(topicId) => setSelectedTopicId(topicId)}
          savedArticleIds={savedArticleIds}
          onBookmarkToggle={handleBookmarkToggle}
        />

        {/* 5. "কোথা থেকে শুরু করবেন?" (Start Here 4-Step Interactive Guide) */}
        <StartHereGuide />

        {/* 6. Editorial Philosophy & Commitments */}
        <EditorialPhilosophy />

        {/* 7. Weekly Editorial Newsletter */}
        <NewsletterSection />
      </main>

      {/* Footer & Colophon */}
      <Footer />

      {/* Live Search Modal */}
      <SearchModal
        isOpen={isSearchOpen}
        onClose={() => setIsSearchOpen(false)}
        onSelectArticle={(article) => setSelectedArticle(article)}
      />

      {/* In-depth Article Reader Modal */}
      <ArticleModal
        article={selectedArticle}
        onClose={() => setSelectedArticle(null)}
        isBookmarked={
          selectedArticle ? savedArticleIds.includes(selectedArticle.id) : false
        }
        onBookmarkToggle={handleBookmarkToggle}
      />
    </div>
  );
}
