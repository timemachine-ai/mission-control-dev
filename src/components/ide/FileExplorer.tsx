'use client';

import { FileCode, ChevronDown } from 'lucide-react';
import { useSandpack } from '@codesandbox/sandpack-react';

export function FileExplorer() {
  const { sandpack } = useSandpack();
  const { files, activeFile, setActiveFile } = sandpack;

  const fileList = Object.keys(files).filter(
    (f) => !f.includes('package.json') && !f.includes('tsconfig')
  );

  return (
    <div className="w-[200px] h-full bg-[#1e1e1e] border-r border-[#2d2d2d] flex flex-col">
      <div className="h-[35px] flex items-center px-4 text-[11px] font-semibold text-[#bbbbbb] uppercase tracking-wider">
        Explorer
      </div>
      <div className="px-2">
        <div className="flex items-center gap-1 text-[#cccccc] text-sm py-1 cursor-pointer hover:bg-[#2d2d2d] px-2 rounded">
          <ChevronDown size={16} />
          <span className="font-semibold text-[11px] uppercase">src</span>
        </div>
        <div className="ml-4">
          {fileList.map((file) => {
            const fileName = file.replace('/', '');
            const isActive = activeFile === file;
            return (
              <button
                key={file}
                onClick={() => setActiveFile(file)}
                className={`w-full flex items-center gap-2 text-sm py-1 px-2 rounded cursor-pointer transition-colors ${
                  isActive
                    ? 'bg-[#094771] text-white'
                    : 'text-[#cccccc] hover:bg-[#2d2d2d]'
                }`}
              >
                <FileCode size={16} className="text-[#519aba] flex-shrink-0" />
                <span className="truncate">{fileName}</span>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
