import { Router } from "express";
import { UserController } from "../controllers/userController.js";
import { UserService } from "../services/userService.js";
import { UserRepository } from "../repository/userRepository.js";
import { User } from "../entities/user/user.entitie.js"; // Asegurate de importar la entidad
import { dataSource } from "../conf/db_conf.js";

const router = Router();

const userRepository = new UserRepository(dataSource.getRepository(User));
const userService = new UserService(userRepository);
const userController = new UserController(userService);

router.post("/register", userController.register);
router.post("/login", userController.login);

export default router;