import { PATHS } from "./paths"
import { createApi,fetchBaseQuery } from "@reduxjs/toolkit/query/react";

	export interface UpdateRestaurantRequest {
	name?: string
	email?: string
	phone_no?: string
	address?: string
	
}

//API FOR UPDATING A RESTAURANTS

export const updateRestaurantApi = createApi({
	reducerPath: "updateRestaurantApi",
	baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:4200"  }),
	endpoints: (builder) => ({
		updateRestaurant: builder.mutation<any,{ id: string; data: UpdateRestaurantRequest }>({
			query: ({ id, data }) => ({
				url:`${PATHS.update_restaurants.replace("{id}",id)}`,
				method: "PATCH",
				headers: {
					"Content-Type": "application/json"
				},
				body:JSON.stringify(data),	
               
			}),
            
		}),
	}),
   
});


export const { useUpdateRestaurantMutation }=updateRestaurantApi;