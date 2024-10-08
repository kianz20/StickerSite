import SearchIcon from "@mui/icons-material/Search";
import { Checkbox, ListItemText, MenuItem, Typography } from "@mui/material";
import FormControl from "@mui/material/FormControl";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import * as api from "../api/productController";
import categoryList from "../constants/categoryList";
import { ProductDetails } from "../models";
import styles from "../styles/SearchBar.module.css";
import SingleSearchResult from "./SingleSearchResult";
import ThemedButton from "./ThemedButton";
import ThemedInput from "./ThemedInput";

const SearchBar: React.FC<{}> = () => {
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

	const navigate = useNavigate();

	const getProductData = async () => {
		try {
			const data = await api.getProducts();
			if (data.error) {
				console.error("Fetch products failed: ", data.error);
			} else {
				setProductDetails(data.products);
			}
		} catch (error) {
			console.error("Error retrieving products:", error);
		}
	};

	const filteredProducts =
		productDetails?.filter(
			(product) =>
				product.name.toLowerCase().includes(searchQuery.toLowerCase()) &&
				selectedCategories.includes(product.category)
		) || [];

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
							displayEmpty
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

					<ThemedInput
						className={styles.searchEntry}
						variant="filled"
						placeholder="Search"
						onChange={(event) => setSearchQuery(event.target.value)}
						hiddenLabel
					></ThemedInput>
				</div>
			</div>
			{searchQuery && (
				<div className={styles.searchResultsContainer}>
					{filteredProducts.length > 0 ? (
						<>
							<div className={styles.productsGrid}>
								{filteredProducts.slice(0, 8).map((product) => (
									<SingleSearchResult key={product._id} {...product} />
								))}
							</div>

							<ThemedButton
								className={styles.seeAllButton}
								onClick={() => {
									navigate(
										`/products/?searchQuery=${searchQuery}&categories=${selectedCategories}`
									);
								}}
								aria-label="View All Search Results"
							>
								View All Results &emsp;&emsp;
								<SearchIcon fontSize="large" sx={{ color: "black" }} />
							</ThemedButton>
						</>
					) : (
						<Typography className={styles.noResultsText}>No Results</Typography>
					)}
				</div>
			)}
		</div>
	);
};

export default SearchBar;
