import { BACKEND_URL } from "../constants/backendURL";
import { UploadResponse } from "../models";

export const uploadProductPicture = async (
	images: FormData,
	token: string
): Promise<UploadResponse> => {
	try {
		const response = await fetch(`${BACKEND_URL}/api/uploads/productPicture`, {
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
