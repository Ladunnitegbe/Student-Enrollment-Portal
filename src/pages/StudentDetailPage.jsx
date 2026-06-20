import { useParams, Link } from "react-router-dom";
import Badge from "../components/Badge";
import StatBar from "../components/StatBar";

const StudentDetailPage = ({ students }) => {
  const { id } = useParams();
  const student = students.find((s) => s.id === id);

  if (!student) {
    return (
      <div className="not-found-page">
        <p className="not-found-code">404</p>
        <h1 className="not-found-title">Student Not Found</h1>
        <p className="not-found-sub">
          No student with ID <code>{id}</code> exists in the roster.
        </p>
        <Link to="/" className="btn btn-home">
          ← Back to Roster
        </Link>
      </div>
    );
  }

  const {
    firstName,
    lastName,
    track,
    email,
    score,
    isActive,
    avatar,
    grade,
  } = student;

  return (
    <div className="detail-page">
      <Link to="/" className="back-link">
        ← Back to Roster
      </Link>

      <div className="detail-card">
        <div className="detail-avatar-col">
          <img
            src={avatar}
            alt={`${firstName} ${lastName}`}
            className="detail-avatar"
          />
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
        </div>
      </div>
    </div>
  );
};

export default StudentDetailPage;
