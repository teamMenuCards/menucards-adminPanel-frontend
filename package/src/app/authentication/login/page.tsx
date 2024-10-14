"use client"
import Link from "next/link"
import { Grid, Box, Card, Stack, Typography } from "@mui/material"
// components
import PageContainer from "@/components/PageContainer"
import AuthLogin from "../auth/AuthLogin"
import { useMutation } from "@tanstack/react-query"
import loginService from "@/services/login"

// Define the type for the login data
interface LoginData {
	email: string
	password: string
}

const Login = () => {
	const mutation = useMutation({
		mutationFn: async (userData: LoginData) => {
			return loginService(userData)
		},
		onSuccess: (data) => {
			console.log("Login successful", data)
		},
		onError: (error: Error) => {
			console.error("Login failed", error.message)
		}
	})

	// Handle login
	const handleLogin = (userName: string, password: string) => {
		mutation.mutate({
			email: userName,
			password: password
		})
	}

	return (
		<PageContainer title="Login" description="this is Login page">
			<Box
				sx={{
					position: "relative",
					"&:before": {
						content: '""',
						background: "radial-gradient(#d2f1df, #d3d7fa, #bad8f4)",
						backgroundSize: "400% 400%",
						animation: "gradient 15s ease infinite",
						position: "absolute",
						height: "100%",
						width: "100%",
						opacity: "0.3"
					}
				}}
			>
				<Grid
					container
					spacing={0}
					justifyContent="center"
					sx={{ height: "100vh" }}
				>
					<Grid
						item
						xs={12}
						sm={12}
						lg={4}
						xl={3}
						display="flex"
						justifyContent="center"
						alignItems="center"
					>
						<Card
							elevation={9}
							sx={{ p: 4, zIndex: 1, width: "100%", maxWidth: "500px" }}
						>
							<Box display="flex" alignItems="center" justifyContent="center">
								{/* <Logo /> */}
							</Box>
							<AuthLogin
								onClick={handleLogin}
								subtext={
									<Typography
										variant="h4"
										textAlign="center"
										color="textSecondary"
										mb={1}
									>
										Log In
									</Typography>
								}
								subtitle={
									<Stack
										direction="row"
										spacing={1}
										justifyContent="center"
										mt={3}
									>
										<Typography
											color="textSecondary"
											variant="h6"
											fontWeight="500"
										>
											New to Modernize?
										</Typography>
										<Typography
											component={Link}
											href="/authentication/register"
											fontWeight="500"
											sx={{
												textDecoration: "none",
												color: "primary.main"
											}}
										>
											Create an account
										</Typography>
									</Stack>
								}
							/>
						</Card>
					</Grid>
				</Grid>
			</Box>

			{mutation.isLoading && <p>Loading...</p>}
			{mutation.isError && (
				<p>
					Error:{" "}
					{mutation.error instanceof Error
						? mutation.error.message
						: "An error occurred"}
				</p>
			)}
		</PageContainer>
	)
}

export default Login
