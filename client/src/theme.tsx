// src/theme.ts
import { createTheme } from "@mui/material/styles";

// Define your custom theme
const theme = createTheme({
	palette: {
		primary: {
			main: "#646cff",
		},
		secondary: {
			main: "#19857b",
		},
		error: {
			main: "#f44336",
		},
		background: {
			default: "#fff",
		},
	},
});

export default theme;
