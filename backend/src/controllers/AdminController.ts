  import { Request, Response } from "express";
  import jwt from "jsonwebtoken";

 
export const adminLogin = async (req: Request, res: Response): Promise<void> => {
  try {
    console.log("Admin login function called");

    const { email, password } = req.body;
    const ADMIN_EMAIL = process.env.ADMIN_EMAIL;
    const ADMIN_PASSWORD = process.env.ADMIN_PASS;
    console.log("Expected email:", ADMIN_EMAIL);
    console.log("Expected password:", ADMIN_PASSWORD);
    console.log("Received email:", email);
    console.log("Received password:", password);

    if (email !== ADMIN_EMAIL || password !== ADMIN_PASSWORD) {
      console.log("Invalid credentials");
      res.status(401).json({ message: "Invalid Credentials" });
      return;
    }

    const token = jwt.sign({ email: ADMIN_EMAIL }, process.env.JWT_SECRET as string, {
      expiresIn: "24h",
    });
    console.log("Generated Token:", token);

    res.status(200).json({ token });
  } catch (error) {
    console.error("Error in adminLogin:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};


  // Verify Admin Token
  export const verifyAdminToken = async (req: Request, res: Response): Promise<void> => {
    try {
      res.status(200).json({ message: "Token is valid" });
    } catch (error) {
      res.status(500).json({ message: "Internal Server Error" });
    }
  };

  // Logout Admin (Handled on frontend)
  export const adminLogout = async (req: Request, res: Response): Promise<void> => {
    try {
      res.status(200).json({ message: "Logged out successfully" });
    } catch (error) {
      res.status(500).json({ message: "Internal Server Error" });
    }
  };
