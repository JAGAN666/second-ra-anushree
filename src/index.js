import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import AppEnhanced from './AppEnhanced';

// Check which port we're running on
const port = window.location.port;

// Choose the appropriate app based on port
// In production (no port), default to AppEnhanced (SinglePagePamphlet)
const AppToRender = (port === '3002' || !port) ? AppEnhanced : App;

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <AppToRender />
  </React.StrictMode>
);