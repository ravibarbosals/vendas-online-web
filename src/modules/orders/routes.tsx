import { type RouteObject } from 'react-router-dom';

import Order from './screens/Order';

export enum OrdersRoutesEnum {
  ORDER = '/order',
}

export const orderScreens: RouteObject[] = [
  {
    path: OrdersRoutesEnum.ORDER,
    element: <Order />,
  },
];
