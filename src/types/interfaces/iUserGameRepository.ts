import type { DeleteResult } from "typeorm"
import type { FollowedMatch } from "../../entities/followedMatch/followedMatch.js"

export interface iUserGameRepository{
  getFollowedGames(idUser: number):Promise<FollowedMatch[]>
  followGame(idUser: number, idGame: number, localTeam: string, visitorTeam: string, matchDate: string): Promise<FollowedMatch>
  unfollowGame(id: number): Promise<DeleteResult>
}