import {
	Checkbox,
	FormControlLabel,
	FormGroup,
	TextField,
} from "@mui/material";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom"; // Import Link for navigation
import * as api from "../apiControllers/userController";
import { AlertMessage, NavigationBar, PrimaryButton } from "../components/"; // Import your button component
import { useAlert } from "../hooks/useAlert";
import { useAuth } from "../hooks/useAuth";
import { LoginResponse } from "../models";
import { RegisterBody } from "../models/RegisterBody";
import styles from "../styles/Login.module.css"; // Import the CSS file

const Register = (): JSX.Element => {
	const { setUserCookies } = useAuth();
	const { alertDetails, showAlert } = useAlert();
	const [registerBody, setRegisterBody] = useState<RegisterBody>({
		email: "",
		password: "",
		mailingList: false,
	});

	const navigate = useNavigate();

	const handleRegister = async (event: React.FormEvent<HTMLFormElement>) => {
		try {
			event.preventDefault();
			const data: LoginResponse = await api.createUser(registerBody);
			if (data.error) {
				console.error("Register failed: ", data.error);
				showAlert(data.error, "error");
			} else {
				setUserCookies(data);
				// Navigate to the home page after successful login
				navigate("/");
			}
		} catch (error) {
			console.error("Error during login:", error);
			showAlert("Error during registration. Please try again.", "error");
		}
	};

	const handleFormChange = (event: React.ChangeEvent<HTMLInputElement>) => {
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
				<form onSubmit={handleRegister}>
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
					<PrimaryButton text="Register" type="submit" />
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
				<AlertMessage {...alertDetails} />
			</div>
		</>
	);
};

export default Register;
