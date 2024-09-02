import React, { useState } from "react";
import { ProductDetails } from "../models";
import styles from "../styles/Products.module.css";
import ThemedButton from "./ThemedButton";

const SingleProduct: React.FC<ProductDetails> = ({
	name,
	price,
	description,
}) => {
	const [isLoaded, setIsLoaded] = useState(false);

	return (
		<div className={styles.singleProduct}>
			<div className={styles.singleProductText}>{name}</div>
			<div className={styles.singleProductText}>${price}</div>
			<div className={styles.imageContainer}>
				<img
					onLoad={() => setIsLoaded(true)}
					src="https://picsum.photos/600/500"
					alt={`Image of ${name}`}
				/>
				{!isLoaded && <div className={styles.skeletonImg}></div>}
			</div>
			<div className={styles.singleProductDesc}>{description}</div>
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
