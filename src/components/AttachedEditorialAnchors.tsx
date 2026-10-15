import React from 'react';
import { ExternalLink, Link2, ShieldCheck, Zap, Compass } from 'lucide-react';

export const AttachedEditorialAnchors: React.FC = () => {
  const anchors = [
    {
      num: '01',
      anchorText: '5-star crash safety ratings',
      blogTitle: 'How Tata Motors & Mahindra Reshaped the Indian SUV Market',
      url: '/indian-suv-market',
      category: 'INDIA AUTO',
      icon: ShieldCheck,
      description:
        'Explore how Tata Motors and Mahindra established 5-star crash safety ratings and modern SUV architectures as the benchmark for Indian automotive buyers.',
      badgeText: 'PRIMARY ANCHOR',
    },
    {
      num: '02',
      anchorText: "India's EV Ecosystem: From Two-Wheelers to Global Export Hub",
      blogTitle: "India's EV Ecosystem: From Two-Wheelers to Global Export Hub",
      url: '/electric-vehicles-india',
      category: 'EV REVOLUTION',
      icon: Zap,
      description:
        'Discover how high-density electric two-wheeler adoption, battery swapping, and tropical thermal management made India a global export powerhouse.',
      badgeText: 'EV HUB ANCHOR',
    },
    {
      num: '03',
      anchorText: 'The Royal Enfield Phenomenon: Engineering Heritage Meets Global Modernity',
      blogTitle: 'The Royal Enfield Phenomenon: Engineering Heritage Meets Global Modernity',
      url: '/royal-enfield-motorcycles',
      category: 'TWO WHEELS',
      icon: Compass,
      description:
        'Learn how Chennai transformed into the global epicenter of mid-size motorcycles through the liquid-cooled Sherpa 450 engine and authentic tactile character.',
      badgeText: 'HERITAGE ANCHOR',
    },
  ];

  return (
    <section
      aria-label="Attached Editorial Anchors"
      className="my-10 p-6 sm:p-8 bg-white dark:bg-[#1a1a1a] border border-[#D9D3C9] dark:border-[#343434] shadow-sm relative overflow-hidden"
    >
      <div className="absolute top-0 right-0 w-64 h-64 bg-[#B51F2B]/5 rounded-full blur-2xl pointer-events-none"></div>

      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center pb-6 border-b border-[#D9D3C9] dark:border-[#343434] gap-3">
        <div>
          <div className="flex items-center space-x-2 text-xs font-['Barlow_Condensed'] tracking-widest text-[#B51F2B] uppercase font-bold">
            <Link2 className="w-4 h-4" />
            <span>ATTACHED EDITORIAL ANCHORS • 3 FLAGSHIP BLOGS</span>
          </div>
          <h2 className="font-['Bebas_Neue'] text-2xl sm:text-3xl uppercase text-[#171717] dark:text-[#FAF8F3] mt-1">
            EXPLORE KEY EDITORIAL ANCHORS (OPENS IN NEW TAB)
          </h2>
        </div>
        <span className="text-xs font-['Barlow_Condensed'] tracking-widest text-[#77736D] dark:text-[#D9D3C9]/70 uppercase">
          VERIFIED TARGET PAGES &amp; DIRECT URL DESTINATIONS
        </span>
      </div>

      {/* 3 Anchor Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-6">
        {anchors.map((item) => {
          const Icon = item.icon;
          return (
            <a
              key={item.num}
              href={item.url}
              target="_blank"
              rel="noopener noreferrer"
              className="group p-5 bg-[#FAF8F3] dark:bg-[#202020] border border-[#D9D3C9] dark:border-[#343434] hover:border-[#B51F2B] dark:hover:border-[#B51F2B] transition-all duration-300 flex flex-col justify-between space-y-4 hover:shadow-md cursor-pointer relative"
              title={`Open anchor "${item.anchorText}" in new tab`}
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-['Barlow_Condensed'] uppercase tracking-widest bg-[#B51F2B] text-white px-2 py-0.5 font-bold">
                    {item.badgeText}
                  </span>
                  <span className="text-xs font-['Barlow_Condensed'] font-bold text-[#77736D] dark:text-[#D9D3C9]/60">
                    BLOG {item.num}
                  </span>
                </div>

                <div>
                  <span className="text-[10px] font-['Barlow_Condensed'] uppercase tracking-widest text-[#B51F2B] font-bold block mb-1">
                    ANCHOR TEXT:
                  </span>
                  <h3 className="font-['Bebas_Neue'] text-xl sm:text-2xl uppercase text-[#171717] dark:text-white group-hover:text-[#B51F2B] transition-colors leading-tight">
                    {item.anchorText}
                  </h3>
                </div>

                <p className="font-['DM_Sans'] text-xs text-[#77736D] dark:text-[#D9D3C9]/80 leading-relaxed">
                  {item.description}
                </p>
              </div>

              <div className="pt-3 border-t border-[#D9D3C9]/60 dark:border-[#343434] flex items-center justify-between text-xs font-['Barlow_Condensed'] uppercase tracking-wider">
                <div className="flex items-center space-x-1.5 text-[#77736D] dark:text-[#D9D3C9]/60 font-mono text-[11px]">
                  <Icon className="w-3.5 h-3.5 text-[#B51F2B]" />
                  <span>{item.url}</span>
                </div>
                <span className="text-[#B51F2B] font-bold group-hover:underline flex items-center space-x-1">
                  <span>READ STORY</span>
                  <ExternalLink className="w-3 h-3 ml-0.5" />
                </span>
              </div>
            </a>
          );
        })}
      </div>
    </section>
  );
};
