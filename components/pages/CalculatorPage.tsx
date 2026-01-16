import React, { useState } from 'react';
import { Calculator, Send, Sparkles } from 'lucide-react';
import { generateResponse } from '../../services/geminiService';

export const CalculatorPage: React.FC = () => {
  const [companyName, setCompanyName] = useState('');
  const [industry, setIndustry] = useState('');
  const [chatInput, setChatInput] = useState('');
  const [chatHistory, setChatHistory] = useState<{text: string, sender: 'user'|'bot'}[]>([]);
  const [loading, setLoading] = useState(false);

  const handleSend = async () => {
    if(!chatInput.trim()) return;
    const msg = chatInput;
    setChatHistory(prev => [...prev, {text: msg, sender: 'user'}]);
    setChatInput('');
    setLoading(true);

    const contextPrompt = `用户正在使用政策计算器。公司名：${companyName}，行业：${industry}。用户问题：${msg}`;
    try {
        const res = await generateResponse(contextPrompt);
        setChatHistory(prev => [...prev, {text: res, sender: 'bot'}]);
    } catch(e) {
        setChatHistory(prev => [...prev, {text: "抱歉，请稍后再试。", sender: 'bot'}]);
    } finally {
        setLoading(false);
    }
  };

  return (
    <div className="flex flex-col h-full bg-slate-50">
        {/* Form Card */}
        <div className="p-4 flex-1 overflow-y-auto">
            <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-100 mb-5">
                <div className="flex items-center gap-2.5 mb-5 text-slate-800">
                    <div className="bg-cyan-100 p-2 rounded-xl text-cyan-600">
                        <Calculator size={20} />
                    </div>
                    <h3 className="font-bold text-sm">企业画像完善</h3>
                </div>
                
                <div className="space-y-4">
                    <div>
                        <label className="text-xs text-slate-500 mb-1.5 block font-medium">公司名称</label>
                        <input 
                            type="text" 
                            className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2.5 text-xs focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 outline-none transition-all"
                            placeholder="请输入完整企业名称"
                            value={companyName}
                            onChange={e => setCompanyName(e.target.value)}
                        />
                    </div>
                    <div>
                        <label className="text-xs text-slate-500 mb-1.5 block font-medium">所属行业</label>
                        <div className="relative">
                            <select 
                                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2.5 text-xs focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 outline-none text-slate-700 appearance-none"
                                value={industry}
                                onChange={e => setIndustry(e.target.value)}
                            >
                                <option value="">请选择行业</option>
                                <option value="tech">科技/互联网</option>
                                <option value="finance">金融服务</option>
                                <option value="culture">文化创意</option>
                                <option value="trade">商贸流通</option>
                            </select>
                            <div className="absolute right-3 top-3 pointer-events-none">
                                <svg width="10" height="6" viewBox="0 0 10 6" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M1 1L5 5L9 1" stroke="#94A3B8" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                                </svg>
                            </div>
                        </div>
                    </div>
                    <button className="w-full bg-gradient-to-r from-cyan-600 to-blue-600 text-white rounded-xl py-2.5 text-sm font-bold shadow-lg shadow-cyan-500/30 active:scale-95 transition-transform mt-2">
                        开始匹配政策
                    </button>
                </div>
            </div>

            {/* Chat Area inside Page */}
            {chatHistory.length > 0 && (
                <div className="space-y-3 pb-4">
                    {chatHistory.map((c, i) => (
                        <div key={i} className={`flex ${c.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
                            <div className={`max-w-[85%] p-3.5 rounded-2xl text-xs leading-relaxed shadow-sm ${c.sender === 'user' ? 'bg-cyan-600 text-white rounded-tr-sm' : 'bg-white border border-slate-100 rounded-tl-sm text-slate-700'}`}>
                                {c.text}
                            </div>
                        </div>
                    ))}
                    {loading && <div className="text-[10px] text-slate-400 text-center animate-pulse">正在智能计算中...</div>}
                </div>
            )}
        </div>

        {/* Bottom Input */}
        <div className="p-4 bg-white border-t border-slate-100 pb-8 shadow-[0_-4px_20px_-4px_rgba(0,0,0,0.05)]">
            <div className="flex items-center gap-2 bg-slate-50 rounded-2xl px-3 py-1.5 border border-slate-200 focus-within:ring-2 focus-within:ring-cyan-100 transition-all">
                <Sparkles size={18} className="text-cyan-500 ml-1" />
                <input 
                    type="text" 
                    className="flex-1 bg-transparent border-none outline-none text-xs py-2 text-slate-700 placeholder-slate-400"
                    placeholder="询问该行业的扶持政策..."
                    value={chatInput}
                    onChange={e => setChatInput(e.target.value)}
                    onKeyDown={e => e.key === 'Enter' && handleSend()}
                />
                <button 
                    onClick={handleSend}
                    disabled={!chatInput.trim()}
                    className="p-2 bg-cyan-600 rounded-xl text-white disabled:bg-slate-300 transition-colors shadow-sm"
                >
                    <Send size={16} />
                </button>
            </div>
        </div>
    </div>
  );
};