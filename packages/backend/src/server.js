// ...existing code...
import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from "url";
import connectDB from "./config/db.js"; // Import kết nối DB
import authRoutes from "./routes/AuthRoutes.js"; // Import tuyến đường Auth
import contentRoutes from "./routes/ContentRoutes.js";

// Thay đổi load dotenv để lấy đường dẫn tương đối chính xác
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
dotenv.config({ path: path.resolve(__dirname, "../.env") });

// ...existing code...

// 2. Kết nối database
connectDB();

// Khởi tạo ứng dụng Express
const app = express();
const PORT = process.env.PORT || 5000;

// 3. Middleware
app.use(cors());
app.use(express.json());

// 4. Routes (Các Tuyến Đường API)

// Tuyến đường kiểm tra server cơ bản
app.get("/api/health", (req, res) => {
  res.json({
    status: "OK",
    message: "AI Copywriter API is running!",
    timestamp: new Date().toISOString(),
  });
});

// Gán tuyến đường Auth vào đường dẫn /api/v1/auth
app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/content", contentRoutes);

// 5. Khởi động Server
app.listen(PORT, () => {
  console.log(`✅ Server đang chạy trên cổng ${PORT}`);
  console.log(`🔗 MongoDB đã sẵn sàng.`);
  console.log(`🔑 Auth API: http://localhost:${PORT}/api/v1/auth`);
});
