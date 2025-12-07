// ai-content-writer/packages/frontend/src/components/pages/auth/AuthLayout.jsx
import React from 'react';
import { FileText } from 'lucide-react';
import { useTheme } from '../../../hooks/useTheme';

export function AuthLayout({ children }) {
    const { theme } = useTheme();

    return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-slate-100 dark:bg-slate-900 p-4">
            <div className="w-full max-w-md">
                <div className="flex justify-center mb-6">
                    <div className="flex items-center gap-3">
                        <div className={`bg-gradient-to-br ${theme.gradient} p-3 rounded-xl`}>
                            <FileText size={28} className="text-white" />
                        </div>
                        <h1 className="text-3xl font-bold text-slate-800 dark:text-white">ContentAI</h1>
                    </div>
                </div>

                <div className="bg-white dark:bg-slate-800 p-8 rounded-2xl shadow-xl border border-slate-200 dark:border-slate-700">
                    {children}
                </div>
            </div>
            <footer className="text-center mt-8 text-sm text-slate-500 dark:text-slate-400">
                <div className="space-x-4">
                    <a href="#" className="hover:underline">Trợ giúp</a>
                    <a href="#" className="hover:underline">Quyền riêng tư</a>
                    <a href="#" className="hover:underline">Điều khoản</a>
                </div>
            </footer>
        </div>
    );
}
