import { PATHS } from "./paths"

// Function to create addRestaurant
const addRestaurant = async ({
	name,
	email,
	phone_no,
	pincode,
	address,
	country,
	state
}: {
	name: string
	email: string
	phone_no: string
	pincode: string
	address: string
	country: string
	state: string
}) => {
	const response = await fetch(
		`${process.env.NEXTAUTH_URL}/${PATHS.add_restaurant}`,
		{
			method: "POST",
			headers: {
				"Content-Type": "application/json"
			},
			body: JSON.stringify({
				name,
				email,
				phone_no,
				pincode,
				address,
				country,
				state
			})
		}
	)

	if (!response.ok) {
		throw new Error("Failed to create user")
	}

	const data = await response.json()
	return data
}

export default addRestaurant
