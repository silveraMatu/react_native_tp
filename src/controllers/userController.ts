import type { Request, Response } from "express";
import type { UserService } from "../services/userService.js";

export class UserController {
  constructor(private readonly userService: UserService) {}

  register = async (req: Request, res: Response) => {
    try {
      const { nickname, email, password } = req.body;
      const user = await this.userService.registerUser(nickname, email, password);
      res.status(201).json(user);
    } catch (error) {
      res.status(400).json({ error: "Error al registrar usuario" });
    }
  };

  login = async (req: Request, res: Response) => {
    try {
      const { nickname, password } = req.body;
      const user = await this.userService.login(nickname, password);
      
      if (!user) {
        return res.status(401).json({ error: "Credenciales inválidas" });
      }
      
      res.status(200).json(user);
    } catch (error) {
      res.status(500).json({ error: "Error en el servidor" });
    }
  };
}