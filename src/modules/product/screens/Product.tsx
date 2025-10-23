import { useEffect, useState } from "react";
import { ProductType } from "../../../shared/components/types/ProductType";
import { URL_PRODUCT } from "../../../shared/constants/urls";
import { MethodsEnum } from "../../../shared/enums/methods.enum";
import { useRequests } from "../../../shared/hooks/useRequest";

import { Input } from 'antd';
import { ColumnsType } from 'antd/es/table';
import Table from "../../../shared/components/table/Table";
import CategoryColumn from "../components/CategoryColumn";
import TooltipImage from "../components/TooltipImage";
import { convertNumberToMoney } from "../../../shared/functions/money";
import Screen from "../../../shared/components/screen/Screen";
import Button from "../../../shared/components/buttons/button/Button";
import { useNavigate } from "react-router-dom";
import { ProductRoutesEnum } from "../routes";
import { LimitedContainer } from "../../../shared/components/styles/limited.styled";
import { DisplayFlexJustifyBetween } from "../../../shared/components/styles/display.styled";
import { useProductReducer } from "../../../store/reducers/productReducer/useProductReducer";

const { Search } = Input;

const columns: ColumnsType<ProductType> = [
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
  
]


const Product = () => {
  const { products , setProducts } = useProductReducer()

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
      
        <DisplayFlexJustifyBetween margin="0px 0px 16px 0px">
        <LimitedContainer width={240}>
          <Search placeholder="Buscar produto" onSearch={onSearch} enterButton />
        </LimitedContainer>

        <LimitedContainer width={120}>
          <Button type="primary" onClick={handleOnClickInsert}>
          Inserir
          </Button>
        </LimitedContainer>
        </DisplayFlexJustifyBetween>
        <Table columns={columns} dataSource={productsFiltered} />
    </Screen>
    );
};

export default Product;