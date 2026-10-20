import { FormEvent, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { TextField, Button } from '../../components/forms/Fields';
import { isEmail, minLength, required } from '../../utils/validators';

export function LoginPage() {
  const { login, loading } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const from = (location.state as { from?: string } | null)?.from;
  const [email, setEmail] = useState('user@demo.com');
  const [password, setPassword] = useState('demo123');
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [formError, setFormError] = useState('');

  function validate() {
    const next: Record<string, string> = {};
    const emailReq = required(email, 'Email');
    if (emailReq) next.email = emailReq;
    else if (!isEmail(email)) next.email = 'Enter a valid email address.';
    const passReq = required(password, 'Password');
    if (passReq) next.password = passReq;
    else {
      const short = minLength(password, 6, 'Password');
      if (short) next.password = short;
    }
    setErrors(next);
    return Object.keys(next).length === 0;
  }

  async function onSubmit(event: FormEvent) {
    event.preventDefault();
    setFormError('');
    if (!validate()) return;
    try {
      const user = await login(email, password);
      if (from) navigate(from, { replace: true });
      else if (user.role === 'admin') navigate('/admin');
      else if (user.role === 'lawyer') navigate('/lawyer');
      else navigate('/app');
    } catch (err) {
      setFormError(err instanceof Error ? err.message : 'Unable to sign in.');
    }
  }

  return (
    <div className="auth-wrap">
      <form className="card auth-card stack" onSubmit={onSubmit} noValidate>
        <h1 className="serif" style={{ margin: 0 }}>Sign in</h1>
        <p className="muted">Mock authentication for the college demonstration.</p>
        <div className="demo-box">
          Demo accounts (password <strong>demo123</strong>): user@demo.com · lawyer@demo.com · admin@demo.com
        </div>
        {formError ? <div className="banner">{formError}</div> : null}
        <TextField label="Email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} error={errors.email} />
        <TextField label="Password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} error={errors.password} />
        <Button type="submit" disabled={loading}>{loading ? 'Signing in…' : 'Login'}</Button>
        <p className="muted">No account? <Link to="/register">Register</Link></p>
      </form>
    </div>
  );
}
