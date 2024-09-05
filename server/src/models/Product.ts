import mongoose, { Document, ObjectId, Schema } from "mongoose";

// TypeScript interface for the User model
interface Product extends Document {
	name: string;
	price: number;
	description: string;
	_id?: ObjectId;
	imgPath?: string;
	stockCount?: number;
	category: string;
	franchise: string;
	rating: string;
}

// Mongoose schema for the Product model
const ProductSchema: Schema<Product> = new Schema({
	name: { type: String, required: true },
	price: { type: Number, required: true },
	description: { type: String, required: true },
	imgPath: { type: String },
	stockCount: { type: Number, default: 0 },
	category: { type: String, required: true },
	franchise: { type: String, required: true },
	rating: { type: String },
});

export default mongoose.model<Product>("Product", ProductSchema);
