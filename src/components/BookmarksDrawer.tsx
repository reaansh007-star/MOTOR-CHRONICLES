import React from 'react';
import { Bookmark, X, Trash2, Clock, ExternalLink } from 'lucide-react';
import { Article } from '../types';
import { getArticleUrl } from '../utils/routing';

interface BookmarksDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  bookmarkedArticles: Article[];
  onOpenArticle?: (article: Article) => void;
  onRemoveBookmark: (articleId: string) => void;
  onClearAll: () => void;
}

export const BookmarksDrawer: React.FC<BookmarksDrawerProps> = ({
  isOpen,
  onClose,
  bookmarkedArticles,
  onRemoveBookmark,
  onClearAll,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-[#171717]/80 backdrop-blur-sm flex justify-end">
      <div className="w-full max-w-md bg-[#FAF8F3] dark:bg-[#1a1a1a] h-full shadow-2xl flex flex-col border-l border-[#D9D3C9] dark:border-[#343434] text-[#171717] dark:text-[#FAF8F3]">
        
        {/* Drawer Header */}
        <div className="p-6 border-b border-[#D9D3C9] dark:border-[#343434] flex justify-between items-center bg-[#F1E6D2] dark:bg-[#1f1f1f]">
          <div className="flex items-center space-x-2">
            <Bookmark className="w-5 h-5 text-[#B51F2B]" />
            <span className="font-['Bebas_Neue'] text-2xl uppercase tracking-wide">
              SAVED STORIES ({bookmarkedArticles.length})
            </span>
          </div>
          <button
            onClick={onClose}
            className="text-[#77736D] hover:text-[#B51F2B] transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Drawer Content */}
        <div className="flex-1 overflow-y-auto p-6 space-y-4">
          {bookmarkedArticles.length === 0 ? (
            <div className="text-center py-20 space-y-4">
              <div className="w-16 h-16 mx-auto rounded-none bg-black/5 dark:bg-white/5 border border-dashed border-[#77736D] flex items-center justify-center text-[#77736D]">
                <Bookmark className="w-8 h-8" />
              </div>
              <h3 className="font-['Bebas_Neue'] text-2xl uppercase">Your Reading Shelf is Empty</h3>
              <p className="font-['Cormorant_Garamond'] text-base italic text-[#77736D] dark:text-[#D9D3C9]/70">
                Tap the bookmark icon on any story to save it for offline or later reading.
              </p>
            </div>
          ) : (
            bookmarkedArticles.map((art) => (
              <div
                key={art.id}
                className="bg-white dark:bg-[#242424] border border-[#D9D3C9] dark:border-[#343434] p-4 flex flex-col space-y-2 group hover:border-[#B51F2B] transition-colors"
              >
                <div className="flex justify-between items-start">
                  <span className="text-[10px] font-['Barlow_Condensed'] uppercase tracking-widest text-[#B51F2B] font-bold">
                    {art.category}
                  </span>
                  <button
                    type="button"
                    onClick={() => onRemoveBookmark(art.id)}
                    className="text-[#77736D] hover:text-[#B51F2B] p-1 cursor-pointer"
                    title="Remove from Shelf"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>

                <a
                  href={getArticleUrl(art)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-['Bebas_Neue'] text-xl uppercase leading-snug cursor-pointer group-hover:text-[#B51F2B] transition-colors line-clamp-2"
                >
                  {art.title}
                </a>

                <div className="flex justify-between items-center text-xs font-['Barlow_Condensed'] uppercase tracking-wider text-[#77736D] dark:text-[#D9D3C9]/60 pt-2 border-t border-[#D9D3C9]/40 dark:border-[#343434]">
                  <span className="flex items-center">
                    <Clock className="w-3 h-3 mr-1 text-[#B51F2B]" />
                    {art.readTime}
                  </span>
                  <a
                    href={getArticleUrl(art)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[#B51F2B] font-bold flex items-center space-x-1 cursor-pointer hover:underline"
                  >
                    <span>OPEN IN NEW TAB</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Drawer Footer */}
        {bookmarkedArticles.length > 0 && (
          <div className="p-4 border-t border-[#D9D3C9] dark:border-[#343434] bg-[#F1E6D2]/40 dark:bg-[#1f1f1f] flex justify-between items-center">
            <button
              onClick={onClearAll}
              className="text-xs font-['Barlow_Condensed'] uppercase tracking-widest text-[#B51F2B] hover:underline font-bold cursor-pointer"
            >
              CLEAR ALL BOOKMARKS
            </button>
            <span className="text-xs font-['Barlow_Condensed'] text-[#77736D] uppercase">
              STORED LOCALLY
            </span>
          </div>
        )}

      </div>
    </div>
  );
};
