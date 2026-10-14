import React from 'react';
import { Bookmark, ChevronRight, Clock } from 'lucide-react';
import { Article } from '../types';

interface ArticleCardProps {
  article: Article;
  onOpenArticle: (article: Article) => void;
  isBookmarked: boolean;
  onToggleBookmark: (articleId: string) => void;
}

export const ArticleCard: React.FC<ArticleCardProps> = ({
  article,
  onOpenArticle,
  isBookmarked,
  onToggleBookmark,
}) => {
  return (
    <article className="bg-white dark:bg-[#1a1a1a] border border-[#D9D3C9] dark:border-[#343434] overflow-hidden hover:border-[#B51F2B] dark:hover:border-[#B51F2B] transition-all duration-300 flex flex-col group animate-fade-in shadow-sm hover:shadow-lg">
      
      {/* Article Image Container */}
      <div
        className="relative overflow-hidden cursor-pointer bg-black"
        onClick={() => onOpenArticle(article)}
      >
        <img
          src={article.image}
          alt={article.title}
          className="w-full h-52 object-cover transition-transform duration-500 group-hover:scale-105"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-60"></div>
        
        {/* Category Badge */}
        <span className="absolute top-3 left-3 bg-[#171717]/90 text-[#F1E6D2] text-[10px] font-['Barlow_Condensed'] tracking-widest px-2.5 py-1 uppercase font-bold backdrop-blur-sm border border-white/10">
          {article.category}
        </span>

        {/* Quick Bookmark Button inside image */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            onToggleBookmark(article.id);
          }}
          className={`absolute top-3 right-3 p-1.5 backdrop-blur-md rounded-none transition-colors ${
            isBookmarked
              ? 'bg-[#B51F2B] text-white'
              : 'bg-black/60 text-white hover:bg-[#B51F2B]'
          }`}
          title={isBookmarked ? 'Remove Bookmark' : 'Bookmark Story'}
        >
          <Bookmark className={`w-3.5 h-3.5 ${isBookmarked ? 'fill-current' : ''}`} />
        </button>
      </div>

      {/* Card Content Area */}
      <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
        <div className="space-y-2.5">
          <div className="flex items-center space-x-3 text-[11px] font-['Barlow_Condensed'] tracking-widest text-[#77736D] dark:text-[#D9D3C9]/60 uppercase">
            <span>{article.date}</span>
            <span>•</span>
            <span className="flex items-center">
              <Clock className="w-3 h-3 mr-1 text-[#B51F2B]" />
              {article.readTime}
            </span>
          </div>

          <h3
            onClick={() => onOpenArticle(article)}
            className="font-['Bebas_Neue'] text-2xl uppercase text-[#171717] dark:text-[#FAF8F3] leading-snug group-hover:text-[#B51F2B] transition-colors cursor-pointer"
          >
            {article.title}
          </h3>

          <p className="font-['DM_Sans'] text-sm text-[#343434] dark:text-[#D9D3C9]/80 line-clamp-2 leading-relaxed">
            {article.excerpt}
          </p>
        </div>

        {/* Card Footer Byline & Action */}
        <div className="pt-4 border-t border-[#D9D3C9]/60 dark:border-[#343434] flex justify-between items-center text-xs font-['Barlow_Condensed'] tracking-widest uppercase">
          <span className="text-[#77736D] dark:text-[#D9D3C9]/60 truncate pr-2 font-medium">
            BY {article.author}
          </span>
          <button
            onClick={() => onOpenArticle(article)}
            className="text-[#B51F2B] font-bold hover:underline flex items-center space-x-1 shrink-0 cursor-pointer"
          >
            <span>READ STORY</span>
            <ChevronRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

    </article>
  );
};
