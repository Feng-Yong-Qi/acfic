import React from 'react';
import { Flag, Newspaper, ChevronRight } from 'lucide-react';

export const PartyPage: React.FC = () => {
  return (
    <div className="px-4 py-5 space-y-6 pb-20 bg-slate-50 min-h-full">
      {/* Banner */}
      <div className="w-full h-36 bg-gradient-to-br from-red-700 to-red-600 rounded-2xl flex flex-col justify-center px-6 shadow-xl shadow-red-600/20 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full blur-2xl -mr-10 -mt-10 pointer-events-none"></div>
        <h2 className="text-white font-bold text-xl mb-2 flex items-center gap-2 relative z-10">
            <div className="p-1.5 bg-white/20 rounded-lg backdrop-blur-sm">
                <Flag size={20} className="text-white" />
            </div>
            不忘初心 牢记使命
        </h2>
        <p className="text-red-50 text-xs opacity-90 font-medium relative z-10 tracking-wide">西城区工商联党建工作专题服务</p>
      </div>

      {/* Section 1: Publicity */}
      <div>
        <div className="flex items-center justify-between mb-3 px-1">
            <h3 className="text-sm font-bold text-slate-800 flex items-center gap-2">
                <span className="w-1 h-4 bg-red-600 rounded-full"></span>
                信息公示
            </h3>
            <span className="text-[10px] text-slate-400 flex items-center">更多 <ChevronRight size={10} /></span>
        </div>
        <div className="bg-white rounded-2xl p-1 shadow-sm border border-slate-100">
            {[1, 2].map((i) => (
                <div key={i} className="p-3 border-b border-slate-50 last:border-0 hover:bg-slate-50 transition-colors rounded-xl cursor-pointer">
                    <p className="text-sm text-slate-700 font-bold leading-snug line-clamp-2">关于开展2024年度非公有制经济组织党组织书记述职评议考核工作的通知</p>
                    <div className="flex justify-between items-center mt-2">
                        <span className="text-[10px] px-1.5 py-0.5 bg-red-50 text-red-600 rounded font-medium">置顶</span>
                        <span className="text-[10px] text-slate-400 font-medium">2024-05-1{i}</span>
                    </div>
                </div>
            ))}
        </div>
      </div>

      {/* Section 2: Knowledge */}
      <div>
        <div className="flex items-center justify-between mb-3 px-1">
            <h3 className="text-sm font-bold text-slate-800 flex items-center gap-2">
                <span className="w-1 h-4 bg-red-600 rounded-full"></span>
                党政知识
            </h3>
        </div>
        <div className="space-y-3">
            {[1, 2, 3].map((i) => (
                <div key={i} className="bg-white rounded-xl p-3.5 flex gap-4 shadow-sm border border-slate-100 items-center active:scale-[0.99] transition-transform">
                    <div className="w-12 h-12 bg-red-50 rounded-xl flex items-center justify-center text-red-600 shrink-0">
                        <Newspaper size={20} />
                    </div>
                    <div className="flex-1 min-w-0">
                        <h4 className="text-xs font-bold text-slate-800 mb-1 truncate">党的二十大精神学习要点之{i}</h4>
                        <p className="text-[10px] text-slate-400 line-clamp-1">深入学习贯彻习近平新时代中国特色社会主义思想，坚持...</p>
                    </div>
                    <ChevronRight size={14} className="text-slate-300" />
                </div>
            ))}
        </div>
      </div>
    </div>
  );
};