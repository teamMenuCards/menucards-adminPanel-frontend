import {PATHS}  from './paths';
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export interface restaturantsButtonELements{
    name?:string,
    url?:string,
    image_url?:string,
    display_order?:number,
    restaurant_id?:string,

}

export const restaurantAddLinkAPI =createApi({
    reducerPath:"restaurantAddLinkAPI",
    baseQuery:fetchBaseQuery({baseUrl:"http://localhost:4200"}),
    endpoints:(builder)=>({
        restaurantAddLink:builder.mutation<any,{data:restaturantsButtonELements}>({
    query:({data})=>({ 
        url:`${PATHS.post_restaurants}`,
        method:"POST",
        headers:{
            "Content-Type": "application/json"
        },
        body:data, 

    })
        })
    })
})

export const {useRestaurantAddLinkMutation}=restaurantAddLinkAPI;