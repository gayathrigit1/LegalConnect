import { NavLink } from 'react-router-dom';
import { APP_NAME, NAV } from '../../utils/constants';
import { useAuth } from '../../context/AuthContext';
import type { UserRole } from '../../types';

interface SidebarProps {
  role: UserRole;
  open: boolean;
  onClose: () => void;
}

export function Sidebar({ role, open, onClose }: SidebarProps) {
  const { logout, user } = useAuth();
  const items = role === 'admin' ? NAV.admin : role === 'lawyer' ? NAV.lawyer : NAV.user;

  return (
    <aside className={`sidebar ${open ? 'open' : ''}`}>
      <NavLink to={items[0].to} className="brand" onClick={onClose}>
        <span className="brand-mark">LC</span>
        {APP_NAME}
      </NavLink>
      <p className="muted">{user?.fullName}<br />{role} dashboard</p>
      <nav>
        {items.map((item) => (
          <NavLink key={item.to} to={item.to} end={item.to.split('/').length <= 2} onClick={onClose}>
            {item.label}
          </NavLink>
        ))}
      </nav>
      <div className="grow" />
      <button className="linkish" type="button" onClick={() => { logout(); onClose(); }}>
        Logout
      </button>
    </aside>
  );
}
