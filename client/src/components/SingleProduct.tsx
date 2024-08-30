import React from "react";
import { ProductDetails } from "../models";
import styles from "../styles/Products.module.css";
import { useState } from "react";

const SingleProduct: React.FC<ProductDetails> = (product: ProductDetails) => {
	const [isLoaded, setIsLoaded] = useState(false);

	return (
		<div className={styles.singleProduct}>
			<div className={styles.singleProductText}>{product.name}</div>
			<div className={styles.singleProductText}>${product.price}</div>
			<div className={styles.imageContainer}>
				<img
					onLoad={() => setIsLoaded(true)}
					src="https://picsum.photos/600/500"
				/>
				{!isLoaded && <div className={styles.skeletonImg}></div>}
			</div>
			<div className={styles.singleProductText}>
				{product.description}
			</div>
		</div>
	);
};

export default SingleProduct;
