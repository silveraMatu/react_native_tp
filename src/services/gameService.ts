import type { iUserGameRepository } from "../types/interfaces/iUserGameRepository.js";

export class GameService {
  constructor(private readonly gameRepository: iUserGameRepository) {}

  async getFollowedGames(userId: number){
    return await this.gameRepository.getFollowedGames(userId)
  }

  async followNewGame(userId: number, gameId: number, homeTeam: string, visitorTeam: string, matchDate: string) {
    console.log(`${homeTeam} vs ${visitorTeam}`)
    return await this.gameRepository.followGame(
      userId,
      gameId,
      homeTeam,
      visitorTeam,
      matchDate
    );
  }

  async removeGameFromWatchlist(matchId: number) {
    return await this.gameRepository.unfollowGame(matchId);
  }
}