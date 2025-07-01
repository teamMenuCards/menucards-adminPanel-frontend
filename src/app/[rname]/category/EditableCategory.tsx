import React from "react"
import { Category } from "@/services/get-menu-list"
import { UpdateCategoryRequest } from "@/services/update-category"
import {
	Accordion,
	AccordionSummary,
	AccordionDetails,
} from "@mui/material"
import {
	Grid,
	TextField,
	Button,
	CircularProgress,
	RadioGroup,
	FormControlLabel,
	Radio
} from "@mui/material"
import SaveIcon from "@mui/icons-material/Save"
import { useState, useEffect, useCallback } from "react"
import { ExpandMore as ExpandMoreIcon } from "@mui/icons-material"
import { TimeFromPicker, TimeToPicker } from "./Timepicker"
import { useUpdateCategoryMutation } from "@/services/update-category"
import MuiAlert, { AlertProps } from "@mui/material/Alert"
import { Snackbar, SnackbarCloseReason } from "@mui/material"


interface EditableCategoryProps {
	sections?: Category[]
	onUpdateCategory: () => void
}

const EditableCategory: React.FC<EditableCategoryProps> = ({
	sections,
	onUpdateCategory
}) => {
	const [editedCategories, setEditedCategories] = useState<Category[]>([])
	const [expanded, setExpanded] = useState(true)
	const [updateCategory] = useUpdateCategoryMutation()
	const [categoryUpdating, setCategoryUpdating] = useState<{[key: string]: boolean}>({})
	const [snackbarOpen, setSnackbarOpen] = useState(false)
	const [snackbarMessage, setSnackbarMessage] = useState("")

	useEffect(() => {
		sections?.length ? setEditedCategories(sections) : null
	}, [sections])
	

	const Alert = React.forwardRef<HTMLDivElement, AlertProps>(function Alert(
		props,
		ref
	) {
		return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />
	})

	/* to update */

	const handleSaveCategory = useCallback(
		async (categoryId: string) => {
			const categoryToUpdate = editedCategories.find(
				(cat) => cat.id === categoryId
			)
			if (!categoryToUpdate) return

			setCategoryUpdating((prev) => ({ ...prev, [categoryId]: true }))

			try {
				const updateData: UpdateCategoryRequest = {
					name: categoryToUpdate.display_name,
					active: categoryToUpdate.active,
					display_name: categoryToUpdate.display_name,
					description: categoryToUpdate?.description || null,
					image_url: categoryToUpdate?.image_url?.trim() || null,
					display_order: Number(categoryToUpdate.display_order),
					available_from: categoryToUpdate.available_from || "00:00:00",
					available_to: categoryToUpdate.available_to || "23:59:00",
					parent_id: categoryToUpdate.parent_category_id || undefined
				}
                
				/* console.log("Sending to API", {
					id: categoryId,
					data: updateData
				}) */

				await updateCategory({ id: categoryId, data: updateData }).unwrap()

				setSnackbarMessage("Category updated successfully!")
				setSnackbarOpen(true)
				onUpdateCategory()
			} catch (error) {
				console.error("Failed to update category:", error)
				setSnackbarMessage("Failed to update category.")
				setSnackbarOpen(true)
			} finally {
				setCategoryUpdating((prev) => ({ ...prev, [categoryId]: false }))
			}
		},
		[editedCategories, updateCategory, onUpdateCategory]
	)

	const handleCategoryChange = useCallback(
		(categoryId: string, field: string, value: string | boolean) => {
			setEditedCategories((prev) =>
				prev.map((category) =>
					category.id === categoryId
						? { ...category, [field]: value } // ✅ dynamic field update
						: category
				)
			)
		},
		[]
	)
	const handleTimeChange = (
		categoryId: string,
		field: string,
		newTime: string
	) => {
		console.log(typeof newTime, newTime)
		setEditedCategories((prev) =>
			prev.map((cat) =>
				cat.id === categoryId ? { ...cat, [field]: newTime } : cat
			)
		)
	}
	const handleSnackbarClose = useCallback(
		(
			event: Event | React.SyntheticEvent<any, Event>,
			reason?: SnackbarCloseReason
		) => {
			if (reason === "clickaway") {
				return
			}
			setSnackbarOpen(false)
		},
		[]
	)
	return (
		<div className="w-full mx-auto space-y-2 pb-6">
			{editedCategories.map((section, index) => (
				<Accordion
					key={section.id}
					expanded={expanded}
					onChange={() => setExpanded(!expanded)}
					sx={{
						boxShadow: 3,
						"&:before": { display: "none" },
						borderRadius: 2,
						overflow: "hidden",
						marginBottom: "10px"
					}}
				>
					<AccordionSummary
						expandIcon={<ExpandMoreIcon />}
						sx={{
							backgroundColor: "#f8fafc",
							borderBottom: expanded ? "1px solid #e2e8f0" : "none",

							"& .MuiAccordionSummary-content": { alignItems: "center" }
						}}
					>
						<div
							style={{ display: "flex", alignItems: "center", gap: "30rem" }}
						>
							<h2>{section.name}</h2>
						</div>
					</AccordionSummary>
					{expanded && (
						<AccordionDetails
							sx={{
								md: 15
							}}
						>
							<div className="pt-1 ">
								<Grid container spacing={5} mt={1} ml={10}>
									{/* Category State */}

									<Grid item xs={12}>
										<RadioGroup
											row
											aria-label="category-type"
											name="category-type"
											value={section.active ? "active" : "in-active"}
										>
											<FormControlLabel
												value="active"
												control={
													<Radio
														checked={section?.active === true}
														onChange={() =>
															handleCategoryChange(section.id, "active", true)
														}
													/>
												}
												label="Active"
											/>
											<FormControlLabel
												value="in-active"
												control={
													<Radio
														checked={section?.active === false}
														onChange={() =>
															handleCategoryChange(section.id, "active", false)
														}
													/>
												}
												label="InActive"
											/>
										</RadioGroup>
									</Grid>

									{/*Category Name*/}

									<Grid item xs={8} md={5}>
										<TextField
											label="Category Name"
											fullWidth
											variant="outlined"
											value={section.display_name || ""}
											onChange={(e) =>
												handleCategoryChange(
													section.id,
													"display_name",
													e.target.value
												)
											}
										/>
									</Grid>

									{/*Display Order*/}

									<Grid item xs={8} md={5}>
										<TextField
											label="Display Order"
											fullWidth
											variant="outlined"
											value={section.display_order || ""}
											onChange={(e) =>
												handleCategoryChange(
													section.id,
													"display_order",
													e.target.value
												)
											}
										/>
									</Grid>

									{/*Available from */}

									<Grid item xs={8} md={5}>
										<TimeFromPicker
											available_from={section.available_from}
											onChange={(newTime) =>
												handleTimeChange(section.id, "available_from", newTime)
											}
										/>
									</Grid>

									{/*Available to*/}

									<Grid item xs={8} md={5}>
										<TimeToPicker
											available_to={section.available_to}
											onChange={(newTime) =>
												handleTimeChange(section.id, "available_to", newTime)
											}
										/>
									</Grid>

									{/*Image URL*/}

									<Grid item xs={8} md={10}>
										<TextField
											label="Image URL"
											fullWidth
											variant="outlined"
											value={section.image_url || ""}
											onChange={(e) =>
												handleCategoryChange(
													section.id,
													"image_url",
													e.target.value
												)
											}
										/>
									</Grid>

									{/* Save Button */}

									<Grid item xs={10}>
										<Button
											variant="contained"
											color="primary"
											startIcon={
												categoryUpdating[section.id] ? (
													<CircularProgress size={16} color="inherit" />
												) : (
													<SaveIcon />
												)
											}
											onClick={(e) => {
												e.stopPropagation()
												handleSaveCategory(section.id)
											}}
											disabled={categoryUpdating[section.id]}
											sx={{
												minWidth: 250,
												md: 10,
												mb: 4,
												transition: "translateY(-1px)",
												"&:hover": {
													transform: "translateY(-1px)",
													boxShadow: 3
												}
											}}
										>
											{categoryUpdating[section.id]
												? "Saving..."
												: "Update Details"}
										</Button>
									</Grid>
								</Grid>
							</div>
						</AccordionDetails>
					)}
				</Accordion>
			))}
			<Snackbar
				open={snackbarOpen}
				autoHideDuration={2000}
				onClose={handleSnackbarClose}
				anchorOrigin={{ vertical: "top", horizontal: "center" }}
			>
				<Alert onClose={handleSnackbarClose} severity="success">
					{snackbarMessage}
				</Alert>
			</Snackbar>
		</div>
	)
}

export default EditableCategory
