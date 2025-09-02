import { useEffect, useState } from "react";
import axios from "axios";
import StudentRow from '../components/StudentRow.jsx';
const API = import.meta.env.VITE_API_BASE || "http://localhost:8080";

export default function StudentsPage() {
  const [students, setStudents] = useState([]);
  const [page, setPage] = useState(1);
  const [limit] = useState(10); // rows per page
  const [total, setTotal] = useState(0);
  const totalPages = Math.ceil(total / limit);

  async function fetchStudents() {
    const { data } = await axios.get(`${API}/api/students?page=${page}&limit=${limit}`);
    setStudents(data.students);
    setTotal(data.total);
  }

  useEffect(() => { fetchStudents(); }, [page]);

  async function deleteStudent(id) {
    await axios.delete(`${API}/api/students/?id=${id}`);
    fetchStudents(); // delete is rare, full refresh okay
  }

  return (
    <div className="page">
      <h3>Students</h3>

      <table>
        <thead>
          <tr>
            <th>Student_ID</th>
            <th>Name</th>
            <th>Total Marks</th>
            <th>Marks Obtained</th>
            <th>Percentage</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {students.map((s) => (
            <StudentRow key={s._id} student={s} onUpdated={(newRow) => {
              setStudents(prev => prev.map(st => st._id === s._id ? newRow : st));
            }} onDelete={() => deleteStudent(s._id)} />
          ))}
          {students.length === 0 && (
            <tr><td colSpan="6">No student data</td></tr>
          )}
        </tbody>
      </table>

      <div style={{ marginTop: "1rem" }}>
        <button disabled={page === 1} onClick={() => setPage(p => p - 1)}>Prev</button>
        <span style={{ margin: "0 1rem" }}>Page {page} of {totalPages}</span>
        <button disabled={page === totalPages} onClick={() => setPage(p => p + 1)}>Next</button>
      </div>
    </div>
  );
}
