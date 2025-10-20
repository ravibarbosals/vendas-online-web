import { createContext, useContext, useState } from "react";
import { ProductType } from "../components/types/ProductType";
import { CategoryType } from "../components/types/CategoryType";


interface DataContext {
    products?: ProductType[];
    categories?: CategoryType[];
}

interface DataContextProps {
    data: DataContext;
    setData: (data: DataContext) => void;
}
export const DataContext = createContext({} as DataContextProps);

interface DataProvideProps {
    children: React.ReactNode;
}

export const DataProvider = ({ children }: DataProvideProps) => {
    const [data, setData] = useState<DataContext>({});

    return (
    <DataContext.Provider value={{data, setData }}>
        {children}
        </DataContext.Provider>
        );
};

export const useDataContext = () => {
    const { data, setData } = useContext(DataContext);

    const setProducts = (products: ProductType[]) => {
        setData({
            ...data,
            products,

        });
    };

    const setCategories = (categories: CategoryType[]) => {
        setData({
            ...data,
            categories,

        });
    };


    return {
        products: data?.products || [],
        categories: data?.categories || [],
        setProducts,
        setCategories,
    };
};