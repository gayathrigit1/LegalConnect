import { useEffect, useState } from 'react';
import { adminService } from '../../services/adminService';
import { mockLawyers } from '../../data/lawyers';
import type { AdminStats } from '../../types';
import { LoadingSpinner, PageHeader } from '../../components/common/Feedback';

export function ReportsPage() {
  const [stats, setStats] = useState<AdminStats | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    adminService.getStats().then(setStats).finally(() => setLoading(false));
  }, []);

  if (loading || !stats) return <LoadingSpinner />;

  const byDomain = mockLawyers.reduce<Record<string, number>>((acc, lawyer) => {
    lawyer.legalDomains.forEach((domain) => {
      acc[domain] = (acc[domain] || 0) + 1;
    });
    return acc;
  }, {});

  return (
    <div className="stack">
      <PageHeader title="Reports" subtitle="Simple mock statistics for the project demonstration. Not production analytics." />
      <div className="grid-3">
        <div className="stat"><span className="muted">Verification rate</span><b>{Math.round((stats.verifiedLawyers / stats.totalLawyers) * 100)}%</b></div>
        <div className="stat"><span className="muted">Pending consult share</span><b>{Math.round((stats.pendingConsultations / stats.totalConsultations) * 100)}%</b></div>
        <div className="stat"><span className="muted">Reviews on file</span><b>{stats.totalReviews}</b></div>
      </div>
      <div className="card">
        <h3>Demo lawyers by domain</h3>
        {Object.entries(byDomain).map(([domain, count]) => (
          <div key={domain} style={{ marginBottom: 10 }}>
            <div className="row" style={{ justifyContent: 'space-between' }}>
              <span>{domain}</span>
              <span>{count}</span>
            </div>
            <div className="progress"><span style={{ width: `${(count / mockLawyers.length) * 100}%` }} /></div>
          </div>
        ))}
      </div>
    </div>
  );
}
