import React from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './App';
import { AuthProvider } from './components/Auth/AuthContext'; 
import { AuthProviderAdmin } from './components/Auth/AuthContextAdmin'; 
import './index.css';

const container = document.getElementById('root');
const root = createRoot(container);

root.render(
  <React.StrictMode>
    <BrowserRouter>
      <AuthProvider> 
        <AuthProviderAdmin> 
          <App />
        </AuthProviderAdmin>
      </AuthProvider>
    </BrowserRouter>
  </React.StrictMode>
);
