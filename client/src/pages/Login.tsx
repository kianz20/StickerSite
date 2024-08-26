import { useState } from "react";
import styles from "../styles/Login.module.css";
import PrimaryButton from "../components/PrimaryButton";
import { Link, useNavigate } from "react-router-dom";
import { TextField } from "@mui/material";
import { loginBody } from "../models/loginBody";
import * as api from "../apiControllers/userController";
import Cookies from "js-cookie";
import NavigationBar from "../components/NavigationBar";
import { loginResponse } from "../models";
import ErrorMessage, { Severity } from "../components/ErrorMessage";

const Login = (): JSX.Element => {
	const [loginBody, setLoginBody] = useState<loginBody>({
		email: "",
		password: "",
	});

	const [errorDetails, setErrorDetails] = useState<{
		text: string;
		visible: boolean;
		severity: Severity;
	}>({
		text: "",
		visible: false,
		severity: "error",
	});

	const navigate = useNavigate();

	const setCookie = (name: string, value: string) => {
		Cookies.set(name, value, {
			expires: 1,
			sameSite: "None",
			secure: true,
		});
	};

	const handleLogin = async () => {
		try {
			const data: loginResponse = await api.loginUser(loginBody);
			if (data.error) {
				console.error("Login failed: ", data.error);
				setErrorDetails({
					text: data.error,
					visible: true,
					severity: "error",
				});
			} else {
				if (data.user) {
					const token = data.token ?? "";
					const role = data.user.role;
					const id = data.user.id;
					const email = data.user.email;

					setCookie("token", token);
					setCookie("role", role);
					setCookie("id", id);
					setCookie("email", email);
					// Navigate to the home page after successful login
					navigate("/");
				} else {
					setErrorDetails({
						text: "Something has gone wrong. Please refresh",
						visible: true,
						severity: "error",
					});
				}
			}
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
			<div className={styles.loginContainer}>
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
				<br />
				<br />
				<ErrorMessage {...errorDetails} />
			</div>
		</>
	);
};

export default Login;
