"use client";

import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { DotLottiePlayer } from '@dotlottie/react-player';
import '@dotlottie/react-player/dist/index.css';
import { useLanguage } from './LanguageContext';

export const TranslatorsSection = () => {
  const { language } = useLanguage();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const content = {
    ko: {
      badge: "위치 기반 매칭",
      title: "지도 기반\n내 주변 통역사 찾기",
      subtitle: "실시간 확인 및 즉시 연결",
      desc: "지도에서 가장 가까운 위치의 전문 통역사를 실시간으로 확인하고\n원하는 장소에서 즉시 연결하세요."
    },
    mn: {
      badge: "Байршилд суурилсан",
      title: "Газрын зурагт суурилсан\nорчуулагч хайх",
      subtitle: "Шууд холбогдох",
      desc: "Газрын зураг дээрээс хамгийн ойр байгаа мэргэжлийн орчуулагчийг\nхарж, хүссэн газартаа шууд холбогдоорой."
    }
  };

  const t = content[language];

  return (
    <section className="bg-navy py-40 px-4 md:px-8 relative overflow-hidden" id="translators">
      {/* Decorative Glows */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-[800px] h-[600px] bg-primary/10 rounded-full blur-[150px] pointer-events-none" />

      {/* Background Lottie Animation */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] md:w-[100%] max-w-[1400px] z-0 opacity-40 md:opacity-60 pointer-events-none mix-blend-screen">
        {mounted && (
          <DotLottiePlayer
            src="/2 points map route.lottie"
            autoplay
            loop
            className="w-full h-auto"
          />
        )}
      </div>

      <div className="max-w-[1200px] mx-auto relative z-10 flex flex-col items-center justify-center min-h-[500px]">
        
        {/* Floating Korean Flag */}
        <motion.div 
          animate={{ y: [-15, 15, -15], rotate: [-5, 5, -5] }} 
          transition={{ repeat: Infinity, duration: 5, ease: "easeInOut" }}
          className="absolute left-2 md:left-[5%] top-[5%] md:top-[10%] bg-white/10 backdrop-blur-xl border border-white/20 p-4 rounded-[2rem] text-4xl md:text-5xl shadow-[0_20px_50px_rgba(0,0,0,0.3)] z-20 hidden md:block"
        >
          🇰🇷
        </motion.div>
        
        {/* Floating Mongolian Flag */}
        <motion.div 
          animate={{ y: [15, -15, 15], rotate: [5, -5, 5] }} 
          transition={{ repeat: Infinity, duration: 6, ease: "easeInOut" }}
          className="absolute right-2 md:right-[5%] bottom-[5%] md:bottom-[10%] bg-white/10 backdrop-blur-xl border border-white/20 p-4 rounded-[2rem] text-4xl md:text-5xl shadow-[0_20px_50px_rgba(0,0,0,0.3)] z-20 hidden md:block"
        >
          🇲🇳
        </motion.div>

        {/* Center Text Container */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center p-10 md:p-16 max-w-3xl w-full relative z-30"
        >
          <div className="inline-block bg-primary/20 text-primary-light px-5 py-2 rounded-full text-sm font-bold mb-6 border border-primary/20 shadow-sm">
            {t.badge}
          </div>
          <h2 className="text-[36px] md:text-[56px] font-display font-bold text-white mb-6 leading-[1.15] whitespace-pre-line">
            {t.title}
          </h2>
          <div className="w-16 h-1 bg-gradient-to-r from-teal to-primary mx-auto mb-8 rounded-full" />
          <h3 className="text-xl md:text-2xl font-bold text-teal mb-4">
            {t.subtitle}
          </h3>
          <p className="text-white/70 text-lg leading-relaxed max-w-xl mx-auto whitespace-pre-line">
            {t.desc}
          </p>
        </motion.div>

      </div>
    </section>
  );
};
