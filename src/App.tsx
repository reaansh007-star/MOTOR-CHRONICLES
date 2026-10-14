import React, { useState, useEffect } from 'react';
import { Header } from './components/Header';
import { MetricTicker } from './components/MetricTicker';
import { HeroLead } from './components/HeroLead';
import { ArticleCard } from './components/ArticleCard';
import { ArticleModal } from './components/ArticleModal';
import { SearchModal } from './components/SearchModal';
import { BookmarksDrawer } from './components/BookmarksDrawer';
import { BrandLandscape } from './components/BrandLandscape';
import { MachineComparison } from './components/MachineComparison';
import { Newsletter } from './components/Newsletter';
import { Footer } from './components/Footer';

import { ARTICLES } from './data/articles';
import { BRAND_PROFILES } from './data/brands';
import { MACHINE_SHOWDOWNS } from './data/comparisons';
import { Article, ArticleCategory } from './types';
import { Car, Bookmark, Sparkles, Filter, SlidersHorizontal, RotateCcw } from 'lucide-react';

export default function App() {
  const [currentCategory, setCurrentCategory] = useState<ArticleCategory | 'ALL' | 'BOOKMARKS'>('ALL');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedArticle, setSelectedArticle] = useState<Article | null>(null);
  
  // Modals state
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isBookmarksOpen, setIsBookmarksOpen] = useState(false);
  const [isComparisonOpen, setIsComparisonOpen] = useState(false);
  
  // Sorting state
  const [sortBy, setSortBy] = useState<'latest' | 'quick' | 'deep'>('latest');

  // Bookmarks state (persisted)
  const [bookmarkedIds, setBookmarkedIds] = useState<string[]>(() => {
    try {
      const saved = localStorage.getItem('motor_bookmarks');
      return saved ? JSON.parse(saved) : ['tata-mahindra-suv-story', 'royal-enfield-heritage'];
    } catch {
      return ['tata-mahindra-suv-story', 'royal-enfield-heritage'];
    }
  });

  // Dark Mode state (persisted)
  const [isDarkMode, setIsDarkMode] = useState<boolean>(() => {
    try {
      return localStorage.getItem('motor_theme') === 'dark';
    } catch {
      return false;
    }
  });

  // Apply dark mode class to html element
  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('motor_theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('motor_theme', 'light');
    }
  }, [isDarkMode]);

  // Persist bookmarks
  useEffect(() => {
    try {
      localStorage.setItem('motor_bookmarks', JSON.stringify(bookmarkedIds));
    } catch {
      // ignore
    }
  }, [bookmarkedIds]);

  // Toggle Bookmark Handler
  const handleToggleBookmark = (articleId: string) => {
    setBookmarkedIds((prev) =>
      prev.includes(articleId) ? prev.filter((id) => id !== articleId) : [...prev, articleId]
    );
  };

  // Clear all bookmarks
  const handleClearBookmarks = () => {
    setBookmarkedIds([]);
  };

  // Filter by brand name from BrandLandscape dossier
  const handleFilterByBrand = (brandTerm: string) => {
    setSearchQuery(brandTerm);
    setCurrentCategory('ALL');
    const el = document.getElementById('articlesSection');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  // Filtered & Sorted Articles
  const filteredArticles = ARTICLES.filter((art) => {
    // Category or Bookmarks filter
    if (currentCategory === 'BOOKMARKS') {
      if (!bookmarkedIds.includes(art.id)) return false;
    } else if (currentCategory !== 'ALL' && art.category !== currentCategory) {
      return false;
    }

    // Search query filter
    if (searchQuery.trim() !== '') {
      const q = searchQuery.toLowerCase();
      const match =
        art.title.toLowerCase().includes(q) ||
        art.excerpt.toLowerCase().includes(q) ||
        art.author.toLowerCase().includes(q) ||
        art.keywords.some((k) => k.toLowerCase().includes(q));
      if (!match) return false;
    }

    return true;
  }).sort((a, b) => {
    if (sortBy === 'quick') {
      return a.readMinutes - b.readMinutes;
    }
    if (sortBy === 'deep') {
      return b.readMinutes - a.readMinutes;
    }
    return 0; // Default order in ARTICLES (latest editorial order)
  });

  // Lead Feature Story
  const heroStory = ARTICLES[0];

  // Related articles for the modal reader
  const relatedArticles = selectedArticle
    ? ARTICLES.filter((a) => a.id !== selectedArticle.id && a.category === selectedArticle.category).slice(0, 3)
    : [];

  const categoriesList: { label: string; value: ArticleCategory | 'ALL' | 'BOOKMARKS' }[] = [
    { label: 'ALL STORIES', value: 'ALL' },
    { label: 'INDIA AUTO', value: 'INDIA AUTO' },
    { label: 'EV REVOLUTION', value: 'EV REVOLUTION' },
    { label: 'MOTORCYCLES', value: 'TWO WHEELS' },
    { label: 'SUPERCARS', value: 'PERFORMANCE' },
    { label: 'MOTORSPORT', value: 'MOTORSPORT' },
  ];

  return (
    <div className="bg-[#FAF8F3] dark:bg-[#171717] text-[#171717] dark:text-[#FAF8F3] min-h-screen transition-colors duration-300 font-['DM_Sans'] flex flex-col justify-between">
      
      <div>
        {/* Navigation & Announcement Header */}
        <Header
          currentCategory={currentCategory}
          onSelectCategory={(cat) => {
            setCurrentCategory(cat);
            setSearchQuery('');
          }}
          onOpenSearch={() => setIsSearchOpen(true)}
          onOpenBookmarks={() => setIsBookmarksOpen(true)}
          onOpenComparison={() => setIsComparisonOpen(true)}
          bookmarkedCount={bookmarkedIds.length}
          isDarkMode={isDarkMode}
          onToggleTheme={() => setIsDarkMode(!isDarkMode)}
        />

        {/* Cinematic Lead Story (Shown on Home Feed) */}
        {currentCategory === 'ALL' && searchQuery === '' && (
          <HeroLead
            article={heroStory}
            onOpenArticle={(art) => setSelectedArticle(art)}
            isBookmarked={bookmarkedIds.includes(heroStory.id)}
            onToggleBookmark={handleToggleBookmark}
          />
        )}

        {/* Key Industry Metric Telemetry Bar */}
        <MetricTicker />

        {/* Main Content Area */}
        <main id="articlesSection" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          
          {/* Section Filter & Search Header */}
          <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center border-b border-[#D9D3C9] dark:border-[#343434] pb-6 mb-10 gap-6">
            <div>
              <div className="flex items-center space-x-2 text-xs font-['Barlow_Condensed'] tracking-widest text-[#B51F2B] uppercase font-bold">
                <Filter className="w-3.5 h-3.5" />
                <span>EDITORIAL CURATION • {filteredArticles.length} STORIES AVAILABLE</span>
              </div>
              <h2 className="font-['Bebas_Neue'] text-3xl sm:text-4xl uppercase text-[#171717] dark:text-[#FAF8F3] mt-1">
                {currentCategory === 'ALL'
                  ? 'LATEST EDITORIAL STORIES'
                  : currentCategory === 'BOOKMARKS'
                  ? 'YOUR SAVED READING SHELF'
                  : `${currentCategory} ARCHIVE`}
              </h2>
            </div>

            {/* Controls: Category Pills & Sort Selector */}
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 w-full lg:w-auto">
              
              {/* Category Pills */}
              <div className="flex flex-wrap gap-1.5 text-xs font-['Barlow_Condensed'] tracking-wider uppercase">
                {categoriesList.map((cat) => {
                  const isActive = currentCategory === cat.value;
                  return (
                    <button
                      key={cat.value}
                      onClick={() => {
                        setCurrentCategory(cat.value);
                        setSearchQuery('');
                      }}
                      className={`px-3 py-1.5 transition-all duration-200 cursor-pointer font-bold ${
                        isActive
                          ? 'bg-[#B51F2B] text-white shadow-md'
                          : 'bg-[#F1E6D2]/60 dark:bg-[#242424] border border-[#D9D3C9] dark:border-[#343434] text-[#171717] dark:text-[#FAF8F3] hover:border-[#B51F2B]'
                      }`}
                    >
                      {cat.label}
                    </button>
                  );
                })}

                {/* Saved Shelf Pill */}
                <button
                  onClick={() => setCurrentCategory('BOOKMARKS')}
                  className={`px-3 py-1.5 transition-all duration-200 cursor-pointer font-bold flex items-center space-x-1 ${
                    currentCategory === 'BOOKMARKS'
                      ? 'bg-[#B51F2B] text-white shadow-md'
                      : 'bg-[#F1E6D2]/60 dark:bg-[#242424] border border-[#D9D3C9] dark:border-[#343434] text-[#171717] dark:text-[#FAF8F3] hover:border-[#B51F2B]'
                  }`}
                >
                  <Bookmark className="w-3 h-3" />
                  <span>SAVED ({bookmarkedIds.length})</span>
                </button>
              </div>

              {/* Sort Dropdown */}
              <div className="flex items-center space-x-2 text-xs font-['Barlow_Condensed'] uppercase tracking-wider shrink-0">
                <span className="text-[#77736D] dark:text-[#D9D3C9]/60">SORT:</span>
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value as 'latest' | 'quick' | 'deep')}
                  className="bg-white dark:bg-[#242424] border border-[#D9D3C9] dark:border-[#343434] px-3 py-1.5 font-bold focus:outline-none focus:ring-1 focus:ring-[#B51F2B] text-[#171717] dark:text-[#FAF8F3]"
                >
                  <option value="latest">Latest Edition</option>
                  <option value="quick">Quickest Read (Min)</option>
                  <option value="deep">Deepest Analysis (Min)</option>
                </select>
              </div>

            </div>
          </div>

          {/* Active Search Query Notice */}
          {searchQuery && (
            <div className="mb-8 p-3 bg-[#F1E6D2] dark:bg-[#242424] border border-[#D9D3C9] dark:border-[#343434] flex justify-between items-center text-xs font-['Barlow_Condensed'] uppercase tracking-wider">
              <span>
                FILTERING BY QUERY: <strong className="text-[#B51F2B]">"{searchQuery}"</strong> ({filteredArticles.length} RESULTS)
              </span>
              <button
                onClick={() => setSearchQuery('')}
                className="text-[#B51F2B] font-bold hover:underline flex items-center space-x-1 cursor-pointer"
              >
                <RotateCcw className="w-3 h-3" />
                <span>CLEAR FILTER</span>
              </button>
            </div>
          )}

          {/* Articles Grid */}
          {filteredArticles.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredArticles.map((article) => (
                <ArticleCard
                  key={article.id}
                  article={article}
                  onOpenArticle={(art) => setSelectedArticle(art)}
                  isBookmarked={bookmarkedIds.includes(article.id)}
                  onToggleBookmark={handleToggleBookmark}
                />
              ))}
            </div>
          ) : (
            /* Empty State */
            <div className="text-center py-20 space-y-4 border border-dashed border-[#D9D3C9] dark:border-[#343434] p-8">
              <Car className="w-16 h-16 mx-auto text-[#77736D]" />
              <h3 className="font-['Bebas_Neue'] text-3xl uppercase">No Matching Automotive Stories Found</h3>
              <p className="font-['Cormorant_Garamond'] text-lg text-[#77736D] dark:text-[#D9D3C9]/70 italic">
                {currentCategory === 'BOOKMARKS'
                  ? 'You have not saved any stories to your personal shelf yet. Tap the bookmark icon on any article.'
                  : 'Try adjusting your search criteria or resetting the category filter.'}
              </p>
              <button
                onClick={() => {
                  setCurrentCategory('ALL');
                  setSearchQuery('');
                }}
                className="bg-[#B51F2B] hover:bg-[#4A101A] text-white font-['Barlow_Condensed'] uppercase px-6 py-2.5 text-sm font-bold tracking-widest transition-colors cursor-pointer"
              >
                RESET TO ALL STORIES
              </button>
            </div>
          )}

          {/* Machine Comparison Promo Banner */}
          <section className="mt-16 bg-gradient-to-r from-[#171717] via-[#242424] to-[#171717] text-white p-8 sm:p-10 border border-[#343434] flex flex-col md:flex-row justify-between items-center gap-6">
            <div className="space-y-2">
              <div className="flex items-center space-x-2 text-xs font-['Barlow_Condensed'] tracking-widest text-[#B51F2B] uppercase font-bold">
                <SlidersHorizontal className="w-4 h-4" />
                <span>INTERACTIVE LAB</span>
              </div>
              <h3 className="font-['Bebas_Neue'] text-3xl sm:text-4xl uppercase">
                HEAD-TO-HEAD MACHINE SPEC SHOWDOWN
              </h3>
              <p className="font-['Cormorant_Garamond'] text-sm sm:text-base italic text-[#D9D3C9]/80 max-w-xl">
                Compare side-by-side power (bhp), torque (Nm), 0-100 km/h sprint times, and real-world ranges between the Tata Nexon.ev vs Mahindra XUV400, Himalayan 450 vs KTM 390 Adventure, and 911 GT3 RS vs Ferrari 296 GTB.
              </p>
            </div>
            <button
              onClick={() => setIsComparisonOpen(true)}
              className="bg-[#B51F2B] hover:bg-[#4A101A] text-white px-8 py-3.5 font-['Barlow_Condensed'] uppercase tracking-widest text-sm font-bold transition-all transform hover:-translate-y-0.5 cursor-pointer whitespace-nowrap shadow-xl"
            >
              LAUNCH COMPARISON TOOL
            </button>
          </section>

          {/* Indian Automotive Brand Landscape */}
          <BrandLandscape
            brands={BRAND_PROFILES}
            onFilterByBrand={handleFilterByBrand}
          />

          {/* Weekly Dispatch Newsletter Section */}
          <Newsletter />

        </main>
      </div>

      {/* Magazine Footer */}
      <Footer
        onSelectCategory={(cat) => {
          setCurrentCategory(cat);
          setSearchQuery('');
          const el = document.getElementById('articlesSection');
          if (el) el.scrollIntoView({ behavior: 'smooth' });
        }}
        onOpenComparison={() => setIsComparisonOpen(true)}
      />

      {/* Reader Modal (Full Screen Story Experience) */}
      {selectedArticle && (
        <ArticleModal
          article={selectedArticle}
          onClose={() => setSelectedArticle(null)}
          onOpenArticle={(art) => setSelectedArticle(art)}
          isBookmarked={bookmarkedIds.includes(selectedArticle.id)}
          onToggleBookmark={handleToggleBookmark}
          relatedArticles={relatedArticles}
        />
      )}

      {/* Global Search Modal */}
      <SearchModal
        isOpen={isSearchOpen}
        onClose={() => setIsSearchOpen(false)}
        articles={ARTICLES}
        onSelectArticle={(art) => setSelectedArticle(art)}
      />

      {/* Bookmarks Saved Shelf Drawer */}
      <BookmarksDrawer
        isOpen={isBookmarksOpen}
        onClose={() => setIsBookmarksOpen(false)}
        bookmarkedArticles={ARTICLES.filter((a) => bookmarkedIds.includes(a.id))}
        onOpenArticle={(art) => setSelectedArticle(art)}
        onRemoveBookmark={handleToggleBookmark}
        onClearAll={handleClearBookmarks}
      />

      {/* Interactive Machine Comparison Modal */}
      <MachineComparison
        isOpen={isComparisonOpen}
        onClose={() => setIsComparisonOpen(false)}
        showdowns={MACHINE_SHOWDOWNS}
      />

    </div>
  );
}
