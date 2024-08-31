import { useEffect, useState } from "react";
import { Navigate, useParams } from "react-router-dom";
import * as api from "../apiControllers/userController";
import { NavigationBar, SearchBar } from "../components/";
import { useAuth } from "../hooks";
import { UserDetails } from "../models";
import styles from "../styles/Profile.module.css";

const Profile = (): JSX.Element => {
	const { isAuthenticated, userID, userToken } = useAuth();

	const getProfileData = async () => {
		try {
			if (userID && userToken) {
				const data: UserDetails = await api.getProfileData(userID, userToken);
				setProfileData(data);
			}
		} catch (error) {
			console.error("Could not fetch profile details:", error);
		}
	};

	const [profileData, setProfileData] = useState<UserDetails>({
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
