import './main.css';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';

import { loginRoutes } from './modules/login/routes';
import { useNotification } from './shared/hooks/useNotification';
import { firstScreenRoutes } from './modules/firstScreen/routes';
import { productScreen } from './modules/product/routes';


const router = createBrowserRouter ([ 
  ...firstScreenRoutes, 
  ...loginRoutes, 
  ...productScreen]);

function App() {
  const { contextHolder } = useNotification();
  return (
    <>
      {contextHolder}
        <RouterProvider router={router} />
    </>
  );
}

export default App;
