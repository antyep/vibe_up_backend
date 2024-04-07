import { Column, 
Entity,
JoinTable,
PrimaryGeneratedColumn, 
ManyToMany,
} from "typeorm";
import { Post } from "./Post";


@Entity("songs")
export class Song {
	@PrimaryGeneratedColumn('increment')
	id?: number;

    @Column()
	name!: string;

	@Column()
	author!: string;

    @Column()
	file_type?: string;

	@Column()
	createdAt?: Date;

	@ManyToMany(() => Post, (post: Post) => post.song)
	@JoinTable({
		name: "songs_posts",
		joinColumn: {
			name: "songs_id",
			referencedColumnName: "id",
		},
		inverseJoinColumn: {
			name: "post_id",
			referencedColumnName: "id",
		},
	})
	posts?: Post[];
}

