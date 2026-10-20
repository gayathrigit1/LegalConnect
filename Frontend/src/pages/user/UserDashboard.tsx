import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { caseService } from '../../services/caseService';
import { consultationService } from '../../services/consultationService';
import { lawyerService } from '../../services/lawyerService';
import { aiService } from '../../services/aiService';
import { mockNotifications } from '../../data/notifications';
import type { LegalCase, Consultation, Lawyer, Recommendation } from '../../types';
import { CaseCard } from '../../components/common/CaseCard';
import { ConsultationCard } from '../../components/common/ConsultationCard';
import { RecommendationCard } from '../../components/common/RecommendationCard';
import { EmptyState, LoadingSpinner, PageHeader } from '../../components/common/Feedback';
import { formatDate } from '../../utils/formatters';

export function UserDashboard() {
  const { user } = useAuth();
  const [loading, setLoading] = useState(true);
  const [cases, setCases] = useState<LegalCase[]>([]);
  const [consults, setConsults] = useState<Consultation[]>([]);
  const [lawyers, setLawyers] = useState<Lawyer[]>([]);
  const [recs, setRecs] = useState<Recommendation[]>([]);

  useEffect(() => {
    if (!user) return;
    Promise.all([
      caseService.listByUser(user.id),
      consultationService.listByUser(user.id),
      lawyerService.list(),
      aiService.getRecommendations(),
    ]).then(([caseItems, consultItems, lawyerItems, recItems]) => {
      setCases(caseItems);
      setConsults(consultItems);
      setLawyers(lawyerItems);
      setRecs(recItems);
    }).finally(() => setLoading(false));
  }, [user]);

  if (loading) return <LoadingSpinner />;

  const upcoming = consults.filter((item) => item.status === 'accepted' || item.status === 'pending');
  const recCards = recs.slice(0, 2).map((rec) => {
    const lawyer = lawyers.find((item) => item.id === rec.lawyerId);
    return lawyer ? { lawyer, rec } : null;
  }).filter((item): item is { lawyer: Lawyer; rec: Recommendation } => Boolean(item));

  return (
    <div className="stack">
      <PageHeader title={`Welcome, ${user?.fullName}`} subtitle="Your mock workspace for legal assistance and lawyer matching." />
      <div className="grid-4">
        <div className="stat"><span className="muted">Open cases</span><b>{cases.filter((c) => c.status !== 'closed').length}</b></div>
        <div className="stat"><span className="muted">Upcoming consults</span><b>{upcoming.length}</b></div>
        <div className="stat"><span className="muted">Notifications</span><b>{mockNotifications.filter((n) => !n.read).length}</b></div>
        <div className="stat"><span className="muted">Recommended</span><b>{recs.length}</b></div>
      </div>
      <div className="row">
        <Link className="btn btn-primary" to="/app/ai">Get legal assistance</Link>
        <Link className="btn btn-gold" to="/app/lawyers">Find a lawyer</Link>
        <Link className="btn btn-outline" to="/app/consultations">Request consultation</Link>
      </div>
      <h2>Recent cases</h2>
      {cases.length === 0 ? <EmptyState title="No cases yet" text="Cases will appear here after backend integration." /> : (
        <div className="grid-2">{cases.slice(0, 2).map((item) => <CaseCard key={item.id} item={item} />)}</div>
      )}
      <h2>Recommended lawyers</h2>
      <p className="muted">Match scores are backend-mock values and are not calculated in the frontend.</p>
      <div className="grid-2">
        {recCards.map(({ lawyer, rec }) => <RecommendationCard key={lawyer.id} lawyer={lawyer} rec={rec} />)}
      </div>
      <h2>Upcoming consultations</h2>
      {upcoming.length === 0 ? <EmptyState title="No upcoming consultations" text="Accepted requests will show here." /> : (
        <div className="grid-2">{upcoming.slice(0, 2).map((item) => <ConsultationCard key={item.id} item={item} basePath="/app/consultations" />)}</div>
      )}
      <h2>Notifications</h2>
      <div className="card stack">
        {mockNotifications.map((note) => (
          <div key={note.id}>
            <strong>{note.title}</strong>
            <p className="muted" style={{ margin: 0 }}>{note.message} · {formatDate(note.createdAt)}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
