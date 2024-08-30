import { Navigate } from "react-router-dom";
import NavigationBar from "../components/NavigationBar";
import { useAuth } from "../hooks/useAuth";
import styles from "../styles/Dashboard.module.css";
import { TextField } from "@mui/material";
import { productDetails } from "../models/productDetails";
import { useEffect, useState } from "react";
import * as api from "../apiControllers/productController";
import PrimaryButton from "../components/PrimaryButton";
import AlertMessage, { Severity } from "../components/AlertMessage";
import ThinComponent from "../components/ThinComponent";

const Dashboard = (): JSX.Element => {
    const { isAuthenticated, userRole, userToken } = useAuth();

    // Contains the details used when adding new products
    const [newProductDetails, setNewProductDetails] = useState<productDetails>({
        name: "",
        category: "",
        price: "",
        description: "",
        _id: "",
    });

    const [productDetails, setProductDetails] = useState<productDetails[]>();

    // Contains the error shown to the user
    const [alertDetails, setAlertDetails] = useState<{
        text: string;
        visible: boolean;
        severity: Severity;
    }>({
        text: "",
        visible: false,
        severity: "error",
    });

    const getProductData = async () => {
        try {
            const data = await api.getProducts();
            if (data.error) {
                console.error("Fetch products failed: ", data.error);
                setAlertDetails({
                    text: data.error,
                    visible: true,
                    severity: "error",
                });
            } else {
                setProductDetails(data.products);
                console.log("Products fetched successfully: ", data.products);
            }
        } catch (error) {
            console.error("Error retreiving products:", error);
            setAlertDetails({
                text: "Something went wrong",
                visible: true,
                severity: "error",
            });
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
    const handleAddProduct = async () => {
        if (!userToken) {
            setAlertDetails({
                text: "Your session has expired. Please log in again",
                visible: true,
                severity: "error",
            });
            return;
        }

        const data = await api.addProduct(newProductDetails, userToken);
        if (data.error) {
            console.error("Add product failed: ", data.error);
            setAlertDetails({
                text: data.error,
                visible: true,
                severity: "error",
            });
        } else {
            console.log("Product added successfully: ", data.message);
            setAlertDetails({
                text: "Product has been added",
                visible: true,
                severity: "success",
            });
            getProductData();
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
        setAlertDetails({
            text: "",
            visible: false,
            severity: "error",
        });
    };

    const handleRemoveProduct = async (id: string) => {
        if (!userToken) {
            setAlertDetails({
                text: "Your session has expired. Please log in again",
                visible: true,
                severity: "error",
            });
            return;
        }
        try {
            setProductDetails((prevProducts) =>
                prevProducts
                    ? prevProducts.filter((product) => product._id !== id)
                    : []
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
                            label="Description"
                            variant="outlined"
                            fullWidth
                            margin="normal"
                            required
                            name="description"
                            multiline={true}
                            rows={4}
                            onChange={handleFormChange}
                        />
                        <PrimaryButton
                            text="Add Product"
                            onClick={handleAddProduct}
                        />
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
                                    color={
                                        index % 2 === 0 ? "#ccc5e3" : "#d9d7e0"
                                    } // Alternates between red and blue
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
