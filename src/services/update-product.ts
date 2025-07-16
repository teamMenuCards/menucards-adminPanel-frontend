import { createApi } from "@reduxjs/toolkit/query/react";
import { axiosBaseQuery } from './http-client'
import { parseDynamicURL } from './utils'

// Define the interface for the update product request
export interface UpdateProductRequest {
  variant_details?: Record<string, any> | null;
  variant_name?: string;
  is_veg?: boolean;
  contains_egg?: boolean;
  price?: number;
  discounted_price?: number | null;
  image_url?: string;
  preparation_time_minutes?: number | null;
  allergens?: string | null;
  dietary_info?: string | null;
  calories?: number | null;
  spiciness?: number | null;
  ingredients?: string | null;
}

// Define the API for updating a product
export const updateProductApi = createApi({
  reducerPath: "updateProductApi",
  baseQuery: axiosBaseQuery(),
  endpoints: (builder) => ({
    updateProduct: builder.mutation<any, { id: string; data: UpdateProductRequest }>({
      query: ({ id, data }) => ({
        url: parseDynamicURL('product-details/{id}', { id }),
        method: "PATCH",
        data,
      }),
    }),
  }),
});

export const { useUpdateProductMutation } = updateProductApi;
