import { userDetails, loginResponse, loginBody } from "../models";

const deployed = false;
const url = deployed ? "https://deployedURL.com" : "http://localhost:5050";

export const createUser = async (user: userDetails): Promise<loginResponse> => {
	try {
		const response = await fetch(`${url}/api/users/`, {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify(user),
		});

		if (!response.ok) {
			const errorText = await response.text();
			throw new Error(`Registration failed: ${errorText}`);
		}

		const data: loginResponse = await response.json();
		return data;
	} catch (error) {
		console.error("Error in createUser:", error);
		throw error;
	}
};

export const loginUser = async (user: loginBody): Promise<loginResponse> => {
	try {
		const response = await fetch(`${url}/api/users/login`, {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify(user),
		});

		if (!response.ok) {
			throw new Error("Login failed");
		}

		const data: loginResponse = await response.json();
		console.log("Login successful", data);
		return data;
	} catch (error) {
		console.error("Error in loginUser:", error);
		throw error;
	}
};

export const getProfileData = async (
	userID: string,
	token: string
): Promise<userDetails> => {
	try {
		const response = await fetch(`${url}/api/users/${userID}`, {
			method: "GET",
			headers: {
				"Content-Type": "application/json",
				Authorization: `Bearer ${token}`,
			},
		});

		if (!response.ok) {
			const errorMessage = `HTTP error! Status: ${response.status}, Status Text: ${response.statusText}`;
			throw new Error(errorMessage);
		}

		const data: userDetails = await response.json();
		return data;
	} catch (error) {
		console.error("Error fetching profile data:", error);
		throw error;
	}
};
