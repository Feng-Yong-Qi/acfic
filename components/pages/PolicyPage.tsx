import React, { useState } from 'react';
import { Search, Copy, ChevronRight, FileText } from 'lucide-react';
import { PolicyItem } from '../../types';

const MOCK_POLICIES: PolicyItem[] = [
    { id: '1', title: '关于支持高精尖产业发展的若干措施', tag: '资金支持', unit: '西城区发改委', date: '2024-05-10', status: 'declarable' },
    { id: '2', title: '2023年度中小企业发展专项资金申报指南', tag: '税收优惠', unit: '西城区经信局', date: '2023-12-01', status: 'expired' },
    { id: '3', title: '西城区数字经济产业发展三年行动计划', tag: '产业规划', unit: '区政府', date: '2024-01-15', status: 'empty' }, 
    { id: '4', title: '关于开展2024年“专精特新”中小企业认定的通知', tag: '资质认定', unit: '工信局', date: '2024-05-20', status: 'declarable' },
];

export const PolicyPage: React.FC = () => {
  const [filter, setFilter] = useState<'all' | 'declarable' | 'expired'>('all');
  const [search, setSearch] = useState('');

  const filteredList = MOCK_POLICIES.filter(p => {
    if (filter === 'declarable' && p.status !== 'declarable') return false;
    if (filter === 'expired' && p.status !== 'expired') return false;
    return p.title.includes(search);
  });

  const getStatusBadge = (status: string) => {
    switch(status) {
        case 'declarable': return <span className="text-[10px] bg-emerald-100 text-emerald-700 px-2 py-0.5 rounded-md font-bold">可申报</span>;
        case 'expired': return <span className="text-[10px] bg-slate-100 text-slate-500 px-2 py-0.5 rounded-md font-bold">已失效</span>;
        default: return null;
    }
  };

  return (
    <div className="flex flex-col h-full bg-slate-50">
      {/* Search Bar */}
      <div className="p-4 bg-white sticky top-0 z-10 border-b border-slate-100 shadow-sm">
        <div className="flex items-center bg-slate-100 rounded-2xl px-3 py-2.5 border border-slate-200">
            <Search size={16} className="text-slate-400 mr-2" />
            <input 
                type="text" 
                placeholder="请输入政策关键词搜索..." 
                className="bg-transparent text-sm w-full outline-none text-slate-700 placeholder-slate-400"
                value={search}
                onChange={e => setSearch(e.target.value)}
            />
        </div>
        {/* Tabs */}
        <div className="flex gap-6 mt-4 text-sm font-bold px-1">
            {['all', 'declarable', 'expired'].map(t => (
                <button 
                    key={t}
                    onClick={() => setFilter(t as any)}
                    className={`pb-2 relative transition-colors ${filter === t ? 'text-blue-600' : 'text-slate-400'}`}
                >
                    {t === 'all' ? '全部政策' : t === 'declarable' ? '正在申报' : '历史归档'}
                    {filter === t && <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-4 h-0.5 bg-blue-600 rounded-full"></div>}
                </button>
            ))}
        </div>
      </div>

      {/* List */}
      <div className="flex-1 overflow-y-auto p-4 space-y-3 pb-24">
        {filteredList.map(item => (
            <div key={item.id} className="bg-white p-5 rounded-2xl shadow-sm border border-slate-100 active:scale-[0.99] transition-transform">
                <div className="flex items-start justify-between mb-3">
                    <h3 className="text-sm font-bold text-slate-800 leading-snug flex-1 mr-3">{item.title}</h3>
                    {getStatusBadge(item.status)}
                </div>
                
                <div className="flex items-center flex-wrap gap-2 mb-4">
                    <span className="text-[10px] bg-blue-50 text-blue-600 px-1.5 py-0.5 rounded font-medium">{item.tag}</span>
                    <span className="text-[10px] text-slate-400">{item.unit}</span>
                    <span className="text-[10px] text-slate-300">|</span>
                    <span className="text-[10px] text-slate-400 font-medium font-mono">{item.date}</span>
                </div>

                <div className="flex gap-3 pt-3 border-t border-slate-50">
                    <button className="flex-1 py-2 flex items-center justify-center gap-1.5 text-xs font-bold text-slate-600 bg-slate-50 rounded-xl active:bg-slate-200 transition-colors">
                        <Copy size={13} />
                        复制链接
                    </button>
                    <button className="flex-1 py-2 flex items-center justify-center gap-1.5 text-xs font-bold text-white bg-blue-600 rounded-xl active:bg-blue-700 shadow-md shadow-blue-500/20 transition-colors">
                        <FileText size={13} />
                        查看详情
                    </button>
                </div>
            </div>
        ))}
        {filteredList.length === 0 && (
            <div className="text-center py-12 text-slate-400 text-xs">暂无相关政策数据</div>
        )}
      </div>
    </div>
  );
};