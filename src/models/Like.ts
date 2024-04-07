import { Entity, 
PrimaryGeneratedColumn, 
ManyToOne, 
JoinColumn } from "typeorm";
import { Post } from "./Post";
import { User } from "./User";


@Entity("likes")
export class Like {
    @PrimaryGeneratedColumn('increment')
    id?: number;

    @ManyToOne(() => Post, (post: Post) => post.like)
    @JoinColumn({ name: "post_id" })
    post!: Post;

    @ManyToOne(() => User, (user: User) => user.like)
    @JoinColumn({ name: "user_id" })
    user!: User;
}