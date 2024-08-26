import { Navigate } from "react-router-dom";
import NavigationBar from "../components/NavigationBar";
import { useAuth } from "../hooks/useAuth";
import styles from "../styles/Dashboard.module.css";
import { TextField } from "@mui/material";
import { productDetails } from "../models/productDetails";
import { useEffect, useState } from "react";
import * as api from "../apiControllers/productController";
import PrimaryButton from "../components/PrimaryButton";
import ErrorMessage, { Severity } from "../components/ErrorMessage";

const Dashboard = (): JSX.Element => {
	const { isAuthenticated, userRole } = useAuth();

	// Contains the details used when adding new products
	const [newProductDetails, setNewProductDetails] = useState<productDetails>({
		name: "",
		price: "",
		details: "",
		_id: "",
	});

	const [productDetails, setProductDetails] = useState<productDetails[]>();

	// Contains the error shown to the user
	const [errorDetails, setErrorDetails] = useState<{
		text: string;
		visible: boolean;
		severity: Severity;
	}>({
		text: "",
		visible: false,
		severity: "error",
	});

	const getProductData = async () => {
		const data = await api.getProducts();
		if (data.error) {
			console.error("Fetch products failed: ", data.error);
			setErrorDetails({
				text: data.error,
				visible: true,
				severity: "error",
			});
		} else {
			setProductDetails(data.products);
			console.log("Products fetched successfully: ", data.products);
		}
	};

	useEffect(() => {
		getProductData();
	}, []);

	// Controls which page is displayed (Add product or View products)
	const [page, setPage] = useState("add");

	if (isAuthenticated === undefined || userRole === undefined) {
		return <div>Loading...</div>;
	}
	if (userRole !== "admin") {
		return <Navigate to="/unauthorized" />;
	}

	// Sends the request to create a new product
	const handleAddProduct = async () => {
		const data = await api.addProduct(newProductDetails);

		if (data.error) {
			console.error("Add product failed: ", data.error);
			setErrorDetails({
				text: data.error,
				visible: true,
				severity: "error",
			});
		} else {
			console.log("Product added successfully: ", data.message);
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
						<TextField
							className={styles.addProductField}
							label="Product Name"
							variant="outlined"
							fullWidth
							margin="normal"
							required
							name="name"
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
							onChange={handleFormChange}
						/>
						<PrimaryButton text="Add Product" onClick={handleAddProduct} />
						<br />
						<br />
						<ErrorMessage {...errorDetails} />
					</div>
				)}
				{page === "view" && (
					<div className={styles.viewProduct}>
						<div className={styles.productGrid}>
							{productDetails?.map((product) => (
								<p key={product._id}>{product.name}</p>
							))}
						</div>
						<PrimaryButton text="Add Product" onClick={handleAddProduct} />
						<br />
						<br />
						<ErrorMessage {...errorDetails} />
					</div>
				)}
			</div>
		</>
	);
};

export default Dashboard;
