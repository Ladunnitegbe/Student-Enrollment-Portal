const Badge = ({ label, type = "track" }) => {
  return <span className={`badge badge-${type}`}>{label}</span>;
};

export default Badge;
