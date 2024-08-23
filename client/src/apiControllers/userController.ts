import { registerBody } from "../models/registerBody";
import { loginResponse } from "../models/loginResponse";

const deployed = false;
const url = deployed ? "https://deployedURL.com" : "http://localhost:5050";

export const createUser = async (
	user: registerBody
): Promise<loginResponse> => {
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
