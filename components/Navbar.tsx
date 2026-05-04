"use client";

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { useLanguage } from './LanguageContext';

export const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { language, setLanguage } = useLanguage();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: '회사 소개', mn: 'Бидний тухай', href: '/about' },
    { name: '앱 개발 로드맵', mn: 'Хөгжүүлэлтийн төлөвлөгөө', href: '/roadmap' },
    { name: '문의', mn: 'Холбоо барих', href: '/contact' },
  ];

  const handleScrollTo = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    // If it's a normal page link (like /about), let default navigation happen
    if (!href.includes('#')) {
      return;
    }

    // If not on home page and trying to scroll to a section on home page
    if (href.startsWith('/#') && window.location.pathname !== '/') {
      return; // Let default navigation happen
    }
    
    e.preventDefault();
    setIsMobileMenuOpen(false);
    
    const targetId = href.replace('/', '');
    const element = document.querySelector(targetId);
    if (element) {
      const top = element.getBoundingClientRect().top + window.scrollY - 80;
      window.scrollTo({ top, behavior: 'smooth' });
    }
  };

  return (
    <header 
      className="fixed top-0 left-0 right-0 z-60 h-[72px] transition-all duration-300 flex items-center shadow-sm"
      style={{ background: '#FFFFFF', borderBottom: '1px solid #E8E6E1' }}
    >
      <div className="max-w-[1200px] w-full mx-auto px-4 md:px-8 flex items-center justify-between">
        {/* Logo */}
        <a href="#" className="flex items-center">
          <img src="/logo.png" alt="MediLink" className="h-10 md:h-12 w-auto object-contain" />
        </a>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <a 
              key={link.name} 
              href={link.href}
              onClick={(e) => handleScrollTo(e, link.href)}
              className="text-[#757575] text-sm font-semibold hover:text-[#1A1A1A] transition-colors"
            >
              {language === 'ko' ? link.name : link.mn}
            </a>
          ))}
        </nav>

        {/* CTA & Mobile Toggle */}
        <div className="flex items-center gap-4">
          <div className="hidden md:flex items-center justify-center p-1 rounded-full text-xs font-semibold select-none" style={{ background: '#FFFFFF', border: '1px solid #E8E6E1' }}>
            <button 
              onClick={() => setLanguage('mn')}
              className={`px-2.5 py-1 rounded-full transition-colors ${language === 'mn' ? 'bg-[#DA2935] text-white shadow-sm' : 'text-[#757575] hover:text-[#1A1A1A] cursor-pointer'}`}
            >
              MN
            </button>
            <button 
              onClick={() => setLanguage('ko')}
              className={`px-2.5 py-1 rounded-full transition-colors ${language === 'ko' ? 'bg-[#DA2935] text-white shadow-sm' : 'text-[#757575] hover:text-[#1A1A1A] cursor-pointer'}`}
            >
              KO
            </button>
          </div>
            <Link href="/coming-soon" className="hidden md:block px-5 py-2 rounded-xl font-semibold text-sm transition-all duration-300" style={{ background: '#1A1A1A', color: '#FFFFFF' }}>
            앱 다운로드
          </Link>
          
          <button 
            className="md:hidden"
            style={{ color: '#757575' }}
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              {isMobileMenuOpen ? (
                <path d="M18 6L6 18M6 6l12 12" />
              ) : (
                <path d="M4 12h16M4 6h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div 
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="absolute top-[72px] left-0 right-0 bg-card border-b border-border shadow-lg overflow-hidden md:hidden"
          >
            <div className="flex flex-col px-4 py-4 gap-2">
              {navLinks.map((link) => (
                <a 
                  key={link.name} 
                  href={link.href}
                  onClick={(e) => handleScrollTo(e, link.href)}
                  className="flex flex-col py-3 border-b border-border/50"
                >
                  <span className="text-foreground text-sm font-semibold">{language === 'ko' ? link.name : link.mn}</span>
                  <span className="text-muted-foreground/60 text-xs">{language === 'ko' ? link.mn : link.name}</span>
                </a>
              ))}
              <div className="flex items-center gap-3 mt-4">
                <div className="flex-1 flex p-1 border border-border rounded-xl select-none bg-muted/50">
                  <button 
                    onClick={() => setLanguage('mn')}
                    className={`flex-1 text-center py-2.5 rounded-lg text-sm font-semibold transition-colors cursor-pointer ${language === 'mn' ? 'bg-primary text-white shadow-sm' : 'text-muted-foreground hover:text-foreground'}`}
                  >
                    MN
                  </button>
                  <button 
                    onClick={() => setLanguage('ko')}
                    className={`flex-1 text-center py-2.5 rounded-lg text-sm font-semibold transition-colors cursor-pointer ${language === 'ko' ? 'bg-primary text-white shadow-sm' : 'text-muted-foreground hover:text-foreground'}`}
                  >
                    KO
                  </button>
                </div>
                <Link href="/coming-soon" className="flex-1 py-3.5 rounded-xl font-semibold text-sm text-center" style={{ background: '#1A1A1A', color: '#FFFFFF' }}>
                  앱 다운로드
                </Link>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};
