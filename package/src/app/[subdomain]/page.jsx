"use client"

import { useParams } from "next/navigation"
import { Typography, Grid, CardContent } from "@mui/material"
import PageContainer from "@/components/PageContainer"
import DashboardCard from "@/common/DashboardCard"

/* This route is for Subdomians pages  */
export default function Component() {
	const params = useParams()
	const tenant = params.subdomain
	console.log(tenant)

	return (
		<PageContainer title="Typography" description="this is Typography">
			<Grid container spacing={3}>
				<Grid item sm={12}>
					<DashboardCard title="Default Text">
						<Grid container spacing={3}>
							<Grid item sm={12}>
								<CardContent>
									<Typography variant="h1">This is {tenant} Page</Typography>
								</CardContent>
							</Grid>
						</Grid>
					</DashboardCard>
				</Grid>
			</Grid>
		</PageContainer>
	)
}
