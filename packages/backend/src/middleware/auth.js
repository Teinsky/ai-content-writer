import jwt from "jsonwebtoken";
import User from "../models/User.js";

export const protect = async (req, res, next) => {
  let token;

  // 1. Kiểm tra Header có dạng "Bearer <token>" không
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    try {
      // Lấy token ra khỏi chuỗi
      token = req.headers.authorization.split(" ")[1];

      // 2. Giải mã token
      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      // 3. Tìm user trong DB và gán vào req.user (bỏ qua password)
      req.user = await User.findById(decoded.id).select("-password");

      next(); // Cho phép đi tiếp
    } catch (error) {
      console.error(error);
      res
        .status(401)
        .json({
          success: false,
          message: "Token không hợp lệ, vui lòng đăng nhập lại.",
        });
    }
  }

  if (!token) {
    res
      .status(401)
      .json({
        success: false,
        message: "Không tìm thấy token, vui lòng đăng nhập.",
      });
  }
};
