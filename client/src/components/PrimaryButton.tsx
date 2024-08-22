import React from "react";
import Button from "@mui/material/Button";

interface PrimaryButtonProps {
	text: string;
	onClick?: () => void;
	className?: string;
}

// Define the BasicButton component
const PrimaryButton: React.FC<PrimaryButtonProps> = ({
	text,
	onClick,
	className,
}) => {
	return (
		<Button
			variant="outlined"
			onClick={onClick}
			className={`primary-button ${className || ""}`}
		>
			{text}
		</Button>
	);
};

export default PrimaryButton;
