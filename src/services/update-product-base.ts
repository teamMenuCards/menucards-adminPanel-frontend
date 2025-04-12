import { PATHS } from "./paths";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

// Define the interface for the update product base request
export interface UpdateProductBaseRequest {
  name?: string;
  description?: string | null;
  details?: Record<string, any> | null;
  category_id?: string;
  is_featured?: boolean;
}

// Define the API for updating a product base
export const updateProductBaseApi = createApi({
  reducerPath: "updateProductBaseApi",
  baseQuery: fetchBaseQuery({ baseUrl: process.env.NEXT_PUBLIC_API_URL }),
  endpoints: (builder) => ({
    updateProductBase: builder.mutation<any, { id: string; data: UpdateProductBaseRequest }>({
      query: ({ id, data }) => ({
        url: `${PATHS.update_product_base.replace("{id}", id)}`, // Assuming you have this path defined
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: data,
      }),
    }),
  }),
});

export const { useUpdateProductBaseMutation } = updateProductBaseApi;