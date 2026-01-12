import React from 'react';

export type StatusColor = 'green' | 'amber' | 'red' | 'blue';

export interface Alert {
  id: string;
  type: 'critical' | 'important' | 'info';
  title: string;
  description: string;
  timestamp: string;
  actionLabel?: string;
}

export interface Metric {
  label: string;
  value: string | number;
  target?: string | number;
  unit?: string;
  trend?: 'up' | 'down' | 'flat';
  trendValue?: string;
  status: StatusColor;
}

export interface Client {
  id: string;
  name: string;
  healthScore: number;
  mrr: number;
  serviceType: string;
  lastContactDays: number;
  trend: 'up' | 'down' | 'flat';
}

export interface ViewProps {
  onNavigate: (viewId: string) => void;
}

export interface NavItem {
  id: string;
  label: string;
  icon: React.ComponentType<any>;
}