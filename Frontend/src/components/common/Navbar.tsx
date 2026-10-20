import { NavLink } from 'react-router-dom';
import { useState } from 'react';
import { APP_NAME } from '../../utils/constants';
import { useAuth } from '../../context/AuthContext';

export function Navbar() {
  const { user } = useAuth();
  const [open, setOpen] = useState(false);
  const home = user?.role === 'admin' ? '/admin' : user?.role === 'lawyer' ? '/lawyer' : user ? '/app' : '/';

  return (
    <header className="public-header">
      <div className="container inner">
        <NavLink to={home} className="brand">
          <span className="brand-mark">LC</span>
          {APP_NAME}
        </NavLink>
        <button className="menu-toggle" type="button" onClick={() => setOpen((v) => !v)} aria-label="Toggle menu">
          Menu
        </button>
        <nav className={`nav-links ${open ? 'open' : ''}`} onClick={() => setOpen(false)}>
          <NavLink to="/" end>Home</NavLink>
          <NavLink to="/about">How It Works</NavLink>
          {user ? (
            <NavLink to={home}>Dashboard</NavLink>
          ) : (
            <>
              <NavLink to="/login">Login</NavLink>
              <NavLink to="/register" className="btn btn-gold btn-sm">Register</NavLink>
            </>
          )}
        </nav>
      </div>
    </header>
  );
}
