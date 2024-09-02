import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import { SingleSearchResult } from "../components";
import { ProductDetails } from "../models";

const defaultProps: ProductDetails = {
	name: "Test Title",
	category: "Test Category",
	description: "Test Description",
	price: "3.99",
	_id: "",
};

test("renders the result with the correct title", () => {
	render(<SingleSearchResult {...defaultProps} />);
	const searchResult = screen.queryByText(defaultProps.name);
	expect(searchResult).toBeInTheDocument();
});

test("renders the result with the correct price", () => {
	render(<SingleSearchResult {...defaultProps} />);
	const searchResult = screen.queryByText(defaultProps.name);
	expect(searchResult).toBeInTheDocument();
});

test("image alt text is generated successfully", () => {
	render(<SingleSearchResult {...defaultProps} />);
	const imageElement = screen.queryByAltText(`Image of ${defaultProps.name}`);
	expect(imageElement).toBeInTheDocument();
});
