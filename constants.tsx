import { 
  Flag, 
  ScrollText, 
  Calculator, 
  Users, 
  MessageSquareQuote, 
  Coins, 
  Scale, 
  Globe, 
  Briefcase, 
  Coffee 
} from 'lucide-react';
import { MenuItem } from './types';

// Palette: Tech Blue, Cyan, Indigo, Slate
// Exception: Party (Red)

export const GRID_MENU_ITEMS: MenuItem[] = [
  {
    id: 'party',
    title: '党建园地',
    icon: Flag,
    color: 'text-rose-600',
    bgColor: 'bg-rose-50'
  },
  {
    id: 'policy',
    title: '政策速递',
    icon: ScrollText,
    color: 'text-blue-600',
    bgColor: 'bg-blue-50'
  },
  {
    id: 'calc',
    title: '政策计算器',
    icon: Calculator,
    color: 'text-cyan-600',
    bgColor: 'bg-cyan-50'
  },
  {
    id: 'finance',
    title: '金融服务',
    icon: Coins,
    color: 'text-indigo-600',
    bgColor: 'bg-indigo-50'
  },
  {
    id: 'activity',
    title: '会员活动',
    icon: Users,
    color: 'text-sky-600',
    bgColor: 'bg-sky-50'
  },
  {
    id: 'suggest',
    title: '建言献策',
    icon: MessageSquareQuote,
    color: 'text-slate-600',
    bgColor: 'bg-slate-100'
  },
  {
    id: 'law',
    title: '法律服务',
    icon: Scale,
    color: 'text-blue-500',
    bgColor: 'bg-blue-50'
  },
  {
    id: 'overseas',
    title: '一带一路',
    icon: Globe,
    color: 'text-teal-600',
    bgColor: 'bg-teal-50'
  },
  {
    id: 'guide',
    title: '办事指南',
    icon: Briefcase,
    color: 'text-indigo-500',
    bgColor: 'bg-indigo-50'
  },
  {
    id: 'life',
    title: '西城生活',
    icon: Coffee,
    color: 'text-orange-500', // A warm touch for lifestyle
    bgColor: 'bg-orange-50'
  }
];

export const INITIAL_GREETING = "您好，我是您的智能助手。已为您同步最新西城区惠企数据，请问需要查询什么？";