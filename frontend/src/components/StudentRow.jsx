import { useState } from "react";
import axios from "axios";
const API = import.meta.env.VITE_API_BASE || "http://localhost:8080";

function StudentRow({ student, onUpdated, onDelete }) {
  const [form, setForm] = useState({
    student_name: student.student_name,
    total_marks: student.total_marks,
    marks_obtained: student.marks_obtained
  });
  const [saving, setSaving] = useState(false);

  // detect if something changed
  const changed = (
    form.student_name !== student.student_name ||
    form.total_marks !== student.total_marks ||
    form.marks_obtained !== student.marks_obtained
  );

  async function handleUpdate() {
    try {
      setSaving(true);
      const { data } = await axios.patch(`${API}/api/students/?id=${student._id}`, form);
    
      onUpdated(data); // update only this row
    } catch (err) {
        console.error(err);
      alert("Update failed, restoring previous values");
      setForm({
        student_name: student.student_name,
        total_marks: student.total_marks,
        marks_obtained: student.marks_obtained
      });
    } finally {
      setSaving(false);
    }
  }

  return (
    <tr>
      <td>{student.student_id}</td>
      <td>
        <input
        style={{ width: "90%" }}
          value={form.student_name}
          onChange={(e) => setForm({ ...form, student_name: e.target.value })}
        />
      </td>
      <td>
        <input
            style={{ width: "90%" }}
          type="number"
          value={form.total_marks}
          onChange={(e) => setForm({ ...form, total_marks: Number(e.target.value) })}
        />
      </td>
      <td>
        <input
          type="number"
          style={{ width: "90%" }}
          value={form.marks_obtained}
          onChange={(e) => setForm({ ...form, marks_obtained: Number(e.target.value) })}
        />
      </td>
      <td>{student.percentage}%</td>
      <td style={{ display: "flex", justifyContent: "space-between" }}>
        <button onClick={handleUpdate} disabled={!changed || saving}>
          {saving ? "Saving..." : "Update"}
        </button>
        <button onClick={onDelete} style={{ marginLeft: "0.5rem", backgroundColor: "red" }}>Delete</button>
      </td>
    </tr>
  );
}

export default StudentRow;