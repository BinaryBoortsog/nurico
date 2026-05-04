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
      {/* Absolute Lamp Graphics Layer is available as `LampGraphics` export. */}

      {/* Children Layer: Natural Layout */}
      <div className="relative z-50 w-full flex-1 flex flex-col justify-center h-full">
        {children}
      </div>
    </div>
  );
};

export const LampGraphics = () => {
  return (
    <div className="absolute top-0 left-0 right-0 h-[400px] md:h-[500px] flex w-full scale-y-125 items-center justify-center isolate z-0 pointer-events-none">
      <motion.div
        initial={{ opacity: 0.5, width: "15rem" }}
        whileInView={{ opacity: 1, width: "30rem" }}
        transition={{ delay: 0.3, duration: 0.8, ease: "easeInOut" }}
        style={{ backgroundImage: `conic-gradient(from 70deg at center top, var(--color-primary), transparent 90deg)` }}
        className="absolute inset-auto right-1/2 h-56 overflow-visible w-[30rem] text-white"
      >
        <div className="absolute w-[100%] left-0 bg-navy-deep h-40 bottom-0 z-10 [mask-image:linear-gradient(to_top,white,transparent)]" />
        <div className="absolute w-40 h-[100%] left-0 bg-navy-deep bottom-0 z-10 [mask-image:linear-gradient(to_right,white,transparent)]" />
      </motion.div>

      <motion.div
        initial={{ opacity: 0.5, width: "15rem" }}
        whileInView={{ opacity: 1, width: "30rem" }}
        transition={{ delay: 0.3, duration: 0.8, ease: "easeInOut" }}
        style={{ backgroundImage: `conic-gradient(from 290deg at center top, transparent 270deg, var(--color-primary))` }}
        className="absolute inset-auto left-1/2 h-56 w-[30rem] text-white"
      >
        <div className="absolute w-40 h-[100%] right-0 bg-navy-deep bottom-0 z-10 [mask-image:linear-gradient(to_left,white,transparent)]" />
        <div className="absolute w-[100%] right-0 bg-navy-deep h-40 bottom-0 z-10 [mask-image:linear-gradient(to_top,white,transparent)]" />
      </motion.div>

      <div className="absolute top-1/2 h-48 w-full translate-y-12 scale-x-150 bg-navy-deep blur-2xl"></div>
      <div className="absolute top-1/2 z-10 h-48 w-full bg-transparent opacity-10 backdrop-blur-md"></div>
      <div className="absolute inset-auto z-10 h-36 w-[28rem] -translate-y-1/2 rounded-full opacity-50 blur-3xl" style={{ background: 'var(--primary-light)' }}></div>

      <motion.div
        initial={{ width: "8rem" }}
        whileInView={{ width: "16rem" }}
        transition={{ delay: 0.3, duration: 0.8, ease: "easeInOut" }}
        className="absolute inset-auto z-10 h-36 w-64 -translate-y-[6rem] rounded-full blur-2xl"
        style={{ background: 'var(--primary-light)' }}
      ></motion.div>

      <motion.div
        initial={{ width: "15rem" }}
        whileInView={{ width: "30rem" }}
        transition={{ delay: 0.3, duration: 0.8, ease: "easeInOut" }}
        className="absolute inset-auto z-10 h-0.5 w-[30rem] -translate-y-[7rem]"
        style={{ background: 'var(--primary-light)' }}
      ></motion.div>

      <div className="absolute inset-auto z-10 h-44 w-full -translate-y-[12.5rem] bg-navy-deep "></div>
    </div>
  );
};
