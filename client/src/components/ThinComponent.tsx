import React, { useState } from "react";
import { productDetails } from "../models";
import styles from "../styles/ThinComponent.module.css";
import { Button, Typography } from "@mui/material";
import PrimaryButton from "./PrimaryButton";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import ArrowDropUpIcon from "@mui/icons-material/ArrowDropUp";

interface ThinComponentProps extends productDetails {
    color: string;
}

const ThinComponent: React.FC<ThinComponentProps> = ({
    name,
    details,
    price,
    color,
}) => {
    const [isExpanded, setIsExpanded] = useState(false);

    const toggleDetails = () => {
        setIsExpanded(!isExpanded);
    };
    return (
        <div className={styles.container} style={{ backgroundColor: color }}>
            {!isExpanded ? (
                <div className={styles.productLine}>
                    <Typography className={styles.nameDetail}>
                        <b>Name:</b> {name}
                    </Typography>
                    <Typography className={styles.productDetail}>
                        <b>Price:</b> {price}
                    </Typography>
                    <Button variant="text" onClick={toggleDetails}>
                        <ArrowDropDownIcon />
                    </Button>
                </div>
            ) : (
                <div className={styles.productExpanded}>
                    <div className={styles.productLineExpanded}>
                        <div className={styles.expandedDetails}>
                            <Typography className={styles.nameDetail}>
                                <b>Name:</b> {name}
                            </Typography>
                            <Typography className={styles.productDetail}>
                                <b>Price:</b> {price}
                            </Typography>
                            <Typography className={styles.productDetail}>
                                <b>Description:</b> {details}
                            </Typography>
                        </div>
                        <div className={styles.buttonDiv}>
                            <Button variant="text" onClick={toggleDetails}>
                                <ArrowDropUpIcon />
                            </Button>
                            <div className={styles.buttoms}>
                                <PrimaryButton text="Edit" />
                                <PrimaryButton text="Remove" />
                                <PrimaryButton text="Out of Stock" />
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default ThinComponent;
