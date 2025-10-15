import './main.css';

import React from 'react';
import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider, type RouteObject } from 'react-router-dom';

import { loginRoutes } from './modules/login/routes';
import { GlobalProvider } from './shared/hooks/useGlobalContext';


const mainRoutes: RouteObject[]  = ([
  {
    path: '/',
    element: <div>Tela Principal</div>, 
    errorElement: <div>Página não encontrada</div>,
  },
]);

const router = createBrowserRouter ([ ...mainRoutes, ...loginRoutes]);

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <GlobalProvider>
    <RouterProvider router={router} />
    </GlobalProvider>
  </React.StrictMode>,
);
