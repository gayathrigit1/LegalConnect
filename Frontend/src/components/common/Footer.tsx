import { Link } from 'react-router-dom';
import { APP_NAME } from '../../utils/constants';

export function Footer() {
  return (
    <footer className="footer">
      <div className="container footer-grid">
        <div>
          <strong>{APP_NAME}</strong>
          <p>AI-powered legal assistance and intelligent lawyer matching. Academic demonstration frontend only.</p>
        </div>
        <div>
          <strong>Explore</strong>
          <div className="stack">
            <Link to="/about">How it works</Link>
            <Link to="/login">Login</Link>
            <Link to="/register">Register</Link>
          </div>
        </div>
        <div>
          <strong>Notice</strong>
          <p>This platform does not provide legal advice and does not replace a qualified lawyer.</p>
        </div>
      </div>
      <div className="container copy">© {new Date().getFullYear()} {APP_NAME} · College project demo · Mock data</div>
    </footer>
  );
}
