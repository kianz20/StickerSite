import { useState } from "react";
import "../styling/Login.css"; // Import the CSS file
import PrimaryButton from "../components/PrimaryButton"; // Import your button component
import { Link, useNavigate } from "react-router-dom"; // Import Link for navigation
import {
	Checkbox,
	TextField,
	FormGroup,
	FormControlLabel,
} from "@mui/material";
import * as api from "../apiControllers/userController";
import { registerBody } from "../models/registerBody";

const Register = (): JSX.Element => {
	const [registerBody, setRegisterBody] = useState<registerBody>({
		email: "",
		password: "",
		mailingList: false,
	});

	const navigate = useNavigate();

	const handleRegister = async () => {
		console.log(registerBody);
		api
			.createUser(registerBody)
			.then(() => {
				navigate("/");
			})
			.catch((error) => {
				console.log(error);
			});
	};

	const handleFormChange = async (
		event: React.ChangeEvent<HTMLInputElement>
	) => {
		const { name, value, checked } = event.target;
		if (name === "mailingList") {
			setRegisterBody((prevState) => ({ ...prevState, [name]: checked }));
		}
		setRegisterBody((prevState) => ({ ...prevState, [name]: value }));
	};

	return (
		<div className="login-container">
			<h2>Register for an Animori Account!</h2>
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
	);
};

export default Register;
