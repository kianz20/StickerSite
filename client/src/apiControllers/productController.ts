import { productDetails } from "../models";

const deployed = false;
const url = deployed ? "https://deployedURL.com" : "http://localhost:5050";

export const addProduct = async (
	product: productDetails
): Promise<{ message?: string; error?: string }> => {
	try {
		if (!product.details || !product.name || !product.price) {
			return { error: "All fields are required" };
		}

		const response = await fetch(`${url}/api/products/`, {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify(product),
		});

		if (!response.ok) {
			const errorData = await response.json();
			return { error: errorData.error || "Something went wrong" };
		}

		const data: { message: string } = await response.json();
		return { message: data.message };
	} catch (error) {
		return { error: (error as Error).message };
	}
};

export const getAllProducts = async (): Promise<{ allProducts?: productDetails[]; error?: string }> => {
	try {
		const response = await fetch(`${url}/api/products/`, {
			method: "GET",
		});

		if (!response.ok) {
			const errorData = await response.json();
			return { error: errorData.error || "Something went wrong" };
		}

		const allProducts: productDetails[] = await response.json();
		return { allProducts };
	} catch (error) {
		return { error: (error as Error).message };
	}
}