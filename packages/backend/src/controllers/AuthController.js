import User from "../models/User.js";
import bcrypt from "bcryptjs";

// Hàm hỗ trợ: Gửi Token và Thông tin User
const sendTokenResponse = (user, statusCode, res) => {
  const token = user.getSignedJwtToken();
  const options = {
    expires: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000), // 30 ngày
    httpOnly: true,
  };

  if (process.env.NODE_ENV === "production") {
    options.secure = true;
  }

  res
    .status(statusCode)
    .cookie("token", token, options)
    .json({
      success: true,
      token: token,
      data: {
        id: user._id,
        username: user.username,
        email: user.email,
        subscription: user.subscription,
        usage: user.usage,
        createdAt: user.createdAt,
      },
    });
};

// @desc    Đăng ký người dùng mới
// @route   POST /api/v1/auth/register
export const register = async (req, res) => {
  try {
    const { username, email, password } = req.body;

    // 1. Kiểm tra email đã tồn tại chưa
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({
        success: false,
        message: "Email này đã được sử dụng.",
      });
    }

    // 2. Tạo User mới (Mật khẩu tự động mã hóa nhờ User.js)
    const user = await User.create({
      username,
      email,
      password,
    });

    // 3. Trả về Token và thông tin người dùng
    sendTokenResponse(user, 201, res);
  } catch (error) {
    console.error(error);
    if (error.code === 11000) {
      return res
        .status(400)
        .json({ success: false, message: "Tên người dùng đã tồn tại." });
    }
    res.status(500).json({
      success: false,
      message: "Lỗi server trong quá trình đăng ký.",
      error: error.message,
    });
  }
};

// @desc    Đăng nhập người dùng
// @route   POST /api/v1/auth/login
export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: "Vui lòng cung cấp email và mật khẩu.",
      });
    }

    // Tìm người dùng và chọn cả trường 'password' (select: false trong model)
    const user = await User.findOne({ email }).select("+password");

    if (!user) {
      return res
        .status(401)
        .json({ success: false, message: "Thông tin đăng nhập không hợp lệ." });
    }

    // So sánh mật khẩu
    const isMatch = await user.matchPassword(password);

    if (!isMatch) {
      return res
        .status(401)
        .json({ success: false, message: "Thông tin đăng nhập không hợp lệ." });
    }

    sendTokenResponse(user, 200, res);
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({
        success: false,
        message: "Lỗi server trong quá trình đăng nhập.",
      });
  }
};
