// ai-content-writer/packages/frontend/src/components/common/DropdownMenu.jsx
import React, { useState, useRef, useEffect } from 'react';

export function DropdownMenu({ trigger, children }) {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div className="relative" ref={dropdownRef}>
      <div onClick={() => setIsOpen(!isOpen)} className="cursor-pointer">
        {trigger}
      </div>
      {isOpen && (
        <div className="absolute right-0 mt-2 w-72 bg-white dark:bg-slate-800 rounded-xl shadow-2xl border border-slate-200 dark:border-slate-700 p-2 animate-fade-in-up origin-top-right">
          {children}
        </div>
      )}
    </div>
  );
}

// Mục menu tiêu chuẩn
DropdownMenu.Item = function DropdownMenuItem({ icon, label, onClick, className = '' }) {
  return (
    <button
      onClick={onClick}
      className={`w-full flex items-center gap-3 px-3 py-2 rounded-md text-sm text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors ${className}`}
    >
      {icon}
      <span>{label}</span>
    </button>
  );
};

// Dải phân cách
DropdownMenu.Divider = function DropdownMenuDivider() {
    return <div className="h-px bg-slate-200 dark:bg-slate-700 my-2" />;
};

// Mục hiển thị thông tin tài khoản
DropdownMenu.AccountItem = function DropdownMenuAccountItem({ name, email, avatar, isActive = false }) {
    return (
        <div className={`w-full flex items-center gap-3 px-3 py-2 rounded-md transition-colors ${isActive ? 'bg-slate-100 dark:bg-slate-700' : 'hover:bg-slate-100 dark:hover:bg-slate-700'}`}>
            <img src={avatar} alt={name} className="w-8 h-8 rounded-full" />
            <div>
                <p className="font-semibold text-sm text-slate-800 dark:text-white">{name}</p>
                <p className="text-xs text-slate-500 dark:text-slate-400">{email}</p>
            </div>
            {isActive && <div className="ml-auto w-2 h-2 rounded-full bg-green-500" />}
        </div>
    );
};
