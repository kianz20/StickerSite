import { Request, Response, Router } from "express";
import multer from "multer";
import authenticateToken from "../middleware/authMiddleware";
import { upload } from "../middleware/multer";

const router = Router();

// POST route for file upload
router.post(
	"/productPicture",
	authenticateToken,
	async (req: Request, res: Response) => {
		// eslint-disable-next-line @typescript-eslint/no-explicit-any
		upload.single("productPicture")(req, res, (err: any) => {
			if (err instanceof multer.MulterError) {
				return res
					.status(400)
					.json({ error: "File upload error: " + err.message });
			} else if (err) {
				return res.status(400).json({ error: "Error: " + err.message });
			}

			if (!req.file) {
				return res.status(400).json({ error: "No file uploaded" });
			}

			const imgUrl = `/resources/productPictures/${req.file.filename}`;
			// Save imageUrl to the database here (e.g., User model)
			return res.json({ imgUrl });
		});
	}
);

export default router;
