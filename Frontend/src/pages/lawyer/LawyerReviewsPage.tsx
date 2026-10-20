import { useEffect, useState } from 'react';
import { reviewService } from '../../services/reviewService';
import type { Review } from '../../types';
import { EmptyState, LoadingSpinner, PageHeader } from '../../components/common/Feedback';
import { RatingStars } from '../../components/common/RatingStars';
import { formatDate } from '../../utils/formatters';

const LAWYER_ID = 'lawyer-1';

export function LawyerReviewsPage() {
  const [items, setItems] = useState<Review[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    reviewService.listByLawyer(LAWYER_ID).then(setItems).finally(() => setLoading(false));
  }, []);

  if (loading) return <LoadingSpinner />;

  return (
    <div className="stack">
      <PageHeader title="Reviews" subtitle="Public demo reviews for this lawyer profile." />
      {items.length === 0 ? <EmptyState title="No reviews" text="Reviews submitted by users will appear here." /> : (
        items.map((review) => (
          <article className="card" key={review.id}>
            <strong>{review.userName}</strong>
            <RatingStars value={review.rating} />
            <p>{review.comment}</p>
            <p className="muted">{formatDate(review.createdAt)}</p>
          </article>
        ))
      )}
    </div>
  );
}
