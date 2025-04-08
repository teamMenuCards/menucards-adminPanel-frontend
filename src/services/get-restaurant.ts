import { RestaurantDetailType, RestaurantType } from "@/types"
import { createApi } from "@reduxjs/toolkit/query/react";
import {apiRoutes} from './api-routes'
import {axiosBaseQuery} from './http-client'
import { parseDynamicURL } from "./utils"


export type RestaurantDetailResponse = {
    detail: RestaurantDetailType
} & RestaurantType


export const getRestaurantAPI= createApi({
   reducerPath: "get-restaurants-id",
   baseQuery :axiosBaseQuery(),
   endpoints:(builder) =>({

    getRestaurantById:builder.query<RestaurantDetailResponse,string>({
        query:(id)=>({
            url:parseDynamicURL(apiRoutes.restaurantById,{id}) ,
            method:"GET" ,
        })
    })
   })
  
})

export const {useGetRestaurantByIdQuery}= getRestaurantAPI;

