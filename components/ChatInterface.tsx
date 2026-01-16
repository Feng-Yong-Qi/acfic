import React, { useEffect, useRef } from 'react';
import { Message, Sender } from '../types';
import { Command } from 'lucide-react';

interface ChatInterfaceProps {
  messages: Message[];
  isLoading: boolean;
}

export const ChatInterface: React.FC<ChatInterfaceProps> = ({ messages, isLoading }) => {
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isLoading]);

  return (
    <div className="flex-1 px-4 py-4 space-y-5">
      {messages.map((msg) => (
        <div
          key={msg.id}
          className={`flex w-full ${msg.sender === Sender.USER ? 'justify-end' : 'justify-start'}`}
        >
          <div className={`flex max-w-[90%] gap-2.5 ${msg.sender === Sender.USER ? 'flex-row-reverse' : 'flex-row'}`}>
            
            {/* Avatar */}
            {msg.sender !== Sender.USER && (
                <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-blue-600 to-indigo-700 flex items-center justify-center flex-shrink-0 shadow-sm mt-1">
                    <Command size={14} className="text-white" />
                </div>
            )}

            {/* Bubble */}
            <div className={`
              px-3.5 py-2.5 rounded-2xl text-[13px] leading-relaxed shadow-sm
              ${msg.sender === Sender.USER 
                ? 'bg-blue-600 text-white rounded-tr-sm' 
                : 'bg-white text-slate-700 rounded-tl-sm border border-slate-100'}
            `}>
              {msg.text}
            </div>
          </div>
        </div>
      ))}

      {isLoading && (
        <div className="flex w-full justify-start pl-9">
            <div className="bg-white px-3 py-2 rounded-2xl rounded-tl-none border border-slate-100 shadow-sm flex items-center gap-1">
              <span className="w-1 h-1 bg-blue-500 rounded-full animate-bounce"></span>
              <span className="w-1 h-1 bg-blue-500 rounded-full animate-bounce delay-75"></span>
              <span className="w-1 h-1 bg-blue-500 rounded-full animate-bounce delay-150"></span>
            </div>
        </div>
      )}
      
      <div ref={bottomRef} className="h-1" />
    </div>
  );
};