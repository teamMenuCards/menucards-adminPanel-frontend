"use client"
import { ThemeProvider } from "@mui/material/styles"
import CssBaseline from "@mui/material/CssBaseline"
import { baselightTheme } from "@/ThemeRegistry/theme"
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import { useState } from "react"
import { SnackbarProvider } from "@/context"

export default function RootLayout({
	children
}: {
	children: React.ReactNode
}) {
	const [queryClient] = useState(() => new QueryClient())

	return (
		<html lang="en">
			<body>
				<QueryClientProvider client={queryClient}>
					<ThemeProvider theme={baselightTheme}>
						<SnackbarProvider>
							<CssBaseline />
							{children}
						</SnackbarProvider>
					</ThemeProvider>
				</QueryClientProvider>
			</body>
		</html>
	)
}
