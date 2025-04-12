import { PATHS } from "./paths";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

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
  is_featured?: boolean;
}

// Define the API for updating a product
export const updateProductApi = createApi({
  reducerPath: "updateProductApi",
  baseQuery: fetchBaseQuery({ baseUrl: process.env.NEXT_PUBLIC_API_URL }),
  endpoints: (builder) => ({
    updateProduct: builder.mutation<any, { id: string; data: UpdateProductRequest }>({
      query: ({ id, data }) => ({
        url: `${PATHS.update_product.replace("{id}", id)}`,
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: data,
      }),
    }),
  }),
});

export const { useUpdateProductMutation } = updateProductApi;
