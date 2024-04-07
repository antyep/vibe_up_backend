import { roleSeeder } from "./RoleSeeder";
import { userSeeder } from "./UserSeeder";
import { songsSeeder } from "./SongsSeeder";

(async () => {
	console.log("-----------------------------------------------");
	console.log("🌱 Starting seeders...");
	console.log("-----------------------------------------------");

	await roleSeeder();
	await userSeeder();
	await songsSeeder();

	console.log("-----------------------------------------------");
})();
