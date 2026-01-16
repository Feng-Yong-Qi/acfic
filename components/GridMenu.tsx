import React from 'react';
import { GRID_MENU_ITEMS } from '../constants';

interface GridMenuProps {
  onItemClick: (title: string) => void;
}

export const GridMenu: React.FC<GridMenuProps> = ({ onItemClick }) => {
  const getItem = (id: string) => GRID_MENU_ITEMS.find(i => i.id === id);

  // 统一的卡片渲染器
  const renderUniformCard = (id: string) => {
    const item = getItem(id);
    if (!item) return null;

    return (
        <button 
            key={id} 
            onClick={() => onItemClick(item.title)}
            className="flex flex-col items-center justify-center h-[6.5rem] bg-white rounded-2xl shadow-sm border border-slate-100 active:scale-[0.96] transition-all group hover:shadow-md hover:border-blue-100 relative overflow-hidden w-full"
        >
            {/* Hover Effect Background */}
            <div className={`absolute inset-0 opacity-0 group-hover:opacity-5 ${item.bgColor} transition-opacity duration-300`}></div>
            
            <div className={`w-11 h-11 rounded-[14px] flex items-center justify-center ${item.bgColor} mb-2 shadow-sm group-hover:scale-110 transition-transform duration-300`}>
                <item.icon size={22} className={item.color} strokeWidth={2} />
            </div>
            
            <span className="text-[12px] font-bold text-slate-700 tracking-tight group-hover:text-slate-900">{item.title}</span>
        </button>
    );
  };

  return (
    <div className="w-full pb-2 space-y-6 mt-2">
      
      {/* Group 1: 政务服务 (3 items) */}
      <div>
        <div className="flex items-center gap-2 mb-3 px-1">
            <div className="w-1 h-3.5 bg-blue-600 rounded-full"></div>
            <h3 className="text-sm font-bold text-slate-800">政务服务</h3>
        </div>
        <div className="grid grid-cols-3 gap-3">
            {renderUniformCard('party')}
            {renderUniformCard('policy')}
            {renderUniformCard('calc')}
        </div>
      </div>

      {/* Group 2: 互动交流 (2 items) */}
      <div>
        <div className="flex items-center gap-2 mb-3 px-1">
            <div className="w-1 h-3.5 bg-indigo-500 rounded-full"></div>
            <h3 className="text-sm font-bold text-slate-800">互动交流</h3>
        </div>
        {/* Changed from grid-cols-2 to grid-cols-3 for consistent button size */}
        <div className="grid grid-cols-3 gap-3">
            {renderUniformCard('activity')}
            {renderUniformCard('suggest')}
        </div>
      </div>

      {/* Group 3: 专业服务 (3 items) */}
      <div>
        <div className="flex items-center gap-2 mb-3 px-1">
            <div className="w-1 h-3.5 bg-teal-500 rounded-full"></div>
            <h3 className="text-sm font-bold text-slate-800">专业服务</h3>
        </div>
        {/* 使用白色容器增加层次感，但内部卡片风格保持一致 */}
        <div className="bg-white/50 backdrop-blur-sm rounded-3xl p-1">
            <div className="grid grid-cols-3 gap-3">
                {renderUniformCard('finance')}
                {renderUniformCard('law')}
                {renderUniformCard('overseas')}
            </div>
        </div>
      </div>

      {/* Group 4: 便民指南 (2 items) */}
      <div>
        <div className="flex items-center gap-2 mb-3 px-1">
            <div className="w-1 h-3.5 bg-orange-500 rounded-full"></div>
            <h3 className="text-sm font-bold text-slate-800">便民指南</h3>
        </div>
        {/* Changed from grid-cols-2 to grid-cols-3 for consistent button size */}
        <div className="grid grid-cols-3 gap-3">
            {renderUniformCard('guide')}
            {renderUniformCard('life')}
        </div>
      </div>

    </div>
  );
};