import { logger } from 'redux-logger';

import { getMenuListAPI } from '@/services/get-menu-list';
import { getRestaurantDetailAPI } from '@/services/get-restaurant-detail';
import { getRestaurantAPI } from '@/services/get-restaurant';
import { configureStore } from '@reduxjs/toolkit';
import { updateCategoryApi } from '@/services/update-category';
import { rootReducer } from './features';
import { updateProductApi } from "@/services/update-product";
import { updateRestaurantApi } from '@/services/update-restaurants';
import {updateRestaurantDetailApi} from '@/services/update-restaurants-details';
import {restaurantAddLinkAPI}from "@/services/post-restaurants-addlink";

export const makeStore = () => {
  return configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware()
        .prepend(getMenuListAPI.middleware)
        .prepend(getRestaurantDetailAPI.middleware)
        .prepend(getRestaurantAPI.middleware)
        .prepend(updateCategoryApi.middleware)
        .prepend(updateProductApi.middleware)
        .prepend(updateRestaurantApi.middleware)
        .prepend(updateRestaurantDetailApi.middleware)
        .prepend(restaurantAddLinkAPI.middleware)
        .concat(logger),
  });
};

export type AppStore = ReturnType<typeof makeStore>;
export type RootState = ReturnType<AppStore["getState"]>;
export type AppDispatch = AppStore["dispatch"];
