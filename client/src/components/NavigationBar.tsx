import "../styling/NavigationBar.css";
import animoriLogo from "../resources/animori-logo.png";
import { Link } from "react-router-dom";
import PrimaryButton from "./PrimaryButton";
import { useAuth } from "../hooks/useAuth";

const NavigationBar: React.FC<{}> = () => {
	const { isAuthenticated, userRole, userID, logout } = useAuth();

	return (
		<div className="top-navigation">
			<img src={animoriLogo} alt="Animori Logo" className="animori-logo" />
			{!isAuthenticated ? (
				<Link to="/login">
					<PrimaryButton text="Login or Register Here!" />
				</Link>
			) : (
				<>
					{userRole === "admin" && (
						<>
							<Link to="/:id/dashboard">
								<PrimaryButton text="Admin Dashboard" />
							</Link>
						</>
					)}
					<Link to={`/profile/${userID}`}>
						<PrimaryButton text="My Profile" />
					</Link>
					<PrimaryButton text="logout" onClick={logout} />
				</>
			)}
		</div>
	);
};

export default NavigationBar;
