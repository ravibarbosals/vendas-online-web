import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { CategoryType } from '../../../shared/types/CategoryType';

export interface CategorytState {
  categories: CategoryType[];
}

const initialState: CategorytState = {
  categories: [],
};

export const counterSlice = createSlice({
  name: 'categorytReducer',
  initialState,
  reducers: {
    setCategoriesAction: (state, action: PayloadAction<CategoryType[]>) => {
      state.categories = action.payload;
    },
  },
});

export const { setCategoriesAction } = counterSlice.actions;

export default counterSlice.reducer;
