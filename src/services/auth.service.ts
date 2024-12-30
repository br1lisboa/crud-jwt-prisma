import { User } from "../models/user.interface";
import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.SECRET_KEY || "";

export function generateToken(user: User): string {
  return jwt.sign(user, JWT_SECRET, { expiresIn: "1h" });
}
