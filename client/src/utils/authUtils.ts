import Cookies from "js-cookie";

// Function to get the authentication token
export const getToken = (): string | undefined => {
	return Cookies.get("token");
};

// Function to check if the user is authenticated
export const checkAuthStatus = (): boolean => {
	return !!getToken(); // Returns true if token exists, otherwise false
};

export const getRole = (): string | undefined => {
	return Cookies.get("role");
};
