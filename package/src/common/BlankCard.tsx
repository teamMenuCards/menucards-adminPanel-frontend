import PageContainer from "@/components/PageContainer"
import { Card } from "@mui/material"
import DashboardCard from "./DashboardCard"

type Props = {
	className?: string
	children: JSX.Element | JSX.Element[]
}

const BlankCard = ({ children, className }: Props) => {
	return (
		<PageContainer title="Sample Page" description="this is Sample page">
			<DashboardCard title="Sample Page">
				<Card
					sx={{ p: 0, position: "relative" }}
					className={className}
					elevation={9}
					variant={undefined}
				>
					{children}
				</Card>
			</DashboardCard>
		</PageContainer>
	)
}

export default BlankCard
