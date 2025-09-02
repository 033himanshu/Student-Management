import mongoose from "mongoose";

const uploadSchema = new mongoose.Schema({
  filename: String,
  filetype: { type: String, enum: ["xlsx", "csv"] },
  records_added: Number,
  uploaded_at: { type: Date, default: Date.now }
});

export default mongoose.model("Upload", uploadSchema);
