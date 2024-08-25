import { useState, useEffect, useCallback } from "react";
import Cookies from "js-cookie";

interface AuthData {
	isAuthenticated: boolean;
	userRole: string | undefined;
	userID: string | undefined;
	userToken: string | undefined;
	userEmail: string | undefined;
	logout: () => void;
}

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

	return { ...authData, logout };
};
