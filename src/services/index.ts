import { getMenuListAPI } from './get-menu-list';
import { getRestaurantDetailAPI } from './get-restaurant-detail';
import { updateCategoryApi } from './update-category'
import { updateProductApi } from "./update-product";
import { getRestaurantAPI } from './get-restaurant';
import { updateRestaurantApi } from './update-restaurants';
import {updateRestaurantDetailApi} from './update-restaurants-details';
import {restaurantAddLinkAPI} from "@/services/post-restaurants-addlink";
export const apis = {
  [getMenuListAPI.reducerPath]: getMenuListAPI.reducer,
  [getRestaurantDetailAPI.reducerPath]: getRestaurantDetailAPI.reducer,
  [getRestaurantAPI.reducerPath]:getRestaurantAPI.reducer,
  [updateCategoryApi.reducerPath]: updateCategoryApi.reducer,
  [updateProductApi.reducerPath]: updateCategoryApi.reducer,
  [updateRestaurantApi.reducerPath]:updateRestaurantApi.reducer,
  [updateRestaurantDetailApi.reducerPath]:updateRestaurantDetailApi.reducer,
  [restaurantAddLinkAPI.reducerPath]:restaurantAddLinkAPI.reducer,
} as const;
