import express from "express";
import { SongController } from "../controllers/SongController";
import { auth } from "../middlewares/auth";

const router = express.Router();
const songController = new SongController();

router.get("/", auth, songController.getAll);

export default router;