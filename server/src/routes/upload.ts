import { Request, Response, Router } from "express";
import multer from "multer";
import { upload } from "../middleware/multer";

const router = Router();

// POST route for file upload
router.post("/", (req: Request, res: Response) => {
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	upload.single("profilePic")(req, res, (err: any) => {
		if (err instanceof multer.MulterError) {
			return res
				.status(400)
				.json({ message: "File upload error: " + err.message });
		} else if (err) {
			return res.status(400).json({ message: "Error: " + err.message });
		}

		if (!req.file) {
			return res.status(400).json({ message: "No file uploaded" });
		}

		const imageUrl = `/resources/productPictures/${req.file.filename}`;
		// Save imageUrl to the database here (e.g., User model)
		return res.json({ imageUrl });
	});
});

export default router;
