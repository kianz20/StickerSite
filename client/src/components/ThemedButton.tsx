import { Button, styled } from "@mui/material";
import React from "react";

const StyledButton = styled(Button)<{
	customBackgroundColor?: string;
	customTextColor?: string;
}>(({ customBackgroundColor, customTextColor }) => ({
	// Default styles for the button
	color: customTextColor || "#fff", // Use prop for text color or fallback to default

	"&.MuiButton-outlined": {
		borderColor: "#000", // Border color for 'outlined' variant
	},
	"&.MuiButton-contained": {
		backgroundColor: customBackgroundColor || "var(--animori-theme-colour)", // Use prop for background color
		color: customTextColor || "#fff", // Use prop for text color or fallback to default
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
	backgroundColor?: string;
	textColor?: string;
	children?: React.ReactNode;
}

const ThemedButton: React.FC<ThemedButtonProps> = ({
	variant = "contained",
	onClick,
	className = "",
	text,
	type,
	backgroundColor,
	textColor,
	children,
}) => {
	return (
		<StyledButton
			variant={variant}
			onClick={onClick}
			className={`primary-button ${className}`}
			type={type}
			customBackgroundColor={backgroundColor} // Pass the background color prop
			customTextColor={textColor} // Pass the text color prop
		>
			{text}
			{children}
		</StyledButton>
	);
};

export default ThemedButton;
