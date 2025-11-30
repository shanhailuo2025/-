import React, { useState, useRef, useEffect } from 'react';

interface InputAreaProps {
  onSendMessage: (text: string) => void;
  isLoading: boolean;
}

export const InputArea: React.FC<InputAreaProps> = ({ onSendMessage, isLoading }) => {
  const [inputText, setInputText] = useState('');
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const handleSubmit = (e?: React.FormEvent) => {
    e?.preventDefault();
    if (inputText.trim() && !isLoading) {
      onSendMessage(inputText);
      setInputText('');
      if (textareaRef.current) {
        textareaRef.current.style.height = 'auto';
      }
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSubmit();
    }
  };

  const adjustHeight = () => {
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
      textareaRef.current.style.height = `${Math.min(textareaRef.current.scrollHeight, 120)}px`;
    }
  };

  useEffect(() => {
    adjustHeight();
  }, [inputText]);

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-slate-900 border-t border-slate-700 p-3 pb-safe z-50">
      <div className="max-w-3xl mx-auto flex items-end space-x-2">
        <textarea
          ref={textareaRef}
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="输入您的想法或困惑，测算财富运势..."
          rows={1}
          className="flex-1 bg-slate-800 text-white placeholder-slate-400 border border-slate-600 rounded-xl px-4 py-3 focus:outline-none focus:border-amber-500 resize-none max-h-32 text-sm md:text-base scrollbar-hide"
          disabled={isLoading}
        />
        <button
          onClick={() => handleSubmit()}
          disabled={!inputText.trim() || isLoading}
          className={`h-11 w-11 flex-shrink-0 flex items-center justify-center rounded-full transition-all duration-300 ${
            !inputText.trim() || isLoading
              ? 'bg-slate-700 text-slate-500 cursor-not-allowed'
              : 'bg-amber-600 text-white shadow-lg shadow-amber-900/50 hover:bg-amber-500 active:scale-95'
          }`}
        >
          {isLoading ? (
            <svg className="animate-spin h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
          ) : (
             // Send Icon (Bagua style stylized arrow)
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <line x1="22" y1="2" x2="11" y2="13"></line>
              <polygon points="22 2 15 22 11 13 2 9 22 2"></polygon>
            </svg>
          )}
        </button>
      </div>
      <div className="text-center mt-2">
         <p className="text-[10px] text-slate-500">易学建议仅供参考，投资需谨慎</p>
      </div>
    </div>
  );
};
