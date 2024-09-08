import mongoose, { Document, ObjectId, Schema } from "mongoose";

// TypeScript interface for the User model
interface Product extends Document {
	name: string;
	category: string;
	description: string;
	price: number;
	_id: ObjectId;
	imgPath: string;
	stockCount: number;
	franchise: string;
	rating?: string;
}

// Mongoose schema for the Product model
const ProductSchema: Schema<Product> = new Schema({
	name: { type: String, required: true },
	category: { type: String, required: true },
	description: { type: String, required: true },
	price: { type: Number, required: true },
	imgPath: { type: String, required: true },
	stockCount: { type: Number, required: true },
	franchise: { type: String, required: true },
	rating: { type: String },
});

export default mongoose.model<Product>("Product", ProductSchema);
