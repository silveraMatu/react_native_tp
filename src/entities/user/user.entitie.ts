import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from "typeorm";
import { FollowedMatch } from "../followedMatch/followedMatch.js"; 

@Entity("users")
export class User {
    @PrimaryGeneratedColumn()
    id!: number;

    @Column({ unique: true })
    email!: string;

    @Column({ select: false })
    password!: string;

    @Column()
    nickname!: string;

    @OneToMany(() => FollowedMatch, (match) => match.user)
    followedMatches!: any;
}