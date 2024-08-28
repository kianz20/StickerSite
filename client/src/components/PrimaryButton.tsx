import React from "react";
import Button from "@mui/material/Button";

interface PrimaryButtonProps {
	variant?: "text" | "outlined" | "contained";
	onClick?: () => void;
	className?: string;
	text?: string;
	type?: "button" | "submit" | "reset" | undefined;
}

const PrimaryButton: React.FC<PrimaryButtonProps> = ({
	variant = "outlined",
	onClick,
	className = "",
	text,
	type,
}) => {
	return (
		<Button
			variant={variant}
			onClick={onClick}
			className={`primary-button ${className}`}
			type={type}
		>
			{text}
		</Button>
	);
};

export default PrimaryButton;
