import React from 'react';
import { ArrowUp } from 'lucide-react';
import { ArticleCategory } from '../types';

interface FooterProps {
  onSelectCategory: (cat: ArticleCategory | 'ALL') => void;
  onOpenComparison: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onSelectCategory, onOpenComparison }) => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-[#171717] text-[#FAF8F3]/70 border-t border-[#343434] mt-20 text-xs font-['Barlow_Condensed'] tracking-wider uppercase">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
          
          {/* Brand Intro */}
          <div className="space-y-3">
            <span className="font-['Bebas_Neue'] text-3xl text-white block">
              MOTOR<span className="text-[#B51F2B]">.</span>CHRONICLES
            </span>
            <p className="font-['Cormorant_Garamond'] normal-case text-sm text-[#F1E6D2]/60 italic leading-relaxed">
              A dedicated digital automotive publication celebrating automotive engineering, Indian mobility, global motorcycles, supercars, and high-performance racing.
            </p>
            <div className="pt-2 text-[11px] text-[#D9D3C9]/50">
              EDITORIAL HEADQUARTERS: NEW DELHI • MARANELLO • SILVERSTONE
            </div>
          </div>

          {/* Categories */}
          <div>
            <h4 className="text-white font-bold mb-3 border-b border-[#343434] pb-1 tracking-widest text-sm">
              EDITORIAL SECTIONS
            </h4>
            <ul className="space-y-2">
              <li>
                <button
                  onClick={() => onSelectCategory('INDIA AUTO')}
                  className="hover:text-[#B51F2B] transition-colors cursor-pointer"
                >
                  India Automotive Landscape
                </button>
              </li>
              <li>
                <button
                  onClick={() => onSelectCategory('EV REVOLUTION')}
                  className="hover:text-[#B51F2B] transition-colors cursor-pointer"
                >
                  EV Mobility &amp; Battery Tech
                </button>
              </li>
              <li>
                <button
                  onClick={() => onSelectCategory('TWO WHEELS')}
                  className="hover:text-[#B51F2B] transition-colors cursor-pointer"
                >
                  Global Motorcycles &amp; ADV Touring
                </button>
              </li>
              <li>
                <button
                  onClick={() => onSelectCategory('PERFORMANCE')}
                  className="hover:text-[#B51F2B] transition-colors cursor-pointer"
                >
                  Supercars &amp; Performance
                </button>
              </li>
              <li>
                <button
                  onClick={() => onSelectCategory('MOTORSPORT')}
                  className="hover:text-[#B51F2B] transition-colors cursor-pointer"
                >
                  Motorsport &amp; Formula 1
                </button>
              </li>
              <li>
                <button
                  onClick={onOpenComparison}
                  className="hover:text-[#B51F2B] transition-colors cursor-pointer text-[#B51F2B] font-bold"
                >
                  ★ Head-To-Head Machine Showdown
                </button>
              </li>
            </ul>
          </div>

          {/* Editorial Scope */}
          <div>
            <h4 className="text-white font-bold mb-3 border-b border-[#343434] pb-1 tracking-widest text-sm">
              EDITORIAL FOCUS
            </h4>
            <ul className="space-y-2 normal-case font-['DM_Sans'] text-xs text-[#FAF8F3]/60">
              <li>• Indian Car Market Structural Analysis</li>
              <li>• Tata Motors &amp; Mahindra Platform Engineering</li>
              <li>• Electric Two-Wheeler Thermal Performance</li>
              <li>• Formula 1 Aerodynamics &amp; MGU-K Tech</li>
              <li>• Classic Car Heritage &amp; Hand-Wheeled Restoration</li>
            </ul>
          </div>

          {/* Legal & Disclosures */}
          <div className="space-y-3">
            <h4 className="text-white font-bold mb-3 border-b border-[#343434] pb-1 tracking-widest text-sm">
              LEGAL &amp; DISCLOSURES
            </h4>
            <p className="normal-case font-['DM_Sans'] text-xs text-[#FAF8F3]/60 leading-relaxed">
              Motor Chronicles is an independent digital magazine. All vehicle names, logos, and trademarks belong to their respective manufacturers.
            </p>
            <div className="pt-2">
              <button
                onClick={scrollToTop}
                className="inline-flex items-center space-x-2 border border-[#343434] px-3 py-1.5 hover:border-[#B51F2B] hover:text-white transition-colors cursor-pointer text-xs"
              >
                <ArrowUp className="w-3.5 h-3.5 text-[#B51F2B]" />
                <span>BACK TO TOP</span>
              </button>
            </div>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="border-t border-[#343434] pt-6 flex flex-col sm:flex-row justify-between items-center text-[#FAF8F3]/40 gap-3">
          <p>&copy; 2026 MOTOR CHRONICLES. ALL RIGHTS RESERVED.</p>
          <p>STORIES BEHIND THE MACHINES • ISSUE NO. 42</p>
        </div>
      </div>
    </footer>
  );
};
