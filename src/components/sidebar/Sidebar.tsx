import { useMediaQuery, Box, Drawer, Typography, useTheme } from "@mui/material"
import SidebarItems from "./SidebarItems"
import { Upgrade } from "./Updrade"
import { Sidebar, Logo } from "react-mui-sidebar"

interface ItemType {
	isMobileSidebarOpen: boolean
	onSidebarClose: (event: React.MouseEvent<HTMLElement>) => void
	isSidebarOpen: boolean
}

const MSidebar = ({
	isMobileSidebarOpen,
	onSidebarClose,
	isSidebarOpen
}: ItemType) => {
	const theme = useTheme()
	const lgUp = useMediaQuery((theme: any) => theme.breakpoints.up("lg"))

	const sidebarWidth = "270px"

	// Custom CSS for short scrollbar
	const scrollbarStyles = {
		"&::-webkit-scrollbar": {
			width: "7px"
		},
		"&::-webkit-scrollbar-thumb": {
			backgroundColor: "#eff2f7",
			borderRadius: "15px"
		}
	}

	if (lgUp) {
		return (
			<Box
				sx={{
					width: sidebarWidth,
					flexShrink: 0
				}}
			>
				{/* ------------------------------------------- */}
				{/* Sidebar for desktop */}
				{/* ------------------------------------------- */}
				<Drawer
					anchor="left"
					// onClose={}
					open={isSidebarOpen}
					variant="permanent"
					PaperProps={{
						sx: {
							boxSizing: "border-box",
							...scrollbarStyles
						}
					}}
				>
					{/* ------------------------------------------- */}
					{/* Sidebar Box */}
					{/* ------------------------------------------- */}
					<Box
						sx={{
							height: "100%"
						}}
					>
						<Sidebar
							width={"270px"}
							collapsewidth="80px"
							// open={isSidebarOpen} //TOCHECK
							themeColor="#5d87ff"
							themeSecondaryColor="#49beff"
							showProfile={false}
						>
							<Typography
								sx={{ px: 5, pt: 3 }}
								variant="h2"
								color="textSecondary"
							>
								MenuCards
							</Typography>
							{/* ------------------------------------------- */}
							{/* Logo */}
							{/* ------------------------------------------- */}
							{/* <Logo img="/images/logos/dark-logo.svg" /> */}
							<Box>
								{/* ------------------------------------------- */}
								{/* Sidebar Items */}
								{/* ------------------------------------------- */}
								<SidebarItems />
								<Upgrade />
							</Box>
						</Sidebar>
					</Box>
				</Drawer>
			</Box>
		)
	}

	return (
		<Drawer
			anchor="right"
			open={false}
			onClose={onSidebarClose}
			variant="temporary"
			PaperProps={{
				sx: {
					boxShadow: (theme) => theme.shadows[8],
					...scrollbarStyles
				}
			}}
		>
			{/* ------------------------------------------- */}
			{/* Sidebar Box */}
			{/* ------------------------------------------- */}
			<Box px={2}>
				<Sidebar
					width={"270px"}
					collapsewidth="80px"
					isCollapse={false}
					mode="light"
					direction="ltr"
					themeColor="#5d87ff"
					themeSecondaryColor="#49beff"
					showProfile={false}
				>
					{/* ------------------------------------------- */}
					{/* Logo */}
					{/* ------------------------------------------- */}
					{/* <Logo img="/images/logos/dark-logo.svg" /> */}
					{/* ------------------------------------------- */}
					{/* Sidebar Items */}
					{/* ------------------------------------------- */}
					<SidebarItems />
					<Upgrade />
				</Sidebar>
			</Box>
			{/* ------------------------------------------- */}
			{/* Sidebar For Mobile */}
			{/* ------------------------------------------- */}
		</Drawer>
	)
}

export default MSidebar
