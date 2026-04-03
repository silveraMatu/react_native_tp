import "reflect-metadata";
import { DataSource } from "typeorm";
import { User } from "../entities/user/user.entitie.js"; // Un ejemplo de entidad
import { FollowedMatch } from "../entities/followedMatch/followedMatch.js"; // Un ejemplo de entidad
import * as dotenv from "dotenv";

dotenv.config();

export const AppDataSource = new DataSource({
    type: "postgres",
    host: process.env.DB_HOST!,
    port: 5432,
    username: process.env.DB_USER!,
    password: process.env.DB_PASSWORD!,
    database: process.env.DB_NAME!,
    synchronize: true,
    logging: false,
    entities: [User, FollowedMatch],
    migrations: [],
    subscribers: [],
});