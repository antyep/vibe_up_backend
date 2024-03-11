import "reflect-metadata";
import { DataSource } from "typeorm";

export const AppDataSource = new DataSource({
	type: "mysql",
	host: "localhost",
	port: 3306,
	username: "admin",
	password: "root",
	database: "backend_vibe_up",
	entities: [`${__dirname}/../models/**/*{.js,.ts}`],
	migrations: [`${__dirname}/migrations/**/*{.js,.ts}`],
	synchronize: false,
	logging: false,
});