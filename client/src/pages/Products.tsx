import NavigationBar from "../components/NavigationBar";
import styles from "../styles/Products.module.css";
import SearchBar from "../components/SearchBar";
import * as api from "../apiControllers/productController";
import { productDetails } from "../models";
import { useEffect, useState } from "react";
import SingleProduct from "../components/SingleProduct";

const Products = (): JSX.Element => {
	const [products, setProducts] = useState<productDetails[]>();

	const handleGetAllProducts = async () => {
		const data = await api.getProducts();
		setProducts(data.products);
	};

	useEffect(() => {
		handleGetAllProducts();
	}, []);

	return (
		<>
			<NavigationBar />
			<SearchBar />
			<div className={styles.productGrid}>
				{products?.map((product) => (
					<SingleProduct {...product} key={product._id} />
				))}
			</div>
		</>
	);
};
export default Products;
