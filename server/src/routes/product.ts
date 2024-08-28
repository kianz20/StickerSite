import express from "express";
import Product from "../models/Product"; // Correctly import the User model
import authenticateToken from "../middleware/authMiddleware";

// const JWT_SECRET = process.env.JWT_SECRET || "your_jwt_secret";

const router = express.Router();

// Get all products from DB
router.get("/", async (req, res) => {
	try {
		const products = await Product.find(); // Mongoose method to get all users
		res.status(200).json(products);
	} catch (error) {
		res.status(500).json({ error: "Failed to fetch products" + error });
	}
});

// Add new product
router.post("/", authenticateToken, async (req, res) => {
	try {
		// Extract product data from the request body
		const { name, price, details } = req.body;
		// Validate the input
		if (!name || !price || !details) {
			return res
				.status(400)
				.json({ error: "name, price, and details args are required" });
		}

		const existingProduct = await Product.findOne({ name });
		if (existingProduct) {
			return res.status(401).json({ error: "Product name is already in use" });
		}
		// Create a new user instance
		const newProduct = new Product({
			name,
			price,
			details,
		});
		// Save the new user to the database
		await newProduct.save();
		res.json({
			message: "Creation successful",
		});
	} catch (error) {
		if (error instanceof Error) {
			res.status(500).json({
				error: error.message,
			});
		}
	}
});

router.put("/edit/:id", authenticateToken, async (req, res) => {
	try {
		const { id } = req.params;
		const { name, price, details } = req.body;
		if (!id) {
			return res.status(400).json({ error: "Product ID is required" });
		}
		const updatedProduct = await Product.findOneAndUpdate(
			{ _id: id },
			{ $set: { name, price, details } },
			{ new: true } // Return the updated document
		);
		if (!updatedProduct) {
			return res
				.status(404)
				.json({ error: "Product ID does not match a product" });
		}
		res.status(200).json({
			message: "Product updated successfully",
		});
	} catch (error) {
		if (error instanceof Error) {
			res.status(500).json({ error: error.message });
		} else {
			res.status(500).json({ error: "An unexpected error occurred" });
		}
	}
});

export default router;
