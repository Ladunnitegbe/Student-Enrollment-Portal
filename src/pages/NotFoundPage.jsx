import { Link } from "react-router-dom";

const NotFoundPage = () => {
  return (
    <div className="not-found-page">
      <p className="not-found-code">404</p>
      <h1 className="not-found-title">Page Not Found</h1>
      <p className="not-found-sub">
        The page you're looking for doesn't exist or was moved.
      </p>
      <Link to="/" className="btn btn-home">
        ← Back to Home
      </Link>
    </div>
  );
};

export default NotFoundPage;
