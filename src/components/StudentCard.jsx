import { Link } from "react-router-dom";
import Badge from "./Badge";
import StatBar from "./StatBar";

const StudentCard = ({
  student: { id, firstName, lastName, track, email, score, isActive, avatar, grade },
}) => {
  return (
    <div className={`student-card ${!isActive ? "inactive" : ""}`}>
      <img src={avatar} alt={`${firstName} ${lastName}`} className="avatar" />

      <div className="card-body">
        <h2 className="student-name">
          <Link to={`/students/${id}`} className="name-link">
            {firstName} {lastName}
          </Link>
        </h2>

        <p className="student-meta">
          {track} {email && `· ${email}`}
        </p>

        <div className="badge-group">
          <Badge label={track} type="track" />
          <Badge
            label={isActive ? "Active" : "Inactive"}
            type={isActive ? "status-active" : "status-inactive"}
          />
          <Badge label={`Grade: ${grade}`} type="grade" />
        </div>

        <StatBar score={score} />

        <Link to={`/students/${id}`} className="btn btn-view">
          View Profile →
        </Link>
      </div>
    </div>
  );
};

export default StudentCard;
