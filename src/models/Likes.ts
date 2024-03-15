import { Entity, 
PrimaryGeneratedColumn, 
ManyToOne, 
JoinColumn } from "typeorm";
import { Post } from "./Post";
import { User } from "./User";


@Entity("likes")
export class Like {
    @PrimaryGeneratedColumn()
    id?: number;

    @ManyToOne(() => Post, (post: Post) => post.likes)
    @JoinColumn({ name: "post_id" })
    post!: Post;

    @ManyToOne(() => User, (user: User) => user.likes)
    @JoinColumn({ name: "user_id" })
    user!: User;
}