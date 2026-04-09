import type { Request, Response } from "express";
import { GameService } from "../services/gameService.js";

export class GameController {
    constructor(private readonly gameService: GameService) {}

    followGame = async (req: Request, res: Response) => {
        try {
            const { userId, gameData } = req.body;
            console.log(userId)
            const newGame = await this.gameService.followNewGame(
                Number(userId),
                Number(gameData.id),
                gameData.home_team.full_name,
                gameData.visitor_team.full_name,
                gameData.date
            );
            res.status(201).json(newGame);
        } catch (error) {
          console.log(error)
            res.status(400).json({ error: "Error al seguir el partido" });
        }
    };

    unfollowGame = async (req: Request, res: Response) => {
        try {
            const { id } = req.params;
            await this.gameService.removeGameFromWatchlist(Number(id));
            res.status(200).json({ message: "Partido eliminado" });
        } catch (error) {
            res.status(400).json({ error: "Error al eliminar el partido" });
        }
    };

    getFollowed = async (req: Request, res: Response) => {
        try {
            const { userId } = req.params;
            const games = await this.gameService.getFollowedGames(Number(userId));
            res.status(200).json(games);
        } catch (error) {
            res.status(400).json({ error: "Error al obtener la cartelera" });
        }
    };
}