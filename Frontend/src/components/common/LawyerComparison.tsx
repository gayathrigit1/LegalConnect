import type { ReactNode } from 'react';
import type { Lawyer } from '../../types';
import { formatFee } from '../../utils/formatters';
import { RatingStars } from './RatingStars';
import { StatusBadge } from './StatusBadge';
import { Button } from '../forms/Fields';

const rows: { label: string; render: (lawyer: Lawyer) => ReactNode }[] = [
  { label: 'Specialization', render: (l) => l.specializations.join(', ') },
  { label: 'Experience', render: (l) => `${l.yearsOfExperience} years` },
  { label: 'Relevant experience', render: (l) => l.relevantExperience },
  { label: 'Location', render: (l) => l.location },
  { label: 'Consultation fee', render: (l) => formatFee(l.consultationFee) },
  { label: 'Rating', render: (l) => <RatingStars value={l.rating} /> },
  { label: 'Availability', render: (l) => <StatusBadge status={l.availability} /> },
  { label: 'Verification', render: (l) => <StatusBadge status={l.verificationStatus} /> },
];

export function LawyerComparison({
  lawyers,
  onRemove,
}: {
  lawyers: Lawyer[];
  onRemove: (id: string) => void;
}) {
  if (lawyers.length === 0) {
    return <p className="empty">Add lawyers from search to compare attributes. This table does not rank a “best” lawyer.</p>;
  }

  return (
    <div className="table-wrap card" style={{ padding: 0 }}>
      <table>
        <thead>
          <tr>
            <th>Attribute</th>
            {lawyers.map((lawyer) => (
              <th key={lawyer.id}>
                {lawyer.fullName}
                <div>
                  <Button type="button" variant="ghost" onClick={() => onRemove(lawyer.id)}>Remove</Button>
                </div>
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row) => (
            <tr key={row.label}>
              <td><strong>{row.label}</strong></td>
              {lawyers.map((lawyer) => (
                <td key={lawyer.id}>{row.render(lawyer)}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
