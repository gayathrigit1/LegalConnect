import { useEffect, useState } from 'react';
import { userService } from '../../services/userService';
import type { User } from '../../types';
import { AdminTable } from '../../components/common/AdminTable';
import { LoadingSpinner, PageHeader } from '../../components/common/Feedback';
import { formatDate } from '../../utils/formatters';
import { StatusBadge } from '../../components/common/StatusBadge';

export function UserManagementPage() {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    userService.list().then(setUsers).finally(() => setLoading(false));
  }, []);

  if (loading) return <LoadingSpinner />;

  return (
    <div className="stack">
      <PageHeader title="User management" subtitle="Demo accounts only." />
      <AdminTable
        rows={users.filter((user) => user.role !== 'admin')}
        searchText={(user) => `${user.fullName} ${user.email} ${user.role}`}
        columns={[
          { key: 'name', header: 'Name', render: (row) => row.fullName },
          { key: 'email', header: 'Email', render: (row) => row.email },
          { key: 'phone', header: 'Phone', render: (row) => row.phone },
          { key: 'role', header: 'Role', render: (row) => <StatusBadge status={row.role} /> },
          { key: 'created', header: 'Created', render: (row) => formatDate(row.createdAt) },
        ]}
      />
    </div>
  );
}
