import { PATHS } from "./paths"

export interface CategoryData {
	restaurant_id: "string"
	name: "string"
	display_name: "string"
	description: "string"
	image_url: "string"
	display_order: 0
	parent_id: "string"
}

// Function to createCategory
const createCategory = async ({
	restaurant_id,
	name,
	display_name,
	description,
	image_url,
	display_order,
	parent_id
}: CategoryData) => {
	console.log(PATHS.add_restaurant)

	const url = `${process.env.NEXT_PUBLIC_API_URL}/${PATHS.create_category}`
	const response = await fetch(url, {
		method: "POST",
		headers: {
			"Content-Type": "application/json"
		},
		body: JSON.stringify({
			restaurant_id,
			name,
			display_name,
			description,
			image_url,
			display_order,
			parent_id
		})
	})

	if (!response.ok) {
		throw new Error("Failed to create category")
	}

	const { data } = await response.json()
	return data
}

export default createCategory
