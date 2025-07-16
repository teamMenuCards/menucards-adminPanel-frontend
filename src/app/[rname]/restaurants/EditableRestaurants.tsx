import { useState, memo, useCallback } from "react"
import { RestaurantDetailResponse } from "@/services/get-restaurant-detail"
import { RestaurantDetailType } from "@/types/restaurant.type"
import {
	Grid,
	TextField,
	Button,
	CircularProgress,
	Snackbar,
	Alert
} from "@mui/material"
import SaveIcon from "@mui/icons-material/Save"
import { useUpdateRestaurantMutation } from "@/services/update-restaurants"
import { useUpdateRestaurantDetailMutation } from "@/services/update-restaurants-details"
import EditableRestaurantDetails from "./EditableRestaurantsDetails"

interface EditableRestaurantProps {
	restaurantDetail?: RestaurantDetailResponse
	onUpdateRestaurants: () => void
}

const EditableRestaurant: React.FC<EditableRestaurantProps> = ({
	restaurantDetail,
	onUpdateRestaurants
}) => {
	const [isUpdating, setIsUpdating] = useState(false)
	const [editedRestaurant, setEditedRestaurant] =
		useState<RestaurantDetailResponse>(
			restaurantDetail ?? ({} as RestaurantDetailResponse)
		)
	const [editedDetail, setEditedDetail] = useState<RestaurantDetailType>(
		restaurantDetail?.detail ?? ({} as RestaurantDetailType)
	)
	const [alertState, setAlertState] = useState<{
		open: boolean
		message: string
		severity: "success" | "error"
	}>({
		open: false,
		message: "",
		severity: "success"
	})

	const [updateRestaurant] = useUpdateRestaurantMutation()
	const [updateRestaurantDetails] = useUpdateRestaurantDetailMutation()

	const handleRestaurantChange = useCallback(
		(field: string, value: string) => {
			setEditedRestaurant((prev) => {
				const updatedRestaurant = { ...prev }

				if (field.includes(".")) {
					const [detail, child] = field.split(".")
					updatedRestaurant[detail] = {
						...(prev[detail] || {}),
						[child]: value
					}
				} else {
					updatedRestaurant[field] = value
				}

				return updatedRestaurant
			})
		},
		[editedRestaurant]
	)

	const handleUpdateDetails = useCallback(async () => {
		setIsUpdating(true)
		const restaurantDetails = editedDetail.details
console.log("editedDetail",editedDetail);
		try {
			/* /*  UPDATING RESTAURANT 

			const updatedData = {
				id: editedRestaurant.id,
				data: {
					name: editedRestaurant?.name,
					email: editedRestaurant?.detail?.email,
					phone_no: editedRestaurant?.detail?.phone_no,
					address: editedRestaurant?.detail?.address
				}
			}
			const response = await updateRestaurant(updatedData).unwrap()
			console.log("API Response:", response) */

			/* UPDATING RESTAURANT DETAILS */

			const updatedDetails = {
				id: editedDetail.id,
				data: {
					logo: editedDetail.logo,
					cover_image: editedDetail.cover_image,
					details: {
						wa_api_details: restaurantDetails.wa_api_details,
						platform_reviews: restaurantDetails.platform_reviews,
						platform_details: restaurantDetails.platform_details,
						meta_details: restaurantDetails.meta_details,
						reviews_image_url_details:
							restaurantDetails.reviews_image_url_details
					},
					email: editedRestaurant?.detail?.email,
					phone_no: editedRestaurant?.detail?.phone_no,
					address: editedRestaurant?.detail?.address,
					city: editedRestaurant?.detail?.city,
					state: editedRestaurant?.detail?.state,
					order_count_display: editedRestaurant?.detail?.order_count_display
				}
			}

			const detailsAPI = await updateRestaurantDetails(updatedDetails).unwrap()
			console.log("API Result:", detailsAPI)
			setAlertState({
				open: true,
				message: "Restaurant detail updated successfully!",
				severity: "success"
			})
			console.log("Restaurant Updated Sucessfully")
			onUpdateRestaurants()
		} catch (error) {
			console.log("Failed to update restaurant:", error)
				setAlertState({
				open: true,
				message: "Failed to update Restaurant detail.",
				severity: "error"
			})
		} finally {
			setIsUpdating(false)
		}
	}, [
		editedRestaurant,
		updateRestaurant,
		onUpdateRestaurants,
		editedDetail,
		updateRestaurantDetails
	])
const handleCloseAlert = () => {
		setAlertState((prev) => ({ ...prev, open: false }))
	}

	const onHandleDetailsChange = useCallback(
		(field: string, value: string) => {
			setEditedDetail((prev) => {
				const updatedDetails = { ...prev }

				if (field.includes(".")) {
					const [parent, child, leaf] = field.split(".")

					updatedDetails[parent] = {
						...(prev[parent] || {}),
						[child]: {
							...(prev[parent]?.[child] || {}),
							[leaf]: value
						}
					}
				} else updatedDetails[field] = value

				return updatedDetails
			})
		},
		[editedDetail]
	)

	const onHandlePlatformChange = useCallback(
		(
			index: number,
			arrayName:
				| "platform_details"
				| "platform_reviews"
				| "reviews_image_url_details",
			field: string,
			value: any
		) => {
			setEditedDetail((prev) => {
				const updatedPlatform = [...(prev?.details[arrayName] ?? [])]
				updatedPlatform[index] = { ...updatedPlatform[index], [field]: value }

				return {
					...prev,
					details: {
						...prev.details,
						[arrayName]: updatedPlatform
					}
				}
			})
		},
		[editedDetail.details]
	)
console.log(editedRestaurant);
	return (
		<div>
			<div style={{ display: "flex", alignItems: "center", gap: "30rem" }}>
				<h2>{editedRestaurant?.name}</h2>
			</div>

			<div className="pt-3 ">
				<Grid container spacing={5} mt={5} ml={10} boxShadow={5} padding={4}>
					
					{/*Restaurant Email*/}
					<Grid item xs={5} md={4}>
						<TextField
							label="email"
							fullWidth
							variant="outlined"
							value={editedRestaurant.detail?.email || ""}
							onChange={(e) =>
								handleRestaurantChange("detail.email", e.target.value)
							}
						/>
					</Grid>
					{/*Restaurant Phone Number*/}
					<Grid item xs={5} md={4}>
						<TextField
							label="Mobile Number"
							fullWidth
							variant="outlined"
							value={editedRestaurant.detail?.phone_no}
							onChange={(e) =>
								handleRestaurantChange("detail.phone_no", e.target.value)
							}
						/>
					</Grid>
					{/*Restaurant Address*/}

					<Grid item xs={10} md={4}>
						<TextField
							label="Address"
							fullWidth
							variant="outlined"
							value={editedRestaurant.detail?.address}
							onChange={(e) =>
								handleRestaurantChange("detail.address", e.target.value)
							}
						/>
					</Grid>
					{/*Restaurant City*/}

					<Grid item xs={5} md={4}>
						<TextField
							label="City"
							fullWidth
							variant="outlined"
							value={editedRestaurant.detail?.city}
							onChange={(e) =>
								handleRestaurantChange("detail.city", e.target.value)
							}
						/>
					</Grid>
					{/*Restaurant State*/}
					<Grid item xs={5} md={4}>
						<TextField
							label="State"
							fullWidth
							variant="outlined"
							value={editedRestaurant.detail?.state}
							onChange={(e) =>
								handleRestaurantChange("detail.state", e.target.value)
							}
						/>
					</Grid>
					{/*Restaurant Order Count Display*/}
					<Grid item xs={5} md={4}>
						<TextField
							label="Order Count Display"
							fullWidth
							variant="outlined"
							value={editedRestaurant.detail?.order_count_display}
							onChange={(e) =>
								handleRestaurantChange("detail.order_count_display", e.target.value)
							}
						/>
					</Grid>

					<EditableRestaurantDetails
						detail={editedDetail}
						handleDetailsChange={onHandleDetailsChange}
						handlePlatformChange={onHandlePlatformChange}
					/>
					{/* Save Button */}
					<Grid item xs={10}>
						<Button
							variant="contained"
							color="primary"
							startIcon={
								isUpdating ? (
									<CircularProgress size={20} color="inherit" />
								) : (
									<SaveIcon />
								)
							}
							onClick={handleUpdateDetails}
							disabled={isUpdating}
							sx={{
								minWidth: 250,
								md: 10,
								transition: "translateY(-1px)",
								"&:hover": {
									transform: "translateY(-1px)",
									boxShadow: 3
								}
							}}
						>
							{isUpdating ? "Saving..." : "Update Details"}
						</Button>
					</Grid>
				</Grid>
					<Snackbar
								open={alertState.open}
								autoHideDuration={6000}
								onClose={handleCloseAlert}
								anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
							>
								<Alert
									onClose={handleCloseAlert}
									severity={alertState.severity}
									sx={{ width: "100%" }}
								>
									{alertState.message}
								</Alert>
							</Snackbar>
			</div>
		</div>
	)
}
export default memo(EditableRestaurant)
