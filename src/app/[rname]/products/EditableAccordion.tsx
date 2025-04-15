import React, { useState, useEffect, useCallback, memo } from "react"
import EditableMenuItem from "./EditableMenuItem"
import { Category } from "@/services/get-menu-list"
import {
	Accordion,
	AccordionSummary,
	AccordionDetails,
	TextField,
	IconButton,
	InputAdornment
} from "@mui/material"
import {
	ExpandMore as ExpandMoreIcon,
	ExpandLess as ExpandLessIcon,
	Edit as EditIcon
} from "@mui/icons-material"
import { Button, CircularProgress } from "@mui/material"
import SaveIcon from "@mui/icons-material/Save"
import { useUpdateCategoryMutation } from "@/services/update-category"
import MuiAlert, { AlertProps } from "@mui/material/Alert"
import { Snackbar, SnackbarCloseReason } from "@mui/material"

interface EditableAccordionProps {
	sections?: Category[]
	onUpdateProducts: () => void
}

const MemoizedEditableMenuItem = memo(EditableMenuItem)

const ProductAccordion = memo(
	({
		item,
		isOpen,
		categoryId,
		productIndex,
		toggleProductSection
	}: {
		item: any
		isOpen: boolean
		categoryId: string
		productIndex: number
		toggleProductSection: (categoryId: string, productIndex: number) => void
	}) => {
		return (
			<Accordion
				key={item.id}
				expanded={isOpen}
				sx={{
					boxShadow: 1,
					"&:before": { display: "none" },
					borderRadius: 1,
					overflow: "hidden"
				}}
			>
				<AccordionSummary
					expandIcon={
						<IconButton
							onClick={(e) => {
								e.stopPropagation()
								toggleProductSection(categoryId, productIndex)
							}}
						>
							{isOpen ? <ExpandLessIcon /> : <ExpandMoreIcon />}
						</IconButton>
					}
					sx={{
						backgroundColor: "#f8fafc",
						borderBottom: isOpen ? "1px solid #e2e8f0" : "none",
						"& .MuiAccordionSummary-content": { alignItems: "center" }
					}}
				>
					<div className="flex items-center w-full">
						<div
							className="w-4 h-4 rounded-full mr-2"
							style={{
								backgroundColor: item.variants?.[0]?.is_veg
									? "#22c55e"
									: "#ef4444"
							}}
						/>
						<span className="font-medium">{item.name}</span>
					</div>
				</AccordionSummary>

				<AccordionDetails>
					<MemoizedEditableMenuItem product={item} />
				</AccordionDetails>
			</Accordion>
		)
	}
)

const CategoryNameEditor = memo(
	({
		section,
		handleCategoryNameChange,
		hoveredCategoryId,
		setHoveredCategoryId,
		focusedCategoryId,
		setFocusedCategoryId
	}: {
		section: Category
		handleCategoryNameChange: (categoryId: string, newName: string) => void
		hoveredCategoryId: string | null
		setHoveredCategoryId: (id: string | null) => void
		focusedCategoryId: string | null
		setFocusedCategoryId: (id: string | null) => void
	}) => {
		return (
			<TextField
				value={section.display_name}
				onChange={(e) => handleCategoryNameChange(section.id, e.target.value)}
				variant="standard"
				InputProps={{
					startAdornment: (
						<InputAdornment position="start">
							<EditIcon
								fontSize="small"
								sx={{
									color: "action.active",
									opacity:
										hoveredCategoryId === section.id ||
										focusedCategoryId === section.id
											? 1
											: 1,
									transition: "opacity 0.2s"
								}}
							/>
						</InputAdornment>
					),
					disableUnderline: true,
					sx: {
						fontSize: "1.125rem",
						fontWeight: 500,
						"&:hover:before": {
							borderBottom: "1px solid rgba(0, 0, 0, 0.42)"
						}
					}
				}}
				sx={{
					flexGrow: 1,
					mr: 2,
					"& .MuiInput-root": {
						cursor: "text"
					}
				}}
				onMouseEnter={() => setHoveredCategoryId(section.id)}
				onMouseLeave={() => setHoveredCategoryId(null)}
				onFocus={() => setFocusedCategoryId(section.id)}
				onBlur={() => setFocusedCategoryId(null)}
				onClick={(e) => e.stopPropagation()}
			/>
		)
	}
)

const EditableAccordion: React.FC<EditableAccordionProps> = ({
	sections = [],
	onUpdateProducts
}) => {
	const [openIndexes, setOpenIndexes] = useState<number[]>([])
	const [editedCategories, setEditedCategories] = useState<Category[]>([])
	const [openProductIndexes, setOpenProductIndexes] = useState<{
		[categoryId: string]: number[]
	}>({})
	const [hoveredCategoryId, setHoveredCategoryId] = useState<string | null>(
		null
	)
	const [focusedCategoryId, setFocusedCategoryId] = useState<string | null>(
		null
	)
	const [categoryUpdating, setCategoryUpdating] = useState<{
		[key: string]: boolean
	}>({})
	const [updateCategory] = useUpdateCategoryMutation()
	const [snackbarOpen, setSnackbarOpen] = useState(false)
	const [snackbarMessage, setSnackbarMessage] = useState("")

	const Alert = React.forwardRef<HTMLDivElement, AlertProps>(function Alert(
		props,
		ref
	) {
		return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />
	})

	const handleSaveCategory = useCallback(
		async (categoryId: string) => {
			// Find the category to update
			const categoryToUpdate = editedCategories.find(
				(cat) => cat.id === categoryId
			)
			if (!categoryToUpdate) return

			// Set updating state for this category
			setCategoryUpdating((prev) => ({ ...prev, [categoryId]: true }))

			try {
				// Prepare the data object according to your API requirements
				const updateData = {
					name: categoryToUpdate.display_name,
					active: categoryToUpdate.active,
					display_name: categoryToUpdate.display_name,
					description: categoryToUpdate.description || null,
					image_url: categoryToUpdate.image_url || null,
					display_order: categoryToUpdate.display_order,
					available_from: categoryToUpdate.available_from,
					available_to: categoryToUpdate.available_to,
					parent_id: categoryToUpdate.parent_category_id || undefined
				}

				// Call the update mutation
				await updateCategory({
					id: categoryId,
					data: updateData
				}).unwrap()

				setSnackbarMessage("Category updated successfully!")
				setSnackbarOpen(true)

				// Notify parent component that products were updated
				onUpdateProducts()
			} catch (error) {
				console.error("Failed to update category:", error)
				// Optionally add error handling UI
			} finally {
				setCategoryUpdating((prev) => ({ ...prev, [categoryId]: false }))
			}
		},
		[editedCategories, updateCategory, onUpdateProducts]
	)

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

	useEffect(() => {
		if (sections.length) {
			setEditedCategories(sections)

			// Initialize product indexes as empty arrays (all closed by default)
			const initialProductIndexes: { [categoryId: string]: number[] } = {}
			sections.forEach((category) => {
				initialProductIndexes[category.id] = []
			})
			setOpenProductIndexes(initialProductIndexes)
		}
	}, [sections])

	// Only initialize open indexes once
	useEffect(() => {
		if (sections.length && openIndexes.length === 0) {
			setOpenIndexes(sections.map((_, index) => index))
		}
	}, [sections, openIndexes.length])

	const toggleSection = useCallback((index: number) => {
		setOpenIndexes((prev) =>
			prev.includes(index) ? prev.filter((i) => i !== index) : [...prev, index]
		)
	}, [])

	const toggleProductSection = useCallback(
		(categoryId: string, productIndex: number) => {
			setOpenProductIndexes((prev) => {
				const currentOpenProducts = prev[categoryId] || []
				return {
					...prev,
					[categoryId]: currentOpenProducts.includes(productIndex)
						? currentOpenProducts.filter((i) => i !== productIndex)
						: [...currentOpenProducts, productIndex]
				}
			})
		},
		[]
	)

	const handleCategoryNameChange = useCallback(
		(categoryId: string, newName: string) => {
			setEditedCategories((prev) =>
				prev.map((category) =>
					category.id === categoryId
						? { ...category, display_name: newName }
						: category
				)
			)
		},
		[]
	)

	return (
		<div className="w-full mx-auto space-y-2 pb-6">
			{editedCategories.map((section, index) => (
				<Accordion
					key={section.id}
					expanded={openIndexes.includes(index)}
					sx={{
						boxShadow: 3,
						"&:before": { display: "none" },
						borderRadius: 2,
						overflow: "hidden",
						marginBottom: "10px"
					}}
				>
					<AccordionSummary
						expandIcon={
							<IconButton onClick={() => toggleSection(index)}>
								{openIndexes.includes(index) ? (
									<ExpandLessIcon />
								) : (
									<ExpandMoreIcon />
								)}
							</IconButton>
						}
						sx={{
							backgroundColor: "#f8fafc",
							borderBottom: openIndexes.includes(index)
								? "1px solid #e2e8f0"
								: "none",
							"& .MuiAccordionSummary-content": { alignItems: "center" }
						}}
					>
						<CategoryNameEditor
							section={section}
							handleCategoryNameChange={handleCategoryNameChange}
							hoveredCategoryId={hoveredCategoryId}
							setHoveredCategoryId={setHoveredCategoryId}
							focusedCategoryId={focusedCategoryId}
							setFocusedCategoryId={setFocusedCategoryId}
						/>

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
								minWidth: 160,
								ml: 2,
								transition: "all 0.3s ease",
								"&:hover": {
									transform: "translateY(-1px)",
									boxShadow: 3
								}
							}}
						>
							{categoryUpdating[section.id] ? "Saving..." : "Save"}
						</Button>
					</AccordionSummary>

					<AccordionDetails
						sx={{
							backgroundColor: "white",
							pt: 2,
							display: "flex",
							flexDirection: "column",
							gap: "16px",
							pb: 2
						}}
					>
						{openIndexes.includes(index) &&
							section.products.map((item, productIndex, arrays) => {
								return (
									<ProductAccordion
										key={item.id}
										item={item}
										isOpen={
											openProductIndexes[section.id]?.includes(productIndex) ||
											false
										}
										categoryId={section.id}
										productIndex={productIndex}
										toggleProductSection={toggleProductSection}
									/>
								)
							})}
					</AccordionDetails>
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

export default EditableAccordion
