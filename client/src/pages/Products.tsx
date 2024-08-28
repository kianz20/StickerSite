import NavigationBar from "../components/NavigationBar";
import styles from "../styles/Products.module.css";
import SearchBar from "../components/SearchBar";
import * as api from "../apiControllers/productController";
import { productDetails } from "../models";
import { useEffect, useState } from "react";
import SingleProduct from "../components/SingleProduct";
import { useAuth } from "../hooks/useAuth";

const Products = (): JSX.Element => {
	const [products, setProducts] = useState<productDetails[]>();
	const { userToken } = useAuth();

	const handleGetAllProducts = async () => {
		if (userToken) {
			const data = await api.getProducts(userToken);
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
