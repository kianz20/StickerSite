import React from "react";
import { useState } from "react";
import "../styling/Login.css"; // Import the CSS file
import PrimaryButton from "../components/PrimaryButton"; // Import your button component
import { Link } from "react-router-dom"; // Import Link for navigation
import {
	Checkbox,
	TextField,
	FormGroup,
	FormControlLabel,
} from "@mui/material";

const Register = () => {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [mailingList, setMailingList] = useState(false);

	const handleRegister = async () => {
		try {
			const response = await fetch("http://localhost:5050/api/users/", {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({ email, password, mailingList }),
			});

			if (!response.ok) {
				throw new Error("Registration failed");
			}

			const data = await response.json();
			console.log("Registration successful", data);
		} catch (error) {
			console.error("Error:", error);
		}
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
				<FormGroup className="checkbox-container">
					<FormControlLabel
						control={
							<Checkbox onChange={(e) => setMailingList(e.target.checked)} />
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
