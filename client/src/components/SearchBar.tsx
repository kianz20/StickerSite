import SearchIcon from "@mui/icons-material/Search";
import {
	Button,
	Checkbox,
	ListItemText,
	MenuItem,
	TextField,
} from "@mui/material";
import FormControl from "@mui/material/FormControl";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import React, { useEffect, useState } from "react";
import * as api from "../apiControllers/productController";
import { ProductDetails } from "../models";
import styles from "../styles/SearchBar.module.css";
import SingleSearchResult from "./SingleSearchResult";

const SearchBar: React.FC<{}> = () => {
	const categoryList = ["Stickers", "Frames", "Pins and Badges"];

	const [selectedCategories, setSelectedCategories] =
		useState<string[]>(categoryList);
	const [searchQuery, setSearchQuery] = useState("");

	const [productDetails, setProductDetails] = useState<ProductDetails[]>();

	const handleCategorySelect = (event: SelectChangeEvent<string[]>) => {
		const { value } = event.target;
		if (value.includes("selectAll")) {
			setSelectedCategories(
				value.length === categoryList.length + 1 ? [] : categoryList
			);
		} else {
			setSelectedCategories(value as string[]);
		}
	};

	const getProductData = async () => {
		try {
			const data = await api.getProducts();
			if (data.error) {
				console.error("Fetch products failed: ", data.error);
			} else {
				setProductDetails(data.products);
				console.log("Products fetched successfully: ", data.products);
			}
		} catch (error) {
			console.error("Error retrieving products:", error);
		}
	};

	useEffect(() => {
		getProductData();
	}, []);

	return (
		<div>
			<div className={styles.searchBanner}>
				<div className={styles.searchBarContainer}>
					<FormControl className={styles.categorySelect}>
						<Select
							multiple
							value={selectedCategories}
							onChange={handleCategorySelect}
							displayEmpty={true}
							renderValue={(selected) => {
								if (selected.length === 0) return "Select Categories";
								if (selected.length === 1) return selected;
								if (selected.length === categoryList.length)
									return "All Categories";
								return `Multiple Categories`;
							}}
						>
							<MenuItem value="selectAll">
								<Checkbox
									checked={selectedCategories.length === categoryList.length}
								/>
								<ListItemText primary="Select All" />
							</MenuItem>
							{categoryList.map((category) => (
								<MenuItem key={category} value={category}>
									<Checkbox
										checked={selectedCategories.indexOf(category) > -1}
									/>
									<ListItemText primary={category} />
								</MenuItem>
							))}
						</Select>
					</FormControl>

					<TextField
						className={styles.searchEntry}
						variant="filled"
						placeholder="Search"
						onChange={(event) => setSearchQuery(event.target.value)}
						hiddenLabel
					></TextField>
				</div>
			</div>

			<div className={styles.empty}>
				<div className={styles.searchResultsContainer}>
					{searchQuery &&
						productDetails
							?.filter(
								(product) =>
									product.name.includes(searchQuery) &&
									selectedCategories.includes(product.category)
							)
							?.slice(0, 8)
							.map((product) => (
								<SingleSearchResult key={product._id} {...product} />
							))}
					<div className={styles.seeAllButton}>
						<Button
							className={styles.buttonText}
							onClick={() => {
								alert("functionality does not exist yet");
							}}
							aria-label="View All Search Results"
						>
							View All Results &emsp;&emsp;
							<SearchIcon fontSize="large" sx={{ color: "black" }} />
						</Button>
					</div>
				</div>
			</div>
		</div>
	);
};

export default SearchBar;
