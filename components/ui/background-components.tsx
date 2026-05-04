import { cn } from "@/lib/utils";
import React from "react";

export const AboutBackground = ({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) => {
  return (
    <div className={cn("min-h-screen w-full bg-[var(--color-muted)] relative", className)}>
      {/* Soft Medilink Theme Glow */}
      <div
        className="absolute inset-0 z-0 pointer-events-none"
        style={{
          backgroundImage: `radial-gradient(circle at top center, rgba(0,82,204,0.12) 0%, transparent 70%)`,
        }}
      />
      
      {/* Grid with Dots Background */}
      <div
        className="absolute inset-0 z-0 pointer-events-none"
        style={{
          backgroundImage: `
            linear-gradient(to right, rgba(0,82,204,0.05) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(0,82,204,0.05) 1px, transparent 1px),
            radial-gradient(circle, rgba(0,82,204,0.08) 1px, transparent 1px)
          `,
          backgroundSize: "30px 30px, 30px 30px, 30px 30px",
          backgroundPosition: "0 0, 0 0, 0 0",
        }}
      />
      
      {/* Your Content/Components */}
      <div className="relative z-10 w-full h-full">
        {children}
      </div>
    </div>
  );
};
