'use client';

import { Check, Radio } from 'lucide-react';

export function ActivityBar() {
  return (
    <div className="h-[25px] bg-[#007acc] flex items-center px-3 text-white text-xs">
      <div className="flex items-center gap-4">
        <span className="flex items-center gap-1">
          <Check size={14} />
          Ready
        </span>
        <span className="flex items-center gap-1">
          <Radio size={14} />
          Port: 3000
        </span>
        <span>Prettier: On</span>
      </div>
      <div className="flex-1" />
      <div className="flex items-center gap-4">
        <span>Remotion 4.0.100</span>
        <span>TypeScript</span>
      </div>
    </div>
  );
}
