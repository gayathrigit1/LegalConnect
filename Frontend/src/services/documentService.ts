import type { LegalDocument } from '../types';
import { mockDocuments } from '../data/documents';
import { delay } from './api';

export const documentService = {
  async listByUser(userId: string): Promise<LegalDocument[]> {
    await delay();
    return mockDocuments.filter((doc) => doc.userId === userId);
  },

  async upload(userId: string, file: File, caseId?: string, caseTitle?: string): Promise<LegalDocument> {
    await delay(700);
    const created: LegalDocument = {
      id: `doc-${Date.now()}`,
      userId,
      fileName: file.name,
      fileType: file.type || 'application/octet-stream',
      fileSizeKb: Math.max(1, Math.round(file.size / 1024)),
      uploadedAt: new Date().toISOString(),
      caseId,
      caseTitle,
      status: 'uploaded',
    };
    mockDocuments.unshift(created);
    return created;
  },

  async remove(id: string): Promise<void> {
    await delay(250);
    const index = mockDocuments.findIndex((doc) => doc.id === id);
    if (index !== -1) mockDocuments.splice(index, 1);
  },
};
