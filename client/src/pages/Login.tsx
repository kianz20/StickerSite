import { useState } from "react";
import "../styling/Login.css";
import PrimaryButton from "../components/PrimaryButton";
import { Link, useNavigate } from "react-router-dom";
import { TextField } from "@mui/material";
import { loginBody } from "../models/loginBody";
import * as api from "../apiControllers/userController";
import Cookies from "js-cookie";
import NavigationBar from "../components/navigationBar";

const Login = (): JSX.Element => {
	const [loginBody, setLoginBody] = useState<loginBody>({
		email: "",
		password: "",
	});

	const navigate = useNavigate();

	const handleLogin = async () => {
		try {
			const data = await api.loginUser(loginBody);
			Cookies.set("token", data.token, {
				expires: 1,
				sameSite: "None",
				secure: true,
			});
			Cookies.set("role", data.user.role, {
				expires: 1,
				sameSite: "None",
				secure: true,
			});

			// Navigate to the home page after successful login
			navigate("/");
		} catch (error) {
			// Handle any errors that occur during login
			console.error("Error during login:", error);
		}
	};

	const handleFormChange = async (
		event: React.ChangeEvent<HTMLInputElement>
	) => {
		const { name, value } = event.target;
		setLoginBody((prevState) => ({
			...prevState,
			[name]: value,
		}));
	};

	return (
		<>
			<NavigationBar />
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
						name="email"
						onChange={handleFormChange}
					/>
					<TextField
						className="login-field"
						label="Password"
						type="password"
						variant="outlined"
						fullWidth
						margin="normal"
						required
						name="password"
						onChange={handleFormChange}
					/>
					<br />
					<br />
					<PrimaryButton text="Login" onClick={handleLogin} />
				</form>
				<p>
					Don&apos;t have an account? <Link to="/register">Register</Link>
				</p>
				<Link to="/">
					<PrimaryButton text="Back to main menu" />
				</Link>
			</div>
		</>
	);
};

export default Login;
