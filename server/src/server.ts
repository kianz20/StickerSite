import cors from "cors";
import dotenv from "dotenv";
import express, { Express } from "express";
import mongoose from "mongoose";
import path from "path";
import productRoutes from "./routes/product";
import uploadRoutes from "./routes/upload"; // Import the upload routes
import userRoutes from "./routes/user";

dotenv.config();

const app: Express = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Serve static files from the resources/productPictures directory
app.use(
	"/resources/productPictures",
	express.static(path.join(__dirname, "resources/productPictures"))
);

const uri: string = process.env.ATLAS_URI || "";

(async () => {
	try {
		await mongoose.connect(uri);
		console.log("Connected to the database");
	} catch (error) {
		console.error("Database connection error:", error);
	}
})();

app.use("/api/users", userRoutes);
app.use("/api/products", productRoutes);
app.use("/api/upload", uploadRoutes); // Use upload routes

const PORT: string | number = process.env.PORT || 3000;

app.listen(PORT, () => {
	console.log(`Server is running on PORT: ${PORT}`);
});
