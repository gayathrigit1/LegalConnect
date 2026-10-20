import { Link } from 'react-router-dom';
import type { LegalCase } from '../../types';
import { formatDate } from '../../utils/formatters';
import { StatusBadge } from './StatusBadge';

export function CaseCard({ item }: { item: LegalCase }) {
  return (
    <article className="card">
      <div className="row" style={{ justifyContent: 'space-between' }}>
        <h3 style={{ margin: 0 }}>{item.title}</h3>
        <StatusBadge status={item.status} />
      </div>
      <p className="muted">{item.domain} · Updated {formatDate(item.updatedAt)}</p>
      <p>{item.summary}</p>
      <Link className="btn btn-outline btn-sm" to="/app/cases">Open cases</Link>
    </article>
  );
}
