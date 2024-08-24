import { useState, useEffect, useCallback } from "react";
import Cookies from "js-cookie";

interface AuthData {
	isAuthenticated: boolean;
	userRole: string | undefined;
	userID: string | undefined;
	logout: () => void;
}

export const useAuth = (): AuthData => {
	const [isAuthenticated, setIsAuthenticated] = useState(false);
	const [userRole, setUserRole] = useState<string | undefined>(undefined);
	const [userID, setUserID] = useState<string | undefined>(undefined);

	useEffect(() => {
		const loggedIn = !!Cookies.get("token");
		setIsAuthenticated(loggedIn);

		if (loggedIn) {
			setUserRole(Cookies.get("role"));
			setUserID(Cookies.get("id"));
		}
	}, []);

	const logout = useCallback(() => {
		Cookies.remove("token");
		Cookies.remove("role");
		Cookies.remove("id");
		setIsAuthenticated(false);
		setUserRole(undefined);
		setUserID(undefined);
	}, []);

	return { isAuthenticated, userRole, userID, logout };
};
