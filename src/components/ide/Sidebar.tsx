'use client';

import { Files, Search, Sparkles, Settings } from 'lucide-react';

interface SidebarItem {
  icon: React.ReactNode;
  label: string;
  active?: boolean;
}

export function Sidebar() {
  const items: SidebarItem[] = [
    { icon: <Files size={24} />, label: 'Explorer', active: true },
    { icon: <Search size={24} />, label: 'Search' },
    { icon: <Sparkles size={24} />, label: 'AI' },
    { icon: <Settings size={24} />, label: 'Settings' },
  ];

  return (
    <div className="w-[60px] h-full bg-[#18181b] flex flex-col items-center py-2 border-r border-[#2d2d2d]">
      {items.map((item, index) => (
        <button
          key={index}
          className={`w-full h-[50px] flex items-center justify-center text-[#808080] hover:text-white transition-colors relative ${
            item.active ? 'text-white' : ''
          }`}
          title={item.label}
        >
          {item.active && (
            <div className="absolute left-0 top-0 bottom-0 w-[2px] bg-white" />
          )}
          {item.icon}
        </button>
      ))}
      <div className="flex-1" />
    </div>
  );
}
