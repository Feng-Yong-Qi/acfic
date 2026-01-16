import React from 'react';
import { ChevronRight, ExternalLink } from 'lucide-react';

interface InfoItem {
    id: string;
    title: string;
    desc: string;
    tag?: string;
}

interface InfoListPageProps {
    type: 'finance' | 'law' | 'overseas' | 'guide';
}

const DATA: Record<string, InfoItem[]> = {
    finance: [
        { id: '1', title: '“专精特新”贷', desc: '北京银行针对专精特新企业推出的低息贷款产品。', tag: '信贷产品' },
        { id: '2', title: '企业上市辅导座谈会', desc: '邀请北交所专家讲解上市流程与注意事项。', tag: '融资撮合' },
        { id: '3', title: '普惠金融知识科普', desc: '如何利用信用记录获取更高的授信额度？', tag: '金融知识' }
    ],
    law: [
        { id: '1', title: '涉企合同纠纷典型案例解析', desc: '分析常见合同陷阱，规避法律风险。', tag: '以案释法' },
        { id: '2', title: '劳动用工法律合规指南', desc: '新就业形态下的劳动关系认定问题。', tag: '合规指引' },
        { id: '3', title: '西城区法院商事调解中心', desc: '提供快速、低成本的纠纷解决渠道。', tag: '服务资源' }
    ],
    overseas: [
        { id: '1', title: '驻外使馆经商处联系方式一览', desc: '覆盖一带一路沿线主要国家。', tag: '使馆信息' },
        { id: '2', title: '海外公司注册代办服务', desc: '对接专业机构，提供一站式落地服务。', tag: '资源对接' },
        { id: '3', title: '出海企业知识产权保护', desc: '海外商标注册与侵权应对策略。', tag: '商务部指南' }
    ],
    guide: [
        { id: '1', title: '企业开办“一窗通办”流程图', desc: '全程网办，最快0.5天拿证。', tag: '行政审批' },
        { id: '2', title: '居住证办理及积分落户政策', desc: '为企业人才提供生活保障服务指引。', tag: '人才服务' },
        { id: '3', title: '公积金缴纳与提取指南', desc: '最新调整的缴存基数与比例说明。', tag: '社保公积金' }
    ]
};

export const InfoListPage: React.FC<InfoListPageProps> = ({ type }) => {
  const items = DATA[type] || [];
  
  const getTheme = () => {
      switch(type) {
          case 'finance': return { text: 'text-indigo-600', bg: 'bg-indigo-50', border: 'border-indigo-100' };
          case 'law': return { text: 'text-blue-600', bg: 'bg-blue-50', border: 'border-blue-100' };
          case 'overseas': return { text: 'text-teal-600', bg: 'bg-teal-50', border: 'border-teal-100' };
          default: return { text: 'text-emerald-600', bg: 'bg-emerald-50', border: 'border-emerald-100' };
      }
  };
  
  const theme = getTheme();

  return (
    <div className="px-4 py-5 space-y-4 bg-slate-50 h-full overflow-y-auto pb-12">
        {items.map(item => (
            <div key={item.id} className="bg-white p-5 rounded-2xl shadow-sm border border-slate-100 active:scale-[0.99] transition-transform hover:shadow-md cursor-pointer group">
                <div className="flex justify-between items-start mb-2">
                    <h3 className="text-sm font-bold text-slate-800 leading-snug">{item.title}</h3>
                    {item.tag && (
                        <span className={`text-[10px] px-2 py-0.5 rounded-md font-bold ${theme.text} ${theme.bg}`}>
                            {item.tag}
                        </span>
                    )}
                </div>
                <p className="text-xs text-slate-500 mb-4 leading-relaxed">{item.desc}</p>
                <div className="flex items-center gap-1 text-[11px] text-slate-400 group-hover:text-slate-600 transition-colors">
                    <span>查看详情</span>
                    <ChevronRight size={12} />
                </div>
            </div>
        ))}
        <div className="text-center mt-6">
             <button className="text-xs text-slate-500 font-medium flex items-center justify-center gap-1.5 mx-auto bg-white px-4 py-2 rounded-full border border-slate-200 shadow-sm active:bg-slate-50">
                <ExternalLink size={12} /> 更多资源请访问官网
             </button>
        </div>
    </div>
  );
};