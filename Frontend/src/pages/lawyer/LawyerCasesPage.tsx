import { useEffect, useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { caseService } from '../../services/caseService';
import type { LegalCase } from '../../types';
import { CaseCard } from '../../components/common/CaseCard';
import { EmptyState, LoadingSpinner, PageHeader } from '../../components/common/Feedback';

export function LawyerCasesPage() {
  const { user } = useAuth();
  const [items, setItems] = useState<LegalCase[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user) return;
    caseService.listByUser(user.id).then(setItems).finally(() => setLoading(false));
  }, [user]);

  if (loading) return <LoadingSpinner />;

  return (
    <div className="stack">
      <PageHeader title="Cases" subtitle="Demo cases assigned to this lawyer account." />
      {items.length === 0 ? <EmptyState title="No cases" text="Assigned demo cases will appear here." /> : (
        <div className="grid-2">{items.map((item) => <CaseCard key={item.id} item={item} />)}</div>
      )}
    </div>
  );
}
