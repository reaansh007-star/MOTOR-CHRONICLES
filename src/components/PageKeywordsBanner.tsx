import React from 'react';
import { Tag, Sparkles } from 'lucide-react';

interface PageKeywordsBannerProps {
  pageTitle?: string;
  mainKeyword: string;
  relatedKeywords: [string, string];
  variant?: 'page' | 'article';
}

export const PageKeywordsBanner: React.FC<PageKeywordsBannerProps> = ({
  pageTitle,
  mainKeyword,
  relatedKeywords,
  variant = 'page',
}) => {
  return (
    <div
      className={`border transition-colors ${
        variant === 'article'
          ? 'bg-[#F1E6D2]/50 dark:bg-[#202020] border-[#D9D3C9] dark:border-[#343434] p-4 sm:p-5'
          : 'bg-white dark:bg-[#1a1a1a] border-[#D9D3C9] dark:border-[#343434] p-4 mb-8 shadow-xs'
      }`}
    >
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div className="flex items-center space-x-2 text-xs font-['Barlow_Condensed'] uppercase tracking-widest font-bold text-[#77736D] dark:text-[#D9D3C9]/70 shrink-0">
          <Tag className="w-3.5 h-3.5 text-[#B51F2B]" />
          <span>{variant === 'article' ? 'ARTICLE SEO FOCUS KEYWORDS' : 'PAGE TARGET KEYWORDS'}</span>
          {variant === 'article' && (
            <span className="text-[10px] text-[#B51F2B] font-semibold bg-[#B51F2B]/10 px-2 py-0.5 rounded-xs hidden md:inline">
              HIGHLIGHTED IN OPENING PARAGRAPH
            </span>
          )}
        </div>

        <div className="flex flex-wrap items-center gap-2">
          {/* Main Keyword Badge */}
          <div className="inline-flex items-center space-x-1.5 px-3 py-1 bg-[#B51F2B] text-white text-xs font-['Barlow_Condensed'] uppercase font-bold tracking-wider shadow-xs">
            <span className="text-[9px] bg-black/30 px-1 py-0.2 rounded-2xs font-normal">MAIN</span>
            <span>{mainKeyword}</span>
          </div>

          {/* Related Keyword 1 */}
          <div className="inline-flex items-center space-x-1.5 px-3 py-1 bg-[#FAF8F3] dark:bg-[#282828] text-[#171717] dark:text-[#FAF8F3] border border-amber-600/50 text-xs font-['Barlow_Condensed'] uppercase font-bold tracking-wider">
            <span className="text-[9px] bg-amber-600 text-white px-1 py-0.2 rounded-2xs font-normal">RELATED</span>
            <span>{relatedKeywords[0]}</span>
          </div>

          {/* Related Keyword 2 */}
          <div className="inline-flex items-center space-x-1.5 px-3 py-1 bg-[#FAF8F3] dark:bg-[#282828] text-[#171717] dark:text-[#FAF8F3] border border-amber-600/50 text-xs font-['Barlow_Condensed'] uppercase font-bold tracking-wider">
            <span className="text-[9px] bg-amber-600 text-white px-1 py-0.2 rounded-2xs font-normal">RELATED</span>
            <span>{relatedKeywords[1]}</span>
          </div>
        </div>
      </div>
    </div>
  );
};
