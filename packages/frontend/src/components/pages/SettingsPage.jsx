// ai-content-writer/packages/frontend/src/components/pages/SettingsPage.jsx
import React from 'react';
import { THEMES } from '../../utils/themes';
import { useTheme } from '../../hooks/useTheme';
import { LifeBuoy, Shield } from 'lucide-react';

export function SettingsPage() {
  const { theme, setTheme } = useTheme();

  return (
    <div className="space-y-8 animate-fade-in-up">
      <div>
        <h1 className="text-3xl font-bold text-slate-900 dark:text-white">Cài Đặt</h1>
        <p className="text-slate-600 dark:text-slate-400 mt-1">Tùy chỉnh giao diện và tài khoản của bạn.</p>
      </div>

      <div className="bg-white dark:bg-slate-800 p-6 rounded-xl shadow-sm border border-slate-200 dark:border-slate-700">
        <h2 className="text-xl font-bold mb-6 text-slate-900 dark:text-white">🎨 Giao Diện</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {Object.entries(THEMES).map(([key, t]) => (
            <button
              key={key}
              onClick={() => setTheme(t)}
              className={`p-4 rounded-lg border-2 transition-transform transform hover:scale-105 ${
                theme.name === t.name 
                  ? 'border-blue-500 ring-2 ring-offset-2 ring-blue-500 dark:ring-offset-slate-800' 
                  : 'border-slate-300 dark:border-slate-600'
              }`}
            >
              <div className={`h-12 bg-gradient-to-r ${t.gradient} rounded-md mb-3 shadow-inner`} />
              <p className="font-semibold dark:text-white text-sm">{t.name}</p>
            </button>
          ))}
        </div>
      </div>

      <div className="bg-white dark:bg-slate-800 p-6 rounded-xl shadow-sm border border-slate-200 dark:border-slate-700">
        <h2 className="text-xl font-bold mb-4 text-slate-900 dark:text-white">Trợ Giúp & Pháp Lý</h2>
        <div className="space-y-2">
          <button className="w-full flex items-center gap-3 px-3 py-2 rounded-md text-sm text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors text-left">
            <LifeBuoy size={18} /> Trung tâm trợ giúp
          </button>
          <button className="w-full flex items-center gap-3 px-3 py-2 rounded-md text-sm text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors text-left">
            <Shield size={18} /> Chính sách quyền riêng tư
          </button>
        </div>
      </div>
    </div>
  );
}

export default SettingsPage;
