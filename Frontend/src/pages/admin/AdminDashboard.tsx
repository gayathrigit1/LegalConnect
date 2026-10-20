import { useEffect, useState } from 'react';
import { adminService } from '../../services/adminService';
import type { AdminStats } from '../../types';
import { LoadingSpinner, PageHeader } from '../../components/common/Feedback';

export function AdminDashboard() {
  const [stats, setStats] = useState<AdminStats | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    adminService.getStats().then(setStats).finally(() => setLoading(false));
  }, []);

  if (loading || !stats) return <LoadingSpinner />;

  const cards = [
    ['Users', stats.totalUsers],
    ['Lawyers', stats.totalLawyers],
    ['Verified lawyers', stats.verifiedLawyers],
    ['Pending verification', stats.pendingVerifications],
    ['Consultations', stats.totalConsultations],
    ['Pending consults', stats.pendingConsultations],
    ['Reviews', stats.totalReviews],
    ['Open cases', stats.openCases],
  ] as const;

  return (
    <div className="stack">
      <PageHeader title="Admin overview" subtitle="Mock statistics assembled from frontend demo data." />
      <div className="grid-4">
        {cards.map(([label, value]) => (
          <div className="stat" key={label}>
            <span className="muted">{label}</span>
            <b>{value}</b>
          </div>
        ))}
      </div>
    </div>
  );
}
