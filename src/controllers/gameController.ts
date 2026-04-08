import type { Request, Response } from "express";
import type { GameService } from "../services/gameService.js";

export class GameController {
  constructor(private readonly gameService: GameService) {}

  follow = async (req: Request, res: Response) => {
    try {
      const { userId, gameData } = req.body;
      const result = await this.gameService.followNewGame(userId, gameData);
      res.status(201).json(result);
    } catch (error) {
      res.status(400).json({ error: "No se pudo seguir el juego" });
    }
  };

  unfollow = async (req: Request, res: Response) => {
    try {
      const { id } = req.params;
      await this.gameService.removeGameFromWatchlist(Number(id));
      res.status(200).json({ message: "Juego eliminado" });
    } catch (error) {
      res.status(400).json({ error: "Error al dejar de seguir" });
    }
  };
}