import NavigationBar from "../components/NavigationBar";
import styles from "../styles/Landing.module.css";
import stickerCategoryPicture from "../resources/stickerCategoryShort.png";
import lightupCategoryPicture from "../resources/lightupFrameCategoryShort.png";
import badgesCategoryPicture from "../resources/badgesCategoryShort.png";
import SearchBar from "../components/SearchBar";

const Landing = (): JSX.Element => {
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
			</div>
		</>
	);
};

export default Landing;
