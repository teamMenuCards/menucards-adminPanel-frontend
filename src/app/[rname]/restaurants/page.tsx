"use client"

import { useGetRestaurantDetailByNameQuery } from "@/services/get-restaurant-detail";
import { useState } from "react";
import { useParams } from "next/navigation";
import { CircularProgress } from "@mui/material";
import EditableRestaurant from "./EditableRestaurants";
	

export default function AdminEditRestaurantPage() {
	const {rname } = useParams<{ rname: string }>()

	const {
		currentData: restaurantData,
		refetch: refetchData,
		isLoading
	} = useGetRestaurantDetailByNameQuery (rname);


	const [isUpdating,setIsUpdating]=useState(false);
	const handleUpdateRestaurants = async () => {
	
		console.log("Restaurant updated successfully")
	}
	
	return (
		<div className="container mx-auto p-4">
			<div className="flex justify-between items-center mb-6">
				<h1 className="text-10xl font-bold p-10 bg-sky-50 ">Edit Restaurants</h1>
                {isLoading||isUpdating ?(
                     <div className="flex flex-col items-center justify-center h-64">
                     <CircularProgress />
                     <p className="mt-4 text-gray-600">Loading restaurant...</p>
                   </div>
                ): (
				
					restaurantData && (
						<EditableRestaurant 
							restaurantDetail={restaurantData}  
							onUpdateRestaurants={handleUpdateRestaurants} 
						/>
					)
				) }
             

			</div>
		</div>
	)
}
