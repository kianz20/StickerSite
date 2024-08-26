import { userDetails, loginResponse, loginBody, registerBody } from "../models";

const deployed = false;
const url = deployed ? "https://deployedURL.com" : "http://localhost:5050";

export const createUser = async (
	user: registerBody
): Promise<loginResponse> => {
	try {
		console.log(user);
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
			const errorData = await response.json();
			return { error: errorData.error || "Something went wrong" };
		}

		const data: loginResponse = await response.json();
		return data;
	} catch (error) {
		return { error: (error as Error).message };
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
