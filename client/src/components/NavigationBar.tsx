import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import FacebookIcon from "@mui/icons-material/Facebook";
import InstagramIcon from "@mui/icons-material/Instagram";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import { Typography } from "@mui/material";
import { Link } from "react-router-dom";
import { useAuth, useCart } from "../hooks";
import animoriLogo from "../resources/animori-logo.png";
import styles from "../styles/NavigationBar.module.css";
import ThemedButton from "./ThemedButton";

const NavigationBar: React.FC<{}> = () => {
	const { isAuthenticated, userRole, userID, userEmail, logout } = useAuth();
	const { cartCount, cartTotal } = useCart();

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

			<div className={styles.buttonContainer}>
				{userRole === "admin" && (
					<Link to={`/dashboard/${userID}`}>
						<ThemedButton text="Admin Dashboard" backgroundColor="black" />
					</Link>
				)}
				{isAuthenticated && (
					<ThemedButton
						text="Logout"
						className={styles.logoutButton}
						onClick={logout}
						backgroundColor="white"
						textColor="black"
					/>
				)}
			</div>

			<div className={styles.cartContainer}>
				<div className={styles.cartIcon}>
					<ShoppingCartIcon />
					<Typography>
						{`${cartCount !== 0 ? cartCount : "No"} items`}
					</Typography>
				</div>
				<Typography>{`$${cartTotal.toFixed(2)}`}</Typography>
			</div>

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
