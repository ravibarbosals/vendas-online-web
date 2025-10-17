import App from './App';
import './main.css';

import React from 'react';
import ReactDOM from 'react-dom/client';
import { GlobalProvider } from './shared/hooks/useGlobalContext';
import { DataProvider } from './shared/hooks/useDataContext';


ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
    <GlobalProvider>
      <DataProvider>
        <App />
      </DataProvider>
    </GlobalProvider>,
);
