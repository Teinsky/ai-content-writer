// ai-content-writer/packages/frontend/src/components/chat/ChatMessage.jsx
import React from 'react';
import { Copy, Check, User, Sparkles } from 'lucide-react';
import { useTheme } from '../../hooks/useTheme';

// REFINED: Component được thiết kế lại hoàn toàn
export function ChatMessage({ message }) {
  const { theme } = useTheme();
  const [copied, setCopied] = React.useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(message.content);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const isUser = message.role === 'user';

  return (
    <div className="flex items-start gap-4 animate-fade-in-up">
      {/* Avatar */}
      <div className={`flex-shrink-0 w-9 h-9 rounded-full flex items-center justify-center text-white ${isUser ? theme.bg : 'bg-slate-700'}`}>
        {isUser ? <User size={18} /> : <Sparkles size={18} />}
      </div>

      {/* Content */}
      <div className="flex-1 group">
        <div className="font-bold text-sm mb-1 text-slate-900 dark:text-white">{isUser ? 'Bạn' : 'ContentAI'}</div>
        <div className="prose prose-sm dark:prose-invert max-w-none prose-p:my-1 whitespace-pre-wrap">
          {message.content}
        </div>

        {/* Actions */}
        {!isUser && (
          <div className="mt-2 opacity-0 group-hover:opacity-100 transition duration-300">
            <button
              onClick={handleCopy}
              className="flex items-center gap-1.5 text-xs text-slate-500 dark:text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 transition"
            >
              {copied ? <Check size={14} className="text-green-500" /> : <Copy size={14} />}
              {copied ? 'Đã sao chép!' : 'Sao chép'}
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

ChatMessage.Loading = function Loading() {
  return (
    <div className="flex items-start gap-4 animate-fade-in-up">
      <div className="flex-shrink-0 w-9 h-9 rounded-full flex items-center justify-center bg-slate-700 text-white">
        <Sparkles size={18} />
      </div>
      <div className="flex-1">
        <div className="font-bold text-sm mb-2 text-slate-900 dark:text-white">ContentAI</div>
        <div className="flex items-center gap-1">
          <div className="w-2 h-2 bg-slate-400 rounded-full animate-pulse" />
          <div className="w-2 h-2 bg-slate-400 rounded-full animate-pulse delay-100" />
          <div className="w-2 h-2 bg-slate-400 rounded-full animate-pulse delay-200" />
        </div>
      </div>
    </div>
  );
};
