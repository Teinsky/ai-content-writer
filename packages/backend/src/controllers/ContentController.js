import Content from "../models/Content.js";
import { GoogleGenerativeAI } from "@google/generative-ai";

// 1. TẠO BÀI VIẾT MỚI
// @route POST /api/v1/content/generate
export const generateContent = async (req, res) => {
  try {
    const { prompt, style, language } = req.body;
    const user = req.user;

    // Validation
    if (!prompt) {
      return res
        .status(400)
        .json({
          success: false,
          message: "Vui lòng nhập nội dung yêu cầu (prompt).",
        });
    }

    // Kiểm tra giới hạn sử dụng
    if (user.usage.usedCount >= user.usage.monthlyLimit) {
      return res
        .status(403)
        .json({ success: false, message: "Bạn đã hết lượt sử dụng miễn phí." });
    }

    // --- GỌI GEMINI API ---
    try {
      // Khởi tạo Gemini với Key từ biến môi trường
      const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

      // SỬ DỤNG MODEL "gemini-flash-latest"
      // Đây là tên đại diện có trong danh sách của bạn, nó sẽ tự chọn bản Flash ổn định nhất
      const model = genAI.getGenerativeModel({ model: "gemini-flash-latest" });

      // Tạo câu lệnh (prompt) chi tiết hơn
      const finalPrompt = `Bạn là một trợ lý viết nội dung AI chuyên nghiệp.
            Hãy viết bài dựa trên yêu cầu sau: "${prompt}"
            Phong cách: ${style || "Tự nhiên"}
            Ngôn ngữ: ${language || "Tiếng Việt"}
            Chỉ trả về nội dung bài viết, không cần lời chào hỏi.`;

      // Gửi yêu cầu
      const result = await model.generateContent(finalPrompt);
      const response = await result.response;
      const aiResponseText = response.text();

      // Tính toán số token (ước lượng: 1 từ ~ 1.5 token)
      const tokensUsed = Math.ceil(aiResponseText.length / 3);

      // --- LƯU VÀO DATABASE ---
      const newContent = await Content.create({
        user: user._id,
        title: prompt.substring(0, 50) + "...",
        prompt,
        generatedText: aiResponseText,
        style,
        tokenCount: tokensUsed,
      });

      // --- CẬP NHẬT USER USAGE ---
      user.usage.usedCount += tokensUsed;
      await user.save();

      // Trả về kết quả
      res.status(200).json({
        success: true,
        data: newContent,
        usage: user.usage,
      });
    } catch (aiError) {
      console.error("Gemini Error:", aiError);

      // Xử lý riêng cho lỗi 429 (Quá tải / Hết hạn mức)
      if (aiError.message.includes("429")) {
        return res.status(429).json({
          success: false,
          message:
            "Hệ thống AI đang quá tải hoặc bạn đã dùng hết hạn mức miễn phí trong phút này. Vui lòng chờ 1 phút rồi thử lại.",
          error: aiError.message,
        });
      }

      // Xử lý lỗi 404 (Sai tên model) hoặc lỗi khác
      return res.status(500).json({
        success: false,
        message:
          "Lỗi khi gọi Gemini API. Model không khả dụng hoặc Key bị lỗi.",
        error: aiError.message,
      });
    }
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ success: false, message: "Lỗi server khi tạo nội dung." });
  }
};

// 2. LẤY LỊCH SỬ BÀI VIẾT
export const getHistory = async (req, res) => {
  try {
    const history = await Content.find({ user: req.user._id }).sort({
      createdAt: -1,
    });
    res
      .status(200)
      .json({ success: true, count: history.length, data: history });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Lỗi lấy lịch sử." });
  }
};

// 3. XEM CHI TIẾT
export const getContentById = async (req, res) => {
  try {
    const content = await Content.findById(req.params.id);
    if (!content)
      return res
        .status(404)
        .json({ success: false, message: "Không tìm thấy." });
    if (content.user.toString() !== req.user.id)
      return res
        .status(401)
        .json({ success: false, message: "Không có quyền." });
    res.status(200).json({ success: true, data: content });
  } catch (error) {
    res.status(500).json({ success: false, message: "Lỗi server." });
  }
};

// 4. XÓA BÀI VIẾT
export const deleteContent = async (req, res) => {
  try {
    const content = await Content.findById(req.params.id);
    if (!content)
      return res
        .status(404)
        .json({ success: false, message: "Không tìm thấy." });
    if (content.user.toString() !== req.user.id)
      return res
        .status(401)
        .json({ success: false, message: "Không có quyền." });
    await content.deleteOne();
    res.status(200).json({ success: true, message: "Đã xóa." });
  } catch (error) {
    res.status(500).json({ success: false, message: "Lỗi server." });
  }
};
