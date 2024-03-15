import { Column, 
Entity,
JoinTable,
PrimaryGeneratedColumn, 
ManyToMany,
} from "typeorm";
import { User } from "./User";
import { Post } from "./Post";


@Entity("music_files")
export class MusicFiles {
	@PrimaryGeneratedColumn()
	id?: number;

	@Column()
	timestamp!: Date;
    
    @Column()
	artist_name!: string;

    @Column()
	song_name!: string;

    @Column()
	file_type!: string;

    @Column()
	duration!: number;

	@Column()
	creation_date!: Date;


	@ManyToMany(() => User, (User: User) => User.musicFiles)
	@JoinTable({
		name: "user_music_files",
		joinColumn: {
			name: "user_id",
			referencedColumnName: "id",
		},
		inverseJoinColumn: {
			name: "music_files_id",
			referencedColumnName: "id",
		},
	})
	users!: User[];

	@ManyToMany(() => Post, (post: Post) => post.musicFiles)
	@JoinTable({
		name: "music_files_posts",
		joinColumn: {
			name: "music_files_id",
			referencedColumnName: "id",
		},
		inverseJoinColumn: {
			name: "post_id",
			referencedColumnName: "id",
		},
	})
	posts!: Post[];



}