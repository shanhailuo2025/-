import React from 'react';
import { Message, Sender } from '../types';

interface ChatBubbleProps {
  message: Message;
}

export const ChatBubble: React.FC<ChatBubbleProps> = ({ message }) => {
  const isBot = message.sender === Sender.Bot;

  // Simple Markdown-like parser for bold text (**text**)
  const renderText = (text: string) => {
    const parts = text.split(/(\*\*.*?\*\*)/g);
    return parts.map((part, index) => {
      if (part.startsWith('**') && part.endsWith('**')) {
        return <strong key={index} className="text-amber-300">{part.slice(2, -2)}</strong>;
      }
      return part;
    });
  };

  return (
    <div className={`flex w-full mb-6 ${isBot ? 'justify-start' : 'justify-end'}`}>
      <div
        className={`relative max-w-[85%] px-4 py-3 rounded-2xl shadow-md leading-relaxed ${
          isBot
            ? 'bg-slate-800 text-slate-200 border border-slate-700 rounded-tl-none'
            : 'bg-amber-700 text-white rounded-tr-none'
        }`}
      >
        {/* Bot Icon Decoration */}
        {isBot && (
          <div className="absolute -top-3 -left-2 w-6 h-6 bg-slate-900 border border-amber-600 rounded-full flex items-center justify-center">
            <span className="text-[10px] text-amber-500">卦</span>
          </div>
        )}
        
        <div className="text-sm md:text-base whitespace-pre-wrap font-sans">
            {renderText(message.text)}
        </div>
        
        {isBot && message.isStreaming && (
            <div className="mt-2 flex space-x-1">
                <div className="w-1.5 h-1.5 bg-amber-500/50 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                <div className="w-1.5 h-1.5 bg-amber-500/50 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                <div className="w-1.5 h-1.5 bg-amber-500/50 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
            </div>
        )}
      </div>
    </div>
  );
};
