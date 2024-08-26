import NavigationBar from "../components/NavigationBar";
import styles from "../styling/Products.module.css";
import SearchBar from "../components/SearchBar";
import * as api from "../apiControllers/productController";
import { productDetails } from "../models";
import { useEffect, useState } from "react";
import SingleProduct from "../components/SingleProduct";

const Products = (): JSX.Element => {

    const [allProducts, setAllProducts] = useState<productDetails[]>()

    const handleGetAllProducts = async () => {
        const data = await api.getAllProducts();
        setAllProducts(data.allProducts)
    }

    useEffect(() => {
        handleGetAllProducts()
    }, []);

    return (
        <>
            <NavigationBar/>
            <SearchBar/>
            <div className={styles.productGrid}>
                {allProducts?.map(product=>
                    <SingleProduct {...product} key={product._id}/>
                )}
            </div>
        </>
    )
}
export default Products
