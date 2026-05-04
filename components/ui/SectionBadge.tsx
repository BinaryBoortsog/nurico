import React from 'react';

interface SectionBadgeProps {
  text: string;
}

export const SectionBadge: React.FC<SectionBadgeProps> = ({ text }) => {
  return (
    <div className="inline-flex items-center gap-3 rounded-full border px-5 py-2" style={{ background: '#FDECED', borderColor: '#F5A0A5' }}>
      <span className="h-2 w-2 rounded-full animate-pulse" style={{ background: '#DA2935' }} />
      <span className="font-mono text-xs uppercase tracking-[0.15em]" style={{ color: '#DA2935' }}>
        {text}
      </span>
    </div>
  );
};
