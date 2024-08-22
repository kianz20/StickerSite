import express from "express";
import User from "../models/User"; // Correctly import the User model
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET || "your_jwt_secret";

const router = express.Router();

// Get all users from DB
router.get("/", async (req, res) => {
	try {
		const users = await User.find(); // Mongoose method to get all users
		res.status(200).json(users);
	} catch (error) {
		res.status(500).json({ error: "Failed to fetch users" });
	}
});

// Add a new user to the DB
router.post("/", async (req, res) => {
	try {
		// Extract user data from the request body
		const { email, password, mailingList } = req.body;
		// Validate the input
		if (!email || !password) {
			return res
				.status(400)
				.json({ error: "Email, password, and notify args are required" });
		}

		const existingUser = await User.findOne({ email });
		if (existingUser) {
			return res.status(401).json({ error: "Email is already in use" });
		}

		const encryptedPass = await bcrypt.hash(password, 10);
		// Create a new user instance
		const newUser = new User({ email, password: encryptedPass, mailingList });
		// Save the new user to the database
		await newUser.save();
		// Respond with the created user
		res.status(201).json(newUser);
	} catch (error) {
		if (error instanceof Error) {
			res
				.status(500)
				.json({ error: "Error during registration", details: error.message });
		}
	}
});

router.post("/login", async (req, res) => {
	try {
		const { email, password } = req.body;
		// Validate the input
		if (!email || !password) {
			return res
				.status(400)
				.json({ error: "Email and password are required!" });
		}
		// Find user by username
		const user = await User.findOne({ email });
		if (!user) {
			return res.status(401).json({ error: "Invalid username or password" });
		}
		// Compare the provided password with the hashed password in the database

		const isMatch = await bcrypt.compare(password, user.password);
		if (!isMatch) {
			return res.status(401).json({ error: "Invalid password" });
		}
		// Generate a JWT token
		const token = jwt.sign({ userId: user._id }, JWT_SECRET, {
			expiresIn: "1h",
		});
		// Send the token and user data
		res.json({
			message: "Login successful",
			token, // Send the token to the client
			user: {
				id: user._id,
				email: user.email,
			},
		});
	} catch (error) {
		console.error(error);
		res.status(500).json({ error: "Failed to login" });
	}
});

export default router;
