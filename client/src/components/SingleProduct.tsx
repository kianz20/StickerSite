import React from "react";
import { ProductDetails } from "../models";
import styles from "../styles/Products.module.css";

const SingleProduct: React.FC<ProductDetails> = (product: ProductDetails) => {
	return (
		<div className={styles.singleProduct}>
			<p>{product.name}</p>
			<p>{product.details}</p>
			<p>{product.price}</p>
		</div>
	);
};

export default SingleProduct;
