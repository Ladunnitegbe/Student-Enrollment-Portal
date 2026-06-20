import { NavLink } from "react-router-dom";

const Navbar = ({ studentCount, averageScore }) => {
  const navClass = ({ isActive }) =>
    isActive ? "nav-link nav-link--active" : "nav-link";

  return (
    <header className="navbar">
      <div className="navbar-inner">
        <div className="navbar-brand">
          <div className="header-logo">
            <span className="logo-mark">KC</span>
            <span className="logo-version">6.0</span>
          </div>
          <div className="navbar-title-group">
            <span className="navbar-title">KodeCamp 6.0</span>
            <span className="navbar-meta">
              {`${studentCount} Students · Avg: ${averageScore.toFixed(1)}%`}
            </span>
          </div>
        </div>

        <nav className="navbar-nav">
          <NavLink to="/" end className={navClass}>
            Home
          </NavLink>
          <NavLink to="/enroll" className={navClass}>
            Enroll
          </NavLink>
        </nav>
      </div>
    </header>
  );
};

export default Navbar;
