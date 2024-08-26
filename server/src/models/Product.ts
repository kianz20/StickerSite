import mongoose, { Schema, Document } from "mongoose";

// TypeScript interface for the User model
interface Product extends Document {
	name: string;
	price: string;
	details: string;
}

// Mongoose schema for the User model
const ProductSchema: Schema<Product> = new Schema({
	name: { type: String, required: true },
	price: { type: String, required: true },
	details: { type: String, required: true },
});

export default mongoose.model<Product>("Product", ProductSchema);
