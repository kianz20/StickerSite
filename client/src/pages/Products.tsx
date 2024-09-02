import FilterAltIcon from "@mui/icons-material/FilterAlt";
import { MenuItem, Select, SelectChangeEvent, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import * as api from "../api/productController";
import {
	NavigationBar,
	SearchBar,
	SingleProduct,
	ThemedButton,
} from "../components/";
import { useAuth } from "../hooks";
import { ProductDetails } from "../models";
import styles from "../styles/Products.module.css";

interface FilterOptions {
	minPrice: number;
	maxPrice: number;
	category: string;
	franchise: string;
}

const Products = (): JSX.Element => {
	const [products, setProducts] = useState<ProductDetails[]>();
	const [filters, setFilters] = useState<FilterOptions>();
	const [sortBy, setSortBy] = useState("mostPopular");
	const { userToken } = useAuth();

	const handleGetAllProducts = async () => {
		if (userToken) {
			const data = await api.getProducts();
			setProducts(data.products);
		}
	};

	const handleSortByChange = (event: SelectChangeEvent<string>) => {
		const { value } = event.target;
		setSortBy(value);
	};

	const sortedProducts = products?.slice().sort((a, b) => {
		if (sortBy === "priceAsc") {
			return a.price - b.price;
		} else if (sortBy === "priceDesc") {
			return b.price - a.price;
		}
		return 0;
	});

	useEffect(() => {
		handleGetAllProducts();
	}, [userToken]);

	return (
		<>
			<NavigationBar />
			<SearchBar />

			<div className={styles.filterProductsBar}>
				<Typography> {products?.length} Items</Typography>
				<ThemedButton variant="text">
					<FilterAltIcon className={styles.filterIcon} />
				</ThemedButton>
				<Typography className={styles.sortByText}> Sort By: </Typography>
				<Select
					variant="standard"
					value={sortBy}
					onChange={handleSortByChange}
					displayEmpty={true}
					className={styles.sortBySelect}
				>
					<MenuItem value="mostPopular">Most Popular</MenuItem>
					<MenuItem value="highestRated">Highest Rated</MenuItem>
					<MenuItem value="priceAsc">Price Asc.</MenuItem>
					<MenuItem value="priceDesc">Price Desc.</MenuItem>
				</Select>
			</div>
			<div className={styles.productGrid}>
				{sortedProducts?.map((product) => (
					<SingleProduct {...product} key={product._id} />
				))}
			</div>
		</>
	);
};
export default Products;
