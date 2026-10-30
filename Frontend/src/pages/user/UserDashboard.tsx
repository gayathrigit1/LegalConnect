import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { caseService } from '../../services/caseService';
import { consultationService } from '../../services/consultationService';
import { lawyerService } from '../../services/lawyerService';
import { aiService } from '../../services/aiService';
import { paymentService } from '../../services/paymentService';
import { mockNotifications } from '../../data/notifications';
import type { LegalCase, Consultation, Lawyer, Recommendation, PaymentRecord } from '../../types';
import { CaseCard } from '../../components/common/CaseCard';
import { ConsultationCard } from '../../components/common/ConsultationCard';
import { RecommendationCard } from '../../components/common/RecommendationCard';
import { EmptyState, LoadingSpinner, PageHeader } from '../../components/common/Feedback';
import { formatDate, formatFee } from '../../utils/formatters';

export function UserDashboard() {
  const { user } = useAuth();
  const [loading, setLoading] = useState(true);
  const [cases, setCases] = useState<LegalCase[]>([]);
  const [consults, setConsults] = useState<Consultation[]>([]);
  const [lawyers, setLawyers] = useState<Lawyer[]>([]);
  const [recs, setRecs] = useState<Recommendation[]>([]);
  const [payments, setPayments] = useState<PaymentRecord[]>([]);

  useEffect(() => {
    if (!user) return;
    Promise.all([
      caseService.listByUser(user.id),
      consultationService.listByUser(user.id),
      lawyerService.list(),
      aiService.getRecommendations(''),
      paymentService.getMyPayments().catch(() => []),
    ]).then(([caseItems, consultItems, lawyerItems, recItems, paymentItems]) => {
      setCases(caseItems);
      setConsults(consultItems);
      setLawyers(lawyerItems);
      setRecs(recItems);
      setPayments(paymentItems);
    }).finally(() => setLoading(false));
  }, [user]);

  if (loading) return <LoadingSpinner />;

  const upcoming = consults.filter((item) => item.status === 'accepted' || item.status === 'pending');
  const successfulPayments = payments.filter((p) => p.status === 'SUCCESS');
  const recCards = recs.slice(0, 2).map((rec) => {
    const lawyer = lawyers.find((item) => item.id === rec.lawyerId);
    return lawyer ? { lawyer, rec } : null;
  }).filter((item): item is { lawyer: Lawyer; rec: Recommendation } => Boolean(item));

  return (
    <div className="stack" style={{ gap: 20 }}>
      <PageHeader
        title={`Welcome, ${user?.fullName}`}
        subtitle="Your legal assistance dashboard with consultation booking and Razorpay Sandbox payments."
      />

      <div className="grid-4">
        <div className="stat"><span className="muted">Open cases</span><b>{cases.filter((c) => c.status !== 'closed').length}</b></div>
        <div className="stat"><span className="muted">Upcoming consults</span><b>{upcoming.length}</b></div>
        <div className="stat"><span className="muted">Paid Transactions</span><b>{successfulPayments.length}</b></div>
        <div className="stat"><span className="muted">Notifications</span><b>{mockNotifications.filter((n) => !n.read).length}</b></div>
      </div>

      <div className="row" style={{ flexWrap: 'wrap', gap: 10 }}>
        <Link className="btn btn-primary" to="/app/ai">Get legal assistance</Link>
        <Link className="btn btn-gold" to="/app/lawyers">Find a lawyer</Link>
        <Link className="btn btn-outline" to="/app/consultations">Request consultation</Link>
        <Link className="btn btn-outline" to="/app/payments">Payment History</Link>
      </div>

      {/* Recent Payments Section */}
      <div className="stack" style={{ gap: 10 }}>
        <div className="row" style={{ justifyContent: 'space-between', alignItems: 'center' }}>
          <h2 style={{ margin: 0 }}>Recent Consultation Payments</h2>
          <Link to="/app/payments" className="btn btn-outline btn-sm">View All Payments</Link>
        </div>

        {payments.length === 0 ? (
          <div className="card" style={{ padding: '14px 18px', color: '#64748b', fontSize: '0.92rem' }}>
            No payments recorded yet. When you book a consultation, test payments via Razorpay sandbox will appear here.
          </div>
        ) : (
          <div className="grid-2">
            {payments.slice(0, 2).map((p) => (
              <div key={p.id} className="card stack" style={{ gap: 6, fontSize: '0.9rem' }}>
                <div className="row" style={{ justifyContent: 'space-between' }}>
                  <strong>{p.lawyerName || 'Advocate'}</strong>
                  <span
                    style={{
                      padding: '2px 8px',
                      borderRadius: '4px',
                      fontSize: '0.75rem',
                      fontWeight: 700,
                      backgroundColor: p.status === 'SUCCESS' ? '#ecfdf5' : '#fffbeb',
                      color: p.status === 'SUCCESS' ? '#059669' : '#d97706',
                    }}
                  >
                    {p.status} (TEST)
                  </span>
                </div>
                <p style={{ margin: 0 }}>Amount: <strong>{formatFee(p.amount)}</strong></p>
                <p className="muted" style={{ margin: 0, fontSize: '0.8rem' }}>
                  {formatDate(p.createdAt)} · Order: <code>{p.razorpayOrderId}</code>
                </p>
              </div>
            ))}
          </div>
        )}
      </div>

      <h2>Recent cases</h2>
      {cases.length === 0 ? <EmptyState title="No cases yet" text="Cases will appear here." /> : (
        <div className="grid-2">{cases.slice(0, 2).map((item) => <CaseCard key={item.id} item={item} />)}</div>
      )}

      <h2>Recommended lawyers</h2>
      <p className="muted">Match scores are calculated based on practice domains, client ratings, and fee compatibility.</p>
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
