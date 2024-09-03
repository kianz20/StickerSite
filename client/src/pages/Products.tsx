import FilterAltIcon from "@mui/icons-material/FilterAlt";
import { MenuItem, Select, SelectChangeEvent, Typography } from "@mui/material";
import { useEffect, useRef, useState } from "react";
import * as api from "../api/productController";
import {
	NavigationBar,
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

	const [query, setQuery] = useState("");

	const [filtersOpen, setFiltersOpen] = useState(false);
	const [sortBy, setSortBy] = useState("mostPopular");

	const filterMenuRef = useRef<HTMLDivElement>(null);

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
	};

	const handleSortByChange = (event: SelectChangeEvent<string>) => {
		const { value } = event.target;
		setSortBy(value);
	};

	const toggleFilterOpen = () => {
		setFiltersOpen(!filtersOpen);
	};

	const handleClickOutside = (event: MouseEvent) => {
		if (
			filterMenuRef.current &&
			!filterMenuRef.current.contains(event.target as Node)
		) {
			setFiltersOpen(false);
		}
	};

	useEffect(() => {
		handleGetAllProducts();
	}, [userToken]);

	useEffect(() => {
		const params = new URLSearchParams(location.search);
		const searchQuery = params.get("searchQuery") ?? "";
		const searchCategories = (params.get("categories") ?? "").split(",");
		if (searchCategories[0] !== "") {
			setFilters((prevFilters) => ({
				...prevFilters,
				category: searchCategories,
			}));
		}
		setQuery(searchQuery);
	}, [location.search]);

	useEffect(() => {
		document.addEventListener("mousedown", handleClickOutside);
		return () => {
			document.removeEventListener("mousedown", handleClickOutside);
		};
	}, []);

	const sortedProducts = products
		?.filter((product) => {
			const inCategory = filters?.category?.includes(product.category);
			const withinPriceRange =
				(filters.minPrice === undefined || product.price >= filters.minPrice) &&
				(filters.maxPrice === undefined || product.price <= filters.maxPrice);
			const matchesQuery = query
				? product.name.toLowerCase().includes(query.toLowerCase())
				: true;

			return inCategory && withinPriceRange && matchesQuery;
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

	const handleQueryChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		setQuery(event.target.value);
	};

	const handleCheckboxChange = (category: string) => {
		setFilters((prevFilters) => {
			const currentCategories = prevFilters.category || [];

			const newCategories = currentCategories.includes(category)
				? currentCategories.filter((cat) => cat !== category)
				: [...currentCategories, category];

			return { ...prevFilters, category: newCategories };
		});
	};

	return (
		<>
			<NavigationBar />
			<div className={styles.filterProductsBar}>
				<ThemedInput
					size="small"
					placeholder="Search Query"
					value={query}
					onChange={handleQueryChange}
				/>
				<Typography> {sortedProducts?.length} Items</Typography>
				<ThemedButton
					backgroundColor="#ededed"
					variant="text"
					onClick={toggleFilterOpen}
				>
					<FilterAltIcon className={styles.filterIcon} />
				</ThemedButton>
				{filtersOpen && (
					<div className={styles.filterMenu} ref={filterMenuRef}>
						<Typography
							className={styles.filtersTitle}
							fontWeight={"fontWeightBold"}
						>
							Filters
						</Typography>
						<br />
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
