import type { iNbaRepository } from "../types/interfaces/iNbaRepository.js";

export class NbaService {
  private cachedGames: any[] = [];
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
      console.log(" [NBA Service] Ejecutando barrido: Buscando partidos en la API externa...");
      const games = await this.nbaRepository.getTodayGames();

      this.cachedGames = games.map((game: any) => ({
        idGame: game.id,
        home_team: game.home_team.full_name,
        visitor_team: game.visitor_team.full_name,
        homeAcronym: game.home_team.abbreviation,
        visitorAcronym: game.visitor_team.abbreviation,
        date: game.date
      }));

      this.lastFetchDate = new Date().toISOString().split("T")[0]!;
      console.log(` [NBA Service] Caché actualizada. ${this.cachedGames.length} partidos encontrados.`);
      
    } catch (error) {
      console.error("[NBA Service] Error al actualizar la caché:", error);
    }
  }

  async fetchDailySchedule() {
    const currentDate = new Date().toISOString().split("T")[0];

    if (this.cachedGames.length === 0 || this.lastFetchDate !== currentDate) {
      console.log(" [NBA Service] Caché vacía o desactualizada. Forzando fetch...");
      await this.updateCache();
    }

    return this.cachedGames;
  }
}