import mongoose, { ObjectId, Schema } from "mongoose";

interface Review {
	productId: ObjectId;
	review: string;
	reviewer: string;
	stars: number;
	_id?: ObjectId;
}

// Mongoose schema for the Product model
const ReviewSchema: Schema<Review> = new Schema({
	review: { type: String, required: true },
	reviewer: { type: String, required: true },
	stars: { type: Number, required: true },
});

export default mongoose.model<Review>("Product", ReviewSchema);
