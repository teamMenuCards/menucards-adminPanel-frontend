"use client"
import React from "react"
import { useGetMenuListByNameQuery } from "@/services/get-menu-list"
import { useParams } from "next/navigation"
import { Button, CircularProgress } from "@mui/material"
import RefreshIcon from '@mui/icons-material/Refresh';
import { useState } from "react"
import EditableCategory from "./EditableCategory"

export default function UpdateCategoryDetailsPage() {

	const { rname } = useParams<{ rname: string }>()
	console.log(rname)
	const {
		currentData: menudata,
		refetch: refetchMenu,
		isLoading
	} = useGetMenuListByNameQuery(rname)
	const categories = menudata?.categories || []

	console.log("data", categories);
     const [isUpdating, setIsUpdating] = useState(false)

const handleUpdateCategory =async()=>{
  setIsUpdating(true)
    try {
      await refetchMenu()
    } finally {
      setIsUpdating(false)
    }
}


	return (
		<div className="container mx-auto p-4">
			<div className="flex justify-between items-center mb-6">
				<h1 className="text-2xl font-bold">Edit Category</h1>
				<div className="flex items-center p-4">
					<span className="mr-4">Restaurant: {rname}</span>
				</div>
			</div>
			{isLoading ? (
				<div className="flex flex-col items-center justify-center h-64">
					<CircularProgress />
					<p className="mt-4 text-gray-600">Loading Categories...</p>
				</div>
			) : (
				<EditableCategory

					sections={categories}
					onUpdateCategory={handleUpdateCategory}
				/>
			)}
		</div>
	)
}
