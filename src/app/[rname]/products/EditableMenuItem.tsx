import { useState, memo, useCallback } from "react"
import { ProductType, ProductVariantType } from "@/types"
import {
	TextField,
	RadioGroup,
	FormControlLabel,
	Radio,
	Grid,
	InputAdornment,
	Switch,
	Typography,
	FormGroup,
	Snackbar,
	Alert
} from "@mui/material"
import SaveIcon from "@mui/icons-material/Save"
import { Button, CircularProgress } from "@mui/material"
import { useUpdateProductMutation } from "@/services/update-product"
import { useUpdateProductBaseMutation } from "@/services/update-product-base"

function EditableMenuItem({
	product: initialProduct
}: {
	product: ProductType & { variants: ProductVariantType[] }
}) {
	const [isUpdating, setIsUpdating] = useState(false)
	const [product, setProduct] = useState<
		ProductType & { variants: ProductVariantType[] }
	>(JSON.parse(JSON.stringify(initialProduct)))
	const [alertState, setAlertState] = useState<{
		open: boolean
		message: string
		severity: "success" | "error"
	}>({
		open: false,
		message: "",
		severity: "success"
	})

	// APIs
	const [updateProductBase] = useUpdateProductBaseMutation()
	const [updateProduct] = useUpdateProductMutation()

	const handleProductChange = useCallback(
		(field: string, value: string | boolean) => {
			setProduct((prev) => ({ ...prev, [field]: value }))
		},
		[]
	)

	// const handleVariantChange = useCallback(
	// 	(field: string, value: string | boolean | number) => {
	// 		if (!product.variants?.length) return

	// 		setProduct((prev) => {
	// 			const updatedVariants = { ...product.variants, [field]: value }
	// 			return { ...prev, variants: updatedVariants }
	// 		})
	// 	},
	// 	[product.variants]
	// )

	const handleVariantChange = useCallback(
		(field: string, value: string | boolean | number, selectedVariant) => {
			if (!product.variants?.length) return

			setProduct((prev) => {
				const updatedVariants = prev.variants.map((variant) => {
					if (variant.id === selectedVariant.id) {
						return { ...variant, [field]: value }
					}
					return variant
				})

				return { ...prev, variants: updatedVariants }
			})
		},
		[product.variants]
	)

	const handleUpdateProduct = useCallback(async () => {
		setIsUpdating(true)
		try {
			await updateProductBase({
				id: product.id,
				data: {
					name: product.name,
					description: product.description,
					is_featured: product.is_featured
				}
			}).unwrap()

			// Loop through and update each variant
			await Promise.all(
				product.variants.map((variant) =>
					updateProduct({
						id: variant.id,
						data: {
							variant_name: variant.variant_name,
							is_veg: variant.is_veg,
							contains_egg: variant.contains_egg,
							price: Number(variant.price),
							discounted_price: variant.discounted_price
								? Number(variant.discounted_price)
								: null,
							image_url: variant.image_url,
							preparation_time_minutes:
								variant.preparation_time_minutes ?? null,
							allergens: variant.allergens ?? null,
							dietary_info: variant.dietary_info ?? null,
							calories: variant.calories ?? null,
							spiciness: variant.spiciness ?? null,
							ingredients: variant.ingredients ?? null
						}
					}).unwrap()
				)
			)

			setAlertState({
				open: true,
				message: "Product and all variants updated successfully!",
				severity: "success"
			})
		} catch (error) {
			console.error("Failed to update product and variants:", error)
			setAlertState({
				open: true,
				message: "Failed to update product and/or variants.",
				severity: "error"
			})
		} finally {
			setIsUpdating(false)
		}
	}, [product])

	const handleCloseAlert = () => {
		setAlertState((prev) => ({ ...prev, open: false }))
	}

	return (
		<div className="pt-2">
			<Grid container spacing={3}>
				{/* Product Name (Main Product) */}
				<Grid item xs={12}>
					<TextField
						label="Product Name"
						fullWidth
						variant="outlined"
						value={product.name || ""}
						onChange={(e) => handleProductChange("name", e.target.value)}
					/>
				</Grid>

				<Grid item xs={12} sx={{ display: "flex", alignItems: "center" }}>
					<FormGroup>
						<FormControlLabel
							control={
								<Switch
									checked={product.is_featured || false}
									onChange={(e) =>
										handleProductChange("is_featured", e.target.checked)
									}
									color="primary"
								/>
							}
							label={
								<Typography
									variant="body1"
									sx={{
										fontWeight: product.is_featured ? "bold" : "normal"
									}}
								>
									{product.is_featured ? "Featured Item ⭐" : "Not Featured"}
								</Typography>
							}
						/>
					</FormGroup>
				</Grid>
				{/* Description */}
				<Grid item xs={12}>
					<TextField
						label="Description"
						fullWidth
						multiline
						rows={3}
						variant="outlined"
						value={product.description || ""}
						onChange={(e) => handleProductChange("description", e.target.value)}
					/>
				</Grid>
				{product.variants &&
					product.variants.length &&
					product?.variants?.map((variant) => {
						return (
							<>
								{/* Product Type */}
								<Grid item xs={12}>
									<RadioGroup
										row
										aria-label="product-type"
										name="product-type"
										value={variant?.is_veg ? "veg" : "non-veg"}
									>
										<FormControlLabel
											value="veg"
											control={
												<Radio
													checked={variant?.is_veg === true}
													onChange={() =>
														handleVariantChange("is_veg", true, variant)
													}
												/>
											}
											label="Veg"
										/>
										<FormControlLabel
											value="non-veg"
											control={
												<Radio
													checked={variant?.is_veg === false}
													onChange={() =>
														handleVariantChange("is_veg", false, variant)
													}
												/>
											}
											label="Non-Veg"
										/>
									</RadioGroup>
								</Grid>

								{/* Variant Name */}
								<Grid item xs={12} md={8}>
									<TextField
										label="Variant Name"
										fullWidth
										variant="outlined"
										value={variant.variant_name || ""}
										onChange={(e) => {
											handleVariantChange(
												"variant_name",
												e.target.value,
												variant
											)
											// handleProductChange("name", e.target.value)
										}}
									/>
								</Grid>

								{/* Price */}
								<Grid item xs={12} md={4}>
									<TextField
										label="Price (₹)"
										fullWidth
										type="number"
										variant="outlined"
										value={variant.price || ""}
										onChange={(e) =>
											handleVariantChange(
												"price",
												parseFloat(e.target.value),
												variant
											)
										}
										InputProps={{
											startAdornment: (
												<InputAdornment position="start">₹</InputAdornment>
											)
										}}
									/>
								</Grid>

								{/* Image URL */}
								<Grid item xs={12}>
									<TextField
										label="Image URL"
										fullWidth
										variant="outlined"
										value={variant.image_url || ""}
										onChange={(e) =>
											handleVariantChange("image_url", e.target.value, variant)
										}
									/>
								</Grid>

								{/* Individual save button */}
							</>
						)
					})}

				<Grid item xs={12}>
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
						onClick={handleUpdateProduct}
						disabled={isUpdating}
						sx={{
							minWidth: 200,
							transition: "all 0.3s ease",
							"&:hover": {
								transform: "translateY(-1px)",
								boxShadow: 3
							}
						}}
					>
						{isUpdating ? "Saving..." : "Update Product"}
					</Button>
				</Grid>
				{/* Featured Toggle */}
			</Grid>

			{/* Alert for success/error messages */}
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
	)
}

export default memo(EditableMenuItem)
