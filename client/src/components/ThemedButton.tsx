import { Button, styled } from "@mui/material";
import React from "react";

// Define custom styles for the Button
const StyledButton = styled(Button)(() => ({
	// Default styles for the button
	border: "1px solid #000", // Default border color
	color: "#000", // Default text color

	"&.MuiButton-outlined": {
		borderColor: "#000", // Border color for 'outlined' variant
	},
	"&.MuiButton-contained": {
		backgroundColor: "#000", // Background color for 'contained' variant
		color: "#fff", // Text color for 'contained' variant
	},
	"&:hover": {
		borderColor: "var(--dark-animori-theme-colour)", // Border color on hover
	},
	"&.MuiButton-contained:hover": {
		backgroundColor: "var(--dark-animori-theme-colour)", // Background color on hover for 'contained' variant
	},
	"&.MuiButton-outlined:hover": {
		borderColor: "var(--dark-animori-theme-colour)", // Border color on hover for 'outlined' variant
	},
}));

interface ThemedButtonProps {
	variant?: "text" | "outlined" | "contained";
	onClick?: () => void;
	className?: string;
	text?: string;
	type?: "button" | "submit" | "reset";
}

const ThemedButton: React.FC<ThemedButtonProps> = ({
	variant = "outlined",
	onClick,
	className = "",
	text,
	type,
}) => {
	return (
		<StyledButton
			variant={variant}
			onClick={onClick}
			className={`primary-button ${className}`}
			type={type}
		>
			{text}
		</StyledButton>
	);
};

export default ThemedButton;
