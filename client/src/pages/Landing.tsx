import NavigationBar from "../components/NavigationBar";
import styles from "../styling/Landing.module.css";
import stickerCategoryPicture from "../resources/stickerCategoryShort.png";
import lightupCategoryPicture from "../resources/lightupFrameCategoryShort.png";
import badgesCategoryPicture from "../resources/badgesCategoryShort.png";
import SearchBar from "../components/SearchBar";

const Landing = (): JSX.Element => {
	// const { userToken, userRole } = useAuth();

	return (
		<>
			<NavigationBar />
			<SearchBar />
			<div className={styles.categoriesContainer}>
				<img
					src={stickerCategoryPicture}
					alt="stickers"
					className={styles.categoryPicture}
				/>
				<img
					src={lightupCategoryPicture}
					alt="lightUpFrame"
					className={styles.categoryPicture}
				/>
				<img
					src={badgesCategoryPicture}
					alt="badges"
					className={styles.categoryPicture}
				/>
				{/* {userToken ? (
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
						<p className={styles.description}>
							Check out our store or login above
						</p>
						<PrimaryButton text="Find out more!" />
					</>
				)} */}
			</div>
		</>
	);
};

export default Landing;
