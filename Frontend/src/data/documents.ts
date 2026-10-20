import type { LegalDocument } from '../types';

export const mockDocuments: LegalDocument[] = [
  {
    id: 'doc-1',
    userId: 'user-1',
    fileName: 'rental-agreement-demo.pdf',
    fileType: 'application/pdf',
    fileSizeKb: 420,
    uploadedAt: '2026-08-03T10:15:00.000Z',
    caseId: 'case-1',
    caseTitle: 'Rental deposit recovery (demo)',
    status: 'processed',
  },
  {
    id: 'doc-2',
    userId: 'user-1',
    fileName: 'settlement-letter-demo.docx',
    fileType: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
    fileSizeKb: 88,
    uploadedAt: '2026-09-02T09:40:00.000Z',
    caseId: 'case-2',
    caseTitle: 'Workplace notice-period dispute (demo)',
    status: 'processing',
  },
  {
    id: 'doc-3',
    userId: 'user-1',
    fileName: 'invoice-copy-demo.jpg',
    fileType: 'image/jpeg',
    fileSizeKb: 210,
    uploadedAt: '2026-05-15T12:00:00.000Z',
    caseId: 'case-3',
    caseTitle: 'Consumer refund for defective appliance (demo)',
    status: 'uploaded',
  },
];
