import { log } from "console"
import { PATHS } from "./paths"

export interface RestoData {
	subdomain: string
	name: string
	email: string
	phone_no: string
	pincode: string
	address: string
	country: string
	state: string
	city: string
}

// Function to add Restaurant
const addRestaurant = async ({
	subdomain,
	name,
	email,
	phone_no,
	pincode,
	address,
	country,
	state,
	city
}: RestoData) => {
	console.log(PATHS.add_restaurant)

	const url = `${process.env.NEXT_PUBLIC_API_URL}/${PATHS.add_restaurant}`
	const response = await fetch(url, {
		method: "POST",
		headers: {
			"Content-Type": "application/json"
		},
		body: JSON.stringify({
			subdomain,
			name,
			email,
			phone_no,
			pincode,
			address,
			country,
			state,
			city
		})
	})

	if (!response.ok) {
		throw new Error("Failed to onboard restaurant")
	}

	const { data } = await response.json()
	return data
}

export default addRestaurant
