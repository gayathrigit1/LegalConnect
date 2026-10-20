import { FormEvent, useEffect, useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { reviewService } from '../../services/reviewService';
import { consultationService } from '../../services/consultationService';
import { lawyerService } from '../../services/lawyerService';
import type { Review } from '../../types';
import { EmptyState, LoadingSpinner, PageHeader } from '../../components/common/Feedback';
import { RatingStars } from '../../components/common/RatingStars';
import { SelectField, TextAreaField, Button } from '../../components/forms/Fields';
import { formatDate } from '../../utils/formatters';

export function ReviewsPage() {
  const { user } = useAuth();
  const [reviews, setReviews] = useState<Review[]>([]);
  const [lawyerId, setLawyerId] = useState('');
  const [lawyerOptions, setLawyerOptions] = useState<{ id: string; name: string }[]>([]);
  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);

  async function refresh() {
    if (!user) return;
    const [mine, consults, lawyers] = await Promise.all([
      reviewService.listByUser(user.id),
      consultationService.listByUser(user.id),
      lawyerService.list(),
    ]);
    setReviews(mine);
    const completedIds = new Set(
      consults.filter((item) => item.status === 'completed').map((item) => item.lawyerId),
    );
    setLawyerOptions(
      lawyers.filter((lawyer) => completedIds.has(lawyer.id)).map((lawyer) => ({ id: lawyer.id, name: lawyer.fullName })),
    );
  }

  useEffect(() => {
    refresh().finally(() => setLoading(false));
  }, [user]);

  async function onSubmit(event: FormEvent) {
    event.preventDefault();
    setError('');
    if (!user) return;
    if (!lawyerId) {
      setError('Select a lawyer from a completed consultation.');
      return;
    }
    if (comment.trim().length < 10) {
      setError('Review text must be at least 10 characters.');
      return;
    }
    if (rating < 1 || rating > 5) {
      setError('Choose a rating from 1 to 5 stars.');
      return;
    }
    const lawyer = lawyerOptions.find((item) => item.id === lawyerId);
    await reviewService.create({
      lawyerId,
      lawyerName: lawyer?.name || 'Demo lawyer',
      userId: user.id,
      userName: user.fullName,
      rating,
      comment: comment.trim(),
    });
    setComment('');
    await refresh();
  }

  if (loading) return <LoadingSpinner />;

  return (
    <div className="stack">
      <PageHeader title="Reviews" subtitle="Submit a review after a completed demo consultation." />
      <form className="card stack" onSubmit={onSubmit}>
        {error ? <div className="banner">{error}</div> : null}
        <SelectField label="Lawyer" value={lawyerId} onChange={(e) => setLawyerId(e.target.value)}>
          <option value="">Select</option>
          {lawyerOptions.map((lawyer) => <option key={lawyer.id} value={lawyer.id}>{lawyer.name}</option>)}
        </SelectField>
        <div>
          <span style={{ fontSize: 13, fontWeight: 600 }}>Star rating</span>
          <RatingStars value={rating} onChange={setRating} />
        </div>
        <TextAreaField label="Review text" value={comment} onChange={(e) => setComment(e.target.value)} />
        <Button type="submit">Submit review</Button>
      </form>
      {reviews.length === 0 ? (
        <EmptyState title="No reviews yet" text="Your submitted reviews will be listed here." />
      ) : (
        <div className="stack">
          {reviews.map((review) => (
            <article className="card" key={review.id}>
              <strong>{review.userName}</strong> on {review.lawyerName}
              <RatingStars value={review.rating} />
              <p>{review.comment}</p>
              <p className="muted">{formatDate(review.createdAt)}</p>
            </article>
          ))}
        </div>
      )}
    </div>
  );
}
