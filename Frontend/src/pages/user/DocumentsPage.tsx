import { FormEvent, useEffect, useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { documentService } from '../../services/documentService';
import { caseService } from '../../services/caseService';
import type { LegalCase, LegalDocument } from '../../types';
import { EmptyState, LoadingSpinner, PageHeader } from '../../components/common/Feedback';
import { StatusBadge } from '../../components/common/StatusBadge';
import { SelectField, Button } from '../../components/forms/Fields';
import { validateFile } from '../../utils/validators';
import { ALLOWED_DOCUMENT_TYPES, MAX_DOCUMENT_SIZE_MB } from '../../utils/constants';
import { formatDate } from '../../utils/formatters';
import { Modal } from '../../components/common/Modal';

export function DocumentsPage() {
  const { user } = useAuth();
  const [docs, setDocs] = useState<LegalDocument[]>([]);
  const [cases, setCases] = useState<LegalCase[]>([]);
  const [loading, setLoading] = useState(true);
  const [file, setFile] = useState<File | null>(null);
  const [caseId, setCaseId] = useState('');
  const [error, setError] = useState('');
  const [viewing, setViewing] = useState<LegalDocument | null>(null);

  async function refresh() {
    if (!user) return;
    const [documents, caseItems] = await Promise.all([
      documentService.listByUser(user.id),
      caseService.listByUser(user.id),
    ]);
    setDocs(documents);
    setCases(caseItems);
  }

  useEffect(() => {
    refresh().finally(() => setLoading(false));
  }, [user]);

  async function onUpload(event: FormEvent) {
    event.preventDefault();
    setError('');
    if (!user || !file) {
      setError('Choose a file to upload.');
      return;
    }
    const fileError = validateFile(file, ALLOWED_DOCUMENT_TYPES, MAX_DOCUMENT_SIZE_MB);
    if (fileError) {
      setError(fileError);
      return;
    }
    const related = cases.find((item) => item.id === caseId);
    await documentService.upload(user.id, file, related?.id, related?.title);
    setFile(null);
    await refresh();
  }

  if (loading) return <LoadingSpinner />;

  return (
    <div className="stack">
      <PageHeader title="Documents" subtitle="Upload is stored in mock memory. Processing will be handled by the backend later." />
      <form className="card stack" onSubmit={onUpload}>
        <label className="field">
          <span>Select file (PDF, Word, JPG, PNG, TXT · max {MAX_DOCUMENT_SIZE_MB} MB)</span>
          <input type="file" onChange={(e) => setFile(e.target.files?.[0] ?? null)} />
        </label>
        <SelectField label="Associated case" value={caseId} onChange={(e) => setCaseId(e.target.value)}>
          <option value="">None</option>
          {cases.map((item) => <option key={item.id} value={item.id}>{item.title}</option>)}
        </SelectField>
        {error ? <div className="banner">{error}</div> : null}
        <Button type="submit">Upload document</Button>
      </form>
      {docs.length === 0 ? (
        <EmptyState title="No documents" text="Upload a file to see it listed here." />
      ) : (
        <div className="table-wrap card" style={{ padding: 0 }}>
          <table>
            <thead>
              <tr>
                <th>File name</th>
                <th>Type</th>
                <th>Uploaded</th>
                <th>Case</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {docs.map((doc) => (
                <tr key={doc.id}>
                  <td>{doc.fileName}</td>
                  <td>{doc.fileType}</td>
                  <td>{formatDate(doc.uploadedAt)}</td>
                  <td>{doc.caseTitle || '—'}</td>
                  <td><StatusBadge status={doc.status} /></td>
                  <td className="row">
                    <Button type="button" variant="outline" onClick={() => setViewing(doc)}>View</Button>
                    <a className="btn btn-outline btn-sm" href={`data:text/plain,Demo download for ${encodeURIComponent(doc.fileName)}`} download={doc.fileName}>Download</a>
                    <Button type="button" variant="danger" onClick={async () => { await documentService.remove(doc.id); await refresh(); }}>Delete</Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
      <Modal open={Boolean(viewing)} title={viewing?.fileName || 'Document'} onClose={() => setViewing(null)}>
        {viewing ? (
          <div className="stack">
            <p>Type: {viewing.fileType}</p>
            <p>Size: {viewing.fileSizeKb} KB</p>
            <p>Status: {viewing.status}</p>
            <p className="muted">File contents are not stored in this frontend demo.</p>
          </div>
        ) : null}
      </Modal>
    </div>
  );
}
