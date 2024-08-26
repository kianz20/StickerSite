import { useState } from "react";
import styles from "../styling/Login.module.css"; // Import the CSS file
import PrimaryButton from "../components/PrimaryButton"; // Import your button component
import { Link, useNavigate } from "react-router-dom"; // Import Link for navigation
import {
	Checkbox,
	TextField,
	FormGroup,
	FormControlLabel,
} from "@mui/material";
import * as api from "../apiControllers/userController";
import Cookies from "js-cookie";
import NavigationBar from "../components/NavigationBar";
import { loginResponse } from "../models";
import { registerBody } from "../models/registerBody";
import ErrorMessage, { Severity } from "../components/ErrorMessage";

const Register = (): JSX.Element => {
	const [registerBody, setRegisterBody] = useState<registerBody>({
		email: "",
		password: "",
		mailingList: false,
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

	const handleRegister = async () => {
		try {
			const data: loginResponse = await api.createUser(registerBody);
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
		const { name, value, checked, type } = event.target;
		setRegisterBody((prevState) => ({
			...prevState,
			[name]: type === "checkbox" ? checked : value,
		}));
	};

	return (
		<>
			<NavigationBar />
			<div className={styles.loginContainer}>
				<h2>Register for an Animori Account!</h2>
				<form>
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
					<FormGroup className="checkbox-container">
						<FormControlLabel
							control={
								<Checkbox name="mailingList" onChange={handleFormChange} />
							}
							label="Notify me when new products drop"
							className="notify-checkbox"
						/>
					</FormGroup>
					<br />
					<br />
					<PrimaryButton text="Register" onClick={handleRegister} />
				</form>
				<br />
				<Link to="/">
					<PrimaryButton text="Back to main menu" />
				</Link>
				<Link to="/login">
					<PrimaryButton text="Back to login page" />
				</Link>
				<br />
				<br />
				<ErrorMessage {...errorDetails} />
			</div>
		</>
	);
};

export default Register;
