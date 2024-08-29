import { TextField } from "@mui/material";
import { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import * as api from "../apiControllers/productController";
import {
	AlertMessage,
	NavigationBar,
	PrimaryButton,
	ThinComponent,
} from "../components/";
import { useAlert } from "../hooks/useAlert";
import { useAuth } from "../hooks/useAuth";
import { ProductDetails } from "../models/ProductDetails";
import styles from "../styles/Dashboard.module.css";

const Dashboard = (): JSX.Element => {
	const { isAuthenticated, userRole, userToken } = useAuth();
	const { alertDetails, showAlert, clearAlert } = useAlert();

	// Contains the details used when adding new products
	const [newProductDetails, setNewProductDetails] = useState<ProductDetails>({
		name: "",
		price: "",
		details: "",
		_id: "",
	});

	const [productDetails, setProductDetails] = useState<ProductDetails[]>();

	const getProductData = async () => {
		if (!userToken) {
			showAlert("Your session has expired. Please log in again", "error");
			return;
		}
		try {
			const data = await api.getProducts(userToken);
			if (data.error) {
				console.error("Fetch products failed: ", data.error);
				showAlert(data.error, "error");
			} else {
				setProductDetails(data.products);
				console.log("Products fetched successfully: ", data.products);
			}
		} catch (error) {
			console.error("Error retreiving products:", error);
			showAlert("Something went wrong", "error");
		}
	};

	useEffect(() => {
		if (userToken && userRole === "admin") {
			getProductData();
		}
	}, [userToken]);

	// Controls which page is displayed (Add product or View products)
	const [page, setPage] = useState("add");

	if (isAuthenticated === undefined || userRole === undefined) {
		return <div>Loading...</div>;
	}
	if (userRole !== "admin") {
		return <Navigate to="/unauthorized" />;
	}

	// Sends the request to create a new product
	const handleAddProduct = async (event: React.FormEvent<HTMLFormElement>) => {
		if (!userToken) {
			showAlert("Your session has expired. Please log in again", "error");
			return;
		}
		try {
			event.preventDefault();
			const data = await api.addProduct(newProductDetails, userToken);
			if (data.error) {
				console.error("Add product failed: ", data.error);
				showAlert(data.error, "error");
			} else {
				console.log("Product added successfully: ", data.message);
				showAlert("Product has been added", "success");
				getProductData();
				setNewProductDetails({
					name: "",
					price: "",
					details: "",
					_id: "",
				});
			}
		} catch (error) {
			console.error("Error retreiving products:", error);
			showAlert("Something went wrong", "error");
		}
	};

	const handleFormChange = async (
		event: React.ChangeEvent<HTMLInputElement>
	) => {
		const { name, value } = event.target;
		setNewProductDetails((prevState) => ({
			...prevState,
			[name]: value,
		}));
	};

	const handlePageChange = (page: string) => {
		setPage(page);
		clearAlert();
	};

	const handleRemoveProduct = async (id: string) => {
		if (!userToken) {
			showAlert("Your session has expired. Please log in again", "error");
			return;
		}
		try {
			setProductDetails((prevProducts) =>
				prevProducts ? prevProducts.filter((product) => product._id !== id) : []
			);
		} catch (error) {
			console.error("Error removing product:", error);
		}
	};
	return (
		<>
			<NavigationBar />
			<p>Dashboard</p>
			<div className={styles.dashboardUtils}>
				<div className={styles.topButtons}>
					<PrimaryButton
						text="Add Product"
						onClick={() => handlePageChange("add")}
					/>
					<PrimaryButton
						className={styles.viewProductsButton}
						text="View Products"
						onClick={() => handlePageChange("view")}
					/>
				</div>
				<br />
				<hr />
				{page === "add" && (
					<div className={styles.addProduct}>
						<form onSubmit={handleAddProduct}>
							<TextField
								className={styles.addProductField}
								label="Product Name"
								variant="outlined"
								fullWidth
								margin="normal"
								required
								name="name"
								value={newProductDetails.name}
								onChange={handleFormChange}
							/>
							<TextField
								className={styles.addProductField}
								label="Price"
								variant="outlined"
								fullWidth
								margin="normal"
								required
								name="price"
								value={newProductDetails.price}
								onChange={handleFormChange}
							/>

							<TextField
								className={styles.addProductField}
								label="Details"
								variant="outlined"
								fullWidth
								margin="normal"
								required
								name="details"
								multiline={true}
								rows={4}
								value={newProductDetails.details}
								onChange={handleFormChange}
							/>
							<PrimaryButton text="Add Product" type="submit" />
						</form>
						<br />
						<br />
						<AlertMessage {...alertDetails} />
					</div>
				)}
				{page === "view" && (
					<div className={styles.viewProduct}>
						<div className={styles.productGrid}>
							<br />
							{productDetails?.map((product, index) => (
								<ThinComponent
									key={product._id}
									color={index % 2 === 0 ? "#ccc5e3" : "#d9d7e0"} // Alternates between red and blue
									{...product}
									onRemove={handleRemoveProduct}
								/>
							))}
						</div>
						<br />
						<br />
						<AlertMessage {...alertDetails} />
					</div>
				)}
			</div>
		</>
	);
};

export default Dashboard;
