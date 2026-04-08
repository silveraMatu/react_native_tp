import type { iNbaRepository } from "../types/interfaces/iNbaRepository.js";

export class NbaService {
  constructor(private readonly nbaRepository: iNbaRepository) {}

  async fetchDailySchedule() {
    const games = await this.nbaRepository.getTodayGames();

    return games.map((game: any) => ({
      idGame: game.id,
      home_team: game.home_team.full_name,
      visitor_team: game.visitor_team.full_name,
      date: game.date
    }));
  }
}