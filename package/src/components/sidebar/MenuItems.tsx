import {
	IconAperture,
	IconCopy,
	IconLayoutDashboard,
	IconLogin,
	IconMoodHappy,
	IconTypography,
	IconUserPlus
} from "@tabler/icons-react"

import { uniqueId } from "lodash"

const Menuitems = [
	{
		navlabel: true,
		subheader: "Home"
	},

	{
		id: uniqueId(),
		title: "Dashboard",
		icon: IconLayoutDashboard,
		href: "/"
	},
	{
		id: uniqueId(),
		title: "Products",
		icon: IconLayoutDashboard,
		href: "/products"
	},
	{
		id: uniqueId(),
		title: "Categories",
		icon: IconLayoutDashboard,
		href: "/categories"
	},
	{
		id: uniqueId(),
		title: "Inventory",
		icon: IconLayoutDashboard,
		href: "/inventory"
	},
	{
		navlabel: true,
		subheader: "Utilities"
	},
	{
		id: uniqueId(),
		title: "Whatsapp Details",
		icon: IconTypography,
		href: "/utilities/typography"
	},
	// {
	//   id: uniqueId(),
	//   title: "Shadow",
	//   icon: IconCopy,
	//   href: "/utilities/shadow",
	// },
	{
		navlabel: true,
		subheader: "Auth"
	},
	{
		id: uniqueId(),
		title: "Login",
		icon: IconLogin,
		href: "/authentication/login"
	},
	{
		id: uniqueId(),
		title: "Register",
		icon: IconUserPlus,
		href: "/authentication/register"
	},
	{
		navlabel: true,
		subheader: "Extra"
	},
	{
		id: uniqueId(),
		title: "Icons",
		icon: IconMoodHappy,
		href: "/icons"
	},
	{
		id: uniqueId(),
		title: "Add a Restaurant",
		icon: IconAperture,
		href: "/add-restaurant"
	}
]

export default Menuitems
