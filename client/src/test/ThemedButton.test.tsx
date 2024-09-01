import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import { ThemedButton } from "../components";

test("renders the button with the correct text", () => {
	render(<ThemedButton text="Test Button" />);
	expect(screen.getByText("Test Button")).toBeInTheDocument();
});
