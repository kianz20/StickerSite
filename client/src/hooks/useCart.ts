import { useCallback, useState } from "react";
import { ProductDetails } from "../models";

interface CartItem {
	item: ProductDetails;
	quantity: number;
}

interface UseCartReturn {
	cartItems: CartItem[];
	addItemToCart: (item: ProductDetails) => void;
	removeItemFromCart: (item_id: string, amount: number | "all") => void;
	clearCart: () => void;
	getCartTotal: () => number;
}

const useCart = (): UseCartReturn => {
	const [cartItems, setCartItems] = useState<CartItem[]>([]);

	const addItemToCart = useCallback((item: ProductDetails) => {
		setCartItems((prevItems) => {
			const existingItem = prevItems.find(
				(cartItem) => cartItem.item._id === item._id
			);
			if (existingItem) {
				// If the item exists in the cart, update its quantity
				return prevItems.map((cartItem) =>
					cartItem.item._id === item._id
						? { ...cartItem, quantity: cartItem.quantity + 1 }
						: cartItem
				);
			} else {
				// If the item does not exist in the cart, add it
				return [...prevItems, { item, quantity: 1 }];
			}
		});
	}, []);

	const removeItemFromCart = useCallback(
		(item_id: string, amount: number | "all") => {
			setCartItems((prevItems) => {
				const existingItem = prevItems.find(
					(cartItem) => cartItem.item._id === item_id
				);
				if (!existingItem) {
					return prevItems;
				}
				if (amount === "all" || existingItem.quantity <= amount) {
					return prevItems.filter((cartItem) => cartItem.item._id !== item_id);
				} else {
					return prevItems.map((cartItem) =>
						cartItem.item._id === item_id
							? { ...cartItem, quantity: cartItem.quantity - amount }
							: cartItem
					);
				}
			});
		},
		[]
	);

	const clearCart = useCallback(() => {
		setCartItems([]);
	}, []);

	const getCartTotal = useCallback(() => {
		let total = 0;
		for (const cartItem of cartItems) {
			total += cartItem.item.price * cartItem.quantity;
		}
		return total;
	}, [cartItems]);

	return {
		cartItems,
		addItemToCart,
		removeItemFromCart,
		clearCart,
		getCartTotal,
	};
};

export default useCart;
