import { Link } from "react-router-dom";

const styles = {
  wrapper: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    minHeight: "60vh",
    textAlign: "center",
    gap: "0.75rem",
  },
  code: {
    fontSize: "6rem",
    fontWeight: 700,
    lineHeight: 1,
    color: "var(--color-primary-light)",
    fontFamily: '"JetBrains Mono", monospace',
  },
  title: {
    fontSize: "1.5rem",
    fontWeight: 700,
    color: "var(--color-text)",
  },
  subtitle: {
    color: "var(--color-text-muted)",
    fontSize: "0.95rem",
    maxWidth: "360px",
  },
  homeLink: {
    display: "inline-flex",
    alignItems: "center",
    gap: "0.4rem",
    marginTop: "1.5rem",
    background: "var(--color-primary)",
    color: "#fff",
    padding: "0.6rem 1.25rem",
    borderRadius: "8px",
    fontSize: "0.88rem",
    fontWeight: 600,
    textDecoration: "none",
  },
};

const NotFoundPage = () => {
  return (
    <div style={styles.wrapper}>
      <p style={styles.code}>404</p>
      <h1 style={styles.title}>Page Not Found</h1>
      <p style={styles.subtitle}>
        The page you're looking for doesn't exist or was moved.
      </p>
      <Link to="/" style={styles.homeLink}>
        ← Back to Home
      </Link>
    </div>
  );
};

export default NotFoundPage;
