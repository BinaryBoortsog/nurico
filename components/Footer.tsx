import React from 'react';

export const Footer = () => {
  return (
    <footer className="bg-navy-deep py-12 px-4 md:px-8 border-t border-white/5" id="footer" style={{ color: '#000000' }}>
      <div className="max-w-[1200px] mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 mb-12">
          {/* Col 1 */}
          <div className="lg:col-span-1">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M12 5v14M5 12h14" />
                </svg>
              </div>
              <span className="text-white text-lg font-bold tracking-tight">MediLink</span>
            </div>
            <p className="text-white/45 text-[13px] mb-1">한국-몽골 의료 통역 연결 플랫폼</p>
            <p className="text-white/35 text-[12px] mb-4">Эмнэлгийн орчуулагч холбох платформ</p>
            <a href="mailto:contact@medilink.kr" className="text-white/45 text-[13px] hover:text-white transition-colors">
              contact@medilink.kr
            </a>
          </div>

          {/* Col 2 */}
          <div>
            <h4 className="font-bold text-white mb-6 text-[15px]">서비스</h4>
            <ul className="space-y-3">
              <li><a href="/roadmap" className="text-white/45 text-[13px] hover:text-primary-soft transition-colors">앱 개발 로드맵</a></li>
            </ul>
          </div>

          {/* Col 3 */}
          <div>
            <h4 className="font-bold text-white mb-6 text-[15px]">회사</h4>
            <ul className="space-y-3">
              <li><a href="/about" className="text-white/45 text-[13px] hover:text-primary-soft transition-colors">회사 소개</a></li>
              <li><a href="#" className="text-white/45 text-[13px] hover:text-primary-soft transition-colors">이용약관</a></li>
              <li><a href="#" className="text-white/45 text-[13px] hover:text-primary-soft transition-colors">개인정보처리방침</a></li>
            </ul>
          </div>

          {/* Col 4 */}
          <div>
            <h4 className="font-bold text-white mb-6 text-[15px]">문의</h4>
            <ul className="space-y-3">
              <li><a href="#" className="text-white/45 text-[13px] hover:text-primary-soft transition-colors">카카오톡 @medilink</a></li>
              <li><a href="mailto:contact@medilink.kr" className="text-white/45 text-[13px] hover:text-primary-soft transition-colors">contact@medilink.kr</a></li>
              <li><a href="#faq" className="text-white/45 text-[13px] hover:text-primary-soft transition-colors">FAQ</a></li>
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-white/35 text-[12px]">
            © 2025 MediLink. All rights reserved.
          </p>
          <div className="text-white/35 text-[12px]">
            v1 — 통역사 연결 서비스
          </div>
        </div>
      </div>
    </footer>
  );
};
