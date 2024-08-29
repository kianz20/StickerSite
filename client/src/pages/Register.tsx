import { useState } from "react";
import styles from "../styles/Login.module.css"; // Import the CSS file
import PrimaryButton from "../components/PrimaryButton"; // Import your button component
import { Link, useNavigate } from "react-router-dom"; // Import Link for navigation
import {
	Checkbox,
	TextField,
	FormGroup,
	FormControlLabel,
} from "@mui/material";
import * as api from "../apiControllers/userController";
import NavigationBar from "../components/NavigationBar";
import { loginResponse } from "../models";
import { registerBody } from "../models/RegisterBody";
import AlertMessage from "../components/AlertMessage";
import { useAlert } from "../hooks/useAlert";
import { useAuth } from "../hooks/useAuth";

const Register = (): JSX.Element => {
	const { setUserCookies } = useAuth();
	const { alertDetails, showAlert } = useAlert();
	const [registerBody, setRegisterBody] = useState<registerBody>({
		email: "",
		password: "",
		mailingList: false,
	});

	const navigate = useNavigate();

	const handleRegister = async (event: React.FormEvent<HTMLFormElement>) => {
		try {
			event.preventDefault();
			const data: loginResponse = await api.createUser(registerBody);
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
