// ai-content-writer/packages/frontend/src/components/pages/ProfilePage.jsx
import React from 'react';
import { useTheme } from '../../hooks/useTheme';

export function ProfilePage() {
    const { theme } = useTheme();
    return (
        <div className="space-y-8 animate-fade-in-up">
            <div>
                <h1 className="text-3xl font-bold text-slate-900 dark:text-white">Hồ Sơ Cá Nhân</h1>
                <p className="text-slate-600 dark:text-slate-400 mt-1">Quản lý thông tin tài khoản của bạn.</p>
            </div>

            {/* Account Settings */}
            <div className="bg-white dark:bg-slate-800 p-6 rounded-xl shadow-sm border border-slate-200 dark:border-slate-700">
                <h2 className="text-xl font-bold mb-6 text-slate-900 dark:text-white">👤 Thông Tin Tài Khoản</h2>
                <div className="space-y-4 max-w-lg">
                    <div>
                        <label className="block text-sm font-bold mb-2 text-slate-700 dark:text-slate-300">Tên Đầy Đủ</label>
                        <input
                            type="text"
                            defaultValue="Nguyễn Văn A"
                            className="w-full px-4 py-2 border border-slate-300 dark:border-slate-600 bg-slate-50 dark:bg-slate-700 dark:text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-bold mb-2 text-slate-700 dark:text-slate-300">Email</label>
                        <input
                            type="email"
                            defaultValue="user@example.com"
                            readOnly
                            className="w-full px-4 py-2 border border-slate-300 dark:border-slate-600 bg-slate-200 dark:bg-slate-800 dark:text-slate-400 rounded-lg cursor-not-allowed"
                        />
                    </div>
                    <button className={`text-white px-5 py-2 rounded-lg font-semibold transition ${theme.button}`}>
                        Lưu Thay Đổi
                    </button>
                </div>
            </div>

             {/* Service Plan */}
            <div className="bg-white dark:bg-slate-800 p-6 rounded-xl shadow-sm border border-slate-200 dark:border-slate-700">
                <h2 className="text-xl font-bold mb-4 text-slate-900 dark:text-white">📦 Gói Dịch Vụ</h2>
                <p className="text-slate-600 dark:text-slate-400 mb-4">
                    Gói Hiện Tại: <span className={`font-bold ${theme.accent}`}>Premium</span>
                </p>
                <button className={`text-white px-5 py-2 rounded-lg font-semibold transition ${theme.button}`}>
                    Nâng Cấp / Quản Lý
                </button>
            </div>
        </div>
    );
}

export default ProfilePage;
