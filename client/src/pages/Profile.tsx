import NavigationBar from "../components/NavigationBar";
import { useAuth } from "../hooks/useAuth";
import { Navigate, useParams } from "react-router-dom";
import * as api from "../apiControllers/userController";
import { useEffect, useState } from "react";
import { userDetails } from "../models";
import styles from "../styles/Profile.module.css";
import SearchBar from "../components/SearchBar";

const Profile = (): JSX.Element => {
	const { isAuthenticated, userID, userToken } = useAuth();

	const getProfileData = async () => {
		try {
			if (userID && userToken) {
				const data: userDetails = await api.getProfileData(userID, userToken);
				setProfileData(data);
			}
		} catch (error) {
			console.error("Could not fetch profile details:", error);
		}
	};

	const [profileData, setProfileData] = useState<userDetails>({
		email: "",
		mailingList: false,
	});

	useEffect(() => {
		getProfileData(); // Call the function on component mount
	}, [userID, userToken]);

	const { id } = useParams();

	if (isAuthenticated === undefined || userID === undefined) {
		return <div>Loading...</div>; // Handle loading state or redirect
	}
	if (!isAuthenticated) {
		return <Navigate to="/unauthorized" />;
	}
	if (userID !== id) {
		return <Navigate to="/unauthorized" />;
	}

	return (
		<>
			<NavigationBar />
			<SearchBar />
			<h2>My Account</h2>
			<div className={styles.detailList}>
				<div className={styles.personalDetails}>
					<h3>Personal Details:</h3>
					<p>Email: {profileData.email}</p>
					<p>Mailing List: {profileData.mailingList.toString()}</p>
				</div>
				<hr></hr>
				<div className={styles.orderDetails}>
					<h3>Order History:</h3>
				</div>
			</div>
		</>
	);
};

export default Profile;
