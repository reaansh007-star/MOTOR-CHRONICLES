import React, { useState, useEffect } from 'react';
import { Header } from './components/Header';
import { MetricTicker } from './components/MetricTicker';
import { HomepageH1Header } from './components/HomepageH1Header';
import { HeroLead } from './components/HeroLead';
import { ArticleCard } from './components/ArticleCard';
import { ArticlePage } from './components/ArticlePage';
import { SearchModal } from './components/SearchModal';
import { BookmarksDrawer } from './components/BookmarksDrawer';
import { BrandLandscape } from './components/BrandLandscape';
import { MachineComparison } from './components/MachineComparison';
import { Newsletter } from './components/Newsletter';
import { Footer } from './components/Footer';

import { FaqSection, getFaqSchemaJsonLd } from './components/FaqSection';
import { AttachedEditorialAnchors } from './components/AttachedEditorialAnchors';
import { updatePageMeta } from './utils/seo';

import { ARTICLES } from './data/articles';
import { BRAND_PROFILES } from './data/brands';
import { MACHINE_SHOWDOWNS } from './data/comparisons';
import { Article, ArticleCategory } from './types';
import { parseCurrentRoute, getCategoryUrl, getShowdownUrl, getSavedUrl, getHomepageUrl } from './utils/routing';
import { PageKeywordsBanner } from './components/PageKeywordsBanner';
import { Car, Bookmark, Filter, SlidersHorizontal, RotateCcw } from 'lucide-react';

const PAGE_KEYWORDS_MAP: Record<string, { mainKeyword: string; relatedKeywords: [string, string] }> = {
  ALL: {
    mainKeyword: 'Car News India',
    relatedKeywords: ['Indian SUV Market', 'Electric Vehicles in India'],
  },
  'INDIA AUTO': {
    mainKeyword: 'Indian SUV Market',
    relatedKeywords: ['Tata vs Mahindra SUVs', 'SUV Market in India'],
  },
  'EV REVOLUTION': {
    mainKeyword: 'Electric Vehicles in India',
    relatedKeywords: ['Electric Two-Wheelers in India', 'EV Battery Technology'],
  },
  'TWO WHEELS': {
    mainKeyword: 'Royal Enfield Motorcycles',
    relatedKeywords: ['Royal Enfield Himalayan 450', 'Motorcycle Engineering'],
  },
  PERFORMANCE: {
    mainKeyword: 'Iconic Modern Supercars',
    relatedKeywords: ['Hybrid V12 Powertrains', 'Active Aerodynamics Technology'],
  },
  MOTORSPORT: {
    mainKeyword: 'Formula 1 Aerodynamics',
    relatedKeywords: ['Ground Effect Underbody Tunnels', 'Road Car Technology Transfer'],
  },
  BOOKMARKS: {
    mainKeyword: 'Personal Automotive Reading Shelf',
    relatedKeywords: ['Saved Engineering Features', 'Offline Automotive Journal'],
  },
};

export default function App() {
  // Routing State
  const [route, setRoute] = useState(() => parseCurrentRoute());
  const [currentCategory, setCurrentCategory] = useState<ArticleCategory | 'ALL' | 'BOOKMARKS'>('ALL');
  const [searchQuery, setSearchQuery] = useState('');
  
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

  // Listen to browser navigation / history events
  useEffect(() => {
    const handlePopState = () => {
      const parsed = parseCurrentRoute();
      setRoute(parsed);
      if (parsed.type === 'category' && parsed.category) {
        setCurrentCategory(parsed.category);
      } else if (parsed.type === 'saved') {
        setCurrentCategory('BOOKMARKS');
      } else if (parsed.type === 'showdown') {
        setIsComparisonOpen(true);
      } else if (parsed.type === 'home') {
        setCurrentCategory('ALL');
      }
    };

    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  // Sync route on initial load
  useEffect(() => {
    if (route.type === 'category' && route.category) {
      setCurrentCategory(route.category);
    } else if (route.type === 'saved') {
      setCurrentCategory('BOOKMARKS');
    } else if (route.type === 'showdown') {
      setIsComparisonOpen(true);
    }
  }, [route]);

  // Canonical Redirect for legacy URLs (e.g. /article/tata-mahindra-suv-story -> /indian-suv-market)
  useEffect(() => {
    if (route.isCanonicalRedirect && route.article) {
      window.history.replaceState({}, '', `/${route.article.slug}`);
    }
  }, [route]);

  // Synchronize SEO Title, Meta Description, Canonical URL, and Schema.org Structured Data
  useEffect(() => {
    if (route.type === 'article') return; // Handled directly inside ArticlePage

    if (currentCategory === 'ALL') {
      updatePageMeta({
        title: 'Car News India: Automotive Stories | Motor Chronicles',
        description:
          'Car News India brings you in-depth stories on the Indian SUV market, electric vehicles in India, motorcycle engineering, supercars, and global motorsport.',
        canonicalPath: '/car-news-india',
        ogType: 'website',
        jsonLd: {
          '@context': 'https://schema.org',
          '@graph': [
            {
              '@type': 'WebSite',
              name: 'Motor Chronicles',
              url: typeof window !== 'undefined' ? window.location.origin : 'https://motorchronicles.com',
              description:
                'Car News India brings you in-depth stories on the Indian SUV market, electric vehicles in India, motorcycle engineering, supercars, and global motorsport.',
              potentialAction: {
                '@type': 'SearchAction',
                target: `${typeof window !== 'undefined' ? window.location.origin : ''}/?search={search_term_string}`,
                'query-input': 'required name=search_term_string',
              },
            },
            getFaqSchemaJsonLd(),
          ],
        },
      });
    } else {
      const pageInfo = PAGE_KEYWORDS_MAP[currentCategory] || PAGE_KEYWORDS_MAP.ALL;
      updatePageMeta({
        title: `${pageInfo.mainKeyword}: Stories & Analysis | Motor Chronicles`,
        description: `Explore ${pageInfo.mainKeyword} alongside ${pageInfo.relatedKeywords[0]} and ${pageInfo.relatedKeywords[1]} with in-depth technical analysis on Motor Chronicles.`,
        canonicalPath:
          currentCategory === 'BOOKMARKS' ? getSavedUrl() : getCategoryUrl(currentCategory as ArticleCategory),
        ogType: 'website',
      });
    }
  }, [currentCategory, route.type]);

  // Update URL without full page reload when switching views in same tab
  const navigateCategory = (cat: ArticleCategory | 'ALL' | 'BOOKMARKS') => {
    setCurrentCategory(cat);
    setSearchQuery('');
    if (cat === 'ALL') {
      window.history.pushState({}, '', '/car-news-india');
    } else if (cat === 'BOOKMARKS') {
      window.history.pushState({}, '', getSavedUrl());
    } else {
      window.history.pushState({}, '', getCategoryUrl(cat));
    }
  };

  const navigateShowdown = () => {
    setIsComparisonOpen(true);
    window.history.pushState({}, '', getShowdownUrl());
  };

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
    window.history.pushState({}, '', `/?search=${encodeURIComponent(brandTerm)}`);
    const el = document.getElementById('articlesSection');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  // If the current route is a standalone article page (e.g. /article/:slug)
  if (route.type === 'article' && route.article) {
    const article = route.article;
    const related = ARTICLES.filter((a) => a.id !== article.id && a.category === article.category).slice(0, 3);
    return (
      <ArticlePage
        article={article}
        relatedArticles={related}
        isBookmarked={bookmarkedIds.includes(article.id)}
        onToggleBookmark={handleToggleBookmark}
        isDarkMode={isDarkMode}
        onToggleTheme={() => setIsDarkMode(!isDarkMode)}
      />
    );
  }

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
          onSelectCategory={navigateCategory}
          onOpenSearch={() => setIsSearchOpen(true)}
          onOpenBookmarks={() => setIsBookmarksOpen(true)}
          onOpenComparison={navigateShowdown}
          bookmarkedCount={bookmarkedIds.length}
          isDarkMode={isDarkMode}
          onToggleTheme={() => setIsDarkMode(!isDarkMode)}
        />

        {/* Interactive Homepage Main Title — H1 */}
        {currentCategory === 'ALL' && searchQuery === '' && (
          <HomepageH1Header
            onExploreClick={() => {
              const el = document.getElementById('heroStorySection') || document.getElementById('articlesSection');
              if (el) el.scrollIntoView({ behavior: 'smooth' });
            }}
          />
        )}

        {/* Cinematic Lead Story (Shown on Home Feed) */}
        {currentCategory === 'ALL' && searchQuery === '' && (
          <HeroLead
            article={heroStory}
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
                      onClick={() => navigateCategory(cat.value)}
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
                  onClick={() => navigateCategory('BOOKMARKS')}
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

          {/* Page SEO & Focus Keywords Banner */}
          {(() => {
            const currentKeywords = PAGE_KEYWORDS_MAP[currentCategory] || PAGE_KEYWORDS_MAP.ALL;
            return (
              <PageKeywordsBanner
                pageTitle={currentCategory}
                mainKeyword={currentKeywords.mainKeyword}
                relatedKeywords={currentKeywords.relatedKeywords}
                variant="page"
              />
            );
          })()}

          {/* Active Search Query Notice */}
          {searchQuery && (
            <div className="mb-8 p-3 bg-[#F1E6D2] dark:bg-[#242424] border border-[#D9D3C9] dark:border-[#343434] flex justify-between items-center text-xs font-['Barlow_Condensed'] uppercase tracking-wider">
              <span>
                FILTERING BY QUERY: <strong className="text-[#B51F2B]">"{searchQuery}"</strong> ({filteredArticles.length} RESULTS)
              </span>
              <button
                onClick={() => {
                  setSearchQuery('');
                  window.history.pushState({}, '', '/');
                }}
                className="text-[#B51F2B] font-bold hover:underline flex items-center space-x-1 cursor-pointer"
              >
                <RotateCcw className="w-3 h-3" />
                <span>CLEAR FILTER</span>
              </button>
            </div>
          )}

          {/* Articles Grid — each opens in new tab */}
          {filteredArticles.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredArticles.map((article) => (
                <ArticleCard
                  key={article.id}
                  article={article}
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
                  navigateCategory('ALL');
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
              onClick={navigateShowdown}
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

          {/* Dedicated Homepage SEO FAQ Section */}
          {currentCategory === 'ALL' && searchQuery === '' && <FaqSection />}

          {/* Weekly Dispatch Newsletter Section */}
          <Newsletter />

        </main>
      </div>

      {/* Magazine Footer */}
      <Footer
        onSelectCategory={(cat) => {
          navigateCategory(cat);
          const el = document.getElementById('articlesSection');
          if (el) el.scrollIntoView({ behavior: 'smooth' });
        }}
        onOpenComparison={navigateShowdown}
      />

      {/* Global Search Modal */}
      <SearchModal
        isOpen={isSearchOpen}
        onClose={() => setIsSearchOpen(false)}
        articles={ARTICLES}
      />

      {/* Bookmarks Saved Shelf Drawer */}
      <BookmarksDrawer
        isOpen={isBookmarksOpen}
        onClose={() => setIsBookmarksOpen(false)}
        bookmarkedArticles={ARTICLES.filter((a) => bookmarkedIds.includes(a.id))}
        onRemoveBookmark={handleToggleBookmark}
        onClearAll={handleClearBookmarks}
      />

      {/* Interactive Machine Comparison Modal */}
      <MachineComparison
        isOpen={isComparisonOpen}
        onClose={() => {
          setIsComparisonOpen(false);
          window.history.pushState({}, '', '/');
        }}
        showdowns={MACHINE_SHOWDOWNS}
      />

    </div>
  );
}
