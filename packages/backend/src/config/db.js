import mongoose from "mongoose";

// Hàm kết nối Database
const connectDB = async () => {
  try {
    // Lấy chuỗi kết nối từ biến môi trường (File .env)
    const conn = await mongoose.connect(process.env.MONGODB_URI);

    console.log(
      `[DB] MongoDB đã kết nối thành công tại Host: ${conn.connection.host}`
    );
  } catch (error) {
    console.error(`[DB] Lỗi kết nối MongoDB: ${error.message}`);
    // Thoát ứng dụng nếu kết nối thất bại
    process.exit(1);
  }
};

export default connectDB;
