import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import AppEnhanced from './AppEnhanced';

// Check which port we're running on
const port = window.location.port;

// Choose the appropriate app based on port
const AppToRender = port === '3002' ? AppEnhanced : App;

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <AppToRender />
  </React.StrictMode>
);