import { Link } from 'react-router-dom';
import type { Consultation } from '../../types';
import { formatDate, formatStatus } from '../../utils/formatters';
import { StatusBadge } from './StatusBadge';
import { Button } from '../forms/Fields';

export function ConsultationCard({
  item,
  basePath,
  onPay,
}: {
  item: Consultation;
  basePath: string;
  onPay?: (consultation: Consultation) => void;
}) {
  const isPaid = item.paymentStatus === 'PAID';

  return (
    <article className="card stack" style={{ gap: 10 }}>
      <div className="row" style={{ justifyContent: 'space-between', alignItems: 'center' }}>
        <h3 style={{ margin: 0 }}>{item.lawyerName}</h3>
        <div className="row" style={{ gap: 6 }}>
          <span
            style={{
              padding: '3px 8px',
              borderRadius: '4px',
              fontSize: '0.75rem',
              fontWeight: 700,
              backgroundColor: isPaid ? '#ecfdf5' : '#fffbeb',
              color: isPaid ? '#059669' : '#b45309',
              border: `1px solid ${isPaid ? '#a7f3d0' : '#fde68a'}`,
            }}
          >
            {isPaid ? 'PAID (TEST)' : 'UNPAID'}
          </span>
          <StatusBadge status={item.status} />
        </div>
      </div>
      <p className="muted" style={{ margin: 0 }}>
        {formatDate(item.preferredDate)} · {item.preferredTime} · {formatStatus(item.type)}
      </p>
      <p style={{ margin: 0 }}>{item.description}</p>
      {item.caseTitle ? <p className="muted" style={{ margin: 0 }}>Case: {item.caseTitle}</p> : null}
      <div className="row" style={{ justifyContent: 'space-between', marginTop: 4 }}>
        <Link className="btn btn-outline btn-sm" to={`${basePath}/${item.id}`}>
          Details
        </Link>
        {!isPaid && onPay && (
          <Button type="button" variant="primary" onClick={() => onPay(item)}>
            Pay Fee (Test Mode)
          </Button>
        )}
      </div>
    </article>
  );
}
