import { Router } from "express";
import { dataSource } from "../conf/db_conf.js";
import { User } from "../entities/user/user.entitie.js";
import { UserReposiory } from "../repository/userRepository.js";
import { UserService } from "../services/userService.js";
import { UserController } from "../controllers/userController.js";

const router = Router();

const typeormRepo = dataSource.getRepository(User);

const userRepo = new UserReposiory(typeormRepo);
const userService = new UserService(userRepo);
const userController = new UserController(userService);

router.post("/register", userController.register);
router.delete("/login", userController.login);

export default router;