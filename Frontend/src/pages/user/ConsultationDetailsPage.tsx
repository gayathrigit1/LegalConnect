import { useEffect, useState } from 'react';
import { useNavigate, useParams, Link } from 'react-router-dom';
import { consultationService } from '../../services/consultationService';
import { paymentService } from '../../services/paymentService';
import type { Consultation, PaymentRecord } from '../../types';
import { EmptyState, LoadingSpinner, PageHeader } from '../../components/common/Feedback';
import { StatusBadge } from '../../components/common/StatusBadge';
import { formatDate, formatFee, formatStatus } from '../../utils/formatters';
import { Button } from '../../components/forms/Fields';
import { RazorpayCheckoutModal } from '../../components/payment/RazorpayCheckoutModal';

export function ConsultationDetailsPage({ role }: { role: 'user' | 'lawyer' }) {
  const { id } = useParams();
  const navigate = useNavigate();
  const [item, setItem] = useState<Consultation | undefined>();
  const [payment, setPayment] = useState<PaymentRecord | null>(null);
  const [loading, setLoading] = useState(true);
  const [checkoutModalOpen, setCheckoutModalOpen] = useState(false);

  const back = role === 'lawyer' ? '/lawyer/consultations' : '/app/consultations';

  async function loadData() {
    if (!id) return;
    try {
      const consult = await consultationService.getById(id);
      setItem(consult);

      if (consult) {
        try {
          const p = await paymentService.getPaymentByConsultation(consult.id);
          setPayment(p);
        } catch {
          setPayment(null);
        }
      }
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadData();
  }, [id]);

  if (loading) return <LoadingSpinner />;
  if (!item) return <EmptyState title="Not found" text="This consultation does not exist." />;
  const current = item;

  async function setStatus(status: Consultation['status']) {
    const updated = await consultationService.updateStatus(current.id, status);
    setItem({ ...updated });
  }

  const isPaid = item.paymentStatus === 'PAID' || payment?.status === 'SUCCESS';

  return (
    <div className="stack" style={{ gap: 18 }}>
      <PageHeader title="Consultation Details">
        <Button type="button" variant="outline" onClick={() => navigate(back)}>Back</Button>
      </PageHeader>

      <article className="card stack" style={{ gap: 14 }}>
        <div className="row" style={{ justifyContent: 'space-between', alignItems: 'center' }}>
          <h3 style={{ margin: 0 }}>Consultation with {item.lawyerName}</h3>
          <div className="row" style={{ gap: 8 }}>
            <span
              style={{
                padding: '4px 10px',
                borderRadius: '4px',
                fontSize: '0.8rem',
                fontWeight: 700,
                backgroundColor: isPaid ? '#ecfdf5' : '#fffbeb',
                color: isPaid ? '#059669' : '#b45309',
                border: `1px solid ${isPaid ? '#a7f3d0' : '#fde68a'}`,
              }}
            >
              {isPaid ? 'PAYMENT: PAID (TEST)' : 'PAYMENT: UNPAID'}
            </span>
            <StatusBadge status={item.status} />
          </div>
        </div>

        <p><strong>Lawyer:</strong> {item.lawyerName}</p>
        <p><strong>Client:</strong> {item.userName}</p>
        <p><strong>Scheduled:</strong> {formatDate(item.preferredDate)} · {item.preferredTime}</p>
        <p><strong>Type:</strong> {formatStatus(item.type)}</p>
        {item.caseTitle ? <p><strong>Case:</strong> {item.caseTitle}</p> : null}
        <p><strong>Description:</strong> {item.description}</p>

        {/* Payment Summary Box */}
        <div
          style={{
            padding: '14px 16px',
            borderRadius: '8px',
            backgroundColor: isPaid ? '#f0fdf4' : '#f8fafc',
            border: `1px solid ${isPaid ? '#bbf7d0' : '#e2e8f0'}`,
          }}
        >
          <div className="row" style={{ justifyContent: 'space-between', alignItems: 'center' }}>
            <div>
              <h4 style={{ margin: '0 0 4px 0' }}>Consultation Payment</h4>
              <p className="muted" style={{ margin: 0, fontSize: '0.88rem' }}>
                {isPaid
                  ? `Verified sandbox transaction: ${payment?.razorpayPaymentId || 'Recorded'}`
                  : 'Fee is pending payment. Pay via Razorpay sandbox test card.'}
              </p>
              {payment && (
                <p style={{ margin: '4px 0 0 0', fontSize: '0.85rem' }}>
                  <strong>Amount:</strong> {formatFee(payment.amount)} · <strong>Method:</strong> {payment.paymentMethod || 'Online'}
                </p>
              )}
            </div>

            {role === 'user' && !isPaid && (
              <Button type="button" onClick={() => setCheckoutModalOpen(true)}>
                Pay Now (Test Mode)
              </Button>
            )}

            {isPaid && (
              <Link to="/app/payments" className="btn btn-outline btn-sm">
                View in Payment History
              </Link>
            )}
          </div>
        </div>

        {/* Role action buttons */}
        <div className="row" style={{ gap: 8, marginTop: 8 }}>
          {role === 'user' && (item.status === 'pending' || item.status === 'accepted') ? (
            <Button type="button" variant="danger" onClick={() => setStatus('cancelled')}>Cancel request</Button>
          ) : null}
          {role === 'lawyer' && item.status === 'pending' ? (
            <div className="row" style={{ gap: 8 }}>
              <Button type="button" onClick={() => setStatus('accepted')}>Accept</Button>
              <Button type="button" variant="danger" onClick={() => setStatus('rejected')}>Reject</Button>
            </div>
          ) : null}
          {role === 'lawyer' && item.status === 'accepted' ? (
            <Button type="button" variant="gold" onClick={() => setStatus('completed')}>Mark completed</Button>
          ) : null}
        </div>
      </article>

      {/* Razorpay Checkout Modal */}
      {item && (
        <RazorpayCheckoutModal
          isOpen={checkoutModalOpen}
          onClose={() => {
            setCheckoutModalOpen(false);
            loadData();
          }}
          consultation={item}
          onPaymentSuccess={() => {
            loadData();
          }}
        />
      )}
    </div>
  );
}
