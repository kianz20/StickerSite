import FilterAltIcon from "@mui/icons-material/FilterAlt";
import { Typography } from "@mui/material";
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
	minPrice: number;
	maxPrice: number;
	category: string;
	franchise: string;
}

const Products = (): JSX.Element => {
	const [products, setProducts] = useState<ProductDetails[]>();
	const [filters, setFilters] = useState<FilterOptions>();
	const { userToken } = useAuth();

	const handleGetAllProducts = async () => {
		if (userToken) {
			const data = await api.getProducts();
			setProducts(data.products);
		}
	};

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
				<Typography> Sort By: </Typography>
				<ThemedInput select />
			</div>
			<div className={styles.productGrid}>
				{products?.map((product) => (
					<SingleProduct {...product} key={product._id} />
				))}
			</div>
		</>
	);
};
export default Products;
