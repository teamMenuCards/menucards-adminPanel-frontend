import * as yup from "yup"

export const AddCategorySchema = yup.object().shape({
	name: yup.string().required("Please enter your name"),
	display_name: yup.string().required("Please enter your display name"),
	description: yup.string().required("Please enter description"),
	image_url: yup.string().required("Please enter image"),
	display_order: yup.number().required("Please enter order number	"),
	parent_id: yup.string().required("Please enter order number	")
})
