import axios from "axios";
import type { iNbaRepository } from "../types/interfaces/iNbaRepository.js";
import "dotenv/config"
import { getNBADate } from "../helpers/getNBADate.js";

export class NbaRepository implements iNbaRepository {
  private readonly apiKey = process.env.api_key;
  private readonly baseUrl = "https://api.balldontlie.io/v1/games";

  async getTodayGames(): Promise<any[]> {

    const current_date = getNBADate();
    
    const response = await axios.get(`${this.baseUrl}?dates[]=${current_date}`, {
      headers: { Authorization: this.apiKey! },
    });

    return response.data.data;
  }

  async getGlobalStats(): Promise<any[]> {
    
    const current_date = getNBADate();
    
    const date = new Date(`${current_date}T12:00:00`);
    date.setDate(date.getDate() - 15);
    
    const fifteen_days_back = date.toISOString().split("T")[0];

    const response = await axios.get(`${this.baseUrl}?start_date=${fifteen_days_back}&end_date=${current_date}&per_page=100`, {
      headers: { Authorization: this.apiKey! }
    });
  
    return response.data.data;
  }
}