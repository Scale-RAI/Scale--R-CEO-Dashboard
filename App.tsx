import React, { useState } from 'react';
import { Layout } from './components/Layout';
import { DailyView } from './views/DailyView';
import { CompanyHealthView } from './views/CompanyHealthView';
import { ClientsView } from './views/ClientsView';
import { RevenueView } from './views/RevenueView';
import { PipelineView } from './views/PipelineView';
import { SystemsView } from './views/SystemsView';
import { TeamView } from './views/TeamView';
import { StrategyView } from './views/StrategyView';
import { MissionView } from './views/MissionView';
import { AlertsView } from './views/AlertsView';

const App: React.FC = () => {
  // Simple state-based routing
  const [currentView, setCurrentView] = useState('home');

  const renderView = () => {
    switch (currentView) {
      case 'home':
        return <DailyView onNavigate={setCurrentView} />;
      case 'health':
        return <CompanyHealthView onNavigate={setCurrentView} />;
      case 'revenue':
        return <RevenueView onNavigate={setCurrentView} />;
      case 'clients':
        return <ClientsView onNavigate={setCurrentView} />;
      case 'pipeline':
        return <PipelineView onNavigate={setCurrentView} />;
      case 'systems':
        return <SystemsView onNavigate={setCurrentView} />;
      case 'team':
        return <TeamView onNavigate={setCurrentView} />;
      case 'strategy':
        return <StrategyView onNavigate={setCurrentView} />;
      case 'mission':
        return <MissionView onNavigate={setCurrentView} />;
      case 'alerts':
        return <AlertsView onNavigate={setCurrentView} />;
      default:
        return <DailyView onNavigate={setCurrentView} />;
    }
  };

  const getTitle = () => {
    switch(currentView) {
        case 'home': return 'Daily CEO View';
        case 'health': return 'Company Health Snapshot';
        case 'revenue': return 'Revenue & Growth Breakdown';
        case 'clients': return 'Client Success & Health';
        case 'pipeline': return 'Pipeline & Sales Velocity';
        case 'systems': return 'Systems & Automation';
        case 'team': return 'Team Capacity & Operations';
        case 'strategy': return 'Strategic Metrics';
        case 'mission': return 'Mission Metrics';
        case 'alerts': return 'Alerts & Decisions';
        default: return 'Dashboard';
    }
  }

  return (
    <Layout currentView={currentView} onNavigate={setCurrentView} title={getTitle()}>
      {renderView()}
    </Layout>
  );
};

export default App;