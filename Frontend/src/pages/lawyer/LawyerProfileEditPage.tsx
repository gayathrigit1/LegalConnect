import { FormEvent, useEffect, useState } from 'react';
import { lawyerService } from '../../services/lawyerService';
import type { AvailabilityStatus, Lawyer } from '../../types';
import { TextField, TextAreaField, SelectField, Button } from '../../components/forms/Fields';
import { LoadingSpinner, PageHeader } from '../../components/common/Feedback';
import { minLength, required } from '../../utils/validators';

const LAWYER_ID = 'lawyer-1';

export function LawyerProfileEditPage() {
  const [lawyer, setLawyer] = useState<Lawyer | undefined>();
  const [loading, setLoading] = useState(true);
  const [saved, setSaved] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  useEffect(() => {
    lawyerService.getById(LAWYER_ID).then(setLawyer).finally(() => setLoading(false));
  }, []);

  if (loading || !lawyer) return <LoadingSpinner />;
  const profile = lawyer;

  async function onSubmit(event: FormEvent) {
    event.preventDefault();
    const next: Record<string, string> = {};
    const nameErr = required(profile.fullName, 'Full name') || minLength(profile.fullName, 3, 'Full name');
    if (nameErr) next.fullName = nameErr;
    if (!profile.specialization) next.specialization = 'Specialization is required.';
    if (profile.consultationFee <= 0) next.fee = 'Enter a consultation fee.';
    setErrors(next);
    if (Object.keys(next).length) return;
    const updated = await lawyerService.update(LAWYER_ID, profile);
    setLawyer(updated);
    setSaved(true);
  }

  return (
    <div className="stack">
      <PageHeader title="Lawyer profile" subtitle="Edit the demo lawyer record used for this dashboard." />
      <form className="card stack" onSubmit={onSubmit}>
        {saved ? <div className="banner banner-info">Saved in mock data. This is not a real professional listing.</div> : null}
        <TextField label="Full name" value={lawyer.fullName} onChange={(e) => setLawyer({ ...lawyer, fullName: e.target.value })} error={errors.fullName} />
        <TextField label="Specialization" value={lawyer.specialization} onChange={(e) => setLawyer({ ...lawyer, specialization: e.target.value })} error={errors.specialization} />
        <TextField label="Location" value={lawyer.location} onChange={(e) => setLawyer({ ...lawyer, location: e.target.value })} />
        <TextField label="Consultation fee (INR)" type="number" value={lawyer.consultationFee} onChange={(e) => setLawyer({ ...lawyer, consultationFee: Number(e.target.value) })} error={errors.fee} />
        <SelectField label="Availability" value={lawyer.availability} onChange={(e) => setLawyer({ ...lawyer, availability: e.target.value as AvailabilityStatus })}>
          <option value="available">Available</option>
          <option value="busy">Busy</option>
          <option value="unavailable">Unavailable</option>
        </SelectField>
        <TextAreaField label="Bio" value={lawyer.bio} onChange={(e) => setLawyer({ ...lawyer, bio: e.target.value })} />
        <TextAreaField label="Relevant experience" value={lawyer.relevantExperience} onChange={(e) => setLawyer({ ...lawyer, relevantExperience: e.target.value })} />
        <Button type="submit">Save profile</Button>
      </form>
    </div>
  );
}
