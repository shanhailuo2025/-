import React from 'react';

export const Header: React.FC = () => {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-slate-900/95 backdrop-blur-sm border-b border-amber-900/30 h-16 flex items-center justify-center shadow-lg">
      <div className="flex items-center space-x-3">
        <div className="w-8 h-8 rounded-full border-2 border-amber-500 flex items-center justify-center bg-slate-800">
          <span className="text-amber-500 text-xs font-bold">易</span>
        </div>
        <h1 className="text-amber-500 text-lg font-serif tracking-widest font-bold">
          易财智囊
        </h1>
      </div>
    </header>
  );
};
