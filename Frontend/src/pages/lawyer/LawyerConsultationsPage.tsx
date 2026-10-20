import { useEffect, useState } from 'react';
import { consultationService } from '../../services/consultationService';
import type { Consultation } from '../../types';
import { ConsultationCard } from '../../components/common/ConsultationCard';
import { EmptyState, LoadingSpinner, PageHeader } from '../../components/common/Feedback';
import { SelectField } from '../../components/forms/Fields';

const LAWYER_ID = 'lawyer-1';

export function LawyerConsultationsPage({ requestsOnly = false }: { requestsOnly?: boolean }) {
  const [items, setItems] = useState<Consultation[]>([]);
  const [loading, setLoading] = useState(true);
  const [status, setStatus] = useState(requestsOnly ? 'pending' : '');

  useEffect(() => {
    consultationService.listByLawyer(LAWYER_ID).then(setItems).finally(() => setLoading(false));
  }, []);

  if (loading) return <LoadingSpinner />;
  const filtered = items.filter((item) => !status || item.status === status);

  return (
    <div className="stack">
      <PageHeader
        title={requestsOnly ? 'Consultation requests' : 'Consultations'}
        subtitle="Accept, reject, or complete demo requests. Status changes stay in frontend memory."
      />
      {!requestsOnly ? (
        <SelectField label="Status" value={status} onChange={(e) => setStatus(e.target.value)}>
          <option value="">All</option>
          <option value="pending">Pending</option>
          <option value="accepted">Accepted</option>
          <option value="rejected">Rejected</option>
          <option value="completed">Completed</option>
          <option value="cancelled">Cancelled</option>
        </SelectField>
      ) : null}
      {filtered.length === 0 ? (
        <EmptyState title="No consultations" text="Nothing matches this filter." />
      ) : (
        <div className="grid-2">
          {filtered.map((item) => <ConsultationCard key={item.id} item={item} basePath="/lawyer/consultations" />)}
        </div>
      )}
    </div>
  );
}
