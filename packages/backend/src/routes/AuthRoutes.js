import express from "express";
// Đảm bảo đường dẫn này trỏ ĐÚNG đến AuthController.js
import { register, login } from "../controllers/AuthController.js";

const router = express.Router();

// POST /api/v1/auth/register
router.post("/register", register);

// POST /api/v1/auth/login
router.post("/login", login);

export default router;
