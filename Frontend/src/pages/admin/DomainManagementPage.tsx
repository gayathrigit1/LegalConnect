import { useEffect, useState } from 'react';
import { adminService } from '../../services/adminService';
import type { LegalDomain } from '../../types';
import { AdminTable } from '../../components/common/AdminTable';
import { LoadingSpinner, PageHeader } from '../../components/common/Feedback';
import { StatusBadge } from '../../components/common/StatusBadge';
import { Button } from '../../components/forms/Fields';

export function DomainManagementPage() {
  const [domains, setDomains] = useState<LegalDomain[]>([]);
  const [loading, setLoading] = useState(true);

  async function refresh() {
    setDomains(await adminService.listDomains());
  }

  useEffect(() => {
    refresh().finally(() => setLoading(false));
  }, []);

  if (loading) return <LoadingSpinner />;

  return (
    <div className="stack">
      <PageHeader title="Legal domain management" subtitle="Toggle demo taxonomy used in search filters." />
      <AdminTable
        rows={domains}
        searchText={(domain) => `${domain.name} ${domain.description}`}
        columns={[
          { key: 'name', header: 'Domain', render: (row) => row.name },
          { key: 'desc', header: 'Description', render: (row) => row.description },
          { key: 'active', header: 'Status', render: (row) => <StatusBadge status={row.active ? 'verified' : 'rejected'} /> },
          {
            key: 'toggle',
            header: 'Toggle',
            render: (row) => (
              <Button type="button" variant="outline" onClick={async () => { await adminService.toggleDomain(row.id); await refresh(); }}>
                {row.active ? 'Deactivate' : 'Activate'}
              </Button>
            ),
          },
        ]}
      />
    </div>
  );
}
