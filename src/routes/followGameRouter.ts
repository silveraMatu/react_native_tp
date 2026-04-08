import { Router } from "express";
import { dataSource } from "../conf/db_conf.js";
import { FollowedMatch } from "../entities/followedMatch/followedMatch.js";
import { UserGameRepository } from "../repository/userGameRepository.js";
import { GameService } from "../services/gameService.js";
import { GameController } from "../controllers/gameController.js";

const router = Router();

const typeormRepo = dataSource.getRepository(FollowedMatch);

const gameRepo = new UserGameRepository(typeormRepo);
const gameService = new GameService(gameRepo);
const gameController = new GameController(gameService);

router.post("/follow", gameController.follow);
router.delete("/unfollow/:id", gameController.unfollow);

export default router;