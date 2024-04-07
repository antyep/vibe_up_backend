import {
PrimaryGeneratedColumn,
Column,
Entity,
ManyToMany,
OneToMany,
ManyToOne,
CreateDateColumn
} from "typeorm";
import { User } from "./User";
import { Song } from "./Song";
import { Like } from "./Like";


@Entity("posts")
export class Post {
	@PrimaryGeneratedColumn('increment')
	id?: number;

	@Column({ unique: true })
	caption!: string;

	@CreateDateColumn()
    createdAt!: Date

    @ManyToOne(() => User, (user) => user.posts)
    user!: User;

	@ManyToMany (() => Song, (songs: Song) => songs.posts)
	song?: Song[];

	@OneToMany(() => Like, (like: Like) => like.post)
	like?: Like[];
}