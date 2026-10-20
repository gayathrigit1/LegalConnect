import { Link } from 'react-router-dom';
import type { Lawyer } from '../../types';
import { formatFee } from '../../utils/formatters';
import { RatingStars } from './RatingStars';
import { StatusBadge } from './StatusBadge';
import { Button } from '../forms/Fields';

interface LawyerCardProps {
  lawyer: Lawyer;
  onCompare?: (id: string) => void;
  compared?: boolean;
}

export function LawyerCard({ lawyer, onCompare, compared }: LawyerCardProps) {
  return (
    <article className="card lawyer-card">
      <div className="row">
        <div className="avatar" aria-hidden>{lawyer.avatarInitials}</div>
        <div>
          <h3 style={{ margin: 0 }}>{lawyer.fullName}</h3>
          <p className="muted" style={{ margin: 0 }}>{lawyer.specialization}</p>
        </div>
        <StatusBadge status={lawyer.verificationStatus} />
      </div>
      <RatingStars value={lawyer.rating} />
      <p className="muted">{lawyer.yearsOfExperience} years · {lawyer.location}</p>
      <p><strong>{formatFee(lawyer.consultationFee)}</strong> consultation fee</p>
      <StatusBadge status={lawyer.availability} />
      <div className="row">
        <Link className="btn btn-primary btn-sm" to={`/app/lawyers/${lawyer.id}`}>View profile</Link>
        {onCompare ? (
          <Button type="button" variant={compared ? 'gold' : 'outline'} onClick={() => onCompare(lawyer.id)}>
            {compared ? 'In comparison' : 'Compare'}
          </Button>
        ) : null}
      </div>
    </article>
  );
}
