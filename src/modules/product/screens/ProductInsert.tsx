import { useEffect } from "react";
import Screen from "../../../shared/components/screen/Screen";
import { ProductRoutesEnum } from "../routes";
import { useDataContext } from "../../../shared/hooks/useDataContext";
import { useRequests } from "../../../shared/hooks/useRequest";
import { MethodsEnum } from "../../../shared/enums/methods.enum";
import { URL_CATEGORY } from "../../../shared/constants/urls";
import { LimitedContainer } from "../styles/productInsert.style";
import Input from "../../../shared/components/input/Input";
import Button from "../../../shared/components/buttons/button/Button";
import { Select } from "antd";

const ProductInsert = () => {
        const { categories, setCategories } = useDataContext();
        const { request } = useRequests();

        useEffect(() => {
            if (categories.length === 0) {
                request(URL_CATEGORY, MethodsEnum.GET, setCategories);
            }
        }, []);

        const handleChange = (value: string) => {
        console.log(`selected ${value}`);
        };

    return ( 
        <Screen 
        listBreadcrumb={[
        {
        name: 'HOME',
        },
        {
        name: 'PRODUTOS',
        navigateTo: ProductRoutesEnum.PRODUCT,
        },
        {
        name: 'INSERIR PRODUTO',
        },
    ]}
    >
        <LimitedContainer>
            <Input margin="0px 0px 16px 0px" title="Nome" placeholder=""/>
            <Input margin="0px 0px 16px 0px" title="Url imagem" placeholder="Url imagem" />
            <Input margin="0px 0px 16px 0px" title="Preço" placeholder="Preço" />
            <Select
                defaultValue="lucy"
                style={{ width: '100%'}}
                onChange={handleChange}
                options={
                    categories.map((category) => ({
                        value: `${category.id}`,
                        label: `${category.name}`,
                    }))}
                />
            <Button type="primary">Inserir produto</Button>
        </LimitedContainer>
    </Screen>
    );
};

export default ProductInsert;