import { Button, styled } from "@mui/material";
import React from "react";

// Create a styled button with custom props
const StyledButton = styled(Button, {
	// Use shouldForwardProp to filter out custom props
	shouldForwardProp: (prop) =>
		prop !== "customBackgroundColor" && prop !== "customTextColor",
})<{
	customBackgroundColor?: string;
	customTextColor?: string;
}>(({ customBackgroundColor, customTextColor }) => ({
	color: customTextColor || "#fff",
	"&.MuiButton-outlined": {
		borderColor: "#000",
	},
	"&.MuiButton-contained": {
		backgroundColor: customBackgroundColor || "var(--animori-theme-colour)",
		color: customTextColor || "#fff",
	},
	"&.MuiButton-text": {
		backgroundColor: customBackgroundColor || "transparent", // Use the prop or default to transparent
		color: customTextColor || "#fff",
	},
	"&:hover": {
		borderColor: "var(--dark-animori-theme-colour)",
	},
	"&.MuiButton-contained:hover": {
		backgroundColor: "var(--dark-animori-theme-colour)",
	},
	"&.MuiButton-outlined:hover": {
		borderColor: "var(--dark-animori-theme-colour)",
	},
	"&.MuiButton-text:hover": {
		backgroundColor: customBackgroundColor
			? "rgba(0, 0, 0, 0.1)"
			: "rgba(0, 0, 0, 0.1)", // Customize hover effect as needed
		color: customTextColor || "#fff",
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
	fullWidth?: boolean;
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
	fullWidth,
}) => {
	return (
		<StyledButton
			variant={variant}
			onClick={onClick}
			className={`primary-button ${className}`}
			type={type}
			customBackgroundColor={backgroundColor}
			customTextColor={textColor}
			fullWidth={fullWidth}
		>
			{text}
			{children}
		</StyledButton>
	);
};

export default ThemedButton;
