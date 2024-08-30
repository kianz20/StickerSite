import React from "react";
import { productDetails } from "../models";
import { Typography, Rating } from "@mui/material";
import styles from "../styles/SingleSearchResult.module.css";
import image from "../resources/productPlaceholder.jpg";

const SingleSearchResult: React.FC<productDetails> = (
    product: productDetails
) => {
    const { _id, name, price } = product;

    return (
        <div className={styles.productContainer}>
            <img className={styles.productDisplayImage} src={image}></img>
            <Typography className={styles.productName} variant="subtitle1">
                {name}
            </Typography>
            <div className={styles.infoBar}>
                <Typography className={styles.productPrice} variant="body2">
                    {price}
                </Typography>
                <Rating
                    className={styles.productRating}
                    name="read-only"
                    defaultValue={2.5}
                    // value= need to add to database first
                    precision={0.5}
                    size="small"
                    readOnly
                />
                <Typography
                    className={styles.productRatingCount}
                    variant="body2"
                >
                    {"(6)"}
                </Typography>
            </div>
        </div>
    );
};

export default SingleSearchResult;
