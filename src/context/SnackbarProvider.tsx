import React, {
	useState,
	useContext,
	createContext,
	ReactNode,
	useCallback
} from "react"
import { Button, Link, Snackbar, SnackbarContent } from "@mui/material"
import NextLink from "next/link"
import { useTheme, styled } from "@mui/material/styles"

interface SnackbarContextType {
	showSnackbar: (data: { message: string; variant: string }) => void
	hideSnackbar: () => void
}

const contextDefaults: SnackbarContextType = {
	showSnackbar: () => {},
	hideSnackbar: () => {}
}

const SnackbarContext = createContext<SnackbarContextType>(contextDefaults)
const useSnackbarContext = () => useContext(SnackbarContext)

interface SnackbarProviderProps {
	children: ReactNode
}

export const SnackbarProvider: React.FC<SnackbarProviderProps> = ({
	children
}) => {
	const theme = useTheme()

	const [open, setOpen] = useState(false)
	const [state, setState] = useState({ message: "", variant: "default" })

	const CustomSnackbarContent = styled(SnackbarContent)<{ bgcolor?: string }>(
		({ theme, bgcolor }) => ({
			backgroundColor: bgcolor || theme.palette.primary.main,
			color: theme.palette.getContrastText(
				bgcolor || theme.palette.primary.main
			),
			position: "relative",
			animation: "scaleSnackbar 0.5s ease-in-out",
			"& .MuiSnackbarContent-message": {
				animation: "scaleText 0.5s ease-in-out"
			}
		})
	)

	// Action inside Snackbar
	const action = (
		<Button sx={{ fontSize: "12px" }} color="inherit">
			<Link href={"/cart"} component={NextLink} underline="none" color="white">
				Go to cart
			</Link>
		</Button>
	)

	// Function to show the Snackbar
	const showSnackbar = useCallback(
		(data: { message: string; variant: string }) => {
			setState((prevState) => ({
				...prevState,
				message: data.message,
				variant: data.variant
			}))
			setOpen(true) // Show the Snackbar
		},
		[]
	)

	// Function to hide the Snackbar
	const hideSnackbar = useCallback(() => {
		setOpen(false)
	}, [])

	// Handle close event (also triggers hideSnackbar)
	const handleClose = (
		event?: React.SyntheticEvent | Event,
		reason?: string
	) => {
		if (reason === "clickaway") {
			return
		}
		hideSnackbar()
	}

	return (
		<SnackbarContext.Provider value={{ showSnackbar, hideSnackbar }}>
			{children}
			<Snackbar
				open={open}
				autoHideDuration={4000} // Auto hide after 4 seconds
				onClose={handleClose} // Close handler
				anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
			>
				<CustomSnackbarContent message={state.message} />
			</Snackbar>
		</SnackbarContext.Provider>
	)
}

export default useSnackbarContext
