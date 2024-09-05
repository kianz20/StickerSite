import { NextFunction, Request, Response } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET || "your_jwt_secret";

// Define an interface that extends JwtPayload
interface CustomJwtPayload extends JwtPayload {
	userID?: string;
	email?: string;
}

const authenticateToken = (
	req: Request,
	res: Response,
	next: NextFunction
): void => {
	try {
		const token = req.headers.authorization?.split(" ")[1];
		if (token) {
			const decodedToken = jwt.verify(token, JWT_SECRET) as CustomJwtPayload;
			req.userData = {
				userID: decodedToken.userID,
				email: decodedToken.email,
			};
			next();
		} else {
			res.status(401).json({ error: "No token provided" });
		}
	} catch {
		res
			.status(401)
			.json({ error: "Authentication failed, try logging in again" });
	}
};

export default authenticateToken;
