"use client"
import React, { useState } from "react"
import { TextField, Button, Grid, Box } from "@mui/material"
import PageContainer from "@/components/PageContainer"
import DashboardCard from "@/common/DashboardCard"
import { useMutation } from "@tanstack/react-query"
import addRestaurant from "@/services/addRestaurant"

interface RestoData {
	name: string
	email: string
	phone_no: string
	pincode: string
	address: string
	country: string
	state: string
}

const AddRestaurant = () => {
	const mutation = useMutation({
		mutationFn: async (restoData: RestoData) => {
			return addRestaurant(restoData)
		},
		onSuccess: (data) => {
			console.log("Resto added successfully", data)
		},
		onError: (error: Error) => {
			console.error("Resto adding failed", error.message)
		}
	})

	const [formData, setFormData] = useState({
		name: "",
		email: "",
		phone_no: "",
		pincode: "",
		address: "",
		country: "",
		state: ""
	})

	const handleChange = (e) => {
		const { name, value } = e.target
		setFormData({
			...formData,
			[name]: value
		})
	}

	const handleSubmit = (e) => {
		e.preventDefault()
		console.log(formData)

		mutation.mutate({
			name: formData.name,
			email: formData.email,
			phone_no: formData.phone_no,
			pincode: formData.pincode,
			address: formData.address,
			country: formData.country,
			state: formData.state
		})
	}

	return (
		<PageContainer title="Typography" description="this is Typography">
			<DashboardCard title="Add a Restaurant">
				<Box
					component="form"
					onSubmit={handleSubmit}
					sx={{
						flexGrow: 1,
						padding: 2,
						maxWidth: 600,
						margin: "auto"
					}}
				>
					<Grid container spacing={2}>
						{/* Name and Email */}
						<Grid item xs={12} sm={6}>
							<TextField
								label="Name"
								name="name"
								value={formData.name}
								onChange={handleChange}
								fullWidth
								required
							/>
						</Grid>
						<Grid item xs={12} sm={6}>
							<TextField
								label="Email"
								name="email"
								type="email"
								value={formData.email}
								onChange={handleChange}
								fullWidth
								required
							/>
						</Grid>

						{/* Phone Number and Pincode */}
						<Grid item xs={12} sm={6}>
							<TextField
								label="Phone No."
								name="phone_no"
								value={formData.phone_no}
								onChange={handleChange}
								fullWidth
								required
							/>
						</Grid>
						<Grid item xs={12} sm={6}>
							<TextField
								label="Pincode"
								name="pincode"
								value={formData.pincode}
								onChange={handleChange}
								fullWidth
								required
							/>
						</Grid>

						{/* Address (Full Width) */}
						<Grid item xs={12}>
							<TextField
								label="Address"
								name="address"
								value={formData.address}
								onChange={handleChange}
								multiline
								rows={3}
								fullWidth
							/>
						</Grid>

						{/* Country and State */}
						<Grid item xs={12} sm={6}>
							<TextField
								label="Country"
								name="country"
								value={formData.country}
								onChange={handleChange}
								fullWidth
								required
							/>
						</Grid>
						<Grid item xs={12} sm={6}>
							<TextField
								label="State"
								name="state"
								value={formData.state}
								onChange={handleChange}
								fullWidth
								required
							/>
						</Grid>

						{/* Submit Button */}
						<Grid item xs={12}>
							<Button
								type="submit"
								variant="contained"
								color="primary"
								fullWidth
							>
								Submit
							</Button>
						</Grid>
					</Grid>
				</Box>
			</DashboardCard>
		</PageContainer>
	)
}

export default AddRestaurant
