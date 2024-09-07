import { Request } from "express";
import multer, { FileFilterCallback } from "multer";
import path from "path";
import { fileURLToPath } from "url";

// Workaround for __dirname in ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Configure Multer storage
const storage = multer.diskStorage({
	destination: (req: Request, file, cb) => {
		cb(null, path.join(__dirname, "../resources/productPictures/"));
	},
	filename: (req: Request, file, cb) => {
		cb(
			null,
			`${file.fieldname}-${Date.now()}${path.extname(file.originalname)}`
		);
	},
});

// File filter for images (jpg, jpeg, png)
const fileFilter = (
	req: Request,
	file: Express.Multer.File,
	cb: FileFilterCallback
) => {
	const filetypes = /jpeg|jpg|png/;
	const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
	const mimetype = filetypes.test(file.mimetype);

	if (mimetype && extname) {
		cb(null, true);
	} else {
		cb(new Error("Only jpg, jpeg, or png images are allowed."));
	}
};

// Initialize Multer middleware
export const upload = multer({
	storage,
	limits: { fileSize: 5 * 1024 * 1024 }, // Limit file size to 5MB
	fileFilter,
});
