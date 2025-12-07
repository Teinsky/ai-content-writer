import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

// Định nghĩa Schema (Cấu trúc) cho người dùng
const UserSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: [true, "Vui lòng thêm tên người dùng"],
      unique: true,
      trim: true,
    },
    email: {
      type: String,
      required: [true, "Vui lòng thêm email"],
      unique: true,
      lowercase: true,
      trim: true,
      match: [
        /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
        "Vui lòng cung cấp địa chỉ email hợp lệ",
      ],
    },
    password: {
      type: String,
      required: [true, "Vui lòng thêm mật khẩu"],
      minlength: [6, "Mật khẩu phải dài ít nhất 6 ký tự"],
      select: false, // Rất quan trọng: Không trả về mật khẩu khi truy vấn
    },
    subscription: {
      type: String,
      enum: ["Free", "Basic", "Premium"],
      default: "Free",
    },
    usage: {
      monthlyLimit: { type: Number, default: 100000 }, // Giới hạn ký tự/tháng
      usedCount: { type: Number, default: 0 },
      lastReset: { type: Date, default: Date.now }, // Ngày reset giới hạn
    },
  },
  {
    timestamps: true,
  }
);

// --- Middleware Pre-save: Mã hóa mật khẩu trước khi lưu ---
UserSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    next();
  }
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

// --- Phương thức: Tạo JWT Token (cho đăng nhập) ---
UserSchema.methods.getSignedJwtToken = function () {
  return jwt.sign({ id: this._id }, process.env.JWT_SECRET, {
    expiresIn: "30d", // Token hết hạn sau 30 ngày
  });
};

// --- Phương thức: So sánh mật khẩu ---
UserSchema.methods.matchPassword = async function (enteredPassword) {
  // So sánh mật khẩu đã nhập với mật khẩu được mã hóa trong DB
  return await bcrypt.compare(enteredPassword, this.password);
};

const User = mongoose.model("User", UserSchema);

export default User;
