import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { consultationService } from '../../services/consultationService';
import type { Consultation } from '../../types';
import { EmptyState, LoadingSpinner, PageHeader } from '../../components/common/Feedback';
import { StatusBadge } from '../../components/common/StatusBadge';
import { formatDate, formatStatus } from '../../utils/formatters';
import { Button } from '../../components/forms/Fields';

export function ConsultationDetailsPage({ role }: { role: 'user' | 'lawyer' }) {
  const { id } = useParams();
  const navigate = useNavigate();
  const [item, setItem] = useState<Consultation | undefined>();
  const [loading, setLoading] = useState(true);
  const back = role === 'lawyer' ? '/lawyer/consultations' : '/app/consultations';

  useEffect(() => {
    if (!id) return;
    consultationService.getById(id).then(setItem).finally(() => setLoading(false));
  }, [id]);

  if (loading) return <LoadingSpinner />;
  if (!item) return <EmptyState title="Not found" text="This consultation does not exist in the demo data." />;
  const current = item;

  async function setStatus(status: Consultation['status']) {
    const updated = await consultationService.updateStatus(current.id, status);
    setItem({ ...updated });
  }

  return (
    <div className="stack">
      <PageHeader title="Consultation details">
        <Button type="button" variant="outline" onClick={() => navigate(back)}>Back</Button>
      </PageHeader>
      <article className="card stack">
        <StatusBadge status={item.status} />
        <p><strong>Lawyer:</strong> {item.lawyerName}</p>
        <p><strong>User:</strong> {item.userName}</p>
        <p><strong>When:</strong> {formatDate(item.preferredDate)} · {item.preferredTime}</p>
        <p><strong>Type:</strong> {formatStatus(item.type)}</p>
        {item.caseTitle ? <p><strong>Case:</strong> {item.caseTitle}</p> : null}
        <p>{item.description}</p>
        {role === 'user' && (item.status === 'pending' || item.status === 'accepted') ? (
          <Button type="button" variant="danger" onClick={() => setStatus('cancelled')}>Cancel request</Button>
        ) : null}
        {role === 'lawyer' && item.status === 'pending' ? (
          <div className="row">
            <Button type="button" onClick={() => setStatus('accepted')}>Accept</Button>
            <Button type="button" variant="danger" onClick={() => setStatus('rejected')}>Reject</Button>
          </div>
        ) : null}
        {role === 'lawyer' && item.status === 'accepted' ? (
          <Button type="button" variant="gold" onClick={() => setStatus('completed')}>Mark completed</Button>
        ) : null}
      </article>
    </div>
  );
}
