import { useEffect, useState } from 'react';
import { reviewService } from '../../services/reviewService';
import type { Review } from '../../types';
import { AdminTable } from '../../components/common/AdminTable';
import { LoadingSpinner, PageHeader } from '../../components/common/Feedback';
import { RatingStars } from '../../components/common/RatingStars';
import { formatDate } from '../../utils/formatters';
import { Button } from '../../components/forms/Fields';

export function ReviewManagementPage() {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [loading, setLoading] = useState(true);

  async function refresh() {
    setReviews(await reviewService.listAll());
  }

  useEffect(() => {
    refresh().finally(() => setLoading(false));
  }, []);

  if (loading) return <LoadingSpinner />;

  return (
    <div className="stack">
      <PageHeader title="Review management" subtitle="Moderate demo reviews. Deletion is local mock state." />
      <AdminTable
        rows={reviews}
        searchText={(review) => `${review.userName} ${review.lawyerName} ${review.comment}`}
        columns={[
          { key: 'user', header: 'User', render: (row) => row.userName },
          { key: 'lawyer', header: 'Lawyer', render: (row) => row.lawyerName },
          { key: 'rating', header: 'Rating', render: (row) => <RatingStars value={row.rating} /> },
          { key: 'comment', header: 'Review', render: (row) => row.comment },
          { key: 'date', header: 'Date', render: (row) => formatDate(row.createdAt) },
          {
            key: 'del',
            header: 'Action',
            render: (row) => (
              <Button type="button" variant="danger" onClick={async () => { await reviewService.remove(row.id); await refresh(); }}>
                Remove
              </Button>
            ),
          },
        ]}
      />
    </div>
  );
}
