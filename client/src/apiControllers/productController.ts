import { productDetails } from "../models";

const deployed = false;
const url = deployed ? "https://deployedURL.com" : "http://localhost:5050";

export const addProduct = async (
	product: productDetails,
	token: string
): Promise<{ message?: string; error?: string }> => {
	try {
		if (!product.details || !product.name || !product.price) {
			return { error: "All fields are required" };
		}

		const response = await fetch(`${url}/api/products/`, {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
				Authorization: `Bearer ${token}`,
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

export const getProducts = async (
	token: string
): Promise<{
	products?: productDetails[];
	error?: string;
}> => {
	try {
		const response = await fetch(`${url}/api/products/`, {
			method: "GET",
			headers: {
				"Content-Type": "application/json",
				Authorization: `Bearer ${token}`,
			},
		});

		if (!response.ok) {
			const errorData = await response.json();
			return { error: errorData.error || "Something went wrong" };
		}

		const products: productDetails[] = await response.json();
		return { products };
	} catch (error) {
		return { error: (error as Error).message };
	}
};
