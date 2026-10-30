import { FormEvent, useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { consultationService } from '../../services/consultationService';
import { lawyerService } from '../../services/lawyerService';
import { caseService } from '../../services/caseService';
import type { Consultation, ConsultationType, LegalCase, Lawyer } from '../../types';
import { ConsultationCard } from '../../components/common/ConsultationCard';
import { EmptyState, LoadingSpinner, PageHeader } from '../../components/common/Feedback';
import { SelectField, TextAreaField, TextField, Button } from '../../components/forms/Fields';
import { required } from '../../utils/validators';
import { RazorpayCheckoutModal } from '../../components/payment/RazorpayCheckoutModal';

export function ConsultationsPage() {
  const { user } = useAuth();
  const [params] = useSearchParams();
  const [items, setItems] = useState<Consultation[]>([]);
  const [lawyers, setLawyers] = useState<Lawyer[]>([]);
  const [cases, setCases] = useState<LegalCase[]>([]);
  const [loading, setLoading] = useState(true);
  const [lawyerId, setLawyerId] = useState(params.get('lawyerId') || '');
  const [caseId, setCaseId] = useState('');
  const [preferredDate, setPreferredDate] = useState('');
  const [preferredTime, setPreferredTime] = useState('');
  const [description, setDescription] = useState('');
  const [type, setType] = useState<ConsultationType>('video');
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [formError, setFormError] = useState('');

  // Payment Modal
  const [checkoutModalOpen, setCheckoutModalOpen] = useState(false);
  const [selectedConsultation, setSelectedConsultation] = useState<Consultation | null>(null);

  async function refresh() {
    if (!user) return;
    const [consults, lawyerItems, caseItems] = await Promise.all([
      consultationService.listByUser(user.id),
      lawyerService.list(),
      caseService.listByUser(user.id),
    ]);
    setItems(consults);
    setLawyers(lawyerItems);
    setCases(caseItems);
  }

  useEffect(() => {
    refresh().finally(() => setLoading(false));
  }, [user]);

  async function onSubmit(event: FormEvent) {
    event.preventDefault();
    if (!user) return;
    const next: Record<string, string> = {};
    if (!lawyerId) next.lawyerId = 'Select a lawyer.';
    const dateErr = required(preferredDate, 'Preferred date');
    if (dateErr) next.preferredDate = dateErr;
    const timeErr = required(preferredTime, 'Preferred time');
    if (timeErr) next.preferredTime = timeErr;
    const descErr = required(description, 'Description');
    if (descErr) next.description = descErr;
    setErrors(next);
    setFormError('');
    if (Object.keys(next).length) return;
    const lawyer = lawyers.find((item) => item.id === lawyerId);
    const related = cases.find((item) => item.id === caseId);
    try {
      const created = await consultationService.create({
        userId: user.id,
        userName: user.fullName,
        lawyerId,
        lawyerName: lawyer?.fullName || 'Demo lawyer',
        caseId: related?.id,
        caseTitle: related?.title,
        preferredDate,
        preferredTime,
        description,
        type,
      });
      setDescription('');
      await refresh();

      // Automatically offer payment checkout for newly created consultation
      setSelectedConsultation(created);
      setCheckoutModalOpen(true);
    } catch (err) {
      setFormError(err instanceof Error ? err.message : 'Could not submit request.');
    }
  }

  function handlePayClick(consultation: Consultation) {
    setSelectedConsultation(consultation);
    setCheckoutModalOpen(true);
  }

  if (loading) return <LoadingSpinner />;

  const activeLawyer = selectedConsultation
    ? lawyers.find((l) => l.id === selectedConsultation.lawyerId)
    : undefined;

  return (
    <div className="stack">
      <PageHeader
        title="Consultations"
        subtitle="Request appointment slots, track consultation approval, and complete Razorpay sandbox payments."
      />

      <form className="card stack" onSubmit={onSubmit}>
        <h3>Request New Consultation</h3>
        {formError ? <div className="banner">{formError}</div> : null}
        <SelectField label="Lawyer" value={lawyerId} onChange={(e) => setLawyerId(e.target.value)} error={errors.lawyerId}>
          <option value="">Select</option>
          {lawyers.map((lawyer) => (
            <option key={lawyer.id} value={lawyer.id}>
              {lawyer.fullName} ({lawyer.specialization} - ₹{lawyer.consultationFee})
            </option>
          ))}
        </SelectField>
        <SelectField label="Case (optional)" value={caseId} onChange={(e) => setCaseId(e.target.value)}>
          <option value="">None</option>
          {cases.map((item) => <option key={item.id} value={item.id}>{item.title}</option>)}
        </SelectField>
        <div className="grid-2">
          <TextField label="Preferred date" type="date" value={preferredDate} onChange={(e) => setPreferredDate(e.target.value)} error={errors.preferredDate} />
          <TextField label="Preferred time" type="time" value={preferredTime} onChange={(e) => setPreferredTime(e.target.value)} error={errors.preferredTime} />
        </div>
        <SelectField label="Consultation type" value={type} onChange={(e) => setType(e.target.value as ConsultationType)}>
          <option value="video">Video Call (Online)</option>
          <option value="phone">Phone</option>
          <option value="in_person">In person</option>
        </SelectField>
        <TextAreaField label="Description" value={description} onChange={(e) => setDescription(e.target.value)} error={errors.description} />
        <Button type="submit">Submit & Proceed to Payment</Button>
      </form>

      <div className="stack" style={{ gap: 12, marginTop: 12 }}>
        <h3>Your Consultation Requests</h3>
        {items.length === 0 ? (
          <EmptyState title="No consultations" text="Submitted requests will appear in this list." />
        ) : (
          <div className="grid-2">
            {items.map((item) => (
              <ConsultationCard
                key={item.id}
                item={item}
                basePath="/app/consultations"
                onPay={handlePayClick}
              />
            ))}
          </div>
        )}
      </div>

      {selectedConsultation && (
        <RazorpayCheckoutModal
          isOpen={checkoutModalOpen}
          onClose={() => {
            setCheckoutModalOpen(false);
            setSelectedConsultation(null);
            refresh();
          }}
          consultation={selectedConsultation}
          lawyer={activeLawyer}
          onPaymentSuccess={() => {
            refresh();
          }}
        />
      )}
    </div>
  );
}
