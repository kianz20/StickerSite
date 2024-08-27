import React from "react";
import Button from "@mui/material/Button";

interface PrimaryButtonProps {
    variant?: "text" | "outlined" | "contained";
    onClick?: () => void;
    className?: string;
    text?: string;
}

const PrimaryButton: React.FC<PrimaryButtonProps> = ({
    variant = "outlined",
    onClick,
    className = "",
    text,
}) => {
    return (
        <Button
            variant={variant}
            onClick={onClick}
            className={`primary-button ${className}`}
        >
            {text}
        </Button>
    );
};

export default PrimaryButton;
