const MESSAGES = {
  loading: {
    icon: "⏳",
    text: "Loading student roster...",
    className: "status-loading",
  },
  error: {
    icon: "⚠️",
    text: "Failed to fetch roster. Showing seed data only.",
    className: "status-error",
  },
};

const StatusMessage = ({ type }) => {
  const { icon, text, className } = MESSAGES[type] ?? MESSAGES.error;

  return (
    <div className={`status-message ${className}`}>
      <span className="status-icon">{icon}</span>
      <span>{text}</span>
    </div>
  );
};

export default StatusMessage;
