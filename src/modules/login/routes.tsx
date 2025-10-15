import { createBrowserRouter} from "react-router-dom";

import LoginScreen from "./screens/LoginScreen";

export const loginRoutes = createBrowserRouter([
  {
    path: '/login',
    element: <LoginScreen />,
  },
  ]);