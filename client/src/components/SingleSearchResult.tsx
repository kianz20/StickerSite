import React from "react";
import { productDetails } from "../models";


const SingleSearchResult: React.FC<productDetails> = (product: productDetails) => {

    const { _id, name, details, price } = product;

    return (
        <div>
            <p>{name}</p>
            <p>{details}</p>
            <p>{price}</p>
        </div>
    );

}

export default SingleSearchResult;
