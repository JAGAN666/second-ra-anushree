import React, { useState } from 'react';
import styled from 'styled-components';
import SimpleNewsletter from './components/SimpleNewsletter';
import CHCWorkforceNewsletter from './components/CHCWorkforceNewsletter';
import ProviderPanelNewsletter from './components/ProviderPanelNewsletter';
import './App.css';

const AppSelector = styled.div`
  position: fixed;
  top: 20px;
  right: 20px;
  z-index: 1000;
  background: white;
  border-radius: 15px;
  padding: 15px;
  box-shadow: 0 5px 20px rgba(0,0,0,0.2);
`;

const SelectorButton = styled.button`
  background: ${props => props.active ? 'linear-gradient(135deg, #1e3a8a, #3730a3)' : 'white'};
  color: ${props => props.active ? 'white' : '#64748b'};
  border: 2px solid ${props => props.active ? '#1e3a8a' : '#e5e7eb'};
  padding: 8px 16px;
  border-radius: 8px;
  font-size: 0.85rem;
  font-weight: 600;
  cursor: pointer;
  margin: 2px;
  transition: all 0.3s ease;

  &:hover {
    background: ${props => props.active ? 'linear-gradient(135deg, #1e3a8a, #3730a3)' : 'rgba(30, 58, 138, 0.1)'};
    border-color: #1e3a8a;
  }
`;


function App() {
  const [selectedApp, setSelectedApp] = useState('simple-newsletter');

  const renderSelectedApp = () => {
    switch (selectedApp) {
      case 'simple-newsletter':
        return <SimpleNewsletter />;
      case 'chc-newsletter':
        return <CHCWorkforceNewsletter />;
      case 'panel-newsletter':
        return <ProviderPanelNewsletter />;
      default:
        return <SimpleNewsletter />;
    }
  };

  return (
    <div>
      <AppSelector>
        <div style={{ marginBottom: '10px', fontSize: '0.9rem', fontWeight: '600', color: '#374151' }}>
          Research Papers
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '5px' }}>
          <SelectorButton 
            active={selectedApp === 'simple-newsletter'}
            onClick={() => setSelectedApp('simple-newsletter')}
          >
            Paper 1: Medicaid Provider Participation
          </SelectorButton>
          <SelectorButton 
            active={selectedApp === 'chc-newsletter'}
            onClick={() => setSelectedApp('chc-newsletter')}
          >
            Paper 2: CHC Workforce Growth
          </SelectorButton>
          <SelectorButton 
            active={selectedApp === 'panel-newsletter'}
            onClick={() => setSelectedApp('panel-newsletter')}
          >
            Paper 3: Panel Equity Study
          </SelectorButton>
        </div>
      </AppSelector>
      
      {renderSelectedApp()}
    </div>
  );
}

export default App;