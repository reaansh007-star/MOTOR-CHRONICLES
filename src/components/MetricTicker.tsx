import React from 'react';
import { Gauge, ShieldCheck, Zap, TrendingUp, Trophy } from 'lucide-react';

export const MetricTicker: React.FC = () => {
  const metrics = [
    {
      icon: TrendingUp,
      title: '#3 GLOBALLY',
      detail: 'India is the world’s 3rd largest automobile market by volume',
    },
    {
      icon: Gauge,
      title: '52.4% SUV SHARE',
      detail: 'SUVs & Crossovers comprise majority of domestic passenger car sales',
    },
    {
      icon: ShieldCheck,
      title: '5-STAR NCAP ERA',
      detail: 'Bharat NCAP & Global NCAP transformed consumer safety demands',
    },
    {
      icon: Zap,
      title: '2-WHEELER EV SURGE',
      detail: 'Over 1.2M electric two-wheelers registered annually',
    },
    {
      icon: Trophy,
      title: '85% MIDSIZE DOMINANCE',
      detail: 'Royal Enfield leads the 250cc–750cc global retro motorcycling category',
    },
  ];

  return (
    <div className="bg-[#171717] text-[#FAF8F3] border-b border-[#343434] py-4 px-4 sm:px-6 overflow-x-auto">
      <div className="max-w-7xl mx-auto flex items-center justify-between gap-6 min-w-[700px]">
        {metrics.map((item, idx) => {
          const Icon = item.icon;
          return (
            <div key={idx} className="flex items-center space-x-3 shrink-0">
              <div className="w-8 h-8 rounded-none bg-[#B51F2B]/20 border border-[#B51F2B]/40 flex items-center justify-center text-[#B51F2B]">
                <Icon className="w-4 h-4" />
              </div>
              <div>
                <p className="font-['Bebas_Neue'] text-lg tracking-wide text-white leading-tight">
                  {item.title}
                </p>
                <p className="font-['Barlow_Condensed'] text-xs text-[#D9D3C9]/70 uppercase tracking-wider">
                  {item.detail}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
