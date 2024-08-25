import NavigationBar from "../components/NavigationBar";
import { useAuth } from "../hooks/useAuth";
import { Navigate, useParams } from "react-router-dom";
import * as api from "../apiControllers/userController";
import { useEffect, useState } from "react";
import { userDetails } from "../models";

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

	if (isAuthenticated === undefined || userID === "") {
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
			<p>Profile</p>
			<p>Email: {profileData.email}</p>
			<p>Mailing List: {profileData.mailingList.toString()}</p>
		</>
	);
};

export default Profile;
