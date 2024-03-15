import {
PrimaryGeneratedColumn,
Column,
Entity,
ManyToMany,
OneToMany,
JoinColumn,
} from "typeorm";
import { User } from "./User";
import { MusicFiles } from "./MusicFiles";
import { Like } from "./Likes";


@Entity("Posts")
export class Post {
	@PrimaryGeneratedColumn()
	id?: number;

	@Column({ unique: true })
	caption!: string;
	
	@Column()
	createdAt!: Date;

	@OneToMany(() => User, (User: User) => User.posts)
	@JoinColumn({
		name: "user_id",
	})
	user!: User[];

	@ManyToMany (() => MusicFiles, (musicfiles: MusicFiles) => musicfiles.posts)
	musicFiles!: MusicFiles[]

	@OneToMany(() => Like, (like: Like) => like.post)
	likes!: Like[];
}