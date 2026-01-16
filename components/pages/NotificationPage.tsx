import React from 'react';
import { Bell, FileText, Calendar, Info } from 'lucide-react';
import { NotificationItem } from '../../types';

const MOCK_NOTIFICATIONS: NotificationItem[] = [
    { id: '1', title: '政策申报提醒', content: '您关注的《2024高精尖产业支持资金》申报将于3天后截止，请尽快提交材料。', time: '10分钟前', read: false, type: 'policy' },
    { id: '2', title: '活动报名成功', content: '您已成功报名“政企面对面”早餐会，请准时参加。', time: '2小时前', read: false, type: 'activity' },
    { id: '3', title: '系统升级通知', content: '系统将于今晚24:00进行维护升级，预计耗时2小时。', time: '昨天', read: true, type: 'system' },
];

export const NotificationPage: React.FC = () => {
  const getIcon = (type: string) => {
    switch(type) {
        case 'policy': return <FileText size={16} className="text-blue-600" />;
        case 'activity': return <Calendar size={16} className="text-orange-500" />;
        default: return <Info size={16} className="text-slate-500" />;
    }
  };

  const getBgColor = (type: string) => {
    switch(type) {
        case 'policy': return 'bg-blue-50';
        case 'activity': return 'bg-orange-50';
        default: return 'bg-slate-100';
    }
  };

  return (
    <div className="flex flex-col h-full bg-slate-50 p-4 space-y-3 overflow-y-auto pb-12">
        {MOCK_NOTIFICATIONS.map(item => (
            <div key={item.id} className="bg-white p-4 rounded-xl shadow-sm border border-slate-100 relative overflow-hidden active:scale-[0.99] transition-transform">
                {!item.read && (
                    <div className="absolute top-4 right-4 w-2 h-2 bg-red-500 rounded-full"></div>
                )}
                <div className="flex items-start gap-3">
                    <div className={`w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 ${getBgColor(item.type)}`}>
                        {getIcon(item.type)}
                    </div>
                    <div className="flex-1">
                        <div className="flex justify-between items-center mb-1 pr-4">
                            <h3 className={`text-sm font-bold ${item.read ? 'text-slate-600' : 'text-slate-900'}`}>{item.title}</h3>
                            <span className="text-[10px] text-slate-400 font-medium">{item.time}</span>
                        </div>
                        <p className="text-xs text-slate-500 leading-relaxed">{item.content}</p>
                    </div>
                </div>
            </div>
        ))}
        <div className="text-center py-6 text-slate-300 text-xs">
            - 没有更多消息了 -
        </div>
    </div>
  );
};