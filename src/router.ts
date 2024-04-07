import express from "express";
import authRoutes from "./routes/auth.routes";
import userRoutes from "./routes/users.routes";
import postRoutes from "./routes/posts.routes";
import songRoutes from "./routes/songs.routes";


const router = express.Router();


router.use("/api/auth", authRoutes);
router.use("/api/users", userRoutes);
router.use("/api/posts", postRoutes);	
router.use("/api/songs", songRoutes);

export default router;