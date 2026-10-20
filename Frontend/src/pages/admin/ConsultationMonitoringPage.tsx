import { useEffect, useState } from 'react';
import { consultationService } from '../../services/consultationService';
import type { Consultation } from '../../types';
import { AdminTable } from '../../components/common/AdminTable';
import { LoadingSpinner, PageHeader } from '../../components/common/Feedback';
import { StatusBadge } from '../../components/common/StatusBadge';
import { formatDate, formatStatus } from '../../utils/formatters';
import { SelectField } from '../../components/forms/Fields';

export function ConsultationMonitoringPage() {
  const [items, setItems] = useState<Consultation[]>([]);
  const [loading, setLoading] = useState(true);
  const [status, setStatus] = useState('');

  useEffect(() => {
    consultationService.listAll().then(setItems).finally(() => setLoading(false));
  }, []);

  if (loading) return <LoadingSpinner />;
  const rows = items.filter((item) => !status || item.status === status);

  return (
    <div className="stack">
      <PageHeader title="Consultation monitoring" subtitle="Track demo consultation statuses across users and lawyers." />
      <SelectField label="Status filter" value={status} onChange={(e) => setStatus(e.target.value)}>
        <option value="">All</option>
        <option value="pending">Pending</option>
        <option value="accepted">Accepted</option>
        <option value="rejected">Rejected</option>
        <option value="completed">Completed</option>
        <option value="cancelled">Cancelled</option>
      </SelectField>
      <AdminTable
        rows={rows}
        searchText={(item) => `${item.userName} ${item.lawyerName} ${item.status}`}
        columns={[
          { key: 'user', header: 'User', render: (row) => row.userName },
          { key: 'lawyer', header: 'Lawyer', render: (row) => row.lawyerName },
          { key: 'when', header: 'Preferred', render: (row) => `${formatDate(row.preferredDate)} ${row.preferredTime}` },
          { key: 'type', header: 'Type', render: (row) => formatStatus(row.type) },
          { key: 'status', header: 'Status', render: (row) => <StatusBadge status={row.status} /> },
        ]}
      />
    </div>
  );
}
