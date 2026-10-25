export interface ProgramItem {
  id: string;
  name: string;
  link?: string;
  status: 'completed' | 'pending';
  lastUpdated?: string;
  notes?: string;
}

export interface Indicator {
  id: string;
  domain: string;
  standard: string;
  indicator: string;
  progress: number; // Official accreditation progress percentage
  programs: ProgramItem[];
}

export type DomainKey = 'الإدارة المدرسية' | 'نواتج التعلم' | 'التعليم والتعلم';

export interface DomainMeta {
  name: DomainKey;
  code: string;
  color: string;
  bgLight: string;
  borderLight: string;
  accent: string;
  description: string;
}

export interface NotificationItem {
  id: string;
  title: string;
  message: string;
  timestamp: string;
  type: 'info' | 'success' | 'warning' | 'alert';
  read: boolean;
  link?: string;
}

export interface DashboardSettings {
  overall: number;
  domains: Record<string, number>;
}
