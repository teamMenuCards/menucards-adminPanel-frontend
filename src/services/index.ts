import { getMenuListAPI } from './get-menu-list';
import { getRestaurantDetailAPI } from './get-restaurant-detail';
import { updateCategoryApi } from './update-category'
import { updateProductApi } from "./update-product";

export const apis = {
  [getMenuListAPI.reducerPath]: getMenuListAPI.reducer,
  [getRestaurantDetailAPI.reducerPath]: getRestaurantDetailAPI.reducer,
  [updateCategoryApi.reducerPath]: updateCategoryApi.reducer,
  [updateProductApi.reducerPath]: updateCategoryApi.reducer,
} as const;
