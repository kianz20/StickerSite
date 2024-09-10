import { Rating, Typography } from "@mui/material";
import React from "react";
import { BACKEND_URL } from "../constants/backendURL";
import { ProductDetails } from "../models";
import image from "../resources/productPlaceholder.jpg";
import styles from "../styles/SingleSearchResult.module.css";

const SingleSearchResult: React.FC<ProductDetails> = (
	product: ProductDetails
) => {
	const { name, price, imgPath } = product;

	return (
		<div className={styles.productContainer}>
			<img
				className={styles.productDisplayImage}
				src={imgPath ? `${BACKEND_URL}${imgPath}` : image}
				alt={`Image of ${name}`}
			/>

			<Typography className={styles.productName} variant="subtitle1">
				{name}
			</Typography>
			<Typography className={styles.productPrice} variant="body2">
				{price}
			</Typography>
			<div className={styles.infoBar}>
				<Rating
					className={styles.productRating}
					name="read-only"
					defaultValue={2.5}
					// value= need to add to database first
					precision={0.5}
					size="small"
					readOnly
				/>
				<Typography className={styles.productRatingCount} variant="body2">
					{"(6)"}
				</Typography>
			</div>
		</div>
	);
};

export default SingleSearchResult;
