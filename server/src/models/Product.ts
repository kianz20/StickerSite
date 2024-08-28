import mongoose, { Schema, Document, ObjectId } from "mongoose";

// TypeScript interface for the User model
interface Product extends Document {
	name: string;
	price: string;
	description: string;
	_id?: ObjectId;
}

// Mongoose schema for the Product model
const ProductSchema: Schema<Product> = new Schema({
	name: { type: String, required: true },
	price: { type: String, required: true },
	description: { type: String, required: true },
});

export default mongoose.model<Product>("Product", ProductSchema);
