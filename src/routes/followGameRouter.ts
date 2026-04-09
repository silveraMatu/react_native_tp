import { Router } from "express";
import { GameController } from "../controllers/gameController.js";
import { GameService } from "../services/gameService.js";
import { UserGameRepository } from "../repository/userGameRepository.js";
import { FollowedMatch } from "../entities/followedMatch/followedMatch.js";
import { dataSource } from "../conf/db_conf.js";

const router = Router();

const gameRepository = new UserGameRepository(dataSource.getRepository(FollowedMatch));
const gameService = new GameService(gameRepository);
const gameController = new GameController(gameService);

router.post("/follow", gameController.followGame);
router.delete("/unfollow/:id", gameController.unfollowGame);
router.get("/followed/:userId", gameController.getFollowed);

export default router;