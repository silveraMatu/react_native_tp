import type { Request, Response } from "express";
import type { NbaService } from "../services/nbaService.js";

export class NbaController {
  constructor(private readonly nbaService: NbaService) {}

  getSchedule = async (_req: Request, res: Response) => {
    try {
      const schedule = await this.nbaService.fetchDailySchedule();
      res.status(200).json(schedule);
    } catch (error) {
      res.status(500).json({ error: "Error al obtener la cartelera de la NBA" });
    }
  };
}