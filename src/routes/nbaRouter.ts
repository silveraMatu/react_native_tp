import { Router } from "express";
import { NbaRepository } from "../repository/nbaRepository.js";
import { NbaService } from "../services/nbaService.js";
import { NbaController } from "../controllers/nbaController.js";

const router = Router();

const nbaRepo = new NbaRepository();
const nbaService = new NbaService(nbaRepo);
const nbaController = new NbaController(nbaService);

router.get("/today", nbaController.getSchedule);

export default router;