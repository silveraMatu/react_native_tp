export interface iNbaRepository {
  getTodayGames(): Promise<any[]>;
}