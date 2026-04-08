import axios from "axios";
import type { iNbaRepository } from "../types/interfaces/iNbaRepository.js";
import "dotenv/config"

export class NbaRepository implements iNbaRepository {
  private readonly apiKey = process.env.api_key;
  private readonly baseUrl = "https://api.balldontlie.io/v1/games";

  async getTodayGames(): Promise<any[]> {
    const current_date = new Date().toISOString().split("T")[0];
    
    const response = await axios.get(`${this.baseUrl}?dates[]=${current_date}`, {
      headers: { Authorization: this.apiKey! },
    });

    return response.data.data;
  }
}