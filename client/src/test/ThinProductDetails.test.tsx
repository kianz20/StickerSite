import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import { ThinProductDetails } from "../components";
import { ProductDetails } from "../models";

interface ThinProductDetailsProps extends ProductDetails {
	color: string;
	onRemove: (id: string) => void;
}

const defaultProps: ThinProductDetailsProps = {
	name: "Test Title",
	category: "Test Category",
	description: "Test Description",
	price: "3.99",
	_id: "",
	color: "#aea3ff",
	onRemove: jest.fn(),
};

test("renders the summary view with the correct title", () => {
	render(<ThinProductDetails {...defaultProps} />);
	const searchResult = screen.queryByText(defaultProps.name);
	expect(searchResult).toBeInTheDocument();
});

test("renders the summary view by default", () => {
	render(<ThinProductDetails {...defaultProps} />);
	const searchResult = screen.queryByText(defaultProps.name);
	const parentElement = searchResult?.parentElement;
	expect(parentElement?.firstChild).toHaveClass("_productLine*");
});

test("renders the summary view with the correct price", () => {
	render(<ThinProductDetails {...defaultProps} />);
	const searchResult = screen.queryByText(defaultProps.price);
	expect(searchResult).toBeInTheDocument();
});

// test("opens the detailed view when expand button is pressed", () => {
// 	render(<ThinProductDetails {...defaultProps} />);
// });
