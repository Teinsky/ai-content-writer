// ai-content-writer/packages/frontend/src/components/layout/Header.jsx
import React, { useState } from 'react';
import { Menu, Moon, Sun, History, User, LogOut, ShieldCheck, FileText, PlusCircle } from 'lucide-react';
import { useTheme } from '../../hooks/useTheme';
import { DropdownMenu } from '../common/DropdownMenu';
import { ActivityModal } from './ActivityModal';

const ACCOUNTS = [
    { name: 'Nguyễn Văn A (Active)', email: 'user@example.com', avatar: 'https://i.pravatar.cc/150?u=a042581f4e29026704d', isActive: true },
];

export function Header({ onMenuToggle, onNavigate, onNavigateToAuth }) {
  const { isDark, toggleDark } = useTheme();
  const [isActivityOpen, setIsActivityOpen] = useState(false);

  return (
    <>
      <header className="bg-white/80 dark:bg-slate-900/80 backdrop-blur-lg border-b border-slate-200 dark:border-slate-800 sticky top-0 z-20">
        <div className="max-w-full mx-auto px-4 sm:px-6 lg:p-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center gap-2">
              <button onClick={onMenuToggle} className="p-2 -ml-2 text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-800 rounded-md md:hidden">
                <Menu size={24} />
              </button>
            </div>

            <div className="flex items-center gap-2 sm:gap-4">
              <button
                onClick={() => setIsActivityOpen(true)}
                className="flex items-center gap-2 px-3 py-2 text-sm font-semibold text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-800 rounded-lg transition"
                title="Hoạt động"
              >
                <History size={18} />
                <span className="hidden sm:inline">Hoạt động</span>
              </button>

              <button
                onClick={toggleDark}
                className="p-2 text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-800 rounded-full transition"
                title={isDark ? 'Sáng' : 'Tối'}
              >
                {isDark ? <Sun size={20} /> : <Moon size={20} />}
              </button>
              
              <DropdownMenu
                trigger={
                  <img src={ACCOUNTS.find(a => a.isActive)?.avatar} alt="User avatar" className="w-9 h-9 rounded-full cursor-pointer" />
                }
              >
                {ACCOUNTS.map(account => (
                    <DropdownMenu.AccountItem key={account.email} {...account} />
                ))}
                {/* Gán hàm onNavigateToAuth vào nút này */}
                <DropdownMenu.Item icon={<PlusCircle size={16} />} label="Thêm tài khoản khác" onClick={onNavigateToAuth} />
                <DropdownMenu.Divider />
                <DropdownMenu.Item icon={<User size={16} />} label="Hồ sơ cá nhân" onClick={() => onNavigate('profile')} />
                <DropdownMenu.Item icon={<ShieldCheck size={16} />} label="Chính sách quyền riêng tư" />
                <DropdownMenu.Item icon={<FileText size={16} />} label="Điều khoản dịch vụ" />
                <DropdownMenu.Divider />
                <DropdownMenu.Item icon={<LogOut size={16} />} label="Đăng xuất" className="text-red-500 dark:text-red-400" />
              </DropdownMenu>
            </div>
          </div>
        </div>
      </header>
      
      <ActivityModal isOpen={isActivityOpen} onClose={() => setIsActivityOpen(false)} />
    </>
  );
}
