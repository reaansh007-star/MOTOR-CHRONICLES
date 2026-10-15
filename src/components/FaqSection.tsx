import React, { useState } from 'react';
import { HelpCircle, ChevronDown, ChevronUp, Sparkles, BookOpen } from 'lucide-react';
import { FormattedParagraph } from './HighlightedParagraph';

export interface FaqItem {
  id: string;
  question: string;
  answer: string;
  detail?: string;
}

export const FAQ_ITEMS: FaqItem[] = [
  {
    id: 'faq-1',
    question: 'What is Car News India on Motor Chronicles?',
    answer:
      'Car News India is Motor Chronicles’ dedicated editorial coverage of the Indian automotive industry, focusing on domestic market trends, manufacturer milestones, and vehicle technology.',
    detail:
      'Rather than publishing superficial press releases, our stories delve into the engineering decisions, safety benchmarks, and strategic shifts driving mobility across the subcontinent.',
  },
  {
    id: 'faq-2',
    question: 'Where can readers find Indian SUV market updates?',
    answer:
      'Readers can explore our dedicated India Auto archive and in-depth report on [5-star crash safety ratings](/indian-suv-market), featuring analyses of Tata vs Mahindra SUVs, Bharat NCAP crash safety ratings, and monocoque platform design.',
    detail:
      'Our reports trace the evolution of indigenous SUVs from utilitarian rural workhorses into high-tech leaders with [5-star crash safety ratings](/indian-suv-market) dominating highway sales.',
  },
  {
    id: 'faq-3',
    question: 'What can readers learn about electric vehicles in India?',
    answer:
      'Motor Chronicles breaks down [India\'s EV Ecosystem: From Two-Wheelers to Global Export Hub](/electric-vehicles-india) with analyses of rapid electric two-wheeler adoption, battery swapping networks, and localized EV battery technology.',
    detail:
      'We examine how Indian engineers solve high ambient heat challenges with phase-change thermal cooling, expanding domestic innovation into global export markets.',
  },
  {
    id: 'faq-4',
    question: 'What topics does Motor Chronicles cover?',
    answer:
      'Motor Chronicles covers five core editorial pillars: Indian car market developments, the EV revolution, global motorcycle engineering, iconic supercars, and Formula 1 motorsport.',
    detail:
      'Every feature is written with technical depth, historical context, and telemetry benchmarks for passionate driving and riding enthusiasts.',
  },
  {
    id: 'faq-5',
    question: 'Where can readers explore automotive engineering and motorcycle stories?',
    answer:
      'You can explore [The Royal Enfield Phenomenon: Engineering Heritage Meets Global Modernity](/royal-enfield-motorcycles) in our Two Wheels section, examining the Sherpa 450 engine, or launch our interactive Machine Showdown comparison tool.',
    detail:
      'Readers can compare side-by-side power, torque, curb weight, and 0–100 km/h sprint telemetry between iconic road machines.',
  },
];

export function getFaqSchemaJsonLd(): object {
  const clean = (str: string) => str.replace(/\[([^\]]+)\]\([^)]+\)/g, '$1');
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: FAQ_ITEMS.map((item) => ({
      '@type': 'Question',
      name: item.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: item.detail ? `${clean(item.answer)} ${clean(item.detail)}` : clean(item.answer),
      },
    })),
  };
}

export const FaqSection: React.FC = () => {
  const [openId, setOpenId] = useState<string | null>('faq-1');

  const toggleFaq = (id: string) => {
    setOpenId((prev) => (prev === id ? null : id));
  };

  return (
    <section className="mt-20 pt-12 border-t border-[#D9D3C9] dark:border-[#343434]">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-baseline mb-8 gap-2">
        <div>
          <div className="flex items-center space-x-2 text-xs font-['Barlow_Condensed'] tracking-widest text-[#B51F2B] uppercase font-bold">
            <HelpCircle className="w-4 h-4" />
            <span>COMMONLY SEARCHED AUTOMOTIVE QUESTIONS</span>
          </div>
          <h2 className="font-['Bebas_Neue'] text-3xl sm:text-4xl uppercase text-[#171717] dark:text-[#FAF8F3] mt-1">
            FREQUENTLY ASKED QUESTIONS — CAR NEWS &amp; MOBILITY INDIA
          </h2>
        </div>
        <span className="text-xs font-['Barlow_Condensed'] tracking-widest text-[#77736D] dark:text-[#D9D3C9]/60 uppercase">
          CLEAR ANSWERS ON INDIAN AUTOMOTIVE JOURNALISM
        </span>
      </div>

      {/* FAQ Accordion List */}
      <div className="space-y-4">
        {FAQ_ITEMS.map((item, index) => {
          const isOpen = openId === item.id;
          return (
            <div
              key={item.id}
              className="border border-[#D9D3C9] dark:border-[#343434] bg-white dark:bg-[#1a1a1a] transition-all duration-200 overflow-hidden shadow-xs hover:border-[#B51F2B]"
            >
              <button
                type="button"
                onClick={() => toggleFaq(item.id)}
                className="w-full text-left p-5 sm:p-6 flex justify-between items-center gap-4 cursor-pointer focus:outline-none"
                aria-expanded={isOpen}
              >
                <div className="flex items-start space-x-3">
                  <span className="font-['Barlow_Condensed'] text-[#B51F2B] font-bold text-sm sm:text-base pt-0.5 shrink-0">
                    0{index + 1}.
                  </span>
                  <h3 className="font-['Bebas_Neue'] text-xl sm:text-2xl text-[#171717] dark:text-white uppercase leading-snug">
                    {item.question}
                  </h3>
                </div>
                <div className="p-1 rounded-none bg-black/5 dark:bg-white/5 text-[#77736D] shrink-0">
                  {isOpen ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                </div>
              </button>

              {isOpen && (
                <div className="px-5 pb-6 sm:px-6 sm:pb-6 pt-0 space-y-3 border-t border-[#D9D3C9]/40 dark:border-[#343434]/60 text-sm font-['DM_Sans'] text-[#343434] dark:text-[#D9D3C9]">
                  <FormattedParagraph
                    text={item.answer}
                    className="leading-relaxed font-medium text-[#171717] dark:text-white"
                  />
                  {item.detail && (
                    <FormattedParagraph
                      text={item.detail}
                      className="leading-relaxed text-xs text-[#77736D] dark:text-[#D9D3C9]/70 pt-1"
                    />
                  )}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </section>
  );
};
