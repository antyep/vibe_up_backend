import { Request, Response } from "express";
import { CreateUserRequestBody, LoginUserRequestBody, TokenData } from "../types/types";
import { User } from "../models/User";
import bcrypt from "bcrypt";
import { UserRoles } from "../constants/UserRoles";
import { AppDataSource } from "../database/data-source";
import { StatusCodes } from "http-status-codes";
import jwt from "jsonwebtoken";

export class AuthController {
	async register(req: Request<{}, {}, CreateUserRequestBody>, res: Response): Promise<void | Response<any>> {
		const { username, password, email } = req.body;

		const userRepository = AppDataSource.getRepository(User);

		try {
			if (!username || !password || !email) {
				return res.status(StatusCodes.BAD_REQUEST).json({
					message: "Missing data in request",
				});
			}

			const userByEmail = await userRepository.findOne({ where: { email: email, } });
			const userByUsername = await userRepository.findOne({ where: { email: email, } });

			if (userByEmail || userByUsername) {
				return res.status(StatusCodes.CONFLICT).json({
					message: "Username or email already exists.",
				});
			}

			const newUser = userRepository.create({
				username,
				email,
				password_hash: bcrypt.hashSync(password, 10),
				roles: [UserRoles.USER],
			});

			await userRepository.save(newUser);

			res.status(StatusCodes.CREATED).json({
				message: "Customer created successfully",
			});
		} catch (error) {
			console.log(error);
			res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
				message: "Error while creating user",
			});
		}
	}

	async login(req: Request<{}, {}, LoginUserRequestBody>, res: Response): Promise<void | Response<any>> {
		const { password, email } = req.body;

		const userRepository = AppDataSource.getRepository(User);

		try {
			if (!email || !password) {
				return res.status(StatusCodes.UNAUTHORIZED).json({
					message: "Email or password is required",
				});
			}

			const user = await userRepository.findOne({
				where: {
					email: email,
				},
				relations: {
					roles: true,
				},
				select: {
					roles: {
						name: true,
					},
				},
			});

			if (!user) {
				return res.status(StatusCodes.UNAUTHORIZED).json({
					message: "Bad email or password",
				});
			}

			const isPasswordValid = bcrypt.compareSync(password, user.password_hash);

			if (!isPasswordValid) {
				return res.status(StatusCodes.UNAUTHORIZED).json({
					message: "Bad email or password",
				});
			}

			const roles = user.roles.map((role) => role.name);

			const tokenPayload: TokenData = {
				userId: user.id?.toString() as string,
				userRoles: roles,
			};

			const token = jwt.sign(tokenPayload, "123", {
				expiresIn: "3h",
			});

			res.status(StatusCodes.OK).json({
				message: "Login successfully",
				token,
			});
		} catch (error) {
			res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
				message: "Internal error while login",
				error,
			});
		}
	}

	async getProfile(req: Request, res: Response): Promise<void | Response<any>> {
		const userId = req.tokenData?.userId;
		const userRepository = AppDataSource.getRepository(User);

		try {
			const user = await userRepository.findOneBy({ id: Number(userId) });

			if (!user) {
				return res.status(StatusCodes.NOT_FOUND).json({
					message: "User not found",
				});
			}

			res.status(StatusCodes.OK).json({
				user,
			});
		} catch (error) {
			res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
				message: "Error while getting user profile",
				error,
			});
		}
	}

	async updateProfile(req: Request, res: Response): Promise<void | Response<any>> {
		const userId = req.tokenData?.userId;
		const userRepository = AppDataSource.getRepository(User);
		const { username, email } = req.body;

		try {
			const user = await userRepository.findOneBy({ id: Number(userId) });

			if (!user) {
				return res.status(StatusCodes.NOT_FOUND).json({
					message: "User not found",
				});
			}

			user.username = username;
			user.email = email;

			await userRepository.save(user);

			res.status(StatusCodes.ACCEPTED).json({
				message: "User updated successfully",
			});
		} catch (error) {
			res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
				message: "Error while updating user profile",
				error,
			});
		}
	}
}