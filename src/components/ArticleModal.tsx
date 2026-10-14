import React, { useEffect, useRef, useState } from 'react';
import {
  X,
  Clock,
  User,
  Calendar,
  Bookmark,
  Share2,
  Volume2,
  VolumeX,
  Type,
  Flame,
  Heart,
  Lightbulb,
  Send,
  MessageSquare,
  Check,
  ArrowRight
} from 'lucide-react';
import { Article, ReaderComment } from '../types';

interface ArticleModalProps {
  article: Article;
  onClose: () => void;
  onOpenArticle: (article: Article) => void;
  isBookmarked: boolean;
  onToggleBookmark: (articleId: string) => void;
  relatedArticles: Article[];
}

export const ArticleModal: React.FC<ArticleModalProps> = ({
  article,
  onClose,
  onOpenArticle,
  isBookmarked,
  onToggleBookmark,
  relatedArticles,
}) => {
  const modalRef = useRef<HTMLDivElement>(null);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [fontSizeClass, setFontSizeClass] = useState<'text-base' | 'text-lg' | 'text-xl'>('text-base');
  const [isCopied, setIsCopied] = useState(false);
  
  // Speech Synthesis state
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [speechSupported, setSpeechSupported] = useState(false);

  // Reactions state
  const [reactions, setReactions] = useState<{ thump: number; octane: number; insight: number }>({
    thump: 42,
    octane: 67,
    insight: 29,
  });
  const [userReacted, setUserReacted] = useState<{ thump?: boolean; octane?: boolean; insight?: boolean }>({});

  // Comments state
  const [comments, setComments] = useState<ReaderComment[]>([]);
  const [authorInput, setAuthorInput] = useState('');
  const [commentInput, setCommentInput] = useState('');

  // Lock body scroll on mount
  useEffect(() => {
    document.body.style.overflow = 'hidden';
    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      setSpeechSupported(true);
    }

    // Load reactions & comments from localStorage
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
        // Initial default commentary
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
      // LocalStorage fallback
    }

    // Scroll reader to top
    if (modalRef.current) {
      modalRef.current.scrollTop = 0;
    }

    return () => {
      document.body.style.overflow = 'auto';
      if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
        window.speechSynthesis.cancel();
      }
    };
  }, [article.id]);

  // Handle scroll progress
  const handleScroll = () => {
    if (!modalRef.current) return;
    const { scrollTop, scrollHeight, clientHeight } = modalRef.current;
    const total = scrollHeight - clientHeight;
    if (total > 0) {
      const progress = (scrollTop / total) * 100;
      setScrollProgress(progress);
    }
  };

  // Text-to-speech narration toggle
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
      setTimeout(() => setIsCopied(false), 2000);
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

  // Handle comment submission
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
    <div className="fixed inset-0 z-50 bg-[#171717]/95 backdrop-blur-md overflow-y-auto flex justify-center">
      <div
        ref={modalRef}
        onScroll={handleScroll}
        className="w-full max-w-4xl bg-[#FAF8F3] dark:bg-[#171717] text-[#171717] dark:text-[#FAF8F3] min-h-screen shadow-2xl relative overflow-y-auto"
      >
        {/* Sticky Header Bar */}
        <div className="sticky top-0 bg-[#F1E6D2] dark:bg-[#1f1f1f] border-b border-[#D9D3C9] dark:border-[#343434] px-4 sm:px-8 py-3.5 flex justify-between items-center z-30 backdrop-blur-md">
          <div className="flex items-center space-x-3">
            <span className="bg-[#B51F2B] text-white text-xs font-['Barlow_Condensed'] uppercase px-3 py-1 font-bold">
              {article.category}
            </span>
            <span className="text-xs font-['Barlow_Condensed'] tracking-widest text-[#77736D] dark:text-[#D9D3C9]/70 uppercase hidden sm:inline">
              {article.readTime}
            </span>
          </div>

          {/* Action buttons in header */}
          <div className="flex items-center space-x-2 sm:space-x-4">
            
            {/* Font Size Selector */}
            <div className="hidden sm:flex items-center bg-black/5 dark:bg-white/5 border border-[#D9D3C9] dark:border-[#343434]">
              <button
                onClick={() => setFontSizeClass('text-base')}
                className={`px-2 py-1 text-xs font-['Barlow_Condensed'] uppercase ${
                  fontSizeClass === 'text-base' ? 'bg-[#B51F2B] text-white' : 'text-[#77736D]'
                }`}
                title="Normal Font"
              >
                A
              </button>
              <button
                onClick={() => setFontSizeClass('text-lg')}
                className={`px-2 py-1 text-sm font-['Barlow_Condensed'] uppercase font-semibold ${
                  fontSizeClass === 'text-lg' ? 'bg-[#B51F2B] text-white' : 'text-[#77736D]'
                }`}
                title="Medium Font"
              >
                A+
              </button>
              <button
                onClick={() => setFontSizeClass('text-xl')}
                className={`px-2 py-1 text-base font-['Barlow_Condensed'] uppercase font-bold ${
                  fontSizeClass === 'text-xl' ? 'bg-[#B51F2B] text-white' : 'text-[#77736D]'
                }`}
                title="Large Font"
              >
                A++
              </button>
            </div>

            {/* Listen / Voice Narration */}
            {speechSupported && (
              <button
                onClick={toggleSpeech}
                className={`flex items-center space-x-1.5 px-3 py-1.5 border text-xs font-['Barlow_Condensed'] uppercase font-bold tracking-wider transition-colors cursor-pointer ${
                  isSpeaking
                    ? 'border-[#B51F2B] bg-[#B51F2B] text-white animate-pulse'
                    : 'border-[#D9D3C9] dark:border-[#343434] hover:border-[#B51F2B]'
                }`}
                title={isSpeaking ? 'Stop Audio Narration' : 'Listen to Article Narration'}
              >
                {isSpeaking ? <VolumeX className="w-3.5 h-3.5" /> : <Volume2 className="w-3.5 h-3.5" />}
                <span className="hidden sm:inline">{isSpeaking ? 'STOP AUDIO' : 'LISTEN'}</span>
              </button>
            )}

            {/* Bookmark button */}
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

            {/* Share link button */}
            <button
              onClick={handleShare}
              className="p-2 border border-[#D9D3C9] dark:border-[#343434] hover:border-[#B51F2B] transition-colors cursor-pointer"
              title="Copy Story Link"
            >
              {isCopied ? <Check className="w-4 h-4 text-green-600" /> : <Share2 className="w-4 h-4" />}
            </button>

            {/* Close Story button */}
            <button
              onClick={onClose}
              className="bg-[#171717] dark:bg-[#FAF8F3] text-white dark:text-[#171717] hover:bg-[#B51F2B] dark:hover:bg-[#B51F2B] dark:hover:text-white px-3 sm:px-4 py-1.5 font-['Barlow_Condensed'] tracking-widest uppercase font-bold text-xs sm:text-sm flex items-center space-x-1.5 transition-colors cursor-pointer"
            >
              <span className="hidden sm:inline">CLOSE</span>
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Real-Time Reading Progress Bar */}
        <div className="w-full bg-[#D9D3C9]/40 dark:bg-[#343434] h-1 sticky top-[57px] z-30">
          <div
            className="bg-[#B51F2B] h-1 transition-all duration-150"
            style={{ width: `${scrollProgress}%` }}
          ></div>
        </div>

        {/* Article Body Container */}
        <div className="p-6 sm:p-12 lg:p-16 space-y-8">
          
          {/* Header Metadata */}
          <div className="space-y-4 border-b border-[#D9D3C9] dark:border-[#343434] pb-8">
            <div className="flex items-center space-x-3 text-xs font-['Barlow_Condensed'] tracking-widest text-[#B51F2B] uppercase font-bold">
              <span>SPECIAL EDITORIAL REPORT</span>
              <span>•</span>
              <span>JOURNAL ARCHIVE NO. {article.id.slice(0, 4).toUpperCase()}</span>
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

          {/* Lead Photo with Caption */}
          <div className="space-y-2">
            <div className="overflow-hidden border border-[#D9D3C9] dark:border-[#343434] shadow-xl bg-black">
              <img
                src={article.image}
                alt={article.title}
                className="w-full max-h-[500px] object-cover"
              />
            </div>
            {article.imageCaption && (
              <p className="text-xs font-['Barlow_Condensed'] uppercase tracking-widest text-[#77736D] dark:text-[#D9D3C9]/70 text-right">
                {article.imageCaption}
              </p>
            )}
          </div>

          {/* Key Takeaways Callout Box */}
          {article.keyTakeaways && article.keyTakeaways.length > 0 && (
            <div className="bg-[#F1E6D2]/60 dark:bg-[#1f1f1f] p-6 sm:p-8 border-l-4 border-[#B51F2B] space-y-3">
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

          {/* Rich Content Sections */}
          <div className={`space-y-8 font-['DM_Sans'] ${fontSizeClass} text-[#343434] dark:text-[#D9D3C9]/90 leading-relaxed`}>
            {article.sections.map((section, idx) => (
              <div key={idx} className="space-y-4">
                {section.heading && (
                  <h2 className="font-['Bebas_Neue'] text-2xl sm:text-3xl uppercase text-[#B51F2B] tracking-wide pt-4">
                    {section.heading}
                  </h2>
                )}

                {section.paragraphs.map((p, pIdx) => (
                  <p key={pIdx} className="leading-relaxed">
                    {p}
                  </p>
                ))}

                {/* Pull Quote */}
                {section.quote && (
                  <blockquote className="my-8 border-l-4 border-[#B51F2B] pl-6 py-2 bg-[#F1E6D2]/30 dark:bg-[#242424]/40">
                    <p className="font-['Cormorant_Garamond'] text-xl sm:text-2xl italic text-[#4A101A] dark:text-[#FAF8F3] leading-relaxed">
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

          {/* Reader Interactive Reactions */}
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
            <div className="flex items-center justify-between">
              <span className="text-xs font-['Barlow_Condensed'] tracking-widest text-[#B51F2B] uppercase font-bold flex items-center space-x-2">
                <MessageSquare className="w-4 h-4" />
                <span>READER DISPATCH &amp; COMMENTARY ({comments.length})</span>
              </span>
            </div>

            {/* Submit Comment Form */}
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

          {/* Related Stories Recirculation */}
          {relatedArticles.length > 0 && (
            <div className="pt-12 border-t border-[#D9D3C9] dark:border-[#343434] space-y-6">
              <span className="text-xs font-['Barlow_Condensed'] tracking-widest text-[#B51F2B] uppercase font-bold">
                NEXT STORIES IN THIS EDITION
              </span>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                {relatedArticles.map((rel) => (
                  <div
                    key={rel.id}
                    onClick={() => {
                      onOpenArticle(rel);
                      if (modalRef.current) modalRef.current.scrollTop = 0;
                    }}
                    className="p-4 border border-[#D9D3C9] dark:border-[#343434] bg-white dark:bg-[#1a1a1a] hover:border-[#B51F2B] cursor-pointer transition-colors space-y-2 group"
                  >
                    <span className="text-[10px] font-['Barlow_Condensed'] tracking-widest text-[#B51F2B] uppercase font-bold">
                      {rel.category}
                    </span>
                    <h4 className="font-['Bebas_Neue'] text-lg uppercase text-[#171717] dark:text-white leading-tight group-hover:text-[#B51F2B] transition-colors line-clamp-2">
                      {rel.title}
                    </h4>
                    <p className="text-xs font-['Barlow_Condensed'] text-[#77736D] dark:text-[#D9D3C9]/60 uppercase flex items-center justify-between pt-1">
                      <span>{rel.readTime}</span>
                      <ArrowRight className="w-3 h-3 text-[#B51F2B]" />
                    </p>
                  </div>
                ))}
              </div>
            </div>
          )}

        </div>
      </div>
    </div>
  );
};
