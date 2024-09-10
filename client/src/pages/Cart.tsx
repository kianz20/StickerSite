import { Typography } from "@mui/material";
import { NavigationBar, SearchBar } from "../components";
import CartItemDisplay from "../components/CartItemDisplay";
import { useCartContext } from "../contexts/useCartContext";
import styles from "../styles/Cart.module.css";

const Cart = (): JSX.Element => {
	const { cartItems } = useCartContext();

	return (
		<>
			<NavigationBar />
			<SearchBar />
			<div className={styles.detailList}>
				<Typography className={styles.title} variant="h2">
					Cart
				</Typography>
				<hr />
				{cartItems.map((cartItem) => (
					<div key={cartItem.item._id}>
						<CartItemDisplay cartItem={cartItem} />
					</div>
				))}
			</div>
		</>
	);
};

export default Cart;
