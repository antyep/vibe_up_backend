import { Controller } from "./Controller";
import { Request, Response } from "express";
import { AppDataSource } from "../database/data-source";
import { StatusCodes } from "http-status-codes";
import { Song } from "../models/Song";

export class SongController implements Controller {
	async getAll(req: Request, res: Response): Promise<Response> {
		try {
			const songRepository = AppDataSource.getRepository(Song);

			const results = await songRepository.find({
				select: {
					name: true,
					author: true,
					id: true,
				}
			});

			return res.status(StatusCodes.OK).json({
				results
			});
		} catch (error) {
			console.error(error);
			return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
				message: "Error while getting songs",
			});
		}
	}
}