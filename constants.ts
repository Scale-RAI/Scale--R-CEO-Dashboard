import { Alert, Client, Metric } from './types';

export const CURRENT_DATE = "January 14, 2026";

export const ALERTS: Alert[] = [
  {
    id: '1',
    type: 'critical',
    title: 'Payment Failed: TechFlow Systems',
    description: 'Auto-charge failed for $1,200 retainer. Immediate follow-up needed.',
    timestamp: '2 hours ago',
    actionLabel: 'Retry Payment'
  },
  {
    id: '2',
    type: 'important',
    title: 'Contract Renewal: Bash Projects',
    description: 'Renewal due in 14 days. Proposal pending approval.',
    timestamp: '5 hours ago',
    actionLabel: 'Review Proposal'
  },
  {
    id: '3',
    type: 'info',
    title: 'New Lead: Logistics Co.',
    description: 'Requested demo for Freedom FX Bot.',
    timestamp: 'Yesterday',
    actionLabel: 'Assign to Sales'
  }
];

export const CLIENTS: Client[] = [
  { id: '1', name: 'Bash Projects', healthScore: 92, mrr: 1500, serviceType: 'Custom Automation', lastContactDays: 2, trend: 'up' },
  { id: '2', name: 'Nana Kojo Inc', healthScore: 78, mrr: 800, serviceType: 'Infrastructure', lastContactDays: 5, trend: 'flat' },
  { id: '3', name: 'Mr. Anagbo', healthScore: 45, mrr: 2500, serviceType: 'Consulting', lastContactDays: 12, trend: 'down' },
  { id: '4', name: 'Lilii Beta Users', healthScore: 88, mrr: 300, serviceType: 'AI Products', lastContactDays: 1, trend: 'up' },
  { id: '5', name: 'Global Logistics', healthScore: 65, mrr: 1200, serviceType: 'Retainer', lastContactDays: 8, trend: 'down' },
];

export const DAILY_METRICS = {
  mrr: { current: 2450, target: 3000 },
  runway: { months: 5.5, status: 'green' as const },
  activeClients: { count: 12, trend: 'up' as const },
  capacity: { used: 78, status: 'amber' as const }
};

export const AI_INSIGHT = {
  title: "Optimization Opportunity",
  description: "Team capacity is trending high (78%) due to manual onboarding tasks. Automating the 'Client Setup' workflow could recover ~12 hours/week.",
  action: "Deploy Setup Bot"
};

export const REVENUE_DATA = [
  { month: 'Aug', mrr: 1800, oneTime: 500 },
  { month: 'Sep', mrr: 1950, oneTime: 200 },
  { month: 'Oct', mrr: 2100, oneTime: 1200 },
  { month: 'Nov', mrr: 2250, oneTime: 300 },
  { month: 'Dec', mrr: 2400, oneTime: 800 },
  { month: 'Jan', mrr: 2450, oneTime: 400 },
];

export const VALUES_SCORECARD = [
  { name: 'Diligence', score: 9.2, target: 9.0, metric: 'CSAT' },
  { name: 'Timeliness', score: 88, target: 95, unit: '%', metric: 'On-time Delivery' },
  { name: 'Integrity', score: 1.5, target: 2.0, unit: 'hrs', metric: 'Response Time' },
  { name: 'Excellence', score: 0, target: 0, metric: 'Rework Incidents' },
  { name: 'Passion', score: 72, target: 60, metric: 'NPS' },
  { name: 'Brotherliness', score: 95, target: 90, unit: '%', metric: 'Retention' },
];

// --- NEW DATA FOR REMAINING VIEWS ---

export const REVENUE_BREAKDOWN = [
  { month: 'Aug', ai: 200, auto: 1000, retainer: 600, consult: 0 },
  { month: 'Sep', ai: 250, auto: 1000, retainer: 700, consult: 0 },
  { month: 'Oct', ai: 300, auto: 1200, retainer: 600, consult: 0 },
  { month: 'Nov', ai: 450, auto: 1100, retainer: 700, consult: 0 },
  { month: 'Dec', ai: 600, auto: 1100, retainer: 700, consult: 0 },
  { month: 'Jan', ai: 750, auto: 1000, retainer: 700, consult: 0 },
];

export const SERVICE_PERFORMANCE = [
  { name: 'AI Agent Products', mrr: 750, clients: 15, avgDeal: 50, growth: 25 },
  { name: 'Custom Automation', mrr: 1000, clients: 2, avgDeal: 500, growth: 5 },
  { name: 'Retainer Services', mrr: 700, clients: 3, avgDeal: 233, growth: 0 },
  { name: 'Consulting', mrr: 0, clients: 0, avgDeal: 0, growth: 0 },
];

export const PIPELINE_FUNNEL = [
  { stage: 'Discovery', count: 12, value: 15000, color: '#3B82F6' },
  { stage: 'Proposals', count: 5, value: 8500, color: '#8B5CF6' },
  { stage: 'Negotiation', count: 3, value: 4200, color: '#F59E0B' },
  { stage: 'Closed Won', count: 2, value: 3000, color: '#10B981' },
];

export const DEALS = [
  { id: 1, client: 'Logistics Co', value: 2500, stage: 'Discovery', probability: 20, days: 5 },
  { id: 2, client: 'Retail Brand X', value: 1200, stage: 'Proposals', probability: 60, days: 12 },
  { id: 3, client: 'Law Firm Y', value: 3000, stage: 'Negotiation', probability: 80, days: 25 },
];

export const SYSTEM_STATS = {
  activeAutomations: 42,
  uptime: 99.9,
  hoursSavedMonth: 128,
  hoursSavedYear: 450,
  valueGenerated: 22500 // 450 * $50/hr
};

export const AUTOMATION_TYPES = [
  { name: 'Customer Service', value: 35, color: '#8B5CF6' },
  { name: 'Social Media', value: 25, color: '#3B82F6' },
  { name: 'Lead Gen', value: 20, color: '#10B981' },
  { name: 'Custom', value: 20, color: '#F59E0B' },
];

export const TEAM_MEMBERS = [
  { name: 'Edem', role: 'CEO', hours: 45, maxHours: 50, status: 'healthy', projects: ['Strategy', 'Sales'] },
  { name: 'Sarah', role: 'Ops Lead', hours: 38, maxHours: 40, status: 'high', projects: ['Client Onboarding', 'Hiring'] },
  { name: 'Dev 1', role: 'Engineer', hours: 25, maxHours: 40, status: 'healthy', projects: ['Lilii V2', 'Bug Fixes'] },
];

export const STRATEGY_DATA = {
  ltv: 12000,
  cac: 850,
  ratio: '14:1',
  roadmap: [
    { q: 'Q1', goal: 3000, current: 2450, tasks: ['Launch Lilii', 'Deploy PMS'] },
    { q: 'Q2', goal: 6000, current: 0, tasks: ['Hire Sales', 'Mktg Campaign'] }
  ]
};

export const CLIENT_PROFITABILITY = [
  { revenue: 1500, margin: 40, name: 'Bash', tier: 'A' },
  { revenue: 800, margin: 85, name: 'Nana Kojo', tier: 'A' },
  { revenue: 2500, margin: 25, name: 'Mr Anagbo', tier: 'C' },
  { revenue: 300, margin: 90, name: 'Lilii', tier: 'B' },
];

export const MISSION_STATS = {
  totalHoursSaved: 1240,
  monthHoursSaved: 185,
  leverageRatio: '12:1',
  revenuePerHour: 215
};