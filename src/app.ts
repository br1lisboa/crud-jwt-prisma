import express from "express";
import dotenv from "dotenv";
dotenv.config();

import authRoutes from "./routes/auth.routes";
import userRoutes from "./routes/user.routes";

const app = express();

// esto es para que express pueda entender los json
app.use(express.json());

// routes
// > auths
app.use("/auth", authRoutes);
app.use("/user", userRoutes);
// > users

export default app;
