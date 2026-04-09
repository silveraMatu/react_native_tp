import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { FollowedMatch } from "../followedMatch/followedMatch.js";

@Entity("users")
export class User {
    @PrimaryGeneratedColumn()
    id!: number;

    @Column({ unique: true })
    email!: string;

    @Column({ unique: true })
    nickname!: string;

    @Column()
    password!: string;

    @OneToMany(() => FollowedMatch, (followedMatch) => followedMatch.user)
    followedMatches!: FollowedMatch[];
}