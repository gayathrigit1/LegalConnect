import { FormEvent, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { TextField, SelectField, Button } from '../../components/forms/Fields';
import { isEmail, isPhone, minLength, required } from '../../utils/validators';
import type { UserRole } from '../../types';

export function RegisterPage() {
  const { register, loading } = useAuth();
  const navigate = useNavigate();
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirm, setConfirm] = useState('');
  const [phone, setPhone] = useState('');
  const [role, setRole] = useState<UserRole>('user');
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [formError, setFormError] = useState('');

  function validate() {
    const next: Record<string, string> = {};
    const nameErr = required(fullName, 'Full name') || minLength(fullName, 3, 'Full name');
    if (nameErr) next.fullName = nameErr;
    const emailReq = required(email, 'Email');
    if (emailReq) next.email = emailReq;
    else if (!isEmail(email)) next.email = 'Enter a valid email address.';
    const passErr = required(password, 'Password') || minLength(password, 6, 'Password');
    if (passErr) next.password = passErr;
    if (confirm !== password) next.confirm = 'Passwords do not match.';
    const phoneErr = required(phone, 'Phone number');
    if (phoneErr) next.phone = phoneErr;
    else if (!isPhone(phone)) next.phone = 'Enter a valid phone number.';
    if (role !== 'user' && role !== 'lawyer') next.role = 'Select User or Lawyer.';
    setErrors(next);
    return Object.keys(next).length === 0;
  }

  async function onSubmit(event: FormEvent) {
    event.preventDefault();
    setFormError('');
    if (!validate()) return;
    try {
      const user = await register({ fullName, email, password, phone, role });
      navigate(user.role === 'lawyer' ? '/lawyer' : '/app');
    } catch (err) {
      setFormError(err instanceof Error ? err.message : 'Unable to register.');
    }
  }

  return (
    <div className="auth-wrap">
      <form className="card auth-card stack" onSubmit={onSubmit} noValidate>
        <h1 className="serif" style={{ margin: 0 }}>Create account</h1>
        <p className="muted">Registration is stored in browser mock data only.</p>
        {formError ? <div className="banner">{formError}</div> : null}
        <TextField label="Full name" value={fullName} onChange={(e) => setFullName(e.target.value)} error={errors.fullName} />
        <TextField label="Email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} error={errors.email} />
        <TextField label="Password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} error={errors.password} />
        <TextField label="Confirm password" type="password" value={confirm} onChange={(e) => setConfirm(e.target.value)} error={errors.confirm} />
        <TextField label="Phone number" value={phone} onChange={(e) => setPhone(e.target.value)} error={errors.phone} />
        <SelectField label="Role" value={role} onChange={(e) => setRole(e.target.value as UserRole)} error={errors.role}>
          <option value="user">User</option>
          <option value="lawyer">Lawyer</option>
        </SelectField>
        <Button type="submit" disabled={loading}>{loading ? 'Creating…' : 'Register'}</Button>
        <p className="muted">Already registered? <Link to="/login">Login</Link></p>
      </form>
    </div>
  );
}
