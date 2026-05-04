"use client";

import React, { useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { SectionBadge } from './ui/SectionBadge';
import { useLanguage } from './LanguageContext';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { LampGraphics } from './ui/lamp';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

const INJECTED_STYLES = `
  .card-sheen {
    position: absolute; inset: 0; border-radius: inherit;
    pointer-events: none; z-index: 50;
    background: radial-gradient(800px circle at var(--mx, 50%) var(--my, 50%), rgba(218,41,53,0.09) 0%, transparent 40%);
    mix-blend-mode: screen;
  }
  .screen-glare {
    background: linear-gradient(110deg, rgba(255,255,255,0.07) 0%, rgba(255,255,255,0) 45%);
  }
  .hw-btn {
    background: linear-gradient(90deg, #404040 0%, #171717 100%);
    box-shadow: -2px 0 5px rgba(0,0,0,0.8), inset -1px 0 1px rgba(255,255,255,0.15);
    border-left: 1px solid rgba(255,255,255,0.05);
  }
  .widget-depth {
    background: linear-gradient(180deg, rgba(255,255,255,0.04) 0%, rgba(255,255,255,0.01) 100%);
    box-shadow: 0 8px 16px rgba(0,0,0,0.3), inset 0 1px rgba(255,255,255,0.05);
    border: 1px solid rgba(255,255,255,0.03);
  }
  .floating-badge-glass {
    background: rgba(255,255,255,0.85);
    backdrop-filter: blur(20px);
    -webkit-backdrop-filter: blur(20px);
    box-shadow: 0 0 0 1px rgba(26,26,26,0.08), 0 20px 40px -10px rgba(0,0,0,0.15), inset 0 1px rgba(255,255,255,0.9);
  }
  @keyframes dip {
    0%, 100% { opacity: 1; box-shadow: 0 0 7px rgba(218,41,53,0.8); }
    50% { opacity: 0.3; box-shadow: none; }
  }
  .di-dot { animation: dip 2s infinite; }

  /* Lamp visuals moved to components/ui/lamp.tsx (LampGraphics) */
`;

export const HeroSection = () => {
  const { language } = useLanguage();
  const containerRef = useRef<HTMLDivElement>(null);
  const pCardRef = useRef<HTMLDivElement>(null);
  const phoneMockupRef = useRef<HTMLDivElement>(null);
  const rafRef = useRef<number>(0);

  const content = {
    ko: {
      badge: "한국-몽골 전문 의료 통역 서비스",
      titleTop: "언어 장벽 없는",
      titleHighlight: "최고의 의료 서비스",
      subtitle: "Хэлний саадгүйгээр хамгийн шилдэг эмнэлгийн үйлчилгээ",
      desc: "검증된 전문 의료 통역사가 병원 예약부터 진료, 수술 동행까지 모든 과정을 몽골어로 투명하게 도와드립니다.",
      btn1: "통역사 예약하기",
      btn2: "이용 가이드 보기",
      ctaTitle: "지금 시작하세요",
      ctaDesc: "앱을 다운로드하고 5분 안에 전문 의료 통역사와 연결됩니다.",
      cardTitle: "언어의 장벽이\n생명의 장벽이\n되지 않도록",
      cardDesc: "검증된 전문 의료 통역사가 병원 예약부터 진료, 수술 동행까지 몽골어로 모든 과정을 투명하게 도와드립니다.",
      matching: "실시간 매칭 중...",
      appGreeting: "MediLink",
      appTitle: "통역사 찾기",
      badge1Title: "통역 완료",
      badge1Sub: "서울아산병원",
      badge2Title: "4.9점 평가",
      badge2Sub: "매우 만족합니다",
    },
    mn: {
      badge: "Солонгос-Монгол эмнэлгийн орчуулгын үйлчилгээ",
      titleTop: "Хэлний саадгүйгээр",
      titleHighlight: "шилдэг үйлчилгээ",
      subtitle: "언어 장벽 없는 최고의 의료 서비스",
      desc: "Мэргэжлийн орчуулагч эмнэлгийн цаг захиалахаас эхлээд эмчилгээ, мэс засал хүртэлх бүх үйл явцыг таны эх хэлээр туслах болно.",
      btn1: "Орчуулагч захиалах",
      btn2: "Зааварчилгаа үзэх",
      ctaTitle: "Одоо эхэлцгээе",
      ctaDesc: "Апп татаж аваад 5 минутад мэргэжлийн орчуулагчтай холбогдоорой.",
      cardTitle: "Хэлний бэрхшээл\nамь насны бэрхшээл\nболохгүй байхын тулд",
      cardDesc: "Мэргэжлийн орчуулагч эмнэлгийн цаг захиалахаас эхлэн бүх үйл явцыг таны эх хэлээр туслах болно.",
      matching: "Холбогдож байна...",
      appGreeting: "MediLink",
      appTitle: "Орчуулагч хайх",
      badge1Title: "Орчуулга дууссан",
      badge1Sub: "Сөүлийн эмнэлэг",
      badge2Title: "4.9 оноо",
      badge2Sub: "Маш сайн байлаа",
    },
  };

  const t = content[(language as keyof typeof content) || 'ko'];

  // ── MOUSE SHEEN + 3D TILT ──
  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      cancelAnimationFrame(rafRef.current);
      rafRef.current = requestAnimationFrame(() => {
        if (!pCardRef.current || !phoneMockupRef.current) return;
        const r = pCardRef.current.getBoundingClientRect();
        pCardRef.current.style.setProperty('--mx', `${e.clientX - r.left}px`);
        pCardRef.current.style.setProperty('--my', `${e.clientY - r.top}px`);
        const x = (e.clientX / window.innerWidth - 0.5) * 2;
        const y = (e.clientY / window.innerHeight - 0.5) * 2;
        gsap.to(phoneMockupRef.current, {
          rotationY: x * 10,
          rotationX: -y * 10,
          ease: 'power3.out',
          duration: 1.2,
        });
      });
    };
    window.addEventListener('mousemove', onMove);
    return () => {
      window.removeEventListener('mousemove', onMove);
      cancelAnimationFrame(rafRef.current);
    };
  }, []);

  // ── GSAP CINEMATIC TIMELINE ──
  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const ctx = gsap.context(() => {
      gsap.set('.p-card', { autoAlpha: 0, y: 200 });
      gsap.set('.hero-tag1', { opacity: 0, y: 40, filter: 'blur(16px)' });
      gsap.set('.hero-tag2', { opacity: 0, y: 40, filter: 'blur(16px)', clipPath: 'inset(0 100% 0 0)' });

      gsap.timeline({ delay: 0.25 })
        .to('.hero-tag1', { duration: 1.4, opacity: 1, y: 0, filter: 'blur(0px)', ease: 'expo.out' })
        .to('.hero-tag2', { duration: 1.3, opacity: 1, y: 0, filter: 'blur(0px)', clipPath: 'inset(0 0% 0 0)', ease: 'power4.inOut' }, '-=0.9');

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: el,
          start: 'top top',
          end: 'bottom bottom',
          scrub: 1.2,
        },
      });

      tl
        .to(['.hero-text-layer', '.hero-lamp'], {
          scale: 1.1, opacity: 0, filter: 'blur(16px)',
          duration: 1.5, ease: 'power2.inOut',
        }, 0)
        .to('.p-card', { autoAlpha: 1, y: 0, ease: 'power3.inOut', duration: 2 }, 0.4)
        .to('.p-card', { width: '100vw', height: '100vh', borderRadius: '0px', ease: 'power3.inOut', duration: 1.5 })
        .fromTo('.mockup-wrap',
          { y: 280, rotationX: 45, rotationY: -25, opacity: 0, scale: 0.6 },
          { y: 0, rotationX: 0, rotationY: 0, opacity: 1, scale: 1, ease: 'expo.out', duration: 2 },
          '-=0.5')
        .fromTo(
          ['.float-badge-1', '.float-badge-2', '.card-inner-left', '.card-inner-right'],
          { y: 40, opacity: 0 },
          { y: 0, opacity: 1, ease: 'power4.out', duration: 1.2, stagger: 0.1 },
          '-=1')
        .to({}, { duration: 1.5 })
        .to(['.mockup-wrap', '.float-badge-1', '.float-badge-2', '.card-inner-left', '.card-inner-right'], {
          scale: 0.9, y: -28, opacity: 0, ease: 'power3.in', duration: 0.8, stagger: 0.05,
        })
        .to('.p-card', {
          width: '88vw', height: '86vh', borderRadius: '36px',
          opacity: 0.4, ease: 'expo.inOut', duration: 1.2,
        }, 'cta')
        .to('.cta-layer', {
          opacity: 1, scale: 1, filter: 'blur(0px)',
          pointerEvents: 'auto', ease: 'expo.inOut', duration: 1.2,
        }, 'cta')
        .to(['.p-card', '.cta-layer'], {
          y: '-110vh', opacity: 0, ease: 'power3.in', duration: 1.2,
        }, '+=0.5');

    }, el);

    return () => ctx.revert();
  }, []);

  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: INJECTED_STYLES }} />

      {/* ── SCROLL CONTAINER ── */}
      <div
        ref={containerRef}
        className="relative w-full bg-[#f7f3e8]"
        style={{ height: '400vh' }}
        id="hero"
      >
        <div
          className="hero-sticky sticky top-0 h-screen w-full overflow-hidden"
          style={{ perspective: '2000px' }}
        >
          {/* Grid pattern — dark dots on light bg */}
          <div
            className="absolute inset-0 pointer-events-none z-0"
            style={{
              backgroundSize: '60px 60px',
              backgroundImage:
                'linear-gradient(rgba(26,26,26,0.05) 1px,transparent 1px),linear-gradient(90deg,rgba(26,26,26,0.05) 1px,transparent 1px)',
              maskImage: 'radial-gradient(ellipse at 50% 30%,black 0%,transparent 65%)',
              WebkitMaskImage: 'radial-gradient(ellipse at 50% 30%,black 0%,transparent 65%)',
            }}
          />

          {/* Lamp graphics — use shared LampGraphics component */}
          <LampGraphics />

          {/* ── HERO TEXT LAYER ── */}
          <div className="hero-text-layer absolute inset-0 flex flex-col items-center justify-center text-center px-6 z-10 pointer-events-none pt-[72px]">
            <div className="mb-5">
              <SectionBadge text={t.badge} />
            </div>

            {/* Line 1 — dark charcoal */}
            <h1
              className="hero-tag1 text-[2.5rem] md:text-[4.5rem] lg:text-[5.5rem] font-display font-normal leading-[1.05] tracking-tight text-[#1A1A1A]"
            >
              {t.titleTop}
            </h1>

            {/* Line 2 — editorial red */}
            <h1
              className="hero-tag2 text-[2.5rem] md:text-[4.5rem] lg:text-[5.5rem] font-display font-extrabold leading-[1.05] tracking-tight mb-4"
              style={{
                backgroundImage: 'linear-gradient(180deg,#DA2935 0%,#B01F2A 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
                filter: 'drop-shadow(0 4px 12px rgba(218,41,53,0.2))',
              }}
            >
              {t.titleHighlight}
            </h1>

            {/* Mongolian subtitle */}
            <p
              className="font-medium text-base lg:text-lg mb-5 italic opacity-80"
              style={{ color: '#DA2935' }}
            >
              {t.subtitle}
            </p>

            {/* Description */}
            <p className="text-[#757575] text-base max-w-[480px] leading-relaxed mb-10">
              {t.desc}
            </p>

            {/* Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 pointer-events-auto">
              <button
                className="bg-[#DA2935] text-white px-8 h-13 rounded-xl font-semibold text-[15px] hover:-translate-y-0.5 active:scale-[0.98] transition-all duration-200 flex items-center gap-2"
                style={{ boxShadow: '0 12px 24px rgba(218,41,53,0.3),0 0 0 1px rgba(218,41,53,0.15)' }}
              >
                {t.btn1}
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <path d="M5 12h14M12 5l7 7-7 7" />
                </svg>
              </button>
              <button className="bg-white border border-[#E8E6E1] text-[#1A1A1A] px-8 h-13 rounded-xl font-semibold text-[15px] hover:bg-[#F6F5F2] hover:border-[#D0CEC9] transition-all">
                {t.btn2}
              </button>
            </div>

            {/* Stats row */}
            <div className="flex gap-8 mt-10 pt-8 border-t border-[#E8E6E1] pointer-events-none">
              {[
                { val: '12', unit: '명+', label: '전문 통역사' },
                { val: '4.9', unit: '점', label: '만족도' },
                { val: '5', unit: '분', label: '평균 연결' },
              ].map((s, i) => (
                <div key={i} className="text-center">
                  <div className="text-2xl font-display font-bold text-[#1A1A1A]">
                    {s.val}<span className="text-sm text-[#DA2935] font-semibold">{s.unit}</span>
                  </div>
                  <div className="text-xs text-[#757575] mt-1">{s.label}</div>
                </div>
              ))}
            </div>
          </div>

          {/* ── CTA LAYER ── */}
          <div
            className="cta-layer absolute inset-0 flex flex-col items-center justify-center text-center px-6 z-30 pointer-events-none pt-[72px]"
            style={{ opacity: 0, transform: 'scale(0.85)', filter: 'blur(20px)' }}
          >
            <h2
              className="text-[2rem] md:text-[3.5rem] lg:text-[4.5rem] font-display font-bold leading-tight tracking-tight mb-4"
              style={{
                backgroundImage: 'linear-gradient(180deg,#DA2935 0%,#B01F2A 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
              }}
            >
              {t.ctaTitle}
            </h2>
            <p className="text-[#757575] text-base max-w-[380px] mb-10 leading-relaxed">
              {t.ctaDesc}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 pointer-events-auto">
              {/* App Store */}
              <button
                className="flex items-center gap-3 px-7 py-3.5 rounded-2xl border-none cursor-pointer font-semibold text-sm text-white"
                style={{
                  background: 'linear-gradient(180deg,#E8323E,#DA2935)',
                  boxShadow: '0 12px 24px rgba(218,41,53,0.35),inset 0 1px rgba(255,255,255,0.2)',
                }}
              >
                <svg width="20" height="20" fill="currentColor" viewBox="0 0 384 512">
                  <path d="M318.7 268.7c-.2-36.7 16.4-64.4 50-84.8-18.8-26.9-47.2-41.7-84.7-44.6-35.5-2.8-74.3 20.7-88.5 20.7-15 0-49.4-19.7-76.4-19.7C63.3 141.2 4 184.8 4 273.5q0 39.3 14.4 81.2c12.8 36.7 59 126.7 107.2 125.2 25.2-.6 43-17.9 75.8-17.9 31.8 0 48.3 17.9 76.4 17.9 48.6-.7 90.4-82.5 102.6-119.3-65.2-30.7-61.7-90-61.7-91.9zm-56.6-164.2c27.3-32.4 24.8-61.9 24-72.5-24.1 1.4-52 16.4-67.9 34.9-17.5 19.8-27.8 44.3-25.6 71.9 26.1 2 49.9-11.4 69.5-34.3z" />
                </svg>
                <div className="text-left">
                  <div style={{ fontSize: '9px', opacity: .7, letterSpacing: '.06em', textTransform: 'uppercase' }}>Download on the</div>
                  <div style={{ fontSize: '15px', fontWeight: 700, lineHeight: 1.1 }}>App Store</div>
                </div>
              </button>

              {/* Google Play */}
              <button
                className="flex items-center gap-3 px-7 py-3.5 rounded-2xl cursor-pointer font-semibold text-sm text-[#1A1A1A]"
                style={{
                  background: '#fff',
                  border: '1px solid #E8E6E1',
                  boxShadow: '0 2px 8px rgba(0,0,0,0.06)',
                }}
              >
                <svg width="18" height="18" fill="currentColor" viewBox="0 0 512 512">
                  <path d="M325.3 234.3L104.6 13l280.8 161.2-60.1 60.1zM47 0C34 6.8 25.3 19.2 25.3 35.3v441.3c0 16.1 8.7 28.5 21.7 35.3l256.6-256L47 0zm425.2 225.6l-58.9-34.1-65.7 64.5 65.7 64.5 60.1-34.1c18-14.3 18-46.5-1.2-60.8zM104.6 499l280.8-161.2-60.1-60.1L104.6 499z" />
                </svg>
                <div className="text-left">
                  <div style={{ fontSize: '9px', opacity: .5, letterSpacing: '.06em', textTransform: 'uppercase' }}>Get it on</div>
                  <div style={{ fontSize: '15px', fontWeight: 700, lineHeight: 1.1 }}>Google Play</div>
                </div>
              </button>
            </div>
          </div>

          {/* ── PREMIUM CARD ── */}
          <div
            className="absolute inset-0 z-20 flex items-center justify-center pointer-events-none pt-[72px]"
            style={{ perspective: '1500px' }}
          >
            <div
              ref={pCardRef}
              className="p-card relative overflow-hidden pointer-events-auto flex items-center justify-center"
              style={{
                width: '88vw',
                height: '86vh',
                borderRadius: '36px',
                background: 'linear-gradient(145deg,#2A1A1A,#1A0D0D)',
                boxShadow: '0 40px 100px -20px rgba(0,0,0,0.6),0 20px 40px -20px rgba(0,0,0,0.5),inset 0 1px 2px rgba(255,255,255,0.08)',
                border: '1px solid rgba(218,41,53,0.15)',
                visibility: 'hidden',
              }}
            >
              <div className="card-sheen" />

              {/* Card inner grid */}
              <div
                className="relative w-full h-full grid items-center gap-5 px-8 lg:px-12 py-8 z-10"
                style={{ gridTemplateColumns: '1fr 260px 1fr' }}
              >

                {/* LEFT */}
                <div className="card-inner-left flex flex-col opacity-0">
                  <h3
                    className="text-2xl lg:text-3xl font-bold mb-4 leading-snug whitespace-pre-line"
                    style={{
                      backgroundImage: 'linear-gradient(180deg,#fff,rgba(218,41,53,0.7))',
                      WebkitBackgroundClip: 'text',
                      WebkitTextFillColor: 'transparent',
                      backgroundClip: 'text',
                      filter: 'drop-shadow(0 8px 16px rgba(0,0,0,0.7))',
                    }}
                  >
                    {t.cardTitle}
                  </h3>
                  <p className="text-sm leading-relaxed mb-6 max-w-[260px]" style={{ color: 'rgba(255,255,255,0.55)' }}>
                    {t.cardDesc.split('몽골어').map((part, i, arr) =>
                      i < arr.length - 1
                        ? <React.Fragment key={i}>{part}<span style={{ color: '#E85C66', fontWeight: 600 }}>몽골어</span></React.Fragment>
                        : part
                    )}
                  </p>
                  {/* Stats */}
                  <div className="flex gap-5">
                    {[
                      { val: '12', unit: '명+', label: '전문 통역사' },
                      { val: '4.9', unit: '점', label: '만족도' },
                      { val: '5', unit: '분', label: '평균 연결' },
                    ].map((s, i) => (
                      <div key={i} className="text-center">
                        <div className="text-xl font-bold" style={{ color: 'rgba(255,255,255,0.9)' }}>
                          {s.val}<sup className="text-xs" style={{ color: '#DA2935' }}>{s.unit}</sup>
                        </div>
                        <div className="text-[10px] mt-1" style={{ color: 'rgba(255,255,255,0.3)' }}>{s.label}</div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* CENTER — PHONE */}
                <div
                  className="mockup-wrap relative flex items-center justify-center h-full opacity-0"
                  style={{ transformStyle: 'preserve-3d' }}
                >
                  <div
                    ref={phoneMockupRef}
                    style={{
                      position: 'relative',
                      width: '240px',
                      height: '490px',
                      borderRadius: '2.8rem',
                      background: '#111',
                      boxShadow: 'inset 0 0 0 2px #52525B, inset 0 0 0 6px #000, 0 40px 80px -15px rgba(0,0,0,0.9)',
                      transformStyle: 'preserve-3d',
                    }}
                  >
                    {/* Hardware buttons */}
                    {[
                      { top: '105px', left: '-3px', height: '22px', borderRadius: '2px 0 0 2px' },
                      { top: '140px', left: '-3px', height: '38px', borderRadius: '2px 0 0 2px' },
                      { top: '192px', left: '-3px', height: '38px', borderRadius: '2px 0 0 2px' },
                    ].map((s, i) => (
                      <div key={i} className="hw-btn absolute" style={{ ...s, width: '3px' }} />
                    ))}
                    <div className="hw-btn absolute" style={{ top: '150px', right: '-3px', width: '3px', height: '58px', borderRadius: '0 2px 2px 0', transform: 'scaleX(-1)' }} />

                    {/* Screen */}
                    <div style={{ position: 'absolute', inset: '6px', background: '#F2F0EC', borderRadius: '2.3rem', overflow: 'hidden', zIndex: 10, display: 'flex', flexDirection: 'column' }}>
                      <div className="screen-glare absolute inset-0 z-40 pointer-events-none" />

                      {/* Dynamic Island */}
                      <div style={{ position: 'absolute', top: '5px', left: '50%', transform: 'translateX(-50%)', width: '100px', height: '26px', background: '#000', borderRadius: '16px', zIndex: 50 }} />

                      {/* Search bar */}
                      <div style={{ background: '#fff', borderBottom: '1px solid #E8E6E1', padding: '36px 12px 8px', display: 'flex', flexDirection: 'column', gap: '7px', position: 'relative', zIndex: 15 }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', background: '#F6F5F2', borderRadius: '22px', padding: '7px 12px' }}>
                          <svg width="13" height="13" viewBox="0 0 13 13" fill="none"><circle cx="5.5" cy="5.5" r="4" stroke="#9a9a9a" strokeWidth="1.2" /><path d="M9 9L11 11" stroke="#9a9a9a" strokeWidth="1.2" strokeLinecap="round" /></svg>
                          <span style={{ fontSize: '11px', color: '#9a9a9a', flex: 1 }}>Hospital, clinic, or address</span>
                          <svg width="12" height="12" viewBox="0 0 12 12" fill="none"><circle cx="6" cy="6" r="5" stroke="#9a9a9a" strokeWidth="1.1" /><path d="M6 1c0 0-2 2.5-2 5s2 5 2 5M6 1c0 0 2 2.5 2 5s-2 5-2 5M1 6h10" stroke="#9a9a9a" strokeWidth="1" /></svg>
                        </div>
                        <div style={{ display: 'flex', gap: '5px', overflow: 'hidden' }}>
                          {['Now', 'English ✓', 'Medical ✓', '< 5km ✓'].map((f, i) => (
                            <div key={i} style={{ fontSize: '9px', fontWeight: 600, padding: '3px 8px', borderRadius: '20px', border: `1.5px solid ${i === 0 ? '#1A1A1A' : '#E8E6E1'}`, background: i === 0 ? '#1A1A1A' : '#fff', color: i === 0 ? '#fff' : '#1a1a1a', whiteSpace: 'nowrap' as const, flexShrink: 0 }}>{f}</div>
                          ))}
                        </div>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '5px', fontSize: '10px', color: '#757575' }}>
                          <div style={{ width: '7px', height: '7px', borderRadius: '50%', background: '#DA2935' }} />
                          12 translators nearby
                        </div>
                      </div>

                      {/* Map */}
                      <div style={{ flex: 1, position: 'relative', background: '#EDE8DF', overflow: 'hidden' }}>
                        {/* Roads */}
                        <div style={{ position: 'absolute', left: 0, right: 0, top: '44%', height: '13px', background: '#fff', borderRadius: '4px', transform: 'rotate(-4deg)' }} />
                        <div style={{ position: 'absolute', left: 0, right: 0, top: '62%', height: '9px', background: '#fff', borderRadius: '3px', transform: 'rotate(7deg)' }} />
                        <div style={{ position: 'absolute', left: '38%', top: 0, bottom: 0, width: '11px', background: '#fff', borderRadius: '3px', transform: 'rotate(-2deg)' }} />
                        {/* Park */}
                        <div style={{ position: 'absolute', left: '4%', top: '6%', width: '28%', height: '20%', background: '#D4E8C8', borderRadius: '6px' }} />
                        {/* Blocks */}
                        <div style={{ position: 'absolute', left: '2%', top: '30%', width: '15%', height: '13%', background: '#D8D2C8', borderRadius: '5px' }} />
                        <div style={{ position: 'absolute', left: '55%', top: '8%', width: '20%', height: '18%', background: '#D0CAC0', borderRadius: '5px' }} />
                        <div style={{ position: 'absolute', right: '4%', bottom: '30%', width: '16%', height: '14%', background: '#D8D2C8', borderRadius: '5px' }} />
                        {/* H hospital */}
                        <div style={{ position: 'absolute', left: '16%', top: '56%', width: '20px', height: '20px', borderRadius: '5px', background: '#DA2935', color: '#fff', fontSize: '11px', fontWeight: 800, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>H</div>
                        {/* My location */}
                        <div style={{ position: 'absolute', left: '45%', top: '54%', width: '13px', height: '13px', borderRadius: '50%', background: '#2B99FF', border: '3px solid #fff', boxShadow: '0 2px 8px rgba(43,153,255,0.5)', transform: 'translate(-50%,-50%)' }} />
                        {/* Min pin */}
                        <div style={{ position: 'absolute', left: '57%', top: '22%', transform: 'translate(-50%,-50%)', background: '#fff', borderRadius: '18px', padding: '4px 8px', display: 'flex', alignItems: 'center', gap: '4px', boxShadow: '0 3px 12px rgba(0,0,0,0.15)', whiteSpace: 'nowrap' as const }}>
                          <div style={{ width: '20px', height: '20px', borderRadius: '50%', background: '#E8E6E1', fontSize: '8px', fontWeight: 700, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>MS</div>
                          <span style={{ fontSize: '10px', fontWeight: 700, color: '#1a1a1a' }}>Min</span>
                          <span style={{ fontSize: '10px', color: '#757575' }}>★ 4.8</span>
                        </div>
                        {/* Jiwoo pin (selected) */}
                        <div style={{ position: 'absolute', left: '29%', top: '47%', transform: 'translate(-50%,-50%)', background: '#1a1a1a', borderRadius: '18px', padding: '4px 9px', display: 'flex', alignItems: 'center', gap: '4px', boxShadow: '0 4px 16px rgba(0,0,0,0.3)', whiteSpace: 'nowrap' as const, zIndex: 5 }}>
                          <div style={{ width: '20px', height: '20px', borderRadius: '50%', background: '#DA2935', fontSize: '8px', fontWeight: 700, color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>JW</div>
                          <span style={{ fontSize: '10px', fontWeight: 700, color: '#fff' }}>Jiwoo</span>
                          <span style={{ fontSize: '10px', color: 'rgba(255,255,255,0.65)' }}>★ 4.9</span>
                        </div>
                        {/* Sora pin */}
                        <div style={{ position: 'absolute', right: '7%', top: '38%', transform: 'translate(0,-50%)', background: '#fff', borderRadius: '18px', padding: '4px 8px', display: 'flex', alignItems: 'center', gap: '4px', boxShadow: '0 3px 12px rgba(0,0,0,0.12)', whiteSpace: 'nowrap' as const }}>
                          <div style={{ width: '20px', height: '20px', borderRadius: '50%', background: '#E8E6E1', fontSize: '8px', fontWeight: 700, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>SR</div>
                          <span style={{ fontSize: '10px', fontWeight: 700, color: '#1a1a1a' }}>Sora</span>
                          <span style={{ fontSize: '10px', color: '#757575' }}>★ 5</span>
                        </div>
                        {/* Zoom */}
                        <div style={{ position: 'absolute', right: '10px', top: '10px', width: '28px', height: '28px', background: '#fff', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 2px 8px rgba(0,0,0,0.12)', fontSize: '16px', color: '#1a1a1a' }}>+</div>
                      </div>

                      {/* Bottom sheet */}
                      <div style={{ background: '#fff', borderRadius: '18px 18px 0 0', boxShadow: '0 -4px 20px rgba(0,0,0,0.08)' }}>
                        <div style={{ width: '32px', height: '3.5px', borderRadius: '2px', background: '#E8E6E1', margin: '7px auto 0' }} />
                        {/* SOS */}
                        <div style={{ margin: '8px 10px 0', borderRadius: '12px', background: 'linear-gradient(95deg,#F5C0C3,#DA2935)', padding: '10px 12px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                          <div style={{ background: '#fff', color: '#DA2935', fontSize: '10px', fontWeight: 800, padding: '5px 7px', borderRadius: '7px', flexShrink: 0 }}>SOS</div>
                          <div style={{ flex: 1 }}>
                            <div style={{ fontSize: '11px', fontWeight: 700, color: '#fff' }}>Emergency? Hold for help.</div>
                            <div style={{ fontSize: '10px', color: 'rgba(255,255,255,0.9)' }}>Live medical translator • 119 dispatch</div>
                          </div>
                          <div style={{ width: '28px', height: '28px', borderRadius: '8px', background: 'rgba(255,255,255,0.18)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', fontSize: '16px' }}>›</div>
                        </div>
                        {/* Translator card */}
                        <div style={{ margin: '7px 10px 0', background: '#fff', border: '1px solid #F0EEE9', borderRadius: '12px', padding: '9px 10px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                          <div style={{ width: '38px', height: '38px', borderRadius: '10px', background: '#E8E6E1', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 700, fontSize: '11px', color: '#1a1a1a', flexShrink: 0 }}>JP</div>
                          <div style={{ flex: 1 }}>
                            <div style={{ fontSize: '12px', fontWeight: 700, color: '#1a1a1a', display: 'flex', alignItems: 'center', gap: '4px' }}>
                              Jiwoo Park
                              <span style={{ fontSize: '9px', color: '#2A7A5A', fontWeight: 600 }}>✓ Verified</span>
                            </div>
                            <div style={{ fontSize: '10px', color: '#757575', marginTop: '1px' }}>★ 4.9 &nbsp;•&nbsp; 0.4 km &nbsp;•&nbsp; 6 min</div>
                          </div>
                          <button style={{ background: '#DA2935', color: '#fff', fontSize: '11px', fontWeight: 700, padding: '7px 12px', borderRadius: '9px', border: 'none', cursor: 'pointer', flexShrink: 0 }}>Book</button>
                        </div>
                        {/* Bottom nav */}
                        <div style={{ height: '56px', display: 'flex', alignItems: 'center', justifyContent: 'space-around', padding: '0 8px 4px', background: '#fff', borderTop: '1px solid #F0EEE9', marginTop: '6px' }}>
                          {[{ icon: '📍', label: 'Find', active: true }, { icon: '📅', label: 'Bookings', active: false }].map((item, i) => (
                            <div key={i} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '2px', flex: 1 }}>
                              <span style={{ fontSize: '16px' }}>{item.icon}</span>
                              <span style={{ fontSize: '9px', fontWeight: item.active ? 700 : 500, color: item.active ? '#1a1a1a' : '#9a9a9a' }}>{item.label}</span>
                            </div>
                          ))}
                          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', flex: 1 }}>
                            <div style={{ width: '46px', height: '46px', borderRadius: '50%', background: '#DA2935', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', fontSize: '10px', fontWeight: 800, boxShadow: '0 4px 14px rgba(218,41,53,0.4)', marginTop: '-18px', border: '3px solid #fff' }}>SOS</div>
                          </div>
                          {[{ icon: '💬', label: 'Chats' }, { icon: '👤', label: 'Me' }].map((item, i) => (
                            <div key={i} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '2px', flex: 1 }}>
                              <span style={{ fontSize: '16px' }}>{item.icon}</span>
                              <span style={{ fontSize: '9px', fontWeight: 500, color: '#9a9a9a' }}>{item.label}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Floating badge 1 */}
                  <div
                    className="float-badge-1 floating-badge-glass absolute"
                    style={{ top: '8%', left: '-130px', borderRadius: '14px', padding: '10px 14px', display: 'flex', alignItems: 'center', gap: '10px', zIndex: 30, minWidth: '155px' }}
                  >
                    <div style={{ width: '32px', height: '32px', borderRadius: '50%', background: 'rgba(218,41,53,0.1)', border: '1px solid rgba(218,41,53,0.2)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '14px', flexShrink: 0 }}>🏥</div>
                    <div>
                      <div style={{ fontSize: '11px', fontWeight: 700, color: '#1A1A1A' }}>{t.badge1Title}</div>
                      <div style={{ fontSize: '9px', color: '#757575' }}>{t.badge1Sub}</div>
                    </div>
                  </div>

                  {/* Floating badge 2 */}
                  <div
                    className="float-badge-2 floating-badge-glass absolute"
                    style={{ bottom: '16%', right: '-130px', borderRadius: '14px', padding: '10px 14px', display: 'flex', alignItems: 'center', gap: '10px', zIndex: 30, minWidth: '155px' }}
                  >
                    <div style={{ width: '32px', height: '32px', borderRadius: '50%', background: 'rgba(218,41,53,0.1)', border: '1px solid rgba(218,41,53,0.2)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '14px', flexShrink: 0 }}>⭐</div>
                    <div>
                      <div style={{ fontSize: '11px', fontWeight: 700, color: '#1A1A1A' }}>{t.badge2Title}</div>
                      <div style={{ fontSize: '9px', color: '#757575' }}>{t.badge2Sub}</div>
                    </div>
                  </div>
                </div>

                {/* RIGHT — BRAND */}
                <div className="card-inner-right flex justify-end items-center opacity-0">
                  <h2
                    className="text-[3.5rem] lg:text-[6rem] font-black uppercase tracking-tight text-right leading-[0.92]"
                    style={{
                      backgroundImage: 'linear-gradient(180deg,#fff,rgba(218,41,53,0.6))',
                      WebkitBackgroundClip: 'text',
                      WebkitTextFillColor: 'transparent',
                      backgroundClip: 'text',
                      filter: 'drop-shadow(0 10px 20px rgba(0,0,0,0.8))',
                    }}
                  >
                    Medi<br />Link
                  </h2>
                </div>

              </div>
            </div>
          </div>

        </div>
      </div>
    </>
  );
};