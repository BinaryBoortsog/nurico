"use client";

import React, { useRef, useState, useEffect, useCallback } from 'react';
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';
import { useLanguage } from './LanguageContext';

const PHASE_THEMES = [
  {
    // Phase 1 — MVP Launch — Sapphire Blue
    roadColor: 'rgba(45,110,245,0.25)',
    roadGlow: 'rgba(45,110,245,0.07)',
    nodeColor: 'rgba(45,110,245,0.4)',
    particleColors: ['#2D6EF5','#528BF8','#86AFFF','#1A4BBA','#B3CDFF'],
    particleCount: 100,
    particleSpeed: 0.8,
    blockSize: 80,
    bg: '#0A101C',
    cardBorder: 'rgba(45,110,245,0.45)',
    cardShadow: '0 20px 60px rgba(45,110,245,0.15)',
    cardBg: 'rgba(45,110,245,0.05)',
    accent: '#528BF8',
    pillText: '🚀 Launch Phase',
  },
  {
    // Phase 2 — Hospital — Teal
    roadColor: 'rgba(0,82,204,0.22)',
    roadGlow: 'rgba(0,82,204,0.06)',
    nodeColor: 'rgba(0,82,204,0.4)',
    particleColors: ['#0052CC','#00B8D9','#2D6EF5','#528BF8','#86AFFF'],
    particleCount: 140,
    particleSpeed: 1.1,
    blockSize: 65,
    bg: '#071028',
    cardBorder: 'rgba(0,82,204,0.45)',
    cardShadow: '0 20px 60px rgba(0,82,204,0.12)',
    cardBg: 'rgba(0,82,204,0.05)',
    accent: '#00B8D9',
    pillText: '⚙️ In Development',
  },
  {
    // Phase 3 — AI — Amber
    roadColor: 'rgba(186,117,23,0.22)',
    roadGlow: 'rgba(186,117,23,0.06)',
    nodeColor: 'rgba(186,117,23,0.4)',
    particleColors: ['#BA7517','#E09A2B','#F5C15E','#9A5E0A','#FDD98A'],
    particleCount: 80,
    particleSpeed: 0.6,
    blockSize: 100,
    bg: '#110D02',
    cardBorder: 'rgba(186,117,23,0.45)',
    cardShadow: '0 20px 60px rgba(186,117,23,0.12)',
    cardBg: 'rgba(186,117,23,0.05)',
    accent: '#F5C15E',
    pillText: '🧠 Future Vision',
  },
];

interface Road { x1:number; y1:number; x2:number; y2:number; dir:'h'|'v'; drawn:number }
interface Particle { x:number; y:number; vx:number; vy:number; color:string; size:number; trailLen:number; trail:{x:number;y:number}[] }

export const RoadmapSection = () => {
  const { language } = useLanguage();
  const [active, setActiveState] = useState(0);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const targetRef = useRef<HTMLDivElement>(null);
  
  const activeRef = useRef(0);
  const roadsRef = useRef<Road[]>([]);
  const particlesRef = useRef<Particle[]>([]);
  const frameRef = useRef<number>(0);
  const generateRoadsRef = useRef<(theme: typeof PHASE_THEMES[0]) => void>(() => {});
  const spawnParticlesRef = useRef<(theme: typeof PHASE_THEMES[0]) => void>(() => {});

  const { scrollYProgress } = useScroll({
    target: targetRef,
    offset: ["start start", "end end"]
  });

  // 4 total slides (Header + 3 Phases), so we translate by -75% of the 400vw width to see the last slide
  const x = useTransform(scrollYProgress, [0, 1], ["0%", "-75%"]);

  const setActive = useCallback((idx: number) => {
    if (activeRef.current === idx) return;
    setActiveState(idx);
    activeRef.current = idx;
    
    const theme = PHASE_THEMES[idx];
    if (generateRoadsRef.current && spawnParticlesRef.current) {
      generateRoadsRef.current(theme);
      spawnParticlesRef.current(theme);
    }
  }, []);

  useEffect(() => {
    const unsub = scrollYProgress.on('change', v => {
      // Logic for triggering the active phase index based on horizontal scroll progression
      // v=0 (Header), v=0.33 (Phase 1), v=0.66 (Phase 2), v=1.0 (Phase 3)
      if (v < 0.5) { 
        if (activeRef.current !== 0) setActive(0); 
      }
      else if (v < 0.83) { 
        if (activeRef.current !== 1) setActive(1); 
      }
      else { 
        if (activeRef.current !== 2) setActive(2); 
      }
    });
    return unsub;
  }, [scrollYProgress, setActive]);

  const scrollToSlide = (index: number) => {
    if (!targetRef.current) return;
    const top = targetRef.current.offsetTop;
    // index 0 is Phase 1 (slide 1), index 1 is Phase 2 (slide 2), etc.
    const slideOffset = (index + 1) * window.innerHeight; 
    window.scrollTo({ top: top + slideOffset, behavior: 'smooth' });
  };

  // Canvas setup with hardware optimization
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d', { alpha: false })!;

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = canvas.offsetWidth * dpr;
      canvas.height = canvas.offsetHeight * dpr;
      ctx.scale(dpr, dpr);
      const theme = PHASE_THEMES[activeRef.current];
      if (generateRoadsRef.current && spawnParticlesRef.current) {
        generateRoadsRef.current(theme);
        spawnParticlesRef.current(theme);
      }
    };

    generateRoadsRef.current = (theme: typeof PHASE_THEMES[0]) => {
      roadsRef.current = [];
      const cw = canvas.offsetWidth, ch = canvas.offsetHeight;
      const cols = Math.ceil(cw / theme.blockSize) + 2;
      const rows = Math.ceil(ch / theme.blockSize) + 2;
      for (let r = 0; r <= rows; r++) {
        if (Math.random() > 0.35)
          roadsRef.current.push({ x1:0, y1:r*theme.blockSize, x2:cw, y2:r*theme.blockSize, dir:'h', drawn:0 });
      }
      for (let c = 0; c <= cols; c++) {
        if (Math.random() > 0.35)
          roadsRef.current.push({ x1:c*theme.blockSize, y1:0, x2:c*theme.blockSize, y2:ch, dir:'v', drawn:0 });
      }
      roadsRef.current.forEach((road, i) => {
        setTimeout(() => animateDraw(road), i * 15);
      });
    };

    const animateDraw = (road: Road) => {
      const len = road.dir === 'h' ? Math.abs(road.x2-road.x1) : Math.abs(road.y2-road.y1);
      if (road.drawn < 1) {
        road.drawn = Math.min(road.drawn + 6 / (len || 1), 1);
        requestAnimationFrame(() => animateDraw(road));
      }
    };

    spawnParticlesRef.current = (theme: typeof PHASE_THEMES[0]) => {
      particlesRef.current = [];
      const cw = canvas.offsetWidth, ch = canvas.offsetHeight;
      for (let i = 0; i < theme.particleCount; i++) {
        const isH = Math.random() > 0.5;
        const pool = roadsRef.current.filter(r => r.dir === (isH ? 'h' : 'v'));
        if (!pool.length) continue;
        const road = pool[Math.floor(Math.random() * pool.length)];
        const color = theme.particleColors[i % theme.particleColors.length];
        const speed = (0.6 + Math.random() * 1.2) * theme.particleSpeed;
        const size = 1.2 + Math.random() * 1.5;
        const dir = Math.random() > 0.5 ? 1 : -1;
        particlesRef.current.push({
          x: isH ? Math.random() * cw : road.x1,
          y: isH ? road.y1 : Math.random() * ch,
          vx: isH ? speed * dir : 0,
          vy: isH ? 0 : speed * dir,
          color, size,
          trailLen: 12 + Math.random() * 18,
          trail: [],
        });
      }
    };

    let lastTime = 0;
    const loop = (time: number) => {
      frameRef.current = requestAnimationFrame(loop);
      
      if (time - lastTime < 16) return;
      lastTime = time;

      const cw = canvas.offsetWidth, ch = canvas.offsetHeight;
      const theme = PHASE_THEMES[activeRef.current];

      ctx.fillStyle = theme.bg;
      ctx.fillRect(0, 0, cw, ch);

      ctx.beginPath();
      roadsRef.current.forEach(road => {
        if (road.drawn <= 0) return;
        const ex = road.dir === 'h' ? road.x1 + (road.x2-road.x1)*road.drawn : road.x2;
        const ey = road.dir === 'v' ? road.y1 + (road.y2-road.y1)*road.drawn : road.y2;
        ctx.moveTo(road.x1, road.y1); ctx.lineTo(ex, ey);
      });
      ctx.strokeStyle = theme.roadGlow; ctx.lineWidth = 6; ctx.stroke();
      
      ctx.beginPath();
      roadsRef.current.forEach(road => {
        if (road.drawn <= 0) return;
        const ex = road.dir === 'h' ? road.x1 + (road.x2-road.x1)*road.drawn : road.x2;
        const ey = road.dir === 'v' ? road.y1 + (road.y2-road.y1)*road.drawn : road.y2;
        ctx.moveTo(road.x1, road.y1); ctx.lineTo(ex, ey);
      });
      ctx.strokeStyle = theme.roadColor; ctx.lineWidth = 1; ctx.stroke();

      const hR = roadsRef.current.filter(r => r.dir==='h' && r.drawn > 0.9);
      const vR = roadsRef.current.filter(r => r.dir==='v' && r.drawn > 0.9);
      if (hR.length && vR.length) {
        ctx.beginPath();
        hR.forEach(h => vR.forEach(v => {
          ctx.moveTo(v.x1 + 2.5, h.y1);
          ctx.arc(v.x1, h.y1, 2.5, 0, Math.PI*2);
        }));
        ctx.fillStyle = theme.nodeColor; ctx.fill();
      }

      particlesRef.current.forEach(p => {
        p.x += p.vx; p.y += p.vy;
        if (p.x > cw+50) p.x = -50;
        if (p.x < -50) p.x = cw+50;
        if (p.y > ch+50) p.y = -50;
        if (p.y < -50) p.y = ch+50;
        
        p.trail.push({ x: p.x, y: p.y });
        if (p.trail.length > p.trailLen) p.trail.shift();
        
        if (p.trail.length > 1) {
          ctx.beginPath();
          ctx.moveTo(p.trail[0].x, p.trail[0].y);
          for (let i = 1; i < p.trail.length; i++) {
            ctx.lineTo(p.trail[i].x, p.trail[i].y);
          }
          ctx.globalAlpha = 0.3;
          ctx.strokeStyle = p.color;
          ctx.lineWidth = p.size * 0.8;
          ctx.stroke();
          ctx.globalAlpha = 1.0;
        }

        ctx.globalAlpha = 0.25;
        ctx.beginPath(); ctx.arc(p.x, p.y, p.size*2.5, 0, Math.PI*2);
        ctx.fillStyle = p.color; ctx.fill();
        ctx.globalAlpha = 1.0;
        ctx.beginPath(); ctx.arc(p.x, p.y, p.size, 0, Math.PI*2);
        ctx.fillStyle = p.color; ctx.fill();
      });
    };

    window.addEventListener('resize', resize);
    resize();
    frameRef.current = requestAnimationFrame(loop);
    return () => {
      window.removeEventListener('resize', resize);
      cancelAnimationFrame(frameRef.current);
    };
  }, []);

  const content = {
    ko: {
      badge: '앱 개발 로드맵',
      title: '우리가 만들어갈 내일',
      subtitle: 'MediLink가 단계별로 만들어가는 의료 통역 플랫폼의 여정',
      phases: [
        { id:'Phase 1', status:'Current', icon:'🚀', title:'v1.0 MVP 출시', date:'2024년 2분기',
          items:['전문 의료 통역사 매칭 서비스','몽골어 ↔ 한국어 실시간 통역','화상 통역 및 현장 동행 예약'] },
        { id:'Phase 2', status:'In Development', icon:'⚙️', title:'v2.0 병원 예약 자동화', date:'2024년 하반기',
          items:['진료비 비교 시스템 (다병원 견적)','외국인 환자 전용 간편 예약','의료 비자 서류 자동 생성'] },
        { id:'Phase 3', status:'Planned', icon:'🧠', title:'v3.0 통합 의료 인프라', date:'2025년 상반기',
          items:['AI 기반 사전 문진 시스템','다국어 확장 (영어, 러시아어 등)','원격 진료 서비스 (Telemedicine)'] },
      ],
    },
    mn: {
      badge: 'Апп хөгжүүлэлтийн төлөвлөгөө',
      title: 'Бидний бүтээх маргааш',
      subtitle: 'MediLink-ийн үе шат бүрийн хөгжлийн зам',
      phases: [
        { id:'Phase 1', status:'Current', icon:'🚀', title:'v1.0 MVP Хувилбар', date:'2024 оны 2-р улирал',
          items:['Мэргэжлийн орчуулагчтай холбох','Монгол ↔ Солонгос орчуулга','Видео болон биечлэн дагалдах'] },
        { id:'Phase 2', status:'In Development', icon:'⚙️', title:'v2.0 Эмнэлгийн цаг захиалга', date:'2024 оны сүүлийн хагас',
          items:['Үнийн харьцуулалт','Гадаад өвчтөний цаг захиалга','Эмнэлгийн виз бичиг баримт'] },
        { id:'Phase 3', status:'Planned', icon:'🧠', title:'v3.0 Нэгдсэн систем', date:'2025 оны эхний хагас',
          items:['AI оношилгооны систем','Олон хэлний дэмжлэг','Зайнаас оношлох үйлчилгээ'] },
      ],
    },
  };

  const t = content[(language as keyof typeof content) || 'ko'];
  const currentTheme = PHASE_THEMES[active];

  return (
    <div className="relative bg-[#0B1120]" id="roadmap" ref={targetRef}>
      
      {/* 
        Scrollable Container
        400vh enables 4 distinct 'screens' of scroll depth for the horizontal track
      */}
      <div className="h-[400vh] w-full">
        
        {/* Sticky Viewport */}
        <div 
          className="sticky top-0 h-screen w-full overflow-hidden transition-colors duration-1000 ease-in-out z-0" 
          style={{ backgroundColor: currentTheme.bg }}
        >
          {/* Hardware-optimized Canvas Background */}
          <canvas ref={canvasRef} className="absolute inset-0 w-full h-full" />
          
          {/* Gradients to frame the content */}
          <div 
            className="absolute inset-0 transition-opacity duration-1000 pointer-events-none" 
            style={{ background: `radial-gradient(circle at center, transparent 0%, ${currentTheme.bg} 100%)` }} 
          />
          <div 
            className="absolute inset-0 transition-opacity duration-1000 pointer-events-none" 
            style={{ background: `linear-gradient(to bottom, ${currentTheme.bg}e6 0%, transparent 20%, transparent 80%, ${currentTheme.bg}e6 100%)` }} 
          />

          {/* 
            Horizontal Translating Track 
            Contains 4 screens (1 Header + 3 Phases), scrolling horizontally driven by vertical scroll.
          */}
          <motion.div style={{ x }} className="absolute top-0 left-0 h-full w-[400vw] flex items-center z-10">
            
            {/* Slide 0: Intro Header Section */}
            <div className="w-screen h-full flex flex-col items-center justify-center px-6">
              <motion.div
                initial={{ opacity:0, scale: 0.9 }} 
                whileInView={{ opacity:1, scale: 1 }}
                viewport={{ once:false, amount: 0.5 }} 
                transition={{ duration:0.8 }}
                className="text-center"
              >
                <div 
                  className="inline-block border px-6 py-2.5 rounded-full text-[12px] font-bold mb-6 uppercase tracking-widest transition-colors duration-700 backdrop-blur-md"
                  style={{ backgroundColor: currentTheme.cardBg, borderColor: currentTheme.cardBorder, color: currentTheme.accent }}
                >
                  {currentTheme.pillText}
                </div>
                <h2 className="text-[40px] md:text-[64px] font-extrabold text-white mb-6 leading-tight tracking-tight drop-shadow-2xl">
                  {t.title}
                </h2>
                <p className="text-white/60 text-[18px] md:text-[20px] max-w-[600px] mx-auto leading-relaxed font-light">
                  {t.subtitle}
                </p>
              </motion.div>
            </div>

            {/* Slide 1-3: Separated Phase Sections */}
            {t.phases.map((phase, i) => {
              const phaseTheme = PHASE_THEMES[i];
              return (
                <div key={i} className="w-screen h-full flex items-center justify-center px-4 md:px-8">
                  <motion.div
                    initial={{ opacity: 0, scale: 0.8 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: false, amount: 0.4 }}
                    transition={{ duration: 0.8, type: "spring", bounce: 0.4 }}
                    className="w-full max-w-[800px] p-8 md:p-14 transition-all duration-700 relative"
                  >

                    <div className="flex flex-col md:flex-row items-start md:items-center gap-8 mb-10">
                      <div 
                        className="w-20 h-20 md:w-24 md:h-24 rounded-3xl flex items-center justify-center text-4xl shadow-2xl shrink-0"
                        style={{ backgroundColor: phaseTheme.cardBorder, color: '#fff' }}
                      >
                        {phase.icon}
                      </div>
                      
                      <div>
                        <div className="flex items-center gap-3 mb-3">
                          <span className="text-[14px] font-bold uppercase tracking-widest" style={{ color: phaseTheme.accent }}>
                            {phase.id}
                          </span>
                          <span className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: phaseTheme.accent, opacity: 0.5 }} />
                          <span className="text-[14px] font-mono text-white/50">
                            {phase.date}
                          </span>
                        </div>
                        <h3 className="text-[32px] md:text-[40px] font-bold text-white leading-tight">
                          {phase.title}
                        </h3>
                      </div>
                    </div>

                    <div className="space-y-5 border-t border-white/5 pt-8">
                      {phase.items.map((item, j) => (
                        <motion.div 
                          key={j} 
                          initial={{ opacity: 0, x: -20 }}
                          whileInView={{ opacity: 1, x: 0 }}
                          transition={{ delay: 0.2 + (j * 0.1) }}
                          className="flex items-start gap-5 text-[18px] md:text-[20px] text-white/80 leading-relaxed font-medium"
                        >
                          <div 
                            className="w-8 h-8 rounded-full mt-0.5 shrink-0 flex items-center justify-center" 
                          >
                            <div className="w-2 h-2 rounded-full" style={{ backgroundColor: phaseTheme.accent }} />
                          </div>
                          {item}
                        </motion.div>
                      ))}
                    </div>
                  </motion.div>
                </div>
              );
            })}
          </motion.div>

          {/* Timeline Progress & Nav */}
          <div className="absolute bottom-12 left-0 right-0 z-20 flex flex-col items-center pointer-events-none">
            <div className="w-full max-w-[800px] px-8 flex flex-col gap-4">
              
              {/* Nav Dots */}
              <div className="flex justify-center gap-3 pointer-events-auto">
                {[0, 1, 2].map((i) => {
                  const isActive = active === i;
                  return (
                    <button 
                      key={i}
                      onClick={() => scrollToSlide(i)}
                      className="h-2 rounded-full transition-all duration-500 cursor-pointer"
                      style={{
                        width: isActive ? '40px' : '16px',
                        backgroundColor: isActive ? currentTheme.accent : 'rgba(255,255,255,0.2)',
                        boxShadow: isActive ? `0 0 12px ${currentTheme.accent}` : 'none',
                      }}
                    />
                  )
                })}
              </div>

              {/* Dynamic Progress Bar */}
              <div className="h-1 bg-white/10 rounded-full overflow-hidden w-full relative">
                <motion.div 
                  className="absolute top-0 bottom-0 left-0 rounded-full"
                  style={{ 
                    width: useTransform(scrollYProgress, [0, 1], ["0%", "100%"]),
                    backgroundColor: currentTheme.accent,
                    boxShadow: `0 0 10px ${currentTheme.accent}`
                  }}
                />
              </div>

            </div>
          </div>
          
        </div>
      </div>
    </div>
  );
};