import React, { ReactNode } from 'react';

interface LayoutProps {
  children: ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <div className="min-h-screen bg-slate-50 flex flex-col items-center">
      <header className="w-full bg-white border-b border-slate-200 sticky top-0 z-50">
        <div className="max-w-5xl mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-pink-600 rounded-lg flex items-center justify-center">
               <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                 <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"></path>
                 <polyline points="3.27 6.96 12 12.01 20.73 6.96"></polyline>
                 <line x1="12" y1="22.08" x2="12" y2="12"></line>
               </svg>
            </div>
            <h1 className="text-xl font-bold text-slate-800 tracking-tight">AI Product Planner <span className="text-xs font-medium text-pink-600 bg-pink-50 px-2 py-0.5 rounded-full ml-1">LGU+ Edition</span></h1>
          </div>
          <div className="text-sm text-slate-500 hidden sm:block">
            Powered by Gemini 2.5 Flash
          </div>
        </div>
      </header>
      <main className="w-full max-w-5xl px-4 py-8 flex-grow">
        {children}
      </main>
      <footer className="w-full py-6 text-center text-slate-400 text-sm">
        &copy; {new Date().getFullYear()} AI Product Planning Tool. All rights reserved.
      </footer>
    </div>
  );
};

export default Layout;