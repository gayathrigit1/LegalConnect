import { useEffect, useState } from 'react';
import { lawyerService } from '../../services/lawyerService';
import type { Lawyer } from '../../types';
import { AdminTable } from '../../components/common/AdminTable';
import { LoadingSpinner, PageHeader } from '../../components/common/Feedback';
import { StatusBadge } from '../../components/common/StatusBadge';
import { formatFee } from '../../utils/formatters';
import { SelectField } from '../../components/forms/Fields';

export function LawyerManagementPage() {
  const [lawyers, setLawyers] = useState<Lawyer[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('');

  useEffect(() => {
    lawyerService.list().then(setLawyers).finally(() => setLoading(false));
  }, []);

  if (loading) return <LoadingSpinner />;
  const rows = lawyers.filter((lawyer) => !filter || lawyer.verificationStatus === filter);

  return (
    <div className="stack">
      <PageHeader title="Lawyer management" subtitle="Fictional demo profiles for administration screens." />
      <SelectField label="Verification filter" value={filter} onChange={(e) => setFilter(e.target.value)}>
        <option value="">All</option>
        <option value="verified">Verified</option>
        <option value="pending">Pending</option>
        <option value="rejected">Rejected</option>
      </SelectField>
      <AdminTable
        rows={rows}
        searchText={(lawyer) => `${lawyer.fullName} ${lawyer.location} ${lawyer.specialization}`}
        columns={[
          { key: 'name', header: 'Name', render: (row) => row.fullName },
          { key: 'spec', header: 'Specialization', render: (row) => row.specialization },
          { key: 'loc', header: 'Location', render: (row) => row.location },
          { key: 'fee', header: 'Fee', render: (row) => formatFee(row.consultationFee) },
          { key: 'ver', header: 'Verification', render: (row) => <StatusBadge status={row.verificationStatus} /> },
        ]}
      />
    </div>
  );
}
