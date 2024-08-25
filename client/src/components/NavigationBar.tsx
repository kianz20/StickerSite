import styles from "../styling/NavigationBar.module.css";
import animoriLogo from "../resources/animori-logo.png";
import { Link } from "react-router-dom";
import PrimaryButton from "./PrimaryButton";
import { useAuth } from "../hooks/useAuth";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import FacebookIcon from "@mui/icons-material/Facebook";
import InstagramIcon from "@mui/icons-material/Instagram";
import { Button } from "@mui/material";

const NavigationBar: React.FC<{}> = () => {
	const { isAuthenticated, userRole, userID, userEmail, logout } = useAuth();

	return (
		<div className={styles.topNavigation}>
			<Link to="/">
				<img
					src={animoriLogo}
					alt="Animori Logo"
					className={styles.animoriLogo}
				/>
			</Link>

			<div className={styles.iconContainer}>
				<Link to="/">
					<FacebookIcon className={styles.socialIcon} />
				</Link>
				<Link to="/">
					<InstagramIcon className={styles.socialIcon} />
				</Link>
			</div>
			{isAuthenticated && (
				<Button className={styles.logoutButton} onClick={logout}>
					logout
				</Button>
			)}
			<Link
				to={isAuthenticated ? `/profile/${userID}` : "/login"}
				className={styles.linkContainer}
			>
				<div>
					<p className={styles.accountName}>{userEmail || "Login"}</p>
				</div>
				<AccountCircleIcon className={styles.accountIcon} />
			</Link>

			{/* {userRole === "admin" && (
						<>
							<Link to={`/dashboard/${userID}`}>
								<PrimaryButton text="Admin Dashboard" />
							</Link>
						</>
					)}
					<Link to={`/profile/${userID}`}>
						<PrimaryButton text="Profile Settings" />
					</Link> */}
		</div>
	);
};

export default NavigationBar;
