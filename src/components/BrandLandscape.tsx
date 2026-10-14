import React, { useState } from 'react';
import { X, ArrowRight, ShieldCheck, Zap, Factory } from 'lucide-react';
import { BrandProfile } from '../types';

interface BrandLandscapeProps {
  brands: BrandProfile[];
  onFilterByBrand: (brandName: string) => void;
}

export const BrandLandscape: React.FC<BrandLandscapeProps> = ({ brands, onFilterByBrand }) => {
  const [selectedBrand, setSelectedBrand] = useState<BrandProfile | null>(null);

  return (
    <section className="mt-20 pt-12 border-t border-[#D9D3C9] dark:border-[#343434]">
      {/* Section Header */}
      <div className="flex flex-col md:flex-row justify-between items-baseline mb-8 gap-2">
        <div>
          <span className="text-xs font-['Barlow_Condensed'] tracking-widest text-[#B51F2B] uppercase font-bold">
            INDIAN AUTOMOTIVE FOOTPRINT
          </span>
          <h2 className="font-['Bebas_Neue'] text-3xl sm:text-4xl uppercase text-[#171717] dark:text-[#FAF8F3]">
            PROMINENT MANUFACTURERS IN INDIA
          </h2>
        </div>
        <span className="text-xs font-['Barlow_Condensed'] tracking-widest text-[#77736D] dark:text-[#D9D3C9]/60 uppercase">
          ACTIVE MARKET LEADERS &amp; GLOBAL PLAYERS • CLICK FOR DOSSIER
        </span>
      </div>

      {/* Brand Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-4 text-center">
        {brands.map((brand) => (
          <div
            key={brand.id}
            onClick={() => setSelectedBrand(brand)}
            className="p-5 border border-[#D9D3C9] dark:border-[#343434] bg-white dark:bg-[#1a1a1a] hover:border-[#B51F2B] dark:hover:border-[#B51F2B] transition-all duration-200 cursor-pointer group flex flex-col justify-between shadow-sm hover:shadow-md transform hover:-translate-y-1"
          >
            <div>
              <span className="font-['Bebas_Neue'] text-xl sm:text-2xl text-[#171717] dark:text-[#FAF8F3] group-hover:text-[#B51F2B] transition-colors block">
                {brand.name}
              </span>
              <p className="text-[10px] font-['Barlow_Condensed'] text-[#77736D] dark:text-[#D9D3C9]/70 uppercase mt-1 leading-snug">
                {brand.tagline}
              </p>
            </div>
            <div className="mt-3 pt-2 border-t border-[#D9D3C9]/40 dark:border-[#343434] text-[9px] font-['Barlow_Condensed'] uppercase tracking-widest text-[#B51F2B] font-bold">
              VIEW DOSSIER
            </div>
          </div>
        ))}
      </div>

      {/* Brand Profile Modal */}
      {selectedBrand && (
        <div className="fixed inset-0 z-50 bg-[#171717]/85 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-[#FAF8F3] dark:bg-[#1a1a1a] border border-[#D9D3C9] dark:border-[#343434] w-full max-w-xl p-6 sm:p-8 shadow-2xl relative space-y-6 text-[#171717] dark:text-[#FAF8F3]">
            
            {/* Modal Header */}
            <div className="flex justify-between items-start border-b border-[#D9D3C9] dark:border-[#343434] pb-4">
              <div>
                <span className="text-xs font-['Barlow_Condensed'] tracking-widest text-[#B51F2B] uppercase font-bold">
                  MANUFACTURER PROFILE • EST. {selectedBrand.founded}
                </span>
                <h3 className="font-['Bebas_Neue'] text-3xl sm:text-4xl uppercase text-[#171717] dark:text-white mt-1">
                  {selectedBrand.name}
                </h3>
                <p className="font-['Cormorant_Garamond'] text-sm sm:text-base italic text-[#77736D] dark:text-[#D9D3C9]/80">
                  {selectedBrand.tagline}
                </p>
              </div>
              <button
                onClick={() => setSelectedBrand(null)}
                className="text-[#77736D] hover:text-[#B51F2B] transition-colors p-1 cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Body */}
            <div className="space-y-4 text-sm font-['DM_Sans'] text-[#343434] dark:text-[#D9D3C9]/90">
              <div className="space-y-1">
                <span className="text-xs font-['Barlow_Condensed'] uppercase tracking-widest font-bold text-[#77736D] dark:text-[#D9D3C9]/60">
                  ORIGIN &amp; HEADQUARTERS
                </span>
                <p className="font-semibold text-base">{selectedBrand.origin}</p>
              </div>

              <div className="space-y-1">
                <span className="text-xs font-['Barlow_Condensed'] uppercase tracking-widest font-bold text-[#77736D] dark:text-[#D9D3C9]/60">
                  HERITAGE &amp; MARKET POSITION
                </span>
                <p className="leading-relaxed">{selectedBrand.heritage}</p>
              </div>

              <div className="space-y-1">
                <span className="text-xs font-['Barlow_Condensed'] uppercase tracking-widest font-bold text-[#77736D] dark:text-[#D9D3C9]/60">
                  ICONIC FLEET &amp; FLAGSHIPS
                </span>
                <div className="flex flex-wrap gap-1.5 pt-1">
                  {selectedBrand.iconicVehicles.map((v, i) => (
                    <span
                      key={i}
                      className="px-2.5 py-1 bg-[#171717] text-white text-xs font-['Barlow_Condensed'] uppercase font-bold tracking-wider"
                    >
                      {v}
                    </span>
                  ))}
                </div>
              </div>

              <div className="space-y-1 bg-[#F1E6D2]/60 dark:bg-[#242424] p-3.5 border-l-2 border-[#B51F2B]">
                <span className="text-xs font-['Barlow_Condensed'] uppercase tracking-widest font-bold text-[#B51F2B] flex items-center space-x-1.5">
                  <Zap className="w-3.5 h-3.5" />
                  <span>EV &amp; MOBILITY TRANSITION</span>
                </span>
                <p className="text-xs leading-relaxed text-[#171717] dark:text-[#FAF8F3]">
                  {selectedBrand.evStrategy}
                </p>
              </div>
            </div>

            {/* Modal Footer / Filter */}
            <div className="pt-2 border-t border-[#D9D3C9] dark:border-[#343434] flex flex-col sm:flex-row justify-between items-center gap-3">
              <span className="text-xs font-['Barlow_Condensed'] tracking-wider uppercase text-[#77736D] dark:text-[#D9D3C9]/60">
                {selectedBrand.marketShareHighlight}
              </span>
              <button
                onClick={() => {
                  onFilterByBrand(selectedBrand.name.split(' ')[0]);
                  setSelectedBrand(null);
                }}
                className="w-full sm:w-auto bg-[#B51F2B] hover:bg-[#4A101A] text-white px-5 py-2.5 font-['Barlow_Condensed'] uppercase font-bold text-xs tracking-widest flex items-center justify-center space-x-2 transition-colors cursor-pointer"
              >
                <span>SHOW STORIES FOR {selectedBrand.name.split(' ')[0]}</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>

          </div>
        </div>
      )}
    </section>
  );
};
