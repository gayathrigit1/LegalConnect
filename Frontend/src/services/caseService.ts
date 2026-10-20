import type { LegalCase } from '../types';
import { mockCases } from '../data/cases';
import { delay } from './api';

export const caseService = {
  async listByUser(userId: string): Promise<LegalCase[]> {
    await delay();
    return mockCases.filter((item) => item.userId === userId || item.assignedLawyerId === mapLawyerId(userId));
  },

  async listAll(): Promise<LegalCase[]> {
    await delay();
    return [...mockCases];
  },

  async getById(id: string): Promise<LegalCase | undefined> {
    await delay();
    return mockCases.find((item) => item.id === id);
  },
};

function mapLawyerId(userId: string): string | undefined {
  if (userId === 'lawyer-user-1') return 'lawyer-1';
  return undefined;
}
