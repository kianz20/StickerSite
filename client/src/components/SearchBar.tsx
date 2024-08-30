import SearchIcon from "@mui/icons-material/Search";
import { Button, MenuItem } from "@mui/material";
import { useState } from "react";
import { ThemedInput } from "../components";
import styles from "../styles/SearchBar.module.css";

const SearchBar: React.FC<{}> = () => {
	const [category, setCategory] = useState("all");

	const handleCategoryChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		const { value } = event.target;
		setCategory(value);
	};

	return (
		<div className={styles.searchBarContainer}>
			<ThemedInput
				variant="filled"
				select
				id="categoryPicker"
				className={styles.categorySelect}
				value={category}
				onChange={handleCategoryChange}
				hiddenLabel
			>
				<MenuItem value="all">All Categories</MenuItem>
				<MenuItem value="sticker">Stickers</MenuItem>
				<MenuItem value="frames">Frames</MenuItem>
				<MenuItem value="pinsBadges">Pins and Badges</MenuItem>
			</ThemedInput>

			<ThemedInput
				className={styles.searchBar}
				inputProps={{
					style: {
						fontSize: 16,
					},
				}}
				variant="filled"
				hiddenLabel
			></ThemedInput>
			<Button
				aria-label="search"
				variant="contained"
				className={styles.searchButton}
			>
				<SearchIcon fontSize="large" />
			</Button>
		</div>
	);
};

export default SearchBar;
