"use client";

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useLanguage } from './LanguageContext';

export const Phase2Banner = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [email, setEmail] = useState('');
  const { language } = useLanguage();

  const content = {
    ko: {
      badge: "Phase 2 — 준비 중",
      title: "병원 예약, 진료비 비교는 다음 버전에서",
      desc: "지금은 통역사 연결에 집중합니다. 병원 예약 자동화, 다병원 진료비 비교 기능은 v2에서 출시됩니다.",
      button: "출시 알림 받기",
      modalTitle: "출시 알림 받기",
      modalDesc: "Phase 2 출시 시 이메일로 가장 먼저 알려드립니다.",
      emailPlaceholder: "이메일 주소",
      submitBtn: "알림 신청하기",
      successMsg: "등록되었습니다. 감사합니다!",
      features: ["병원 예약 자동화", "비자 서류 생성", "진료비 비교", "AI 증상 분석"]
    },
    mn: {
      badge: "Phase 2 — Бэлтгэж байна",
      title: "Эмнэлгийн цаг авалт, үнийн харьцуулалт дараагийн хувилбарт",
      desc: "Одоогоор зөвхөн орчуулагчтай холбоход төвлөрч байна. Цаг авалт болон үнэ харьцуулах үйлчилгээ v2 хувилбарт нэмэгдэнэ.",
      button: "Мэдэгдэл авах",
      modalTitle: "Мэдэгдэл авах",
      modalDesc: "Phase 2 гарахад имэйлээр хамгийн түрүүнд мэдэгдэх болно.",
      emailPlaceholder: "Имэйл хаяг",
      submitBtn: "Бүртгүүлэх",
      successMsg: "Амжилттай бүртгэгдлээ. Баярлалаа!",
      features: ["Цаг авалтын автоматжуулалт", "Визний бичиг баримт", "Үнийн харьцуулалт", "AI шинж тэмдэг"]
    }
  };

  const t = content[language as keyof typeof content];

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      alert(t.successMsg);
      setIsModalOpen(false);
      setEmail('');
    }
  };

  return (
    <section className="bg-white py-20 px-4 md:px-8 overflow-hidden" id="roadmap">
      <div className="max-w-[1200px] mx-auto relative">
        {/* Background decorative elements */}
        <div className="absolute top-[-20%] left-[-10%] w-[40%] h-[140%] bg-amber/5 rounded-full blur-3xl -z-10 pointer-events-none" />
        <div className="absolute bottom-[-20%] right-[-10%] w-[30%] h-[140%] bg-primary/5 rounded-full blur-3xl -z-10 pointer-events-none" />

        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="relative bg-gradient-to-br from-white to-[#FAFAFC] border border-gray-100 shadow-[0_8px_30px_rgb(0,0,0,0.04)] rounded-[2.5rem] p-10 md:p-14 flex flex-col lg:flex-row items-center justify-between gap-10 md:mx-10 overflow-hidden"
        >
          {/* Subtle inner glow */}
          <div className="absolute inset-0 bg-gradient-to-r from-amber/5 to-transparent pointer-events-none" />

          <div className="flex-1 relative z-10">
            <motion.div 
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="inline-flex items-center gap-2 bg-amber/10 border border-amber/20 text-amber px-4 py-1.5 rounded-full text-[13px] font-bold mb-6"
            >
              <div className="w-1.5 h-1.5 rounded-full bg-amber animate-pulse" />
              {t.badge}
            </motion.div>
            
            <h3 className="text-[28px] md:text-[36px] font-bold text-navy mb-4 leading-tight">
              {t.title}
            </h3>
            
            <p className="text-navy/60 text-[16px] leading-relaxed mb-8 max-w-[600px]">
              {t.desc}
            </p>
            
            <div className="flex flex-wrap gap-2">
              {t.features.map((feat, idx) => (
                <motion.span 
                  key={idx} 
                  initial={{ opacity: 0, x: -10 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.3 + (idx * 0.1) }}
                  className="bg-white shadow-sm border border-gray-100 text-gray-600 px-4 py-2 rounded-xl text-[13px] font-semibold flex items-center gap-2"
                >
                  <svg className="text-teal w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <polyline points="20 6 9 17 4 12"></polyline>
                  </svg>
                  {feat}
                </motion.span>
              ))}
            </div>
          </div>

          <div className="shrink-0 w-full lg:w-auto relative z-10">
            <motion.button 
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => setIsModalOpen(true)}
              className="w-full lg:w-auto bg-gradient-to-r from-amber to-[#F59E0B] text-white px-8 py-4 rounded-2xl font-bold text-[16px] shadow-[0_8px_20px_rgba(245,158,11,0.25)] hover:shadow-[0_12px_25px_rgba(245,158,11,0.35)] transition-all flex items-center justify-center gap-2"
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"></path>
                <path d="M13.73 21a2 2 0 0 1-3.46 0"></path>
              </svg>
              {t.button}
            </motion.button>
          </div>
        </motion.div>
      </div>

      <AnimatePresence>
        {isModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center px-4 bg-navy/60 backdrop-blur-md">
            <motion.div 
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              transition={{ type: "spring", duration: 0.5 }}
              className="bg-white rounded-[2rem] p-8 w-full max-w-[420px] shadow-2xl relative border border-gray-100"
            >
              <button 
                onClick={() => setIsModalOpen(false)}
                className="absolute top-5 right-5 text-gray-400 hover:text-gray-800 transition-colors bg-gray-50 p-2 rounded-full"
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M18 6L6 18M6 6l12 12" />
                </svg>
              </button>
              
              <div className="w-12 h-12 bg-amber/10 rounded-2xl flex items-center justify-center mb-6 text-amber">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M22 17a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V9.5C2 7 4 5 6.5 5h4.6a2 2 0 0 1 1.7.8L14 7.6a2 2 0 0 0 1.7.8H20a2 2 0 0 1 2 2v6.6Z" />
                </svg>
              </div>

              <h3 className="text-[22px] font-bold text-navy mb-2">{t.modalTitle}</h3>
              <p className="text-navy/50 text-[15px] mb-8">{t.modalDesc}</p>
              
              <form onSubmit={handleSubscribe} className="flex flex-col gap-4">
                <div className="relative">
                  <svg className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <rect width="20" height="16" x="2" y="4" rx="2"></rect>
                    <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"></path>
                  </svg>
                  <input 
                    type="email" 
                    required
                    placeholder={t.emailPlaceholder}
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full pl-12 pr-4 py-3.5 rounded-xl border border-gray-200 focus:outline-none focus:border-amber focus:ring-2 focus:ring-amber/20 text-[15px] transition-all bg-gray-50 focus:bg-white"
                  />
                </div>
                <button type="submit" className="w-full bg-gradient-to-r from-amber to-[#F59E0B] text-white py-3.5 rounded-xl font-bold text-[16px] shadow-md hover:shadow-lg transition-all hover:-translate-y-0.5">
                  {t.submitBtn}
                </button>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
};
