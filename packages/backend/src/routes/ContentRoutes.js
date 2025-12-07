import express from "express";
// Nhớ import thêm getContentById và deleteContent
import {
  generateContent,
  getHistory,
  getContentById,
  deleteContent,
} from "../controllers/ContentController.js";
import { protect } from "../middleware/auth.js";

const router = express.Router();

router.use(protect); // Bảo vệ tất cả routes

router.post("/generate", generateContent); // Tạo mới
router.get("/", getHistory); // Lấy danh sách

// Các routes thao tác với ID cụ thể (Sửa, Xóa, Xem chi tiết)
router
  .route("/:id")
  .get(getContentById) // Xem chi tiết
  .delete(deleteContent); // Xóa bài viết

export default router;
