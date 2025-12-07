// ai-content-writer/packages/frontend/src/components/layout/MainLayout.jsx
import React, { useState } from 'react';
import { Header } from './Header';
import { Sidebar } from './Sidebar';

export function MainLayout({ children, activeNav, setActiveNav, onNavigateToAuth }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="flex h-screen bg-slate-100 dark:bg-slate-900 text-slate-800 dark:text-slate-200">
      <Sidebar
        isOpen={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
        activeNav={activeNav}
        setActiveNav={setActiveNav}
      />
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Truyền onNavigateToAuth xuống Header */}
        <Header 
            onMenuToggle={() => setSidebarOpen(!sidebarOpen)} 
            onNavigate={setActiveNav} 
            onNavigateToAuth={onNavigateToAuth}
        />
        <main className="flex-1 overflow-y-auto">
          <div className="max-w-7xl mx-auto p-4 sm:p-6 lg:p-8">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
}
