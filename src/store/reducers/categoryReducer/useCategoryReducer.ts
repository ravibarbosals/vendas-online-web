import { useDispatch } from "react-redux";
import { setCategoriesAction } from ".";
import { CategoryType } from "../../../shared/types/CategoryType";
import { useAppSelector } from "../../hooks";

export const useCategoryReducer = () => {
    const dispatch = useDispatch();
    const {categories } = useAppSelector((state) => state.categoryReducer);

    const setCategories = (currentCategories: CategoryType[]) => {
        dispatch(setCategoriesAction(currentCategories));
    };

    return {
        categories,
        setCategories,
    };
};