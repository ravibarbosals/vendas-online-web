import { useDispatch } from "react-redux";
import { setProductsAction } from ".";
import { ProductType } from "../../../shared/types/ProductType";
import { useAppSelector } from "../../hooks";

export const useProductReducer = () => {
    const dispatch = useDispatch();
    const { products } = useAppSelector((state) => state.productReducer);

    const setProducts = (products: ProductType[]) => {
        dispatch(setProductsAction(products));
    };

    return {
        products,
        setProducts,
    };
};