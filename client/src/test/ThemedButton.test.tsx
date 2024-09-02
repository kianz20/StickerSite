import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import { ThemedButton } from "../components";

const ButtonText = "Test Button";

test("renders the button with the correct text", () => {
	render(<ThemedButton text={ButtonText} />);
	expect(screen.getByText(ButtonText)).toBeInTheDocument();
});

test("applies the custom background color", () => {
	const customBgColor = "#AEA3ff";
	render(<ThemedButton text={ButtonText} backgroundColor={customBgColor} />);
	const buttonElement = screen.getByText(ButtonText);
	const computedStyle = window.getComputedStyle(buttonElement);
	expect(computedStyle.backgroundColor).toBe("rgb(174, 163, 255)"); // RGB equivalent of #AEA3ff
});

test("applies the custom text color", () => {
	const customTextColor = "#AEA3ff";
	render(<ThemedButton text={ButtonText} textColor={customTextColor} />);
	const buttonElement = screen.getByText(ButtonText);
	const computedStyle = window.getComputedStyle(buttonElement);
	expect(computedStyle.color).toBe("rgb(174, 163, 255)");
});

test("applies a different variant when set in props", () => {
	render(<ThemedButton text={ButtonText} variant="text" />);
	const buttonElement = screen.getByText(ButtonText);
	expect(buttonElement.className).toContain("MuiButton-text");
});
