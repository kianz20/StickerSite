export interface IUser extends Document {
	email: string;
	password: string;
	mailingList: boolean;
	role: string;
}
