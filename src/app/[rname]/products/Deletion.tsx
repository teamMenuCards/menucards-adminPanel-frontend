import React, { useState } from "react"
import { IconButton, Snackbar, Alert,CircularProgress } from "@mui/material"
import DeleteIcon from "@mui/icons-material/Delete"
import { motion, AnimatePresence } from "framer-motion"
import { useDeleteProductMutation } from "@/services/delete-product"
import { useDeleteProductDetailMutation } from "@/services/delete-product-details"
import { useGetMenuListByNameQuery } from "@/services/get-menu-list"
import { useParams } from "next/navigation"


export interface deleteProps {
	productId: string
	productDetailId: string
}

export default function AnimatedDeleteIcon({ productId, productDetailId }) {
	const [deleted,setDeleted]= useState(false);
	const { rname } = useParams<{ rname: string }>()
	const { refetch } = useGetMenuListByNameQuery(rname)
	const [showSnackbar, setShowSnackbar] = useState(false);
	const [isRefreshing, setIsRefreshing] = useState(false);
	const [deleteProductDetail] = useDeleteProductDetailMutation()
	const [deleteProduct] = useDeleteProductMutation()

	const handleDelete = async () => {
	
try {
		await deleteProductDetail({
			id: productDetailId
		}).unwrap()
		await deleteProduct({
			id: productId
		}).unwrap()
		setShowSnackbar(true);
		setDeleted(true);
		setIsRefreshing(true); 
		setTimeout(async () => {
			await refetch();        
			setIsRefreshing(false); 
		}, 1000);
	} catch (error) {
		console.error("Delete failed", error);
	}
	}

	return (
		<>
			{!deleted && (<AnimatePresence>
				<motion.div
					key="delete-btn"
					initial={{ opacity: 0, scale: 0.6 }}
					animate={{ opacity: 1, scale: 1 }}
					whileHover={{ scale: 1.2, rotate: -10 }}
					whileTap={{ scale: 0.85, rotate: 10 }}
					exit={{ opacity: 0, scale: 0.3, rotate: 45 }}
					transition={{ duration: 0.3 }}
				>
					<IconButton
						color="error"
						onClick={handleDelete}
						aria-label="delete"
						size="large"
					>
						<DeleteIcon fontSize="inherit" />
					</IconButton>
				</motion.div>
			</AnimatePresence>)}
{isRefreshing && (
	<div className="flex items-center gap-2 text-blue-500 mt-2">
		<CircularProgress size={30} />
	</div>
)}

			<Snackbar
				open={showSnackbar}
				autoHideDuration={3000}
				onClose={() => setShowSnackbar(false)}
				anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
			>
				<Alert
					onClose={() => setShowSnackbar(false)}
					severity="success"
					variant="filled"
				>
					Item deleted successfully!
				</Alert>
			</Snackbar>
		</>
	)
}
