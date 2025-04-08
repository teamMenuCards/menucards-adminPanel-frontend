import { PATHS } from "./paths"
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react"

export interface UpdateRestaurantDetailsRequest {
	logo: string
	cover_image: string
	details: {
		wa_api_details?: Record<string, any> | null;

		platform_reviews?: {
			platform_name: string
			total_reviews: number
			average_rating: number
		}[]
		platform_details?: {
			platform_name: string
			platform_uri: string
		}[] 
		meta_details?: {
			category: string
			opening_time: string
			closing_time: string
			phone_number: string
			avg_price: number
			avg_person: number
			location_info: string
		}
		reviews_image_url_details?: {
			review_image_url: string
		}[] 	
	}
}

export const updateRestaurantDetailApi = createApi({
	reducerPath: "updateRestaurantDetailApi",
	baseQuery: fetchBaseQuery({  baseUrl: "http://localhost:4200"}),
	endpoints: (builder) => ({
		updateRestaurantDetail: builder.mutation<any,{ id: number; data: UpdateRestaurantDetailsRequest }>({
			query: ({ id, data }) => ({
                url: `${PATHS.update_restaurants_details.replace("{id}", id.toString())}`,

                method:"PATCH",
                headers:{
                    "Content-Type": "application/json"
                },
                body:data,
			}),
		}),
	}),
});


export const {useUpdateRestaurantDetailMutation}=updateRestaurantDetailApi;
