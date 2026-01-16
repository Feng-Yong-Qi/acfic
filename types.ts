import { LucideIcon } from 'lucide-react';

export enum Sender {
  USER = 'user',
  BOT = 'bot'
}

export interface Message {
  id: string;
  text: string;
  sender: Sender;
  timestamp: Date;
  isStreaming?: boolean;
}

export interface MenuItem {
  id: string;
  title: string;
  icon: LucideIcon;
  color: string;
  bgColor: string;
  action?: () => void;
}

export interface FloatingAction {
  label: string;
  icon: LucideIcon;
  onClick: () => void;
}

export type ViewType = 
  | 'home'
  | 'notifications'
  | 'party'
  | 'policy'
  | 'calc'
  | 'activity'
  | 'suggest'
  | 'finance'
  | 'law'
  | 'overseas'
  | 'guide';

export interface PolicyItem {
  id: string;
  title: string;
  tag: string;
  unit: string;
  date: string;
  status: 'declarable' | 'expired' | 'empty';
}

export interface ActivityItem {
  id: string;
  title: string;
  content: string;
  tag: string;
  time: string;
  target: string;
  status: 'ongoing' | 'ended';
  subStatus?: 'unprocessed' | 'read' | 'registered';
}

export interface SuggestionHistory {
  id: string;
  topic: string;
  date: string;
  status: string;
}

export interface NotificationItem {
  id: string;
  title: string;
  content: string;
  time: string;
  read: boolean;
  type: 'system' | 'activity' | 'policy';
}