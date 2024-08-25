import express from "express";
import { Express } from "express";
import cors from "cors";
import mongoose from "mongoose";
import dotenv from "dotenv";
import userRoutes from "./routes/user";
dotenv.config();

const app: Express = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const uri: string = process.env.ATLAS_URI || "";

(async () => {
	try {
		await mongoose.connect(uri);
		console.log("Connected to the database");
	} catch (error) {
		console.error("Database connection error:", error);
	}
})();

app.use("/api/users", userRoutes); // Use the users route

const PORT: string | number = process.env.PORT || 3000;

app.listen(PORT, () => {
	console.log(`Server is running on PORT: ${PORT}`);
});
