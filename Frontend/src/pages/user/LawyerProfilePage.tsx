import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { lawyerService } from '../../services/lawyerService';
import { reviewService } from '../../services/reviewService';
import { consultationService } from '../../services/consultationService';
import { caseService } from '../../services/caseService';
import { useAuth } from '../../context/AuthContext';
import type { Consultation, ConsultationType, Lawyer, LegalCase, Review } from '../../types';
import { EmptyState, LoadingSpinner, PageHeader } from '../../components/common/Feedback';
import { RatingStars } from '../../components/common/RatingStars';
import { StatusBadge } from '../../components/common/StatusBadge';
import { formatFee, formatDate } from '../../utils/formatters';
import { useComparison } from '../../context/ComparisonContext';
import { Button, SelectField, TextAreaField, TextField } from '../../components/forms/Fields';
import { Modal } from '../../components/common/Modal';
import { RazorpayCheckoutModal } from '../../components/payment/RazorpayCheckoutModal';
import { required } from '../../utils/validators';

export function LawyerProfilePage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();
  const { toggleLawyer, lawyerIds } = useComparison();
  const [lawyer, setLawyer] = useState<Lawyer | undefined>();
  const [reviews, setReviews] = useState<Review[]>([]);
  const [cases, setCases] = useState<LegalCase[]>([]);
  const [loading, setLoading] = useState(true);

  // Booking Modal State
  const [bookingModalOpen, setBookingModalOpen] = useState(false);
  const [preferredDate, setPreferredDate] = useState('');
  const [preferredTime, setPreferredTime] = useState('');
  const [type, setType] = useState<ConsultationType>('video');
  const [description, setDescription] = useState('');
  const [caseId, setCaseId] = useState('');
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [submitting, setSubmitting] = useState(false);

  // Razorpay Checkout Modal State
  const [activeConsultation, setActiveConsultation] = useState<Consultation | null>(null);
  const [checkoutModalOpen, setCheckoutModalOpen] = useState(false);

  useEffect(() => {
    if (!id) return;
    Promise.all([
      lawyerService.getById(id),
      reviewService.listByLawyer(id),
      user ? caseService.listByUser(user.id) : Promise.resolve([]),
    ])
      .then(([profile, reviewItems, userCases]) => {
        setLawyer(profile);
        setReviews(reviewItems);
        setCases(userCases);
      })
      .finally(() => setLoading(false));
  }, [id, user]);

  if (loading) return <LoadingSpinner />;
  if (!lawyer) return <EmptyState title="Lawyer not found" text="This demo profile does not exist." />;

  async function handleProceedToPayment(e: React.FormEvent) {
    e.preventDefault();
    if (!user || !lawyer) return;

    const nextErrors: Record<string, string> = {};
    const dateErr = required(preferredDate, 'Preferred date');
    if (dateErr) nextErrors.preferredDate = dateErr;
    const timeErr = required(preferredTime, 'Preferred time');
    if (timeErr) nextErrors.preferredTime = timeErr;
    const descErr = required(description, 'Description');
    if (descErr) nextErrors.description = descErr;

    setErrors(nextErrors);
    if (Object.keys(nextErrors).length > 0) return;

    setSubmitting(true);
    try {
      const relatedCase = cases.find((c) => c.id === caseId);
      const created = await consultationService.create({
        userId: user.id,
        userName: user.fullName,
        lawyerId: lawyer.id,
        lawyerName: lawyer.fullName,
        caseId: relatedCase?.id,
        caseTitle: relatedCase?.title,
        preferredDate,
        preferredTime,
        description,
        type,
      });

      setBookingModalOpen(false);
      setActiveConsultation(created);
      setCheckoutModalOpen(true);
    } catch (err) {
      alert(err instanceof Error ? err.message : 'Could not create consultation request.');
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <div className="stack">
      <PageHeader title={lawyer.fullName} subtitle="Fictional demo profile. Not a real advocate listing.">
        <Button type="button" variant="outline" onClick={() => navigate('/app/lawyers')}>Back to lawyers</Button>
      </PageHeader>
      <div className="grid-2">
        <article className="card stack">
          <div className="row">
            <div className="avatar">{lawyer.avatarInitials}</div>
            <StatusBadge status={lawyer.verificationStatus} />
          </div>
          <p>{lawyer.bio}</p>
          <p><strong>Qualifications:</strong> {lawyer.qualifications.join(', ')}</p>
          <p><strong>Specializations:</strong> {lawyer.specializations.join(', ')}</p>
          <p><strong>Experience:</strong> {lawyer.yearsOfExperience} years</p>
          <p><strong>Location:</strong> {lawyer.location}</p>
          <p><strong>Fee:</strong> {formatFee(lawyer.consultationFee)}</p>
          <p><strong>Availability:</strong> <StatusBadge status={lawyer.availability} /></p>
          <RatingStars value={lawyer.rating} />
          <p><strong>Relevant experience:</strong> {lawyer.relevantExperience}</p>
          <div className="row" style={{ flexWrap: 'wrap', gap: '8px' }}>
            <Button
              type="button"
              onClick={() => {
                if (!preferredDate) {
                  // Default to tomorrow's date
                  const tomorrow = new Date();
                  tomorrow.setDate(tomorrow.getDate() + 1);
                  setPreferredDate(tomorrow.toISOString().split('T')[0]);
                }
                if (!preferredTime) setPreferredTime('14:00');
                setBookingModalOpen(true);
              }}
            >
              Book & Pay Consultation
            </Button>
            <Button type="button" variant="gold" onClick={() => toggleLawyer(lawyer.id)}>
              {lawyerIds.includes(lawyer.id) ? 'In comparison' : 'Add to comparison'}
            </Button>
          </div>
        </article>
        <article className="card">
          <h3>Reviews</h3>
          {reviews.length === 0 ? <p className="muted">No reviews yet.</p> : reviews.map((review) => (
            <div key={review.id} style={{ marginBottom: 12 }}>
              <strong>{review.userName}</strong>
              <RatingStars value={review.rating} />
              <p>{review.comment}</p>
              <p className="muted">{formatDate(review.createdAt)}</p>
            </div>
          ))}
        </article>
      </div>

      {/* Book Consultation Modal */}
      <Modal
        open={bookingModalOpen}
        onClose={() => setBookingModalOpen(false)}
        title={`Book Consultation with ${lawyer.fullName}`}
      >
        <form className="stack" onSubmit={handleProceedToPayment} style={{ gap: 14 }}>
          {/* Test Mode Notification */}
          <div
            style={{
              padding: '10px 14px',
              borderRadius: '6px',
              backgroundColor: '#fffbeb',
              border: '1px solid #fde68a',
              color: '#92400e',
              fontSize: '0.85rem',
            }}
          >
            <strong>⚡ TEST MODE:</strong> This appointment will be processed using Razorpay Sandbox. Consultation fee: <strong>{formatFee(lawyer.consultationFee)}</strong>.
          </div>

          <SelectField label="Associated Case (optional)" value={caseId} onChange={(e) => setCaseId(e.target.value)}>
            <option value="">None / General Inquiry</option>
            {cases.map((c) => <option key={c.id} value={c.id}>{c.title}</option>)}
          </SelectField>

          <div className="grid-2">
            <TextField
              label="Preferred date"
              type="date"
              value={preferredDate}
              onChange={(e) => setPreferredDate(e.target.value)}
              error={errors.preferredDate}
            />
            <TextField
              label="Preferred time"
              type="time"
              value={preferredTime}
              onChange={(e) => setPreferredTime(e.target.value)}
              error={errors.preferredTime}
            />
          </div>

          <SelectField
            label="Consultation mode"
            value={type}
            onChange={(e) => setType(e.target.value as ConsultationType)}
          >
            <option value="video">Video Call (Online)</option>
            <option value="phone">Phone Consultation</option>
            <option value="in_person">In-Person Office Visit</option>
          </SelectField>

          <TextAreaField
            label="Matter description / Questions for the advocate"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            error={errors.description}
            placeholder="Briefly describe your legal inquiry or dispute..."
          />

          <div className="row" style={{ justifyContent: 'space-between', alignItems: 'center', marginTop: 8 }}>
            <span style={{ fontWeight: 600, fontSize: '1.05rem' }}>
              Total: {formatFee(lawyer.consultationFee)}
            </span>
            <div className="row" style={{ gap: 8 }}>
              <Button type="button" variant="outline" onClick={() => setBookingModalOpen(false)}>
                Cancel
              </Button>
              <Button type="submit" disabled={submitting}>
                {submitting ? 'Creating...' : 'Proceed to Payment (Test Mode)'}
              </Button>
            </div>
          </div>
        </form>
      </Modal>

      {/* Razorpay Checkout Modal */}
      {activeConsultation && (
        <RazorpayCheckoutModal
          isOpen={checkoutModalOpen}
          onClose={() => {
            setCheckoutModalOpen(false);
            setActiveConsultation(null);
          }}
          consultation={activeConsultation}
          lawyer={lawyer}
          onPaymentSuccess={() => {
            // Keep modal open to show verified receipt, user clicks done
          }}
        />
      )}
    </div>
  );
}
