import type { Request, Response } from "express";
import type { GameService } from "../services/gameService.js";

export class GameController {
  constructor(private readonly gameService: GameService) {}

  getFollowed = async (req: Request, res:Response) => {
    try {
      const {userId} = req.body;
      const games = await this.gameService.getFollowedGames(userId)
      if(!games.length) throw new Error("No has seguido ningún juego.")
      res.status(201).json(games)
    } catch (error: any) {
      res.status(404).json({error: error.message})
    }
  }

  follow = async (req: Request, res: Response) => {
    try {
      const { userId, gameData } = req.body;
      const result = await this.gameService.followNewGame(userId, gameData);
      res.status(201).json(result);
    } catch (error: any) {
      console.log(error)
      res.status(400).json({ error: error });
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