import { Controller } from "./Controller";
import { Request, Response } from "express";
import { Post } from "../models/Post";
import { Song } from "../models/Song";
import { User } from "../models/User";
import { Like } from "../models/Like";
import { AppDataSource } from "../database/data-source";
import { StatusCodes } from "http-status-codes";
import { paginateAndFetch } from "../helpers/paginateAndFetch";

export class PostController implements Controller {
	async getAll(req: Request, res: Response): Promise<void | Response<any>> {
		try {
			const postRepository = AppDataSource.getRepository(Post);

			const { results, count, skip, page } = await paginateAndFetch(postRepository, req.query, { order: { createdAt: "DESC" }, relations: { song: true, like: { user: true } } })
2
			res.status(StatusCodes.OK).json({
				results,
				count,
				skip,
				page
			});
		} catch (error) {
			console.error(error);
			res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
				message: "Error while getting posts",
			});
		}
	}

	async getById(req: Request, res: Response): Promise<void | Response<any>> {
		try {
			const id = +req.params.id;

			const postRepository = AppDataSource.getRepository(Post);
			const post = await postRepository.findOneBy({
				id: id,
			});

			if (!post) {
				return res.status(StatusCodes.NOT_FOUND).json({
					message: "Post not found",
				});
			}

			res.status(StatusCodes.OK).json(post);
		} catch (error) {
			res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
				message: "Error while getting post",
			});
		}
	}

	async create(req: Request, res: Response): Promise<void | Response<any>> {
		try {
			const userId = req.tokenData?.userId;

			const data = req.body;
			console.log("data", data);

			const userRepository = AppDataSource.getRepository(User);
			const user = await userRepository.findOneBy({ id: Number(userId) });

			const songRepository = AppDataSource.getRepository(Song);
			const song = await songRepository.findOneBy({ id: data.song });

			if (!song) return res.status(StatusCodes.NOT_FOUND).json({ message: "Song not found" });

			const dataWithUserId = { ...data, user: user, song: [song] };

			const postRepository = AppDataSource.getRepository(Post);
			const newPost = await postRepository.save(dataWithUserId);

			res.status(StatusCodes.CREATED).json(newPost);
		} catch (error) {
			res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
				message: "Error while creating post",
			});
		}
	}

	async update(req: Request, res: Response): Promise<void | Response<any>> {
		try {
			const id = +req.params.id;
			const data = req.body;

			const postRepository = AppDataSource.getRepository(Post);
			await postRepository.update({ id: id }, data);

			res.status(StatusCodes.ACCEPTED).json({
				message: "Post updated successfully",
			});
		} catch (error) {
			res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
				message: "Error while updating post",
			});
		}
	}

	async delete(req: Request, res: Response): Promise<void | Response<any>> {
		try {
			const id = +req.params.id;

			console.log("id", id);

			const postRepository = AppDataSource.getRepository(Post);
			const post = await postRepository.findOneBy({ id: id });

			if (!post) {
				return res.status(StatusCodes.NOT_FOUND).json({
					message: "Post not found",
				});
			}
			res.status(StatusCodes.OK).json({
				message: "Post deleted successfully",
			});
		} catch (error) {
			console.log(error);
			res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
				message: "Error while deleting post",
			});
		}
	}

	async like(req: Request, res: Response): Promise<void | Response<any>> {
		try {
			const userId = req.tokenData?.userId;
			const postId = +req.params.id;

			const postRepository = AppDataSource.getRepository(Post);
			const post = await postRepository.findOneBy({ id: postId });

			if (!post) {
				return res.status(StatusCodes.NOT_FOUND).json({
					message: "Post not found",
				});
			}

			const userRepository = AppDataSource.getRepository(User);
			const user = await userRepository.findOneBy({ id: Number(userId) });

			if (!user) {
				return res.status(StatusCodes.NOT_FOUND).json({
					message: "User not found",
				});
			}

			const likeRepository = AppDataSource.getRepository(Like);
			const like = await likeRepository.findOne({ where: { post: { id: post.id}, user: {id: user.id} } });

			if (like) {
				await likeRepository.delete({ id: like.id });
				return res.status(StatusCodes.OK).json({
					message: "Post unliked",
					unlikeId: like.id,
				});
			}

			const newLike = await likeRepository.save({ post: post, user });

			res.status(StatusCodes.CREATED).json({
				message: "Post liked",
				like: newLike,
			});
		} catch (error) {
			console.log(error);
			res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
				message: "Error while liking post",
			});
		}
	}	
}