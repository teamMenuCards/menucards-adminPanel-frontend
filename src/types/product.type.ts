export type VariantDetailsType = Record<string, string>

export type ProductVariantType = {
	id: string
	variant_details: VariantDetailsType | Record<string, VariantDetailsType>
	variant_name: string
	is_veg: boolean
	contains_egg: boolean
	active: boolean
	price: number
	discounted_price: number
	image_url: string
	preparation_time_minutes: number
	allergens: string
	average_rating: number
	rating_count: number
	dietary_info: string
	calories: number
	spiciness: number
	ingredients: string
	createdAt: string
	updatedAt: string
}

export type ProductType = {
	id: string
	name: string
	description: string
	display_order?: number
	active: boolean
	createdAt: string
	updatedAt: string
	is_featured: boolean
}

export type ProductCategoryType = {
	id: string
	name: string
	active: boolean
	created_at: string
	updated_at: string
	description: string
	image_url?: string
	display_order?: number
	display_name: string
	available_from: string; // Add this line
  	available_to: string;   // Add this line
	parent_category_id?: string | null
	is_featured: boolean
}
