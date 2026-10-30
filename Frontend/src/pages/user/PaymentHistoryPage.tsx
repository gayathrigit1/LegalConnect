import { useEffect, useState } from 'react';
import { paymentService } from '../../services/paymentService';
import type { PaymentRecord } from '../../types';
import { EmptyState, LoadingSpinner, PageHeader } from '../../components/common/Feedback';
import { formatDate, formatFee } from '../../utils/formatters';
import { Button } from '../../components/forms/Fields';
import { Modal } from '../../components/common/Modal';

export function PaymentHistoryPage() {
  const [payments, setPayments] = useState<PaymentRecord[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedPayment, setSelectedPayment] = useState<PaymentRecord | null>(null);

  async function loadPayments() {
    setLoading(true);
    try {
      const records = await paymentService.getMyPayments();
      setPayments(records);
    } catch {
      setPayments([]);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadPayments();
  }, []);

  if (loading) return <LoadingSpinner />;

  return (
    <div className="stack" style={{ gap: 20 }}>
      <PageHeader
        title="Payment History"
        subtitle="View and verify consultation transactions processed via Razorpay Sandbox."
      >
        <Button type="button" variant="outline" onClick={loadPayments}>
          Refresh
        </Button>
      </PageHeader>

      {/* Prominent TEST MODE Banner */}
      <div
        style={{
          padding: '12px 16px',
          borderRadius: '8px',
          backgroundColor: '#fffbeb',
          border: '1px solid #fde68a',
          color: '#92400e',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          fontSize: '0.9rem',
        }}
      >
        <div>
          <strong>⚡ Razorpay TEST Mode Active:</strong> All transactions are processed in sandbox test mode. No actual money is deducted.
        </div>
        <span
          style={{
            padding: '4px 10px',
            borderRadius: '999px',
            backgroundColor: '#fef3c7',
            border: '1px solid #fcd34d',
            fontWeight: 700,
            fontSize: '0.75rem',
            letterSpacing: '0.5px',
          }}
        >
          SANDBOX
        </span>
      </div>

      {payments.length === 0 ? (
        <EmptyState
          title="No payment records yet"
          text="When you book and pay for legal consultations, verified transactions will appear here."
        />
      ) : (
        <div className="card" style={{ padding: 0, overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '0.92rem' }}>
            <thead>
              <tr style={{ borderBottom: '1px solid #e2e8f0', backgroundColor: '#f8fafc' }}>
                <th style={{ padding: '12px 16px' }}>Date</th>
                <th style={{ padding: '12px 16px' }}>Advocate</th>
                <th style={{ padding: '12px 16px' }}>Amount</th>
                <th style={{ padding: '12px 16px' }}>Status</th>
                <th style={{ padding: '12px 16px' }}>Method</th>
                <th style={{ padding: '12px 16px' }}>Razorpay ID</th>
                <th style={{ padding: '12px 16px', textAlign: 'right' }}>Action</th>
              </tr>
            </thead>
            <tbody>
              {payments.map((p) => {
                const isSuccess = p.status === 'SUCCESS';
                const statusColor = isSuccess ? '#059669' : p.status === 'FAILED' ? '#dc2626' : '#d97706';
                const statusBg = isSuccess ? '#ecfdf5' : p.status === 'FAILED' ? '#fef2f2' : '#fffbeb';

                return (
                  <tr key={p.id} style={{ borderBottom: '1px solid #f1f5f9' }}>
                    <td style={{ padding: '12px 16px', whiteSpace: 'nowrap' }}>{formatDate(p.createdAt)}</td>
                    <td style={{ padding: '12px 16px', fontWeight: 600 }}>{p.lawyerName || 'Advocate'}</td>
                    <td style={{ padding: '12px 16px', fontWeight: 600 }}>{formatFee(p.amount)}</td>
                    <td style={{ padding: '12px 16px' }}>
                      <span
                        style={{
                          padding: '4px 8px',
                          borderRadius: '4px',
                          fontSize: '0.78rem',
                          fontWeight: 700,
                          backgroundColor: statusBg,
                          color: statusColor,
                        }}
                      >
                        {p.status}
                      </span>
                    </td>
                    <td style={{ padding: '12px 16px' }}>{p.paymentMethod || 'Online'}</td>
                    <td style={{ padding: '12px 16px' }}>
                      <code style={{ fontSize: '0.8rem' }}>{p.razorpayPaymentId || p.razorpayOrderId}</code>
                    </td>
                    <td style={{ padding: '12px 16px', textAlign: 'right' }}>
                      <Button type="button" variant="outline" onClick={() => setSelectedPayment(p)}>
                        Receipt
                      </Button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}

      {selectedPayment && (
        <Modal
          open={true}
          onClose={() => setSelectedPayment(null)}
          title="Payment Transaction Receipt"
        >
          <div className="stack" style={{ gap: 14 }}>
            <div
              style={{
                display: 'inline-block',
                alignSelf: 'flex-start',
                padding: '4px 10px',
                borderRadius: '999px',
                fontSize: '0.8rem',
                fontWeight: 600,
                backgroundColor: '#fef3c7',
                color: '#92400e',
                border: '1px solid #fde68a',
              }}
            >
              TEST MODE TRANSACTION
            </div>

            <div className="stack" style={{ gap: 8, fontSize: '0.95rem' }}>
              <p><strong>Payment Status:</strong> <span style={{ color: selectedPayment.status === 'SUCCESS' ? '#059669' : '#dc2626', fontWeight: 700 }}>{selectedPayment.status}</span></p>
              <p><strong>Amount:</strong> {formatFee(selectedPayment.amount)} INR</p>
              <p><strong>Advocate:</strong> {selectedPayment.lawyerName || 'Advocate'}</p>
              {selectedPayment.caseTitle && <p><strong>Consultation:</strong> {selectedPayment.caseTitle}</p>}
              <p><strong>Payment Method:</strong> {selectedPayment.paymentMethod || 'Card / Online'}</p>
              <p><strong>Internal Payment ID:</strong> <code>{selectedPayment.id}</code></p>
              <p><strong>Razorpay Order ID:</strong> <code>{selectedPayment.razorpayOrderId}</code></p>
              {selectedPayment.razorpayPaymentId && (
                <p><strong>Razorpay Payment ID:</strong> <code>{selectedPayment.razorpayPaymentId}</code></p>
              )}
              {selectedPayment.failureReason && (
                <p style={{ color: '#dc2626' }}><strong>Failure Reason:</strong> {selectedPayment.failureReason}</p>
              )}
              <p className="muted" style={{ fontSize: '0.85rem' }}>Created: {formatDate(selectedPayment.createdAt)}</p>
            </div>

            <div className="row" style={{ justifyContent: 'flex-end', marginTop: 10 }}>
              <Button type="button" onClick={() => setSelectedPayment(null)}>
                Close
              </Button>
            </div>
          </div>
        </Modal>
      )}
    </div>
  );
}
