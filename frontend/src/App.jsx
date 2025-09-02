import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import UploadPage from "./pages/UploadPage";
import StudentsPage from "./pages/StudentsPage";

export default function App() {
  return (
    <Router>
      <div className="container">
        <nav className="navbar">
          <h2>Student Grade System</h2>
          <ul>
            <li><Link to="/upload">Upload & History</Link></li>
            <li><Link to="/students">Students</Link></li>
          </ul>
        </nav>
        <Routes>
          <Route path="/" element={<UploadPage />} />
          <Route path="/upload" element={<UploadPage />} />
          <Route path="/students" element={<StudentsPage />} />
        </Routes>
      </div>
    </Router>
  );
}
