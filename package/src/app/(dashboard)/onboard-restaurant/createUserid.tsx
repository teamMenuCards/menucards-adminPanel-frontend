import { Button, Grid, Box } from "@mui/material"
import { useForm } from "react-hook-form"
import { yupResolver } from "@hookform/resolvers/yup"
import { CreateRestaurantIdSchema } from "./validation"
import TextBox from "@/components/elements/TextBox"
import { useMutation } from "@tanstack/react-query"
import createRestaurantId from "@/services/createRestaurantId"
import { useSnackbar } from "@/context"
import { useEffect } from "react"

function CreateuserId({ restoId }) {
	const { showSnackbar } = useSnackbar()

	const {
		formState: { errors },
		handleSubmit,
		register,
		reset
	} = useForm({
		mode: "onSubmit",
		resolver: yupResolver(CreateRestaurantIdSchema),
		defaultValues: {
			name: "",
			email: "",
			phone_no: "",
			password: ""
		}
	})

	const {
		mutate: createRestaurantIdSrvc,
		data: createRestoData,
		isLoading: createRestoLoading,
		isError: createRestohasError,
		error: createRestoError,
		isSuccess: createRestoSuccess
	} = useMutation(createRestaurantId, {
		onSuccess: () => reset()
	})

	if (createRestoSuccess) {
		// show Success snackbar
		showSnackbar({
			message: "Restaurant id created successfully",
			variant: "success"
		})
	}

	useEffect(() => {})

	const onSubmit = (formData) => {
		createRestaurantIdSrvc({
			...formData,
			restaurant_id: restoId
		})
	}

	return (
		<>
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

					<Grid item xs={12} sm={6}>
						<TextBox
							label="Password"
							name="password"
							register={register}
							required
							error={!!errors.password?.message}
						/>
					</Grid>

					{/* Submit Button */}
					<Grid item xs={12}>
						<Button
							type="submit"
							variant="contained"
							color="primary"
							disabled={createRestoLoading}
						>
							{createRestoLoading ? "Submitting..." : "Create Restaurant Id"}
						</Button>
					</Grid>
				</Grid>
			</Box>
		</>
	)
}

export default CreateuserId
