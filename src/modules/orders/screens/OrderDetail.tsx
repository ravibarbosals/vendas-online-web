import type { DescriptionsProps } from 'antd';
import { Descriptions, Divider } from 'antd';
import React from 'react';
import { useParams } from 'react-router-dom';

import Screen from '../../../shared/components/screen/Screen';
import { useOrderDetail } from '../hooks/useOrderDetail';
import { OrderRoutesEnum } from '../routes';

const items: DescriptionsProps['items'] = [
  {
    key: '1',
    label: 'Nome',
    children: 'Ravi',
  },
  {
    key: '2',
    label: 'Email',
    children: 'Prepeaid',
    span: 2,
  },
  {
    key: '3',
    label: 'Telefone',
    children: 'YES',
  },
  {
    key: '4',
    label: 'CPF',
    children: '2018-04-24 18:00:00',
    span: 2,
  },
];

const items2: DescriptionsProps['items'] = [
  {
    key: '1',
    label: 'Nome',
    children: 'Ravi',
  },
  {
    key: '2',
    label: 'Email',
    children: 'Prepeaid',
    span: 2,
  },
  {
    key: '3',
    label: 'Telefone',
    children: 'YES',
  },
  {
    key: '4',
    label: 'CPF',
    children: '2018-04-24 18:00:00',
    span: 2,
  },
  {
    key: '5',
    label: 'Usage Time',
    children: '2019-04-24 18:00:00',
    span: 2,
  },
];

const items3: DescriptionsProps['items'] = [
  {
    key: '1',
    label: 'Nome',
    children: 'Ravi',
  },
  {
    key: '2',
    label: 'Email',
    children: 'Prepeaid',
    span: 2,
  },
  {
    key: '3',
    label: 'Telefone',
    children: 'YES',
  },
  {
    key: '4',
    label: 'CPF',
    children: '2018-04-24 18:00:00',
    span: 2,
  },
  {
    key: '5',
    label: 'Usage Time',
    children: '2019-04-24 18:00:00',
    span: 2,
  },
];
const items4: DescriptionsProps['items'] = [
  {
    key: '1',
    label: 'Nome',
    children: 'Ravi',
  },
  {
    key: '2',
    label: 'Email',
    children: 'Prepeaid',
    span: 2,
  },
  {
    key: '3',
    label: 'Telefone',
    children: 'YES',
  },
  {
    key: '4',
    label: 'CPF',
    children: '2018-04-24 18:00:00',
    span: 2,
  },
  {
    key: '5',
    label: 'Usage Time',
    children: '2019-04-24 18:00:00',
    span: 2,
  },
];

const OrderDetail: React.FC = () => {
  const { orderId } = useParams<{ orderId: string }>();
  const { order } = useOrderDetail(orderId);

  console.log('orderId', order);

  return (
    <Screen
      listBreadcrumb={[
        {
          name: 'HOME',
        },
        {
          name: 'PEDIDOS',
          navigateTo: OrderRoutesEnum.ORDER,
        },
        {
          name: 'DETALHES',
        },
      ]}
    >
      <Descriptions title="Dados do Usuário" bordered items={items} />
      <Divider />
      <Descriptions title="Dados do pagamento" bordered items={items2} />
      <Divider />
      <Descriptions title="Dados do endereço" bordered items={items3} />
      <Divider />
      <Descriptions title="Produtos" bordered items={items4} />
    </Screen>
  );
};

export default OrderDetail;
