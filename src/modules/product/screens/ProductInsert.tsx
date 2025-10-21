import { useEffect } from "react";
import Button from "../../../shared/components/buttons/button/Button";
import Screen from "../../../shared/components/screen/Screen";
import { URL_CATEGORY } from "../../../shared/constants/urls";
import { MethodsEnum } from "../../../shared/enums/methods.enum";
import { useDataContext } from "../../../shared/hooks/useDataContext";
import { useRequests } from "../../../shared/hooks/useRequest";
import { ProductRoutesEnum } from "../routes";
import { ProductInsertContainer } from "../styles/productInsert.style";
import Input from "../../../shared/components/inputs/input/Input";
import Select from "../../../shared/components/inputs/select/Select";
import { LimitedContainer } from "../../../shared/components/styles/limited.styled";
import { DisplayFlexJustifyRight } from "../../../shared/components/styles/display.styled";
import { useNavigate } from "react-router-dom";
import InputMoney from "../../../shared/components/inputs/inputMoney/InputMoney";
import { userInsertProduct } from "../hooks/useInsertProduct";

const ProductInsert = () => {
        const {product, loading, disableButton, onChangeInput, handleInsertProduct, handleChangeSelect} = 
            userInsertProduct();
        const { categories, setCategories } = useDataContext();

        const { request } = useRequests();
        const navigate = useNavigate();

        useEffect(() => {
            if (categories.length === 0) {
                request(URL_CATEGORY, MethodsEnum.GET, setCategories);
            }
        }, []);

        const hadleOnClickCancel = () => {
            navigate(ProductRoutesEnum.PRODUCT);
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
        <ProductInsertContainer>
        <LimitedContainer width={400}>
            <Input onChange={(event) => onChangeInput(event, 'name')}
            value={product.name}
            margin="0px 0px 16px 0px" 
            title="Nome" 
            placeholder="Nome"
            />
            <Input onChange={(event) => onChangeInput(event, 'image')}
            value={product.image}
            margin="0px 0px 16px 0px" 
            title="Url imagem" 
            placeholder="Url imagem"
            />
            <InputMoney onChange={(event) => onChangeInput(event, 'price', true)}
            value={product.price}
            margin="0px 0px 16px 0px" 
            title="Preço" 
            placeholder="Preço" 
            />
            <Select
            title='Categoria'
            margin ="0px 0px 32px 0px"
            onChange={handleChangeSelect}
            options={
                categories.map((category) => ({
                    value: `${category.id}`,
                    label: `${category.name}`,
            }))}
            />
            <DisplayFlexJustifyRight>
                <LimitedContainer margin='0px 8px'width={120}>
                    <Button danger onClick={hadleOnClickCancel}>
                        Cancelar
                    </Button>
                </LimitedContainer>
                <LimitedContainer width={120}>
                    <Button 
                    loading={loading}
                    disabled={disableButton} 
                    onClick={handleInsertProduct} 
                    type="primary">
                        Inserir produto
                    </Button>
                </LimitedContainer>
            </DisplayFlexJustifyRight>
        </LimitedContainer>
    </ProductInsertContainer>
    </Screen>
    );
};

export default ProductInsert;