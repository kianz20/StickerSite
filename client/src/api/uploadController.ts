import { UploadResponse } from "../models";

const deployed = false;
const url = deployed ? "https://deployedURL.com" : "http://localhost:5050";

export const uploadProductPicture = async (
	images: FormData,
	token: string
): Promise<UploadResponse> => {
	try {
		const response = await fetch(`${url}/api/uploads/productPicture`, {
			method: "POST",
			headers: {
				Authorization: `Bearer ${token}`,
			},
			body: images,
		});

		if (!response.ok) {
			const errorData = await response.json();
			return { error: errorData.error || "Something went wrong" };
		}

		const data: UploadResponse = await response.json();
		return data;
	} catch (error) {
		return { error: (error as Error).message };
	}
};
