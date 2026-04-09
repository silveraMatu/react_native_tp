import { User } from "../../entities/user/user.entitie.js";

export interface iUserRepository{
  Register(nickname: string, email: string, password: string): Promise<User>
  Login(nickname: string): Promise<User | null>
}