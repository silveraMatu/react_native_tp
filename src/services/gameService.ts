import type { iUserGameRepository } from "../types/interfaces/iUserGameRepository.js";

export class GameService {
  constructor(private readonly gameRepository: iUserGameRepository) {}

  async followNewGame(userId: number, gameData: any) {
    return await this.gameRepository.FollowGame(
      userId,
      gameData.id,
      gameData.home_team.full_name,
      gameData.visitor_team.full_name,
      gameData.date.split('T')[0]
    );
  }

  async removeGameFromWatchlist(matchId: number) {
    return await this.gameRepository.unfollowGame(matchId);
  }
}