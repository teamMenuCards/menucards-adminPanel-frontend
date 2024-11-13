"use client"
import React, { useEffect, useState } from "react"
import { Button, Grid, Box } from "@mui/material"
import PageContainer from "@/components/PageContainer"
import DashboardCard from "@/common/DashboardCard"
import { useMutation } from "@tanstack/react-query"
import addRestaurant, { RestoData } from "@/services/addRestaurant"
import { useForm } from "react-hook-form"
import { yupResolver } from "@hookform/resolvers/yup"
import { AddRestaurantSchema } from "./validation" // Ensure validation schema exists
import TextBox from "@/components/elements/TextBox"
import CreateuserId from "./createUserid"

/* 
	Onboarding a Restaurant:
	- First restaurant details are submitted to '/restaurants" api which onbaords restaurant
	- Next a restaurant id is created after submitting a request to /users

*/
const AddRestaurant = () => {
	const [showCreateIdForm, setShowCreateIdForm] = useState(false)

	const {
		formState: { errors },
		handleSubmit,
		register,
		reset
	} = useForm({
		mode: "onSubmit",
		resolver: yupResolver(AddRestaurantSchema),
		defaultValues: {
			name: "",
			email: "",
			phone_no: "",
			pincode: "",
			address: "",
			country: "",
			state: "",
			subdomain: "",
			city: ""
		}
	})

	const {
		mutate: addRestaurantSrvc,
		data: addRestoData,
		isLoading: addRestoLoading,
		isError: addRestoHasError,
		error: addRestoError,
		isSuccess: addRestoSuccess
	} = useMutation(addRestaurant)

	const onSubmit = (formData: RestoData) => {
		console.log("Submitting form data:", formData)
		addRestaurantSrvc(formData) // Trigger mutation with form data
	}

	useEffect(() => {
		if (addRestoSuccess) {
			window.localStorage.setItem("restoId", addRestoData?.id)
			setShowCreateIdForm(true)
		}
	}, [addRestoSuccess])

	if (addRestoHasError) {
		console.log("Error onbaording restaurany")
	}

	return (
		<PageContainer
			title="Add Restaurant"
			description="Add a new restaurant to the system"
		>
			<DashboardCard title="Onboard New Restaurant">
				<>
					{/* Create restaurant id form */}
					{!showCreateIdForm && (
						<Box
							component="form"
							onSubmit={handleSubmit(onSubmit)}
							sx={{
								flexGrow: 1,
								padding: 2,
								margin: "auto"
							}}
						>
							<Grid container spacing={2}>
								<Grid item xs={12} sm={6}>
									<TextBox
										label="Subdomain"
										name="subdomain"
										register={register}
										required
										error={!!errors.subdomain?.message}
									/>
								</Grid>

								<Grid item xs={12} sm={6}>
									<TextBox
										label="Name"
										name="name"
										register={register}
										required
										error={!!errors.name?.message}
									/>
								</Grid>

								<Grid item xs={12} sm={6}>
									<TextBox
										label="Email"
										name="email"
										type="email"
										register={register}
										required
										error={!!errors.email?.message}
									/>
								</Grid>

								<Grid item xs={12} sm={6}>
									<TextBox
										label="Phone No."
										name="phone_no"
										register={register}
										required
										error={!!errors.phone_no?.message}
									/>
								</Grid>

								{/* Address */}
								<Grid item xs={12}>
									<TextBox
										label="Address"
										name="address"
										register={register}
										multiline
										rows={3}
										error={!!errors.address?.message}
									/>
								</Grid>

								<Grid item xs={12} sm={6}>
									<TextBox
										label="Pincode"
										name="pincode"
										register={register}
										required
										error={!!errors.pincode?.message}
									/>
								</Grid>

								<Grid item xs={12} sm={6}>
									<TextBox
										label="Country"
										name="country"
										register={register}
										required
										error={!!errors.country?.message}
									/>
								</Grid>

								<Grid item xs={12} sm={6}>
									<TextBox
										label="State"
										name="state"
										register={register}
										required
										error={!!errors.state?.message}
									/>
								</Grid>

								<Grid item xs={12} sm={6}>
									<TextBox
										label="City"
										name="city"
										register={register}
										required
										error={!!errors.city?.message}
									/>
								</Grid>

								{/* Submit Button */}
								<Grid item xs={12}>
									<Button
										type="submit"
										variant="contained"
										color="primary"
										disabled={addRestoLoading}
									>
										{addRestoLoading ? "Submitting..." : "Add Restaurant"}
									</Button>
								</Grid>
							</Grid>
						</Box>
					)}

					{/* Create user id form */}
					{showCreateIdForm && <CreateuserId restoId={addRestoData?.id} />}
				</>
			</DashboardCard>
		</PageContainer>
	)
}

export default AddRestaurant
