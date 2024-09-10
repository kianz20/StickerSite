import express from "express";
import authenticateToken from "../middleware/authMiddleware";
import { Product } from "../models";

const router = express.Router();

// Get all products from DB
router.get("/", async (req, res) => {
	try {
		const products = await Product.find();
		res.status(200).json(products);
	} catch (error) {
		res.status(500).json({ error: "Failed to fetch products" + error });
	}
});

// Add new product
router.post("/", authenticateToken, async (req, res) => {
	try {
		// Extract product data from the request body
		const {
			name,
			price,
			description,
			imgPath,
			stockCount,
			category,
			franchise,
		} = req.body;
		// Validate the input
		if (
			!name ||
			!price ||
			!description ||
			!category ||
			!franchise ||
			!stockCount ||
			!imgPath
		) {
			return res.status(400).json({
				error: "Missing details",
			});
		}

		const query = { name: name.toString };
		const existingProduct = await Product.findOne(query);
		if (existingProduct) {
			return res.status(401).json({ error: "Product name is already in use" });
		}
		// Create a new user instance
		const newProduct = new Product({
			name,
			price,
			description,
			imgPath,
			stockCount,
			category,
			franchise,
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
		const { name, price, description, stockCount, category, franchise } =
			req.body;
		if (!id) {
			return res.status(400).json({ error: "Product ID is required" });
		}

		const query = { _id: id.toString() };

		const update = {
			$set: {
				name: name.toString(),
				price: Number(price),
				details: description.toString(),
				stockCount: Number(stockCount),
				category: category.toString(),
				franchise: franchise.toString(),
			},
		};
		const options = { new: true };
		const updatedProduct = await Product.findOneAndUpdate(
			query,
			update,
			options
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

router.delete("/:id", authenticateToken, async (req, res) => {
	try {
		const { id } = req.params;
		if (!id) {
			return res.status(400).json({ error: "Product ID is required" });
		}

		const query = { _id: id.toString() };
		const deletedProduct = await Product.findOneAndDelete(query);
		if (!deletedProduct) {
			return res.status(404).json({ error: "Product not found" });
		}
		res.status(200).json({
			message: "Product deleted successfully",
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
