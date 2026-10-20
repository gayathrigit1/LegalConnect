import { useState } from 'react';
import { Outlet } from 'react-router-dom';
import { Sidebar } from '../components/common/Sidebar';
import { useAuth } from '../context/AuthContext';
import type { UserRole } from '../types';
import { Button } from '../components/forms/Fields';

export function DashboardLayout({ role }: { role: UserRole }) {
  const { user, logout } = useAuth();
  const [open, setOpen] = useState(false);

  return (
    <div className="app-shell">
      <Sidebar role={role} open={open} onClose={() => setOpen(false)} />
      <div>
        <div className="topbar">
          <Button className="mobile-bar" variant="outline" type="button" onClick={() => setOpen(true)}>
            Menu
          </Button>
          <div>
            <strong>Welcome, {user?.fullName}</strong>
            <div className="muted">Demo session · mock data</div>
          </div>
          <Button variant="outline" type="button" onClick={logout}>Logout</Button>
        </div>
        <main className="content">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
