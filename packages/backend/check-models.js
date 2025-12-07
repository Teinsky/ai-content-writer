const API_KEY = "AIzaSyA2HD7HG5WaC3L-Jr5I_fyZ6MiL-AV74lM";

async function checkModels() {
  console.log("--- ĐANG KIỂM TRA DANH SÁCH MODEL ---");
  console.log(`Key đang dùng: ${API_KEY.substring(0, 10)}...`);

  const url = `https://generativelanguage.googleapis.com/v1beta/models?key=${API_KEY}`;

  try {
    const response = await fetch(url);
    const data = await response.json();

    if (data.error) {
      console.error("\n❌ LỖI TỪ GOOGLE:", data.error.message);
      console.log(">>> NGUYÊN NHÂN: API Key không hợp lệ hoặc chưa kích hoạt.");
    } else {
      console.log(
        "\n✅ KẾT NỐI THÀNH CÔNG! Dưới đây là các model bạn được dùng:"
      );
      console.log("------------------------------------------------");

      const chatModels = data.models.filter(
        (m) =>
          m.supportedGenerationMethods &&
          m.supportedGenerationMethods.includes("generateContent")
      );

      if (chatModels.length === 0) {
        console.log(
          "⚠️ Không tìm thấy model nào hỗ trợ chat (generateContent)."
        );
      } else {
        chatModels.forEach((m) => {
          // Lấy tên ngắn gọn (ví dụ: gemini-pro) từ chuỗi dài (models/gemini-pro)
          const shortName = m.name.replace("models/", "");
          console.log(`- ${shortName}`);
        });
      }
      console.log("------------------------------------------------");
      console.log(
        ">>> HÃY COPY MỘT CÁI TÊN Ở TRÊN VÀ DÁN VÀO FILE CONTROLLER."
      );
    }
  } catch (error) {
    console.error("\n❌ LỖI KẾT NỐI MẠNG:", error.message);
  }
}

checkModels();
