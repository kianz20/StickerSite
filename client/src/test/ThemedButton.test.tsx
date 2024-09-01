import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import { ThemedButton } from "../components";

test("renders the button with the correct text", () => {
	render(<ThemedButton text="Test Button" />);
	expect(screen.getByText("Test Button")).toBeInTheDocument();
});

test("applies the custom background color", () => {
	const customBgColor = "#AEA3ff";
	render(<ThemedButton text="Test Button" backgroundColor={customBgColor} />);
	const buttonElement = screen.getByText("Test Button");
	const computedStyle = window.getComputedStyle(buttonElement);
	expect(computedStyle.backgroundColor).toBe("rgb(174, 163, 255)"); // RGB equivalent of #AEA3ff
});

test("applies the custom text color", () => {
	const customTextColor = "#AEA3ff";
	render(<ThemedButton text="Test Button" textColor={customTextColor} />);
	const buttonElement = screen.getByText("Test Button");
	const computedStyle = window.getComputedStyle(buttonElement);
	expect(computedStyle.color).toBe("rgb(174, 163, 255)");
});

test("applies a different variant when set in props", () => {
	render(<ThemedButton text="Test Button" variant="text" />);
	const buttonElement = screen.getByText("Test Button");
	expect(buttonElement.className).toContain("MuiButton-text");
});
