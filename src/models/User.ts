import {
	PrimaryGeneratedColumn,
	Column,
	Entity,
	JoinTable,
	ManyToMany,
	OneToMany,
} from "typeorm";
import { Role } from "./Role";
import { Post } from "./Post";
import { Like } from "./Like";


@Entity("users")
export class User {
	@PrimaryGeneratedColumn('increment')
	id?: number;

	@Column({ unique: true })
	username!: string;

	@Column({ unique: true })
	email!: string;

	@Column()
	password_hash!: string;

	@Column()
	bio?: string;

	@Column()
	profile_picture?: string;

	@ManyToMany(() => Role, (role: Role) => role.users)
	@JoinTable({
		name: "users_roles",
		joinColumn: {
			name: "user_id",
			referencedColumnName: "id",
		},
		inverseJoinColumn: {
			name: "role_id",
			referencedColumnName: "id",
		},
	})
	roles!: Role[];

	@OneToMany(() => Post, (post) => post.user)
	posts?: Post[];

	@OneToMany(() => Like, (like) => like.user)
	like?: Like[];
}