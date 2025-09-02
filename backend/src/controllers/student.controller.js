import Student from "../models/student.model.js"
import Upload from "../models/uploads.model.js"

import { parseBufferToRows } from "../utils/parseFile.js";


export async function uploadStudents(req, res) {
  try {
    if (!req.file) return res.status(400).json({ error: "No file provided" });

    const ext = (req.file.originalname.split(".").pop() || "").toLowerCase();
    const rows = parseBufferToRows(req.file.buffer, ext);

    // Required headers exactly as spec:
    // Student_ID, Student_Name, Total_Marks, Marks_Obtained
    const mapped = rows.map(r => {
      const total = Number(r.Total_Marks);
      const obtained = Number(r.Marks_Obtained);
      const pct = total ? (obtained / total) * 100 : 0;
      return {
        student_id: String(r.Student_ID).trim(),
        student_name: String(r.Student_Name).trim(),
        total_marks: total,
        marks_obtained: obtained,
        percentage: Number(pct.toFixed(2))
      };
    }).filter(s => s.student_id && s.student_name);

    if (!mapped.length) return res.status(400).json({ error: "No valid rows" });

    const inserted = await Student.insertMany(mapped);
    await Upload.create({
      filename: req.file.originalname,
      filetype: ext === "xlsx" ? "xlsx" : "csv",
      records_added: inserted.length
    });

    res.status(201).json({ ok: true, inserted: inserted.length });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Upload failed" });
  }
}

export async function listStudents(req, res) {
  const students = await Student.find().sort({ created_at: -1 });
  res.status(200).json({ total: students.length, students });
}

export async function updateStudent(req, res) {
  const id  = req.query.id
  const { marks_obtained, total_marks, student_name } = req.body;
  if (!id) return res.status(400).json({ error: "No ID provided" });
  const student = await Student.findById(id);
  if(!student) return res.status(404).json({ error: "Student not found" });
  const update = {};
  if (student_name !== undefined) update.student_name = student_name;
  if (total_marks !== undefined) update.total_marks = total_marks;
  if (marks_obtained !== undefined) update.marks_obtained = marks_obtained;

  if (update.total_marks !== undefined || update.marks_obtained !== undefined) {
    const total = update.total_marks ?? student.total_marks;
    const obtained = update.marks_obtained ?? student.marks_obtained;
    update.percentage = Number(((obtained / total) * 100).toFixed(2));
  }
  const doc = await Student.findByIdAndUpdate(id, update, { new: true });
  res.status(202).json(doc);
}

export async function deleteStudent(req, res) {
  const id  = req.query.id;
  await Student.findByIdAndDelete(id);
  res.status(200).json({ ok: true });
}

