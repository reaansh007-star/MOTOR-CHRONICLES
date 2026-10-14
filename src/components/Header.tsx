import React from 'react';
import {
  Search,
  Moon,
  Sun,
  Menu,
  X,
  Bookmark,
  SlidersHorizontal,
  Flame,
  Radio
} from 'lucide-react';
import { ArticleCategory } from '../types';

interface HeaderProps {
  currentCategory: ArticleCategory | 'ALL' | 'BOOKMARKS';
  onSelectCategory: (cat: ArticleCategory | 'ALL' | 'BOOKMARKS') => void;
  onOpenSearch: () => void;
  onOpenBookmarks: () => void;
  onOpenComparison: () => void;
  bookmarkedCount: number;
  isDarkMode: boolean;
  onToggleTheme: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  currentCategory,
  onSelectCategory,
  onOpenSearch,
  onOpenBookmarks,
  onOpenComparison,
  bookmarkedCount,
  isDarkMode,
  onToggleTheme,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = React.useState(false);

  const categories: { label: string; value: ArticleCategory | 'ALL' }[] = [
    { label: 'All Stories', value: 'ALL' },
    { label: 'India Auto', value: 'INDIA AUTO' },
    { label: 'EV Revolution', value: 'EV REVOLUTION' },
    { label: 'Motorcycles', value: 'TWO WHEELS' },
    { label: 'Supercars', value: 'PERFORMANCE' },
    { label: 'Motorsport & F1', value: 'MOTORSPORT' },
  ];

  return (
    <>
      {/* Top Announcement / World Ticker */}
      <div className="bg-[#171717] text-[#F1E6D2] text-xs font-['Barlow_Condensed'] tracking-widest uppercase py-2 px-4 border-b border-[#343434] overflow-hidden">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row justify-between items-center gap-2">
          <div className="flex items-center space-x-3">
            <span className="inline-block w-2 h-2 rounded-full bg-[#B51F2B] animate-pulse"></span>
            <span className="font-semibold text-[#FAF8F3]">
              ISSUE NO. 42 — SPECIAL REPORT: THE INDIAN AUTOMOTIVE REVOLUTION &amp; GLOBAL MOBILITY
            </span>
          </div>
          <div className="hidden md:flex items-center space-x-6 text-[#D9D3C9]/70 text-[11px]">
            <span className="hover:text-white transition-colors">NEW DELHI • 28°C</span>
            <span className="hover:text-white transition-colors">MUMBAI</span>
            <span className="hover:text-white transition-colors">STUTTGART</span>
            <span className="hover:text-white transition-colors">MARANELLO</span>
            <span className="hover:text-white transition-colors">SILVERSTONE</span>
          </div>
        </div>
      </div>

      {/* Main Navigation Bar */}
      <header className="sticky top-0 z-40 bg-[#FAF8F3]/95 dark:bg-[#171717]/95 backdrop-blur-md border-b border-[#D9D3C9] dark:border-[#343434] transition-colors duration-300">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-20">
            
            {/* Brand Logo */}
            <button
              onClick={() => {
                onSelectCategory('ALL');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className="group flex items-baseline space-x-2 text-left cursor-pointer focus:outline-none"
            >
              <span className="font-['Bebas_Neue'] text-3xl sm:text-4xl text-[#171717] dark:text-[#FAF8F3] tracking-tight group-hover:text-[#B51F2B] transition-colors">
                MOTOR<span className="text-[#B51F2B]">.</span>CHRONICLES
              </span>
              <span className="hidden sm:inline-block font-['Barlow_Condensed'] text-xs tracking-widest text-[#77736D] dark:text-[#D9D3C9]/60 border-l border-[#D9D3C9] dark:border-[#343434] pl-2 uppercase font-medium">
                Stories Behind The Machines
              </span>
            </button>

            {/* Desktop Navigation Links */}
            <nav className="hidden lg:flex items-center space-x-6 text-sm font-['Barlow_Condensed'] tracking-wider uppercase font-semibold">
              {categories.map((cat) => {
                const isActive = currentCategory === cat.value;
                return (
                  <button
                    key={cat.value}
                    onClick={() => onSelectCategory(cat.value)}
                    className={`transition-colors py-1 relative cursor-pointer ${
                      isActive
                        ? 'text-[#B51F2B] font-bold'
                        : 'text-[#171717] dark:text-[#FAF8F3] hover:text-[#B51F2B] dark:hover:text-[#B51F2B]'
                    }`}
                  >
                    {cat.label}
                    {isActive && (
                      <span className="absolute bottom-0 left-0 w-full h-[2px] bg-[#B51F2B]"></span>
                    )}
                  </button>
                );
              })}

              {/* Machine Showdown Comparator quick-trigger */}
              <button
                onClick={onOpenComparison}
                className="flex items-center space-x-1 px-3 py-1 bg-[#171717] text-[#FAF8F3] dark:bg-[#FAF8F3] dark:text-[#171717] hover:bg-[#B51F2B] dark:hover:bg-[#B51F2B] dark:hover:text-white transition-colors rounded-none text-xs font-['Barlow_Condensed'] tracking-wider uppercase font-bold"
                title="Compare Car & Bike Specs"
              >
                <SlidersHorizontal className="w-3.5 h-3.5 text-[#B51F2B] dark:text-[#B51F2B] group-hover:text-white" />
                <span>Showdown</span>
              </button>
            </nav>

            {/* Action Controls */}
            <div className="flex items-center space-x-2 sm:space-x-4">
              
              {/* Search Trigger */}
              <button
                onClick={onOpenSearch}
                className="p-2 text-[#171717] dark:text-[#FAF8F3] hover:text-[#B51F2B] transition-colors rounded hover:bg-black/5 dark:hover:bg-white/5 cursor-pointer"
                title="Search Stories (or press Ctrl+K)"
              >
                <Search className="w-5 h-5" />
              </button>

              {/* Bookmarks Shelf Trigger */}
              <button
                onClick={onOpenBookmarks}
                className="relative p-2 text-[#171717] dark:text-[#FAF8F3] hover:text-[#B51F2B] transition-colors rounded hover:bg-black/5 dark:hover:bg-white/5 cursor-pointer"
                title="Saved Articles Shelf"
              >
                <Bookmark className="w-5 h-5" />
                {bookmarkedCount > 0 && (
                  <span className="absolute top-1 right-1 w-4 h-4 bg-[#B51F2B] text-white text-[10px] font-['Barlow_Condensed'] font-bold flex items-center justify-center rounded-full animate-bounce">
                    {bookmarkedCount}
                  </span>
                )}
              </button>

              {/* Theme Tone Toggle */}
              <button
                onClick={onToggleTheme}
                className="p-2 text-[#171717] dark:text-[#FAF8F3] hover:text-[#B51F2B] transition-colors rounded hover:bg-black/5 dark:hover:bg-white/5 cursor-pointer"
                title={isDarkMode ? 'Switch to Ivory Editorial Mode' : 'Switch to Dark Asphalt Mode'}
              >
                {isDarkMode ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
              </button>

              {/* Mobile Drawer Trigger */}
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="lg:hidden p-2 text-[#171717] dark:text-[#FAF8F3] hover:text-[#B51F2B] cursor-pointer"
                title="Toggle Menu"
              >
                {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>

          </div>
        </div>

        {/* Mobile Navigation Drawer */}
        {mobileMenuOpen && (
          <div className="lg:hidden bg-[#F1E6D2] dark:bg-[#1f1f1f] border-b border-[#D9D3C9] dark:border-[#343434] px-4 pt-3 pb-6 space-y-3 font-['Barlow_Condensed'] tracking-wider uppercase">
            {categories.map((cat) => {
              const isActive = currentCategory === cat.value;
              return (
                <button
                  key={cat.value}
                  onClick={() => {
                    onSelectCategory(cat.value);
                    setMobileMenuOpen(false);
                  }}
                  className={`block w-full text-left py-2 text-lg border-b border-[#D9D3C9]/50 dark:border-[#343434] ${
                    isActive
                      ? 'text-[#B51F2B] font-bold'
                      : 'text-[#171717] dark:text-[#FAF8F3] hover:text-[#B51F2B]'
                  }`}
                >
                  {cat.label}
                </button>
              );
            })}

            <div className="pt-2 flex flex-col gap-2">
              <button
                onClick={() => {
                  onOpenComparison();
                  setMobileMenuOpen(false);
                }}
                className="w-full py-2.5 bg-[#B51F2B] text-white text-center font-bold text-sm tracking-widest uppercase flex items-center justify-center space-x-2"
              >
                <SlidersHorizontal className="w-4 h-4" />
                <span>Launch Machine Showdown Tool</span>
              </button>
              <button
                onClick={() => {
                  onOpenBookmarks();
                  setMobileMenuOpen(false);
                }}
                className="w-full py-2 border border-[#B51F2B] text-[#B51F2B] dark:text-[#FAF8F3] text-center font-bold text-sm tracking-widest uppercase flex items-center justify-center space-x-2"
              >
                <Bookmark className="w-4 h-4" />
                <span>Saved Bookmarks ({bookmarkedCount})</span>
              </button>
            </div>
          </div>
        )}
      </header>
    </>
  );
};
