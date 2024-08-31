import { useEffect, useState } from "react";
import * as api from "../apiControllers/productController";
import NavigationBar from "../components/NavigationBar";
import SearchBar from "../components/SearchBar";
import SingleProduct from "../components/SingleProduct";
import { useAuth } from "../hooks/useAuth";
import { productDetails } from "../models";
import styles from "../styles/Products.module.css";

const Products = (): JSX.Element => {
	const [products, setProducts] = useState<productDetails[]>();
	const { userToken } = useAuth();

	const handleGetAllProducts = async () => {
		if (userToken) {
			const data = await api.getProducts();
			setProducts(data.products);
		}
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
