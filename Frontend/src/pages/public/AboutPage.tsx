export function AboutPage() {
  return (
    <div className="page">
      <div className="container stack">
        <h1 className="serif">How LegalConnect works</h1>
        <p className="muted">A walkthrough of the academic frontend and the planned backend boundary.</p>
        <div className="card">
          <h2>1. Capture the problem</h2>
          <p>Users describe the issue and optionally upload documents. Validation happens in the browser. Files are not sent to a live AI model in this build.</p>
        </div>
        <div className="card">
          <h2>2. Structured assistance</h2>
          <p>The AI assistance page shows a loading state, then a mock structured result: probable domain, important information, summary, key points, and a recommendation to consult a lawyer.</p>
        </div>
        <div className="card">
          <h2>3. Matching and comparison</h2>
          <p>Lawyer cards, filters, pagination, and a comparison table consume mock data. Match percentages are labelled as backend-mock values and are not computed in React.</p>
        </div>
        <div className="card">
          <h2>4. Consultations and reviews</h2>
          <p>Users request consultations, lawyers accept or reject them, and reviews can be submitted after completed sessions — all in local mock state via the service layer.</p>
        </div>
        <p className="disclaimer">This platform does not provide legal advice and does not replace a lawyer.</p>
      </div>
    </div>
  );
}
