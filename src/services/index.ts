import { getMenuListAPI } from './get-menu-list';
import { getRestaurantDetailAPI } from './get-restaurant-detail';
import { updateCategoryApi } from './update-category'
import { updateProductApi } from "./update-product";
import { updateProductBaseApi } from './update-product-base';

export const apis = {
  [getMenuListAPI.reducerPath]: getMenuListAPI.reducer,
  [getRestaurantDetailAPI.reducerPath]: getRestaurantDetailAPI.reducer,
  [updateCategoryApi.reducerPath]: updateCategoryApi.reducer,
  [updateProductApi.reducerPath]: updateCategoryApi.reducer,
  [updateProductBaseApi.reducerPath]: updateProductBaseApi.reducer,
} as const;
