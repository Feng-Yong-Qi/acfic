import React, { useState } from 'react';
import { Calendar, MapPin, Users, ChevronRight } from 'lucide-react';
import { ActivityItem } from '../../types';

const MOCK_ACTIVITIES: ActivityItem[] = [
    { id: '1', title: '“政企面对面”早餐会', content: '邀请区领导与民营企业家共进早餐，畅聊发展。', tag: '政企沟通', time: '2024-06-15 08:30', target: '会员企业负责人', status: 'ongoing', subStatus: 'registered' },
    { id: '2', title: '数字经济与企业转型培训讲座', content: '特邀专家讲解AI时代企业如何降本增效。', tag: '培训讲座', time: '2024-06-20 14:00', target: '企业高管', status: 'ongoing', subStatus: 'unprocessed' },
    { id: '3', title: '2023年度西城区优秀民营企业表彰大会', content: '回顾过去一年成绩，表彰优秀企业。', tag: '表彰大会', time: '2024-01-10', target: '全体会员', status: 'ended' },
];

export const ActivityPage: React.FC = () => {
  const [mainTab, setMainTab] = useState<'ongoing' | 'ended'>('ongoing');
  const [subTab, setSubTab] = useState<'all' | 'unprocessed' | 'read' | 'registered'>('all');

  const filtered = MOCK_ACTIVITIES.filter(a => {
    if (mainTab === 'ended' && a.status !== 'ended') return false;
    if (mainTab === 'ongoing') {
        if (a.status !== 'ongoing') return false;
        if (subTab !== 'all' && a.subStatus !== subTab) return false;
    }
    return true;
  });

  return (
    <div className="flex flex-col h-full bg-slate-50">
        {/* Top Tabs */}
        <div className="bg-white p-3 flex gap-3 justify-center shadow-sm z-10 sticky top-0">
            <button 
                onClick={() => setMainTab('ongoing')}
                className={`flex-1 py-2 text-xs font-bold rounded-xl transition-all shadow-sm ${mainTab === 'ongoing' ? 'bg-blue-600 text-white shadow-blue-500/25' : 'bg-slate-100 text-slate-500'}`}
            >
                进行中
            </button>
            <button 
                onClick={() => setMainTab('ended')}
                className={`flex-1 py-2 text-xs font-bold rounded-xl transition-all shadow-sm ${mainTab === 'ended' ? 'bg-slate-700 text-white shadow-slate-500/25' : 'bg-slate-100 text-slate-500'}`}
            >
                已结束
            </button>
        </div>

        {/* Sub Tabs for Ongoing */}
        {mainTab === 'ongoing' && (
            <div className="flex gap-4 px-5 py-3 bg-white border-b border-slate-100 text-xs text-slate-500 overflow-x-auto">
                {['all', 'unprocessed', 'read', 'registered'].map(t => (
                    <button 
                        key={t} 
                        onClick={() => setSubTab(t as any)}
                        className={`transition-colors whitespace-nowrap ${subTab === t ? 'text-blue-600 font-bold bg-blue-50 px-2 py-0.5 rounded-md' : 'hover:text-slate-800'}`}
                    >
                        {t === 'all' ? '全部' : t === 'unprocessed' ? '未处置' : t === 'read' ? '已读' : '已报名'}
                    </button>
                ))}
            </div>
        )}

        {/* List */}
        <div className="p-4 space-y-4 pb-20 overflow-y-auto flex-1">
            {filtered.map(item => (
                <div key={item.id} className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden group hover:shadow-md transition-shadow">
                    <div className="p-5">
                        <div className="flex justify-between items-start mb-3">
                            <h3 className="font-bold text-slate-800 text-sm">{item.title}</h3>
                            {item.status === 'ongoing' ? (
                                <span className={`text-[10px] px-2 py-0.5 rounded-md font-bold ${item.subStatus === 'registered' ? 'bg-emerald-50 text-emerald-600' : 'bg-blue-50 text-blue-600'}`}>
                                    {item.subStatus === 'registered' ? '已报名' : '报名中'}
                                </span>
                            ) : (
                                <span className="text-[10px] bg-slate-100 text-slate-500 px-2 py-0.5 rounded-md font-bold">已结束</span>
                            )}
                        </div>
                        <p className="text-xs text-slate-500 mb-4 line-clamp-2 leading-relaxed bg-slate-50 p-2 rounded-lg">{item.content}</p>
                        
                        <div className="space-y-2">
                            <div className="flex items-center gap-2 text-[11px] text-slate-600">
                                <Calendar size={14} className="text-blue-500" />
                                <span className="font-medium">{item.time}</span>
                            </div>
                            <div className="flex items-center gap-2 text-[11px] text-slate-600">
                                <Users size={14} className="text-indigo-500" />
                                <span className="font-medium">对象：{item.target}</span>
                            </div>
                        </div>
                    </div>
                    
                    <button className="w-full py-2.5 bg-slate-50 text-xs text-blue-700 font-bold border-t border-slate-100 active:bg-blue-100 transition-colors flex items-center justify-center gap-1">
                        查看详情 <ChevronRight size={14} />
                    </button>
                </div>
            ))}
            {filtered.length === 0 && (
                <div className="text-center py-10 text-slate-400 text-xs">暂无活动信息</div>
            )}
        </div>
    </div>
  );
};