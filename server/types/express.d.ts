// types/express.d.ts
declare global {
	namespace Express {
		interface Request {
			userData?: {
				userID?: string;
				email?: string;
			};
		}
	}
}

export {};
