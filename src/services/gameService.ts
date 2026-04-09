import type { iUserGameRepository } from "../types/interfaces/iUserGameRepository.js";

export class GameService {
  constructor(private readonly gameRepository: iUserGameRepository) {}

  async getFollowedGames(userId: number){
    return await this.gameRepository.getFollowedGames(userId)
  }

  async followNewGame(userId: number, gameData: any) {
    return await this.gameRepository.followGame(
      userId,
      gameData.id,
      gameData.home_team.full_name,
      gameData.visitor_team.full_name,
      gameData.date
    );
  }

  async removeGameFromWatchlist(matchId: number) {
    return await this.gameRepository.unfollowGame(matchId);
  }
}