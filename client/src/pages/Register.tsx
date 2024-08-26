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
import { userDetails } from "../models/userDetails";
import Cookies from "js-cookie";
import NavigationBar from "../components/NavigationBar";
import { loginResponse } from "../models";
import { registerBody } from "../models/registerBody";

const Register = (): JSX.Element => {
	const [registerBody, setRegisterBody] = useState<registerBody>({
		email: "",
		password: "",
		mailingList: false,
	});

	const setCookie = (name: string, value: string) => {
		Cookies.set(name, value, {
			expires: 1,
			sameSite: "None",
			secure: true,
		});
	};

	const navigate = useNavigate();

	const handleRegister = async () => {
		try {
			const data: loginResponse = await api.createUser(registerBody);
			setCookie("token", data.token);
			setCookie("role", data.user.role);
			setCookie("id", data.user.id);
			setCookie("email", data.user.email);

			// Navigate to the home page
			navigate("/");
		} catch (error) {
			// Handle any errors that occur during registration
			console.error("Registration failed:", error);
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
			</div>
		</>
	);
};

export default Register;
