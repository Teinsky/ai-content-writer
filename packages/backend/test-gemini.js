import dotenv from "dotenv";
import { GoogleGenerativeAI } from "@google/generative-ai";

dotenv.config();

const runTest = async () => {
  console.log("--- ĐANG KIỂM TRA GEMINI 1.5 FLASH ---");
  const key = process.env.GEMINI_API_KEY;

  if (!key) {
    console.error("LỖI: Không tìm thấy GEMINI_API_KEY trong file .env");
    return;
  }

  try {
    const genAI = new GoogleGenerativeAI(key);

    // SỬ DỤNG MODEL MỚI NHẤT: gemini-1.5-flash
    console.log("Đang kết nối tới model 'gemini-1.5-flash'...");
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

    console.log("Đang gửi câu hỏi thử: 'Xin chào'...");
    const result = await model.generateContent("Xin chào, bạn là ai?");
    const response = await result.response;
    const text = response.text();

    console.log("\n✅ THÀNH CÔNG RỰC RỠ! Gemini đã trả lời:");
    console.log("------------------------------------------------");
    console.log(text);
    console.log("------------------------------------------------");
  } catch (error) {
    console.error("\n❌ VẪN LỖI. Chi tiết:");
    console.error(error.message);
  }
};

runTest();
