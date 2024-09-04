import "@testing-library/jest-dom";
import { fireEvent, render, screen } from "@testing-library/react";
import ThinProductDetails from "../components/ThinProductDetails";
import testIds from "../constants/testIds";
import { ProductDetails } from "../models";

interface ThinProductDetailsProps extends ProductDetails {
	color: string;
	onRemove: (id: string) => void;
}

const defaultProps: ThinProductDetailsProps = {
	name: "Test Title",
	category: "Test Category",
	description: "Test Description",
	price: 3.99,
	_id: "",
	color: "#aea3ff",
	onRemove: jest.fn(),
};

test("renders the summary view by default", () => {
	render(<ThinProductDetails {...defaultProps} />);
	const summaryViewComponent = screen.getByTestId(testIds.summaryView);
	expect(summaryViewComponent).toBeInTheDocument();
});

test("does not render the expanded view by default", () => {
	render(<ThinProductDetails {...defaultProps} />);
	const expandedViewComponent = screen.queryByTestId(testIds.expandedView);
	expect(expandedViewComponent).not.toBeInTheDocument();
});

test("renders the summary view with the correct product name", () => {
	render(<ThinProductDetails {...defaultProps} />);
	const productName = screen.queryByText(defaultProps.name);
	expect(productName).toBeInTheDocument();
});

test("renders the summary view with the correct product price", () => {
	render(<ThinProductDetails {...defaultProps} />);
	const productPrice = screen.getByText(defaultProps.price);
	expect(productPrice).toBeInTheDocument();
});

test("does not render product description in summary mode", () => {
	render(<ThinProductDetails {...defaultProps} />);
	const productName = screen.queryByText(defaultProps.description);
	expect(productName).not.toBeInTheDocument();
});

test("renders the summary view with the expand button", () => {
	render(<ThinProductDetails {...defaultProps} />);
	const expandButton = screen.getByTestId(testIds.expandButton);
	expect(expandButton).toBeInTheDocument();
});

test("renders the detailed view after expand button is pressed", () => {
	render(<ThinProductDetails {...defaultProps} />);
	const expandButton = screen.getByTestId(testIds.expandButton);
	fireEvent.click(expandButton);
	const expandedViewComponent = screen.getByTestId(testIds.expandedView);
	expect(expandedViewComponent).toBeInTheDocument();
});

test("does not render the summary after expand button is pressed", () => {
	render(<ThinProductDetails {...defaultProps} />);
	const expandButton = screen.getByTestId(testIds.expandButton);
	fireEvent.click(expandButton);
	const summaryViewComponent = screen.queryByTestId(testIds.summaryView);
	expect(summaryViewComponent).not.toBeInTheDocument();
});

test("renders the expanded view with the correct product name", () => {
	render(<ThinProductDetails {...defaultProps} />);
	const expandButton = screen.getByTestId(testIds.expandButton);
	fireEvent.click(expandButton);
	const productName = screen.getByText(defaultProps.name);
	expect(productName).toBeInTheDocument();
});

test("renders the expanded view with the correct product price", () => {
	render(<ThinProductDetails {...defaultProps} />);
	const expandButton = screen.getByTestId(testIds.expandButton);
	fireEvent.click(expandButton);
	const productName = screen.getByText(defaultProps.price);
	expect(productName).toBeInTheDocument();
});

test("renders the expanded view with the correct product description", () => {
	render(<ThinProductDetails {...defaultProps} />);
	const expandButton = screen.getByTestId(testIds.expandButton);
	fireEvent.click(expandButton);
	const productName = screen.getByText(defaultProps.description);
	expect(productName).toBeInTheDocument();
});

test("renders the expanded view with the minify button", () => {
	render(<ThinProductDetails {...defaultProps} />);
	const expandButton = screen.getByTestId(testIds.expandButton);
	fireEvent.click(expandButton);
	const minifyButton = screen.getByTestId(testIds.minifyButton);
	expect(minifyButton).toBeInTheDocument();
});
