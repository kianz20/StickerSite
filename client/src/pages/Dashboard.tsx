import { Navigate } from "react-router-dom";
import NavigationBar from "../components/NavigationBar";
import { useAuth } from "../hooks/useAuth";
import styles from "../styles/Dashboard.module.css";
import { TextField } from "@mui/material";
import { productDetails } from "../models/productDetails";
import { useState } from "react";
import * as api from "../apiControllers/productController";
import PrimaryButton from "../components/PrimaryButton";
import ErrorMessage from "../components/ErrorMessage";
import { Severity } from "../components/ErrorMessage";

const Dashboard = (): JSX.Element => {
	const { isAuthenticated, userRole } = useAuth();
	const [productDetails, setProductDetails] = useState<productDetails>({
		name: "",
		price: "",
		details: "",
		_id: "",
	});
	const [errorDetails, setErrorDetails] = useState<{
		text: string;
		visible: boolean;
		severity: Severity;
	}>({
		text: "",
		visible: false,
		severity: "error",
	});

	if (isAuthenticated === undefined || userRole === undefined) {
		return <div>Loading...</div>; // Handle loading state or redirect
	}
	if (userRole !== "admin") {
		return <Navigate to="/unauthorized" />;
	}

	const handleAddProduct = async () => {
		const data = await api.addProduct(productDetails);

		if (data.error) {
			console.error("Add product failed: ", data.error);
			setErrorDetails({
				text: data.error,
				visible: true,
				severity: "error",
			});
			// Handle error (e.g., show in a UI component)
		} else {
			console.log("Product added successfully: ", data.message);
			// Handle success (e.g., show success message in a UI component)
		}
	};
	const handleFormChange = async (
		event: React.ChangeEvent<HTMLInputElement>
	) => {
		const { name, value } = event.target;
		setProductDetails((prevState) => ({
			...prevState,
			[name]: value,
		}));
	};
	return (
		<>
			<NavigationBar />
			<p>Dashboard</p>
			<div className={styles.dashboardUtils}>
				<div className={styles.addProduct}>
					<h3>Add Product</h3>
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
				<div className={styles.removeProduct}>
					<h3>Remove Product</h3>
				</div>
			</div>
		</>
	);
};

export default Dashboard;
