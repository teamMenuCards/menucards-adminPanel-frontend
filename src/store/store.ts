import { logger } from 'redux-logger';

import { getMenuListAPI } from '@/services/get-menu-list';
import { getRestaurantDetailAPI } from '@/services/get-restaurant-detail';
import { configureStore } from '@reduxjs/toolkit';
import { updateCategoryApi } from '@/services/update-category';
import { rootReducer } from './features';
import { updateProductApi } from "@/services/update-product";
import { updateProductBaseApi } from '@/services/update-product-base';
import { deleteProductApi } from '@/services/delete-product';
import { deleteProductDetailApi } from '@/services/delete-product-details';

export const makeStore = () => {
  return configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware()
        .prepend(getMenuListAPI.middleware)
        .prepend(getRestaurantDetailAPI.middleware)
        .prepend(updateCategoryApi.middleware)
        .prepend(updateProductApi.middleware)
        .prepend(updateProductBaseApi.middleware)
        .prepend(deleteProductApi.middleware)
        .prepend(deleteProductDetailApi.middleware)
        .concat(logger),
  });
};

export type AppStore = ReturnType<typeof makeStore>;
export type RootState = ReturnType<AppStore["getState"]>;
export type AppDispatch = AppStore["dispatch"];
