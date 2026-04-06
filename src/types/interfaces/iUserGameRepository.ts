import type { DeleteResult } from "typeorm"
import type { FollowedMatch } from "../../entities/followedMatch/followedMatch.js"

export interface iUserGameRepository{
  FollowGame(idUser: number, idGame: number, localTeam: string, visitorTeam: string, matchDate: string): Promise<FollowedMatch>
  unfollowGame(id: number): Promise<DeleteResult>
}