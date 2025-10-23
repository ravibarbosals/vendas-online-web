import { createBrowserRouter, RouteObject, RouterProvider } from 'react-router-dom';

import { firstScreenRoutes } from './modules/firstScreen/routes';
import { loginRoutes } from './modules/login/routes';
import { productScreen } from './modules/product/routes';
import { getAuthorizationToken, verifyLoggedIn } from './shared/functions/connection/auth';
import { useNotification } from './shared/hooks/useNotification';
import { useRequests } from './shared/hooks/useRequest';
import { URL_USER } from './shared/constants/urls';
import { MethodsEnum } from './shared/enums/methods.enum';
import { useEffect } from 'react';
import { categoryScreens } from './modules/category/routes';
import { useGlobalReducer } from './store/reducers/globalReducer/useGlobalReducer';


  const routes: RouteObject[] = [...loginRoutes];
  const routesLoggedIn: RouteObject[] = [
    ...productScreen, 
    ...categoryScreens , 
    ...firstScreenRoutes,
  ].map((route) => ({
      ...route,
      loader: verifyLoggedIn,
    }));

  const router = createBrowserRouter ([...routes, ...routesLoggedIn]);



function App() {
  const { contextHolder } = useNotification();
  const { setUser } = useGlobalReducer();
  const { request } = useRequests();

  useEffect(() => {
    const token = getAuthorizationToken();
    if(token) {
    request(URL_USER, MethodsEnum.GET, setUser);
    }
  }, []);

  return (
    <>
      {contextHolder}
        <RouterProvider router={router} />
    </>
  );
}

export default App;
