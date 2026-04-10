export interface iNbaRepository {
  getTodayGames(): Promise<any[]>;
  getGlobalStats(): Promise<any[]>;
}