import { useState } from "react";
import "../styling/Login.css"; // Import the CSS file
import PrimaryButton from "../components/PrimaryButton"; // Import your button component
import { Link, useNavigate } from "react-router-dom"; // Import Link for navigation
import { TextField } from "@mui/material";
import Cookies from "js-cookie";
import { loginResponse } from "../models/loginResponse";

const Login = (): JSX.Element => {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");

	const navigate = useNavigate();

	const handleLogin = async () => {
		try {
			const response = await fetch("http://localhost:5050/api/users/login", {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({ email, password }),
			});

			if (!response.ok) {
				throw new Error("Login failed");
			}

			const data: loginResponse = await response.json();
			console.log("Login successful", data);
			Cookies.set("token", data.token, { expires: 1 });
			navigate("/");
		} catch (error) {
			console.error("Error:", error);
		}
	};

	return (
		<div className="login-container">
			<h1>Login</h1>
			<form>
				<TextField
					className="login-field"
					label="Email"
					variant="outlined"
					fullWidth
					margin="normal"
					required
					value={email}
					onChange={(e) => setEmail(e.target.value)}
				/>
				<TextField
					className="login-field"
					label="Password"
					type="password"
					variant="outlined"
					fullWidth
					margin="normal"
					required
					value={password}
					onChange={(e) => setPassword(e.target.value)}
				/>
				<br />
				<br />
				<PrimaryButton text="Login" onClick={handleLogin} />
			</form>
			<p>
				Don`&apos;`t have an account? <Link to="/register">Register</Link>
			</p>
			<Link to="/">
				<PrimaryButton text="Back to main menu" />
			</Link>
		</div>
	);
};

export default Login;
