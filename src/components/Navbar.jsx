import { useState } from "react";
import { NavLink } from "react-router-dom";

const linkBase =
  "px-4 py-2 rounded-lg text-sm font-medium transition-colors duration-150";
const linkInactive =
  "text-slate-400 hover:text-slate-100 hover:bg-white/5";
const linkActive = "text-[var(--color-primary-light)] bg-[var(--color-primary-dim)]";

const navClass = ({ isActive }) =>
  `${linkBase} ${isActive ? linkActive : linkInactive}`;

const Navbar = () => {
  const [open, setOpen] = useState(false);

  return (
    <nav className="w-full border-b border-white/10 bg-[#0f1117]/85 backdrop-blur-md">
      <div className="max-w-[1200px] mx-auto px-6 flex items-center justify-between h-14">
        <div className="hidden md:flex items-center gap-1">
          <NavLink to="/" end className={navClass}>
            Home
          </NavLink>
          <NavLink to="/enroll" className={navClass}>
            Enroll
          </NavLink>
        </div>

        <button
          type="button"
          onClick={() => setOpen((prev) => !prev)}
          className="md:hidden inline-flex items-center justify-center w-9 h-9 rounded-lg text-slate-300 hover:bg-white/10 transition-colors ml-auto"
          aria-label="Toggle navigation menu"
          aria-expanded={open}
        >
          <span className="text-xl leading-none">{open ? "✕" : "☰"}</span>
        </button>
      </div>

     
      {open && (
        <div className="md:hidden flex flex-col gap-1 px-4 pb-4">
          <NavLink to="/" end className={navClass} onClick={() => setOpen(false)}>
            Home
          </NavLink>
          <NavLink to="/enroll" className={navClass} onClick={() => setOpen(false)}>
            Enroll
          </NavLink>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
