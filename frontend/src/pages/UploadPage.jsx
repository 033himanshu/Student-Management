import { useEffect, useState } from "react";
import axios from "axios";

const API = import.meta.env.VITE_API_BASE || "http://localhost:8080";

export default function UploadPage() {
  const [file, setFile] = useState(null);
  const [history, setHistory] = useState([]);

  async function handleUpload(e) {
    e.preventDefault();
    if (!file) return alert("Please select a file");
    const fd = new FormData();
    fd.append("file", file);
    try {
      await axios.post(`${API}/api/students/upload`, fd, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      alert("Upload success!");
      fetchHistory();
    } catch {
      alert("Upload failed");
    }
  }

  async function fetchHistory() {
    const { data } = await axios.get(`${API}/api/uploads`);
    setHistory(data);
  }

  useEffect(() => { fetchHistory(); }, []);

  return (
    <div className="page">
      <h3>Upload Student Grades</h3>
      <form onSubmit={handleUpload}>
        <input
          type="file"
          accept=".xlsx,.csv"
          onChange={(e) => setFile(e.target.files?.[0])}
        />
        <button type="submit">Upload</button>
      </form>

      <h3>Upload History</h3>
      <table>
        <thead>
          <tr>
            <th>File</th>
            <th>Type</th>
            <th>Records</th>
            <th>Uploaded At</th>
          </tr>
        </thead>
        <tbody>
          {history.map((h) => (
            <tr key={h._id}>
              <td>{h.filename}</td>
              <td>{h.filetype}</td>
              <td>{h.records_added}</td>
              <td>{new Date(h.uploaded_at).toLocaleString()}</td>
            </tr>
          ))}
          {history.length === 0 && (
            <tr><td colSpan="4">No uploads yet</td></tr>
          )}
        </tbody>
      </table>
    </div>
  );
}
