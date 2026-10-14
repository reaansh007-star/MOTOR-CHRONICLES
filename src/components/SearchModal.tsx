import React, { useState, useEffect } from 'react';
import { Search, X, ArrowRight, Clock } from 'lucide-react';
import { Article } from '../types';

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
  articles: Article[];
  onSelectArticle: (article: Article) => void;
}

export const SearchModal: React.FC<SearchModalProps> = ({
  isOpen,
  onClose,
  articles,
  onSelectArticle,
}) => {
  const [query, setQuery] = useState('');

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
      if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
        e.preventDefault();
        // toggle
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);

  if (!isOpen) return null;

  const filtered = query.trim() === ''
    ? []
    : articles.filter((art) => {
        const q = query.toLowerCase();
        return (
          art.title.toLowerCase().includes(q) ||
          art.excerpt.toLowerCase().includes(q) ||
          art.author.toLowerCase().includes(q) ||
          art.category.toLowerCase().includes(q) ||
          art.keywords.some((k) => k.toLowerCase().includes(q))
        );
      });

  return (
    <div className="fixed inset-0 z-50 bg-[#171717]/90 backdrop-blur-md flex items-start justify-center pt-16 sm:pt-24 px-4 overflow-y-auto">
      <div className="bg-[#FAF8F3] dark:bg-[#1a1a1a] border border-[#D9D3C9] dark:border-[#343434] w-full max-w-2xl p-6 shadow-2xl space-y-4 text-[#171717] dark:text-[#FAF8F3]">
        
        {/* Search Header */}
        <div className="flex justify-between items-center border-b border-[#D9D3C9] dark:border-[#343434] pb-3">
          <div className="flex items-center space-x-2">
            <Search className="w-5 h-5 text-[#B51F2B]" />
            <span className="font-['Bebas_Neue'] text-2xl uppercase tracking-wide">
              SEARCH MOTOR CHRONICLES
            </span>
          </div>
          <button
            onClick={onClose}
            className="text-[#77736D] hover:text-[#B51F2B] transition-colors cursor-pointer"
            title="Close Search"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Search Input Field */}
        <div className="relative">
          <input
            type="text"
            autoFocus
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Type keywords e.g. Tata, Mahindra, Thar, F1, EV, Royal Enfield, Supercar..."
            className="w-full bg-white dark:bg-[#242424] border border-[#D9D3C9] dark:border-[#343434] p-4 text-base font-['DM_Sans'] text-[#171717] dark:text-white focus:outline-none focus:ring-2 focus:ring-[#B51F2B] pr-10"
          />
          {query && (
            <button
              onClick={() => setQuery('')}
              className="absolute right-3.5 top-4 text-[#77736D] hover:text-[#B51F2B]"
            >
              <X className="w-4 h-4" />
            </button>
          )}
        </div>

        {/* Quick Filter Tag Suggestions */}
        <div className="flex flex-wrap items-center gap-1.5 text-xs font-['Barlow_Condensed'] uppercase tracking-wider text-[#77736D] dark:text-[#D9D3C9]/70">
          <span>POPULAR:</span>
          {['Mahindra', 'Tata EV', 'Royal Enfield', 'F1 Downforce', 'Supercars', 'Himalayan'].map((tag) => (
            <button
              key={tag}
              onClick={() => setQuery(tag)}
              className="px-2 py-0.5 bg-black/5 dark:bg-white/5 border border-[#D9D3C9] dark:border-[#343434] hover:border-[#B51F2B] hover:text-[#B51F2B] cursor-pointer"
            >
              {tag}
            </button>
          ))}
        </div>

        {/* Results Container */}
        <div className="max-h-80 overflow-y-auto space-y-2 pt-2">
          {query.trim() === '' ? (
            <p className="text-xs font-['Barlow_Condensed'] text-[#77736D] dark:text-[#D9D3C9]/60 uppercase py-4 text-center">
              Enter keywords to search across titles, technical specs, and editorial excerpts...
            </p>
          ) : filtered.length === 0 ? (
            <div className="text-center py-8 space-y-2">
              <p className="font-['Bebas_Neue'] text-xl text-[#B51F2B] uppercase">No matching stories found</p>
              <p className="text-xs font-['DM_Sans'] text-[#77736D] dark:text-[#D9D3C9]/60">
                Try searching for broader terms like "SUV", "EV", "Motorcycle", or "Tata".
              </p>
            </div>
          ) : (
            filtered.map((art) => (
              <div
                key={art.id}
                onClick={() => {
                  onSelectArticle(art);
                  onClose();
                }}
                className="p-3 bg-white dark:bg-[#242424] border border-[#D9D3C9] dark:border-[#343434] hover:border-[#B51F2B] cursor-pointer transition-colors flex justify-between items-center group"
              >
                <div className="space-y-1 pr-4">
                  <div className="flex items-center space-x-2 text-[10px] font-['Barlow_Condensed'] tracking-widest uppercase">
                    <span className="text-[#B51F2B] font-bold">{art.category}</span>
                    <span>•</span>
                    <span className="text-[#77736D] dark:text-[#D9D3C9]/60 flex items-center">
                      <Clock className="w-2.5 h-2.5 mr-1" />
                      {art.readTime}
                    </span>
                  </div>
                  <h4 className="font-['Bebas_Neue'] text-xl text-[#171717] dark:text-white uppercase leading-snug group-hover:text-[#B51F2B] transition-colors">
                    {art.title}
                  </h4>
                  <p className="text-xs font-['DM_Sans'] text-[#77736D] dark:text-[#D9D3C9]/70 line-clamp-1">
                    {art.excerpt}
                  </p>
                </div>
                <ArrowRight className="w-4 h-4 text-[#77736D] group-hover:text-[#B51F2B] transition-colors shrink-0" />
              </div>
            ))
          )}
        </div>

      </div>
    </div>
  );
};
