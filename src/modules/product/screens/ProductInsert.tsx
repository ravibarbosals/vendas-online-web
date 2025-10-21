import { useEffect, useState } from "react";
import Button from "../../../shared/components/buttons/button/Button";
import Screen from "../../../shared/components/screen/Screen";
import { URL_CATEGORY, URL_PRODUCT } from "../../../shared/constants/urls";
import { MethodsEnum } from "../../../shared/enums/methods.enum";
import { useDataContext } from "../../../shared/hooks/useDataContext";
import { useRequests } from "../../../shared/hooks/useRequest";
import { ProductRoutesEnum } from "../routes";
import { ProductInsertContainer } from "../styles/productInsert.style";
import Input from "../../../shared/components/inputs/input/Input";
import { InsertProduct } from "../../../shared/dtos/InsertProduct.dto";
import Select from "../../../shared/components/inputs/select/Select";
import { connectionAPIPost } from "../../../shared/functions/connection/connectionAPI";
import { LimitedContainer } from "../../../shared/components/styles/limited.styled";
import { DisplayFlexJustifyRight } from "../../../shared/components/styles/display.styled";
import { useNavigate } from "react-router-dom";
import { useGlobalContext } from "../../../shared/hooks/useGlobalContext";

const ProductInsert = () => {
    const [product ,setProduct] = useState<InsertProduct>({
        name: '',
        price: 0,
        image: '',
    });
        const { categories, setCategories } = useDataContext();
        const { setNotification } = useGlobalContext();
        const { request } = useRequests();
        const navigate = useNavigate();

        useEffect(() => {
            if (categories.length === 0) {
                request(URL_CATEGORY, MethodsEnum.GET, setCategories);
            }
        }, []);

        const handleInsertProduct = async () => {
            await connectionAPIPost(URL_PRODUCT, product)
                .then(() => {
                    setNotification('Sucesso!', 'success', 'Produto inserido com sucesso!')
                    navigate(ProductRoutesEnum.PRODUCT)
                })
                .catch((error: Error) => {
                    setNotification(error.message, "error");
                });
        };

        const hadleOnClickCancel = () => {
            navigate(ProductRoutesEnum.PRODUCT);
        };

        const onChange = (event: React.ChangeEvent<HTMLInputElement>, 
            nameObject:string, 
            isNumber?: boolean,
        ) => {
            setProduct({
                ...product,
                [nameObject]: isNumber ? Number(event.target.value) : event.target.value,
            });
        };

        const handleChange = (value: string) => {
            setProduct({
                ...product,
                categoryId: Number(value),
            });
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
            <Input onChange={(event) => onChange(event, 'name')}
            value={product.name}
            margin="0px 0px 16px 0px" 
            title="Nome" 
            placeholder="Nome"
            />
            <Input onChange={(event) => onChange(event, 'image')}
            value={product.image}
            margin="0px 0px 16px 0px" 
            title="Url imagem" 
            placeholder="Url imagem"
            />
            <Input onChange={(event) => onChange(event, 'price', true)}
            value={product.price}
            margin="0px 0px 16px 0px" 
            title="Preço" 
            placeholder="Preço" 
            />
            <Select
            title='Categoria'
            margin ="0px 0px 32px 0px"
            onChange={handleChange}
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
                    <Button onClick={handleInsertProduct} type="primary">
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