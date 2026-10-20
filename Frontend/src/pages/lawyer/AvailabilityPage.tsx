import { FormEvent, useEffect, useState } from 'react';
import { lawyerService } from '../../services/lawyerService';
import type { Lawyer, LawyerAvailabilitySlot } from '../../types';
import { LoadingSpinner, PageHeader } from '../../components/common/Feedback';
import { TextField, Button } from '../../components/forms/Fields';

const LAWYER_ID = 'lawyer-1';
const DAYS = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

export function AvailabilityPage() {
  const [lawyer, setLawyer] = useState<Lawyer | undefined>();
  const [loading, setLoading] = useState(true);
  const [day, setDay] = useState('Monday');
  const [startTime, setStartTime] = useState('10:00');
  const [endTime, setEndTime] = useState('16:00');
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    lawyerService.getById(LAWYER_ID).then(setLawyer).finally(() => setLoading(false));
  }, []);

  if (loading || !lawyer) return <LoadingSpinner />;
  const profile = lawyer;

  async function persist(slots: LawyerAvailabilitySlot[]) {
    const updated = await lawyerService.update(LAWYER_ID, { availabilitySlots: slots });
    setLawyer(updated);
    setSaved(true);
  }

  async function onAdd(event: FormEvent) {
    event.preventDefault();
    if (endTime <= startTime) return;
    await persist([...profile.availabilitySlots, { day, startTime, endTime }]);
  }

  return (
    <div className="stack">
      <PageHeader title="Availability" subtitle="Demo weekly slots shown on the public lawyer profile." />
      {saved ? <div className="banner banner-info">Availability updated in mock data.</div> : null}
      <form className="card grid-3" onSubmit={onAdd} style={{ alignItems: 'end' }}>
        <label className="field">
          <span>Day</span>
          <select value={day} onChange={(e) => setDay(e.target.value)}>
            {DAYS.map((item) => <option key={item}>{item}</option>)}
          </select>
        </label>
        <TextField label="Start" type="time" value={startTime} onChange={(e) => setStartTime(e.target.value)} />
        <TextField label="End" type="time" value={endTime} onChange={(e) => setEndTime(e.target.value)} />
        <Button type="submit">Add slot</Button>
      </form>
      <div className="card stack">
        {profile.availabilitySlots.map((slot, index) => (
          <div className="row" key={`${slot.day}-${slot.startTime}-${index}`} style={{ justifyContent: 'space-between' }}>
            <span>{slot.day}: {slot.startTime} – {slot.endTime}</span>
            <Button
              type="button"
              variant="danger"
            onClick={() => persist(profile.availabilitySlots.filter((_, i) => i !== index))}
            >
              Remove
            </Button>
          </div>
        ))}
      </div>
    </div>
  );
}
