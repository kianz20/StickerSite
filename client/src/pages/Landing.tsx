import PrimaryButton from "../components/PrimaryButton";
import { useAuth } from "../hooks/useAuth";
import NavigationBar from "../components/NavigationBar";

const Landing = (): JSX.Element => {
	const { userToken, userRole } = useAuth();

	return (
		<>
			<NavigationBar />
			<p>Welcome to Animori, where you can get all your anime memorabilia!</p>

			<div className="button-container">
				{userToken ? (
					<>
						<p>Welcome, {userRole}</p>
						{userRole === "admin" ? (
							<>
								<p>I'm an admin</p>
							</>
						) : (
							<>
								<p>I'm a user</p>
							</>
						)}
					</>
				) : (
					<>
						<p>Check out our store or login above</p>
						<PrimaryButton text="Find out more!" />
					</>
				)}
			</div>
		</>
	);
};

export default Landing;
