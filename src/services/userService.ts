import type { iUserRepository } from "../types/interfaces/iUserRepository.js";
import type { User } from "../entities/user/user.entitie.js";

export class UserService {
  constructor(private readonly userRepository: iUserRepository) {}

  async registerUser(nickname: string, email: string, pass: string): Promise<User> {
    return await this.userRepository.Register(nickname, email, pass);
  }

  async login(nickname: string, pass: string): Promise<User | null> {
    return await this.userRepository.Login(nickname, pass);
  }
}