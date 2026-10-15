import React from 'react';
import { ExternalLink, Anchor } from 'lucide-react';

interface HighlightedParagraphProps {
  text: string;
  mainKeyword: string;
  relatedKeywords: [string, string];
  className?: string;
}

interface TextToken {
  type: 'text' | 'link';
  content: string;
  href?: string;
}

/**
 * Tokenizes a string containing markdown links: [anchor text](url)
 */
function parseMarkdownLinks(input: string): TextToken[] {
  const tokens: TextToken[] = [];
  const linkRegex = /\[([^\]]+)\]\(([^)]+)\)/g;
  let lastIndex = 0;
  let match: RegExpExecArray | null;

  while ((match = linkRegex.exec(input)) !== null) {
    if (match.index > lastIndex) {
      tokens.push({
        type: 'text',
        content: input.slice(lastIndex, match.index),
      });
    }
    tokens.push({
      type: 'link',
      content: match[1],
      href: match[2],
    });
    lastIndex = match.index + match[0].length;
  }

  if (lastIndex < input.length) {
    tokens.push({
      type: 'text',
      content: input.slice(lastIndex),
    });
  }

  return tokens;
}

export const HighlightedParagraph: React.FC<HighlightedParagraphProps> = ({
  text,
  mainKeyword,
  relatedKeywords,
  className = '',
}) => {
  // Collect all keywords to search, longest first to avoid partial conflicts
  const keywords = [mainKeyword, ...relatedKeywords].filter(Boolean);
  const escaped = keywords.map((k) => k.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')).join('|');
  const keywordRegex = escaped ? new RegExp(`(${escaped})`, 'gi') : null;

  const tokens = parseMarkdownLinks(text);

  const renderTextWithHighlights = (rawText: string, keyPrefix: string) => {
    const clean = rawText.replace(/\*\*/g, '');
    if (!keywordRegex) {
      return <React.Fragment key={keyPrefix}>{clean}</React.Fragment>;
    }

    const parts = clean.split(keywordRegex);
    return parts.map((part, index) => {
      const lowerPart = part.toLowerCase();
      const isMain = lowerPart === mainKeyword.toLowerCase();
      const isRelated = relatedKeywords.some((rk) => lowerPart === rk.toLowerCase());

      if (isMain) {
        return (
          <mark
            key={`${keyPrefix}-${index}`}
            className="bg-[#B51F2B]/15 text-[#B51F2B] dark:bg-[#B51F2B]/30 dark:text-[#ff7582] font-bold px-1.5 py-0.5 rounded-xs border-b-2 border-[#B51F2B] inline-flex items-center gap-1 mx-0.5 shadow-xs align-baseline not-italic"
            title="Primary Keyword"
          >
            <strong className="font-bold">{part}</strong>
            <span className="text-[8px] font-['Barlow_Condensed'] uppercase tracking-wider bg-[#B51F2B] text-white px-1 py-0.5 rounded-2xs font-semibold leading-none">
              PRIMARY
            </span>
          </mark>
        );
      }

      if (isRelated) {
        return (
          <mark
            key={`${keyPrefix}-${index}`}
            className="bg-amber-500/15 text-amber-900 dark:bg-amber-400/25 dark:text-amber-200 font-bold px-1.5 py-0.5 rounded-xs border-b-2 border-amber-600 inline-flex items-center gap-1 mx-0.5 shadow-xs align-baseline not-italic"
            title="Related Keyword"
          >
            <strong className="font-bold">{part}</strong>
            <span className="text-[8px] font-['Barlow_Condensed'] uppercase tracking-wider bg-amber-600 text-white px-1 py-0.5 rounded-2xs font-semibold leading-none">
              RELATED
            </span>
          </mark>
        );
      }

      return <React.Fragment key={`${keyPrefix}-${index}`}>{part}</React.Fragment>;
    });
  };

  return (
    <p className={className}>
      {tokens.map((token, tIdx) => {
        if (token.type === 'link' && token.href) {
          const isCrashSafety = token.content.toLowerCase().includes('5-star crash safety');
          return (
            <a
              key={tIdx}
              href={token.href}
              target="_blank"
              rel="noopener noreferrer"
              className={`inline-flex items-center gap-1 font-bold underline transition-all duration-200 cursor-pointer mx-0.5 ${
                isCrashSafety
                  ? 'bg-[#B51F2B]/10 hover:bg-[#B51F2B] text-[#B51F2B] hover:text-white px-2 py-0.5 border border-[#B51F2B]/40 no-underline shadow-xs rounded-xs'
                  : 'text-[#B51F2B] dark:text-[#ff7582] hover:text-[#4A101A]'
              }`}
              title={`Anchor Link: "${token.content}" (Opens in new tab)`}
            >
              {isCrashSafety && <Anchor className="w-3 h-3 text-[#B51F2B] inline" />}
              <span>{token.content}</span>
              <ExternalLink className="w-3 h-3 inline shrink-0" />
            </a>
          );
        }

        return renderTextWithHighlights(token.content, `token-${tIdx}`);
      })}
    </p>
  );
};

/**
 * General paragraph renderer supporting markdown links and bold formatting
 */
export const FormattedParagraph: React.FC<{ text: string; className?: string }> = ({
  text,
  className = 'leading-relaxed',
}) => {
  const tokens = parseMarkdownLinks(text);

  return (
    <p className={className}>
      {tokens.map((token, tIdx) => {
        if (token.type === 'link' && token.href) {
          const isCrashSafety = token.content.toLowerCase().includes('5-star crash safety');
          return (
            <a
              key={tIdx}
              href={token.href}
              target="_blank"
              rel="noopener noreferrer"
              className={`inline-flex items-center gap-1 font-bold underline transition-all duration-200 cursor-pointer mx-0.5 ${
                isCrashSafety
                  ? 'bg-[#B51F2B]/10 hover:bg-[#B51F2B] text-[#B51F2B] hover:text-white px-2 py-0.5 border border-[#B51F2B]/40 no-underline shadow-xs rounded-xs'
                  : 'text-[#B51F2B] dark:text-[#ff7582] hover:text-[#4A101A]'
              }`}
              title={`Anchor Link: "${token.content}" (Opens in new tab)`}
            >
              {isCrashSafety && <Anchor className="w-3 h-3 text-[#B51F2B] inline" />}
              <span>{token.content}</span>
              <ExternalLink className="w-3 h-3 inline shrink-0" />
            </a>
          );
        }

        // Parse bold **text** in non-link text
        const boldParts = token.content.split(/(\*\*[^*]+\*\*)/g);
        return (
          <React.Fragment key={tIdx}>
            {boldParts.map((bPart, bIdx) => {
              if (bPart.startsWith('**') && bPart.endsWith('**')) {
                return <strong key={bIdx} className="font-bold text-[#171717] dark:text-white">{bPart.slice(2, -2)}</strong>;
              }
              return <React.Fragment key={bIdx}>{bPart}</React.Fragment>;
            })}
          </React.Fragment>
        );
      })}
    </p>
  );
};
