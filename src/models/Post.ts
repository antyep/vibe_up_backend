import {
PrimaryGeneratedColumn,
Column,
Entity,
ManyToMany,
OneToMany,
JoinColumn,
} from "typeorm";
import { User } from "./User";
import { MusicFile } from "./MusicFile";
import { Like } from "./Like";


@Entity("posts")
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

	@ManyToMany (() => MusicFile, (musicfile: MusicFile) => musicfile.posts)
	musicFile!: MusicFile[]

	@OneToMany(() => Like, (like: Like) => like.post)
	like!: Like[];
}