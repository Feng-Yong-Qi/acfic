import React, { useState } from 'react';
import { MessageSquareQuote, History, Send } from 'lucide-react';
import { SuggestionHistory } from '../../types';

const MOCK_HISTORY: SuggestionHistory[] = [
    { id: '1', topic: '关于优化营商环境的建议', date: '2024-03-12', status: '已采纳' },
    { id: '2', topic: '停车难问题反馈', date: '2023-11-05', status: '已回复' },
];

export const SuggestionPage: React.FC = () => {
  const [content, setContent] = useState('尊敬的工商联领导：\n\n关于[主题]，我有以下建议：\n1. ...\n2. ...\n\n望采纳。\n[企业名称]');

  return (
    <div className="flex flex-col h-full bg-slate-50 px-4 py-5 space-y-6 overflow-y-auto pb-12">
        
        {/* Topic Card */}
        <div className="bg-gradient-to-r from-slate-700 to-slate-800 rounded-2xl p-5 text-white shadow-xl shadow-slate-500/20">
            <div className="flex items-center gap-2.5 mb-2.5">
                <div className="p-1.5 bg-white/10 rounded-lg backdrop-blur-sm">
                    <MessageSquareQuote size={18} className="text-white" />
                </div>
                <span className="font-bold text-sm tracking-wide">本期话题</span>
            </div>
            <h2 className="text-lg font-bold mb-1.5 tracking-tight">“如何提升西城区民营经济活力”</h2>
            <p className="text-xs text-slate-300">期待您的真知灼见，截止日期：2024-06-30</p>
        </div>

        {/* Input Area */}
        <div>
            <div className="flex justify-between items-center mb-2.5 px-1">
                <h3 className="text-sm font-bold text-slate-800 border-l-4 border-slate-700 pl-2">建言模板</h3>
                <span className="text-[10px] text-slate-400 bg-white px-2 py-0.5 rounded-full border border-slate-100 shadow-sm">可自由编辑</span>
            </div>
            <div className="bg-white p-1 rounded-2xl border border-slate-200 shadow-sm">
                <textarea 
                    className="w-full h-44 p-4 text-xs bg-white rounded-xl focus:outline-none resize-none leading-relaxed text-slate-700 placeholder-slate-300"
                    value={content}
                    onChange={e => setContent(e.target.value)}
                />
            </div>
            <button className="w-full mt-4 bg-slate-800 text-white py-3 rounded-xl font-bold text-sm flex items-center justify-center gap-2 shadow-lg shadow-slate-500/20 active:scale-95 transition-transform hover:bg-slate-900">
                <Send size={16} /> 提交建议
            </button>
        </div>

        {/* History */}
        <div className="pt-2">
            <div className="flex items-center gap-2 mb-3 px-1 text-slate-800">
                <History size={16} />
                <h3 className="text-sm font-bold">提交记录</h3>
            </div>
            <div className="space-y-3">
                {MOCK_HISTORY.map(h => (
                    <div key={h.id} className="bg-white p-4 rounded-xl border border-slate-100 flex justify-between items-center shadow-sm">
                        <div>
                            <p className="text-xs font-bold text-slate-800 mb-1">{h.topic}</p>
                            <span className="text-[10px] text-slate-400 font-mono">{h.date}</span>
                        </div>
                        <span className={`text-[10px] px-2.5 py-1 rounded-full font-bold ${h.status === '已采纳' ? 'bg-emerald-50 text-emerald-600' : 'bg-slate-100 text-slate-500'}`}>
                            {h.status}
                        </span>
                    </div>
                ))}
            </div>
        </div>
    </div>
  );
};