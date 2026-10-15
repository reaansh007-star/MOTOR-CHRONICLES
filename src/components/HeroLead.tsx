import React from 'react';
import { ArrowRight, Clock, Calendar, User, Bookmark, ExternalLink } from 'lucide-react';
import { Article } from '../types';
import { getArticleUrl } from '../utils/routing';

interface HeroLeadProps {
  article: Article;
  onOpenArticle?: (article: Article) => void;
  isBookmarked: boolean;
  onToggleBookmark: (articleId: string) => void;
}

export const HeroLead: React.FC<HeroLeadProps> = ({
  article,
  isBookmarked,
  onToggleBookmark,
}) => {
  const articleUrl = getArticleUrl(article);

  return (
    <section
      id="5-star-crash-safety-ratings"
      data-section-id="heroStorySection"
      data-slug={article.slug}
      className="relative bg-[#171717] text-[#FAF8F3] overflow-hidden border-b border-[#343434] scroll-mt-24"
    >
      {/* Subtle fine grid overlay */}
      <div className="absolute inset-0 bg-grid-pattern opacity-30 pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-20 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          
          {/* Hero Content Column */}
          <div className="lg:col-span-7 space-y-6">
            <div className="flex flex-wrap items-center gap-3">
              <span className="bg-[#B51F2B] text-white text-xs font-['Barlow_Condensed'] tracking-widest px-3 py-1 uppercase font-bold">
                {article.category}
              </span>
              <span className="text-xs font-['Barlow_Condensed'] tracking-widest text-[#D9D3C9]/70 uppercase font-semibold">
                FEATURED LEAD STORY
              </span>
              <a
                href={articleUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center space-x-1.5 text-[11px] font-['Barlow_Condensed'] uppercase tracking-wider font-bold bg-[#B51F2B]/20 hover:bg-[#B51F2B] text-white px-2.5 py-0.5 border border-[#B51F2B]/50 transition-colors"
                title="Anchor Text: 5-star crash safety ratings (Opens in new tab)"
              >
                <span>ANCHOR: 5-STAR CRASH SAFETY RATINGS</span>
                <ExternalLink className="w-2.5 h-2.5" />
              </a>
            </div>

            <h2 className="font-['Bebas_Neue'] text-4xl sm:text-6xl lg:text-7xl leading-[0.95] tracking-tight text-white uppercase">
              <a
                href={articleUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-[#B51F2B] transition-colors block"
              >
                {article.title}
              </a>
            </h2>

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
              <span className="text-[#B51F2B] flex items-center space-x-1 font-semibold">
                <ExternalLink className="w-3 h-3" />
                <span>OPENS IN NEW TAB</span>
              </span>
            </div>

            <div className="pt-4 flex flex-wrap items-center gap-4">
              <a
                href={articleUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center space-x-3 bg-[#B51F2B] hover:bg-[#4A101A] text-white font-['Barlow_Condensed'] tracking-widest uppercase text-sm font-bold px-8 py-4 transition-all duration-300 transform hover:-translate-y-0.5 shadow-lg"
              >
                <span>READ FULL FEATURE</span>
                <ExternalLink className="w-4 h-4" />
              </a>

              <button
                type="button"
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
            <a
              href={articleUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="relative group cursor-pointer overflow-hidden border border-[#343434] shadow-2xl bg-black block"
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
                <span className="text-[#B51F2B] font-bold shrink-0 flex items-center space-x-1">
                  <span>OPEN STORY</span>
                  <ExternalLink className="w-3 h-3" />
                </span>
              </div>
            </a>
          </div>

        </div>
      </div>
    </section>
  );
};
