import React, { useState, useCallback } from "react"
import { Grid, TextField, Button } from "@mui/material"

export default function AddLink() {
	return (
		<>
			<div className="pt-3 ">
				<Grid container spacing={5} mt={5} ml={10}>
					{/*Button Name*/}
					<Grid item xs={5} md={8}>
						<TextField
							label="Name"
							fullWidth
							variant="outlined"
							value={""}
							/* onChange={(e) => handleRestaurantChange("name", e.target.value)} */
						/>
					</Grid>
				</Grid>
			</div>
		</>
	)
}
