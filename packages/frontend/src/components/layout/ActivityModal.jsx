// ai-content-writer/packages/frontend/src/components/layout/ActivityModal.jsx
import React from 'react';
import { Modal } from '../common/Modal'; // Tái sử dụng Modal đã có

const SAMPLE_HISTORY = [
    { id: 1, title: 'Hướng dẫn Viết Nội dung AI', date: '2025-10-12' },
    { id: 2, title: 'Top 10 Mẹo SEO Hiệu Quả', date: '2025-10-11' },
    { id: 3, title: 'Email Campaign Copy', date: '2025-10-09' },
];

export function ActivityModal({ isOpen, onClose }) {
  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Hoạt Động Gần Đây">
      <div className="space-y-4">
        {SAMPLE_HISTORY.map(item => (
          <div key={item.id} className="p-4 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-700 cursor-pointer transition">
            <p className="font-semibold text-slate-800 dark:text-white">{item.title}</p>
            <p className="text-sm text-slate-500 dark:text-slate-400">{item.date}</p>
          </div>
        ))}
      </div>
    </Modal>
  );
}

export default ActivityModal;
