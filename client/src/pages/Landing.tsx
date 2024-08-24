import { useState, useEffect } from "react";
import PrimaryButton from "../components/PrimaryButton";
import { checkAuthStatus, getRole } from "../utils/authUtils"; // Import the utility function
import NavigationBar from "../components/navigationBar";
import { Link } from "react-router-dom";

const Landing = (): JSX.Element => {
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

	return (
		<>
			<NavigationBar />
			<p>Welcome to Animori, where you can get all your anime memorabilia!</p>

			<div className="button-container">
				{isAuthenticated ? (
					<>
						<p>Welcome, {userRole}</p>
						{userRole === "admin" ? (
							<>
								<p>I'm an admin</p>
							</>
						) : (
							<>
								<p>I'm a user</p>
							</>
						)}
					</>
				) : (
					<>
						<p>Check out our store or login above</p>
						<PrimaryButton text="Find out more!" />
					</>
				)}
			</div>
		</>
	);
};

export default Landing;
