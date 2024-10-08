import {
	Input,
	MenuItem,
	Select,
	SelectChangeEvent,
	Typography,
} from "@mui/material";
import { useEffect, useRef, useState } from "react";
import { Navigate } from "react-router-dom";
import * as api from "../api/productController";
import * as uploadApi from "../api/uploadController";
import {
	AlertMessage,
	NavigationBar,
	ThemedButton,
	ThemedInput,
	ThinProductDetails,
} from "../components/";
import categoryList from "../constants/categoryList";
import { useAlert, useAuth } from "../hooks";
import { ProductDetails } from "../models";
import styles from "../styles/Dashboard.module.css";

const Dashboard = (): JSX.Element => {
	type InputEvent =
		| React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
		| SelectChangeEvent<string>;
	const { isAuthenticated, userRole, userToken } = useAuth();
	const { alertDetails, showAlert, clearAlert } = useAlert();
	const fileInputRef = useRef<HTMLInputElement>(null);

	// Contains the details used when adding new products
	const [newProductDetails, setNewProductDetails] = useState<ProductDetails>({
		name: "",
		category: "",
		price: 0,
		description: "",
		_id: "",
		imgPath: "",
		stockCount: 0,
		franchise: "",
	});

	const [productImg, setProductImg] = useState<File | null>(null);

	const [productDetails, setProductDetails] = useState<ProductDetails[]>();

	const getProductData = async () => {
		if (!userToken) {
			showAlert("Your session has expired. Please log in again", "error");
			return;
		}
		try {
			const data = await api.getProducts();
			if (data.error) {
				console.error("Fetch products failed: ", data.error);
				showAlert(data.error, "error");
			} else {
				setProductDetails(data.products);
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

	const handleFileUpload = async (): Promise<string> => {
		if (!userToken) {
			showAlert("Your session has expired. Please log in again", "error");
			return "error";
		}

		if (!productImg) {
			showAlert("At least one product image is required", "error");
			return "error";
		}

		const images = new FormData();
		images.append("productPicture", productImg);

		try {
			const data = await uploadApi.uploadProductPicture(images, userToken);
			if (data.error) {
				showAlert(data.error, "error");
				return "error";
			}
			return data.imgUrl ?? "error";
		} catch (error) {
			console.error("Error uploading picture:", error);
			showAlert("Something went wrong", "error");
			return "error";
		}
	};

	// Sends the request to create a new product
	const handleAddProduct = async (event: React.FormEvent<HTMLFormElement>) => {
		event.preventDefault();
		if (!userToken) {
			showAlert("Your session has expired. Please log in again", "error");
			return;
		}

		const fileUrl = await handleFileUpload();

		if (fileUrl === "error") {
			return;
		}

		const updatedProductDetails = {
			...newProductDetails,
			imgPath: fileUrl,
		};

		try {
			const data = await api.addProduct(updatedProductDetails, userToken);
			if (data.error) {
				console.error("Add product failed: ", data.error);
				showAlert(data.error, "error");
			} else {
				showAlert("Product has been added", "success");
				getProductData();
				setNewProductDetails({
					name: "",
					category: "",
					description: "",
					price: 0,
					_id: "",
					imgPath: "",
					stockCount: 0,
					franchise: "",
				});
				setProductImg(null);
				if (fileInputRef.current) {
					fileInputRef.current.value = "";
				}
			}
		} catch (error) {
			console.error("Error adding product:", error);
			showAlert("Something went wrong", "error");
		}
	};

	const handleInputChange = (event: InputEvent) => {
		const { name, value } = event.target;
		setNewProductDetails((prevState) => ({
			...prevState,
			[name]: value,
		}));
	};

	const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setProductImg(e.target.files ? e.target.files[0] : null);
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
					<ThemedButton
						text="Add Product"
						onClick={() => handlePageChange("add")}
					/>
					<ThemedButton
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
							<ThemedInput
								label="Product Name"
								variant="outlined"
								fullWidth
								margin="normal"
								required
								name="name"
								value={newProductDetails.name}
								onChange={handleInputChange}
							/>
							<Select
								name="category"
								fullWidth
								value={newProductDetails.category}
								onChange={handleInputChange}
								displayEmpty
								renderValue={(selected) => {
									if (selected.length === 0) {
										return "Category";
									}
									return selected;
								}}
							>
								{categoryList.map((category) => (
									<MenuItem key={category} value={category}>
										{category}
									</MenuItem>
								))}
							</Select>
							<ThemedInput
								label="Description"
								variant="outlined"
								fullWidth
								margin="normal"
								required
								name="description"
								multiline={true}
								rows={4}
								value={newProductDetails.description}
								onChange={handleInputChange}
							/>
							<ThemedInput
								label="Franchise"
								variant="outlined"
								fullWidth
								margin="normal"
								required
								name="franchise"
								value={newProductDetails.franchise}
								onChange={handleInputChange}
							/>
							<Typography> Picture of product: </Typography>
							<Input
								type="file"
								fullWidth
								disableUnderline
								name="picture"
								onChange={handleFileChange}
								ref={fileInputRef}
							></Input>
							<ThemedInput
								label="Price"
								variant="outlined"
								fullWidth
								margin="normal"
								required
								name="price"
								value={newProductDetails.price}
								onChange={handleInputChange}
							/>
							<ThemedInput
								label="Stock Count"
								variant="outlined"
								fullWidth
								margin="normal"
								required
								name="stockCount"
								value={newProductDetails.stockCount}
								onChange={handleInputChange}
							/>
							<ThemedButton text="Add Product" type="submit" />
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
								<ThinProductDetails
									key={product._id}
									color={index % 2 === 0 ? "#ccc5e3" : "#d9d7e0"}
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
