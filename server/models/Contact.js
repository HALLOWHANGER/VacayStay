import mongoose from "mongoose";

const replySchema = new mongoose.Schema(
  {
    message: { type: String, required: true },
    sentAt: { type: Date, default: Date.now },
  },
  { _id: false }
);

const contactSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true },
    message: { type: String, required: true },

    replies: [replySchema],
    replied: { type: Boolean, default: false },
  },
  { timestamps: true }
);

export default mongoose.model("Contact", contactSchema);
