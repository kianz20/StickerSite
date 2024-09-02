import { Rating, Typography } from "@mui/material";
import React, { useState } from "react";
import { ProductDetails } from "../models";
import styles from "../styles/SingleProduct.module.css";
import ThemedButton from "./ThemedButton";

const SingleProduct: React.FC<ProductDetails> = ({
	name,
	price,
	description,
}) => {
	const [isLoaded, setIsLoaded] = useState(false);

	return (
		<div className={styles.singleProduct}>
			<div className={styles.productDetails}>
				<Typography className={styles.singleProductText}>{name}</Typography>
				<Typography className={styles.singleProductDesc}>
					{description}
				</Typography>
				<div className={styles.imageContainer}>
					<img
						onLoad={() => setIsLoaded(true)}
						src="https://picsum.photos/600/500"
						alt={`Image of ${name}`}
					/>
					{!isLoaded && <div className={styles.skeletonImg}></div>}
				</div>
				<Typography className={styles.singleProductText}>${price}</Typography>
				<div className={styles.ratingDetails}>
					<Rating
						className={styles.productRating}
						name="read-only"
						defaultValue={2.5}
						// value= need to add to database first
						precision={0.5}
						size="small"
						readOnly
					/>
					<Typography className={styles.ratingText} fontSize={"12px"}>
						- {2} Reviews
					</Typography>
				</div>
			</div>
			<div>
				<ThemedButton
					className={styles.addCartButton}
					text="Add to cart"
					fullWidth
				/>
			</div>
		</div>
	);
};

export default SingleProduct;
