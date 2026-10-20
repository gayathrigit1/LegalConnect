import { useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { lawyerService } from '../../services/lawyerService';
import { reviewService } from '../../services/reviewService';
import type { Lawyer, Review } from '../../types';
import { EmptyState, LoadingSpinner, PageHeader } from '../../components/common/Feedback';
import { RatingStars } from '../../components/common/RatingStars';
import { StatusBadge } from '../../components/common/StatusBadge';
import { formatFee } from '../../utils/formatters';
import { useComparison } from '../../context/ComparisonContext';
import { Button } from '../../components/forms/Fields';
import { formatDate } from '../../utils/formatters';

export function LawyerProfilePage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { toggleLawyer, lawyerIds } = useComparison();
  const [lawyer, setLawyer] = useState<Lawyer | undefined>();
  const [reviews, setReviews] = useState<Review[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!id) return;
    Promise.all([lawyerService.getById(id), reviewService.listByLawyer(id)])
      .then(([profile, reviewItems]) => {
        setLawyer(profile);
        setReviews(reviewItems);
      })
      .finally(() => setLoading(false));
  }, [id]);

  if (loading) return <LoadingSpinner />;
  if (!lawyer) return <EmptyState title="Lawyer not found" text="This demo profile does not exist." />;

  return (
    <div className="stack">
      <PageHeader title={lawyer.fullName} subtitle="Fictional demo profile. Not a real advocate listing.">
        <Button type="button" variant="outline" onClick={() => navigate('/app/lawyers')}>Back to lawyers</Button>
      </PageHeader>
      <div className="grid-2">
        <article className="card stack">
          <div className="row">
            <div className="avatar">{lawyer.avatarInitials}</div>
            <StatusBadge status={lawyer.verificationStatus} />
          </div>
          <p>{lawyer.bio}</p>
          <p><strong>Qualifications:</strong> {lawyer.qualifications.join(', ')}</p>
          <p><strong>Specializations:</strong> {lawyer.specializations.join(', ')}</p>
          <p><strong>Experience:</strong> {lawyer.yearsOfExperience} years</p>
          <p><strong>Location:</strong> {lawyer.location}</p>
          <p><strong>Fee:</strong> {formatFee(lawyer.consultationFee)}</p>
          <p><strong>Availability:</strong> <StatusBadge status={lawyer.availability} /></p>
          <RatingStars value={lawyer.rating} />
          <p><strong>Relevant experience:</strong> {lawyer.relevantExperience}</p>
          <div className="row">
            <Link className="btn btn-primary" to={`/app/consultations?lawyerId=${lawyer.id}`}>Request consultation</Link>
            <Button type="button" variant="gold" onClick={() => toggleLawyer(lawyer.id)}>
              {lawyerIds.includes(lawyer.id) ? 'In comparison' : 'Add to comparison'}
            </Button>
          </div>
        </article>
        <article className="card">
          <h3>Reviews</h3>
          {reviews.length === 0 ? <p className="muted">No reviews yet.</p> : reviews.map((review) => (
            <div key={review.id} style={{ marginBottom: 12 }}>
              <strong>{review.userName}</strong>
              <RatingStars value={review.rating} />
              <p>{review.comment}</p>
              <p className="muted">{formatDate(review.createdAt)}</p>
            </div>
          ))}
        </article>
      </div>
    </div>
  );
}
