import Badge from "./Badge";
import StatBar from "./StatBar";

const StudentCard = ({
  student: { firstName, lastName, track, email, score, isActive, avatar, grade },
}) => {
  return (
    <div className={`student-card ${!isActive ? "inactive" : ""}`}>
      <img src={avatar} alt={`${firstName} ${lastName}`} className="avatar" />

      <div className="card-body">
        <h2 className="student-name">
          {firstName} {lastName}
        </h2>

        <p className="student-meta">
          {track} {email && `· ${email}`}
        </p>

        <div className="badge-group">
          <Badge label={track} type="track" />
          <Badge label={isActive ? "Active" : "Inactive"} type={isActive ? "status-active" : "status-inactive"} />
          <Badge label={`Grade: ${grade}`} type="grade" />
        </div>

        <StatBar score={score} />
      </div>
    </div>
  );
};

export default StudentCard;
