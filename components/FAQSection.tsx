"use client";

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useLanguage } from './LanguageContext';

export const FAQSection = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);
  const { language } = useLanguage();

  const content = {
    ko: {
      badge: "자주 묻는 질문",
      title: "궁금한 점이 있으신가요?",
      subtitle: "Асуулт байна уу?",
      faqs: [
        {
          q: "통역사를 어떻게 찾고 예약하나요?",
          a: "앱에서 진료과 또는 상황을 선택하고 평점과 가격을 비교한 후 원하는 통역사를 선택합니다. 화상 또는 현장 동행 중 선택 후 예약이 완료됩니다."
        },
        {
          q: "화상 통역과 현장 동행의 차이는 무엇인가요?",
          a: "화상 통역은 병원에서 스마트폰으로 통역사와 영상 연결합니다. 현장 동행은 통역사가 직접 병원으로 방문합니다. 현장 동행은 별도 교통비가 추가될 수 있습니다."
        },
        {
          q: "미등록 체류자도 사용할 수 있나요?",
          a: "네. 익명 모드를 지원합니다. 개인 신분 정보 없이도 통역 서비스를 이용할 수 있으며 개인정보는 수집되지 않습니다."
        },
        {
          q: "통역사가 아닌 경우 등록이 가능한가요?",
          a: "현재는 의료 통역 경력이 있는 분만 등록 가능합니다. 자격 검토 후 활성화되며 보통 2~3일 소요됩니다."
        },
        {
          q: "결제는 어떻게 이루어지나요?",
          a: "서비스 이용 후 건당 결제합니다. 카드, 카카오페이, 네이버페이를 지원합니다. 월정액 구독은 없습니다."
        },
        {
          q: "병원 예약 기능은 언제 출시되나요?",
          a: "병원 예약 자동화, 비자 서류 생성, 진료비 비교 기능은 Phase 2에서 출시됩니다. 출시 알림을 받으시려면 이메일을 등록해 주세요."
        }
      ]
    },
    mn: {
      badge: "Түгээмэл асуултууд",
      title: "Асуулт байна уу?",
      subtitle: "궁금한 점이 있으신가요?",
      faqs: [
        {
          q: "Орчуулагчийг хэрхэн олж, цаг авах вэ?",
          a: "Аппликейшн дээрээс тасаг болон нөхцөл байдлыг сонгож, үнэлгээ болон үнийг харьцуулан хүссэн орчуулагчаа сонгоно. Видео эсвэл биечлэн уулзах сонголтыг хийснээр цаг авалт баталгаажна."
        },
        {
          q: "Видео орчуулга болон биечлэн дагалдан явах хоёрын ялгаа юу вэ?",
          a: "Видео орчуулга нь эмнэлэгт ухаалаг утсаараа орчуулагчтай дүрсээр холбогдох юм. Биечлэн дагалдах нь орчуулагч эмнэлэгт өөрийн биеэр ирнэ. Биечлэн дагалдахад нэмэлт унааны төлбөр гарч болзошгүй."
        },
        {
          q: "Бүртгэлгүй оршин суугч ашиглах боломжтой юу?",
          a: "Тийм ээ. Нэрээ нууцлах горимыг дэмждэг. Хувийн мэдээлэлгүйгээр орчуулгын үйлчилгээ авах боломжтой бөгөөд хувийн мэдээлэл цуглуулдаггүй."
        },
        {
          q: "Орчуулагч биш хүн бүртгүүлэх боломжтой юу?",
          a: "Одоогоор зөвхөн эмнэлгийн орчуулгын туршлагатай хүмүүс бүртгүүлэх боломжтой. Мэргэшлийг шалгасны дараа идэвхжих бөгөөд ихэвчлэн 2-3 өдөр шаардагдана."
        },
        {
          q: "Төлбөрийг хэрхэн хийх вэ?",
          a: "Үйлчилгээг ашигласны дараа тухай бүрд төлбөр хийнэ. Карт, KakaoPay, NaverPay дэмжинэ. Сар бүрийн хураамж байхгүй."
        },
        {
          q: "Эмнэлгийн цаг авах үйлчилгээ хэзээ гарах вэ?",
          a: "Эмнэлгийн цаг авах автоматжуулалт, визний бичиг баримт бүрдүүлэх, үнийн харьцуулалт зэрэг функцүүд Phase 2-т гарна. Мэдэгдэл авах бол имэйлээ бүртгүүлнэ үү."
        }
      ]
    }
  };

  const t = content[language as keyof typeof content];

  const toggleFaq = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="bg-white py-24 px-4 md:px-8 relative overflow-hidden" id="faq">
      <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-teal/5 rounded-full blur-[100px] -z-10 pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-primary/5 rounded-full blur-[80px] -z-10 pointer-events-none" />

      <div className="max-w-[1200px] mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center flex flex-col items-center mb-16"
        >
          <div className="inline-flex items-center gap-2 bg-teal/10 border border-teal/20 text-teal px-4 py-1.5 rounded-full text-sm font-semibold mb-6">
            <span className="w-1.5 h-1.5 rounded-full bg-teal animate-pulse" />
            {t.badge}
          </div>
          <h2 className="text-[32px] md:text-[40px] font-bold text-navy mb-3">{t.title}</h2>
          <p className="text-navy/50 font-medium text-[16px]">{t.subtitle}</p>
        </motion.div>

        <div className="max-w-[680px] mx-auto flex flex-col gap-4">
          {t.faqs.map((faq, idx) => {
            const isOpen = openIndex === idx;
            return (
              <motion.div 
                key={idx}
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: idx * 0.05 }}
                className={`bg-white rounded-2xl overflow-hidden shadow-[0_4px_20px_rgb(0,0,0,0.03)] border transition-colors duration-300 ${isOpen ? 'border-teal/30' : 'border-gray-100 hover:border-gray-200'}`}
              >
                <button 
                  onClick={() => toggleFaq(idx)}
                  className="w-full flex items-center justify-between p-6 md:p-8 text-left group"
                >
                  <span className={`text-[16px] font-bold pr-6 transition-colors duration-300 ${isOpen ? 'text-teal' : 'text-navy group-hover:text-teal'}`}>{faq.q}</span>
                  <span className={`shrink-0 flex items-center justify-center w-8 h-8 rounded-full transition-all duration-300 ${isOpen ? 'bg-teal text-white rotate-180 shadow-md' : 'bg-gray-50 text-gray-400 group-hover:bg-teal/10 group-hover:text-teal'}`}>
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M6 9l6 6 6-6"/>
                    </svg>
                  </span>
                </button>
                <AnimatePresence>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3, ease: "easeInOut" }}
                    >
                      <div className="px-6 md:px-8 pb-6 md:pb-8 pt-0 text-[15px] text-navy/60 leading-relaxed">
                        <div className="pt-4 border-t border-gray-100">
                          {faq.a}
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
