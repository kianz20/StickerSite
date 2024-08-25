// src/theme.ts
import { createTheme } from "@mui/material/styles";

const primaryColor = "#000000";
const animoriPurple = "#aea3ff";

const defaultColor = "#ffffff";
const hoverColor = "#646cff";
const focusColor = "#ffffff";

const theme = createTheme({
	palette: {
		primary: {
			main: primaryColor,
		},
		secondary: {
			main: "#ffffff",
		},
		error: {
			main: "#f44336",
		},
		background: {
			default: "#fff",
		},
	},
	components: {
		MuiOutlinedInput: {
			styleOverrides: {
				root: {
					"&:hover .MuiOutlinedInput-notchedOutline": {
						borderColor: hoverColor, // Hover state
					},
					"&.Mui-focused .MuiOutlinedInput-notchedOutline": {
						borderColor: animoriPurple, // Focused state
					},
					".MuiOutlinedInput-notchedOutline": {
						borderColor: primaryColor, // Default state
					},
				},
			},
		},
		MuiInputLabel: {
			styleOverrides: {
				root: {
					color: primaryColor, // Default label color
					"&.Mui-focused": {
						color: animoriPurple, // Label color when focused
					},
				},
			},
		},
		MuiInputBase: {
			styleOverrides: {
				input: {
					color: primaryColor, // Input text color
				},
			},
		},
	},
});

export default theme;
