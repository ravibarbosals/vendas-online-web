import { useEffect, useState } from "react";
import { ProductType } from "../../../shared/components/types/ProductType";
import { URL_PRODUCT } from "../../../shared/constants/urls";
import { MethodsEnum } from "../../../shared/enums/methods.enum";
import { useDataContext } from "../../../shared/hooks/useDataContext";
import { useRequests } from "../../../shared/hooks/useRequest";

import { Input } from 'antd';
import type { TableProps } from 'antd';
import Table from "../../../shared/components/table/Table";
import CategoryColumn from "../components/CategoryColumn";
import TooltipImage from "../components/TooltipImage";
import { convertNumberToMoney } from "../../../shared/functions/money";
import Screen from "../../../shared/components/screen/Screen";
import Button from "../../../shared/components/buttons/button/Button";
import { useNavigate } from "react-router-dom";
import { ProductRoutesEnum } from "../routes";
import { BoxButtons, LimiteSizeButton, LimiteSizeInput } from "../styles/product.style";

const { Search } = Input;

const columns: TableProps<ProductType>['columns'] = [
  {
    title: 'Id',
    dataIndex: 'id',
    key: 'id',
    render: (_, product) => <TooltipImage product={product} />,
  },
  {
    title: 'Nome',
    dataIndex: 'name',
    key: 'name',
    sorter: (a, b) => a.name.localeCompare(b.name),
    render: (text) => <a>{text}</a>,
  },
  {
    title: 'Categoria',
    dataIndex: 'category',
    key: 'category',
    render: (_, product) => <CategoryColumn category={product.category}/>,
  },
  {
    title: 'Preço',
    dataIndex: 'price',
    key: 'price',
    render: (_, product) => <a>{convertNumberToMoney(product.price)}</a>,
  },
  
];

const Product = () => {
    const { products, setProducts } = useDataContext();
    const [ productsFiltered, setProductsFiltrered] = useState<ProductType[]>([]);
    const { request } = useRequests();
    const navigate = useNavigate();

    useEffect(() => {
        setProductsFiltrered([...products]);
    }, [products]);

    useEffect(() => {
        request<ProductType[]>(URL_PRODUCT, MethodsEnum.GET, setProducts);
    }, []);

    const handleOnClickInsert = () => {
        navigate(ProductRoutesEnum.PRODUCT_INSERT);
    }

    const onSearch = (value: string) =>  {
      if (!value) {
        setProductsFiltrered([...products]);
        } else {
      setProductsFiltrered([...productsFiltered.filter((product) => product.name.includes(value))]);
    
    }
  };

    return (
    <Screen 
      listBreadcrumb={[
        {
            name: 'HOME',
        },
        {
            name: 'PRODUTOS',
        },
    ]}
    >
      
      <BoxButtons>
        <LimiteSizeInput>
          <Search placeholder="Buscar produto" onSearch={onSearch} enterButton />
        </LimiteSizeInput>

        <LimiteSizeButton>
          <Button type="primary" onClick={handleOnClickInsert}>
          Inserir
          </Button>
        </LimiteSizeButton>
      </BoxButtons>
        <Table columns={columns} dataSource={productsFiltered} />
    </Screen>
    );
};

export default Product;