import { Request, Response } from "express";

import { comparePassword, hashPassword } from "../services/password.service";

import PRISMA_USER from "../models/user.model";

import { User } from "../models/user.interface";
import { generateToken } from "../services/auth.service";

export async function register(req: Request, res: Response): Promise<void> {
  const { email, password } = req.body;

  try {
    const hashedPassword = await hashPassword(password);
    console.log(hashedPassword);

    const user = await PRISMA_USER.create({
      data: {
        email,
        password: hashedPassword,
      },
    });

    const token = generateToken(user);

    res.status(201).json({ token });
  } catch (error) {
    // TODO mejorar errores con PRISMA
    res.status(500).json({ error: "Error en el registro" });
  }
}

export async function login(req: Request, res: Response): Promise<void> {
  const { email, password } = req.body;

  try {
    const user = await PRISMA_USER.findUnique({
      where: {
        email,
      },
    });

    if (!user) {
      res.status(404).json({ error: "Usuario no encontrado" });
      return;
    }

    const passwordMatch = await comparePassword({
      password,
      hash: user.password || "",
    });

    if (!passwordMatch) {
      res
        .status(401)
        .json({ message: "El usuario o la contraseña no coinciden" });
    }

    const token = generateToken(user);

    res.status(200).json({ token });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error en el login" });
  }
}
