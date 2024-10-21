import { InputAdornment, TextField, TextFieldProps } from "@mui/material"

import {
	FieldError,
	FieldErrors,
	FieldErrorsImpl,
	Merge
} from "react-hook-form"

type Props = TextFieldProps & {
	name: string
	startIcon?: JSX.Element
	endIcon?: JSX.Element
	startValue?: string
	endValue?: string
	inputText?: string
	isEditing?: boolean
	register?: any
	helperText?:
		| FieldErrors<any>
		| string
		| FieldError
		| Merge<FieldError, FieldErrorsImpl<any>>
		| undefined
	removeHelperText?: boolean
	label?: string
}

export default function TextBox({
	name,
	startIcon,
	endIcon,
	startValue,
	endValue,
	inputText,
	isEditing = true,
	register,
	helperText,
	removeHelperText = false,
	...rest
}: Props) {
	return (
		<TextField
			name={name}
			margin="none"
			disabled={!isEditing}
			defaultValue={inputText}
			fullWidth
			InputProps={{
				startAdornment: startIcon ? (
					<InputAdornment position="start">{startIcon}</InputAdornment>
				) : endValue ? (
					<InputAdornment position="start">{startValue}</InputAdornment>
				) : null,
				endAdornment: endIcon ? (
					<InputAdornment position="end">{endIcon}</InputAdornment>
				) : endValue ? (
					<InputAdornment position="end">{endValue}</InputAdornment>
				) : null
			}}
			{...register(name)}
			helperText={helperText}
			{...rest}
		/>
	)
}
