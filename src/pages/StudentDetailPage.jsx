import "./StudentDetailPage.css";
import { useParams, useNavigate, Link } from "react-router-dom";
import Badge from "../components/Badge";
import StatBar from "../components/StatBar";
import { useStudents } from "../context/StudentContext";
import { getGrade } from "../utils/constants";

const StudentDetailPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { students, dispatch } = useStudents();

  const student = students.find((s) => s.id === id);

  if (!student) {
    return (
      <div className="detail-page">
        <div className="not-found-inline">
          <h1 className="detail-name">Student Not Found</h1>
          <p style={{ color: "var(--color-text-muted)", margin: "0.75rem 0 1.25rem" }}>
            No student with ID <code>{id}</code> exists in the roster.
          </p>
          <Link to="/" className="back-link">
            ← Back to Roster
          </Link>
        </div>
      </div>
    );
  }

  const { firstName, lastName, track, email, score, isActive, avatar } = student;
  const grade = getGrade(score);

  const handleRemove = () => {
    dispatch({ type: "REMOVE_STUDENT", payload: id });
    navigate("/");
  };

  return (
    <div className="detail-page">
      <Link to="/" className="back-link">
        ← Back to Roster
      </Link>

      <div className="detail-card">
        <div className="detail-avatar-col">
          <img src={avatar} alt={`${firstName} ${lastName}`} className="detail-avatar" />
          <div className="badge-group detail-badges">
            <Badge label={track} type="track" />
            <Badge
              label={isActive ? "Active" : "Inactive"}
              type={isActive ? "status-active" : "status-inactive"}
            />
            <Badge label={`Grade: ${grade}`} type="grade" />
          </div>
        </div>

        <div className="detail-info-col">
          <h1 className="detail-name">
            {firstName} {lastName}
          </h1>

          <table className="detail-table">
            <tbody>
              <tr>
                <th>Track</th>
                <td>{track}</td>
              </tr>
              <tr>
                <th>Email</th>
                <td>{email ?? "—"}</td>
              </tr>
              <tr>
                <th>Score</th>
                <td>{score}%</td>
              </tr>
              <tr>
                <th>Grade</th>
                <td>{grade}</td>
              </tr>
              <tr>
                <th>Status</th>
                <td>{isActive ? "Active" : "Inactive"}</td>
              </tr>
            </tbody>
          </table>

          <div className="detail-stat">
            <StatBar score={score} label="Performance" />
          </div>

          <button type="button" className="detail-remove-btn" onClick={handleRemove}>
            Remove Student
          </button>
        </div>
      </div>
    </div>
  );
};

export default StudentDetailPage;
