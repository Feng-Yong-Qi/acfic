import React from 'react';
import { Bot, Bell, ChevronLeft, MoreHorizontal, Minus } from 'lucide-react';
import { ViewType } from '../types';

interface HeaderProps {
  currentView: ViewType;
  onBack: () => void;
  onNotification: () => void;
}

export const Header: React.FC<HeaderProps> = ({ currentView, onBack, onNotification }) => {
  const isHome = currentView === 'home';

  const getTitle = () => {
    switch (currentView) {
      case 'notifications': return '消息通知';
      case 'party': return '党建园地';
      case 'policy': return '政策速递';
      case 'calc': return '政策计算器';
      case 'activity': return '会员活动';
      case 'suggest': return '建言献策';
      case 'finance': return '金融服务';
      case 'law': return '法律服务';
      case 'overseas': return '一带一路服务';
      case 'guide': return '办事指南';
      default: return '工商联管理服务智能体';
    }
  };

  return (
    <header className="bg-white/95 backdrop-blur-xl sticky top-0 z-50 px-4 pt-4 pb-3 border-b border-slate-100 transition-all duration-300 shadow-sm">
      <div className="flex items-center justify-between h-11">
        
        {/* Left: Brand Identity or Back Button */}
        <div className="flex items-center gap-2.5">
          {isHome ? (
            <>
              <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-blue-600 to-indigo-800 flex items-center justify-center shadow-lg shadow-blue-600/20 border border-white/20">
                <Bot size={20} className="text-white" />
              </div>
              <div className="flex flex-col justify-center h-full">
                <h1 className="text-[15px] font-bold text-slate-800 leading-none tracking-tight">
                  工商联管理服务智能体
                </h1>
                <span className="text-[10px] text-slate-400 font-medium mt-1">
                  智能连接 • 高效服务
                </span>
              </div>
            </>
          ) : (
            <button 
              onClick={onBack}
              className="flex items-center gap-1 text-slate-800 hover:text-blue-600 transition-colors active:opacity-60 pl-1"
            >
              <ChevronLeft size={22} strokeWidth={2.5} />
              <span className="text-base font-bold tracking-tight">{getTitle()}</span>
            </button>
          )}
        </div>

        {/* Right: Actions (Bell + WeChat Capsule) */}
        <div className="flex items-center gap-2">
            {/* Notification Bell - ONLY visible on Home */}
            {isHome && (
                <button 
                  onClick={onNotification}
                  className="w-9 h-9 rounded-full bg-slate-50 text-slate-500 hover:bg-slate-100 hover:text-blue-600 flex items-center justify-center transition-all active:scale-95 relative"
                >
                    <Bell size={20} />
                    <span className="absolute top-2 right-2.5 w-2 h-2 bg-red-500 rounded-full border border-white"></span>
                </button>
            )}

            {/* WeChat Mini Program Capsule Mock */}
            <div className="flex items-center bg-white/60 backdrop-blur-sm border border-slate-200 rounded-full h-[32px] px-3 gap-3 shadow-sm ml-1">
                {/* Menu (Three Dots) */}
                <MoreHorizontal size={18} className="text-slate-800" strokeWidth={2.5} />
                
                <div className="w-[1px] h-3.5 bg-slate-300/60"></div>
                
                {/* Minimize (Usually not on mobile but requested) */}
                <Minus size={18} className="text-slate-800" strokeWidth={2.5} />

                <div className="w-[1px] h-3.5 bg-slate-300/60"></div>
                
                {/* Close (Bullseye style) */}
                <div className="relative w-4 h-4 rounded-full border-[1.5px] border-slate-800 flex items-center justify-center">
                    <div className="w-1.5 h-1.5 bg-slate-800 rounded-full"></div>
                </div>
            </div>
        </div>

      </div>
    </header>
  );
};