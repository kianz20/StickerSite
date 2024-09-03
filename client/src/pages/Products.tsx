import FilterAltIcon from "@mui/icons-material/FilterAlt";
import { MenuItem, Select, SelectChangeEvent, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import * as api from "../api/productController";
import {
	NavigationBar,
	SearchBar,
	SingleProduct,
	ThemedButton,
	ThemedInput,
} from "../components/";
import { useAuth } from "../hooks";
import { ProductDetails } from "../models";
import styles from "../styles/Products.module.css";

interface FilterOptions {
	minPrice?: number;
	maxPrice?: number;
	category?: string[];
	franchise?: string[];
}

const Products = (): JSX.Element => {
	const { userToken } = useAuth();
	const categoryList = ["Stickers", "Frames", "Pins and Badges", "misc"];
	const [products, setProducts] = useState<ProductDetails[]>();
	const [filters, setFilters] = useState<FilterOptions>({
		category: categoryList,
	});
	const [minPrice, setMinPrice] = useState<string>("");
	const [maxPrice, setMaxPrice] = useState<string>("");

	const [filtersOpen, setFiltersOpen] = useState(false);
	const [sortBy, setSortBy] = useState("mostPopular");

	const handleGetAllProducts = async () => {
		if (userToken) {
			const data = await api.getProducts();
			setProducts(data.products);
		}
	};

	const applyFilters = () => {
		setFilters((prevFilters) => ({
			...prevFilters,
			minPrice: minPrice ? parseFloat(minPrice) : undefined,
			maxPrice: maxPrice ? parseFloat(maxPrice) : undefined,
		}));
		console.log(filters);
	};

	const handleSortByChange = (event: SelectChangeEvent<string>) => {
		const { value } = event.target;
		setSortBy(value);
	};

	const toggleFilterOpen = () => {
		setFiltersOpen(!filtersOpen);
	};

	const sortedProducts = products
		?.filter((product) => {
			const inCategory = filters?.category?.includes(product.category);
			const withinPriceRange =
				(filters.minPrice === undefined || product.price >= filters.minPrice) &&
				(filters.maxPrice === undefined || product.price <= filters.maxPrice);

			return inCategory && withinPriceRange;
		})
		.slice()
		.sort((a, b) => {
			if (sortBy === "priceAsc") {
				return a.price - b.price;
			} else if (sortBy === "priceDesc") {
				return b.price - a.price;
			}
			return 0;
		});

	const handleCheckboxChange = (category: string) => {
		setFilters((prevFilters) => {
			const currentCategories = prevFilters.category || [];

			const newCategories = currentCategories.includes(category)
				? currentCategories.filter((cat) => cat !== category)
				: [...currentCategories, category];

			return { ...prevFilters, category: newCategories };
		});
	};

	useEffect(() => {
		handleGetAllProducts();
	}, [userToken]);

	return (
		<>
			<NavigationBar />
			<SearchBar />

			<div className={styles.filterProductsBar}>
				<Typography> {sortedProducts?.length} Items</Typography>
				<ThemedButton variant="text" onClick={toggleFilterOpen}>
					<FilterAltIcon className={styles.filterIcon} />
				</ThemedButton>
				{filtersOpen && (
					<div className={styles.filterMenu}>
						<Typography className={styles.filtersTitle}>Filters</Typography>
						<div className={styles.priceFilterContainer}>
							<Typography className={styles.filtersTitle}>Price:</Typography>
							<ThemedInput
								inputProps={{ maxLength: 4 }}
								className={styles.priceSelector}
								size="small"
								value={minPrice}
								onChange={(e) => setMinPrice(e.target.value)}
							/>
							<Typography> - </Typography>
							<ThemedInput
								inputProps={{ maxLength: 4 }}
								className={styles.priceSelector}
								size="small"
								value={maxPrice}
								onChange={(e) => setMaxPrice(e.target.value)}
							/>
							<ThemedButton text="Apply" onClick={applyFilters} />
						</div>
						<div className={styles.categorySelector}>
							{categoryList.map((category) => (
								<div key={category}>
									<label>
										<input
											type="checkbox"
											checked={filters.category?.includes(category)}
											onChange={() => handleCheckboxChange(category)}
										/>
										{category}
									</label>
								</div>
							))}
						</div>
					</div>
				)}
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
