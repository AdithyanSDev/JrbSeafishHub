"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.adminLogout = exports.verifyAdminToken = exports.adminLogin = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const adminLogin = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
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
        const token = jsonwebtoken_1.default.sign({ email: ADMIN_EMAIL }, process.env.JWT_SECRET, {
            expiresIn: "24h",
        });
        console.log("Generated Token:", token);
        res.status(200).json({ token });
    }
    catch (error) {
        console.error("Error in adminLogin:", error);
        res.status(500).json({ message: "Internal Server Error" });
    }
});
exports.adminLogin = adminLogin;
// Verify Admin Token
const verifyAdminToken = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        res.status(200).json({ message: "Token is valid" });
    }
    catch (error) {
        res.status(500).json({ message: "Internal Server Error" });
    }
});
exports.verifyAdminToken = verifyAdminToken;
// Logout Admin (Handled on frontend)
const adminLogout = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        res.status(200).json({ message: "Logged out successfully" });
    }
    catch (error) {
        res.status(500).json({ message: "Internal Server Error" });
    }
});
exports.adminLogout = adminLogout;
