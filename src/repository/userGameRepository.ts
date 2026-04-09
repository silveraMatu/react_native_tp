import type { Repository, DeleteResult } from "typeorm";
import { FollowedMatch } from "../entities/followedMatch/followedMatch.js";
import type { iUserGameRepository } from "../types/interfaces/iUserGameRepository.js";

export class UserGameRepository implements iUserGameRepository {
  constructor(private readonly repository: Repository<FollowedMatch>) {}

  getFollowedGames(idUser: number): Promise<FollowedMatch[]> {
    return this.repository.find({ 
      where: { user: { id: idUser } } 
    });
  }

  followGame(idUser: number, idGame: number, localTeam: string, visitorTeam: string, matchDate: string): Promise<FollowedMatch> {
    
    const newMatch = this.repository.create({
      api_game_id: idGame,
      home_team_name: localTeam,
      visitor_team_name: visitorTeam,
      match_date: matchDate,
      user: { id: idUser }
    });

    return this.repository.save(newMatch);
  }

  unfollowGame(id: number): Promise<DeleteResult> {
    return this.repository.delete({ id });
  }
}