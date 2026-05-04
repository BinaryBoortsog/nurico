"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { useLanguage } from './LanguageContext';

export const HowItWorksSection = () => {
  const { language } = useLanguage();

  const content = {
    ko: {
      badge: "Phase 1: Multi-Service Platform",
      titleTop: "어떤 상황에서도, ",
      titleHighlight: "당당하게 소통하세요",
      desc: <>비즈니스부터 응급실까지, 몽골인을 위한 모든 통역 서비스가 <br className="hidden md:block" />하나의 플랫폼에서 시작됩니다.</>,
      userTitle: "이용자 가이드",
      userSub: "Хэрэглэгчийн заавар",
      transTitle: "통역사 가이드",
      transSub: "Орчуулагчийн заавар",
      userSteps: [
        { title: "맞춤형 상황 선택", sub: "Нөхцөл байдлаа сонгох", desc: "비즈니스 미팅, 병원 진료, 출입국 사무소, 관광 가이드 등 필요한 통역 분야를 선택하세요.", icon: "🎯" },
        { title: "전문 통역사 매칭", sub: "Орчуулагчтай холбогдох", desc: "평균 5분 이내! 분야별 검증된 전문 통역사가 당신의 언어 장벽을 즉시 해결해 드립니다.", icon: "🤝" },
        { title: "온/오프라인 통역 진행", sub: "Орчуулга эхлэх", desc: "화상 통화로 어디서나 가볍게, 또는 현장 동행으로 확실하게 지원받으세요.", icon: "📱" },
        { title: "합리적 과금", sub: "Төлбөр тооцоо", desc: "월정액 없이 실제 이용한 분 단위로 투명하게 결제합니다.", icon: "💳" }
      ],
      translatorSteps: [
        { title: "전문 분야 등록", sub: "Бүртгүүлэх", desc: "본인의 주력 분야(의료, 비즈니스, 법률 등)와 언어 능력을 등록하고 심사를 받습니다.", icon: "📝" },
        { title: "실시간 요청 알림", sub: "Хүсэлт хүлээн авах", desc: "앱을 통해 실시간으로 들어오는 통역 요청을 확인하고 수락하세요.", icon: "🔔" },
        { title: "통역 서비스 제공", sub: "Үйлчилгээ үзүүлэх", desc: "화상 또는 현장에서 최고의 전문성을 발휘하여 소통을 돕습니다.", icon: "✨" },
        { title: "수익 창출", sub: "Орлого олох", desc: "매주 안정적으로 정산되는 수익을 확인하세요.", icon: "💰" }
      ],
      tags: ['비즈니스 미팅', '병원 진료', '관광 가이드', '긴급 응급 상황', '출입국 업무', '법률 상담']
    },
    mn: {
      badge: "Үе шат 1: Олон үйлчилгээт платформ",
      titleTop: "Ямар ч нөхцөл байдалд, ",
      titleHighlight: "өөртөө итгэлтэй харилцаарай",
      desc: <>Бизнесээс эхлээд яаралтай тусламж хүртэл, Монголчуудад зориулсан бүх орчуулгын үйлчилгээ <br className="hidden md:block" />нэг платформоос эхэлнэ.</>,
      userTitle: "Хэрэглэгчийн заавар",
      userSub: "이용자 가이드",
      transTitle: "Орчуулагчийн заавар",
      transSub: "통역사 가이드",
      userSteps: [
        { title: "Нөхцөл байдлаа сонгох", sub: "맞춤형 상황 선택", desc: "Бизнес уулзалт, эмнэлэг, цагаачлалын алба, аяллын хөтөч зэрэг шаардлагатай орчуулгын салбараа сонгоно уу.", icon: "🎯" },
        { title: "Орчуулагчтай холбогдох", sub: "전문 통역사 매칭", desc: "Дунджаар 5 минутын дотор! Баталгаажсан мэргэжлийн орчуулагч таны хэлний бэрхшээлийг даруй шийдэх болно.", icon: "🤝" },
        { title: "Орчуулга эхлэх", sub: "온/오프라인 통역 진행", desc: "Хаана ч байсан видео дуудлагаар эсвэл биечлэн уулзаж найдвартай дэмжлэг аваарай.", icon: "📱" },
        { title: "Төлбөр тооцоо", sub: "합리적 과금", desc: "Сар бүрийн хураамжгүй, зөвхөн ашигласан минутаараа ил тод төлнө.", icon: "💳" }
      ],
      translatorSteps: [
        { title: "Бүртгүүлэх", sub: "전문 분야 등록", desc: "Өөрийн мэргэшсэн салбар болон хэлний чадвараа бүртгүүлж шалгуулна.", icon: "📝" },
        { title: "Хүсэлт хүлээн авах", sub: "실시간 요청 알림", desc: "Аппликейшнээр дамжуулан бодит цаг хугацаанд ирж буй орчуулгын хүсэлтийг шалгаж, хүлээн авна уу.", icon: "🔔" },
        { title: "Үйлчилгээ үзүүлэх", sub: "통역 서비스 제공", desc: "Видео эсвэл биечлэн шилдэг мэргэжилтний үүднээс харилцаа холбоонд тусална уу.", icon: "✨" },
        { title: "Орлого олох", sub: "수익 창출", desc: "Долоо хоног бүр тогтвортой орлогоо шалгаарай.", icon: "💰" }
      ],
      tags: ['Бизнес уулзалт', 'Эмнэлгийн үзлэг', 'Аяллын хөтөч', 'Яаралтай тусламж', 'Гаалийн үйлчилгээ', 'Хуулийн зөвлөгөө']
    }
  };

  const t = content[language];

  return (
    <section className="bg-primary-light/30 py-32 px-6 overflow-hidden" id="how-it-works">
      <div className="max-w-[1200px] mx-auto">
        
        {/* Header Section */}
        <div className="flex flex-col items-center text-center mb-20">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="flex items-center gap-3 mb-6"
          >
            <span className="px-4 py-1.5 rounded-full bg-primary/10 text-primary font-bold text-xs uppercase tracking-widest">
              {t.badge}
            </span>
          </motion.div>
          <h2 className="text-4xl md:text-5xl font-display text-primary-dark mb-4">
            {t.titleTop}<span className="gradient-text font-display">{t.titleHighlight}</span>
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl leading-relaxed font-medium">
            {t.desc}
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
          
          {/* User Side */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="bg-white rounded-[3rem] p-10 shadow-lg border border-primary/5"
          >
            <div className="flex justify-between items-center mb-12">
              <div>
                <h3 className="text-2xl font-bold text-primary-dark">{t.userTitle}</h3>
                <p className="text-primary font-bold text-xs uppercase tracking-widest mt-1">{t.userSub}</p>
              </div>
              <div className="bg-primary-light p-3 rounded-2xl text-2xl">🇲🇳</div>
            </div>

            <div className="space-y-8 relative">
              {t.userSteps.map((step, idx) => (
                <div key={idx} className="flex gap-6 group">
                  <div className="relative flex flex-col items-center">
                    <div className="w-12 h-12 rounded-2xl bg-primary-light flex items-center justify-center text-xl z-10 shadow-sm border border-white group-hover:scale-110 transition-transform duration-300">
                      {step.icon}
                    </div>
                    {idx !== t.userSteps.length - 1 && (
                      <div className="w-0.5 h-full bg-gradient-to-b from-primary/20 to-transparent absolute top-12" />
                    )}
                  </div>
                  <div className="pb-8">
                    <h4 className="text-lg font-bold text-primary-dark mb-1">{step.title}</h4>
                    <p className="text-primary font-bold text-[10px] uppercase tracking-tighter opacity-60 mb-2">{step.sub}</p>
                    <p className="text-muted-foreground text-[15px] leading-relaxed max-w-xs">{step.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Translator Side */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="bg-primary-dark rounded-[3rem] p-10 shadow-2xl text-white relative overflow-hidden"
          >
            {/* Background Texture */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full blur-3xl -mr-32 -mt-32" />
            
            <div className="flex justify-between items-center mb-12 relative z-10">
              <div>
                <h3 className="text-2xl font-bold">{t.transTitle}</h3>
                <p className="text-primary-soft font-bold text-xs uppercase tracking-widest mt-1">{t.transSub}</p>
              </div>
              <div className="bg-white/10 backdrop-blur-md p-3 rounded-2xl text-2xl">💼</div>
            </div>

            <div className="space-y-8 relative z-10">
              {t.translatorSteps.map((step, idx) => (
                <div key={idx} className="flex gap-6 group">
                  <div className="relative flex flex-col items-center">
                    <div className="w-12 h-12 rounded-2xl bg-white/10 backdrop-blur-md flex items-center justify-center text-xl z-10 border border-white/10 group-hover:bg-primary-mid/30 transition-colors duration-300">
                      {step.icon}
                    </div>
                    {idx !== t.translatorSteps.length - 1 && (
                      <div className="w-0.5 h-full bg-gradient-to-b from-white/10 to-transparent absolute top-12" />
                    )}
                  </div>
                  <div className="pb-8">
                    <h4 className="text-lg font-bold text-white mb-1">{step.title}</h4>
                    <p className="text-primary-soft font-bold text-[10px] uppercase tracking-tighter opacity-80 mb-2">{step.sub}</p>
                    <p className="text-white/60 text-[15px] leading-relaxed max-w-xs">{step.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Use Cases Tag Cloud */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-20 flex flex-wrap justify-center gap-3"
        >
          {t.tags.map((tag, i) => (
            <span key={i} className="px-6 py-3 rounded-2xl bg-white border border-primary/10 shadow-sm text-sm font-bold text-primary-dark">
              #{tag}
            </span>
          ))}
        </motion.div>
      </div>
    </section>
  );
};