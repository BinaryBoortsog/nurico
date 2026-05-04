"use client";

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useLanguage } from './LanguageContext';

const content = {
  ko: {
    badge: '문의하기',
    title: '함께 만들어가는\n의료 미래',
    subtitle: '파트너십, 병원 등록, 번역사 등록, 또는 다른 문의사항이 있으신가요?\n메디링크 팀이 신속하게 답변드리겠습니다.',
    form: {
      name: '이름',
      namePlaceholder: '홍길동',
      email: '이메일',
      emailPlaceholder: 'example@email.com',
      phone: '연락처',
      phonePlaceholder: '+82 10-0000-0000',
      category: '문의 유형',
      categories: [
        { value: 'general', label: '일반 문의' },
        { value: 'hospital', label: '병원 등록' },
        { value: 'translator', label: '번역사 등록' },
        { value: 'partnership', label: '파트너십' },
        { value: 'press', label: '언론 / 홍보' },
      ],
      message: '메시지',
      messagePlaceholder: '문의 내용을 자유롭게 작성해 주세요...',
      submit: '문의 보내기',
      submitting: '전송 중...',
      success: '문의가 성공적으로 접수되었습니다. 빠른 시일 내에 답변드리겠습니다.',
    },
    info: {
      title: '연락처 정보',
      email: { label: '이메일', value: 'contact@medilink.kr' },
      phone: { label: '전화', value: '+82 2-0000-0000' },
      location: { label: '위치', value: '대한민국 서울특별시' },
      hours: { label: '운영 시간', value: '평일 09:00 – 18:00 (KST)' },
    },
    cards: [
      { icon: '🏥', title: '병원 등록', desc: '외국인 환자 유치를 위한 병원 등록 서비스' },
      { icon: '🌐', title: '번역사 등록', desc: '의료 통역 전문가로 활동하세요' },
      { icon: '🤝', title: '파트너십', desc: '메디링크와 함께 성장하는 비즈니스 파트너' },
    ],
  },
  mn: {
    badge: 'Холбоо барих',
    title: 'Эрүүл мэндийн\nирээдүйг хамт бүтээцгээе',
    subtitle: 'Түншлэл, эмнэлэг бүртгэл, орчуулагч бүртгэл эсвэл бусад асуулга байна уу?\nМедиЛинк баг хурдан хугацаанд хариулах болно.',
    form: {
      name: 'Нэр',
      namePlaceholder: 'Батбаяр',
      email: 'Имэйл',
      emailPlaceholder: 'example@email.com',
      phone: 'Утас',
      phonePlaceholder: '+976 9900-0000',
      category: 'Асуулгын төрөл',
      categories: [
        { value: 'general', label: 'Ерөнхий асуулга' },
        { value: 'hospital', label: 'Эмнэлэг бүртгэл' },
        { value: 'translator', label: 'Орчуулагч бүртгэл' },
        { value: 'partnership', label: 'Түншлэл' },
        { value: 'press', label: 'Хэвлэл мэдээлэл' },
      ],
      message: 'Мессеж',
      messagePlaceholder: 'Асуулгаа чөлөөтэй бичнэ үү...',
      submit: 'Асуулга илгээх',
      submitting: 'Илгээж байна...',
      success: 'Асуулга амжилттай илгээгдлээ. Удахгүй хариулах болно.',
    },
    info: {
      title: 'Холбоо барих мэдээлэл',
      email: { label: 'Имэйл', value: 'contact@medilink.kr' },
      phone: { label: 'Утас', value: '+82 2-0000-0000' },
      location: { label: 'Байршил', value: 'Сөүл, Өмнөд Солонгос' },
      hours: { label: 'Ажлын цаг', value: 'Ажлын өдрүүд 09:00 – 18:00 (KST)' },
    },
    cards: [
      { icon: '🏥', title: 'Эмнэлэг бүртгэл', desc: 'Гадаадын өвчтөнүүдийг татах эмнэлэг бүртгэл' },
      { icon: '🌐', title: 'Орчуулагч бүртгэл', desc: 'Эмнэлгийн орчуулагчаар ажиллаарай' },
      { icon: '🤝', title: 'Түншлэл', desc: 'МедиЛинктэй хамт өсөх бизнесийн түнш' },
    ],
  },
};

export const ContactSection = () => {
  const { language } = useLanguage();
  const t = content[language as keyof typeof content] ?? content.ko;

  const [formState, setFormState] = useState({
    name: '', email: '', phone: '', category: 'general', message: '',
  });
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormState(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    await new Promise(r => setTimeout(r, 1400));
    setLoading(false);
    setSubmitted(true);
  };

  const fadeUp = {
    hidden: { opacity: 0, y: 32 },
    show: (i: number) => ({ opacity: 1, y: 0, transition: { delay: i * 0.1, duration: 0.6, ease: 'easeOut' } }),
  };

  return (
    <section className="min-h-screen pt-28 pb-24 px-4 relative overflow-hidden" style={{ background: 'var(--color-primary-light)' }}>
      {/* Background decoration */}
      <div className="absolute inset-0 pointer-events-none z-0">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[900px] h-[500px] rounded-full blur-3xl opacity-30"
          style={{ background: 'radial-gradient(ellipse, var(--color-primary-mid) 0%, transparent 70%)' }} />
        <div className="absolute inset-0" style={{
          backgroundImage: 'linear-gradient(rgba(0,82,204,0.04) 1px,transparent 1px),linear-gradient(90deg,rgba(0,82,204,0.04) 1px,transparent 1px)',
          backgroundSize: '40px 40px',
        }} />
      </div>

      <div className="relative z-10 max-w-6xl mx-auto">
        {/* Header */}
        <motion.div className="text-center mb-16" initial="hidden" animate="show" custom={0} variants={fadeUp}>
          <span className="inline-block px-4 py-1.5 rounded-full text-xs font-semibold tracking-widest uppercase mb-4"
            style={{ background: 'rgba(0,82,204,0.12)', color: 'var(--color-primary)' }}>
            {t.badge}
          </span>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-display font-normal leading-tight mb-4"
            style={{ color: 'var(--color-navy)' }}>
            {t.title.split('\n').map((line, i) => (
              <React.Fragment key={i}>{line}{i < t.title.split('\n').length - 1 && <br />}</React.Fragment>
            ))}
          </h1>
          <p className="text-base md:text-lg max-w-2xl mx-auto leading-relaxed"
            style={{ color: 'var(--color-muted-foreground)' }}>
            {t.subtitle.split('\n').map((line, i) => (
              <React.Fragment key={i}>{line}{i < t.subtitle.split('\n').length - 1 && <br />}</React.Fragment>
            ))}
          </p>
        </motion.div>

        {/* Quick cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-14">
          {t.cards.map((card, i) => (
            <motion.div key={i} initial="hidden" animate="show" custom={i + 1} variants={fadeUp}
              className="flex items-start gap-4 p-5 rounded-2xl border"
                style={{ background: 'rgba(255,255,255,0.7)', borderColor: 'rgba(0,82,204,0.15)', backdropFilter: 'blur(8px)' }}>
              <span className="text-3xl">{card.icon}</span>
              <div>
                <p className="font-semibold text-sm mb-1" style={{ color: 'var(--color-navy)' }}>{card.title}</p>
                <p className="text-xs leading-relaxed" style={{ color: 'var(--color-muted-foreground)' }}>{card.desc}</p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Main grid: Form + Info */}
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
          {/* Contact Form */}
          <motion.div className="lg:col-span-3" initial="hidden" animate="show" custom={2} variants={fadeUp}>
            <div className="rounded-3xl p-8 shadow-xl border"
              style={{ background: 'rgba(255,255,255,0.85)', borderColor: 'rgba(0,82,204,0.12)', backdropFilter: 'blur(16px)' }}>
              {submitted ? (
                <motion.div className="flex flex-col items-center justify-center text-center py-16 gap-4"
                  initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }}>
                  <div className="w-16 h-16 rounded-full flex items-center justify-center text-3xl"
                    style={{ background: 'rgba(0,82,204,0.12)' }}>✅</div>
                  <p className="text-base font-semibold" style={{ color: 'var(--color-primary)' }}>{t.form.success}</p>
                </motion.div>
              ) : (
                <form onSubmit={handleSubmit} className="flex flex-col gap-5">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <div className="flex flex-col gap-1.5">
                      <label className="text-xs font-semibold" style={{ color: 'var(--color-navy)' }}>{t.form.name}</label>
                      <input name="name" required value={formState.name} onChange={handleChange}
                        placeholder={t.form.namePlaceholder}
                        className="px-4 py-2.5 rounded-xl border text-sm outline-none transition-all focus:ring-2"
                        style={{ borderColor: 'rgba(0,82,204,0.2)', background: '#fff', color: 'var(--color-navy)' }} />
                    </div>
                    <div className="flex flex-col gap-1.5">
                      <label className="text-xs font-semibold" style={{ color: 'var(--color-navy)' }}>{t.form.email}</label>
                      <input name="email" type="email" required value={formState.email} onChange={handleChange}
                        placeholder={t.form.emailPlaceholder}
                        className="px-4 py-2.5 rounded-xl border text-sm outline-none transition-all focus:ring-2"
                        style={{ borderColor: 'rgba(0,82,204,0.2)', background: '#fff', color: 'var(--color-navy)' }} />
                    </div>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <div className="flex flex-col gap-1.5">
                      <label className="text-xs font-semibold" style={{ color: 'var(--color-navy)' }}>{t.form.phone}</label>
                      <input name="phone" value={formState.phone} onChange={handleChange}
                        placeholder={t.form.phonePlaceholder}
                        className="px-4 py-2.5 rounded-xl border text-sm outline-none transition-all focus:ring-2"
                        style={{ borderColor: 'rgba(0,82,204,0.2)', background: '#fff', color: 'var(--color-navy)' }} />
                    </div>
                    <div className="flex flex-col gap-1.5">
                      <label className="text-xs font-semibold" style={{ color: 'var(--color-navy)' }}>{t.form.category}</label>
                      <select name="category" value={formState.category} onChange={handleChange}
                        className="px-4 py-2.5 rounded-xl border text-sm outline-none transition-all focus:ring-2 cursor-pointer"
                        style={{ borderColor: '#E8E6E1', background: '#fff', color: 'var(--color-navy)' }}>
                        {t.form.categories.map(c => (
                          <option key={c.value} value={c.value}>{c.label}</option>
                        ))}
                      </select>
                    </div>
                  </div>
                  <div className="flex flex-col gap-1.5">
                    <label className="text-xs font-semibold" style={{ color: 'var(--color-navy)' }}>{t.form.message}</label>
                    <textarea name="message" required rows={5} value={formState.message} onChange={handleChange}
                      placeholder={t.form.messagePlaceholder}
                      className="px-4 py-3 rounded-xl border text-sm outline-none transition-all focus:ring-2 resize-none"
                        style={{ borderColor: 'rgba(0,82,204,0.2)', background: '#fff', color: 'var(--color-navy)' }} />
                  </div>
                  <motion.button type="submit" disabled={loading}
                    whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}
                    className="w-full py-3.5 rounded-xl font-semibold text-sm text-white shadow-lg transition-all disabled:opacity-70"
                    style={{ background: 'linear-gradient(135deg, var(--dark-section), #111111)' }}>
                    {loading ? (
                      <span className="flex items-center justify-center gap-2">
                        <svg className="animate-spin w-4 h-4" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                        </svg>
                        {t.form.submitting}
                      </span>
                    ) : t.form.submit}
                  </motion.button>
                </form>
              )}
            </div>
          </motion.div>

          {/* Info Panel */}
          <motion.div className="lg:col-span-2 flex flex-col gap-6" initial="hidden" animate="show" custom={3} variants={fadeUp}>
            <div className="rounded-3xl p-7 shadow-xl border flex-1"
                style={{ background: 'linear-gradient(135deg, var(--color-primary-dark) 0%, var(--color-primary) 100%)', borderColor: 'transparent' }}>
              <h2 className="text-lg font-semibold text-white mb-6">{t.info.title}</h2>
              <div className="flex flex-col gap-5">
                {[
                  { icon: '✉️', ...t.info.email },
                  { icon: '📞', ...t.info.phone },
                  { icon: '📍', ...t.info.location },
                  { icon: '🕐', ...t.info.hours },
                ].map((item, i) => (
                  <div key={i} className="flex items-start gap-3">
                    <div className="w-9 h-9 rounded-xl flex items-center justify-center text-base flex-shrink-0"
                      style={{ background: 'rgba(255,255,255,0.15)' }}>
                      {item.icon}
                    </div>
                    <div>
                      <p className="text-xs font-medium opacity-70 text-white mb-0.5">{item.label}</p>
                      <p className="text-sm font-semibold text-white">{item.value}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Social links */}
            <div className="rounded-3xl p-6 border"
              style={{ background: 'rgba(255,255,255,0.7)', borderColor: '#E8E6E1', backdropFilter: 'blur(8px)' }}>
              <p className="text-xs font-semibold mb-4" style={{ color: 'var(--color-navy)' }}>SNS / 소셜 미디어</p>
              <div className="flex flex-col gap-3">
                {[
                  { label: 'Instagram', handle: '@medilink.kr', icon: '📸', href: '#' },
                  { label: 'KakaoTalk', handle: '@메디링크', icon: '💬', href: '#' },
                  { label: 'LinkedIn', handle: 'MediLink Korea', icon: '💼', href: '#' },
                ].map((s, i) => (
                  <a key={i} href={s.href}
                    className="flex items-center gap-3 px-4 py-2.5 rounded-xl border transition-all hover:shadow-md group"
                    style={{ borderColor: '#E8E6E1', background: '#fff' }}>
                    <span className="text-xl">{s.icon}</span>
                    <div>
                      <p className="text-xs font-semibold" style={{ color: 'var(--color-navy)' }}>{s.label}</p>
                      <p className="text-xs" style={{ color: 'var(--color-muted-foreground)' }}>{s.handle}</p>
                    </div>
                  </a>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
