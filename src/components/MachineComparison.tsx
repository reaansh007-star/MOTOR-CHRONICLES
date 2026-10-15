import React, { useState } from 'react';
import { X, SlidersHorizontal, Trophy, Gauge, Zap, CheckCircle2 } from 'lucide-react';
import { MachineShowdown } from '../types';
import { PageKeywordsBanner } from './PageKeywordsBanner';

interface MachineComparisonProps {
  isOpen: boolean;
  onClose: () => void;
  showdowns: MachineShowdown[];
}

export const MachineComparison: React.FC<MachineComparisonProps> = ({
  isOpen,
  onClose,
  showdowns,
}) => {
  const [activeIdx, setActiveIdx] = useState(0);

  if (!isOpen) return null;

  const current = showdowns[activeIdx] || showdowns[0];
  const { vehicleA, vehicleB, editorialVerdict } = current;

  // Max calculations for bar rendering
  const maxPower = Math.max(vehicleA.powerHp, vehicleB.powerHp, 100);
  const maxTorque = Math.max(vehicleA.torqueNm, vehicleB.torqueNm, 100);
  const maxSpeed = Math.max(vehicleA.topSpeedKmh, vehicleB.topSpeedKmh, 100);

  return (
    <div className="fixed inset-0 z-50 bg-[#171717]/95 backdrop-blur-md overflow-y-auto flex items-start justify-center p-4 sm:p-6 lg:p-10">
      <div className="bg-[#FAF8F3] dark:bg-[#1a1a1a] border border-[#D9D3C9] dark:border-[#343434] w-full max-w-5xl shadow-2xl relative my-auto text-[#171717] dark:text-[#FAF8F3] overflow-hidden">
        
        {/* Header */}
        <div className="p-6 bg-[#F1E6D2] dark:bg-[#1f1f1f] border-b border-[#D9D3C9] dark:border-[#343434] flex justify-between items-center">
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-[#B51F2B] text-white">
              <SlidersHorizontal className="w-5 h-5" />
            </div>
            <div>
              <span className="text-xs font-['Barlow_Condensed'] uppercase tracking-widest text-[#B51F2B] font-bold">
                HEAD-TO-HEAD SPEC SHOWDOWN
              </span>
              <h2 className="font-['Bebas_Neue'] text-3xl sm:text-4xl uppercase tracking-wide leading-tight">
                {current.title}
              </h2>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 text-[#77736D] hover:text-[#B51F2B] transition-colors cursor-pointer"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Matchup Tabs */}
        <div className="flex border-b border-[#D9D3C9] dark:border-[#343434] bg-white/50 dark:bg-[#171717] overflow-x-auto">
          {showdowns.map((showdown, idx) => (
            <button
              key={showdown.id}
              onClick={() => setActiveIdx(idx)}
              className={`px-6 py-3.5 text-xs font-['Barlow_Condensed'] uppercase tracking-wider font-bold whitespace-nowrap border-r border-[#D9D3C9] dark:border-[#343434] transition-colors cursor-pointer ${
                activeIdx === idx
                  ? 'bg-[#B51F2B] text-white'
                  : 'text-[#171717] dark:text-[#FAF8F3] hover:bg-black/5 dark:hover:bg-white/5'
              }`}
            >
              {showdown.title}
            </button>
          ))}
        </div>

        {/* Content Area */}
        <div className="p-6 sm:p-8 space-y-6 max-h-[75vh] overflow-y-auto">
          {/* Page Target Keywords */}
          <PageKeywordsBanner
            mainKeyword="Machine Specification Showdown"
            relatedKeywords={['power & torque telemetry', '0-100 km/h acceleration duel']}
            variant="article"
          />

          <p className="font-['Cormorant_Garamond'] text-lg sm:text-xl italic text-[#77736D] dark:text-[#D9D3C9] text-center max-w-3xl mx-auto">
            "{current.subtitle}"
          </p>

          {/* Side by Side Vehicles */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-stretch">
            
            {/* Vehicle A */}
            <div className="border border-[#D9D3C9] dark:border-[#343434] bg-white dark:bg-[#242424] p-5 space-y-4 flex flex-col justify-between">
              <div className="space-y-3">
                <div className="relative overflow-hidden h-44 bg-black border border-[#D9D3C9] dark:border-[#343434]">
                  <img
                    src={vehicleA.image}
                    alt={vehicleA.name}
                    className="w-full h-full object-cover"
                  />
                  <span className="absolute top-2 left-2 bg-[#171717] text-white text-[10px] font-['Barlow_Condensed'] uppercase tracking-widest px-2 py-0.5 font-bold">
                    {vehicleA.category}
                  </span>
                </div>
                <div>
                  <h3 className="font-['Bebas_Neue'] text-2xl uppercase text-[#171717] dark:text-white">
                    {vehicleA.name}
                  </h3>
                  <p className="text-xs font-['Barlow_Condensed'] uppercase tracking-wider text-[#B51F2B] font-bold">
                    {vehicleA.subtitle}
                  </p>
                </div>
              </div>

              {/* Specs List A */}
              <div className="space-y-3 pt-3 border-t border-[#D9D3C9]/60 dark:border-[#343434] text-xs font-['Barlow_Condensed'] uppercase tracking-wider">
                <div className="flex justify-between">
                  <span className="text-[#77736D]">Power Unit</span>
                  <span className="font-bold text-[#171717] dark:text-white">{vehicleA.powerUnit}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[#77736D]">Drivetrain</span>
                  <span className="font-bold text-[#171717] dark:text-white">{vehicleA.drivetrain}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[#77736D]">Range / Efficiency</span>
                  <span className="font-bold text-[#171717] dark:text-white">{vehicleA.rangeOrMileage}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[#77736D]">Estimated Price</span>
                  <span className="font-bold text-[#B51F2B]">{vehicleA.priceBracket}</span>
                </div>
              </div>
            </div>

            {/* Vehicle B */}
            <div className="border border-[#D9D3C9] dark:border-[#343434] bg-white dark:bg-[#242424] p-5 space-y-4 flex flex-col justify-between">
              <div className="space-y-3">
                <div className="relative overflow-hidden h-44 bg-black border border-[#D9D3C9] dark:border-[#343434]">
                  <img
                    src={vehicleB.image}
                    alt={vehicleB.name}
                    className="w-full h-full object-cover"
                  />
                  <span className="absolute top-2 left-2 bg-[#171717] text-white text-[10px] font-['Barlow_Condensed'] uppercase tracking-widest px-2 py-0.5 font-bold">
                    {vehicleB.category}
                  </span>
                </div>
                <div>
                  <h3 className="font-['Bebas_Neue'] text-2xl uppercase text-[#171717] dark:text-white">
                    {vehicleB.name}
                  </h3>
                  <p className="text-xs font-['Barlow_Condensed'] uppercase tracking-wider text-[#B51F2B] font-bold">
                    {vehicleB.subtitle}
                  </p>
                </div>
              </div>

              {/* Specs List B */}
              <div className="space-y-3 pt-3 border-t border-[#D9D3C9]/60 dark:border-[#343434] text-xs font-['Barlow_Condensed'] uppercase tracking-wider">
                <div className="flex justify-between">
                  <span className="text-[#77736D]">Power Unit</span>
                  <span className="font-bold text-[#171717] dark:text-white">{vehicleB.powerUnit}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[#77736D]">Drivetrain</span>
                  <span className="font-bold text-[#171717] dark:text-white">{vehicleB.drivetrain}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[#77736D]">Range / Efficiency</span>
                  <span className="font-bold text-[#171717] dark:text-white">{vehicleB.rangeOrMileage}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[#77736D]">Estimated Price</span>
                  <span className="font-bold text-[#B51F2B]">{vehicleB.priceBracket}</span>
                </div>
              </div>
            </div>

          </div>

          {/* Visual Telemetry Bars */}
          <div className="bg-white dark:bg-[#242424] border border-[#D9D3C9] dark:border-[#343434] p-6 space-y-6">
            <h4 className="font-['Bebas_Neue'] text-2xl uppercase tracking-wide border-b border-[#D9D3C9] dark:border-[#343434] pb-2 flex items-center space-x-2">
              <Gauge className="w-5 h-5 text-[#B51F2B]" />
              <span>HEAD-TO-HEAD METRIC BARS</span>
            </h4>

            {/* Metric 1: Power (Hp) */}
            <div className="space-y-2">
              <div className="flex justify-between text-xs font-['Barlow_Condensed'] uppercase tracking-wider font-bold">
                <span>{vehicleA.name.split(' ')[0]}: {vehicleA.powerHp} HP</span>
                <span className="text-[#77736D]">POWER (HP)</span>
                <span>{vehicleB.name.split(' ')[0]}: {vehicleB.powerHp} HP</span>
              </div>
              <div className="grid grid-cols-2 gap-2 h-4">
                <div className="bg-black/10 dark:bg-white/10 flex justify-end">
                  <div
                    className="bg-[#B51F2B] h-full"
                    style={{ width: `${(vehicleA.powerHp / maxPower) * 100}%` }}
                  ></div>
                </div>
                <div className="bg-black/10 dark:bg-white/10">
                  <div
                    className="bg-[#171717] dark:bg-white h-full"
                    style={{ width: `${(vehicleB.powerHp / maxPower) * 100}%` }}
                  ></div>
                </div>
              </div>
            </div>

            {/* Metric 2: Torque (Nm) */}
            <div className="space-y-2">
              <div className="flex justify-between text-xs font-['Barlow_Condensed'] uppercase tracking-wider font-bold">
                <span>{vehicleA.name.split(' ')[0]}: {vehicleA.torqueNm} NM</span>
                <span className="text-[#77736D]">TORQUE (NM)</span>
                <span>{vehicleB.name.split(' ')[0]}: {vehicleB.torqueNm} NM</span>
              </div>
              <div className="grid grid-cols-2 gap-2 h-4">
                <div className="bg-black/10 dark:bg-white/10 flex justify-end">
                  <div
                    className="bg-[#B51F2B] h-full"
                    style={{ width: `${(vehicleA.torqueNm / maxTorque) * 100}%` }}
                  ></div>
                </div>
                <div className="bg-black/10 dark:bg-white/10">
                  <div
                    className="bg-[#171717] dark:bg-white h-full"
                    style={{ width: `${(vehicleB.torqueNm / maxTorque) * 100}%` }}
                  ></div>
                </div>
              </div>
            </div>

            {/* Metric 3: 0-100 km/h (Sec) */}
            <div className="space-y-2">
              <div className="flex justify-between text-xs font-['Barlow_Condensed'] uppercase tracking-wider font-bold">
                <span>{vehicleA.name.split(' ')[0]}: {vehicleA.zeroToHundredSec}s</span>
                <span className="text-[#77736D]">0–100 KM/H SPRINT (LOWER IS QUICKER)</span>
                <span>{vehicleB.name.split(' ')[0]}: {vehicleB.zeroToHundredSec}s</span>
              </div>
              <div className="flex justify-between text-xs font-['Barlow_Condensed'] uppercase tracking-wider">
                <span className={vehicleA.zeroToHundredSec <= vehicleB.zeroToHundredSec ? 'text-green-600 font-bold flex items-center' : 'text-[#77736D]'}>
                  {vehicleA.zeroToHundredSec <= vehicleB.zeroToHundredSec ? '★ QUICKER SPRINT' : ''}
                </span>
                <span className={vehicleB.zeroToHundredSec <= vehicleA.zeroToHundredSec ? 'text-green-600 font-bold flex items-center' : 'text-[#77736D]'}>
                  {vehicleB.zeroToHundredSec <= vehicleA.zeroToHundredSec ? '★ QUICKER SPRINT' : ''}
                </span>
              </div>
            </div>

            {/* Metric 4: Top Speed (km/h) */}
            <div className="space-y-2">
              <div className="flex justify-between text-xs font-['Barlow_Condensed'] uppercase tracking-wider font-bold">
                <span>{vehicleA.name.split(' ')[0]}: {vehicleA.topSpeedKmh} KM/H</span>
                <span className="text-[#77736D]">MAX TOP SPEED (KM/H)</span>
                <span>{vehicleB.name.split(' ')[0]}: {vehicleB.topSpeedKmh} KM/H</span>
              </div>
              <div className="grid grid-cols-2 gap-2 h-4">
                <div className="bg-black/10 dark:bg-white/10 flex justify-end">
                  <div
                    className="bg-[#B51F2B] h-full"
                    style={{ width: `${(vehicleA.topSpeedKmh / maxSpeed) * 100}%` }}
                  ></div>
                </div>
                <div className="bg-black/10 dark:bg-white/10">
                  <div
                    className="bg-[#171717] dark:bg-white h-full"
                    style={{ width: `${(vehicleB.topSpeedKmh / maxSpeed) * 100}%` }}
                  ></div>
                </div>
              </div>
            </div>
          </div>

          {/* Editorial Verdict Callout */}
          <div className="p-6 bg-[#F1E6D2] dark:bg-[#1f1f1f] border-l-4 border-[#B51F2B] space-y-2">
            <div className="flex items-center space-x-2 text-xs font-['Barlow_Condensed'] uppercase tracking-widest text-[#B51F2B] font-bold">
              <Trophy className="w-4 h-4" />
              <span>THE MOTOR CHRONICLES VERDICT</span>
            </div>
            <p className="font-['DM_Sans'] text-sm sm:text-base leading-relaxed text-[#343434] dark:text-[#D9D3C9]">
              {editorialVerdict}
            </p>
          </div>

        </div>

      </div>
    </div>
  );
};
