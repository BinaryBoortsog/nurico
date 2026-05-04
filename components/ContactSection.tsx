"use client";
import React from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

export const LampContainer = ({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) => {
  return (
    <div
      className={cn(
        "relative flex min-h-screen flex-col items-center justify-center overflow-hidden bg-navy-deep w-full z-0",
        className
      )}
    >
      <div className="relative z-50 w-full flex-1 flex flex-col justify-center h-full">
        {children}
      </div>
    </div>
  );
};

export const LampGraphics = () => {
  return (
    <div
      className="absolute left-0 right-0 flex w-full items-start justify-center isolate pointer-events-none overflow-visible"
      style={{ top: '56px', height: '320px', zIndex: 40 }}
    >
      {/* ── BEAMS WRAPPER (Fades the bottom into transparency) ── */}
      <div 
        className="absolute inset-0 w-full flex justify-center"
        style={{
          WebkitMaskImage: 'linear-gradient(to top, transparent 0%, white 40%)',
          maskImage: 'linear-gradient(to top, transparent 0%, white 40%)',
        }}
      >
        {/* ── LEFT CONIC BEAM ── */}
        <motion.div
          initial={{ opacity: 0.5, width: "15rem" }}
          whileInView={{ opacity: 1, width: "30rem" }}
          transition={{ delay: 0.3, duration: 0.8, ease: "easeInOut" }}
          style={{
            backgroundImage: `conic-gradient(from 70deg at center top, var(--color-primary), transparent 90deg)`,
            position: 'absolute',
            right: '50%',
            top: 0,
            height: '240px',
            WebkitMaskImage: 'linear-gradient(to right, transparent 0%, white 20%)',
            maskImage: 'linear-gradient(to right, transparent 0%, white 20%)',
          }}
          className="w-[30rem]"
        />

        {/* ── RIGHT CONIC BEAM ── */}
        <motion.div
          initial={{ opacity: 0.5, width: "15rem" }}
          whileInView={{ opacity: 1, width: "30rem" }}
          transition={{ delay: 0.3, duration: 0.8, ease: "easeInOut" }}
          style={{
            backgroundImage: `conic-gradient(from 290deg at center top, transparent 270deg, var(--color-primary))`,
            position: 'absolute',
            left: '50%',
            top: 0,
            height: '240px',
            WebkitMaskImage: 'linear-gradient(to left, transparent 0%, white 20%)',
            maskImage: 'linear-gradient(to left, transparent 0%, white 20%)',
          }}
          className="w-[30rem]"
        />
      </div>

      {/* ── HORIZONTAL LIGHT LINE ── */}
      <motion.div
        initial={{ width: "15rem", opacity: 0 }}
        whileInView={{ width: "30rem", opacity: 1 }}
        transition={{ delay: 0.3, duration: 0.8, ease: "easeInOut" }}
        className="absolute left-1/2 -translate-x-1/2"
        style={{
          top: '0px',
          height: '1.5px',
          background: 'var(--color-primary)',
          borderRadius: '1px',
          boxShadow: '0 0 8px rgba(218,41,53,0.6), 0 0 24px rgba(218,41,53,0.3)',
        }}
      />

      {/* ── CENTRE GLOW ORBS ── */}
      <div
        className="absolute left-1/2 -translate-x-1/2"
        style={{
          top: '-30px',
          width: '320px',
          height: '100px',
          borderRadius: '50%',
          background: 'rgba(218,41,53,0.15)',
          filter: 'blur(32px)',
        }}
      />
      <motion.div
        initial={{ width: "8rem", opacity: 0 }}
        whileInView={{ width: "14rem", opacity: 0.7 }}
        transition={{ delay: 0.3, duration: 0.8, ease: "easeInOut" }}
        className="absolute left-1/2 -translate-x-1/2"
        style={{
          top: '-16px',
          height: '48px',
          borderRadius: '50%',
          background: 'rgba(218,41,53,0.25)',
          filter: 'blur(18px)',
        }}
      />

      {/* ── LAMP SHAFT ── */}
      <div
        className="absolute left-1/2 -translate-x-1/2"
        style={{
          top: '-56px',
          width: '2px',
          height: '58px',
          background: 'linear-gradient(to bottom, transparent 0%, rgba(218,41,53,0.7) 60%, rgba(218,41,53,0.9) 100%)',
          borderRadius: '1px',
        }}
      />

      {/* ── LAMP DOT ── */}
      <div
        className="absolute left-1/2 -translate-x-1/2"
        style={{
          top: '-2px',
          width: '8px',
          height: '8px',
          borderRadius: '50%',
          background: '#DA2935',
          boxShadow: '0 0 12px rgba(218,41,53,1), 0 0 32px rgba(218,41,53,0.5), 0 0 60px rgba(218,41,53,0.2)',
          marginLeft: '-4px',
        }}
      />
    </div>
  );
};