"use client"
import { Typography, Grid, CardContent } from "@mui/material"
import PageContainer from "@/components/PageContainer"
import DashboardCard from "@/common/DashboardCard"
import BlankCard from "@/common/BlankCard"

const ProductPage = () => {
	return (
		<PageContainer title="Typography" description="this is Typography">
			<Grid container spacing={3}>
				<Grid item sm={12}>
					<DashboardCard title="Default Text">
						<Grid container spacing={3}>
							<Grid item sm={12}>
								<CardContent>
									<Typography variant="h1">This is Product Page</Typography>
								</CardContent>
							</Grid>
						</Grid>
					</DashboardCard>
				</Grid>
			</Grid>
		</PageContainer>
	)
}

export default ProductPage
