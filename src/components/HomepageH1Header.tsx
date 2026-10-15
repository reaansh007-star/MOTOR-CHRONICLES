import React, { useState } from 'react';
import { ArrowDown, Sparkles, ExternalLink, Link as LinkIcon } from 'lucide-react';

interface HomepageH1HeaderProps {
  onExploreClick: () => void;
}

export const HomepageH1Header: React.FC<HomepageH1HeaderProps> = ({ onExploreClick }) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <section
      className="relative bg-[#171717] text-[#FAF8F3] pt-12 pb-12 sm:pt-16 sm:pb-16 px-4 sm:px-6 lg:px-8 border-b border-[#343434] overflow-hidden"
      aria-label="Homepage Main Inquiry"
    >
      {/* Background fine grid & gradient aura */}
      <div className="absolute inset-0 bg-grid-pattern opacity-30 pointer-events-none"></div>
      <div className="absolute top-0 right-1/4 w-96 h-96 bg-[#B51F2B]/10 rounded-full blur-3xl pointer-events-none"></div>

      <div className="max-w-7xl mx-auto relative z-10 space-y-6">
        {/* Editorial Eyebrow Badge */}
        <div className="flex flex-wrap items-center gap-3">
          <span className="inline-flex items-center space-x-1.5 px-3 py-1 bg-[#B51F2B] text-white text-xs font-['Barlow_Condensed'] uppercase tracking-widest font-bold shadow-sm">
            <Sparkles className="w-3.5 h-3.5" />
            <span>EDITORIAL INQUIRY • THE 2026 MOBILITY OUTLOOK</span>
          </span>
          <span className="text-xs font-['Barlow_Condensed'] tracking-widest text-[#D9D3C9]/70 uppercase hidden sm:inline">
            DISPATCH FROM NEW DELHI, PUNE &amp; CHENNAI
          </span>
        </div>

        {/* The Exact Interactive H1 Heading */}
        <div
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
          className="relative transition-all duration-300"
        >
          <h1
            tabIndex={0}
            className="font-['Bebas_Neue'] text-4xl sm:text-6xl md:text-7xl lg:text-8xl tracking-tight leading-[0.96] text-white uppercase select-text transition-colors duration-300 focus:outline-none"
          >
            How Is the{' '}
            <span
              className={`relative inline-block transition-all duration-300 ${
                isHovered
                  ? 'text-white drop-shadow-[0_4px_24px_rgba(181,31,43,0.7)]'
                  : 'text-[#FAF8F3]'
              }`}
            >
              <span className="relative z-10">Indian Automobile Industry</span>
              <span
                className={`absolute bottom-1 left-0 h-2 bg-[#B51F2B] -z-0 transition-all duration-300 ${
                  isHovered ? 'w-full opacity-90' : 'w-24 opacity-60'
                }`}
              ></span>
            </span>{' '}
            Changing the Future of Mobility?
          </h1>

          {/* Interactive Reveal Tag */}
          <div
            className={`transition-all duration-300 text-xs font-['Barlow_Condensed'] uppercase tracking-widest font-bold mt-2.5 flex items-center space-x-2 ${
              isHovered ? 'text-[#B51F2B] opacity-100 translate-x-1' : 'text-[#D9D3C9]/70 opacity-70'
            }`}
          >
            <span className="inline-block w-2 h-2 rounded-full bg-[#B51F2B] animate-ping"></span>
            <span>HOVER TO SPOTLIGHT • EXAMINING SAFETY, ELECTRIFICATION &amp; TWO-WHEELED INNOVATION</span>
          </div>
        </div>

        {/* Short, clear answer of 1-2 lines */}
        <div className="max-w-4xl border-l-3 border-[#B51F2B] pl-5 sm:pl-6 py-1">
          <p className="font-['DM_Sans'] text-base sm:text-lg lg:text-xl text-[#FAF8F3]/90 leading-relaxed font-normal">
            The Indian automobile industry is redefining global mobility through homegrown 5-star safety SUVs, mass electric two-wheeler adoption, iconic motorcycle engineering, and software-driven platforms engineered to master extreme real-world conditions.
          </p>
        </div>

        {/* Call to Action & Pillar Badges */}
        <div className="pt-2 flex flex-wrap items-center gap-6">
          <button
            type="button"
            onClick={onExploreClick}
            className="inline-flex items-center space-x-3 bg-[#B51F2B] hover:bg-[#4A101A] text-white font-['Barlow_Condensed'] uppercase tracking-widest text-sm font-bold px-8 py-4 transition-all duration-300 transform hover:-translate-y-0.5 shadow-xl cursor-pointer group"
          >
            <span>EXPLORE THE STORIES</span>
            <ArrowDown className="w-4 h-4 group-hover:translate-y-1 transition-transform" />
          </button>

          {/* Direct Anchor Pillars */}
          <div className="flex flex-wrap items-center gap-2 text-xs font-['Barlow_Condensed'] uppercase tracking-wider text-[#D9D3C9]/70">
            <a
              href="/indian-suv-market"
              target="_blank"
              rel="noopener noreferrer"
              className="px-2.5 py-1 bg-white/5 hover:bg-[#B51F2B] border border-white/10 hover:border-[#B51F2B] text-white font-semibold transition-colors flex items-center space-x-1"
              title="Anchor: 5-star crash safety ratings"
            >
              <span>01. 5-star crash safety ratings</span>
              <ExternalLink className="w-2.5 h-2.5" />
            </a>
            <a
              href="/electric-vehicles-india"
              target="_blank"
              rel="noopener noreferrer"
              className="px-2.5 py-1 bg-white/5 hover:bg-[#B51F2B] border border-white/10 hover:border-[#B51F2B] text-white font-semibold transition-colors flex items-center space-x-1"
              title="Anchor to Electric Vehicles in India Story"
            >
              <span>02. Electric Vehicles</span>
              <ExternalLink className="w-2.5 h-2.5" />
            </a>
            <a
              href="/royal-enfield-motorcycles"
              target="_blank"
              rel="noopener noreferrer"
              className="px-2.5 py-1 bg-white/5 hover:bg-[#B51F2B] border border-white/10 hover:border-[#B51F2B] text-white font-semibold transition-colors flex items-center space-x-1"
              title="Anchor to Royal Enfield Motorcycle Story"
            >
              <span>03. Motorcycle Engineering</span>
              <ExternalLink className="w-2.5 h-2.5" />
            </a>
            <span className="px-2.5 py-1 bg-white/5 border border-white/10 text-[#D9D3C9]/60 font-medium">
              04. Emerging Mobility Tech
            </span>
          </div>
        </div>

        {/* Dedicated Flagship Editorial Anchors Ribbon */}
        <div className="pt-6 border-t border-white/10 space-y-3">
          <div className="flex items-center space-x-2 text-xs font-['Barlow_Condensed'] uppercase tracking-widest text-[#B51F2B] font-bold">
            <LinkIcon className="w-3.5 h-3.5" />
            <span>ATTACHED EDITORIAL ANCHORS • 3 FLAGSHIP STORIES (CLICK TO OPEN IN NEW TAB):</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-3.5">
            {/* Anchor 1: 5-star crash safety ratings (How Tata Motors & Mahindra Reshaped the Indian SUV Market) */}
            <a
              href="/indian-suv-market"
              target="_blank"
              rel="noopener noreferrer"
              className="p-4 bg-white/5 hover:bg-[#B51F2B]/15 border border-white/10 hover:border-[#B51F2B] transition-all duration-200 group flex items-start space-x-3.5 shadow-sm"
              title="Anchor: 5-star crash safety ratings"
            >
              <span className="font-['Barlow_Condensed'] text-[#B51F2B] font-bold text-base px-2 py-0.5 bg-[#B51F2B]/10 border border-[#B51F2B]/30 shrink-0">
                01
              </span>
              <div className="space-y-1 flex-1 min-w-0">
                <span className="text-[10px] font-['Barlow_Condensed'] uppercase tracking-widest text-[#B51F2B] font-bold block">
                  ANCHOR TEXT: 5-STAR CRASH SAFETY RATINGS
                </span>
                <p className="font-['Bebas_Neue'] text-xl sm:text-2xl text-white group-hover:text-[#B51F2B] leading-snug uppercase transition-colors">
                  5-star crash safety ratings
                </p>
                <span className="text-xs font-['Barlow_Condensed'] uppercase tracking-widest text-[#D9D3C9]/70 block">
                  Blog: How Tata Motors &amp; Mahindra Reshaped the Indian SUV Market
                </span>
                <span className="text-[10px] font-['Barlow_Condensed'] uppercase tracking-widest text-[#B51F2B] font-bold block">
                  URL: /indian-suv-market
                </span>
              </div>
              <ExternalLink className="w-4 h-4 text-[#77736D] group-hover:text-[#B51F2B] transition-colors shrink-0 mt-1" />
            </a>

            {/* Anchor 2: India's EV Ecosystem: From Two-Wheelers to Global Export Hub */}
            <a
              href="/electric-vehicles-india"
              target="_blank"
              rel="noopener noreferrer"
              className="p-4 bg-white/5 hover:bg-[#B51F2B]/15 border border-white/10 hover:border-[#B51F2B] transition-all duration-200 group flex items-start space-x-3.5 shadow-sm"
              title="2] India's EV Ecosystem: From Two-Wheelers to Global Export Hub"
            >
              <span className="font-['Barlow_Condensed'] text-[#B51F2B] font-bold text-base px-2 py-0.5 bg-[#B51F2B]/10 border border-[#B51F2B]/30 shrink-0">
                02
              </span>
              <div className="space-y-1 flex-1 min-w-0">
                <span className="text-[10px] font-['Barlow_Condensed'] uppercase tracking-widest text-[#B51F2B] font-bold block">
                  ELECTRIC VEHICLES IN INDIA • FLAGSHIP 2
                </span>
                <p className="font-['Bebas_Neue'] text-xl sm:text-2xl text-white group-hover:text-[#B51F2B] leading-snug uppercase transition-colors">
                  India's EV Ecosystem: From Two-Wheelers to Global Export Hub
                </p>
                <span className="text-xs font-['Barlow_Condensed'] uppercase tracking-widest text-[#D9D3C9]/60 block">
                  URL: /electric-vehicles-india
                </span>
              </div>
              <ExternalLink className="w-4 h-4 text-[#77736D] group-hover:text-[#B51F2B] transition-colors shrink-0 mt-1" />
            </a>

            {/* Anchor 3: The Royal Enfield Phenomenon: Engineering Heritage Meets Global Modernity */}
            <a
              href="/royal-enfield-motorcycles"
              target="_blank"
              rel="noopener noreferrer"
              className="p-4 bg-white/5 hover:bg-[#B51F2B]/15 border border-white/10 hover:border-[#B51F2B] transition-all duration-200 group flex items-start space-x-3.5 shadow-sm"
              title="3] The Royal Enfield Phenomenon: Engineering Heritage Meets Global Modernity"
            >
              <span className="font-['Barlow_Condensed'] text-[#B51F2B] font-bold text-base px-2 py-0.5 bg-[#B51F2B]/10 border border-[#B51F2B]/30 shrink-0">
                03
              </span>
              <div className="space-y-1 flex-1 min-w-0">
                <span className="text-[10px] font-['Barlow_Condensed'] uppercase tracking-widest text-[#B51F2B] font-bold block">
                  ROYAL ENFIELD MOTORCYCLES • FLAGSHIP 3
                </span>
                <p className="font-['Bebas_Neue'] text-xl sm:text-2xl text-white group-hover:text-[#B51F2B] leading-snug uppercase transition-colors">
                  The Royal Enfield Phenomenon: Engineering Heritage Meets Global Modernity
                </p>
                <span className="text-xs font-['Barlow_Condensed'] uppercase tracking-widest text-[#D9D3C9]/60 block">
                  URL: /royal-enfield-motorcycles
                </span>
              </div>
              <ExternalLink className="w-4 h-4 text-[#77736D] group-hover:text-[#B51F2B] transition-colors shrink-0 mt-1" />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};
