import { useState, useEffect, useCallback } from "react";
import Cookies from "js-cookie";
import { loginResponse } from "../models";

interface AuthData {
	isAuthenticated: boolean;
	userRole: string | undefined;
	userID: string | undefined;
	userToken: string | undefined;
	userEmail: string | undefined;
	logout: () => void;
	setUserCookies: (data: loginResponse) => void;
}

const setCookie = (name: string, value: string) => {
	Cookies.set(name, value, {
		expires: 1,
		sameSite: "None",
		secure: true,
	});
};

export const useAuth = (): AuthData => {
	const [authData, setAuthData] = useState<{
		isAuthenticated: boolean;
		userRole: string | undefined;
		userID: string | undefined;
		userToken: string | undefined;
		userEmail: string | undefined;
	}>({
		isAuthenticated: false,
		userRole: undefined,
		userID: undefined,
		userToken: undefined,
		userEmail: undefined,
	});

	useEffect(() => {
		const token = Cookies.get("token");
		const isAuthenticated = !!token;

		setAuthData({
			isAuthenticated,
			userRole: Cookies.get("role"),
			userID: Cookies.get("id"),
			userToken: token,
			userEmail: Cookies.get("email"),
		});
	}, []);

	const logout = useCallback(() => {
		Cookies.remove("token");
		Cookies.remove("role");
		Cookies.remove("id");
		Cookies.remove("email");
		setAuthData({
			isAuthenticated: false,
			userRole: undefined,
			userID: undefined,
			userToken: undefined,
			userEmail: undefined,
		});
	}, []);

	const setUserCookies = (data: loginResponse): void => {
		const { user: { role, id, email } = {}, token } = data;
		// Validate that none of the required values are undefined
		if ([role, id, email, token].some((value) => value === undefined)) {
			throw new Error("Missing required user information or token.");
		}
		setCookie("token", token as string);
		setCookie("role", role as string);
		setCookie("id", id as string);
		setCookie("email", email as string);
	};

	return { ...authData, logout, setUserCookies };
};
