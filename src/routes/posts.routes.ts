import express from "express";
import { PostController } from "../controllers/PostController";
import { auth } from "../middlewares/auth";

const router = express.Router();
const postController = new PostController();

router.get("/", auth, postController.getAll);

router.post("/", auth, postController.create);

router.delete("/:id", auth, postController.delete);

router.post("/like/:id", auth, postController.like);

export default router;
