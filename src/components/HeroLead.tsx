import React from 'react';
import { ArrowRight, Clock, Calendar, User, Bookmark } from 'lucide-react';
import { Article } from '../types';

interface HeroLeadProps {
  article: Article;
  onOpenArticle: (article: Article) => void;
  isBookmarked: boolean;
  onToggleBookmark: (articleId: string) => void;
}

export const HeroLead: React.FC<HeroLeadProps> = ({
  article,
  onOpenArticle,
  isBookmarked,
  onToggleBookmark,
}) => {
  return (
    <section className="relative bg-[#171717] text-[#FAF8F3] overflow-hidden border-b border-[#343434]">
      {/* Subtle fine grid overlay */}
      <div className="absolute inset-0 bg-grid-pattern opacity-30 pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-20 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          
          {/* Hero Content Column */}
          <div className="lg:col-span-7 space-y-6">
            <div className="flex items-center space-x-3">
              <span className="bg-[#B51F2B] text-white text-xs font-['Barlow_Condensed'] tracking-widest px-3 py-1 uppercase font-bold">
                {article.category}
              </span>
              <span className="text-xs font-['Barlow_Condensed'] tracking-widest text-[#D9D3C9]/70 uppercase font-semibold">
                FEATURED LEAD STORY
              </span>
            </div>

            <h1
              onClick={() => onOpenArticle(article)}
              className="font-['Bebas_Neue'] text-4xl sm:text-6xl lg:text-7xl leading-[0.95] tracking-tight text-white uppercase cursor-pointer hover:text-[#B51F2B] transition-colors"
            >
              {article.title}
            </h1>

            <p className="font-['Cormorant_Garamond'] text-lg sm:text-2xl text-[#F1E6D2]/80 italic max-w-2xl leading-relaxed">
              {article.subtitle}
            </p>

            <div className="flex flex-wrap items-center gap-6 pt-2 text-xs font-['Barlow_Condensed'] tracking-widest text-[#D9D3C9]/70 uppercase">
              <span className="flex items-center">
                <User className="w-3.5 h-3.5 text-[#B51F2B] mr-2" />
                <span>{article.author}</span>
              </span>
              <span className="flex items-center">
                <Clock className="w-3.5 h-3.5 text-[#B51F2B] mr-2" />
                <span>{article.readTime}</span>
              </span>
              <span className="flex items-center">
                <Calendar className="w-3.5 h-3.5 text-[#B51F2B] mr-2" />
                <span>{article.date}</span>
              </span>
            </div>

            <div className="pt-4 flex flex-wrap items-center gap-4">
              <button
                onClick={() => onOpenArticle(article)}
                className="inline-flex items-center space-x-3 bg-[#B51F2B] hover:bg-[#4A101A] text-white font-['Barlow_Condensed'] tracking-widest uppercase text-sm font-bold px-8 py-4 transition-all duration-300 transform hover:-translate-y-0.5 cursor-pointer shadow-lg"
              >
                <span>READ FULL FEATURE</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <button
                onClick={() => onToggleBookmark(article.id)}
                className={`inline-flex items-center space-x-2 border px-5 py-4 font-['Barlow_Condensed'] tracking-widest uppercase text-sm font-semibold transition-colors cursor-pointer ${
                  isBookmarked
                    ? 'border-[#B51F2B] text-[#B51F2B] bg-[#B51F2B]/10'
                    : 'border-[#343434] text-[#D9D3C9] hover:border-[#B51F2B] hover:text-white'
                }`}
              >
                <Bookmark className={`w-4 h-4 ${isBookmarked ? 'fill-current' : ''}`} />
                <span>{isBookmarked ? 'SAVED TO SHELF' : 'SAVE STORY'}</span>
              </button>
            </div>
          </div>

          {/* Hero Image Column */}
          <div className="lg:col-span-5">
            <div
              className="relative group cursor-pointer overflow-hidden border border-[#343434] shadow-2xl bg-black"
              onClick={() => onOpenArticle(article)}
            >
              <img
                src={article.image}
                alt={article.title}
                className="w-full h-[350px] sm:h-[460px] object-cover transition-transform duration-700 group-hover:scale-105"
                loading="eager"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#171717] via-transparent to-transparent opacity-75"></div>
              
              <div className="absolute bottom-4 left-4 right-4 flex justify-between items-end text-xs font-['Barlow_Condensed'] tracking-widest uppercase text-[#F1E6D2]/80">
                <span className="truncate pr-2">{article.imageCaption || 'FIG 1.0 — HIGH PERFORMANCE ENGINEERING'}</span>
                <span className="text-[#B51F2B] font-bold shrink-0">EXPAND STORY</span>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
