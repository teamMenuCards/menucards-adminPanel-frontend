import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { PATHS } from "./paths";

export const deleteProductDetailApi = createApi({
	reducerPath: "deleteProductDetailApi",
	baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:4200/" }),
	endpoints: (builder) => ({
		deleteProductDetail: builder.mutation<void, { id: string }>({
			query: ({ id }) => ({
				url: PATHS.delete_product_details.replace("{id}", id),
				method: "DELETE",
				headers: {
					"Content-Type": "application/json",
				},
			}),
		}),
	}),
});

export const { useDeleteProductDetailMutation } = deleteProductDetailApi;