import { useEffect, useState } from "react";
import * as api from "../apiControllers/productController";
import { NavigationBar, SearchBar, SingleProduct } from "../components/";
import { useAuth } from "../hooks";
import { ProductDetails } from "../models";
import styles from "../styles/Products.module.css";

const Products = (): JSX.Element => {
	const [products, setProducts] = useState<ProductDetails[]>();
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
