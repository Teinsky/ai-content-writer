// ai-content-writer/packages/frontend/src/components/pages/auth/LoginPage.jsx
import React from 'react';
import { useTheme } from '../../../hooks/useTheme';
import { AuthLayout } from './AuthLayout'; // ✅ <--- THÊM DÒNG NÀY

const GoogleIcon = () => (
    <svg className="w-5 h-5" viewBox="0 0 48 48">
        <path fill="#FFC107" d="M43.611,20.083H42V20H24v8h11.303c-1.649,4.657-6.08,8-11.303,8c-6.627,0-12-5.373-12-12s5.373-12,12-12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C12.955,4,4,12.955,4,24s8.955,20,20,20s20-8.955,20-20C44,22.659,43.862,21.35,43.611,20.083z"></path>
        <path fill="#FF3D00" d="M6.306,14.691l6.571,4.819C14.655,15.108,18.961,12,24,12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C16.318,4,9.656,8.337,6.306,14.691z"></path>
        <path fill="#4CAF50" d="M24,44c5.166,0,9.86-1.977,13.409-5.192l-6.19-5.238C29.211,35.091,26.715,36,24,36c-5.222,0-9.522-3.441-11.022-8.163l-6.522,5.025C9.505,39.556,16.227,44,24,44z"></path>
        <path fill="#1976D2" d="M43.611,20.083H42V20H24v8h11.303c-0.792,2.237-2.231,4.166-4.087,5.574l6.19,5.238C39.902,36.639,44,30.852,44,24C44,22.659,43.862,21.35,43.611,20.083z"></path>
    </svg>
);

export function LoginPage({ onLoginSuccess, onSwitchToRegister }) {
    const { theme } = useTheme();
    return (
        <AuthLayout>
            <div className="text-center">
                <h1 className="text-2xl font-bold text-slate-900 dark:text-white">Đăng nhập</h1>
                <p className="mt-2 text-sm text-slate-600 dark:text-slate-400">để tiếp tục đến ContentAI</p>
            </div>

            <div className="mt-8 space-y-4">
                <button className="w-full flex justify-center items-center gap-3 py-3 px-4 bg-white dark:bg-slate-700 border border-slate-300 dark:border-slate-600 rounded-lg hover:bg-slate-50 dark:hover:bg-slate-600 transition">
                    <GoogleIcon />
                    <span className="font-semibold text-sm text-slate-700 dark:text-slate-200">Tiếp tục với Google</span>
                </button>

                <div className="flex items-center">
                    <hr className="flex-1 border-slate-200 dark:border-slate-600" />
                    <span className="px-2 text-xs text-slate-500">HOẶC</span>
                    <hr className="flex-1 border-slate-200 dark:border-slate-600" />
                </div>

                <form onSubmit={onLoginSuccess} className="space-y-4">
                    <div>
                        <label className="text-sm font-medium text-slate-700 dark:text-slate-300">Email</label>
                        <input type="email" required className="mt-1 block w-full px-3 py-2 bg-white dark:bg-slate-700 border border-slate-300 dark:border-slate-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" />
                    </div>
                    <div>
                        <div className="flex justify-between">
                            <label className="text-sm font-medium text-slate-700 dark:text-slate-300">Mật khẩu</label>
                            <a href="#" className="text-sm text-blue-600 hover:underline">Quên mật khẩu?</a>
                        </div>
                        <input type="password" required className="mt-1 block w-full px-3 py-2 bg-white dark:bg-slate-700 border border-slate-300 dark:border-slate-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" />
                    </div>
                    <button type="submit" className={`w-full py-3 text-white rounded-lg font-semibold transition ${theme.button}`}>
                        Đăng nhập
                    </button>
                </form>
            </div>

            <p className="mt-6 text-center text-sm text-slate-600 dark:text-slate-400">
                Chưa có tài khoản?{' '}
                <button onClick={onSwitchToRegister} className="font-semibold text-blue-600 hover:underline">
                    Đăng ký
                </button>
            </p>
        </AuthLayout>
    );
}
