import { Navigate } from "react-router-dom";
import NavigationBar from "../components/NavigationBar";
import { useAuth } from "../hooks/useAuth";
import styles from "../styling/Dashboard.module.css";
import { TextField } from "@mui/material";

const Dashboard = (): JSX.Element => {
	const { isAuthenticated, userID, userToken, userRole } = useAuth();
	if (isAuthenticated === undefined || userRole === undefined) {
		return <div>Loading...</div>; // Handle loading state or redirect
	}
	if (userRole !== "admin") {
		return <Navigate to="/unauthorized" />;
	}
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
						name="product"
						// onChange={handleFormChange}
					/>
					<TextField
						className={styles.addProductField}
						label="Price"
						type="number"
						variant="outlined"
						fullWidth
						margin="normal"
						required
						name="price"
						// onChange={handleFormChange}
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

						// onChange={handleFormChange}
					/>
				</div>
				<div className={styles.removeProduct}>
					<h3>Remove Product</h3>
				</div>
			</div>
		</>
	);
};

export default Dashboard;
