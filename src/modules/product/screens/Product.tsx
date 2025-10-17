import { useEffect } from "react";
import { useDataContext } from "../../../shared/hooks/useDataContext";
import { useGlobalContext } from "../../../shared/hooks/useGlobalContext";
import { userRequest } from "../../../shared/hooks/useRequest";
import { MethodsEnum } from "../../../shared/enums/methods.enum";
import { ProductType } from "../types/ProductType";
import { URL_PRODUCT } from "../../../shared/constants/urls";

const Product = () => {
    const { products, setProducts } = useDataContext();
    const { request } = userRequest();

    useEffect(() => {
        request<ProductType[]>(URL_PRODUCT, MethodsEnum.GET, setProducts);
    }, []);

    return products.map((product) => <div key={product.id}>{product.name}</div>);
};

export default Product;