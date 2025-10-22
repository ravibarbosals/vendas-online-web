import { Input, TableProps } from "antd";
import Screen from "../../../shared/components/screen/Screen";
import Table from "../../../shared/components/table/Table";
import { useCategory } from "../hooks/useCategory";
import { CategoryType } from "../../../shared/components/types/CategoryType";
import { LimitedContainer } from "../../../shared/components/styles/limited.styled";
import Button from "../../../shared/components/buttons/button/Button";
import { useNavigate } from "react-router-dom";
import { CategoryRoutesEnum } from "../routes";
import { DisplayFlexJustifyBetween } from "../../../shared/components/styles/display.styled";

const { Search } = Input;

const columns: TableProps<CategoryType>['columns'] = [
  {
    title: 'Id',
    dataIndex: 'id',
    key: 'id',
    render: (text) => <a>{text}</a>,
  },
  {
    title: 'Nome',
    dataIndex: 'name',
    key: 'name',
    sorter: (a, b) => a.name.localeCompare(b.name),
    render: (text) => <a>{text}</a>,
  },
  {
    title: 'Produtos',
    dataIndex: 'amountProducts',
    key: 'amountProducts',
    render: (text) => <a>{text}</a>,
  },
];

const Category = () => {
    const { categories } = useCategory();
    const navigate = useNavigate();

    const handleOnClickCategory = () => {
        navigate(CategoryRoutesEnum.CATEGORY_INSERT)
    }

    const handleOnsearch = (value: string) => {

    }



    return ( 
    <Screen
    listBreadcrumb={[
        {
            name: 'HOME',
        },
        {
            name: 'CATEGORIAS',
        },
    ]}
    >
        <DisplayFlexJustifyBetween margin="0px 0px 16px 0px">
        <LimitedContainer width={240}>
          <Search placeholder="Buscar categoria" onSearch={handleOnsearch} enterButton />
        </LimitedContainer>

        <LimitedContainer width={120}>
          <Button type="primary" onClick={handleOnClickCategory}>
          Inserir
          </Button>
        </LimitedContainer>
        </DisplayFlexJustifyBetween>
        <Table columns={columns} dataSource={categories} />
    </Screen>
    );
};

export default Category;