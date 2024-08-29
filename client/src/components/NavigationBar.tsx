import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import FacebookIcon from "@mui/icons-material/Facebook";
import InstagramIcon from "@mui/icons-material/Instagram";
import { Button } from "@mui/material";
import { Link } from "react-router-dom";
import { useAuth } from "../hooks";
import animoriLogo from "../resources/animori-logo.png";
import styles from "../styles/NavigationBar.module.css";
import PrimaryButton from "./PrimaryButton";

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
			{userRole === "admin" && (
				<Link to={`/dashboard/${userID}`}>
					<PrimaryButton text="Admin Dashboard" />
				</Link>
			)}
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
					<p className={styles.accountName}>{userEmail ?? "Login"}</p>
				</div>
				<AccountCircleIcon className={styles.accountIcon} />
			</Link>
		</div>
	);
};

export default NavigationBar;
