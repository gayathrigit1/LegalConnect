import { Link } from 'react-router-dom';

const steps = [
  { n: '01', title: 'Describe the issue', text: 'Share your situation or upload a document. The UI collects context for later backend analysis.' },
  { n: '02', title: 'Review a structured brief', text: 'See domain, key points, and a reminder to consult a qualified lawyer. This is not legal advice.' },
  { n: '03', title: 'Discover matching lawyers', text: 'Browse profiles with filters. Match percentages come from the backend (mocked for now).' },
  { n: '04', title: 'Compare and consult', text: 'Compare attributes side by side, then request a consultation without ranking a “best” lawyer.' },
];

const features = [
  { icon: 'AI', title: 'AI Legal Assistance', text: 'A structured briefing workspace that will later call a Spring Boot AI endpoint.' },
  { icon: 'DOC', title: 'Document Analysis', text: 'Upload PDFs and Word files. Processing status is tracked in the UI; analysis stays on the backend.' },
  { icon: 'MAP', title: 'Intelligent Matching', text: 'Recommendations display backend-provided scores: domain, experience, location, fee, and availability.' },
  { icon: 'CMP', title: 'Lawyer Comparison', text: 'A factual comparison table. The frontend never invents a best-lawyer ranking.' },
  { icon: 'CAL', title: 'Consultation', text: 'Request video, phone, or in-person slots and track pending through completed statuses.' },
  { icon: 'REV', title: 'Reviews', text: 'Star ratings and comments after completed consultations, with frontend validation.' },
];

export function HomePage() {
  return (
    <>
      <section className="hero">
        <div className="container">
          <p className="badge">College project · frontend demo</p>
          <h1>AI-powered legal assistance and intelligent lawyer matching</h1>
          <p>
            LegalConnect helps people organise a legal problem, understand the likely domain, and find a suitable lawyer.
            The product is a demonstration UI. It does not replace a qualified advocate and does not give definitive legal advice.
          </p>
          <div className="hero-actions">
            <Link className="btn btn-gold" to="/login">Get Legal Assistance</Link>
            <Link className="btn btn-outline" style={{ color: '#fff', borderColor: 'rgba(255,255,255,.3)' }} to="/login">
              Find a Lawyer
            </Link>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <h2>How it works</h2>
          <p className="muted">Four steps from a messy problem statement to a consultation request.</p>
          <div className="grid-4" style={{ marginTop: 24 }}>
            {steps.map((step) => (
              <article className="card" key={step.n}>
                <div className="icon" style={{ color: 'var(--gold)', fontWeight: 800 }}>{step.n}</div>
                <h3>{step.title}</h3>
                <p className="muted">{step.text}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section alt">
        <div className="container">
          <h2>Platform capabilities</h2>
          <p className="muted">Built as a modular React frontend ready for REST integration.</p>
          <div className="grid-3" style={{ marginTop: 24 }}>
            {features.map((feature) => (
              <article className="card feature-card" key={feature.title}>
                <div className="icon">{feature.icon}</div>
                <h3>{feature.title}</h3>
                <p className="muted">{feature.text}</p>
              </article>
            ))}
          </div>
          <p className="disclaimer">
            Disclaimer: outputs shown in this application are mock/demo results for academic evaluation. Do not treat them as legal advice.
          </p>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="cta-band">
            <div>
              <h2 style={{ marginTop: 0 }}>Ready to try the demo?</h2>
              <p>Use the mock accounts on the login page. No real credentials are stored.</p>
            </div>
            <Link className="btn btn-gold" to="/register">Create a demo account</Link>
          </div>
        </div>
      </section>
    </>
  );
}
