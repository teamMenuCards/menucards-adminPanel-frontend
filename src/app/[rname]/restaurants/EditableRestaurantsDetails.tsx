import React, { useState, useCallback } from "react"
import { RestaurantDetailType } from "@/types/restaurant.type"
import { Grid, TextField } from "@mui/material"



interface RestaurantDetailsProps {
	detail?: RestaurantDetailType
	handleDetailsChange?: (field: string, value: string) => void
	handlePlatformChange?: (
		index: number,
		arrayName:
			| "platform_details"
			| "platform_reviews"
			| "reviews_image_url_details",
		field: string,
		value: string
	) => void
}

const EditableRestaurantDetails: React.FC<RestaurantDetailsProps> = ({
	detail,
	handleDetailsChange,
	handlePlatformChange
}) => {


	return (
		<>
		{/*WhatsApp Number*/}
		<Grid item xs={5} md={4}>
				<TextField
					label="WhatsApp Number"
					fullWidth
					variant="outlined"
					value={detail?.details.wa_api_details?.wa_number}
					onChange={(e) =>
						handleDetailsChange?.(
							"details.wa_api_details.wa_number",
							e.target.value
						)
					}
				/>
			</Grid>
			{/*Logo Image*/}
			<Grid item xs={10} md={8}>
				<TextField
					label="Logo Image"
					fullWidth
					variant="outlined"
					value={detail?.logo}
					onChange={(e) => handleDetailsChange?.("logo", e.target.value)}
				/>
			</Grid>
			{/* Cover Image */}
			<Grid item xs={10} md={8}>
				<TextField
					label="Cover Image Url"
					fullWidth
					variant="outlined"
					value={detail?.cover_image}
					onChange={(e) => handleDetailsChange?.("cover_image", e.target.value)}
				/>
			</Grid>
			
			<Grid item xs={10}>
			
				<p style={{ fontSize: "1.5rem" }}>Meta Details:</p>
			</Grid>
			{/*Category*/}
			<Grid item xs={5} md={4}>
				<TextField
					label="Category"
					fullWidth
					variant="outlined"
					value={detail?.details.meta_details?.category}
					onChange={(e) =>
						handleDetailsChange?.(
							"details.meta_details.category",
							e.target.value
						)
					}
				/>
			</Grid>
					{/*Phone Number*/}
					<Grid item xs={5} md={4}>
				<TextField
					label="Mobile Number"
					fullWidth
					variant="outlined"
					value={detail?.details.meta_details?.phone_number}
					onChange={(e) =>
						handleDetailsChange?.(
							"details.meta_details.phone_number",
							e.target.value
						)
					}
				/>
			</Grid>
			{/*Opening time*/}

			<Grid item xs={5} md={4} >
				<TextField
					label="Opening Time"
					fullWidth
					variant="outlined"
					value={detail?.details.meta_details?.opening_time}
					onChange={(e) =>
						handleDetailsChange?.(
							"details.meta_details.opening_time",
							e.target.value
						)
					}
				/>
			</Grid>
			{/*closing time*/}

			<Grid item xs={5} md={4}>
				<TextField
					label="Closing Time"
					fullWidth
					variant="outlined"
					value={detail?.details.meta_details?.closing_time}
					onChange={(e) =>
						handleDetailsChange?.(
							"details.meta_details.closing_time",
							e.target.value
						)
					}
				/>
			</Grid>
			{/*AVERAGE PERSON*/}

			<Grid item xs={5} md={4}>
				<TextField
					label="Average Person"
					fullWidth
					variant="outlined"
					value={detail?.details.meta_details?.avg_person}
					onChange={(e) =>
						handleDetailsChange?.(
							"details.meta_details.avg_person",
							e.target.value
						)
					}
				/>
			</Grid>
			{/*AVERAGE PRICE*/}

			<Grid item xs={5} md={4} >
				<TextField
					label="Average Price"
					fullWidth
					variant="outlined"
					value={detail?.details.meta_details?.avg_price}
					onChange={(e) =>
						handleDetailsChange?.(
							"details.meta_details.avg_price",
							e.target.value
						)
					}
				/>
			</Grid>
	
			{/*location_info*/}
			<Grid item xs={5} md={4}>
				<TextField
					label="Location Info"
					fullWidth
					variant="outlined"
					value={detail?.details.meta_details?.location_info}
					onChange={(e) =>
						handleDetailsChange?.(
							"details.meta_details.location_info",
							e.target.value
						)
					}
				/>
			</Grid>

			{/* PLATFORM DETAILS */}
			<Grid item xs={10}>
				<p style={{ fontSize: "1.5rem" }}>Platform Details :</p>
			</Grid>

			{detail?.details.platform_details?.map((item, index) => (
				<React.Fragment key={index}>
				
					<Grid item xs={5}>
						<TextField
							label="Platform Name"
							fullWidth
							variant="outlined"
							value={item.platform_name}
							onChange={(e) =>
								handlePlatformChange?.(
									index,
									"platform_details",
									"platform_name",
									e.target.value
								)
							}
						/>
					</Grid>
					<Grid item xs={5}>
						<TextField
							label="Platform URI"
							fullWidth
							variant="outlined"
							value={item.platform_uri}
							onChange={(e) =>
								handlePlatformChange?.(
									index,
									"platform_details",
									"platform_uri",
									e.target.value
								)
							}
						/>
					</Grid>
				</React.Fragment>
			))}
			<Grid item xs={10}>
				<p style={{ fontSize: "1.5rem" }}>Platform Review Details :</p>
			</Grid>
			{detail?.details.platform_reviews?.map((item, index) => (
				<React.Fragment key={index}>
					<Grid item xs={5} md={4}>
						<TextField
							label="Platform name"
							fullWidth
							variant="outlined"
							value={item.platform_name}
							onChange={(e) =>
								handlePlatformChange?.(
									index,
									"platform_reviews",
									"platform_name",
									e.target.value
								)
							}
						/>
					</Grid>
					<Grid item xs={5} md={4}>
						<TextField
							label="Average Rating"
							fullWidth
							variant="outlined"
							value={item.average_rating}
							onChange={(e) =>
								handlePlatformChange?.(
									index,
									"platform_reviews",
									"average_rating",
									e.target.value
								)
							}
						/>
					</Grid>
					<Grid item xs={5} md={4}>
						<TextField
							label="Total Reviews"
							fullWidth
							variant="outlined"
							value={item.total_reviews}
							onChange={(e) =>
								handlePlatformChange?.(
									index,
									"platform_reviews",
									"total_reviews",
									e.target.value
								)
							}
						/>
					</Grid>
				</React.Fragment>
			))}

			{/* PLATFORM REVIEWS IMAGE */}
			<Grid item xs={10}>
				<p style={{ fontSize: "1.5rem" }}>Reviews Image Url Details:</p>
			</Grid>

			{detail?.details.reviews_image_url_details?.map((item, index) => (
				<React.Fragment key={index}>
					<Grid item xs={10}>
						<TextField
							label="Review Image Url"
							fullWidth
							variant="outlined"
							value={item.review_image_url}
							onChange={(e) =>
								handlePlatformChange?.(
									index,
									"reviews_image_url_details",
									"review_image_url",
									e.target.value
								)
							}
						/>
					</Grid>
				</React.Fragment>
			))}
		</>
	)
}

export default EditableRestaurantDetails
