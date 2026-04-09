import type { Repository } from "typeorm";
import { FollowedMatch } from "../entities/followedMatch/followedMatch.js";
import type { iUserGameRepository } from "../types/interfaces/iUserGameRepository.js";
import type { DeleteResult } from "typeorm/browser";

export class UserGameRepository implements iUserGameRepository{
  constructor(private readonly repository: Repository<FollowedMatch>){}

  getFollowedGames(idUser: number): Promise<FollowedMatch[]> {
    return this.repository.find({ 
      where: { user: { id: idUser } } 
    });
  }

  followGame(idUser: number, idGame: number, localTeam: string, visitorTeam: string, matchDate: string): Promise<FollowedMatch> {
    return this.repository.save({
      api_game_id: idGame,
      home_team_name: localTeam,
      visitor_team_name: visitorTeam,
      match_date: matchDate,
      user: {id: idUser}
    })
  }

  unfollowGame(id: number): Promise<DeleteResult> {
    return this.repository.delete({id})
  }
}