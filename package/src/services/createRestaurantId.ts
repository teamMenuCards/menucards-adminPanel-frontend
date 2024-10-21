import { PATHS } from "./paths"

// Function to create Restaurant user id
const createRestaurantId = async ({
	name,
	email,
	phone_no,
	password,
	restaurant_id
}: {
	name: string
	email: string
	phone_no: string
	password: string
	restaurant_id: string
}) => {
	const url = `${process.env.NEXT_PUBLIC_API_URL}/${PATHS.create_resto_user_id}`

	const response = await fetch(url, {
		method: "POST",
		headers: {
			"Content-Type": "application/json"
		},
		body: JSON.stringify({
			name,
			email,
			phone_no,
			password,
			restaurant_id
		})
	})

	if (!response.ok) {
		throw new Error("Failed to create user")
	}

	const data = await response.json()
	return data
}

export default createRestaurantId
