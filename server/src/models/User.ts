import mongoose, { Document, Schema } from "mongoose";

// TypeScript interface for the User model
interface IUser extends Document {
	email: string;
	password: string;
	mailingList: boolean;
	role: string;
}

// Mongoose schema for the User model
const UserSchema: Schema<IUser> = new Schema({
	email: { type: String, required: true },
	password: { type: String, required: true },
	mailingList: { type: Boolean, required: true },
	role: { type: String, required: true },
});

const User = mongoose.model<IUser>("User", UserSchema);

export default User;
