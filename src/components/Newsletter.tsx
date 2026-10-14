import React, { useState } from 'react';
import { Mail, Check, Shield } from 'lucide-react';

export const Newsletter: React.FC = () => {
  const [email, setEmail] = useState('');
  const [frequency, setFrequency] = useState<'weekly' | 'daily'>('weekly');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !email.includes('@')) return;

    try {
      const subscribers = JSON.parse(localStorage.getItem('motor_newsletter_subscribers') || '[]');
      subscribers.push({ email, frequency, date: new Date().toISOString() });
      localStorage.setItem('motor_newsletter_subscribers', JSON.stringify(subscribers));
    } catch {
      // ignore
    }

    setSubmitted(true);
  };

  return (
    <section className="mt-20 bg-[#171717] text-[#FAF8F3] p-8 sm:p-14 border border-[#343434] relative overflow-hidden">
      {/* Background fine grid */}
      <div className="absolute inset-0 bg-grid-pattern opacity-25 pointer-events-none"></div>

      <div className="max-w-3xl relative z-10 space-y-5">
        <div className="flex items-center space-x-2 text-xs font-['Barlow_Condensed'] tracking-widest text-[#B51F2B] uppercase font-bold">
          <Mail className="w-4 h-4" />
          <span>THE WEEKLY DISPATCH</span>
        </div>

        <h3 className="font-['Bebas_Neue'] text-3xl sm:text-5xl uppercase text-white leading-tight">
          GET THE AUTOMOTIVE JOURNAL DIRECT TO YOUR INBOX
        </h3>

        <p className="font-['Cormorant_Garamond'] text-[#F1E6D2]/80 italic text-base sm:text-xl leading-relaxed">
          In-depth engineering breakdowns, Indian market updates, motorsport reviews, and exclusive test drive dispatches. Zero spam. Pure octane.
        </p>

        {submitted ? (
          <div className="bg-[#B51F2B]/20 border border-[#B51F2B] p-5 space-y-2 text-[#FAF8F3] animate-fade-in">
            <div className="flex items-center space-x-2 font-['Barlow_Condensed'] uppercase tracking-widest font-bold text-sm text-[#FAF8F3]">
              <Check className="w-5 h-5 text-green-400" />
              <span>DISPATCH CONFIRMATION RECEIVED</span>
            </div>
            <p className="text-xs font-['DM_Sans'] text-[#D9D3C9]">
              Thank you! <strong className="text-white">{email}</strong> has been enrolled in the Motor Chronicles {frequency === 'weekly' ? 'Weekly Deep Dive' : 'Daily Pitstop'} dispatch.
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4 pt-2">
            {/* Frequency Selection */}
            <div className="flex items-center space-x-4 text-xs font-['Barlow_Condensed'] tracking-wider uppercase text-[#D9D3C9]/80">
              <label className="flex items-center space-x-1.5 cursor-pointer">
                <input
                  type="radio"
                  name="freq"
                  checked={frequency === 'weekly'}
                  onChange={() => setFrequency('weekly')}
                  className="accent-[#B51F2B]"
                />
                <span>WEEKLY IN-DEPTH (RECOMMENDED)</span>
              </label>
              <label className="flex items-center space-x-1.5 cursor-pointer">
                <input
                  type="radio"
                  name="freq"
                  checked={frequency === 'daily'}
                  onChange={() => setFrequency('daily')}
                  className="accent-[#B51F2B]"
                />
                <span>DAILY MORNING BRIEF</span>
              </label>
            </div>

            {/* Email form field */}
            <div className="flex flex-col sm:flex-row gap-3">
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email address (e.g. driver@domain.com)"
                className="bg-[#343434] text-[#FAF8F3] placeholder-[#D9D3C9]/50 px-4 py-3.5 text-sm font-['DM_Sans'] focus:outline-none focus:ring-2 focus:ring-[#B51F2B] flex-1 border border-[#D9D3C9]/20"
              />
              <button
                type="submit"
                className="bg-[#B51F2B] hover:bg-[#4A101A] text-white font-['Barlow_Condensed'] uppercase tracking-widest text-sm font-bold px-8 py-3.5 transition-colors cursor-pointer shadow-lg"
              >
                SUBSCRIBE TO DISPATCH
              </button>
            </div>

            <p className="text-[11px] font-['Barlow_Condensed'] text-[#D9D3C9]/60 tracking-wider uppercase flex items-center space-x-1.5">
              <Shield className="w-3.5 h-3.5 text-[#B51F2B]" />
              <span>CONFIDENTIAL • NO ADVERTISING TRACKERS • CANCEL ANYTIME</span>
            </p>
          </form>
        )}
      </div>
    </section>
  );
};
