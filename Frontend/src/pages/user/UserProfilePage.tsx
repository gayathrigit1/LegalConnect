import { FormEvent, useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { TextField, Button } from '../../components/forms/Fields';
import { PageHeader } from '../../components/common/Feedback';
import { isEmail, isPhone, minLength, required } from '../../utils/validators';

export function UserProfilePage() {
  const { user, updateUser } = useAuth();
  const [fullName, setFullName] = useState(user?.fullName || '');
  const [email, setEmail] = useState(user?.email || '');
  const [phone, setPhone] = useState(user?.phone || '');
  const [location, setLocation] = useState(user?.location || '');
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [saved, setSaved] = useState(false);

  async function onSubmit(event: FormEvent) {
    event.preventDefault();
    const next: Record<string, string> = {};
    const nameErr = required(fullName, 'Full name') || minLength(fullName, 3, 'Full name');
    if (nameErr) next.fullName = nameErr;
    if (!isEmail(email)) next.email = 'Enter a valid email address.';
    if (!isPhone(phone)) next.phone = 'Enter a valid phone number.';
    setErrors(next);
    if (Object.keys(next).length) return;
    await updateUser({ fullName, email, phone, location });
    setSaved(true);
  }

  return (
    <div className="stack">
      <PageHeader title="Profile" subtitle="Edit your demo user profile." />
      <form className="card stack" onSubmit={onSubmit}>
        {saved ? <div className="banner banner-info">Profile updated in mock session storage.</div> : null}
        <TextField label="Full name" value={fullName} onChange={(e) => setFullName(e.target.value)} error={errors.fullName} />
        <TextField label="Email" value={email} onChange={(e) => setEmail(e.target.value)} error={errors.email} />
        <TextField label="Phone" value={phone} onChange={(e) => setPhone(e.target.value)} error={errors.phone} />
        <TextField label="Location" value={location} onChange={(e) => setLocation(e.target.value)} />
        <Button type="submit">Save changes</Button>
      </form>
    </div>
  );
}
