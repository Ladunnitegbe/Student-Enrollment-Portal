const Header = ({ title, studentCount, averageScore }) => {
  return (
    <header className="header">
      <div className="header-inner">
        <div className="header-logo">
          <span className="logo-mark">KC</span>
          <span className="logo-version">6.0</span>
        </div>
        <div className="header-text">
          <h1>{title}</h1>
          <p className="header-meta">
            {`${studentCount} Students Enrolled · Class Average: ${averageScore.toFixed(1)}%`}
          </p>
        </div>
      </div>
    </header>
  );
};

export default Header;
