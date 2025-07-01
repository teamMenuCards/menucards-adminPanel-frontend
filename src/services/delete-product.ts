import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { PATHS } from "./paths";

export const deleteProductApi = createApi({
	reducerPath: "deleteProductApi",
	baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:4200/" }),
	endpoints: (builder) => ({
		deleteProduct: builder.mutation<void, { id: string }>({
			query: ({ id }) => ({
				url: PATHS.delete_product.replace("{id}", id),
				method: "DELETE",
				headers: {
					"Content-Type": "application/json",
				},
			}),
		}),
	}),
});

export const { useDeleteProductMutation } = deleteProductApi;
