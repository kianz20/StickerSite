import { UserDetails, LoginResponse, LoginBody, RegisterBody } from "../models";

const deployed = false;
const url = deployed ? "https://deployedURL.com" : "http://localhost:5050";

export const createUser = async (
	user: RegisterBody
): Promise<LoginResponse> => {
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
			const errorData = await response.json();
			return { error: errorData.error || "Something went wrong" };
		}

		const data: LoginResponse = await response.json();
		return data;
	} catch (error) {
		return { error: (error as Error).message };
	}
};

export const loginUser = async (user: LoginBody): Promise<LoginResponse> => {
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

		const data: LoginResponse = await response.json();
		return data;
	} catch (error) {
		return { error: (error as Error).message };
	}
};

export const getProfileData = async (
	userID: string,
	token: string
): Promise<UserDetails> => {
	try {
		const response = await fetch(`${url}/api/users/${userID}`, {
			method: "GET",
			headers: {
				"Content-Type": "application/json",
				Authorization: `Bearer ${token}`,
			},
		});

		if (!response.ok) {
			const AlertMessage = `HTTP error! Status: ${response.status}, Status Text: ${response.statusText}`;
			throw new Error(AlertMessage);
		}

		const data: UserDetails = await response.json();
		return data;
	} catch (error) {
		console.error("Error fetching profile data:", error);
		throw error;
	}
};
