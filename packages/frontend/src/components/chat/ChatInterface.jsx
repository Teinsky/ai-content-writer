// ai-content-writer/packages/frontend/src/components/chat/ChatInterface.jsx
import React, { useState, useRef, useEffect } from 'react';
import { Sparkles, Briefcase, FileText, Megaphone, BrainCircuit } from 'lucide-react';
import { ChatMessage } from './ChatMessage';
import { ChatInput } from './ChatInput';
import { useTheme } from '../../hooks/useTheme';
import { CONTENT_TYPES } from '../../utils/themes';

const INDUSTRIES = ['Công nghệ', 'Marketing', 'Giáo dục', 'Y tế', 'Du lịch'];

// ✅ CÁC NÚT GỢI Ý LỚN
const SUGGESTION_CARDS = [
  { 
    id: 'blog',
    label: 'Viết một bài blog', 
    desc: 'về xu hướng marketing 2025',
    icon: FileText
  },
  { 
    id: 'social',
    label: 'Tạo một bài quảng cáo', 
    desc: 'cho sản phẩm mới ra mắt',
    icon: Megaphone
  },
  { 
    id: 'seo',
    label: 'Lên ý tưởng', 
    desc: 'cho chiến dịch nội dung sắp tới',
    icon: BrainCircuit
  },
];

export function ChatInterface() {
  const [messages, setMessages] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedType, setSelectedType] = useState(null);
  const [selectedIndustry, setSelectedIndustry] = useState(INDUSTRIES[0]);
  const messagesEndRef = useRef(null);
  const { theme } = useTheme();

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSelectTypeAndSend = (suggestion) => {
    const contentType = CONTENT_TYPES.find(c => c.id === suggestion.id);
    setSelectedType(contentType);
    const prompt = `${suggestion.label} ${suggestion.desc}`;
    handleSendMessage(prompt, 'Thân thiện');
  };

  const handleSendMessage = async (content, tone) => {
    const userMessage = { id: Date.now(), content, role: 'user' };
    setMessages(prev => [...prev, userMessage]);
    setIsLoading(true);

    setTimeout(() => {
      const aiMessage = {
        id: Date.now() + 1,
        content: `Phản hồi mẫu cho: "${content}"\n- Ngành: ${selectedIndustry}\n- Giọng điệu: ${tone}`,
        role: 'assistant',
      };
      setMessages(prev => [...prev, aiMessage]);
      setIsLoading(false);
    }, 1500);
  };

  return (
    <div className="h-full flex flex-col bg-white dark:bg-slate-800 rounded-xl shadow-sm border border-slate-200 dark:border-slate-700 overflow-hidden">
      <div className="flex-1 overflow-y-auto p-4 md:p-6">
        {messages.length === 0 ? (
          // ✅ GIAO DIỆN TRỐNG ĐÃ ĐƯỢC THIẾT KẾ LẠI HOÀN TOÀN
          <div className="h-full flex flex-col justify-center items-center text-center animate-fade-in-up">
            <div className="flex-grow flex flex-col justify-center items-center">
                <h1 className="text-4xl md:text-5xl font-bold mb-4">
                    <span className={`bg-clip-text text-transparent bg-gradient-to-r ${theme.gradient}`}>
                        Xin chào, Nguyễn Văn A
                    </span>
                </h1>
                <p className="text-lg text-slate-600 dark:text-slate-400">
                    Tôi có thể giúp gì cho bạn hôm nay?
                </p>
            </div>
            <div className="w-full max-w-4xl pb-8">
              <div className="grid md:grid-cols-3 gap-4">
                {SUGGESTION_CARDS.map((card) => (
                  <button 
                    key={card.id}
                    onClick={() => handleSelectTypeAndSend(card)}
                    className="p-4 bg-slate-100 dark:bg-slate-700/50 hover:bg-slate-200 dark:hover:bg-slate-700 rounded-xl text-left transition-all duration-200 transform hover:-translate-y-1"
                  >
                    <card.icon size={20} className="mb-2 text-slate-600 dark:text-slate-300" />
                    <p className="font-semibold text-slate-800 dark:text-white">{card.label}</p>
                    <p className="text-sm text-slate-500 dark:text-slate-400">{card.desc}</p>
                  </button>
                ))}
              </div>
            </div>
          </div>
        ) : (
          <div className="max-w-3xl mx-auto space-y-6">
            {messages.map((msg) => (
              <ChatMessage key={msg.id} message={msg} />
            ))}
            {isLoading && <ChatMessage.Loading />}
            <div ref={messagesEndRef} />
          </div>
        )}
      </div>
      
      {/* Chỉ hiển thị khu vực cài đặt khi đã có tin nhắn */}
      {messages.length > 0 && (
          <div className="p-4 border-t border-b border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800">
              <div className="flex items-center gap-4">
                  <label className="flex items-center gap-2 text-sm font-semibold text-slate-600 dark:text-slate-300">
                      <Briefcase size={16} />
                      <span>Ngành nghề:</span>
                  </label>
                  <select 
                      value={selectedIndustry}
                      onChange={(e) => setSelectedIndustry(e.target.value)}
                      className="bg-slate-100 dark:bg-slate-700 border-none rounded-md px-3 py-1 text-sm focus:ring-2 focus:ring-blue-500"
                  >
                      {INDUSTRIES.map(industry => <option key={industry} value={industry}>{industry}</option>)}
                  </select>
              </div>
          </div>
      )}

      <ChatInput onSend={handleSendMessage} isLoading={isLoading} />
    </div>
  );
}
