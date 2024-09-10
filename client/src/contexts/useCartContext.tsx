import React, { createContext, ReactNode, useContext } from "react";
import { useCart, UseCartReturn } from "../hooks/useCart";

// Create a context with a default value of undefined
const CartContext = createContext<UseCartReturn | undefined>(undefined);

// Create a Context Provider component
const CartProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
	const cart = useCart();

	return <CartContext.Provider value={cart}>{children}</CartContext.Provider>;
};

// Custom hook to use the CartContext
const useCartContext = (): UseCartReturn => {
	const context = useContext(CartContext);
	if (context === undefined) {
		throw new Error("useCartContext must be used within a CartProvider");
	}
	return context;
};

export { CartProvider, useCartContext };
