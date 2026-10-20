import { useEffect, useState } from 'react';
import { lawyerService } from '../../services/lawyerService';
import type { Lawyer, VerificationStatus } from '../../types';
import { AdminTable } from '../../components/common/AdminTable';
import { LoadingSpinner, PageHeader } from '../../components/common/Feedback';
import { StatusBadge } from '../../components/common/StatusBadge';
import { Button } from '../../components/forms/Fields';

export function LawyerVerificationPage() {
  const [lawyers, setLawyers] = useState<Lawyer[]>([]);
  const [loading, setLoading] = useState(true);

  async function refresh() {
    setLawyers(await lawyerService.list());
  }

  useEffect(() => {
    refresh().finally(() => setLoading(false));
  }, []);

  async function setStatus(id: string, status: VerificationStatus) {
    await lawyerService.setVerification(id, status);
    await refresh();
  }

  if (loading) return <LoadingSpinner />;

  return (
    <div className="stack">
      <PageHeader title="Lawyer verification" subtitle="Approve or reject demo verification requests. Not a real credential check." />
      <AdminTable
        rows={lawyers}
        searchText={(lawyer) => `${lawyer.fullName} ${lawyer.verificationStatus}`}
        columns={[
          { key: 'name', header: 'Name', render: (row) => row.fullName },
          { key: 'qual', header: 'Qualifications', render: (row) => row.qualifications.join('; ') },
          { key: 'status', header: 'Status', render: (row) => <StatusBadge status={row.verificationStatus} /> },
          {
            key: 'actions',
            header: 'Actions',
            render: (row) => (
              <div className="row">
                <Button type="button" onClick={() => setStatus(row.id, 'verified')}>Verify</Button>
                <Button type="button" variant="danger" onClick={() => setStatus(row.id, 'rejected')}>Reject</Button>
              </div>
            ),
          },
        ]}
      />
    </div>
  );
}
