import React, { useState } from 'react';
import { 
  Globe, 
  ShieldCheck, 
  TrendingUp,
  Siren,
  Search, 
  ExternalLink,
  ChevronRight,
  Phone,
  UserCheck,
  Download,
  Map as MapIcon,
  FileText,
  Building2,
  Gavel,
  ArrowLeft,
  Landmark,
  Clock,
  Tag,
  MousePointerClick,
  QrCode,
  AlertCircle,
  BarChart3,
  Newspaper,
  Calculator,
  PieChart,
  Lightbulb,
  CheckCircle2,
  Link as LinkIcon
} from 'lucide-react';

type TabType = 'guide' | 'policy' | 'news' | 'risk';
type ContinentType = 'Asia' | 'Africa' | 'Europe' | 'America';

interface CountryData {
  id: number;
  name: string;
  continent: ContinentType;
  region_detail: string;
  env: string;
  policy: string;
  legal: string;
  tags: string[];
  update: string;
}

interface RiskNewsItem {
  id: number;
  title: string;
  newsCategory: string;
  date: string;
  riskCategory: string;
  riskLevel: 'high' | 'medium' | 'low';
  content: string;
  country: string;
  continent: ContinentType;
}

interface NewsItem {
  id: number;
  title: string;
  date: string;
  tag: string;
  type: 'positive' | 'warning' | 'neutral';
  source: string;
  content: string;
}

interface RiskDetail {
  text: string;
  relatedNews?: RiskNewsItem;
}

interface LinkedNewsItem {
    news: RiskNewsItem;
    affectedRisks: string[];
}

interface CalcResult {
  total: number;
  high: RiskDetail[];
  medium: RiskDetail[];
  low: RiskDetail[];
  linkedNews: LinkedNewsItem[];
  overseasAdvice: string;
  industryAdvice: string;
}

export const BeltAndRoadPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState<TabType>('guide');
  
  // Navigation States
  const [continent, setContinent] = useState<ContinentType>('Asia'); // For Guide Tab
  const [riskContinent, setRiskContinent] = useState<ContinentType>('Asia'); // For Risk Tab
  
  const [selectedCountry, setSelectedCountry] = useState<CountryData | null>(null); // Guide Detail
  const [selectedRiskCountryName, setSelectedRiskCountryName] = useState<string | null>(null); // Risk Level 2: Country List
  const [selectedRiskNews, setSelectedRiskNews] = useState<RiskNewsItem | null>(null); // Risk Level 3: News Detail
  const [selectedNews, setSelectedNews] = useState<NewsItem | null>(null); // General News Detail

  // Calculator States
  const [isCalcOpen, setIsCalcOpen] = useState(false);
  const [calcForm, setCalcForm] = useState({
    country: '',
    category: '',
    industry: ''
  });
  const [calcResult, setCalcResult] = useState<CalcResult | null>(null);
  const [isCalculating, setIsCalculating] = useState(false);

  // 1. Mock Data: Detailed Country Guides
  const GUIDES: CountryData[] = [
    { 
      id: 1, 
      name: '新加坡', 
      continent: 'Asia', 
      region_detail: '东南亚',
      env: '营商环境优越，税收政策透明，金融体系发达。',
      policy: '外资准入开放，鼓励高新技术产业投资。',
      legal: '普通法系，法律体系完善，知识产权保护严格。',
      tags: ['金融中心', '低税率', '转口贸易'], 
      update: '2024-06' 
    },
    { 
      id: 2, 
      name: '越南', 
      continent: 'Asia', 
      region_detail: '东南亚',
      env: '劳动力成本相对较低，供应链配套日益完善，经济增长迅速。',
      policy: '设立多个工业园区，提供企业所得税“两免四减半”优惠。',
      legal: '社会主义法系，投资法不断修订完善，但执行层面偶有波动。',
      tags: ['制造业转移', '人口红利', '自贸协定'], 
      update: '2024-05' 
    },
    { 
      id: 3, 
      name: '沙特阿拉伯', 
      continent: 'Asia', 
      region_detail: '中东',
      env: '推进“2030愿景”，致力于经济多元化，基础设施建设需求大。',
      policy: '放宽外资持股限制，要求跨国公司设立地区总部。',
      legal: '以伊斯兰教法为基础，商业法规正逐步与国际接轨。',
      tags: ['能源转型', '基建项目', '主权基金'], 
      update: '2024-04' 
    },
    { 
      id: 4, 
      name: '尼日利亚', 
      continent: 'Africa', 
      region_detail: '西非',
      env: '非洲最大经济体，市场潜力大，但面临汇率波动和安全挑战。',
      policy: '设立莱基自贸区，鼓励制造业和农业加工投资。',
      legal: '混合法律体系，商业纠纷解决周期较长。',
      tags: ['外汇管制', '资源丰富', '市场准入'], 
      update: '2024-03' 
    },
    { 
      id: 5, 
      name: '匈牙利', 
      continent: 'Europe', 
      region_detail: '中东欧',
      env: '连接东西方的枢纽，拥有高素质劳动力，汽车产业链成熟。',
      policy: '欧盟最低的企业所得税率之一，提供大量投资现金补贴。',
      legal: '欧盟法律框架，法规透明度高，投资保障性强。',
      tags: ['新能源汽车', '欧盟门户', '税收优惠'], 
      update: '2024-05' 
    },
  ];

  const NEWS: NewsItem[] = [
    { 
        id: 1, 
        title: 'RCEP对菲律宾正式生效，全员生效时刻到来', 
        date: '2024-06-02', 
        tag: '贸易政策', 
        type: 'positive',
        source: '商务部',
        content: '2023年6月2日，《区域全面经济伙伴关系协定》（RCEP）对菲律宾正式生效，标志着RCEP对15个成员国全面生效，全球人口最多、经贸规模最大、最具发展潜力的自由贸易区进入全面实施的新阶段。这将为区域经济一体化注入强劲动力，全面提升东亚贸易投资自由化便利化水平，助力地区经济长期稳定发展。对于我国企业而言，这意味着与东盟国家的贸易往来将更加便利，关税成本进一步降低。'
    },
    { 
        id: 2, 
        title: '美联储加息预期升温，新兴市场汇率波动加剧', 
        date: '2024-05-28', 
        tag: '宏观经济', 
        type: 'warning',
        source: '国际金融报',
        content: '近期美国通胀数据表现出较强粘性，市场对美联储维持高利率甚至进一步加息的预期升温。受此影响，美元指数走强，主要非美货币普遍承压，尤其是新兴市场国家汇率波动加剧。部分依赖外部融资的新兴经济体面临资本外流和偿债压力增大的风险。建议涉外企业密切关注汇率走势，合理运用远期结售汇、外汇期权等避险工具锁定汇率成本，规避汇率风险。'
    },
    { 
        id: 3, 
        title: '关于中非经贸博览会报名的通知', 
        date: '2024-05-25', 
        tag: '投资机会', 
        type: 'neutral',
        source: '中非经贸博览会组委会',
        content: '第三届中非经贸博览会将于6月29日至7月2日在湖南长沙举办。本届博览会以“共谋发展、共享未来”为主题，将举办开幕式暨中非经贸合作论坛、各类专题研讨会及经贸洽谈会。现诚邀有意向开拓非洲市场的企业报名参展参会。参展企业将有机会与非洲各国政府代表、采购商面对面交流，寻找合作商机。详情请登录官方网站查询。'
    },
    { 
        id: 4, 
        title: '2024年全球海运价格走势分析报告发布', 
        date: '2024-05-20', 
        tag: '物流动态', 
        type: 'neutral',
        source: '航运交易所',
        content: '最新发布的《2024年全球海运价格走势分析报告》显示，随着全球供应链压力的缓解和新船运力的投放，主要航线运价已逐步回归常态化水平。但在地缘政治冲突和气候变化等不确定因素影响下，局部航线仍可能出现短期波动。报告建议进出口企业与船公司建立长期合作关系，优化物流路径，以应对潜在的运力波动风险。'
    },
  ];

  // Updated Risk News Data Structure with Content, Country, Continent
  const RISK_NEWS: RiskNewsItem[] = [
    { 
        id: 1, 
        title: '美国新出台进口管制措施，或将影响电子产品出口', 
        newsCategory: '国别风险预警', 
        date: '2026-01-16 16:24:04', 
        riskCategory: '政策风险', 
        riskLevel: 'high',
        country: '美国',
        continent: 'America',
        content: '美国商务部近日宣布了一项针对电子产品进口的新管制措施，该措施旨在加强对特定技术组件的审查。根据新规，所有涉及高性能计算芯片的电子产品在进入美国市场前，必须提供详尽的供应链溯源报告。分析人士指出，这将显著增加出口企业的合规成本，并可能导致通关周期延长2-3周。建议相关出口企业立即审查其供应链，确保符合新的合规要求，并提前与美国进口商沟通，以减轻潜在的贸易中断风险。此外，企业应关注后续发布的具体实施细则，以便及时调整出口策略。'
    },
    { 
        id: 2, 
        title: '机构预测2026年泰国通胀率有望回升至正值', 
        newsCategory: '国际贸易与投资要闻', 
        date: '2026-01-14 16:24:04', 
        riskCategory: '金融风险', 
        riskLevel: 'low',
        country: '泰国',
        continent: 'Asia',
        content: '根据最新发布的宏观经济报告，多家国际金融机构预测，随着旅游业的全面复苏和国内消费的稳步增长，泰国2026年的通货膨胀率有望结束长达数月的负增长，回升至正值区间。报告指出，泰国央行的货币政策调整以及政府推出的经济刺激计划正在发挥作用。对于投资者而言，这意味着泰铢汇率可能趋于稳定，市场需求将逐步回暖。然而，机构也提醒，仍需关注全球能源价格波动对泰国物价的潜在影响。'
    },
    { 
        id: 3, 
        title: '苏丹武装冲突持续升级，港口运营面临严重停摆风险', 
        newsCategory: '国别风险预警', 
        date: '2024-05-20 09:30:00', 
        riskCategory: '地缘风险', 
        riskLevel: 'high',
        country: '苏丹',
        continent: 'Africa',
        content: '苏丹境内的武装冲突近期呈现升级态势，主要冲突区域已蔓延至关键物流枢纽。据当地消息源证实，苏丹港的运营效率已大幅下降，部分码头作业完全暂停。多家国际船运公司已宣布暂停挂靠苏丹港或征收额外的战争险附加费。建议有货物在途或计划发往苏丹的出口企业，立即与物流服务商确认货物状态，并考虑暂停发货或改卸邻国港口。鉴于局势的不确定性，相关贸易款项的收回风险极高，建议采取最为保守的结算方式。'
    },
    { 
        id: 4, 
        title: '欧盟新电池法案正式生效，出口企业合规成本上升', 
        newsCategory: '国际贸易与投资要闻', 
        date: '2024-05-18 14:15:00', 
        riskCategory: '合规风险', 
        riskLevel: 'medium',
        country: '欧盟',
        continent: 'Europe',
        content: '欧盟《新电池法》已正式生效，对进入欧盟市场的电池产品提出了全生命周期的碳足迹申报要求。法案规定，自生效日起，所有在欧盟销售的动力电池和工业电池必须具备碳足迹声明和标签，并设立电子护照。这对我国电池出口企业提出了严峻的合规挑战。企业需要建立完善的碳排放数据管理体系，并完成第三方认证。未能满足要求的企业将面临无法进入欧盟市场的风险。'
    },
    { 
        id: 5, 
        title: '越南买方近期出现批量拖欠货款情况，请出口商注意', 
        newsCategory: '国别风险预警', 
        date: '2024-05-15 10:00:00', 
        riskCategory: '买方风险', 
        riskLevel: 'medium',
        country: '越南',
        continent: 'Asia',
        content: '近期，中国信保接到多起针对越南特定买方的报损案件。这类案件呈现出买方以市场销售不佳为由，集体拖欠货款的特征。经初步调查，受宏观经济波动影响，当地零售行业面临较大的库存压力和资金周转困难。建议出口商在与越南买方交易时，严格审核买方信用状况，尽量采用信用证等安全性较高的支付方式，并及时投保出口信用保险以规避收汇风险。'
    }
  ];

  // Helper for filtering Guide Tab
  const filteredGuides = GUIDES.filter(g => g.continent === continent);

  // Helper for filtering Risk Tab Level 1 (Country Stats)
  const getRiskCountriesByContinent = (c: ContinentType) => {
    const relevantNews = RISK_NEWS.filter(n => n.continent === c);
    // Group by country
    const grouped: Record<string, { high: number, medium: number, low: number, latest: string }> = {};
    
    relevantNews.forEach(news => {
        if (!grouped[news.country]) {
            grouped[news.country] = { high: 0, medium: 0, low: 0, latest: news.date };
        }
        grouped[news.country][news.riskLevel]++;
        if (news.date > grouped[news.country].latest) {
            grouped[news.country].latest = news.date;
        }
    });

    return Object.keys(grouped).map(country => ({
        name: country,
        stats: grouped[country]
    }));
  };

  // Helper for filtering Risk Tab Level 2 (Specific Country News)
  const getRiskNewsByCountry = (countryName: string) => {
    return RISK_NEWS.filter(n => n.country === countryName);
  };

  // Calculator Logic
  const handleCalculateRisk = () => {
    // Basic validation to ensure form is filled (user experience), 
    // but the Result will be FIXED for DEMONSTRATION as requested.
    if (!calcForm.country || !calcForm.category || !calcForm.industry) return;
    
    setIsCalculating(true);
    setTimeout(() => {
        // --- FIXED DEMONSTRATION SCENARIO ---
        // Country: 美国 (USA)
        // Category: 全部 (All)
        // Industry: 信息传输、软件和信息技术服务业 (Tech)
        
        let highRisks: RiskDetail[] = [];
        let mediumRisks: RiskDetail[] = [];
        let lowRisks: RiskDetail[] = [];
        let overseasAdvice = "";
        let industryAdvice = "";

        // Find relevant news (USA) for linking
        const usNews = RISK_NEWS.find(n => n.country === '美国');

        // 1. High Risks
        highRisks.push({
            text: "美国政策风险显著上升",
            relatedNews: usNews
        });
        highRisks.push({
            text: "出口管制与合规审查趋严",
            relatedNews: usNews
        });
         highRisks.push({
            text: "技术出口限制风险 (芯片/AI领域)"
        });

        // 2. Medium Risks
        mediumRisks.push({ text: "美元汇率波动风险" });
        mediumRisks.push({ text: "数据跨境传输与隐私合规风险" });

        // 3. Low Risks
        lowRisks.push({ text: "常规商业合同纠纷" });

        // 4. Industry Advice (Tech)
        industryAdvice = "建议加强知识产权海外布局，严格审查技术出口合规性，关注数据跨境传输法规（如CCPA），并建立数据合规管理体系。";

        // 5. Overseas Advice (USA)
        overseasAdvice = "鉴于目前贸易摩擦背景，建议聘请专业法律团队进行合规体检，规避制裁风险，并密切关注“实体清单”动态，做好供应链备选方案。";

        // Aggregate Linked News
        const allRisks = [...highRisks, ...mediumRisks, ...lowRisks];
        const linkedNewsMap = new Map<number, LinkedNewsItem>();
        
        allRisks.forEach(r => {
            if (r.relatedNews) {
                if (!linkedNewsMap.has(r.relatedNews.id)) {
                    linkedNewsMap.set(r.relatedNews.id, {
                        news: r.relatedNews,
                        affectedRisks: []
                    });
                }
                linkedNewsMap.get(r.relatedNews.id)!.affectedRisks.push(r.text);
            }
        });
        const linkedNews = Array.from(linkedNewsMap.values());

        setCalcResult({
            total: highRisks.length + mediumRisks.length + lowRisks.length,
            high: highRisks,
            medium: mediumRisks,
            low: lowRisks,
            linkedNews,
            overseasAdvice,
            industryAdvice
        });
        setIsCalculating(false);
    }, 1500);
  };

  // --- Components ---

  const DashboardCard = ({ 
    id, title, sub, icon: Icon, colorClass, bgGradient 
  }: { id: TabType, title: string, sub: string, icon: any, colorClass: string, bgGradient: string }) => {
    const isActive = activeTab === id;
    return (
      <button 
        onClick={() => {
            setActiveTab(id);
            setSelectedCountry(null); 
            setSelectedRiskNews(null);
            setSelectedRiskCountryName(null);
            setSelectedNews(null);
            setIsCalcOpen(false); // Close calc when switching tabs
        }}
        className={`relative overflow-hidden rounded-2xl p-4 text-left transition-all duration-300 ${isActive ? 'shadow-lg scale-[1.02] ring-2 ring-offset-1 ring-offset-slate-50' : 'shadow-sm hover:shadow-md opacity-80 hover:opacity-100'} ${isActive ? bgGradient : 'bg-white'}`}
        style={{ ringColor: isActive ? 'currentColor' : 'transparent' }}
      >
        <div className={`flex justify-between items-start mb-2`}>
          <div className={`p-2 rounded-xl ${isActive ? 'bg-white/20 text-white' : 'bg-slate-50 ' + colorClass}`}>
             <Icon size={20} />
          </div>
          {isActive && <div className="text-[10px] bg-white/20 text-white px-2 py-0.5 rounded-full backdrop-blur-sm">当前查看</div>}
        </div>
        <div>
           <h3 className={`text-sm font-bold mb-0.5 ${isActive ? 'text-white' : 'text-slate-800'}`}>{title}</h3>
           <p className={`text-[10px] ${isActive ? 'text-white/80' : 'text-slate-400'}`}>{sub}</p>
        </div>
      </button>
    );
  };

  const RiskLevelBadge = ({ level }: { level: 'high' | 'medium' | 'low' }) => {
    switch(level) {
        case 'high': return <span className="text-[10px] px-2 py-0.5 rounded bg-red-100 text-red-600 border border-red-200 font-bold">高风险</span>;
        case 'medium': return <span className="text-[10px] px-2 py-0.5 rounded bg-orange-100 text-orange-600 border border-orange-200 font-bold">中风险</span>;
        case 'low': return <span className="text-[10px] px-2 py-0.5 rounded bg-emerald-100 text-emerald-600 border border-emerald-200 font-bold">低风险</span>;
        default: return null;
    }
  };

  const SentimentBadge = ({ type }: { type: 'positive' | 'warning' | 'neutral' }) => {
    switch(type) {
        case 'positive': return <span className="text-[10px] px-2 py-0.5 rounded bg-emerald-100 text-emerald-600 border border-emerald-200 font-bold">利好消息</span>;
        case 'warning': return <span className="text-[10px] px-2 py-0.5 rounded bg-orange-100 text-orange-600 border border-orange-200 font-bold">风险预警</span>;
        case 'neutral': return <span className="text-[10px] px-2 py-0.5 rounded bg-blue-100 text-blue-600 border border-blue-200 font-bold">动态资讯</span>;
        default: return null;
    }
  };

  const ContinentSelector = ({ current, onChange }: { current: ContinentType, onChange: (c: ContinentType) => void }) => (
    <div className="flex gap-2 mb-5 overflow-x-auto no-scrollbar pb-1">
        {['Asia', 'Africa', 'Europe', 'America'].map(key => (
            <button 
                key={key}
                onClick={() => onChange(key as ContinentType)}
                className={`px-4 py-1.5 rounded-full text-xs font-bold whitespace-nowrap transition-all ${current === key ? 'bg-slate-800 text-white shadow-lg shadow-slate-200 scale-105' : 'bg-white text-slate-500 border border-slate-100'}`}
            >
                {key === 'Asia' ? '亚洲' : key === 'Africa' ? '非洲' : key === 'Europe' ? '欧洲' : '美洲'}
            </button>
        ))}
    </div>
  );

  // --- Render Risk Calculator View ---
  if (isCalcOpen) {
    return (
        <div className="flex flex-col h-full bg-slate-50 animate-in slide-in-from-right duration-300">
             {/* Header */}
             <div className="bg-white px-4 pt-4 pb-3 sticky top-0 z-20 border-b border-slate-100 shadow-sm">
                <button 
                    onClick={() => {
                        setIsCalcOpen(false);
                        setCalcResult(null); // Reset result on exit
                    }}
                    className="flex items-center gap-1 text-slate-500 hover:text-blue-600 transition-colors"
                >
                    <ArrowLeft size={18} />
                    <span className="text-sm font-bold">返回风险列表</span>
                </button>
            </div>

            <div className="flex-1 overflow-y-auto p-4 scroll-smooth">
                {/* Calculator Title Card */}
                <div className="bg-gradient-to-br from-orange-500 to-red-600 rounded-2xl p-6 text-white shadow-lg shadow-orange-500/30 mb-6">
                    <div className="flex items-center gap-3 mb-2">
                         <div className="p-2 bg-white/20 rounded-xl backdrop-blur-sm">
                            <Calculator size={24} className="text-white" />
                         </div>
                         <h2 className="text-xl font-bold">出海风险自测计算器</h2>
                    </div>
                    <p className="text-white/80 text-xs leading-relaxed">基于中信保全球风险数据库，结合企业行业特征，为您智能测算潜在出海风险。</p>
                </div>

                {!calcResult ? (
                    // --- Input Form ---
                    <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-100 space-y-5">
                        <div>
                            <label className="text-xs font-bold text-slate-700 mb-2 block">1. 目标国家/地区</label>
                            <select 
                                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm text-slate-700 outline-none focus:ring-2 focus:ring-orange-500 transition-all appearance-none"
                                value={calcForm.country}
                                onChange={(e) => setCalcForm({...calcForm, country: e.target.value})}
                            >
                                <option value="">请选择国家</option>
                                <option value="美国">美国</option>
                                <option value="越南">越南</option>
                                <option value="苏丹">苏丹</option>
                                <option value="泰国">泰国</option>
                                <option value="欧盟">欧盟</option>
                                <option value="其他">其他</option>
                            </select>
                        </div>
                        
                        <div>
                            <label className="text-xs font-bold text-slate-700 mb-2 block">2. 关注风险分类</label>
                            <select 
                                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm text-slate-700 outline-none focus:ring-2 focus:ring-orange-500 transition-all appearance-none"
                                value={calcForm.category}
                                onChange={(e) => setCalcForm({...calcForm, category: e.target.value})}
                            >
                                <option value="">请选择风险类型</option>
                                <option value="all">全部</option>
                                <option value="政策风险">政策风险 (关税/制裁)</option>
                                <option value="买方风险">买方风险 (拖欠/破产)</option>
                                <option value="金融风险">金融风险 (汇率/管制)</option>
                                <option value="地缘风险">地缘风险 (战争/动乱)</option>
                            </select>
                        </div>

                        <div>
                            <label className="text-xs font-bold text-slate-700 mb-2 block">3. 所属行业</label>
                            <select 
                                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm text-slate-700 outline-none focus:ring-2 focus:ring-orange-500 transition-all appearance-none"
                                value={calcForm.industry}
                                onChange={(e) => setCalcForm({...calcForm, industry: e.target.value})}
                            >
                                <option value="">请选择企业所属行业</option>
                                <option value="tech">信息传输、软件和信息技术服务业</option>
                                <option value="finance">金融业</option>
                                <option value="science">科学研究和技术服务业</option>
                                <option value="culture">文化、体育和娱乐业</option>
                                <option value="trade">批发和零售业</option>
                                <option value="manufacturing">制造业</option>
                                <option value="construction">建筑业</option>
                                <option value="leasing">租赁和商务服务业</option>
                                <option value="other">其他行业</option>
                            </select>
                        </div>

                        <button 
                            onClick={handleCalculateRisk}
                            disabled={isCalculating || !calcForm.country || !calcForm.category || !calcForm.industry}
                            className={`w-full py-3.5 rounded-xl font-bold text-white shadow-lg transition-all flex items-center justify-center gap-2 mt-4 ${isCalculating ? 'bg-slate-400 cursor-not-allowed' : 'bg-orange-600 hover:bg-orange-700 shadow-orange-500/30 active:scale-95'}`}
                        >
                            {isCalculating ? (
                                <>
                                    <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></span>
                                    正在智能测算...
                                </>
                            ) : (
                                <>
                                    <PieChart size={18} /> 开始风险测算
                                </>
                            )}
                        </button>
                    </div>
                ) : (
                    // --- Calculation Result ---
                    <div className="space-y-4 animate-in fade-in slide-in-from-bottom-4 duration-500">
                         {/* Stats Overview */}
                         <div className="bg-white rounded-2xl p-5 shadow-sm border border-slate-100 flex items-center justify-between">
                             <div className="flex flex-col">
                                 <span className="text-xs text-slate-400 font-medium">监测到潜在风险项</span>
                                 <div className="flex items-baseline gap-1">
                                     <span className="text-3xl font-black text-slate-800">{calcResult.total}</span>
                                     <span className="text-sm font-bold text-slate-500">项</span>
                                 </div>
                             </div>
                             <div className="flex gap-2">
                                 {calcResult.high.length > 0 && (
                                     <div className="flex flex-col items-center bg-red-50 px-3 py-2 rounded-xl border border-red-100">
                                         <span className="text-[10px] text-red-400 font-bold">高风险</span>
                                         <span className="text-lg font-bold text-red-600">{calcResult.high.length}</span>
                                     </div>
                                 )}
                                 {calcResult.medium.length > 0 && (
                                     <div className="flex flex-col items-center bg-orange-50 px-3 py-2 rounded-xl border border-orange-100">
                                         <span className="text-[10px] text-orange-400 font-bold">中风险</span>
                                         <span className="text-lg font-bold text-orange-600">{calcResult.medium.length}</span>
                                     </div>
                                 )}
                                 {calcResult.low.length > 0 && (
                                     <div className="flex flex-col items-center bg-emerald-50 px-3 py-2 rounded-xl border border-emerald-100">
                                         <span className="text-[10px] text-emerald-400 font-bold">低风险</span>
                                         <span className="text-lg font-bold text-emerald-600">{calcResult.low.length}</span>
                                     </div>
                                 )}
                             </div>
                         </div>

                         {/* Risk Details List */}
                         <div className="bg-white rounded-2xl p-5 shadow-sm border border-slate-100">
                             <h3 className="font-bold text-slate-800 text-sm mb-4 flex items-center gap-2">
                                <Siren size={16} className="text-orange-500" /> 
                                风险详情清单
                             </h3>
                             <div className="space-y-3">
                                 {calcResult.high.map((r, i) => (
                                     <div key={`h-${i}`} className="flex items-start gap-2.5 p-3 bg-red-50/50 rounded-xl border border-red-100">
                                         <AlertCircle size={16} className="text-red-500 shrink-0 mt-0.5" />
                                         <span className="text-xs text-slate-700 font-medium">{r.text}</span>
                                     </div>
                                 ))}
                                 {calcResult.medium.map((r, i) => (
                                     <div key={`m-${i}`} className="flex items-start gap-2.5 p-3 bg-orange-50/50 rounded-xl border border-orange-100">
                                         <AlertCircle size={16} className="text-orange-500 shrink-0 mt-0.5" />
                                         <span className="text-xs text-slate-700 font-medium">{r.text}</span>
                                     </div>
                                 ))}
                                 {calcResult.low.map((r, i) => (
                                     <div key={`l-${i}`} className="flex items-start gap-2.5 p-3 bg-emerald-50/50 rounded-xl border border-emerald-100">
                                         <CheckCircle2 size={16} className="text-emerald-500 shrink-0 mt-0.5" />
                                         <span className="text-xs text-slate-700 font-medium">{r.text}</span>
                                     </div>
                                 ))}
                             </div>
                         </div>

                         {/* Related Risk Intelligence (New Module) */}
                         {calcResult.linkedNews.length > 0 && (
                             <div className="bg-white rounded-2xl p-5 shadow-sm border border-slate-100">
                                 <h3 className="font-bold text-slate-800 text-sm mb-4 flex items-center gap-2">
                                    <Newspaper size={16} className="text-indigo-500" /> 
                                    关联风险资讯
                                 </h3>
                                 <div className="space-y-3">
                                     {calcResult.linkedNews.map((item, idx) => (
                                         <button 
                                            key={idx}
                                            onClick={() => setSelectedRiskNews(item.news)}
                                            className="w-full text-left bg-indigo-50/50 rounded-xl p-3 border border-indigo-100 active:scale-[0.99] transition-transform hover:shadow-sm"
                                         >
                                             <div className="flex justify-between items-start mb-2">
                                                 <h4 className="font-bold text-xs text-slate-800 line-clamp-1">{item.news.title}</h4>
                                                 <ChevronRight size={14} className="text-indigo-400 shrink-0" />
                                             </div>
                                             
                                             <div className="flex flex-wrap gap-1.5">
                                                 <span className="text-[10px] text-indigo-500 font-medium">影响风险项：</span>
                                                 {item.affectedRisks.map((risk, rIdx) => (
                                                     <span key={rIdx} className="text-[10px] bg-white px-1.5 py-0.5 rounded border border-indigo-100 text-slate-500 truncate max-w-[120px]">
                                                         {risk}
                                                     </span>
                                                 ))}
                                             </div>
                                         </button>
                                     ))}
                                 </div>
                             </div>
                         )}

                         {/* Advice Cards */}
                         <div className="bg-white rounded-2xl p-5 shadow-sm border border-slate-100">
                             <h3 className="font-bold text-slate-800 text-sm mb-4 flex items-center gap-2">
                                <Lightbulb size={16} className="text-blue-500" /> 
                                智能应对建议
                             </h3>
                             
                             <div className="mb-4">
                                 <h4 className="text-xs font-bold text-slate-500 mb-2">行业专项建议</h4>
                                 <p className="text-xs text-slate-600 leading-relaxed bg-slate-50 p-3 rounded-xl border border-slate-100">
                                     {calcResult.industryAdvice}
                                 </p>
                             </div>

                             <div>
                                 <h4 className="text-xs font-bold text-slate-500 mb-2">出海合规建议</h4>
                                 <p className="text-xs text-slate-600 leading-relaxed bg-slate-50 p-3 rounded-xl border border-slate-100">
                                     {calcResult.overseasAdvice}
                                 </p>
                             </div>
                         </div>

                         <button 
                            onClick={() => setCalcResult(null)}
                            className="w-full py-3 bg-slate-100 text-slate-600 rounded-xl font-bold text-sm hover:bg-slate-200 transition-colors"
                         >
                             重新测算
                         </button>
                    </div>
                )}
            </div>
        </div>
    );
  }

  // --- Render Detail View: Country Guide (Tertiary Page) ---
  if (selectedCountry) {
    return (
      <div className="flex flex-col h-full bg-slate-50 animate-in slide-in-from-right duration-300">
        <div className="bg-white px-4 pt-4 pb-4 sticky top-0 z-20 border-b border-slate-100 shadow-sm">
            <button 
                onClick={() => setSelectedCountry(null)}
                className="flex items-center gap-1 text-slate-500 mb-4 hover:text-blue-600 transition-colors"
            >
                <ArrowLeft size={18} />
                <span className="text-sm font-bold">返回索引</span>
            </button>
            
            <div className="flex justify-between items-start">
                <div>
                    <h2 className="text-2xl font-bold text-slate-900 mb-1 flex items-center gap-2">
                        {selectedCountry.name}
                        <span className="text-xs bg-blue-50 text-blue-600 px-2 py-0.5 rounded-full font-bold border border-blue-100 align-middle">
                            {selectedCountry.region_detail}
                        </span>
                    </h2>
                    <p className="text-xs text-slate-400">数据更新于：{selectedCountry.update}</p>
                </div>
                <div className="w-12 h-8 bg-slate-100 rounded shadow-sm border border-slate-200 flex items-center justify-center text-[10px] text-slate-400">
                    国旗
                </div>
            </div>
        </div>

        <div className="flex-1 overflow-y-auto p-4 space-y-4">
            <div className="bg-white rounded-2xl p-5 shadow-sm border border-slate-100">
                <div className="flex items-center gap-2 mb-3 text-blue-600">
                    <Building2 size={18} />
                    <h3 className="font-bold text-sm">营商环境</h3>
                </div>
                <p className="text-sm text-slate-600 leading-relaxed text-justify">
                    {selectedCountry.env}
                </p>
            </div>
            <div className="bg-white rounded-2xl p-5 shadow-sm border border-slate-100">
                <div className="flex items-center gap-2 mb-3 text-emerald-600">
                    <Landmark size={18} />
                    <h3 className="font-bold text-sm">投资政策</h3>
                </div>
                <p className="text-sm text-slate-600 leading-relaxed text-justify">
                    {selectedCountry.policy}
                </p>
            </div>
            <div className="bg-white rounded-2xl p-5 shadow-sm border border-slate-100">
                <div className="flex items-center gap-2 mb-3 text-indigo-600">
                    <Gavel size={18} />
                    <h3 className="font-bold text-sm">法律框架</h3>
                </div>
                <p className="text-sm text-slate-600 leading-relaxed text-justify">
                    {selectedCountry.legal}
                </p>
            </div>
            <div>
                <h3 className="text-xs font-bold text-slate-500 mb-2 px-1">风险与机遇标签</h3>
                <div className="flex flex-wrap gap-2">
                    {selectedCountry.tags.map(tag => (
                        <span key={tag} className="bg-white border border-slate-200 text-slate-600 px-3 py-1.5 rounded-lg text-xs font-medium shadow-sm">
                            # {tag}
                        </span>
                    ))}
                </div>
            </div>
        </div>

        <div className="p-4 bg-white border-t border-slate-100">
            <button className="w-full bg-blue-600 text-white py-3 rounded-xl font-bold flex items-center justify-center gap-2 shadow-lg shadow-blue-600/20 active:scale-95 transition-transform">
                <Download size={18} />
                下载完整《{selectedCountry.name}贸易指南》PDF
            </button>
        </div>
      </div>
    );
  }

  // --- Render Detail View: Risk News (Level 3 - Tertiary Page) ---
  if (selectedRiskNews) {
    return (
        <div className="flex flex-col h-full bg-slate-50 animate-in slide-in-from-right duration-300">
            {/* Header */}
            <div className="bg-white px-4 pt-4 pb-3 sticky top-0 z-20 border-b border-slate-100 shadow-sm">
                <button 
                    onClick={() => setSelectedRiskNews(null)}
                    className="flex items-center gap-1 text-slate-500 hover:text-blue-600 transition-colors"
                >
                    <ArrowLeft size={18} />
                    <span className="text-sm font-bold">
                        {isCalcOpen ? '返回测算结果' : `返回${selectedRiskCountryName || '列表'}`}
                    </span>
                </button>
            </div>

            <div className="flex-1 overflow-y-auto p-4 scroll-smooth">
                {/* 1. Summary Card */}
                <div className="bg-white p-5 rounded-2xl shadow-sm border border-slate-100 mb-6">
                    <h2 className="font-bold text-lg text-slate-800 mb-4 leading-snug">{selectedRiskNews.title}</h2>
                    
                    <div className="flex flex-wrap items-center gap-2 mb-4">
                        <RiskLevelBadge level={selectedRiskNews.riskLevel} />
                        <span className="text-xs px-2.5 py-0.5 rounded bg-slate-50 text-slate-600 border border-slate-100 font-medium flex items-center gap-1">
                            <Tag size={12} className="text-slate-400"/> {selectedRiskNews.riskCategory}
                        </span>
                    </div>

                    <div className="flex items-center gap-2 text-xs text-slate-400 border-t border-slate-50 pt-3">
                        <Clock size={14} />
                        <span>发布时间：{selectedRiskNews.date}</span>
                        <span className="mx-1">|</span>
                        <span>{selectedRiskNews.newsCategory}</span>
                    </div>
                </div>

                {/* 2. Original News Content */}
                <div className="px-1">
                    <div className="flex items-center gap-2 mb-4">
                        <div className="w-1 h-4 bg-blue-600 rounded-full"></div>
                        <h3 className="font-bold text-slate-800 text-sm">来源新闻原文</h3>
                    </div>
                    
                    <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 text-sm text-slate-700 leading-loose text-justify whitespace-pre-wrap">
                        {selectedRiskNews.content}
                    </div>
                    
                    <div className="mt-6 text-center">
                        <p className="text-[10px] text-slate-400">资讯来源：全球风险情报网络</p>
                    </div>
                </div>
            </div>
        </div>
    );
  }

    // --- Render Detail View: General News (Detail Page) ---
  if (selectedNews) {
    return (
        <div className="flex flex-col h-full bg-slate-50 animate-in slide-in-from-right duration-300">
            {/* Header */}
            <div className="bg-white px-4 pt-4 pb-3 sticky top-0 z-20 border-b border-slate-100 shadow-sm">
                <button 
                    onClick={() => setSelectedNews(null)}
                    className="flex items-center gap-1 text-slate-500 hover:text-blue-600 transition-colors"
                >
                    <ArrowLeft size={18} />
                    <span className="text-sm font-bold">返回动态列表</span>
                </button>
            </div>

            <div className="flex-1 overflow-y-auto p-4 scroll-smooth">
                {/* 1. Summary Card */}
                <div className="bg-white p-5 rounded-2xl shadow-sm border border-slate-100 mb-6">
                    <h2 className="font-bold text-lg text-slate-800 mb-4 leading-snug">{selectedNews.title}</h2>
                    
                    <div className="flex flex-wrap items-center gap-2 mb-4">
                        <SentimentBadge type={selectedNews.type} />
                        <span className="text-xs px-2.5 py-0.5 rounded bg-slate-50 text-slate-600 border border-slate-100 font-medium flex items-center gap-1">
                            <Tag size={12} className="text-slate-400"/> {selectedNews.tag}
                        </span>
                    </div>

                    <div className="flex items-center gap-2 text-xs text-slate-400 border-t border-slate-50 pt-3">
                        <Clock size={14} />
                        <span>{selectedNews.date}</span>
                        <span className="mx-1">|</span>
                        <span>来源：{selectedNews.source}</span>
                    </div>
                </div>

                {/* 2. Content */}
                <div className="px-1">
                    <div className="flex items-center gap-2 mb-4">
                        <div className="w-1 h-4 bg-indigo-600 rounded-full"></div>
                        <h3 className="font-bold text-slate-800 text-sm">资讯详情</h3>
                    </div>
                    
                    <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 text-sm text-slate-700 leading-loose text-justify whitespace-pre-wrap">
                        {selectedNews.content}
                    </div>
                </div>
            </div>
        </div>
    );
  }


  // --- Render Main Dashboard ---
  return (
    <div className="flex flex-col h-full bg-slate-50 relative">
      
      {/* 1. Header & Search Area */}
      <div className="bg-white px-4 pt-4 pb-2 sticky top-0 z-20">
         <div className="bg-slate-100 rounded-2xl px-3 py-2.5 flex items-center gap-2 border border-slate-200 shadow-inner mb-2">
            <Search size={16} className="text-slate-400" />
            <input 
                type="text" 
                placeholder="搜索国家 / 风险 / 政策..." 
                className="bg-transparent text-sm w-full outline-none text-slate-700 placeholder-slate-400" 
            />
         </div>
      </div>

      <div className="flex-1 overflow-y-auto px-4 pb-12 scroll-smooth">
        
        {/* 2. Dashboard Grid (Function Tabs) */}
        <div className="grid grid-cols-2 gap-3 mb-6 mt-2">
            <DashboardCard 
                id="guide"
                title="国别贸易指南"
                sub="分洲别 • 综合报告"
                icon={Globe}
                colorClass="text-blue-600"
                bgGradient="bg-gradient-to-br from-blue-500 to-blue-600 ring-blue-500"
            />
            <DashboardCard 
                id="risk"
                title="国别风险预警分析"
                sub="分国别 • 风险统计"
                icon={Siren}
                colorClass="text-orange-600"
                bgGradient="bg-gradient-to-br from-orange-500 to-red-500 ring-orange-500"
            />
            <DashboardCard 
                id="policy"
                title="保单领取介绍"
                sub="中信保 • 小微专区"
                icon={ShieldCheck}
                colorClass="text-emerald-600"
                bgGradient="bg-gradient-to-br from-emerald-500 to-teal-600 ring-emerald-500"
            />
            <DashboardCard 
                id="news"
                title="外贸风险动态"
                sub="实时资讯更新"
                icon={TrendingUp}
                colorClass="text-indigo-600"
                bgGradient="bg-gradient-to-br from-indigo-500 to-purple-600 ring-indigo-500"
            />
        </div>

        {/* 3. Dynamic Content Area */}
        <div className="animate-in fade-in slide-in-from-bottom-2 duration-300">
            
            {/* --- Content: Trade Guide --- */}
            {activeTab === 'guide' && (
                <div className="bg-white rounded-3xl p-5 shadow-sm border border-slate-100">
                    <div className="flex items-center justify-between mb-4">
                        <h3 className="font-bold text-slate-800 flex items-center gap-2">
                            <MapIcon size={18} className="text-blue-500" />
                            区域指南索引
                        </h3>
                    </div>
                    {/* Continent Tabs */}
                    <ContinentSelector current={continent} onChange={setContinent} />

                    <div className="space-y-4">
                        {filteredGuides.map(g => (
                            <div 
                                key={g.id} 
                                onClick={() => setSelectedCountry(g)}
                                className="flex flex-col rounded-2xl bg-white border border-slate-200 p-0 overflow-hidden shadow-sm active:scale-[0.98] transition-all cursor-pointer group hover:border-blue-300 hover:shadow-md"
                            >
                                {/* Card Header */}
                                <div className="bg-slate-50 px-4 py-3 flex justify-between items-center border-b border-slate-100">
                                    <div className="flex items-center gap-2">
                                        <div className="w-2 h-2 rounded-full bg-blue-500"></div>
                                        <h4 className="font-bold text-slate-800 text-sm">{g.name}</h4>
                                        <span className="text-[10px] bg-blue-50 text-blue-600 px-1.5 py-0.5 rounded border border-blue-100 font-medium">
                                            {g.region_detail}
                                        </span>
                                    </div>
                                    <ChevronRight size={14} className="text-slate-300 group-hover:text-blue-500 transition-colors" />
                                </div>

                                {/* Card Body: 3 Pillars */}
                                <div className="p-4 space-y-2.5">
                                    <div className="flex items-start gap-2">
                                        <Building2 size={12} className="text-slate-400 mt-0.5 shrink-0" />
                                        <p className="text-[11px] text-slate-600 line-clamp-1"><span className="text-slate-400">营商：</span>{g.env}</p>
                                    </div>
                                    <div className="flex items-start gap-2">
                                        <Landmark size={12} className="text-slate-400 mt-0.5 shrink-0" />
                                        <p className="text-[11px] text-slate-600 line-clamp-1"><span className="text-slate-400">政策：</span>{g.policy}</p>
                                    </div>
                                    <div className="flex items-start gap-2">
                                        <Gavel size={12} className="text-slate-400 mt-0.5 shrink-0" />
                                        <p className="text-[11px] text-slate-600 line-clamp-1"><span className="text-slate-400">法律：</span>{g.legal}</p>
                                    </div>
                                </div>

                                {/* Card Footer: Tags */}
                                <div className="px-4 pb-3 flex flex-wrap gap-1.5">
                                    {g.tags.slice(0, 3).map(t => (
                                        <span key={t} className="text-[9px] bg-slate-50 text-slate-500 px-1.5 py-0.5 rounded border border-slate-100">{t}</span>
                                    ))}
                                </div>
                            </div>
                        ))}
                        {filteredGuides.length === 0 && <div className="text-center py-6 text-xs text-slate-400">该区域数据正在更新中</div>}
                    </div>
                </div>
            )}

            {/* --- Content: Risk Analysis (New Structure) --- */}
            {activeTab === 'risk' && (
                <div className="space-y-4">
                     {/* Risk Calculator Entry Banner */}
                     {!selectedRiskCountryName && (
                        <button 
                            onClick={() => setIsCalcOpen(true)}
                            className="w-full bg-gradient-to-r from-orange-500 to-red-500 rounded-2xl p-4 shadow-lg shadow-orange-500/20 text-left relative overflow-hidden group active:scale-[0.98] transition-all"
                        >
                            <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full blur-xl -mr-8 -mt-8 pointer-events-none"></div>
                            <div className="flex justify-between items-center relative z-10">
                                <div>
                                    <h3 className="text-lg font-bold text-white mb-1 flex items-center gap-2">
                                        <Calculator size={20} /> 出海风险自测
                                    </h3>
                                    <p className="text-xs text-white/90">输入国家与行业，一键获取智能风险评估报告</p>
                                </div>
                                <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center backdrop-blur-sm group-hover:bg-white/30 transition-colors">
                                    <ChevronRight size={18} className="text-white" />
                                </div>
                            </div>
                        </button>
                    )}

                    {/* If a country is selected, show its risk news list (Level 2) */}
                    {selectedRiskCountryName ? (
                        <div className="animate-in slide-in-from-right duration-300">
                            <div className="flex items-center gap-2 mb-4">
                                <button 
                                    onClick={() => setSelectedRiskCountryName(null)}
                                    className="p-1.5 bg-white rounded-full border border-slate-200 text-slate-500 shadow-sm"
                                >
                                    <ArrowLeft size={16} />
                                </button>
                                <h3 className="font-bold text-slate-800 text-lg">{selectedRiskCountryName}风险预警</h3>
                            </div>

                            <div className="space-y-3">
                                {getRiskNewsByCountry(selectedRiskCountryName).map(item => (
                                    <button 
                                        key={item.id} 
                                        onClick={() => setSelectedRiskNews(item)}
                                        className="w-full text-left bg-white p-4 rounded-xl shadow-sm border border-slate-100 active:scale-[0.99] transition-transform hover:shadow-md"
                                    >
                                        <h4 className="font-bold text-sm text-slate-800 mb-3 leading-snug">{item.title}</h4>
                                        
                                        <div className="flex flex-wrap items-center gap-2 mb-3">
                                            <RiskLevelBadge level={item.riskLevel} />
                                            <span className="text-[10px] px-2 py-0.5 rounded bg-slate-50 text-slate-600 border border-slate-100 font-medium flex items-center gap-1">
                                                <Tag size={10} className="text-slate-400"/> {item.riskCategory}
                                            </span>
                                            <span className="text-[10px] text-slate-400 border-l border-slate-200 pl-2">
                                                {item.newsCategory}
                                            </span>
                                        </div>

                                        <div className="flex justify-between items-center pt-2 border-t border-slate-50">
                                            <div className="flex items-center gap-1.5 text-[10px] text-slate-400">
                                                <Clock size={12} />
                                                <span>{item.date}</span>
                                            </div>
                                            <div className="flex items-center gap-0.5 text-[11px] text-blue-500 font-medium">
                                                查看详情 <ChevronRight size={12} />
                                            </div>
                                        </div>
                                    </button>
                                ))}
                            </div>
                        </div>
                    ) : (
                        // If no country is selected, show Continent Stats (Level 1)
                        <>
                            <div className="bg-orange-50 border border-orange-100 rounded-2xl p-4 flex items-start gap-3">
                                <Siren className="text-orange-500 shrink-0 mt-0.5" size={18} />
                                <div>
                                    <h4 className="text-xs font-bold text-orange-800 mb-1">风险提示说明</h4>
                                    <p className="text-[10px] text-orange-700/80 leading-relaxed">
                                        以下预警信息摘录自《国别贸易指南》及全球风险情报网络，按区域为您统计最新风险事件。
                                    </p>
                                </div>
                            </div>

                            {/* Continent Tabs for Risk */}
                            <ContinentSelector current={riskContinent} onChange={setRiskContinent} />
                            
                            {/* Country List with Risk Stats */}
                            <div className="grid grid-cols-1 gap-3">
                                {getRiskCountriesByContinent(riskContinent).map((c, idx) => (
                                    <button 
                                        key={c.name}
                                        onClick={() => setSelectedRiskCountryName(c.name)}
                                        className="bg-white p-4 rounded-xl shadow-sm border border-slate-100 flex items-center justify-between active:scale-[0.98] transition-all hover:border-orange-200"
                                    >
                                        <div className="flex items-center gap-3">
                                            <div className="w-10 h-10 rounded-full bg-slate-50 border border-slate-100 flex items-center justify-center font-bold text-xs text-slate-400">
                                                {c.name.slice(0, 1)}
                                            </div>
                                            <div className="text-left">
                                                <h4 className="font-bold text-slate-800 text-sm">{c.name}</h4>
                                                <p className="text-[10px] text-slate-400 mt-0.5">最新更新：{c.stats.latest.split(' ')[0]}</p>
                                            </div>
                                        </div>

                                        <div className="flex items-center gap-3">
                                            <div className="flex flex-col items-end gap-1">
                                                {c.stats.high > 0 && (
                                                    <span className="text-[10px] bg-red-50 text-red-600 px-1.5 py-0.5 rounded font-bold border border-red-100">
                                                        {c.stats.high}条 高风险
                                                    </span>
                                                )}
                                                {c.stats.high === 0 && (
                                                    <span className="text-[10px] bg-slate-50 text-slate-500 px-1.5 py-0.5 rounded font-bold border border-slate-100">
                                                        {c.stats.medium + c.stats.low}条 风险提示
                                                    </span>
                                                )}
                                            </div>
                                            <ChevronRight size={16} className="text-slate-300" />
                                        </div>
                                    </button>
                                ))}
                                {getRiskCountriesByContinent(riskContinent).length === 0 && (
                                    <div className="text-center py-8 text-slate-400 text-xs">
                                        <BarChart3 size={24} className="mx-auto mb-2 opacity-50" />
                                        该区域暂无风险预警数据
                                    </div>
                                )}
                            </div>
                        </>
                    )}
                </div>
            )}

            {/* --- Content: Policy --- */}
            {activeTab === 'policy' && (
                <div className="bg-white rounded-3xl p-6 shadow-sm border border-slate-100 pb-8">
                     <div className="text-center mb-6">
                        <div className="w-12 h-12 bg-emerald-50 rounded-2xl flex items-center justify-center text-emerald-600 mx-auto mb-3">
                            <ShieldCheck size={24} />
                        </div>
                        <h3 className="font-bold text-slate-800">出口信用保险·小微专区</h3>
                        <p className="text-xs text-slate-400 mt-1">国家政策性金融工具，护航企业出海</p>
                     </div>

                     <div className="space-y-4">
                        {/* 1. Who */}
                        <div className="bg-slate-50 rounded-xl p-4">
                            <h4 className="text-xs font-bold text-slate-700 mb-2.5 flex items-center gap-2">
                                <UserCheck size={14} className="text-emerald-500" /> 
                                谁可以领？
                            </h4>
                            <ul className="text-[11px] text-slate-600 space-y-2 leading-relaxed">
                                <li className="flex items-start gap-1.5">
                                    <span className="w-1 h-1 rounded-full bg-slate-300 mt-1.5 shrink-0"></span>
                                    <span><span className="font-bold text-slate-700">适用对象：</span>北京市小微出口企业（上年度海关统计出口额0-500万美元，含500万美元）</span>
                                </li>
                                <li className="flex items-start gap-1.5">
                                    <span className="w-1 h-1 rounded-full bg-slate-300 mt-1.5 shrink-0"></span>
                                    <span><span className="font-bold text-slate-700">除外说明：</span>承保业务不含对古巴、伊朗、苏丹等24个国家（地区）的出口业务</span>
                                </li>
                            </ul>
                        </div>

                        {/* 2. What */}
                        <div className="bg-slate-50 rounded-xl p-4">
                             <h4 className="text-xs font-bold text-slate-700 mb-2.5 flex items-center gap-2">
                                <FileText size={14} className="text-emerald-500" /> 
                                保障什么？
                            </h4>
                            <ul className="text-[11px] text-slate-600 space-y-2 leading-relaxed">
                                <li className="flex items-start gap-1.5">
                                    <span className="w-1 h-1 rounded-full bg-slate-300 mt-1.5 shrink-0"></span>
                                    <span><span className="font-bold text-slate-700">保障额度：</span>每家企业年保障额度12万美元，最高赔偿比例80%</span>
                                </li>
                                <li className="flex items-start gap-1.5">
                                    <span className="w-1 h-1 rounded-full bg-slate-300 mt-1.5 shrink-0"></span>
                                    <span><span className="font-bold text-slate-700">保障范围：</span>海外买方拖欠货款、破产倒闭、拒收货物等商业风险；买方所在国家（地区）政治风险导致的收汇损失</span>
                                </li>
                                <li className="flex items-start gap-1.5">
                                    <span className="w-1 h-1 rounded-full bg-slate-300 mt-1.5 shrink-0"></span>
                                    <span><span className="font-bold text-slate-700">保险期限：</span>保单签发日（不早于当年1月1日）至当年12月31日</span>
                                </li>
                                <li className="flex items-start gap-1.5">
                                    <span className="w-1 h-1 rounded-full bg-slate-300 mt-1.5 shrink-0"></span>
                                    <span><span className="font-bold text-slate-700">适保支付方式：</span>付款交单(D/P)、承兑交单(D/A)、赊账(O/A)、信用证(L/C)</span>
                                </li>
                                <li className="flex items-start gap-1.5 text-slate-400 mt-1">
                                    <AlertCircle size={10} className="mt-0.5 shrink-0" />
                                    <span>最终依据：具体保险责任以正式出具的保单为准</span>
                                </li>
                            </ul>
                        </div>

                        {/* 3. How */}
                        <div className="bg-slate-50 rounded-xl p-4">
                            <h4 className="text-xs font-bold text-slate-700 mb-2.5 flex items-center gap-2">
                                <MousePointerClick size={14} className="text-emerald-500" /> 
                                如何办理？
                            </h4>
                            <div className="space-y-3">
                                <p className="text-[11px] text-slate-600 leading-relaxed">
                                    <span className="font-bold text-slate-700">申领渠道：</span>通过“中国国际贸易单一窗口”线上办理
                                </p>
                                <p className="text-[11px] text-slate-600 leading-relaxed">
                                    <span className="font-bold text-slate-700">核心步骤：</span>网上回签确认即可获得保单
                                </p>
                                <button className="w-full py-2.5 bg-white border border-emerald-500 text-emerald-600 rounded-lg text-xs font-bold active:scale-95 transition-transform flex items-center justify-center gap-1.5 shadow-sm">
                                    <ExternalLink size={12} />
                                    点击“单一窗口在线投保”
                                </button>
                            </div>
                        </div>

                        {/* 4. Contact */}
                        <div className="bg-slate-50 rounded-xl p-4">
                            <h4 className="text-xs font-bold text-slate-700 mb-3 flex items-center gap-2">
                                <Phone size={14} className="text-emerald-500" /> 
                                联系方式
                            </h4>
                            <div className="flex flex-col gap-3">
                                <div className="text-[11px] text-slate-600 space-y-1.5">
                                    <p className="flex justify-between"><span>小微保单专员：张连升</span> <span className="font-mono font-medium">17600911936</span></p>
                                    <p className="flex justify-between"><span>小微保单专员：王营</span> <span className="font-mono font-medium">15110006434</span></p>
                                    <p className="text-[10px] text-slate-400 pt-1">(手机号同微信号)</p>
                                </div>
                                <div className="border-t border-slate-200 pt-3 flex items-center gap-3">
                                    <div className="w-16 h-16 bg-white border border-slate-200 rounded-lg flex items-center justify-center shrink-0">
                                        <QrCode size={28} className="text-slate-300" />
                                    </div>
                                    <div className="text-[10px] text-slate-500">
                                        <p className="font-bold text-slate-700 mb-0.5">便捷对接</p>
                                        <p>扫描二维码添加专属客户经理企业微信</p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Footer Source */}
                        <div className="text-center pt-2">
                             <p className="text-[9px] text-slate-400">文件来源：北京市小微出口企业出口信用保险保单申领指南</p>
                        </div>

                     </div>
                </div>
            )}

            {/* --- Content: News (New Card Style) --- */}
            {activeTab === 'news' && (
                <div className="space-y-4">
                    <div className="bg-indigo-50 border border-indigo-100 rounded-2xl p-4 flex items-start gap-3">
                        <Newspaper className="text-indigo-500 shrink-0 mt-0.5" size={18} />
                        <div>
                            <h4 className="text-xs font-bold text-indigo-800 mb-1">外贸风险动态</h4>
                            <p className="text-[10px] text-indigo-700/80 leading-relaxed">
                                实时聚合全球宏观经济、贸易政策及行业动态，助您把握市场机遇，规避潜在风险。
                            </p>
                        </div>
                    </div>

                    <div className="space-y-3">
                        {NEWS.map(item => (
                            <button 
                                key={item.id} 
                                onClick={() => setSelectedNews(item)}
                                className="w-full text-left bg-white p-4 rounded-xl shadow-sm border border-slate-100 active:scale-[0.99] transition-transform hover:shadow-md"
                            >
                                <h4 className="font-bold text-sm text-slate-800 mb-3 leading-snug">{item.title}</h4>
                                
                                <div className="flex flex-wrap items-center gap-2 mb-3">
                                    <SentimentBadge type={item.type} />
                                    <span className="text-[10px] px-2 py-0.5 rounded bg-slate-50 text-slate-600 border border-slate-100 font-medium flex items-center gap-1">
                                        <Tag size={10} className="text-slate-400"/> {item.tag}
                                    </span>
                                </div>

                                <div className="flex justify-between items-center pt-2 border-t border-slate-50">
                                    <div className="flex items-center gap-1.5 text-[10px] text-slate-400">
                                        <Clock size={12} />
                                        <span>{item.date}</span>
                                        <span className="ml-1 text-slate-300">|</span>
                                        <span className="ml-1">{item.source}</span>
                                    </div>
                                    <div className="flex items-center gap-0.5 text-[11px] text-blue-500 font-medium">
                                        查看详情 <ChevronRight size={12} />
                                    </div>
                                </div>
                            </button>
                        ))}
                    </div>
                </div>
            )}

        </div>

        {/* 4. Bottom Service Line */}
        <div className="text-center pt-8 pb-4">
             <div className="inline-flex items-center gap-2 text-slate-400/60">
                 <Phone size={10} />
                 <span className="text-[9px]">中信保服务热线：95335</span>
             </div>
        </div>

      </div>

    </div>
  );
};