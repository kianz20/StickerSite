import Cookies from "js-cookie";

// Function to get the authentication token
export const getToken = () => {
	return Cookies.get("token");
};

// Function to check if the user is authenticated
export const checkAuthStatus = () => {
	return !!getToken(); // Returns true if token exists, otherwise false
};
