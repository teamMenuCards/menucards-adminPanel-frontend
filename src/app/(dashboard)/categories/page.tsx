"use client"
import PageContainer from "@/components/PageContainer"
import { Button, Grid, Box } from "@mui/material"
import { useForm } from "react-hook-form"
import { yupResolver } from "@hookform/resolvers/yup"
import DashboardCard from "@/common/DashboardCard"
import { AddCategorySchema } from "./validation"
import TextBox from "@/components/elements/TextBox"
import { useMutation } from "@tanstack/react-query"
import createCategory from "@/services/createCategory"

const ProductPage = () => {
	const {
		mutate: createRestaurantIdSrvc,
		data: createCategoryData,
		isLoading: createCategoryLoading,
		isError: createCategoryhasError,
		error: createCategoryError,
		isSuccess: createCategorySuccess
	} = useMutation(createCategory, {
		onSuccess: () => reset()
	})

	const {
		formState: { errors },
		handleSubmit,
		register,
		reset
	} = useForm({
		mode: "onSubmit",
		resolver: yupResolver(AddCategorySchema),
		defaultValues: {
			name: "",
			display_name: "",
			description: "",
			image_url: "",
			display_order: 0
		}
	})

	const onSubmit = (formData) => {
		// trigger add category api
		createRestaurantIdSrvc({
			...formData,
			restaurant_id: window.localStorage.getItem("restoId")
		})
	}

	return (
		<PageContainer
			title="Add Restaurant"
			description="Add a new restaurant to the system"
		>
			<DashboardCard title="Add Categrory">
				{/* Create restaurant id form */}
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
								label="Name"
								name="name"
								register={register}
								required
								error={!!errors.name?.message}
							/>
						</Grid>

						<Grid item xs={12} sm={6}>
							<TextBox
								label="Display name"
								name="display_name"
								register={register}
								required
								error={!!errors.display_name?.message}
							/>
						</Grid>

						<Grid item xs={12} sm={6}>
							<TextBox
								label="Description"
								name="description"
								register={register}
								required
								error={!!errors.description?.message}
							/>
						</Grid>

						<Grid item xs={12} sm={6}>
							<TextBox
								label="Image Url"
								name="image_url"
								register={register}
								required
								error={!!errors.image_url?.message}
							/>
						</Grid>

						<Grid item xs={12} sm={6}>
							<TextBox
								label="Display order"
								name="display_order"
								register={register}
								required
								error={!!errors.display_order?.message}
							/>
						</Grid>

						<Grid item xs={12} sm={6}>
							<TextBox
								label="Parent Id"
								name="parent_id"
								register={register}
								required
								error={!!errors.parent_id?.message}
							/>
						</Grid>

						{/* Submit Button */}
						<Grid item xs={12}>
							<Button
								type="submit"
								variant="contained"
								color="primary"
								disabled={createCategoryLoading}
							>
								{createCategoryLoading ? "Submitting..." : "Add Category"}
							</Button>
						</Grid>
					</Grid>
				</Box>

				{/* Create user id form */}
				{/* {showCreateIdForm && <CreateuserId restoId={addRestoData?.id} />} */}
			</DashboardCard>
		</PageContainer>
	)
}

export default ProductPage
