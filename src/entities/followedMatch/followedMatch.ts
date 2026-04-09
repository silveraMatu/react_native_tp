import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, CreateDateColumn } from "typeorm";
import { User } from "../user/user.entitie.js";

@Entity("followed_matches")
export class FollowedMatch {
    @PrimaryGeneratedColumn()
    id!: number;

    @Column({unique: true})
    api_game_id!: number;

    @Column()
    home_team_name!: string;

    @Column()
    visitor_team_name!: string;

    @Column({ type: "date" })
    match_date!: string;

    @ManyToOne(() => User, (user) => user.followedMatches, { onDelete: "CASCADE" })
    user!: any;
}