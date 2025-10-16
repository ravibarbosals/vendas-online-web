import { createBrowserRouter, RouteObject, RouterProvider, useNavigate } from 'react-router-dom';

import { loginRoutes } from './modules/login/routes';
import { useNotification } from './shared/hooks/useNotification';
import { firstScreenRoutes } from './modules/firstScreen/routes';
import { productScreen } from './modules/product/routes';
import { useGlobalContext } from './shared/hooks/useGlobalContext';
import { verifyLoggedIn } from './shared/functions/connection/auth';


function App() {
  const { contextHolder } = useNotification();
  const { user, setUser } = useGlobalContext();

  const routes: RouteObject[] = [...firstScreenRoutes, ...loginRoutes];
  const routesLoggedIn: RouteObject[] = [...productScreen].map((route) => ({
      ...route,
      loader: () => verifyLoggedIn(setUser, user),
    }));

  const router = createBrowserRouter ([...routes, ...routesLoggedIn]);

  return (
    <>
      {contextHolder}
        <RouterProvider router={router} />
    </>
  );
}

export default App;
