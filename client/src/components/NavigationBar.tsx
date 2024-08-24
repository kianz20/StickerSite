import "../styling/NavigationBar.css";
import animoriLogo from "../resources/animori-logo.png";
import { Link } from "react-router-dom";
import PrimaryButton from "./PrimaryButton";
import { useEffect, useState } from "react";
import { checkAuthStatus, getRole } from "../utils/authUtils";
import Cookies from "js-cookie";

const NavigationBar: React.FC<{}> = () => {
	const [isAuthenticated, setIsAuthenticated] = useState(false);
	const [userRole, setUserRole] = useState("logged_out");

	useEffect(() => {
		const loggedIn = checkAuthStatus();
		setIsAuthenticated(loggedIn);
		if (loggedIn) {
			const fetchUserRole = getRole();
			if (fetchUserRole !== undefined) {
				setUserRole(fetchUserRole);
			}
		}
	}, []);

	const logout = () => {
		Cookies.remove("token");
		setIsAuthenticated(false);
	};

	return (
		<div className="top-navigation">
			<img src={animoriLogo} alt="Animori Logo" className="animori-logo" />
			{!isAuthenticated ? (
				<Link to="/login">
					<PrimaryButton text="Login or Register Here!" />
				</Link>
			) : (
				<>
					{userRole === "admin" && (
						<>
							<Link to="/:id/dashboard">
								<PrimaryButton text="Admin Dashboard" />
							</Link>
						</>
					)}
					<Link to="/profile">
						<PrimaryButton text="My Profile" />
					</Link>
					<PrimaryButton text="logout" onClick={logout} />
				</>
			)}
		</div>
	);
};

export default NavigationBar;
