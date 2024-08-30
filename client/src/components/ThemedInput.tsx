import { TextField, TextFieldProps, styled } from "@mui/material";
import React from "react";

// Create a styled TextField with custom styles
const StyledTextField = styled(TextField)(() => ({
	"& .MuiOutlinedInput-root": {
		"& fieldset": {
			borderColor: "#000000", // Default border color
		},
		"&:hover fieldset": {
			borderColor: "var(--dark-animori-theme-colour)", // Border color on hover
		},
		"&.Mui-focused fieldset": {
			borderColor: "var(--dark-animori-theme-colour)", // Border color on focus
		},
	},
	"& .MuiInputLabel-root": {
		color: "#000000", // Default label color
		"&.Mui-focused": {
			color: "var(--dark-animori-theme-colour)", // Label color when focused
		},
	},
	"& .MuiInputBase-input": {
		color: "#000000", // Input text color
	},
}));

const ThemedInput: React.FC<TextFieldProps> = (props) => {
	return <StyledTextField variant="outlined" {...props} />;
};

export default ThemedInput;
