import { AppDataSource } from "../data-source";
import { faker } from "@faker-js/faker";
import { Song } from "../../models/Song";

export function createRandomSong(): Song {
	return {
		name: faker.music.songName(),
		author: faker.person.fullName(),
	};
}

export const SONG: Song[] = faker.helpers.multiple(createRandomSong, {
	count: 20,
});

export const songsSeeder = async () => {
	try {
		console.log("🔵 Seeding songs...");
		await AppDataSource.initialize();
		const songsRepository = AppDataSource.getRepository(Song);


		await songsRepository.save(SONG);

		console.log("Seeding songs successfully completed");
	} catch (error) {
		console.error("Error seeding the database:", error);
	} finally {
		await AppDataSource.destroy();
	}
};
