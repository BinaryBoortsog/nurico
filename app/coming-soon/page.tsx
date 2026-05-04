"use client";

import React, { useEffect, useState } from 'react';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { FaApple } from 'react-icons/fa';
import { SiGoogleplay } from 'react-icons/si';

function pad(n: number) {
  return n.toString().padStart(2, '0');
}

export default function ComingSoon() {
  const [timeLeft, setTimeLeft] = useState({ days: '--', hours: '--', mins: '--', secs: '--' });
  const [email, setEmail] = useState('');

  useEffect(() => {
    const compute = () => {
      const now = new Date();
      // Target: May 20 of current year at 00:00 local time
      let target = new Date(now.getFullYear(), 4, 20, 0, 0, 0);
      if (now > target) {
        target = new Date(now.getFullYear() + 1, 4, 20, 0, 0, 0);
      }

      const diff = Math.max(0, target.getTime() - now.getTime());
      const secs = Math.floor(diff / 1000);
      const days = Math.floor(secs / (3600 * 24));
      const hours = Math.floor((secs % (3600 * 24)) / 3600);
      const mins = Math.floor((secs % 3600) / 60);
      const s = Math.floor(secs % 60);

      setTimeLeft({ days: String(days), hours: pad(hours), mins: pad(mins), secs: pad(s) });
    };

    compute();
    const id = setInterval(compute, 1000);
    return () => clearInterval(id);
  }, []);

  const handleNotify = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    const subject = encodeURIComponent('Notify me when MediLink launches');
    const body = encodeURIComponent(`Please notify me when the app launches. Email: ${email}`);
    window.location.href = `mailto:hello@medilink.app?subject=${subject}&body=${body}`;
  };

  return (
    <main className="min-h-screen flex flex-col relative z-0" style={{ background: '#F6F5F2' }}>
      
      {/* Decorative Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none -z-10">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full max-w-[1000px] opacity-40 dark:opacity-20 flex items-center justify-center">
          <div className="absolute w-[600px] h-[600px] rounded-full blur-[120px] mix-blend-multiply" style={{ background: 'rgba(218,29,53,0.3)' }} />
          <div className="absolute w-[500px] h-[500px] rounded-full blur-[100px] mix-blend-multiply translate-x-1/3 translate-y-1/4" style={{ background: 'rgba(218,29,53,0.2)' }} />
        </div>
      </div>

      <Navbar />

      <section className="flex-1 flex items-center justify-center px-6 py-20 relative">
        <div className="max-w-3xl w-full rounded-[2rem] p-8 md:p-16 text-center shadow-2xl" style={{ background: '#FFFFFF', border: '1px solid rgba(232,230,225,0.5)' }}>
          
          <div className="inline-block px-4 py-1.5 mb-6 rounded-full text-sm font-semibold tracking-wide" style={{ background: '#FDECED', border: '1px solid #F5A0A5', color: '#DA2935' }}>
            Coming May 20
          </div>
          
          <h1 className="text-5xl md:text-6xl font-display font-extrabold mb-4 tracking-tight" style={{ color: '#1A1A1A' }}>
            Medi<span style={{ color: '#DA2935' }}>Link</span>
          </h1>
          
          <p className="text-lg md:text-xl mb-10 max-w-xl mx-auto leading-relaxed" style={{ color: '#757575' }}>
            We're putting the finishing touches on the app. Enter your email and we'll notify you the moment MediLink hits the stores.
          </p>

          {/* Countdown Grid */}
          <div className="flex flex-wrap items-center justify-center gap-3 sm:gap-6 mb-12">
            {[
              { label: 'Days', value: timeLeft.days },
              { label: 'Hours', value: timeLeft.hours },
              { label: 'Minutes', value: timeLeft.mins },
              { label: 'Seconds', value: timeLeft.secs },
            ].map((unit, idx) => (
              <div key={idx} className="flex flex-col items-center justify-center min-w-[80px] sm:min-w-[100px] px-4 py-4 rounded-2xl shadow-sm" style={{ background: '#FFFFFF', border: '1px solid #E8E6E1' }}>
                <div className="text-3xl sm:text-4xl font-bold font-mono tracking-tighter mb-1" style={{ color: '#1A1A1A' }}>
                  {unit.value}
                </div>
                <div className="text-[10px] sm:text-xs uppercase tracking-widest font-medium" style={{ color: '#757575' }}>
                  {unit.label}
                </div>
              </div>
            ))}
          </div>

          {/* Inline Form */}
          <form onSubmit={handleNotify} className="flex flex-col sm:flex-row items-center max-w-md mx-auto gap-3 sm:gap-0 mb-10">
            <input
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email address"
              type="email"
              required
              className="w-full sm:w-auto flex-1 px-6 py-4 rounded-2xl sm:rounded-r-none sm:rounded-l-2xl transition-all shadow-inner relative z-20"
              style={{ background: '#FFFFFF', border: '1px solid #E8E6E1', color: '#1A1A1A' }}
            />
            <button 
              type="submit" 
              className="w-full sm:w-auto shrink-0 px-8 py-4 rounded-2xl sm:rounded-l-none sm:rounded-r-2xl font-semibold hover:opacity-95 transition-colors shadow-lg relative z-20"
              style={{ background: '#DA2935', color: '#FFFFFF' }}
            >
              Notify Me
            </button>
          </form>

          {/* App Store Badges - Perfectly Grid-Aligned Icons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-6 border-t border-border/50">
            <button disabled className="w-full sm:w-auto flex items-center justify-center gap-3.5 px-6 py-3 rounded-xl cursor-not-allowed" style={{ background: '#1A1A1A', color: 'rgba(255,255,255,0.9)', border: '1px solid rgba(255,255,255,0.12)' }}>
              <FaApple size={20} className="shrink-0" aria-hidden />
              <div className="flex flex-col items-start leading-tight">
                <span className="text-[10px] font-medium">Coming soon on the</span>
                <span className="text-[17px] font-semibold tracking-tight">App Store</span>
              </div>
            </button>

            <button disabled className="w-full sm:w-auto flex items-center justify-center gap-3.5 px-6 py-3 rounded-xl cursor-not-allowed" style={{ background: '#1A1A1A', color: 'rgba(255,255,255,0.9)', border: '1px solid rgba(255,255,255,0.12)' }}>
              <SiGoogleplay size={20} className="shrink-0" aria-hidden />
              <div className="flex flex-col items-start leading-tight">
                <span className="text-[10px] font-medium">Get it from</span>
                <span className="text-[17px] font-semibold tracking-tight">Google Play</span>
              </div>
            </button>
          </div>

        </div>
      </section>

      <Footer />
    </main>
  );
}