import  React from "react"
import TextField from "@mui/material/TextField"
import { TimePicker } from "@mui/x-date-pickers/TimePicker"
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider"
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs"
import dayjs from "dayjs"
import { useEffect } from "react"

export interface TimeProps1 {
	available_from: string
	onChange: (value: string) => void
}
export interface TimeProps2 {
	available_to: string
	onChange: (value: string) => void
}

export function TimeFromPicker({ available_from, onChange }: TimeProps1) {
	const [availableFrom, setAvailableFrom] = React.useState<dayjs.Dayjs | null>(null)

	useEffect(() => {
		if (available_from) {
			setAvailableFrom(dayjs(available_from, "HH:mm:ss"))
		}
	}, [available_from])

	const handleChange = (newValue: dayjs.Dayjs | null) => {
		if (!newValue) return
		setAvailableFrom(newValue)
		onChange(newValue.format("HH:mm:ss"))
	}

	return (
		<LocalizationProvider dateAdapter={AdapterDayjs}>
			<TimePicker
				label="Available From"
				value={availableFrom}
				onChange={handleChange}
				ampm={false}
				enableAccessibleFieldDOMStructure={false}
				slots={{ textField: TextField }}
				slotProps={{
					textField: {
						sx: { width: 445 }
					}
				}}
			/>
		</LocalizationProvider>
	)
}

export function TimeToPicker({ available_to, onChange }: TimeProps2) {
	const [availableTo, setAvailableTo] = React.useState<dayjs.Dayjs | null>(null)

	useEffect(() => {
		if (available_to) {
			setAvailableTo(dayjs(available_to, "HH:mm:ss"))
		}
	}, [available_to])

	const handleChange = (newValue: dayjs.Dayjs | null) => {
		if (!newValue) return
		setAvailableTo(newValue)
		onChange(newValue.format("HH:mm:ss"))
	}

	return (
		<LocalizationProvider dateAdapter={AdapterDayjs}>
			<TimePicker
				label="Available To"
				value={availableTo}
				onChange={handleChange}
				ampm={false}
				enableAccessibleFieldDOMStructure={false}
				slots={{ textField: TextField }}
				slotProps={{
					textField: {
						sx: { width: 445 }
					}
				}}
			/>
		</LocalizationProvider>
	)
}
