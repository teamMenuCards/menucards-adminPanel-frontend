import * as yup from "yup"
import { v4 as uuidv4 } from "uuid"

export const AddRestaurantSchema = yup.object().shape({
	subdomain: yup.string().required("Please enter your subdomain"),
	name: yup.string().required("Please enter your name"),
	phone_no: yup.string().required("Please enter your phone number"),
	pincode: yup.string().required("Please enter your pincode"),
	address: yup.string().required("Please enter your address"),
	country: yup.string().required("Please enter your country"),
	state: yup.string().required("Please enter your country"),

	email: yup
		.string()
		.lowercase()
		.email("Invalid Email")
		.required("Please enter your email"),
	city: yup.string().required("Please enter your password")
})

export const CreateRestaurantIdSchema = yup.object().shape({
	name: yup.string().required("Please enter your name"),
	phone_no: yup.string().required("Please enter your phone number"),
	password: yup.string().required("Please enter password"),
	email: yup
		.string()
		.lowercase()
		.email("Invalid Email")
		.required("Please enter your email")
})
