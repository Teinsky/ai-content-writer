// ai-content-writer/packages/frontend/src/components/pages/HistoryPage.jsx
import React from 'react';
import { Trash2, Eye } from 'lucide-react';

// Dữ liệu mẫu cho trang lịch sử
const FULL_HISTORY = [
  { id: 1, title: 'Hướng dẫn Viết Nội dung AI', date: '2025-10-12', words: 1250, type: 'Blog', status: 'published' },
  { id: 2, title: 'Top 10 Mẹo SEO Hiệu Quả', date: '2025-10-11', words: 890, type: 'Blog', status: 'draft' },
  { id: 3, title: 'Digital Marketing Trends', date: '2025-10-10', words: 2100, type: 'Article', status: 'published' },
  { id: 4, title: 'Email Campaign Copy', date: '2025-10-09', words: 450, type: 'Email', status: 'published' },
];

export function HistoryPage() {
  return (
    <div className="animate-fade-in-up">
      <div className="bg-white dark:bg-slate-800 rounded-xl shadow-sm border border-slate-200 dark:border-slate-700 overflow-hidden">
        {/* Header */}
        <div className="px-6 py-5 border-b border-slate-200 dark:border-slate-700">
          <h2 className="text-2xl font-bold text-slate-900 dark:text-white">📚 Lịch Sử Bài Viết</h2>
          <p className="text-slate-600 dark:text-slate-400 mt-1">Quản lý và xem lại tất cả các nội dung đã tạo.</p>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-slate-50 dark:bg-slate-700/50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-bold uppercase text-slate-600 dark:text-slate-300">Tiêu Đề</th>
                <th className="px-6 py-3 text-left text-xs font-bold uppercase text-slate-600 dark:text-slate-300">Loại</th>
                <th className="px-6 py-3 text-left text-xs font-bold uppercase text-slate-600 dark:text-slate-300">Ngày</th>
                <th className="px-6 py-3 text-left text-xs font-bold uppercase text-slate-600 dark:text-slate-300">Số từ</th>
                <th className="px-6 py-3 text-left text-xs font-bold uppercase text-slate-600 dark:text-slate-300">Trạng Thái</th>
                <th className="px-6 py-3 text-left text-xs font-bold uppercase text-slate-600 dark:text-slate-300">Hành Động</th>
              </tr>
            </thead>
            <tbody>
              {FULL_HISTORY.map((item) => (
                <tr key={item.id} className="border-b border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-700/50 transition">
                  <td className="px-6 py-4 font-semibold text-slate-800 dark:text-white">{item.title}</td>
                  <td className="px-6 py-4 text-sm text-slate-600 dark:text-slate-400">{item.type}</td>
                  <td className="px-6 py-4 text-sm text-slate-600 dark:text-slate-400">{item.date}</td>
                  <td className="px-6 py-4 text-sm text-slate-600 dark:text-slate-400">{item.words}</td>
                  <td className="px-6 py-4">
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-bold ${
                        item.status === 'published'
                          ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200'
                          : 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200'
                      }`}
                    >
                      {item.status === 'published' ? '✓ Xuất Bản' : '○ Nháp'}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex gap-2">
                      <button className="p-2 hover:bg-slate-200 dark:hover:bg-slate-600 rounded-full transition" title="Xem">
                        <Eye size={18} className="text-slate-600 dark:text-slate-400" />
                      </button>
                      <button className="p-2 hover:bg-slate-200 dark:hover:bg-slate-600 rounded-full transition" title="Xóa">
                        <Trash2 size={18} className="text-red-500" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
