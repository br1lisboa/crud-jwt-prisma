import express, { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import {
  createUser,
  deleteUser,
  editUser,
  getAllUsers,
  getUser,
} from "../controllers/users.controllers";

const router = express.Router();
const JWT_SECRET = process.env.SECRET_KEY || "";

// vamos a necesitar un middleware para ver si estamos autenticados
function authenticateToken(req: Request, res: Response, next: NextFunction) {
  const authHeader = req.header("authorization");
  const token = authHeader && authHeader.split(" ")[1];

  if (!token) {
    res.status(401).json({ error: "No autorizado" });
    return;
  }

  jwt.verify(token, JWT_SECRET, (err, decoded) => {
    if (err) {
      console.error("Error en la auth");
      return res.status(403).json({ error: "No tienes acceso" });
    }

    next();
  });
}

router.post("/", authenticateToken, createUser);
router.get("/", authenticateToken, getAllUsers);
router.get("/:id", authenticateToken, getUser);
router.put("/:id", authenticateToken, editUser);
router.delete("/:id", authenticateToken, deleteUser);

export default router;
