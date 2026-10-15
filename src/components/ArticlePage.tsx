import React, { useEffect, useRef, useState } from 'react';
import {
  ArrowLeft,
  Clock,
  User,
  Calendar,
  Bookmark,
  Share2,
  Volume2,
  VolumeX,
  Heart,
  Flame,
  Lightbulb,
  Send,
  MessageSquare,
  Check,
  ArrowRight,
  Sun,
  Moon,
  ExternalLink
} from 'lucide-react';
import { Article, ReaderComment } from '../types';
import { getArticleUrl } from '../utils/routing';
import { updatePageMeta } from '../utils/seo';
import { Footer } from './Footer';
import { HighlightedParagraph, FormattedParagraph } from './HighlightedParagraph';
import { PageKeywordsBanner } from './PageKeywordsBanner';

interface ArticlePageProps {
  article: Article;
  relatedArticles: Article[];
  isBookmarked: boolean;
  onToggleBookmark: (articleId: string) => void;
  isDarkMode: boolean;
  onToggleTheme: () => void;
}

export const ArticlePage: React.FC<ArticlePageProps> = ({
  article,
  relatedArticles,
  isBookmarked,
  onToggleBookmark,
  isDarkMode,
  onToggleTheme,
}) => {
  const [scrollProgress, setScrollProgress] = useState(0);
  const [fontSizeClass, setFontSizeClass] = useState<'text-base' | 'text-lg' | 'text-xl'>('text-base');
  const [isCopied, setIsCopied] = useState(false);

  // Speech Narration State
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [speechSupported, setSpeechSupported] = useState(false);

  // Reactions State
  const [reactions, setReactions] = useState<{ thump: number; octane: number; insight: number }>({
    thump: 42,
    octane: 67,
    insight: 29,
  });
  const [userReacted, setUserReacted] = useState<{ thump?: boolean; octane?: boolean; insight?: boolean }>({});

  // Comments State
  const [comments, setComments] = useState<ReaderComment[]>([]);
  const [authorInput, setAuthorInput] = useState('');
  const [commentInput, setCommentInput] = useState('');

  // Update Document Title, Meta tags and Schema.org JSON-LD on mount
  useEffect(() => {
    updatePageMeta({
      title: article.seoTitle,
      description: article.metaDescription,
      canonicalPath: `/${article.slug}`,
      ogType: 'article',
      author: article.author,
      jsonLd: {
        '@context': 'https://schema.org',
        '@type': 'NewsArticle',
        headline: article.title,
        description: article.metaDescription,
        image: [article.image],
        datePublished: '2026-10-14T09:00:00+05:30',
        dateModified: '2026-10-14T09:00:00+05:30',
        author: {
          '@type': 'Person',
          name: article.author,
          jobTitle: article.authorRole,
        },
        publisher: {
          '@type': 'Organization',
          name: 'Motor Chronicles',
          logo: {
            '@type': 'ImageObject',
            url: typeof window !== 'undefined' ? `${window.location.origin}/icon.png` : '/icon.png',
          },
        },
        mainEntityOfPage: {
          '@type': 'WebPage',
          '@id': typeof window !== 'undefined' ? `${window.location.origin}/${article.slug}` : `/${article.slug}`,
        },
        keywords: [article.mainKeyword, ...article.relatedKeywords].join(', '),
      },
    });

    window.scrollTo({ top: 0, behavior: 'smooth' });

    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      setSpeechSupported(true);
    }

    // Load reactions & comments
    try {
      const savedReactions = localStorage.getItem(`motor_reactions_${article.id}`);
      if (savedReactions) {
        setReactions(JSON.parse(savedReactions));
      }
      const savedUserReactions = localStorage.getItem(`motor_user_reacted_${article.id}`);
      if (savedUserReactions) {
        setUserReacted(JSON.parse(savedUserReactions));
      }

      const savedComments = localStorage.getItem(`motor_comments_${article.id}`);
      if (savedComments) {
        setComments(JSON.parse(savedComments));
      } else {
        const defaultComments: ReaderComment[] = [
          {
            id: 'c1',
            articleId: article.id,
            author: 'Kabir Verma',
            content:
              'The engineering breakdown here is spot-on. Seeing domestic Indian OEMs lead on structural torsional rigidity and crash test ratings is something I never imagined in the early 2000s.',
            date: '2 hours ago',
            likes: 14,
          },
          {
            id: 'c2',
            articleId: article.id,
            author: 'Simran Khurana',
            content:
              'The comparison between naturally aspirated character and modern electric torque delivery is so true. Speed is easy now; emotional resonance is the rare art.',
            date: '5 hours ago',
            likes: 9,
          },
        ];
        setComments(defaultComments);
      }
    } catch {
      // fallback
    }

    const handleWindowScroll = () => {
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      if (docHeight > 0) {
        setScrollProgress((scrollTop / docHeight) * 100);
      }
    };

    window.addEventListener('scroll', handleWindowScroll);

    return () => {
      window.removeEventListener('scroll', handleWindowScroll);
      if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
        window.speechSynthesis.cancel();
      }
    };
  }, [article.id, article.title]);

  // Text-to-speech narration
  const toggleSpeech = () => {
    if (!speechSupported) return;

    if (isSpeaking) {
      window.speechSynthesis.cancel();
      setIsSpeaking(false);
      return;
    }

    window.speechSynthesis.cancel();
    const textToRead = `${article.title}. ${article.subtitle}. By ${article.author}. ${article.excerpt}. ${article.sections
      .map((s) => `${s.heading || ''}. ${s.paragraphs.join(' ')}`)
      .join(' ')}`;

    const utterance = new SpeechSynthesisUtterance(textToRead);
    utterance.rate = 1.0;
    utterance.pitch = 1.0;
    utterance.onend = () => setIsSpeaking(false);
    utterance.onerror = () => setIsSpeaking(false);

    window.speechSynthesis.speak(utterance);
    setIsSpeaking(true);
  };

  // Handle Share link copy
  const handleShare = () => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(window.location.href);
      setIsCopied(true);
      setTimeout(() => setIsCopied(false), 2500);
    }
  };

  // Handle reactions
  const handleReaction = (type: 'thump' | 'octane' | 'insight') => {
    if (userReacted[type]) return;

    const newReactions = {
      ...reactions,
      [type]: reactions[type] + 1,
    };
    const newUserReacted = {
      ...userReacted,
      [type]: true,
    };

    setReactions(newReactions);
    setUserReacted(newUserReacted);

    try {
      localStorage.setItem(`motor_reactions_${article.id}`, JSON.stringify(newReactions));
      localStorage.setItem(`motor_user_reacted_${article.id}`, JSON.stringify(newUserReacted));
    } catch {
      // ignore
    }
  };

  // Handle comment submit
  const handleAddComment = (e: React.FormEvent) => {
    e.preventDefault();
    if (!commentInput.trim()) return;

    const newComment: ReaderComment = {
      id: Date.now().toString(),
      articleId: article.id,
      author: authorInput.trim() || 'Automotive Enthusiast',
      content: commentInput.trim(),
      date: 'Just now',
      likes: 1,
    };

    const updated = [newComment, ...comments];
    setComments(updated);
    setCommentInput('');

    try {
      localStorage.setItem(`motor_comments_${article.id}`, JSON.stringify(updated));
    } catch {
      // ignore
    }
  };

  return (
    <div className="bg-[#FAF8F3] dark:bg-[#171717] text-[#171717] dark:text-[#FAF8F3] min-h-screen transition-colors duration-300 font-['DM_Sans'] flex flex-col justify-between">
      
      <div>
        {/* Sticky Top Reading Progress Bar */}
        <div className="fixed top-0 left-0 right-0 h-1 bg-[#D9D3C9]/40 dark:bg-[#343434] z-50">
          <div
            className="bg-[#B51F2B] h-1 transition-all duration-150"
            style={{ width: `${scrollProgress}%` }}
          ></div>
        </div>

        {/* Dedicated Article Top Navigation */}
        <header className="sticky top-1 z-40 bg-[#FAF8F3]/95 dark:bg-[#171717]/95 backdrop-blur-md border-b border-[#D9D3C9] dark:border-[#343434] px-4 sm:px-8 py-3.5 transition-colors">
          <div className="max-w-6xl mx-auto flex justify-between items-center">
            
            {/* Back to Home Link */}
            <div className="flex items-center space-x-3">
              <a
                href="/"
                className="inline-flex items-center space-x-2 text-xs font-['Barlow_Condensed'] uppercase tracking-widest font-bold text-[#171717] dark:text-white hover:text-[#B51F2B] transition-colors py-1"
              >
                <ArrowLeft className="w-4 h-4 text-[#B51F2B]" />
                <span className="hidden sm:inline">ALL STORIES</span>
              </a>

              <span className="hidden sm:inline text-[#D9D3C9] dark:text-[#343434]">|</span>

              <a
                href="/"
                className="font-['Bebas_Neue'] text-2xl text-[#171717] dark:text-white tracking-tight hover:text-[#B51F2B] transition-colors"
              >
                MOTOR<span className="text-[#B51F2B]">.</span>CHRONICLES
              </a>

              <span className="bg-[#B51F2B] text-white text-[10px] font-['Barlow_Condensed'] uppercase px-2 py-0.5 font-bold hidden md:inline">
                {article.category}
              </span>
            </div>

            {/* Controls Bar */}
            <div className="flex items-center space-x-2 sm:space-x-4">
              
              {/* Font Size Adjuster */}
              <div className="hidden sm:flex items-center bg-black/5 dark:bg-white/5 border border-[#D9D3C9] dark:border-[#343434]">
                <button
                  onClick={() => setFontSizeClass('text-base')}
                  className={`px-2 py-1 text-xs font-['Barlow_Condensed'] uppercase cursor-pointer ${
                    fontSizeClass === 'text-base' ? 'bg-[#B51F2B] text-white' : 'text-[#77736D]'
                  }`}
                  title="Default Font Size"
                >
                  A
                </button>
                <button
                  onClick={() => setFontSizeClass('text-lg')}
                  className={`px-2 py-1 text-sm font-['Barlow_Condensed'] uppercase font-semibold cursor-pointer ${
                    fontSizeClass === 'text-lg' ? 'bg-[#B51F2B] text-white' : 'text-[#77736D]'
                  }`}
                  title="Medium Font Size"
                >
                  A+
                </button>
                <button
                  onClick={() => setFontSizeClass('text-xl')}
                  className={`px-2 py-1 text-base font-['Barlow_Condensed'] uppercase font-bold cursor-pointer ${
                    fontSizeClass === 'text-xl' ? 'bg-[#B51F2B] text-white' : 'text-[#77736D]'
                  }`}
                  title="Large Font Size"
                >
                  A++
                </button>
              </div>

              {/* Audio Listen Narration */}
              {speechSupported && (
                <button
                  onClick={toggleSpeech}
                  className={`flex items-center space-x-1.5 px-3 py-1.5 border text-xs font-['Barlow_Condensed'] uppercase font-bold tracking-wider transition-colors cursor-pointer ${
                    isSpeaking
                      ? 'border-[#B51F2B] bg-[#B51F2B] text-white animate-pulse'
                      : 'border-[#D9D3C9] dark:border-[#343434] hover:border-[#B51F2B]'
                  }`}
                  title={isSpeaking ? 'Stop Audio Narration' : 'Listen to Article (Text to Speech)'}
                >
                  {isSpeaking ? <VolumeX className="w-3.5 h-3.5" /> : <Volume2 className="w-3.5 h-3.5" />}
                  <span className="hidden sm:inline">{isSpeaking ? 'STOP AUDIO' : 'LISTEN'}</span>
                </button>
              )}

              {/* Bookmark Toggle */}
              <button
                onClick={() => onToggleBookmark(article.id)}
                className={`p-2 border transition-colors cursor-pointer ${
                  isBookmarked
                    ? 'border-[#B51F2B] text-[#B51F2B] bg-[#B51F2B]/10'
                    : 'border-[#D9D3C9] dark:border-[#343434] text-[#171717] dark:text-[#FAF8F3] hover:border-[#B51F2B]'
                }`}
                title={isBookmarked ? 'Saved to Shelf' : 'Save Story'}
              >
                <Bookmark className={`w-4 h-4 ${isBookmarked ? 'fill-current' : ''}`} />
              </button>

              {/* Copy URL */}
              <button
                onClick={handleShare}
                className="flex items-center space-x-1.5 px-3 py-1.5 border border-[#D9D3C9] dark:border-[#343434] hover:border-[#B51F2B] text-xs font-['Barlow_Condensed'] uppercase font-bold tracking-wider transition-colors cursor-pointer"
                title="Copy Article URL"
              >
                {isCopied ? (
                  <>
                    <Check className="w-3.5 h-3.5 text-green-600" />
                    <span>COPIED!</span>
                  </>
                ) : (
                  <>
                    <Share2 className="w-3.5 h-3.5" />
                    <span className="hidden sm:inline">SHARE</span>
                  </>
                )}
              </button>

              {/* Theme Toggle */}
              <button
                onClick={onToggleTheme}
                className="p-2 border border-[#D9D3C9] dark:border-[#343434] hover:border-[#B51F2B] transition-colors cursor-pointer"
                title={isDarkMode ? 'Light Mode' : 'Dark Mode'}
              >
                {isDarkMode ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
              </button>

            </div>
          </div>
        </header>

        {/* Main Article Container */}
        <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-16 space-y-10">
          
          {/* Article Header & Metadata */}
          <div className="space-y-4 border-b border-[#D9D3C9] dark:border-[#343434] pb-8">
            <div className="flex flex-wrap items-center gap-3 text-xs font-['Barlow_Condensed'] tracking-widest text-[#B51F2B] uppercase font-bold">
              <span className="bg-[#B51F2B] text-white px-3 py-1">{article.category}</span>
              <span>•</span>
              <span>JOURNAL ARCHIVE NO. {article.id.slice(0, 6).toUpperCase()}</span>
              <span>•</span>
              <span className="text-[#77736D] dark:text-[#D9D3C9]/70">DEDICATED PAGE URL: {getArticleUrl(article)}</span>
            </div>

            <h1 className="font-['Bebas_Neue'] text-4xl sm:text-6xl lg:text-7xl uppercase text-[#171717] dark:text-white leading-[0.95] tracking-tight">
              {article.title}
            </h1>

            <p className="font-['Cormorant_Garamond'] text-xl sm:text-2xl italic text-[#77736D] dark:text-[#D9D3C9] leading-relaxed">
              {article.subtitle}
            </p>

            <div className="flex flex-wrap items-center justify-between gap-4 pt-4 text-xs font-['Barlow_Condensed'] tracking-widest text-[#77736D] dark:text-[#D9D3C9]/70 uppercase">
              <div className="flex items-center space-x-2">
                <User className="w-4 h-4 text-[#B51F2B]" />
                <span className="font-bold text-[#171717] dark:text-white">{article.author}</span>
                <span>— {article.authorRole}</span>
              </div>
              <div className="flex items-center space-x-4">
                <span className="flex items-center">
                  <Calendar className="w-3.5 h-3.5 text-[#B51F2B] mr-1.5" />
                  {article.date}
                </span>
                <span className="flex items-center">
                  <Clock className="w-3.5 h-3.5 text-[#B51F2B] mr-1.5" />
                  {article.readTime}
                </span>
              </div>
            </div>
          </div>

          {/* Lead Photo */}
          <div className="space-y-2">
            <div className="overflow-hidden border border-[#D9D3C9] dark:border-[#343434] shadow-2xl bg-black">
              <img
                src={article.image}
                alt={`${article.title} — ${article.mainKeyword}`}
                className="w-full max-h-[540px] object-cover"
                loading="eager"
              />
            </div>
            {article.imageCaption && (
              <p className="text-xs font-['Barlow_Condensed'] uppercase tracking-widest text-[#77736D] dark:text-[#D9D3C9]/70 text-right">
                {article.imageCaption}
              </p>
            )}
          </div>

          {/* Executive Takeaways Callout Box */}
          {article.keyTakeaways && article.keyTakeaways.length > 0 && (
            <div className="bg-[#F1E6D2]/60 dark:bg-[#1f1f1f] p-6 sm:p-8 border-l-4 border-[#B51F2B] space-y-3 shadow-sm">
              <span className="text-xs font-['Barlow_Condensed'] tracking-widest text-[#B51F2B] uppercase font-bold flex items-center space-x-2">
                <Lightbulb className="w-4 h-4" />
                <span>EXECUTIVE EDITORIAL TAKEAWAYS</span>
              </span>
              <ul className="space-y-2.5 font-['DM_Sans'] text-sm text-[#343434] dark:text-[#D9D3C9]">
                {article.keyTakeaways.map((takeaway, idx) => (
                  <li key={idx} className="flex items-start space-x-2.5">
                    <span className="inline-block w-1.5 h-1.5 rounded-full bg-[#B51F2B] mt-2 shrink-0"></span>
                    <span className="leading-relaxed">{takeaway}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* SEO & Article Keywords Banner */}
          <PageKeywordsBanner
            pageTitle={article.title}
            mainKeyword={article.mainKeyword}
            relatedKeywords={article.relatedKeywords}
            variant="article"
          />

          {/* Article Sections */}
          <div className={`space-y-8 font-['DM_Sans'] ${fontSizeClass} text-[#343434] dark:text-[#D9D3C9]/90 leading-relaxed`}>
            {article.sections.map((section, idx) => (
              <div key={idx} className="space-y-4">
                {section.heading && (
                  <h2
                    id={
                      section.heading.toLowerCase().includes('safety')
                        ? '5-star-crash-safety-ratings'
                        : undefined
                    }
                    className="font-['Bebas_Neue'] text-3xl sm:text-4xl uppercase text-[#B51F2B] tracking-wide pt-4 scroll-mt-20"
                  >
                    {section.heading}
                  </h2>
                )}

                {section.paragraphs.map((p, pIdx) => {
                  if (idx === 0 && pIdx === 0) {
                    return (
                      <div key={pIdx} className="space-y-2">
                        <HighlightedParagraph
                          text={p}
                          mainKeyword={article.mainKeyword}
                          relatedKeywords={article.relatedKeywords}
                          className="leading-relaxed border-l-3 border-[#B51F2B] pl-4 sm:pl-5 py-1.5 bg-[#FAF8F3] dark:bg-[#1f1f1f] shadow-xs"
                        />
                        <p className="text-[10px] font-['Barlow_Condensed'] uppercase tracking-widest text-[#77736D] dark:text-[#D9D3C9]/60 pl-4 sm:pl-5">
                          ★ OPENING PARAGRAPH HIGHLIGHTS TARGET KEYWORD ({article.mainKeyword}) &amp; RELATED KEYWORDS
                        </p>
                      </div>
                    );
                  }

                  return (
                    <FormattedParagraph key={pIdx} text={p} className="leading-relaxed" />
                  );
                })}

                {/* Pull Quote */}
                {section.quote && (
                  <blockquote className="my-8 border-l-4 border-[#B51F2B] pl-6 py-2 bg-[#F1E6D2]/30 dark:bg-[#242424]/40">
                    <p className="font-['Cormorant_Garamond'] text-2xl sm:text-3xl italic text-[#4A101A] dark:text-[#FAF8F3] leading-relaxed">
                      "{section.quote}"
                    </p>
                    {section.quoteAuthor && (
                      <footer className="text-xs font-['Barlow_Condensed'] tracking-widest uppercase text-[#77736D] dark:text-[#D9D3C9]/70 pt-2 font-bold">
                        — {section.quoteAuthor}
                      </footer>
                    )}
                  </blockquote>
                )}

                {/* Technical Spec Sheet */}
                {section.specSheet && (
                  <div className="my-8 border border-[#D9D3C9] dark:border-[#343434] bg-white dark:bg-[#1a1a1a] p-6 shadow-sm">
                    <h3 className="font-['Bebas_Neue'] text-xl uppercase tracking-wider text-[#171717] dark:text-white mb-4 border-b border-[#D9D3C9] dark:border-[#343434] pb-2">
                      TECHNICAL ARCHITECTURE BENCHMARK
                    </h3>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      {section.specSheet.map((spec, sIdx) => (
                        <div key={sIdx} className="space-y-0.5">
                          <span className="text-[11px] font-['Barlow_Condensed'] uppercase tracking-widest text-[#77736D] dark:text-[#D9D3C9]/70">
                            {spec.label}
                          </span>
                          <p className="font-['Barlow_Condensed'] text-base uppercase font-bold text-[#171717] dark:text-[#FAF8F3]">
                            {spec.value}
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Reader Reactions */}
          <div className="pt-8 border-t border-[#D9D3C9] dark:border-[#343434] space-y-4">
            <span className="text-xs font-['Barlow_Condensed'] tracking-widest text-[#77736D] dark:text-[#D9D3C9]/70 uppercase font-bold">
              READER REACTIONS
            </span>

            <div className="flex flex-wrap gap-4">
              <button
                onClick={() => handleReaction('thump')}
                className={`flex items-center space-x-2 px-5 py-3 border text-xs font-['Barlow_Condensed'] uppercase font-bold tracking-widest transition-all cursor-pointer ${
                  userReacted.thump
                    ? 'border-[#B51F2B] bg-[#B51F2B] text-white shadow'
                    : 'border-[#D9D3C9] dark:border-[#343434] hover:border-[#B51F2B]'
                }`}
              >
                <Heart className={`w-4 h-4 ${userReacted.thump ? 'fill-current' : 'text-[#B51F2B]'}`} />
                <span>ENGINE THUMP ({reactions.thump})</span>
              </button>

              <button
                onClick={() => handleReaction('octane')}
                className={`flex items-center space-x-2 px-5 py-3 border text-xs font-['Barlow_Condensed'] uppercase font-bold tracking-widest transition-all cursor-pointer ${
                  userReacted.octane
                    ? 'border-[#B51F2B] bg-[#B51F2B] text-white shadow'
                    : 'border-[#D9D3C9] dark:border-[#343434] hover:border-[#B51F2B]'
                }`}
              >
                <Flame className={`w-4 h-4 ${userReacted.octane ? 'fill-current' : 'text-[#B51F2B]'}`} />
                <span>HIGH OCTANE ({reactions.octane})</span>
              </button>

              <button
                onClick={() => handleReaction('insight')}
                className={`flex items-center space-x-2 px-5 py-3 border text-xs font-['Barlow_Condensed'] uppercase font-bold tracking-widest transition-all cursor-pointer ${
                  userReacted.insight
                    ? 'border-[#B51F2B] bg-[#B51F2B] text-white shadow'
                    : 'border-[#D9D3C9] dark:border-[#343434] hover:border-[#B51F2B]'
                }`}
              >
                <Lightbulb className={`w-4 h-4 ${userReacted.insight ? 'fill-current' : 'text-[#B51F2B]'}`} />
                <span>ENGINEERING CLARITY ({reactions.insight})</span>
              </button>
            </div>
          </div>

          {/* Reader Discussion / Comments Section */}
          <div className="pt-8 border-t border-[#D9D3C9] dark:border-[#343434] space-y-6">
            <span className="text-xs font-['Barlow_Condensed'] tracking-widest text-[#B51F2B] uppercase font-bold flex items-center space-x-2">
              <MessageSquare className="w-4 h-4" />
              <span>READER DISPATCH &amp; COMMENTARY ({comments.length})</span>
            </span>

            {/* Submit Comment */}
            <form onSubmit={handleAddComment} className="bg-white dark:bg-[#1a1a1a] p-4 sm:p-6 border border-[#D9D3C9] dark:border-[#343434] space-y-3">
              <div className="flex flex-col sm:flex-row gap-3">
                <input
                  type="text"
                  placeholder="Your Name (e.g. Rahul S.)"
                  value={authorInput}
                  onChange={(e) => setAuthorInput(e.target.value)}
                  className="bg-[#FAF8F3] dark:bg-[#242424] border border-[#D9D3C9] dark:border-[#343434] px-3.5 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-[#B51F2B] sm:w-1/3 text-[#171717] dark:text-white"
                />
                <input
                  type="text"
                  placeholder="Share your perspective on this machine..."
                  value={commentInput}
                  onChange={(e) => setCommentInput(e.target.value)}
                  required
                  className="bg-[#FAF8F3] dark:bg-[#242424] border border-[#D9D3C9] dark:border-[#343434] px-3.5 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-[#B51F2B] flex-1 text-[#171717] dark:text-white"
                />
                <button
                  type="submit"
                  className="bg-[#B51F2B] hover:bg-[#4A101A] text-white font-['Barlow_Condensed'] uppercase tracking-widest px-6 py-2 text-xs font-bold transition-colors flex items-center justify-center space-x-1 cursor-pointer"
                >
                  <span>POST</span>
                  <Send className="w-3.5 h-3.5" />
                </button>
              </div>
            </form>

            {/* Comments List */}
            <div className="space-y-4">
              {comments.map((comment) => (
                <div
                  key={comment.id}
                  className="p-4 bg-white/70 dark:bg-[#1a1a1a] border border-[#D9D3C9]/70 dark:border-[#343434] space-y-1.5"
                >
                  <div className="flex justify-between items-center text-xs font-['Barlow_Condensed'] tracking-widest uppercase">
                    <span className="font-bold text-[#171717] dark:text-white">{comment.author}</span>
                    <span className="text-[#77736D] dark:text-[#D9D3C9]/60">{comment.date}</span>
                  </div>
                  <p className="font-['DM_Sans'] text-sm text-[#343434] dark:text-[#D9D3C9] leading-relaxed">
                    {comment.content}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Attached Editorial Anchors & Connected Deep Dives */}
          <div className="pt-8 border-t border-[#D9D3C9] dark:border-[#343434] bg-white dark:bg-[#1f1f1f] p-6 border border-[#D9D3C9] dark:border-[#343434] shadow-xs space-y-4">
            <div className="flex items-center space-x-2 text-xs font-['Barlow_Condensed'] tracking-widest text-[#B51F2B] uppercase font-bold">
              <span>ATTACHED EDITORIAL ANCHORS • 3 FLAGSHIP BLOGS (OPENS IN NEW TAB)</span>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs font-['DM_Sans']">
              {/* Blog 1 Anchor: 5-star crash safety ratings */}
              <a
                href="/indian-suv-market"
                target="_blank"
                rel="noopener noreferrer"
                className="p-3 bg-[#FAF8F3] dark:bg-[#171717] border border-[#D9D3C9] dark:border-[#343434] hover:border-[#B51F2B] transition-colors flex flex-col justify-between group shadow-2xs"
                title="Anchor Text: 5-star crash safety ratings"
              >
                <div>
                  <span className="text-[9px] font-['Barlow_Condensed'] uppercase tracking-widest text-[#B51F2B] font-bold block mb-1">
                    ANCHOR TEXT: 5-STAR CRASH SAFETY RATINGS
                  </span>
                  <p className="font-['Bebas_Neue'] text-lg text-[#171717] dark:text-white group-hover:text-[#B51F2B] transition-colors uppercase leading-tight">
                    5-star crash safety ratings
                  </p>
                  <span className="text-[11px] text-[#77736D] dark:text-[#D9D3C9]/70 line-clamp-1 mt-0.5">
                    How Tata Motors &amp; Mahindra Reshaped the Indian SUV Market
                  </span>
                </div>
                <span className="text-[10px] font-['Barlow_Condensed'] uppercase tracking-wider text-[#B51F2B] font-bold mt-2 flex items-center space-x-1">
                  <span>OPEN IN NEW TAB</span>
                  <ExternalLink className="w-2.5 h-2.5" />
                </span>
              </a>

              {/* Blog 2 Anchor: India's EV Ecosystem */}
              <a
                href="/electric-vehicles-india"
                target="_blank"
                rel="noopener noreferrer"
                className="p-3 bg-[#FAF8F3] dark:bg-[#171717] border border-[#D9D3C9] dark:border-[#343434] hover:border-[#B51F2B] transition-colors flex flex-col justify-between group shadow-2xs"
                title="Anchor Text: India's EV Ecosystem: From Two-Wheelers to Global Export Hub"
              >
                <div>
                  <span className="text-[9px] font-['Barlow_Condensed'] uppercase tracking-widest text-[#B51F2B] font-bold block mb-1">
                    ANCHOR TEXT: INDIA'S EV ECOSYSTEM
                  </span>
                  <p className="font-['Bebas_Neue'] text-lg text-[#171717] dark:text-white group-hover:text-[#B51F2B] transition-colors uppercase leading-tight">
                    India's EV Ecosystem: From Two-Wheelers to Global Export Hub
                  </p>
                  <span className="text-[11px] text-[#77736D] dark:text-[#D9D3C9]/70 line-clamp-1 mt-0.5">
                    Battery Swapping &amp; Tropical Thermal Management
                  </span>
                </div>
                <span className="text-[10px] font-['Barlow_Condensed'] uppercase tracking-wider text-[#B51F2B] font-bold mt-2 flex items-center space-x-1">
                  <span>OPEN IN NEW TAB</span>
                  <ExternalLink className="w-2.5 h-2.5" />
                </span>
              </a>

              {/* Blog 3 Anchor: The Royal Enfield Phenomenon */}
              <a
                href="/royal-enfield-motorcycles"
                target="_blank"
                rel="noopener noreferrer"
                className="p-3 bg-[#FAF8F3] dark:bg-[#171717] border border-[#D9D3C9] dark:border-[#343434] hover:border-[#B51F2B] transition-colors flex flex-col justify-between group shadow-2xs"
                title="Anchor Text: The Royal Enfield Phenomenon: Engineering Heritage Meets Global Modernity"
              >
                <div>
                  <span className="text-[9px] font-['Barlow_Condensed'] uppercase tracking-widest text-[#B51F2B] font-bold block mb-1">
                    ANCHOR TEXT: THE ROYAL ENFIELD PHENOMENON
                  </span>
                  <p className="font-['Bebas_Neue'] text-lg text-[#171717] dark:text-white group-hover:text-[#B51F2B] transition-colors uppercase leading-tight">
                    The Royal Enfield Phenomenon: Engineering Heritage Meets Global Modernity
                  </p>
                  <span className="text-[11px] text-[#77736D] dark:text-[#D9D3C9]/70 line-clamp-1 mt-0.5">
                    Himalayan 450 &amp; Motorcycle Engineering
                  </span>
                </div>
                <span className="text-[10px] font-['Barlow_Condensed'] uppercase tracking-wider text-[#B51F2B] font-bold mt-2 flex items-center space-x-1">
                  <span>OPEN IN NEW TAB</span>
                  <ExternalLink className="w-2.5 h-2.5" />
                </span>
              </a>
            </div>
          </div>

          {/* Related Stories with New Tab Links */}
          {relatedArticles.length > 0 && (
            <div className="pt-12 border-t border-[#D9D3C9] dark:border-[#343434] space-y-6">
              <span className="text-xs font-['Barlow_Condensed'] tracking-widest text-[#B51F2B] uppercase font-bold">
                MORE STORIES FROM MOTOR CHRONICLES (OPENS IN NEW TAB)
              </span>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                {relatedArticles.map((rel) => (
                  <a
                    key={rel.id}
                    href={getArticleUrl(rel)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-4 border border-[#D9D3C9] dark:border-[#343434] bg-white dark:bg-[#1a1a1a] hover:border-[#B51F2B] transition-colors space-y-2 group block"
                  >
                    <span className="text-[10px] font-['Barlow_Condensed'] tracking-widest text-[#B51F2B] uppercase font-bold">
                      {rel.category}
                    </span>
                    <h4 className="font-['Bebas_Neue'] text-xl uppercase text-[#171717] dark:text-white leading-tight group-hover:text-[#B51F2B] transition-colors line-clamp-2">
                      {rel.title}
                    </h4>
                    <p className="text-xs font-['Barlow_Condensed'] text-[#77736D] dark:text-[#D9D3C9]/60 uppercase flex items-center justify-between pt-1">
                      <span>{rel.readTime}</span>
                      <ExternalLink className="w-3.5 h-3.5 text-[#B51F2B]" />
                    </p>
                  </a>
                ))}
              </div>
            </div>
          )}

        </main>
      </div>

      {/* Magazine Footer */}
      <Footer
        onSelectCategory={() => {
          window.location.href = '/';
        }}
        onOpenComparison={() => {
          window.location.href = '/showdown';
        }}
      />

    </div>
  );
};
