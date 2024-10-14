"use client"
import { Grid, Box } from "@mui/material"
// components
import SalesOverview from "@/app/(dashboard)/dashboard/SalesOverview"
import YearlyBreakup from "@/app/(dashboard)/dashboard/YearlyBreakup"
import RecentTransactions from "@/app/(dashboard)/dashboard/RecentTransactions"
import ProductPerformance from "@/app/(dashboard)/dashboard/ProductPerformance"
import Blog from "@/app/(dashboard)/dashboard/Blog"
import MonthlyEarnings from "@/app/(dashboard)/dashboard/MonthlyEarnings"
import PageContainer from "@/components/PageContainer"

const Dashboard = () => {
	return (
		<PageContainer title="Dasjhhboard" description="this is Dashboard">
			<Box>
				<Grid container spacing={3}>
					<Grid item xs={12} lg={8}>
						<SalesOverview />
					</Grid>
					<Grid item xs={12} lg={4}>
						<Grid container spacing={3}>
							<Grid item xs={12}>
								<YearlyBreakup />
							</Grid>
							<Grid item xs={12}>
								<MonthlyEarnings />
							</Grid>
						</Grid>
					</Grid>
					<Grid item xs={12} lg={4}>
						<RecentTransactions />
					</Grid>
					<Grid item xs={12} lg={8}>
						<ProductPerformance />
					</Grid>
					<Grid item xs={12}>
						<Blog />
					</Grid>
				</Grid>
			</Box>
		</PageContainer>
	)
}

export default Dashboard
