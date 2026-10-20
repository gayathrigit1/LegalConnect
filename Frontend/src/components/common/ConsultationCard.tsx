import { Link } from 'react-router-dom';
import type { Consultation } from '../../types';
import { formatDate, formatStatus } from '../../utils/formatters';
import { StatusBadge } from './StatusBadge';

export function ConsultationCard({ item, basePath }: { item: Consultation; basePath: string }) {
  return (
    <article className="card">
      <div className="row" style={{ justifyContent: 'space-between' }}>
        <h3 style={{ margin: 0 }}>{item.lawyerName}</h3>
        <StatusBadge status={item.status} />
      </div>
      <p className="muted">
        {formatDate(item.preferredDate)} · {item.preferredTime} · {formatStatus(item.type)}
      </p>
      <p>{item.description}</p>
      {item.caseTitle ? <p className="muted">Case: {item.caseTitle}</p> : null}
      <Link className="btn btn-outline btn-sm" to={`${basePath}/${item.id}`}>Details</Link>
    </article>
  );
}
