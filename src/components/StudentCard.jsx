import { Link } from "react-router-dom";
import Badge from "./Badge";
import StatBar from "./StatBar";
import styles from "../styles/StudentCard.module.css";

const borderClassForGrade = (grade) => {
  if (grade === "A" || grade === "B") return styles.borderGreen;
  if (grade === "C") return styles.borderYellow;
  return styles.borderRed;
};

const StudentCard = ({
  student: { id, firstName, lastName, track, email, score, isActive, avatar, grade },
}) => {
  return (
    <div
      className={`${styles.card} ${borderClassForGrade(grade)} ${
        !isActive ? styles.cardInactive : ""
      }`}
    >
      <img src={avatar} alt={`${firstName} ${lastName}`} className={styles.avatar} />

      <div className={styles.body}>
        <h2 className={styles.name}>
          <Link to={`/students/${id}`} className={styles.nameLink}>
            {firstName} {lastName}
          </Link>
        </h2>

        <p className={styles.meta}>
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

        <Link to={`/students/${id}`} className={styles.viewButton}>
          View Profile →
        </Link>
      </div>
    </div>
  );
};

export default StudentCard;
