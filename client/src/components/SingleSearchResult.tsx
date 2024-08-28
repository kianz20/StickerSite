import React from "react";
import { productDetails } from "../models";
import { Typography } from "@mui/material";
import styles from "../styles/SingleSearchResult.module.css";

const SingleSearchResult: React.FC<productDetails> = (
    product: productDetails
) => {
    const { _id, name, price } = product;

    return (
        <div className={styles.container}>
            <Typography className={styles.productName}>{name}</Typography>
            <Typography className={styles.productPrice}>{price}</Typography>
        </div>
    );
};

export default SingleSearchResult;
