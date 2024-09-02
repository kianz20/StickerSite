import { ProductDetails } from "../models";

const deployed = false;
const url = deployed ? "https://deployedURL.com" : "http://localhost:5050";

interface EditFormDetails {
	name: string;
	price: string;
	description: string;
}

export const addProduct = async (
	product: ProductDetails,
	token: string
): Promise<{ message?: string; error?: string }> => {
	try {
		if (!product.description || !product.name || !product.price) {
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
): Promise<{
	products?: ProductDetails[];
	error?: string;
}> => {
	try {
		const response = await fetch(`${url}/api/products/`, {
			method: "GET",
			headers: {
				"Content-Type": "application/json",
			},
		});

		if (!response.ok) {
			const errorData = await response.json();
			return { error: errorData.error || "Something went wrong" };
		}

		const products: ProductDetails[] = await response.json();
		return { products };
	} catch (error) {
		return { error: (error as Error).message };
	}
};

export const editProduct = async (
	productId: string,
	ProductDetails: EditFormDetails,
	token: string
): Promise<{ message?: string; error?: string }> => {
	try {
		const response = await fetch(`${url}/api/products/edit/${productId}`, {
			method: "PUT",
			headers: {
				"Content-Type": "application/json",
				Authorization: `Bearer ${token}`,
			},
			body: JSON.stringify(ProductDetails),
		});

		if (!response.ok) {
			const errorData = await response.json();
			return { error: errorData.error || "Something went wrong" };
		}

		const message: string = await response.text();
		return { message };
	} catch (error) {
		return { error: (error as Error).message };
	}
};

export const removeProduct = async (
	productId: string,
	token: string
): Promise<{ message?: string; error?: string }> => {
	try {
		const response = await fetch(`${url}/api/products/${productId}`, {
			method: "DELETE",
			headers: {
				"Content-Type": "application/json",
				Authorization: `Bearer ${token}`,
			},
		});

		if (!response.ok) {
			const errorData = await response.json();
			return { error: errorData.error || "Something went wrong" };
		}

		const message: string = await response.text();
		return { message };
	} catch (error) {
		return { error: (error as Error).message };
	}
};
