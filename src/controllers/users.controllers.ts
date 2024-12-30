import { Request, Response } from "express";
import { hashPassword } from "../services/password.service";
import prisma from "../models/user.model";

export async function createUser(req: Request, res: Response): Promise<void> {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      res
        .status(400)
        .json({ message: "Falta alguno de los datos obligatorios" });
    }

    const hashedPassword = await hashPassword(password);

    await prisma.create({
      data: {
        email,
        password: hashedPassword,
      },
    });

    res.status(201).json({ message: "Usuario creado exitosamente" });
  } catch (error) {
    res.status(500).json({ error: "Ocurrió un error durante la creación." });
  }
}

export async function getAllUsers(req: Request, res: Response) {
  try {
    const users = await prisma.findMany();

    res.status(200).json({
      users,
    });
  } catch (error) {
    res.status(500).json({ error: "Ocurrió un error durante la solicitud." });
  }
}

export async function getUser(req: Request, res: Response) {
  try {
    const { id } = req.params;

    const user = await prisma.findUnique({
      where: {
        id: Number(id),
      },
    });

    if (!user) {
      res.status(400).json({ message: "No existe el usuario con ese ID" });
      return;
    }

    res.status(200).json({
      user,
    });
  } catch (error) {
    res.status(500).json({ error: "Ocurrió un error durante la solicitud." });
  }
}

export async function editUser(req: Request, res: Response): Promise<void> {
  try {
    const { id } = req.params;
    const { email } = req.body;

    if (!email || !id) {
      res
        .status(400)
        .json({ message: "Falta alguno de los datos obligatorios" });
    }

    await prisma.update({
      where: {
        id: Number(id),
      },
      data: {
        email,
      },
    });

    res.status(201).json({ message: "Usuario editado exitosamente" });
  } catch (error) {
    res.status(500).json({ error: "Ocurrió un error durante la edición." });
  }
}

export async function deleteUser(req: Request, res: Response): Promise<void> {
  try {
    const { id } = req.params;

    if (!id) {
      res
        .status(400)
        .json({ message: "Falta alguno de los datos obligatorios" });
    }

    await prisma.delete({
      where: {
        id: Number(id),
      },
    });

    res.status(201).json({ message: "Usuario eliminado exitosamente" });
  } catch (error) {
    res.status(500).json({ error: "Ocurrió un error durante la eliminación." });
  }
}
