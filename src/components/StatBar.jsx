const StatBar = ({ score, label = "Score" }) => {
  const barColor =
    score >= 80 ? "#4ade80" : score >= 60 ? "#fb923c" : "#f87171";

  return (
    <div className="stat-wrapper">
      <p className="stat-label">
        {label}: <strong>{score}%</strong>
      </p>
      <div className="stat-bar">
        <div
          className="stat-fill"
          style={{
            width: `${score}%`,
            backgroundColor: barColor,
          }}
        />
      </div>
    </div>
  );
};

export default StatBar;
