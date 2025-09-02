import Upload from "../models/uploads.model.js"

export async function listUploads(req, res) {
  const uploads = await Upload.find().sort({ uploaded_at: -1 });
  res.status(200).json(uploads);
}
