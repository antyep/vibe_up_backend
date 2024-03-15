import { Controller } from "./Controller";
import { Request, Response } from "express";
import { User } from "../models/User";
import { AppDataSource } from "../database/data-source";
import { StatusCodes } from "http-status-codes";
import { paginateAndFetch } from "../helpers/paginateAndFetch";

export class UserController implements Controller {
	async getAll(req: Request, res: Response): Promise<void | Response<any>> {
		try {
			const userRepository = AppDataSource.getRepository(User);

			const { results, count, skip, page } = await paginateAndFetch(userRepository, req.query, { select: {
				username: true,
				email: true,
				id: true,
			}})

			res.status(StatusCodes.OK).json({
				results,
				count,
				skip,
				page
			});
		} catch (error) {
			res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
				message: "Error while getting users",
			});
		}
	}

	async getById(req: Request, res: Response): Promise<void | Response<any>> {
		try {
			const id = +req.params.id;

			const userRepository = AppDataSource.getRepository(User);
			const user = await userRepository.findOneBy({
				id: id,
			});

			if (!user) {
				return res.status(StatusCodes.NOT_FOUND).json({
					message: "User not found",
				});
			}

			res.status(StatusCodes.OK).json(user);
		} catch (error) {
			res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
				message: "Error while getting user",
			});
		}
	}

	async create(req: Request, res: Response): Promise<void | Response<any>> {
		try {
			const data = req.body;

			const userRepository = AppDataSource.getRepository(User);
			const newUser = await userRepository.save(data);
			res.status(StatusCodes.CREATED).json(newUser);
		} catch (error) {
			res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
				message: "Error while creating user",
			});
		}
	}

	async update(req: Request, res: Response): Promise<void | Response<any>> {
		try {
			const id = +req.params.id;
			const data = req.body;

			const userRepository = AppDataSource.getRepository(User);
			await userRepository.update({ id: id }, data);

			res.status(StatusCodes.ACCEPTED).json({
				message: "User updated successfully",
			});
		} catch (error) {
			res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
				message: "Error while updating user",
			});
		}
	}

	async delete(req: Request, res: Response): Promise<void | Response<any>> {
		try {
			const id = +req.params.id;

			console.log("id", id);

			const userRepository = AppDataSource.getRepository(User);
			const user = await userRepository.findOneBy({ id: id });

			if (!user) {
				return res.status(StatusCodes.NOT_FOUND).json({
					message: "User not found",
				});
			}
			res.status(StatusCodes.OK).json({
				message: "User deleted successfully",
			});
		} catch (error) {
			console.log(error);
			res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
				message: "Error while deleting user",
			});
		}
	}
}