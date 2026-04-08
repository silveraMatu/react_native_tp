import { Repository } from "typeorm";
import { User } from "../entities/user/user.entitie.js";
import type { iUserRepository } from "../types/interfaces/iUserRepository.js";

export class UserReposiory implements iUserRepository{
  constructor(private readonly repository: Repository<User>){}
  
  Register(nickname: string, email: string, password: string): Promise<User> {
    return this.repository.save({nickname, email, password})
  }

  Login(nickname: string, password: string): Promise<User | null>{
    return this.repository.findOneBy({nickname, password})
  }
}