// ai-content-writer/packages/frontend/src/components/layout/Sidebar.jsx
import React from 'react';
import { X, Home, Sparkles, History, BarChart3, Settings, FileText, LogOut } from 'lucide-react';
import { useTheme } from '../../hooks/useTheme';

const NAV_ITEMS = [
  { id: 'home', label: 'Trang Chính', icon: Home },
  { id: 'chat', label: 'Soạn Thảo AI', icon: Sparkles },
  { id: 'history', label: 'Lịch Sử', icon: History },
  { id: 'analytics', label: 'Phân Tích', icon: BarChart3 },
];

export function Sidebar({ isOpen, onClose, activeNav, setActiveNav }) {
  const { theme } = useTheme();

  const handleNavClick = (id) => {
    setActiveNav(id);
    onClose();
  };

  return (
    <>
      <div
        className={`fixed inset-0 bg-black/60 md:hidden z-30 transition-opacity ${isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
        onClick={onClose}
      />
      <aside className={`fixed md:relative flex flex-col left-0 top-0 h-full w-64 bg-slate-900 text-slate-300 transform transition-transform md:transform-none z-40 ${isOpen ? 'translate-x-0' : '-translate-x-full'}`}>
        <div className="p-4 border-b border-slate-800 flex justify-between items-center h-16">
          <div className="flex items-center gap-3">
            <div className={`bg-gradient-to-br ${theme.gradient} p-2 rounded-lg`}>
              <FileText size={22} className="text-white" />
            </div>
            <h1 className="text-xl font-bold text-white">ContentAI</h1>
          </div>
          <button onClick={onClose} className="md:hidden p-1">
            <X size={24} />
          </button>
        </div>

        <nav className="flex-1 p-4 space-y-2 mt-4">
          {NAV_ITEMS.map(({ id, label, icon: Icon }) => (
            <button
              key={id}
              onClick={() => handleNavClick(id)}
              className={`w-full flex items-center gap-3 px-4 py-2.5 rounded-lg text-sm font-semibold transition-all duration-200 ${
                activeNav === id
                  ? `bg-gradient-to-r ${theme.gradient} text-white shadow-lg`
                  : 'hover:bg-slate-800'
              }`}
            >
              <Icon size={20} />
              <span>{label}</span>
            </button>
          ))}
        </nav>

        {/* ✅ FOOTER ĐÃ ĐƯỢC TINH GỌN */}
        <div className="p-4 border-t border-slate-800 space-y-2">
          <button 
            onClick={() => handleNavClick('settings')}
            className="w-full flex items-center gap-3 px-4 py-2.5 rounded-lg text-sm font-semibold hover:bg-slate-800 transition-colors"
          >
            <Settings size={20} />
            <span>Cài Đặt</span>
          </button>
           <button className="w-full flex items-center gap-3 px-4 py-2.5 rounded-lg text-sm font-semibold hover:bg-slate-800 transition-colors text-red-400">
            <LogOut size={20} />
            <span>Đăng Xuất</span>
          </button>
        </div>
      </aside>
    </>
  );
}
