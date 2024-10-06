import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { AppProvider } from './context';
import { QueryClient, QueryClientProvider } from 'react-query';

const root = ReactDOM.createRoot(document.getElementById('root'));
const queryClient = new QueryClient();
root.render(
  <AppProvider>
    <QueryClientProvider client={queryClient}>
      <App/>
    </QueryClientProvider>
  </AppProvider>
);
