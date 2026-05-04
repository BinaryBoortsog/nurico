"use client";

import React, { useRef } from 'react';
import { motion, useScroll, useTransform, useSpring } from 'framer-motion';
import { useLanguage } from './LanguageContext';

export const AboutSection = () => {
  const { language } = useLanguage();
  const containerRef = useRef<HTMLDivElement>(null);

  // Track scroll progress
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  // Spring physics for smoother, weighty rotation
  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 70,
    damping: 25,
    restDelta: 0.001
  });

  // 3D Rotations
  const orbitRotation = useTransform(smoothProgress, [0, 1], [0, -360]);

  // Opacity: Fade out when rotating to the back (180deg from front)
  const card1Opacity = useTransform(smoothProgress, [0, 0.15, 0.35, 0.65, 0.85, 1], [1, 0.2, 0, 0, 0.2, 1]);
  const card2Opacity = useTransform(smoothProgress, [0, 0.15, 0.33, 0.5, 0.8, 1], [0, 0.4, 1, 0.4, 0, 0]);
  const card3Opacity = useTransform(smoothProgress, [0, 0.3, 0.5, 0.66, 0.85, 1], [0, 0, 0.2, 1, 0.4, 0]);

  const content = {
    ko: {
      badge: "Our Story",
      title: "언어의 장벽이 생명의 장벽이 되지 않도록",
      subtitle: "MediLink는 몽골 유학생들과 한국 대학생들이 모여 의료 불평등을 해결하기 위해 시작한 소셜 임팩트 스타트업입니다.",
      missionTitle: "시작의 이유",
      missionText: "낯선 타국에서 아픈 것만큼 서러운 일은 없습니다. 특히 전문적인 의료 용어 앞에서 작아지는 유학생과 거주민들의 두려움을 누구보다 잘 알기에, 우리는 기술과 진심을 더해 이 문제를 해결하려 합니다.",
      visionTitle: "우리의 지향점",
      visionText: "모든 환자가 자신의 모국어로 정확한 진료를 받고, 건강할 권리를 동등하게 누리는 세상을 만듭니다. 우리는 한-몽 의료 소통의 표준이 되겠습니다.",
      stats: [
        { label: "함께하는 대학", val: "5+" },
        { label: "팀원 국적", val: "2개국" },
        { label: "전문 분야", val: "전과목" }
      ]
    },
    mn: {
      badge: "Бидний түүх",
      title: "Хэлний бэрхшээл амь насны бэрхшээл болохгүй байхын төлөө",
      subtitle: "MediLink бол Монгол болон Солонгос оюутнууд эрүүл мэндийн тэгш бус байдлыг арилгах зорилгоор байгуулсан сошиал стартап юм.",
      missionTitle: "Яагаад эхэлсэн бэ?",
      missionText: "Хүний нутагт өвдөхөөс илүү хэцүү зүйл байдаггүй. Эмнэлгийн нарийн нэр томьёоны өмнө гацдаг оюутан залуус болон иргэдийн айдсыг бид сайн мэддэг учраас технологиор дамжуулан энэ асуудлыг шийдэхийг зорьж байна.",
      visionTitle: "Бидний алсын хараа",
      visionText: "Өвчтөн бүр өөрийн эх хэлээрээ үнэн зөв оношилгоо авч, эрүүл байх эрхээ тэгш эдлэх ертөнцийг бий болгоно. Бид Солонгос-Монгол эмнэлгийн харилцааны стандарт болно.",
      stats: [
        { label: "Их Сургууль", val: "5+" },
        { label: "Багийн иргэншил", val: "2" },
        { label: "Мэргэшсэн чиглэл", val: "Бүх" }
      ]
    }
  };

  const t = content[language as keyof typeof content];

  return (
    <section ref={containerRef} className="relative h-[400vh] bg-[#06150e]" id="about">
      {/* Sticky Space Container */}
      <div className="sticky top-0 h-screen w-full overflow-hidden flex flex-col lg:flex-row items-center justify-center">
        
        {/* Deep Space Background / Nebula Elements */}
        <div className="absolute inset-0 z-0">
          <div className="absolute top-[-10%] right-[-10%] w-[800px] h-[800px] bg-primary/20 rounded-full blur-[150px] pointer-events-none" />
          <div className="absolute bottom-[-10%] left-[-10%] w-[600px] h-[600px] bg-emerald-700/20 rounded-full blur-[120px] pointer-events-none" />
          {/* Subtle star overlay (optional CSS noise pattern could go here) */}
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-transparent via-[#06150e]/80 to-[#06150e] pointer-events-none" />
        </div>

        {/* Left: Static Text Content (Lightened for dark mode) */}
        <div className="w-full lg:w-1/2 px-6 md:px-12 pt-20 lg:pt-0 z-40 flex flex-col justify-center h-[40vh] lg:h-full pointer-events-none">
          <div className="max-w-xl">
            <div className="inline-flex items-center gap-3 px-5 py-2 rounded-full bg-cyan-950/50 border border-cyan-500/30 text-cyan-400 font-bold text-xs uppercase tracking-widest mb-6 backdrop-blur-md shadow-[0_0_20px_rgba(34,211,238,0.2)]">
              <span className="w-2 h-2 bg-cyan-400 rounded-full animate-ping shadow-[0_0_10px_rgba(34,211,238,1)]" />
              {t.badge}
            </div>
            <h2 className="text-4xl md:text-5xl font-display text-white mb-6 leading-tight drop-shadow-[0_2px_10px_rgba(0,0,0,0.8)]">
              {t.title}
            </h2>
            <p className="text-lg text-cyan-100/70 font-medium leading-relaxed">
              {t.subtitle}
            </p>
            
            <div className="mt-10 flex items-center gap-3 text-cyan-500 animate-bounce">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M12 5v14M5 12l7 7 7-7"/></svg>
              <span className="text-sm font-bold uppercase tracking-widest">Scroll to explore</span>
            </div>
          </div>
        </div>

        {/* Right: 3D PULSAR SCENE */}
        <div className="w-full lg:w-1/2 h-[60vh] lg:h-full relative flex items-center justify-center pointer-events-none perspective-[1500px]">
          
          <div 
            className="relative w-full h-full flex items-center justify-center [--orbit-radius:180px] md:[--orbit-radius:260px] lg:[--orbit-radius:320px]"
            style={{ 
              transform: "rotateX(-12deg)", 
              transformStyle: "preserve-3d" 
            }}
          >
            
            {/* --- PULSAR STAR CORE --- */}
            <div 
              className="absolute z-50 flex items-center justify-center"
              style={{ 
                transformStyle: "preserve-3d" 
              }}
            >
              {/* True 3D Holographic Pulsar Sphere */}
              <div className="absolute flex items-center justify-center w-28 h-28 md:w-40 md:h-40 preserve-3d animate-[spin_10s_linear_infinite]">
                {/* Core Energy Glow */}
                <div className="absolute inset-4 bg-white/20 rounded-full shadow-[0_0_60px_20px_rgba(52,211,153,0.6)] blur-[5px]" />
                {/* 3D Wireframe Rings (Latitudes/Longitudes) */}
                <div className="absolute inset-0 rounded-full border-[1.5px] border-emerald-300/50 shadow-[0_0_15px_rgba(52,211,153,0.4)]" />
                <div className="absolute inset-0 rounded-full border-[1.5px] border-emerald-300/50 shadow-[0_0_15px_rgba(52,211,153,0.4)]" style={{ transform: 'rotateY(45deg)' }} />
                <div className="absolute inset-0 rounded-full border-[1.5px] border-emerald-300/50 shadow-[0_0_15px_rgba(52,211,153,0.4)]" style={{ transform: 'rotateY(90deg)' }} />
                <div className="absolute inset-0 rounded-full border-[1.5px] border-emerald-300/50 shadow-[0_0_15px_rgba(52,211,153,0.4)]" style={{ transform: 'rotateY(135deg)' }} />
                <div className="absolute inset-0 rounded-full border-[1.5px] border-emerald-300/50 shadow-[0_0_15px_rgba(52,211,153,0.4)]" style={{ transform: 'rotateX(90deg)' }} />
              </div>
              
              {/* Vertical Laser Beam (Core Axis) */}
              <div className="absolute h-[1500px] w-[3px] bg-white blur-[1px] shadow-[0_0_30px_10px_rgba(52,211,153,0.9)]" />
              
              {/* Top Jet Funnel */}
              <div 
                className="absolute bottom-1/2 w-[180px] h-[400px] bg-gradient-to-t from-emerald-300/80 via-cyan-400/20 to-transparent blur-xl opacity-90 mix-blend-screen"
                style={{ clipPath: 'polygon(50% 100%, 0% 0%, 100% 0%)' }}
              />
              
              {/* Bottom Jet Funnel */}
              <div 
                className="absolute top-1/2 w-[180px] h-[400px] bg-gradient-to-b from-emerald-300/80 via-cyan-400/20 to-transparent blur-xl opacity-90 mix-blend-screen"
                style={{ clipPath: 'polygon(50% 0%, 0% 100%, 100% 100%)' }}
              />

              {/* Accretion Disk / Magnetic Ring */}
              <div 
                className="absolute w-[350px] md:w-[500px] h-[350px] md:h-[500px] rounded-full border-[2px] border-emerald-400/40 opacity-80 shadow-[0_0_40px_rgba(52,211,153,0.4),inset_0_0_40px_rgba(52,211,153,0.2)]" 
                style={{ transform: 'rotateX(75deg)' }} 
              />
              <div 
                className="absolute w-[450px] md:w-[650px] h-[450px] md:h-[650px] rounded-full border-[1px] border-cyan-500/20 opacity-40 shadow-[0_0_20px_rgba(34,211,238,0.3)]" 
                style={{ transform: 'rotateX(75deg)' }} 
              />

              {/* Evly Logo Floating Inside */}
              <img 
                src="/evly.png" 
                alt="Evly Logo"
                className="w-16 h-16 md:w-24 md:h-24 object-contain brightness-200 contrast-150 drop-shadow-[0_0_20px_rgba(255,255,255,1)] relative z-10"
              />
            </div>

            {/* --- 3D ORBIT RING FOR HOLOGRAM CARDS --- */}
            <motion.div 
              className="absolute inset-0 flex items-center justify-center pointer-events-auto"
              style={{ 
                rotateY: orbitRotation,
                transformStyle: "preserve-3d" 
              }}
            >
              
              {/* Card 1: Mission (0 deg) */}
              <motion.div 
                className="absolute w-[280px] md:w-[380px]"
                style={{ 
                  transform: "rotateY(0deg) translateZ(var(--orbit-radius))",
                  opacity: card1Opacity,
                  transformStyle: "preserve-3d"
                }}
              >
                <div className="bg-[#061e13]/60 backdrop-blur-xl p-8 rounded-[2rem] shadow-[0_0_40px_rgba(52,211,153,0.1),inset_0_0_20px_rgba(255,255,255,0.05)] border border-emerald-400/30 group hover:border-emerald-400/60 transition-colors duration-500">
                  <div className="w-12 h-12 bg-emerald-500/20 rounded-2xl flex items-center justify-center mb-5 text-emerald-300 shadow-[0_0_15px_rgba(52,211,153,0.4)]">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M12 21l-8.228-9.96c-1.425-1.728-1.072-4.29 0.784-5.556a4.133 4.133 0 0 1 5.8 0.448L12 7.647l1.644-1.715a4.133 4.133 0 0 1 5.8-0.448c1.856 1.266 2.209 3.828 0.784 5.556L12 21z"/></svg>
                  </div>
                  <h3 className="text-xl font-bold text-white mb-3 tracking-wide">{t.missionTitle}</h3>
                  <p className="text-emerald-100/80 text-[15px] leading-relaxed">{t.missionText}</p>
                </div>
              </motion.div>

              {/* Card 2: Stats (120 deg) */}
              <motion.div 
                className="absolute w-[280px] md:w-[380px]"
                style={{ 
                  transform: "rotateY(120deg) translateZ(var(--orbit-radius))",
                  opacity: card2Opacity,
                  transformStyle: "preserve-3d"
                }}
              >
                <div className="flex flex-col gap-4">
                  {t.stats.map((stat, idx) => (
                    <div key={idx} className="bg-[#061e13]/60 backdrop-blur-xl p-5 md:p-6 rounded-2xl border border-emerald-400/30 flex items-center justify-between shadow-[0_0_30px_rgba(52,211,153,0.1),inset_0_0_15px_rgba(255,255,255,0.05)]">
                      <span className="text-emerald-100/70 font-bold uppercase tracking-wider text-sm">{stat.label}</span>
                      <span className="text-3xl font-display text-emerald-300 drop-shadow-[0_0_10px_rgba(52,211,153,0.8)]">{stat.val}</span>
                    </div>
                  ))}
                </div>
              </motion.div>

              {/* Card 3: Vision (240 deg) */}
              <motion.div 
                className="absolute w-[280px] md:w-[380px]"
                style={{ 
                  transform: "rotateY(240deg) translateZ(var(--orbit-radius))",
                  opacity: card3Opacity,
                  transformStyle: "preserve-3d"
                }}
              >
                <div className="bg-gradient-to-br from-[#061e13]/80 to-[#030e09]/80 backdrop-blur-xl p-8 rounded-[2rem] shadow-[0_0_40px_rgba(52,211,153,0.15),inset_0_0_20px_rgba(255,255,255,0.05)] border border-emerald-400/30 relative overflow-hidden">
                  <div className="absolute top-0 right-0 w-[50%] h-full bg-white/5 skew-x-12 translate-x-10 pointer-events-none" />
                  <div className="relative z-10">
                    <div className="w-12 h-12 bg-emerald-500/20 rounded-2xl flex items-center justify-center mb-5 text-emerald-300 border border-emerald-400/30 shadow-[0_0_15px_rgba(52,211,153,0.4)]">
                       <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><circle cx="12" cy="12" r="10"/><path d="M12 6v6l4 2"/></svg>
                    </div>
                    <h3 className="text-xl font-bold text-white mb-3 tracking-wide">{t.visionTitle}</h3>
                    <p className="text-emerald-100/80 text-[15px] leading-relaxed font-medium">
                      {t.visionText}
                    </p>
                  </div>
                </div>
              </motion.div>

            </motion.div>
          </div>
        </div>

        {/* Team Footer */}
        <motion.div 
          className="absolute bottom-6 md:bottom-10 text-center w-full z-50 pointer-events-none"
          style={{ opacity: useTransform(smoothProgress, [0.85, 1], [0, 1]) }}
        >
          <p className="text-emerald-200/50 font-mono text-[10px] md:text-xs tracking-[0.2em] uppercase bg-[#06150e]/80 backdrop-blur-md py-2 px-6 border border-emerald-500/10 rounded-full inline-block shadow-[0_0_20px_rgba(0,0,0,0.8)]">
            Design & Developed by the MediLink Student Collective
          </p>
        </motion.div>

      </div>
    </section>
  );
};