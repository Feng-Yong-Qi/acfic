import React, { useState, useCallback, useRef, useEffect } from 'react';
import { Header } from './components/Header';
import { GridMenu } from './components/GridMenu';
import { ChatInterface } from './components/ChatInterface';
import { generateResponse } from './services/geminiService';
import { Message, Sender, ViewType } from './types';
import { Mic, Send, Sparkles, AudioLines, Search } from 'lucide-react';

// Import Pages
import { PartyPage } from './components/pages/PartyPage';
import { PolicyPage } from './components/pages/PolicyPage';
import { CalculatorPage } from './components/pages/CalculatorPage';
import { ActivityPage } from './components/pages/ActivityPage';
import { SuggestionPage } from './components/pages/SuggestionPage';
import { InfoListPage } from './components/pages/InfoListPage';
import { NotificationPage } from './components/pages/NotificationPage';
import { BeltAndRoadPage } from './components/pages/BeltAndRoadPage';

const App: React.FC = () => {
  const [currentView, setCurrentView] = useState<ViewType>('home');
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputVal, setInputVal] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isVoiceMode, setIsVoiceMode] = useState(false);
  const [isRecording, setIsRecording] = useState(false);
  const [showLifeAlert, setShowLifeAlert] = useState(false);
  
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  // Auto scroll for chat
  useEffect(() => {
    if (currentView === 'home' && scrollContainerRef.current) {
        const scrollHeight = scrollContainerRef.current.scrollHeight;
        scrollContainerRef.current.scrollTo({ top: scrollHeight, behavior: 'smooth' });
    }
  }, [messages, isLoading, currentView]);

  const handleSend = useCallback(async (text: string) => {
    if (!text.trim() || isLoading) return;

    const userMsg: Message = {
      id: Date.now().toString(),
      text: text,
      sender: Sender.USER,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMsg]);
    setInputVal('');
    setIsLoading(true);
    
    try {
      const responseText = await generateResponse(text);
      
      const botMsg: Message = {
        id: (Date.now() + 1).toString(),
        text: responseText,
        sender: Sender.BOT,
        timestamp: new Date()
      };
      
      setMessages(prev => [...prev, botMsg]);
    } catch (e) {
      console.error(e);
    } finally {
      setIsLoading(false);
    }
  }, [isLoading]);

  const handleGridClick = (title: string) => {
    switch (title) {
        case '党建园地': setCurrentView('party'); break;
        case '政策速递': setCurrentView('policy'); break;
        case '政策计算器': setCurrentView('calc'); break;
        case '会员活动': setCurrentView('activity'); break;
        case '建言献策': setCurrentView('suggest'); break;
        case '金融服务': setCurrentView('finance'); break;
        case '法律服务': setCurrentView('law'); break;
        case '一带一路': setCurrentView('overseas'); break;
        case '办事指南': setCurrentView('guide'); break;
        case '西城生活': setShowLifeAlert(true); break;
        default: handleSend(`查询：${title}`);
    }
  };

  const handleSmartQuery = () => {
    handleSend('生成西城区本月经济运行简报。');
  };

  const toggleRecording = () => {
    if (isRecording) {
      setIsRecording(false);
      handleSend("（语音：如何申请高新技术企业认证？）");
    } else {
      setIsRecording(true);
    }
  };

  const renderContent = () => {
    switch(currentView) {
        case 'notifications': return <NotificationPage />;
        case 'party': return <PartyPage />;
        case 'policy': return <PolicyPage />;
        case 'calc': return <CalculatorPage />;
        case 'activity': return <ActivityPage />;
        case 'suggest': return <SuggestionPage />;
        case 'finance': return <InfoListPage type="finance" />;
        case 'law': return <InfoListPage type="law" />;
        case 'overseas': return <BeltAndRoadPage />;
        case 'guide': return <InfoListPage type="guide" />;
        default: return (
            <div className="px-5 pb-36 pt-4">
                
                {/* Grid Menu Area */}
                <div className="mb-8">
                    <GridMenu onItemClick={handleGridClick} />
                </div>

                {/* Divider / Status */}
                <div className="flex items-center justify-center gap-3 mb-6 opacity-60">
                    <div className="h-[1px] w-12 bg-slate-200"></div>
                    <div className="flex items-center gap-1.5 text-[10px] text-slate-400 font-medium uppercase tracking-widest">
                        <Sparkles size={10} className="text-blue-500" />
                        智能助手已激活
                    </div>
                    <div className="h-[1px] w-12 bg-slate-200"></div>
                </div>

                {/* Chat Content */}
                <div className="min-h-[100px]">
                    <ChatInterface messages={messages} isLoading={isLoading} />
                </div>
            </div>
        );
    }
  };

  return (
    // iPhone 6 Container
    <div className="flex flex-col w-[375px] h-[667px] bg-slate-50 relative overflow-hidden shadow-2xl rounded-[0px] md:rounded-[30px] border-0 md:border-8 md:border-slate-800 font-sans">
      
      <Header 
        currentView={currentView} 
        onBack={() => setCurrentView('home')} 
        onNotification={() => setCurrentView('notifications')}
      />

      {/* Main Content Area */}
      <main 
        ref={scrollContainerRef}
        className="flex-1 overflow-y-auto no-scrollbar scroll-smooth relative bg-slate-50"
      >
        {renderContent()}
      </main>

      {/* Bottom Interface Area (Only show on Home) */}
      {currentView === 'home' && (
        <div className="absolute bottom-0 left-0 right-0 z-50">
            {/* Floating Gradient Mask */}
            <div className="absolute bottom-0 w-full h-32 bg-gradient-to-t from-slate-50 via-slate-50/95 to-transparent -z-10 pointer-events-none"></div>

            <div className="px-4 pb-5 pt-2">
                {/* Suggestion Chips */}
                {messages.length === 0 && (
                    <div className="flex justify-center gap-2 mb-3">
                        <button 
                            onClick={handleSmartQuery}
                            className="bg-white/90 backdrop-blur border border-blue-200/60 shadow-sm text-blue-600 text-[11px] px-3 py-1.5 rounded-full flex items-center gap-1 active:scale-95 transition-transform font-medium"
                        >
                            <Sparkles size={10} />
                            智能问数
                        </button>
                        <button 
                            onClick={() => handleSend("最新惠企政策")}
                            className="bg-white/90 backdrop-blur border border-slate-200 shadow-sm text-slate-600 text-[11px] px-3 py-1.5 rounded-full active:scale-95 transition-transform font-medium"
                        >
                            最新惠企政策
                        </button>
                    </div>
                )}

                {/* Tech Input Bar */}
                <div className="bg-white shadow-[0_8px_30px_rgb(0,0,0,0.08)] border border-slate-100 rounded-[20px] p-1.5 flex items-center gap-2">
                    <button 
                        onClick={() => setIsVoiceMode(!isVoiceMode)}
                        className="w-9 h-9 rounded-full bg-slate-50 text-slate-500 hover:bg-slate-100 hover:text-slate-700 flex items-center justify-center transition-all flex-shrink-0 active:scale-90"
                    >
                        {isVoiceMode ? <span className="text-[10px] font-bold">文</span> : <Mic size={18} />}
                    </button>

                    <div className="flex-1 h-9 bg-slate-50 rounded-xl flex items-center px-1 border border-transparent focus-within:border-blue-100 focus-within:bg-blue-50/30 transition-all">
                        {isVoiceMode ? (
                            <button 
                                onMouseDown={() => setIsRecording(true)}
                                onMouseUp={() => toggleRecording()}
                                onTouchStart={() => setIsRecording(true)}
                                onTouchEnd={() => toggleRecording()}
                                className={`w-full h-full rounded-lg text-xs font-semibold transition-all flex items-center justify-center gap-2 ${
                                    isRecording 
                                    ? 'bg-blue-600 text-white' 
                                    : 'text-slate-500 active:bg-slate-200'
                                }`}
                            >
                                {isRecording && <AudioLines size={14} className="animate-pulse" />}
                                {isRecording ? '正在聆听...' : '按住说话'}
                            </button>
                        ) : (
                            <div className="flex items-center w-full px-2 gap-2">
                                <Search size={14} className="text-slate-300 flex-shrink-0" />
                                <input 
                                    type="text"
                                    value={inputVal}
                                    onChange={(e) => setInputVal(e.target.value)}
                                    onKeyDown={(e) => e.key === 'Enter' && handleSend(inputVal)}
                                    placeholder="输入指令或问题..."
                                    className="w-full bg-transparent border-none outline-none text-[13px] text-slate-800 placeholder-slate-400 h-full p-0"
                                />
                            </div>
                        )}
                    </div>

                    {!isVoiceMode && (
                        <button 
                            onClick={() => handleSend(inputVal)}
                            disabled={!inputVal.trim() || isLoading}
                            className={`w-9 h-9 rounded-full flex items-center justify-center transition-all flex-shrink-0 ${
                                inputVal.trim() && !isLoading
                                ? 'bg-blue-600 text-white shadow-md shadow-blue-500/20 active:scale-95' 
                                : 'bg-slate-100 text-slate-300'
                            }`}
                        >
                            <Send size={16} className={inputVal.trim() ? "ml-0.5" : ""} />
                        </button>
                    )}
                </div>
            </div>
        </div>
      )}

      {/* Xicheng Life Alert */}
      {showLifeAlert && (
        <div className="absolute inset-0 z-[60] flex items-center justify-center bg-black/20 backdrop-blur-sm animate-in fade-in">
            <div className="bg-white rounded-2xl p-6 shadow-2xl w-64 text-center transform scale-100">
                <div className="w-12 h-12 bg-orange-100 text-orange-500 rounded-full flex items-center justify-center mx-auto mb-3">
                    <Sparkles size={24} />
                </div>
                <h3 className="font-bold text-slate-800 mb-1">西城生活</h3>
                <p className="text-xs text-slate-500 mb-4">更多精彩生活服务正在接入中，敬请期待！</p>
                <button 
                    onClick={() => setShowLifeAlert(false)}
                    className="w-full py-2 bg-slate-900 text-white rounded-xl text-xs font-bold active:scale-95 transition-transform"
                >
                    我知道了
                </button>
            </div>
        </div>
      )}

    </div>
  );
};

export default App;