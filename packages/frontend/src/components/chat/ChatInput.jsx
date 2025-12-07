// ai-content-writer/packages/frontend/src/components/chat/ChatInput.jsx
import React, { useState, useRef, useEffect } from 'react';
import { Send, Paperclip, Zap, Mic, Wand2 } from 'lucide-react';
import { useTheme } from '../../hooks/useTheme';

const TONES = ['Thân thiện', 'Chuyên nghiệp', 'Hài hước', 'Thuyết phục'];

export function ChatInput({ onSend, isLoading }) {
  const [input, setInput] = useState('');
  const [selectedTone, setSelectedTone] = useState(TONES[0]); // ✅ STATE MỚI
  const [isToneOpen, setIsToneOpen] = useState(false); // ✅ STATE MỚI
  const toneRef = useRef(null);
  const { theme } = useTheme();

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (toneRef.current && !toneRef.current.contains(event.target)) {
        setIsToneOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (input.trim() && !isLoading) {
      onSend(input, selectedTone); // ✅ Gửi cả 'tone' đi
      setInput('');
    }
  };

  return (
    <div className="p-4 bg-white dark:bg-slate-800">
      <div className="relative">
        <textarea
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === 'Enter' && !e.shiftKey) {
              e.preventDefault();
              handleSubmit(e);
            }
          }}
          placeholder="Nhập yêu cầu của bạn ở đây..."
          rows="1"
          className="w-full pl-12 pr-28 py-3 bg-slate-100 dark:bg-slate-700 text-slate-900 dark:text-white rounded-xl resize-none focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-200"
          style={{ minHeight: '52px' }}
        />
        <div className="absolute left-3 top-1/2 -translate-y-1/2 flex items-center gap-1">
          {/* ✅ NÚT ĐỔI GIỌNG ĐIỆU */}
          <div className="relative" ref={toneRef}>
            <button
              type="button"
              onClick={() => setIsToneOpen(!isToneOpen)}
              className="p-2 text-slate-500 hover:text-slate-700 dark:hover:text-white hover:bg-slate-200 dark:hover:bg-slate-600 rounded-full transition"
              title="Đổi giọng điệu"
            >
              <Wand2 size={18} />
            </button>
            {isToneOpen && (
              <div className="absolute bottom-full left-0 mb-2 w-48 bg-white dark:bg-slate-800 rounded-xl shadow-2xl border border-slate-200 dark:border-slate-700 p-2 animate-fade-in-up">
                <p className="px-3 py-1 text-xs font-semibold text-slate-500">Giọng điệu</p>
                {TONES.map(tone => (
                  <button 
                    key={tone}
                    onClick={() => {
                      setSelectedTone(tone);
                      setIsToneOpen(false);
                    }}
                    className={`w-full text-left px-3 py-1.5 rounded-md text-sm ${selectedTone === tone ? `${theme.bg} text-white` : 'hover:bg-slate-100 dark:hover:bg-slate-700'}`}
                  >
                    {tone}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>

        <div className="absolute right-3 top-1/2 -translate-y-1/2 flex items-center gap-1">
          <button
            type="button"
            className="p-2 text-slate-500 hover:text-slate-700 dark:hover:text-white hover:bg-slate-200 dark:hover:bg-slate-600 rounded-full transition"
            title="Đính kèm file"
          >
            <Paperclip size={18} />
          </button>
          <button
            type="submit"
            disabled={isLoading || !input.trim()}
            className={`w-9 h-9 flex items-center justify-center rounded-full transition-all duration-200 text-white ${
              isLoading || !input.trim()
                ? 'bg-slate-300 dark:bg-slate-600 cursor-not-allowed'
                : `bg-gradient-to-br ${theme.gradient} hover:scale-110 shadow-lg`
            }`}
            title="Gửi"
          >
            {isLoading ? <Zap size={18} className="animate-pulse" /> : <Send size={18} />}
          </button>
        </div>
      </div>
      
       {/* ✅ DÒNG DISCLAIMER */}
       <p className="text-xs text-center text-slate-500 dark:text-slate-400 mt-3 px-4">
        ContentAI có thể mắc sai sót. Nhớ xác minh các thông tin quan trọng.
      </p>
    </div>
  );
}
