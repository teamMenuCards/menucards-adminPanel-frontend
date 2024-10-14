"use client"
import DashboardCard from "@/common/DashboardCard"
import PageContainer from "@/components/PageContainer"

const Icons = () => {
	return (
		<PageContainer title="Icons" description="this is Icons">
			<DashboardCard title="Icons">
				<iframe
					src="https://tabler-icons.io/"
					title="Inline Frame Example"
					frameBorder={0}
					width="100%"
					height="650"
				></iframe>
			</DashboardCard>
		</PageContainer>
	)
}

export default Icons
