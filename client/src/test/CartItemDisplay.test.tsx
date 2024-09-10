import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import { CartItemDisplay } from "../components";
import { CartProvider } from "../contexts/useCartContext";
import { CartItem } from "../hooks/useCart";

const defaultProps: CartItem = {
	item: {
		_id: "d",
		name: "testItemName",
		category: "testItemCategory",
		price: 3,
		description: "testItemDesc",
		imgPath: "testItemImg",
		stockCount: 3,
		franchise: "testItemFranchise",
	},
	quantity: 4,
};

test("renders the cart item with the correct product name", () => {
	render(
		<CartProvider>
			<CartItemDisplay cartItem={defaultProps} />
		</CartProvider>
	);
	const cartItem = screen.getByText(defaultProps.item.name);
	expect(cartItem).toBeInTheDocument();
});

test("renders the cart item with the correct product price", () => {
	render(
		<CartProvider>
			<CartItemDisplay cartItem={defaultProps} />
		</CartProvider>
	);
	const cartItem = screen.getByText(
		`Total Price: $${defaultProps.item.price * defaultProps.quantity}`
	);
	expect(cartItem).toBeInTheDocument();
});

test("renders the cart item with the correct product quantity", () => {
	render(
		<CartProvider>
			<CartItemDisplay cartItem={defaultProps} />
		</CartProvider>
	);
	const cartItem = screen.getByText(`Quantity: ${defaultProps.quantity}`);
	expect(cartItem).toBeInTheDocument();
});
