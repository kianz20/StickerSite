import React from "react";
import { productDetails } from "../models";
import styles from "../styles/Products.module.css";

const SingleProduct: React.FC<productDetails> = (product: productDetails) => {
    return (
        <div className={styles.singleProduct}>
            <p>{product.name}</p>
            <p>{product.description}</p>
            <p>{product.price}</p>
        </div>
    );
};

export default SingleProduct;
