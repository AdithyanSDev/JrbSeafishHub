import { Request, Response, NextFunction } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";

interface AdminRequest extends Request {
  admin?: string | JwtPayload;
}

export const protectAdmin = (req: AdminRequest, res: Response, next: NextFunction): void => {
  const token = req.header("Authorization")?.split(" ")[1];
  console.log("Received Token:", token);

  if (!token) {
    res.status(401).json({ message: "Unauthorized - No token provided" });
    return;
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET as string) as JwtPayload;
    console.log("Decoded Token:", decoded);
    req.admin = decoded;
    next();
  } catch (error) {
    res.status(401).json({ message: "Invalid Token" });
  }
};

