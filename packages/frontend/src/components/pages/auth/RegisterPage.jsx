// ai-content-writer/packages/frontend/src/components/pages/auth/RegisterPage.jsx
import React from 'react';
import { useTheme } from '../../../hooks/useTheme';
import { AuthLayout } from './AuthLayout'; // ✅ <--- THÊM DÒNG NÀY

export function RegisterPage({ onRegisterSuccess, onSwitchToLogin }) {
    const { theme } = useTheme();

    return (
        <AuthLayout>
            <div className="text-center">
                <h1 className="text-2xl font-bold text-slate-900 dark:text-white">Tạo tài khoản</h1>
                <p className="mt-2 text-sm text-slate-600 dark:text-slate-400">Bắt đầu hành trình sáng tạo của bạn</p>
            </div>
            
            <form onSubmit={onRegisterSuccess} className="mt-8 space-y-4">
                <div>
                    <label className="text-sm font-medium text-slate-700 dark:text-slate-300">Họ và tên</label>
                    <input type="text" required className="mt-1 block w-full px-3 py-2 bg-white dark:bg-slate-700 border border-slate-300 dark:border-slate-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" />
                </div>
                <div>
                    <label className="text-sm font-medium text-slate-700 dark:text-slate-300">Email</label>
                    <input type="email" required className="mt-1 block w-full px-3 py-2 bg-white dark:bg-slate-700 border border-slate-300 dark:border-slate-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" />
                </div>
                 <div>
                    <label className="text-sm font-medium text-slate-700 dark:text-slate-300">Mật khẩu</label>
                    <input type="password" required className="mt-1 block w-full px-3 py-2 bg-white dark:bg-slate-700 border border-slate-300 dark:border-slate-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" />
                </div>
                 <div className="flex items-start">
                    <input id="terms" type="checkbox" required className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500" />
                    <label htmlFor="terms" className="ml-2 text-xs text-slate-600 dark:text-slate-400">
                        Tôi đồng ý với <a href="#" className="font-semibold text-blue-600 hover:underline">Điều khoản Dịch vụ</a> và <a href="#" className="font-semibold text-blue-600 hover:underline">Chính sách Quyền riêng tư</a>.
                    </label>
                </div>
                <button type="submit" className={`w-full py-3 text-white rounded-lg font-semibold transition ${theme.button}`}>
                    Tạo tài khoản
                </button>
            </form>

             <p className="mt-6 text-center text-sm text-slate-600 dark:text-slate-400">
                Đã có tài khoản?{' '}
                <button onClick={onSwitchToLogin} className="font-semibold text-blue-600 hover:underline">
                    Đăng nhập
                </button>
            </p>
        </AuthLayout>
    );
}
