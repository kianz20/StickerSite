import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import ArrowDropUpIcon from "@mui/icons-material/ArrowDropUp";
import { Button, TextField, Typography } from "@mui/material";
import React, { useState } from "react";
import * as api from "../apiControllers/productController";
import { useAuth } from "../hooks";
import { ProductDetails } from "../models";
import styles from "../styles/ThinComponent.module.css";
import AlertMessage, { Severity } from "./AlertMessage";
import PrimaryButton from "./PrimaryButton";

interface EditFormDetails {
	name: string;
	price: string;
	details: string;
}

interface ThinComponentProps extends ProductDetails {
	color: string;
	onRemove: (id: string) => void;
}

const ThinComponent: React.FC<ThinComponentProps> = (props) => {
	const { userToken } = useAuth();
	const { _id, name, details, price, color, onRemove } = props;

	const [formState, setFormState] = useState<EditFormDetails>({
		name: name,
		price: price,
		details: details,
	});

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

	const showAlert = (text: string, severity: Severity) => {
		setAlertDetails({
			text,
			visible: true,
			severity,
		});

		// Reset the alert after 3 seconds
		setTimeout(() => {
			setAlertDetails({
				text: "",
				visible: false,
				severity: "error",
			});
		}, 3000); // 3 seconds
	};

	const [isExpanded, setIsExpanded] = useState(false);
	const [editMode, setEditMode] = useState(false);
	const [removeState, setRemoveState] = useState(false);

	const showDetails = () => {
		setIsExpanded(!isExpanded);
	};

	const hideDetails = () => {
		setIsExpanded(!isExpanded);
		setEditMode(false);
		setFormState({ ...props });
	};

	const cancelEdit = () => {
		setEditMode(false);
		setFormState({ ...props });
	};

	const editProduct = async () => {
		if (!userToken) {
			setAlertDetails({
				text: "Your session has expired. Please log in again",
				visible: true,
				severity: "error",
			});
			return;
		}
		try {
			const data: { message?: string; error?: string } = await api.editProduct(
				_id,
				formState,
				userToken
			);
			if (data.error) {
				setAlertDetails({
					text: data.error,
					visible: true,
					severity: "error",
				});
			} else {
				showAlert("Product has been edited", "success");
			}
		} catch (error) {
			console.error("Error editing products:", error);
			setAlertDetails({
				text: "Something went wrong",
				visible: true,
				severity: "error",
			});
		}
	};

	const removeProduct = async () => {
		if (!userToken) {
			setAlertDetails({
				text: "Your session has expired. Please log in again",
				visible: true,
				severity: "error",
			});
			return;
		}
		try {
			const data: { message?: string; error?: string } =
				await api.removeProduct(_id, userToken);
			if (data.error) {
				setAlertDetails({
					text: data.error,
					visible: true,
					severity: "error",
				});
			} else {
				showAlert("Product has been removed", "success");
				setTimeout(() => {
					onRemove(_id);
				}, 3000);
			}
		} catch (error) {
			console.error("Error removing product:", error);
			setAlertDetails({
				text: "Something went wrong",
				visible: true,
				severity: "error",
			});
		}
	};

	const handleFormChange = async (
		event: React.ChangeEvent<HTMLInputElement>
	) => {
		const { name, value } = event.target;
		setFormState((prevState) => ({
			...prevState,
			[name]: value,
		}));
	};

	return (
		<div className={styles.container} style={{ backgroundColor: color }}>
			{isExpanded ? (
				<div className={styles.productLineExpanded}>
					<div className={styles.expandedDetails}>
						{editMode ? (
							<>
								<div className={styles.editField}>
									<Typography className={styles.nameDetail}>
										<b>Name:</b>
									</Typography>
									<TextField
										name="name"
										value={formState.name}
										onChange={handleFormChange}
									/>
								</div>
								<div className={styles.editField}>
									<Typography className={styles.productDetail}>
										<b>Price:</b>
									</Typography>
									<TextField
										name="price"
										value={formState.price}
										onChange={handleFormChange}
									/>
								</div>
								<div className={styles.editField}>
									<Typography className={styles.productDetail}>
										<b>Description:</b>
									</Typography>
									<TextField
										name="details"
										multiline
										rows={3}
										value={formState.details}
										onChange={handleFormChange}
									/>
								</div>
							</>
						) : (
							<>
								<Typography className={styles.nameDetail}>
									<b>Name:</b> {name}
								</Typography>
								<Typography className={styles.productDetail}>
									<b>Price:</b> {price}
								</Typography>
								<Typography className={styles.productDetail}>
									<b>Description:</b> {details}
								</Typography>
							</>
						)}
					</div>
					<div className={styles.buttonDiv}>
						<Button variant="text" onClick={hideDetails}>
							<ArrowDropUpIcon />
						</Button>
						{editMode ? (
							<div className={styles.buttons}>
								<PrimaryButton text="Cancel Edit" onClick={cancelEdit} />
								<PrimaryButton text="Save Changes" onClick={editProduct} />
							</div>
						) : (
							<div className={styles.buttons}>
								{removeState ? (
									<>
										<Typography color={"red"}>Are you sure?</Typography>
										<PrimaryButton
											text="Confirm Removal"
											onClick={removeProduct}
										/>
										<PrimaryButton
											text="Cancel Remove"
											onClick={() => setRemoveState(false)}
										/>
									</>
								) : (
									<>
										<PrimaryButton
											text="Edit"
											onClick={() => setEditMode(true)}
										/>
										<PrimaryButton
											text="Remove"
											onClick={() => setRemoveState(true)}
										/>
									</>
								)}
							</div>
						)}
					</div>
				</div>
			) : (
				<div className={styles.productLine}>
					<Typography className={styles.nameDetail}>
						<b>Name:</b> {name}
					</Typography>
					<Typography className={styles.productDetail}>
						<b>Price:</b> {price}
					</Typography>
					<Button variant="text" onClick={showDetails}>
						<ArrowDropDownIcon />
					</Button>
				</div>
			)}
			<AlertMessage {...alertDetails} />
		</div>
	);
};

export default ThinComponent;
