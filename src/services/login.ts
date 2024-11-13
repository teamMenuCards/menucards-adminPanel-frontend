import { PATHS } from "./paths"

// Function to create a new user using fetch
const loginService = async ({
	email,
	password
}: {
	email?: string
	password?: string
}) => {
	const response = await fetch(
		`${process.env.NEXT_PUBLIC_API_URL}${PATHS.login}`,
		{
			method: "POST",
			headers: {
				"Content-Type": "application/json"
			},

			body: JSON.stringify({
				email,
				password
			}),

			credentials: "include"
		}
	)

	if (!response.ok) {
		throw new Error("Failed to login user")
	}

	const { data } = await response.json()
	return data
}

export default loginService
