import { getNBADate } from "../helpers/getNBADate.js";
import type { iNbaRepository } from "../types/interfaces/iNbaRepository.js";

export class NbaService {
  private cachedGames: any[] = [];
  private cachedTeamHistory: Record<string, string[]> = {}; 
  private lastFetchDate: string = "";

  constructor(private readonly nbaRepository: iNbaRepository) {
    this.startBackgroundSweep();
  }

  private async startBackgroundSweep() {
    await this.updateCache();

    setInterval(async () => {
      await this.updateCache();
    }, 1000 * 60 * 60);
  }

  private async updateCache() {
    try {
      console.log("[NBA Service] Ejecutando barrido: Buscando partidos en la API externa...");
      
      const currentDate = getNBADate();

      const games = await this.nbaRepository.getTodayGames(); 
      let last100Games = await this.nbaRepository.getGlobalStats();

      this.cachedGames = games.map((game: any) => ({
        idGame: game.id,
        home_team: game.home_team.full_name,
        visitor_team: game.visitor_team.full_name,
        homeAcronym: game.home_team.abbreviation,
        visitorAcronym: game.visitor_team.abbreviation,
        date: game.date
      }));

      last100Games.sort((a: any, b: any) => new Date(b.date).getTime() - new Date(a.date).getTime());

      this.cachedTeamHistory = last100Games.reduce((acc: any, game: any) => {
        if (game.status !== "Final") return acc;

        const teams = [
          { name: game.home_team.full_name, score: game.home_team_score, oppScore: game.visitor_team_score },
          { name: game.visitor_team.full_name, score: game.visitor_team_score, oppScore: game.home_team_score }
        ];

        teams.forEach(({ name, score, oppScore }) => {
          if (!acc[name]) acc[name] = [];
          if (acc[name].length < 4) {
            acc[name].unshift(score > oppScore ? "V" : "D");
          }
        });

        return acc;
      }, {});

      this.lastFetchDate = currentDate;
      console.log(`[NBA Service] Caché actualizada. ${this.cachedGames.length} partidos encontrados.`);
      
    } catch (error) {
      console.error("[NBA Service] Error al actualizar la caché:", error);
    }
  }

  async fetchDailySchedule() {
    const currentDate = getNBADate();

    if (this.cachedGames.length === 0 || this.lastFetchDate !== currentDate) {
      console.log(" [NBA Service] Caché vacía o desactualizada. Forzando fetch...");
      await this.updateCache();
    }

    return this.cachedGames;
  }

  async fetchTeamGlobalsStats() {
    const currentDate = getNBADate();

    if (Object.keys(this.cachedTeamHistory).length === 0 || this.lastFetchDate !== currentDate) {
      console.log("[NBA Service] Caché de estadísticas vacía o desactualizada. Forzando fetch...");
      await this.updateCache();
    }

    return this.cachedTeamHistory;
  }
}