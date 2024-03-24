import express from "express";
import { AuthController } from "../controllers/AuthController";
import { auth } from "../middlewares/auth";

const router = express.Router();
const authController = new AuthController();

router.post("/register", authController.register);

router.post("/login", authController.login);

router.get("/profile", auth, authController.getProfile)

router.put("/profile", auth, authController.updateProfile)

export default router;