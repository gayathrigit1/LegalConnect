import { useEffect, useState } from 'react';
import { lawyerService } from '../../services/lawyerService';
import type { Lawyer } from '../../types';
import { useComparison } from '../../context/ComparisonContext';
import { LawyerComparison } from '../../components/common/LawyerComparison';
import { EmptyState, LoadingSpinner, PageHeader } from '../../components/common/Feedback';
import { Link } from 'react-router-dom';

export function CompareLawyersPage() {
  const { lawyerIds, removeLawyer, clear } = useComparison();
  const [lawyers, setLawyers] = useState<Lawyer[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    lawyerService.list().then((all) => {
      setLawyers(all.filter((lawyer) => lawyerIds.includes(lawyer.id)));
    }).finally(() => setLoading(false));
  }, [lawyerIds]);

  if (loading) return <LoadingSpinner />;

  return (
    <div className="stack">
      <PageHeader title="Compare lawyers" subtitle="Side-by-side attributes only. This screen does not rank a best lawyer.">
        {lawyerIds.length > 0 ? <button className="btn btn-outline" type="button" onClick={clear}>Clear all</button> : null}
      </PageHeader>
      {lawyers.length === 0 ? (
        <EmptyState title="Nothing to compare" text="Add up to four lawyers from Find Lawyers." />
      ) : (
        <LawyerComparison lawyers={lawyers} onRemove={removeLawyer} />
      )}
      <Link className="btn btn-primary" to="/app/lawyers">Back to lawyers</Link>
    </div>
  );
}
