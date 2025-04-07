// utils/auth.ts
import {jwtDecode} from "jwt-decode";

export const isTokenExpired = (token: string | null): boolean => {
  if (!token) return true; // No token means it's expired
  try {
    const decoded: any = jwtDecode(token);
    return decoded.exp * 1000 < Date.now(); // Convert to milliseconds
  } catch (error) {
    return true; // If decoding fails, treat as expired
  }
};
