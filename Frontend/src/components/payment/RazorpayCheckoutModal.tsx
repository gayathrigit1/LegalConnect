import { useState } from 'react';
import { loadRazorpayScript } from '../../utils/razorpay';
import { paymentService } from '../../services/paymentService';
import { consultationService } from '../../services/consultationService';
import type { Consultation, Lawyer, PaymentRecord } from '../../types';
import { Modal } from '../common/Modal';
import { Button } from '../forms/Fields';
import { formatFee, formatDate } from '../../utils/formatters';

interface RazorpayCheckoutModalProps {
  isOpen: boolean;
  onClose: () => void;
  consultation: Consultation;
  lawyer?: Lawyer;
  onPaymentSuccess?: (payment: PaymentRecord) => void;
}

export function RazorpayCheckoutModal({
  isOpen,
  onClose,
  consultation,
  lawyer,
  onPaymentSuccess,
}: RazorpayCheckoutModalProps) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [verifiedPayment, setVerifiedPayment] = useState<PaymentRecord | null>(null);

  const fee = lawyer?.consultationFee || 500;

  async function handlePay() {
    setLoading(true);
    setError(null);

    try {
      // 1. Ensure Razorpay Standard Checkout SDK is loaded
      const isLoaded = await loadRazorpayScript();
      if (!isLoaded) {
        throw new Error('Failed to load Razorpay checkout SDK. Please check your internet connection.');
      }

      // 2. Request backend to create Razorpay Order
      const order = await paymentService.createOrder(consultation.id);

      // 3. Configure Razorpay Standard Checkout options
      const options = {
        key: order.keyId,
        amount: order.amountInPaise,
        currency: order.currency || 'INR',
        name: 'LegalConnect',
        description: `Consultation with ${order.lawyerName || lawyer?.fullName || 'Lawyer'} (TEST MODE)`,
        order_id: order.orderId,
        prefill: {
          name: order.userName || '',
          email: order.userEmail || '',
          contact: order.userPhone || '',
        },
        notes: {
          consultationId: consultation.id,
          platform: 'LegalConnect',
        },
        theme: {
          color: '#1e293b',
        },
        modal: {
          ondismiss: () => {
            setLoading(false);
          },
        },
        handler: async (response: {
          razorpay_order_id: string;
          razorpay_payment_id: string;
          razorpay_signature: string;
        }) => {
          try {
            setLoading(true);
            // 4. Send signature and IDs to backend verification API
            const verified = await paymentService.verifyPayment({
              razorpayOrderId: response.razorpay_order_id,
              razorpayPaymentId: response.razorpay_payment_id,
              razorpaySignature: response.razorpay_signature,
            });

            // 5. Update local consultation status
            await consultationService.markPaid(consultation.id, verified.id);

            setVerifiedPayment(verified);
            if (onPaymentSuccess) {
              onPaymentSuccess(verified);
            }
          } catch (verifyErr) {
            setError(
              verifyErr instanceof Error
                ? verifyErr.message
                : 'Payment verification failed on the server. Please contact support.',
            );
          } finally {
            setLoading(false);
          }
        },
      };

      // 4. Open Razorpay Standard Checkout popup
      const rzp = new window.Razorpay(options);
      rzp.on('payment.failed', (failResp: { error?: { description?: string; reason?: string } }) => {
        const desc = failResp.error?.description || failResp.error?.reason || 'Payment failed in Razorpay checkout.';
        setError(desc);
        setLoading(false);
      });
      rzp.open();
    } catch (err: unknown) {
      const msg =
        (err as { response?: { data?: { message?: string } } })?.response?.data?.message ||
        (err instanceof Error ? err.message : 'Could not initialize payment order.');
      setError(msg);
      setLoading(false);
    }
  }

  function handleClose() {
    setVerifiedPayment(null);
    setError(null);
    setLoading(false);
    onClose();
  }

  return (
    <Modal open={isOpen} onClose={handleClose} title={verifiedPayment ? 'Payment Successful' : 'Complete Consultation Payment'}>
      {verifiedPayment ? (
        <div className="stack" style={{ gap: 16 }}>
          <div
            style={{
              padding: '16px',
              borderRadius: '8px',
              backgroundColor: '#ecfdf5',
              border: '1px solid #a7f3d0',
              color: '#065f46',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontWeight: 600, fontSize: '1.1rem' }}>
              <span>✓</span> Payment Verified Successfully!
            </div>
            <p style={{ marginTop: '6px', fontSize: '0.9rem' }}>
              Your test transaction has been verified by the LegalConnect backend and recorded in PostgreSQL.
            </p>
          </div>

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
            TEST MODE
          </div>

          <div className="stack" style={{ fontSize: '0.95rem', gap: '8px' }}>
            <p><strong>Lawyer:</strong> {verifiedPayment.lawyerName || lawyer?.fullName || consultation.lawyerName}</p>
            <p><strong>Consultation:</strong> {consultation.caseTitle || consultation.description}</p>
            <p><strong>Amount Paid:</strong> {formatFee(verifiedPayment.amount)} INR</p>
            <p><strong>Payment Status:</strong> <span style={{ color: '#059669', fontWeight: 600 }}>SUCCESS</span></p>
            <p><strong>Payment Method:</strong> {verifiedPayment.paymentMethod || 'Card / Online'}</p>
            <p><strong>Payment ID:</strong> <code style={{ fontSize: '0.85rem' }}>{verifiedPayment.id}</code></p>
            {verifiedPayment.razorpayPaymentId && (
              <p><strong>Razorpay Payment ID:</strong> <code style={{ fontSize: '0.85rem' }}>{verifiedPayment.razorpayPaymentId}</code></p>
            )}
            {verifiedPayment.razorpayOrderId && (
              <p><strong>Razorpay Order ID:</strong> <code style={{ fontSize: '0.85rem' }}>{verifiedPayment.razorpayOrderId}</code></p>
            )}
            <p className="muted" style={{ fontSize: '0.85rem' }}>Paid on {formatDate(verifiedPayment.createdAt)}</p>
          </div>

          <div className="row" style={{ marginTop: 8, justifyContent: 'flex-end' }}>
            <Button type="button" onClick={handleClose}>Done</Button>
          </div>
        </div>
      ) : (
        <div className="stack" style={{ gap: 16 }}>
          {/* Prominent TEST MODE Banner */}
          <div
            style={{
              padding: '12px 14px',
              borderRadius: '8px',
              backgroundColor: '#fffbeb',
              border: '1px solid #fde68a',
              color: '#92400e',
              fontSize: '0.9rem',
              display: 'flex',
              flexDirection: 'column',
              gap: '4px',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontWeight: 700 }}>
              <span style={{ fontSize: '1.1rem' }}>⚠️</span> RAZORPAY TEST MODE
            </div>
            <span>
              This is a demonstration sandbox payment. No real money will be charged. You can use official Razorpay test cards to complete checkout.
            </span>
          </div>

          {error && (
            <div
              style={{
                padding: '12px',
                borderRadius: '6px',
                backgroundColor: '#fef2f2',
                border: '1px solid #fecaca',
                color: '#991b1b',
                fontSize: '0.9rem',
              }}
            >
              {error}
            </div>
          )}

          <div className="card" style={{ padding: '16px', backgroundColor: '#f8fafc' }}>
            <h4 style={{ margin: '0 0 10px 0' }}>Booking Summary</h4>
            <div className="stack" style={{ gap: '6px', fontSize: '0.92rem' }}>
              <p><strong>Advocate:</strong> {lawyer?.fullName || consultation.lawyerName}</p>
              <p><strong>Specialization:</strong> {lawyer?.specialization || 'Legal Consultation'}</p>
              <p><strong>When:</strong> {formatDate(consultation.preferredDate)} at {consultation.preferredTime}</p>
              <p><strong>Type:</strong> {consultation.type.toUpperCase()}</p>
              <div
                style={{
                  marginTop: '10px',
                  paddingTop: '10px',
                  borderTop: '1px dashed #cbd5e1',
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                }}
              >
                <span style={{ fontSize: '1rem', fontWeight: 600 }}>Consultation Fee:</span>
                <span style={{ fontSize: '1.25rem', fontWeight: 700, color: '#0f172a' }}>{formatFee(fee)}</span>
              </div>
            </div>
          </div>

          <div
            style={{
              padding: '10px 12px',
              borderRadius: '6px',
              backgroundColor: '#f1f5f9',
              fontSize: '0.82rem',
              color: '#475569',
            }}
          >
            <strong>Official Test Card:</strong> Card Number <code>4000 0000 0000 0002</code>, any future expiry (e.g. <code>12/28</code>), CVV <code>123</code>, OTP <code>123456</code>.
          </div>

          <div className="row" style={{ justifyContent: 'flex-end', marginTop: 8 }}>
            <Button type="button" variant="outline" onClick={handleClose} disabled={loading}>
              Cancel
            </Button>
            <Button type="button" onClick={handlePay} disabled={loading}>
              {loading ? 'Processing...' : `Pay ${formatFee(fee)} (Test Mode)`}
            </Button>
          </div>
        </div>
      )}
    </Modal>
  );
}
