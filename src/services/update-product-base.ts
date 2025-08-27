import { createApi } from "@reduxjs/toolkit/query/react";
import { axiosBaseQuery } from "./http-client";
import { parseDynamicURL } from "./utils";

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
  baseQuery: axiosBaseQuery(),
  endpoints: (builder) => ({
    updateProductBase: builder.mutation<any, { id: string; data: UpdateProductBaseRequest }>({
      query: ({ id, data }) => ({
        url: parseDynamicURL("products/{id}", { id }),
        method: "PATCH",
        data,
      }),
    }),
  }),
});

export const { useUpdateProductBaseMutation } = updateProductBaseApi;