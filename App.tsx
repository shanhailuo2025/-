import React, { useState, useRef, useEffect } from 'react';
import { Header } from './components/Header';
import { ChatBubble } from './components/ChatBubble';
import { InputArea } from './components/InputArea';
import { sendMessageStream } from './services/geminiService';
import { Message, Sender } from './types';
import { GenerateContentResponse } from '@google/genai';

const INITIAL_MESSAGE: Message = {
  id: 'init-1',
  sender: Sender.Bot,
  text: "在此恭候多时。我是易财先生。\n\n请告诉我您当下的**创业想法**、**生意困惑**或**投资意向**，我将为您起卦，推演财富运势。",
  timestamp: Date.now()
};

const App: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([INITIAL_MESSAGE]);
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = async (text: string) => {
    const userMessage: Message = {
      id: Date.now().toString(),
      sender: Sender.User,
      text,
      timestamp: Date.now(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setIsLoading(true);

    try {
      // Create a placeholder bot message for streaming
      const botMessageId = (Date.now() + 1).toString();
      const botMessagePlaceholder: Message = {
        id: botMessageId,
        sender: Sender.Bot,
        text: '',
        timestamp: Date.now(),
        isStreaming: true
      };
      
      setMessages((prev) => [...prev, botMessagePlaceholder]);

      const streamResult = await sendMessageStream(text);
      
      let fullText = '';

      for await (const chunk of streamResult) {
        const c = chunk as GenerateContentResponse;
        const newText = c.text || '';
        fullText += newText;

        setMessages((prev) => 
          prev.map((msg) => 
            msg.id === botMessageId 
              ? { ...msg, text: fullText } 
              : msg
          )
        );
      }

       // Finalize message
       setMessages((prev) => 
        prev.map((msg) => 
          msg.id === botMessageId 
            ? { ...msg, isStreaming: false } 
            : msg
        )
      );

    } catch (error) {
      console.error("Error sending message:", error);
      const errorMessage: Message = {
        id: Date.now().toString(),
        sender: Sender.Bot,
        text: "天机混沌，连接受阻。请稍后再试。",
        timestamp: Date.now(),
      };
      setMessages((prev) => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col h-screen bg-slate-950 text-slate-200 font-sans">
      <Header />
      
      {/* Background decoration - Abstract Bagua/Taiji elements */}
      <div className="fixed inset-0 pointer-events-none z-0 opacity-10 flex items-center justify-center overflow-hidden">
        <div className="w-[600px] h-[600px] border-[50px] border-amber-900 rounded-full flex items-center justify-center">
            <div className="w-[400px] h-[400px] border-[30px] border-slate-700 rounded-full"></div>
        </div>
      </div>

      <main className="flex-1 overflow-y-auto px-4 pt-20 pb-28 relative z-10">
        <div className="max-w-3xl mx-auto">
          {messages.map((msg) => (
            <ChatBubble key={msg.id} message={msg} />
          ))}
          <div ref={messagesEndRef} />
        </div>
      </main>

      <InputArea onSendMessage={handleSendMessage} isLoading={isLoading} />
    </div>
  );
};

export default App;
