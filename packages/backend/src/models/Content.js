import mongoose from "mongoose";

const ContentSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User", // Liên kết với bảng User
      required: true,
    },
    title: {
      type: String,
      required: true,
      trim: true,
      maxlength: 100,
    },
    prompt: {
      type: String,
      required: true,
    },
    generatedText: {
      type: String,
      required: true,
    },
    style: {
      type: String,
      default: "Standard",
    },
    tokenCount: {
      type: Number,
      default: 0,
    },
  },
  {
    timestamps: true, // Tự động tạo createdAt, updatedAt
  }
);

const Content = mongoose.model("Content", ContentSchema);

export default Content;
