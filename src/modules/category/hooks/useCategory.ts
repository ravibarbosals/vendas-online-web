import { useEffect } from "react";
import { useDataContext } from "../../../shared/hooks/useDataContext"
import { URL_CATEGORY } from "../../../shared/constants/urls";
import { MethodsEnum } from "../../../shared/enums/methods.enum";
import { useRequests } from "../../../shared/hooks/useRequest";

export const useCategory = () => {
    const { categories, setCategories } = useDataContext();
    const { request } = useRequests();

    useEffect(() => {
        if (!categories || categories.length === 0) {
            request(URL_CATEGORY, MethodsEnum.GET, setCategories);
        }
    }, []);

    return {
        categories,
    };
}