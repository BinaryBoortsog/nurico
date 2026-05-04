"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { useLanguage } from './LanguageContext';

export const FeaturesSection = () => {
  const { language } = useLanguage();

  const content = {
    ko: {
      badge: "Features v1.0",
      title: <>당신과 통역사를 잇는<br /><span className="gradient-text font-display">가장 스마트한 방법</span></>,
      subtitle: "모든 서비스는 한국어와 몽골어로 동일한 수준으로 제공됩니다.",
      features: [
        {
          title: "통역사 정밀 검색",
          sub: "Нарийвчилсан хайлт",
          icon: "🔍",
          desc: "진료과, 평점, 가격은 물론 현재 즉시 응답 가능한 통역사를 AI가 최우선으로 추천합니다.",
          gridClass: "md:col-span-2",
          accent: "bg-primary-soft/20",
          illustration: (
            <div className="flex gap-2 mt-4">
              {[1, 2, 3].map(i => (
                <div key={i} className="h-8 w-20 bg-white rounded-full border border-primary/10 shadow-sm animate-pulse" />
              ))}
            </div>
          )
        },
        {
          title: "실시간 화상 통역",
          sub: "Видео дуудлага",
          icon: "📹",
          desc: "진료실 어디서나 고화질 화상 통화로 대면 통역과 같은 생생한 소통을 지원합니다.",
          gridClass: "md:col-span-1",
          accent: "bg-teal-light",
        },
        {
          title: "1-Tap 응급 연결",
          sub: "Яаралтай холболт",
          icon: "🚨",
          desc: "긴급 상황 발생 시 골든타임을 놓치지 않도록 가장 가까운 통역사에게 즉시 신호를 보냅니다.",
          gridClass: "md:col-span-1",
          accent: "bg-coral-light",
        },
        {
          title: "스마트 소통 채널",
          sub: "Ухаалаг чат",
          icon: "💬",
          desc: "예약 전 의료 서류를 미리 공유하고, 통역사에게 주의 사항을 몽골어로 전달하세요.",
          gridClass: "md:col-span-2",
          accent: "bg-amber-light",
          illustration: (
            <div className="mt-4 space-y-2">
              <div className="h-6 w-32 bg-primary/20 rounded-lg rounded-bl-none" />
              <div className="h-6 w-40 bg-white rounded-lg rounded-br-none ml-auto border border-primary/5 shadow-sm" />
            </div>
          )
        }
      ]
    },
    mn: {
      badge: "Онцлогууд v1.0",
      title: <>Орчуулагчтай холбогдох<br /><span className="gradient-text font-display">хамгийн ухаалаг арга</span></>,
      subtitle: "Бүх үйлчилгээ Солонгос болон Монгол хэл дээр ижил түвшинд хүртээмжтэй.",
      features: [
        {
          title: "Нарийвчилсан хайлт",
          sub: "통역사 정밀 검색",
          icon: "🔍",
          desc: "Хиймэл оюун ухаан нь тасаг, үнэлгээ, үнэ төдийгүй яг одоо хариу өгөх боломжтой орчуулагчдыг хамгийн түрүүнд санал болгодог.",
          gridClass: "md:col-span-2",
          accent: "bg-primary-soft/20",
          illustration: (
            <div className="flex gap-2 mt-4">
              {[1, 2, 3].map(i => (
                <div key={i} className="h-8 w-20 bg-white rounded-full border border-primary/10 shadow-sm animate-pulse" />
              ))}
            </div>
          )
        },
        {
          title: "Видео дуудлага",
          sub: "실시간 화상 통역",
          icon: "📹",
          desc: "Эмнэлгийн хаана ч өндөр нягтралтай видео дуудлагаар нүүр тулан уулзаж байгаа мэт ярилцах боломжтой.",
          gridClass: "md:col-span-1",
          accent: "bg-teal-light",
        },
        {
          title: "Яаралтай холболт",
          sub: "1-Tap 응급 연결",
          icon: "🚨",
          desc: "Яаралтай үед алтан цагийг алдахгүйн тулд хамгийн ойр байгаа орчуулагч руу шууд дохио илгээнэ.",
          gridClass: "md:col-span-1",
          accent: "bg-coral-light",
        },
        {
          title: "Ухаалаг чат",
          sub: "스마트 소통 채널",
          icon: "💬",
          desc: "Захиалга өгөхөөс өмнө эмнэлгийн бичиг баримтаа урьдчилан хуваалцаж, анхаарах зүйлсээ орчуулагчид эх хэлээрээ дамжуулаарай.",
          gridClass: "md:col-span-2",
          accent: "bg-amber-light",
          illustration: (
            <div className="mt-4 space-y-2">
              <div className="h-6 w-32 bg-primary/20 rounded-lg rounded-bl-none" />
              <div className="h-6 w-40 bg-white rounded-lg rounded-br-none ml-auto border border-primary/5 shadow-sm" />
            </div>
          )
        }
      ]
    }
  };

  const t = content[language];

  return (
    <section className="bg-background py-32 px-6 relative overflow-hidden" id="features">
      {/* Background Decorative Element */}
      <div className="absolute top-1/2 left-0 -translate-x-1/2 w-[500px] h-[500px] bg-primary/5 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-[1200px] mx-auto relative z-10">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="max-w-2xl"
          >
            <div className="flex items-center gap-3 mb-4">
              <span className="h-px w-8 bg-primary" />
              <span className="text-primary font-bold uppercase tracking-widest text-xs">{t.badge}</span>
            </div>
            <h2 className="text-4xl md:text-5xl font-display text-primary-dark leading-tight">
              {t.title}
            </h2>
          </motion.div>
          
          <motion.p 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-muted-foreground max-w-xs text-sm font-medium leading-relaxed pb-2"
          >
            {t.subtitle}
          </motion.p>
        </div>

        {/* Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {t.features.map((feat, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
              whileHover={{ y: -5 }}
              className={`${feat.gridClass} group relative bg-white border border-primary/10 rounded-[2.5rem] p-10 overflow-hidden shadow-sm hover:shadow-xl hover:border-primary/20 transition-all duration-500`}
            >
              {/* Inner Accent Glow */}
              <div className={`absolute top-0 right-0 w-32 h-32 ${feat.accent} blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-700`} />

              <div className="relative z-10 h-full flex flex-col">
                <div className="text-4xl mb-6 transform group-hover:scale-125 group-hover:rotate-12 transition-transform duration-500 origin-left">
                  {feat.icon}
                </div>
                
                <div className="mb-2">
                  <h3 className="text-2xl font-bold text-primary-dark inline-block">{feat.title}</h3>
                  <p className="text-primary font-bold text-[11px] uppercase tracking-widest mt-1 opacity-60">{feat.sub}</p>
                </div>

                <p className="text-muted-foreground leading-relaxed text-[15px] mt-4 mb-6">
                  {feat.desc}
                </p>

                {feat.illustration && (
                  <div className="mt-auto opacity-60 group-hover:opacity-100 transition-opacity">
                    {feat.illustration}
                  </div>
                )}

                {/* Corner Arrow Icon */}
                <div className="absolute bottom-10 right-10 opacity-0 group-hover:opacity-100 translate-y-2 group-hover:translate-y-0 transition-all duration-300">
                   <div className="w-10 h-10 rounded-full bg-primary-light flex items-center justify-center">
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className="text-primary"><path d="M7 17L17 7M17 7H7M17 7V17"/></svg>
                   </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};