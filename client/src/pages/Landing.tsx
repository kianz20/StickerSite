import React from "react";
import Cookies from "js-cookie";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import PrimaryButton from "../components/PrimaryButton";
import { checkAuthStatus } from "../utils/authUtils"; // Import the utility function

const Landing = () => {
	const [isAuthenticated, setIsAuthenticated] = useState(false);

	useEffect(() => {
		setIsAuthenticated(checkAuthStatus());
	}, []);

	const logout = () => {
		Cookies.remove("token");
		setIsAuthenticated(false);
	};

	return (
		<>
			<h1>Animori</h1>
			<p>Welcome to Animori, where you can get all your anime memorabilia</p>
			<div className="button-container">
				{isAuthenticated ? (
					<>
						<PrimaryButton text="Access Dashboard" />
						<PrimaryButton text="logout" onClick={logout} />
					</>
				) : (
					<>
						<Link to="/login">
							<PrimaryButton text="Login" />
						</Link>
						<PrimaryButton text="Find out more!" />
					</>
				)}
			</div>
		</>
	);
};

export default Landing;
