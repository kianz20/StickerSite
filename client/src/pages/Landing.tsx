import { NavigationBar, SearchBar } from "../components/";
import badgesCategoryPicture from "../resources/badgesCategoryShort.png";
import lightupCategoryPicture from "../resources/lightupFrameCategoryShort.png";
import stickerCategoryPicture from "../resources/stickerCategoryShort.png";
import styles from "../styles/Landing.module.css";

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
