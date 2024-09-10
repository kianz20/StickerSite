import { useCallback, useEffect, useMemo, useState } from "react";
import { ProductDetails } from "../models";

export interface CartItem {
	item: ProductDetails;
	quantity: number;
}

export interface UseCartReturn {
	cartItems: CartItem[];
	addItemToCart: (item: ProductDetails) => void;
	removeItemFromCart: (item_id: string, amount: number | "all") => void;
	clearCart: () => void;
	cartTotal: number;
	cartCount: number;
}

const LOCAL_STORAGE_KEY = "cartItems";

export const useCart = (): UseCartReturn => {
	const [cartItems, setCartItems] = useState<CartItem[]>(() => {
		// Load cart items from local storage, or return an empty array if none are found
		const savedCartItems = localStorage.getItem(LOCAL_STORAGE_KEY);
		return savedCartItems ? JSON.parse(savedCartItems) : [];
	});

	useEffect(() => {
		// Save cart items to local storage whenever they change
		localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(cartItems));
	}, [cartItems]);

	const addItemToCart = useCallback((item: ProductDetails) => {
		setCartItems((prevItems) => {
			const existingItem = prevItems.find(
				(cartItem) => cartItem.item._id === item._id
			);
			const updatedItems = existingItem
				? prevItems.map((cartItem) =>
						cartItem.item._id === item._id
							? { ...cartItem, quantity: cartItem.quantity + 1 }
							: cartItem
					)
				: [...prevItems, { item, quantity: 1 }];

			console.log("Updated Cart Items: ", updatedItems); // Debug log
			return updatedItems;
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

	const cartTotal = useMemo(() => {
		let total = 0;
		for (const cartItem of cartItems) {
			total += cartItem.item.price * cartItem.quantity;
		}
		return total;
	}, [cartItems]);

	const cartCount = useMemo(() => {
		let count = 0;
		for (const cartItem of cartItems) {
			count += cartItem.quantity;
		}
		return count;
	}, [cartItems]);

	return {
		cartItems,
		addItemToCart,
		removeItemFromCart,
		clearCart,
		cartTotal,
		cartCount,
	};
};
