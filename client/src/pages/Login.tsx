import { TextField } from "@mui/material";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import * as api from "../apiControllers/userController";
import { AlertMessage, NavigationBar, PrimaryButton } from "../components/";
import { useAlert, useAuth } from "../hooks";
import { LoginBody, LoginResponse } from "../models";
import styles from "../styles/Login.module.css";

const Login = (): JSX.Element => {
	const { alertDetails, showAlert } = useAlert();
	const [loginBody, setLoginBody] = useState<LoginBody>({
		email: "",
		password: "",
	});
	const { setUserCookies } = useAuth();

	const navigate = useNavigate();

	const handleLogin = async (event: React.FormEvent<HTMLFormElement>) => {
		try {
			event.preventDefault();
			const data: LoginResponse = await api.loginUser(loginBody);
			if (data.error) {
				console.error("Login failed: ", data.error);
				showAlert(data.error, "error");
			} else {
				setUserCookies(data);
				// Navigate to the home page after successful login
				navigate("/");
			}
		} catch (error) {
			console.error("Error during login:", error);
			showAlert("Error during login. Please try again.", "error");
		}
	};

	const handleFormChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		const { name, value } = event.target;
		setLoginBody((prevState) => ({
			...prevState,
			[name]: value,
		}));
	};

	return (
		<>
			<NavigationBar />
			<div className={styles.loginContainer}>
				<h1>Login</h1>
				<form onSubmit={handleLogin}>
					<TextField
						className={styles.loginField}
						label="Email"
						variant="outlined"
						fullWidth
						margin="normal"
						required
						name="email"
						onChange={handleFormChange}
					/>
					<TextField
						className={styles.loginField}
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
					<PrimaryButton text="Login" type="submit" />
				</form>
				<p>
					Don&apos;t have an account? <Link to="/register">Register</Link>
				</p>
				<Link to="/">
					<PrimaryButton text="Back to main menu" />
				</Link>
				<br />
				<br />
				<AlertMessage {...alertDetails} />
			</div>
		</>
	);
};

export default Login;
