import { useEffect, useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { caseService } from '../../services/caseService';
import type { LegalCase } from '../../types';
import { CaseCard } from '../../components/common/CaseCard';
import { EmptyState, LoadingSpinner, PageHeader } from '../../components/common/Feedback';
import { SelectField } from '../../components/forms/Fields';

export function MyCasesPage() {
  const { user } = useAuth();
  const [items, setItems] = useState<LegalCase[]>([]);
  const [loading, setLoading] = useState(true);
  const [status, setStatus] = useState('');

  useEffect(() => {
    if (!user) return;
    caseService.listByUser(user.id).then(setItems).finally(() => setLoading(false));
  }, [user]);

  if (loading) return <LoadingSpinner />;
  const filtered = items.filter((item) => !status || item.status === status);

  return (
    <div className="stack">
      <PageHeader title="My cases" subtitle="Demo cases linked to the signed-in user." />
      <SelectField label="Filter by status" value={status} onChange={(e) => setStatus(e.target.value)}>
        <option value="">All</option>
        <option value="open">Open</option>
        <option value="in_progress">In progress</option>
        <option value="closed">Closed</option>
      </SelectField>
      {filtered.length === 0 ? (
        <EmptyState title="No cases" text="There are no cases for this filter." />
      ) : (
        <div className="grid-2">{filtered.map((item) => <CaseCard key={item.id} item={item} />)}</div>
      )}
    </div>
  );
}
