import { Typography } from "@mui/material";
import { useState } from "react";
import { useCartContext } from "../contexts/useCartContext";
import { CartItem } from "../hooks/useCart";
import styles from "../styles/CartItemDisplay.module.css";
import ThemedButton from "./ThemedButton";
import ThemedInput from "./ThemedInput";

interface CartItemProps {
	cartItem: CartItem;
}

const CartItemDisplay: React.FC<CartItemProps> = ({ cartItem }) => {
	const { removeItemFromCart } = useCartContext();
	const [amountToRemove, setAmountToRemove] = useState(cartItem.quantity);
	const [editMode, setEditMode] = useState(false);

	const cancelEdit = () => {
		setAmountToRemove(cartItem.quantity);
		setEditMode(!editMode);
	};

	const handleRemoveChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		setAmountToRemove(parseInt(event.target.value));
	};

	return (
		<>
			<div className={styles.itemDetails}>
				<Typography>{cartItem.item.name}</Typography>
				<Typography>{`Quantity: ${cartItem.quantity}`}</Typography>
				<Typography>
					{`Total Price: $${cartItem.quantity * cartItem.item.price}`}
				</Typography>

				<div className={styles.removeDialog}>
					{editMode ? (
						<>
							<Typography>How many to remove?</Typography>
							<ThemedInput
								type="number"
								value={amountToRemove}
								onChange={handleRemoveChange}
							/>
							<ThemedButton
								text="Remove"
								onClick={() => {
									removeItemFromCart(cartItem.item._id, amountToRemove);
								}}
							/>
							<ThemedButton
								text="Cancel"
								onClick={() => {
									cancelEdit();
								}}
							/>
						</>
					) : (
						<ThemedButton
							text="Edit Quantity or Remove"
							onClick={() => {
								setEditMode(!editMode);
							}}
						/>
					)}
				</div>
			</div>
			<hr />
		</>
	);
};

export default CartItemDisplay;
