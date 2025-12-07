// ai-content-writer/packages/frontend/src/components/pages/HomePage.jsx
import React from 'react';
import { TrendingUp, Zap, Target } from 'lucide-react';
import { useTheme } from '../../hooks/useTheme';

export function HomePage({ onNavigate }) {
  const { theme } = useTheme();

  const stats = [
    { label: 'Bài Viết Hôm Nay', value: '12', icon: '📝', color: theme.gradient },
    { label: 'Từ Được Tạo', value: '3,450', icon: '✨', color: theme.gradient },
    { label: 'Lời Gợi Ý', value: '89%', icon: '🎯', color: theme.gradient },
  ];

  return (
    // REFINED: Thêm animation fade-in-up cho các section
    <div className="space-y-8 animate-fade-in-up">
      <section>
         <h1 className="text-3xl font-bold text-slate-900 dark:text-white mb-2">Xin chào, Nguyễn Văn A 👋</h1>
         <p className="text-slate-600 dark:text-slate-400">Cùng tạo ra những nội dung tuyệt vời nào!</p>
      </section>

      {/* REFINED: Stat cards có thiết kế tinh tế hơn */}
      <section className="grid md:grid-cols-3 gap-6">
        {stats.map((stat, i) => (
          <div key={i} className="bg-white dark:bg-slate-800 p-6 rounded-xl shadow-sm border border-slate-200 dark:border-slate-700 relative overflow-hidden">
            <div className={`absolute top-0 left-0 h-1 w-full bg-gradient-to-r ${stat.color}`} />
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-slate-500 dark:text-slate-400">{stat.label}</p>
                <p className="text-3xl font-bold mt-2 text-slate-900 dark:text-white">{stat.value}</p>
              </div>
              <span className="text-4xl bg-slate-100 dark:bg-slate-700 p-3 rounded-full">{stat.icon}</span>
            </div>
          </div>
        ))}
      </section>

      <section className={`bg-gradient-to-br ${theme.gradient} p-8 rounded-xl shadow-lg`}>
        <div className="flex items-center gap-6">
          <Zap className="text-white" size={40} />
          <div>
            <h2 className="text-2xl font-bold text-white">Bắt đầu ngay</h2>
            <p className="text-white/80">Tạo nội dung AI chất lượng cao trong vài giây</p>
          </div>
        </div>
        <button
          onClick={() => onNavigate('chat')}
          className="mt-6 bg-white/90 hover:bg-white text-slate-800 px-6 py-3 rounded-lg font-bold transition shadow-md hover:shadow-lg"
        >
          Soạn Thảo Bài Mới →
        </button>
      </section>

      {/* Các section khác được giữ nguyên hoặc có thể refine tương tự */}
    </div>
  );
}

export default HomePage;
