import type { AdminStats, LegalDomain } from '../types';
import { mockUsers } from '../data/users';
import { mockLawyers } from '../data/lawyers';
import { mockConsultations } from '../data/consultations';
import { mockReviews } from '../data/reviews';
import { mockCases } from '../data/cases';
import { mockLegalDomains } from '../data/legalDomains';
import { delay } from './api';

export const adminService = {
  async getStats(): Promise<AdminStats> {
    await delay();
    return {
      totalUsers: mockUsers.filter((user) => user.role === 'user').length,
      totalLawyers: mockLawyers.length,
      verifiedLawyers: mockLawyers.filter((lawyer) => lawyer.verificationStatus === 'verified').length,
      pendingVerifications: mockLawyers.filter((lawyer) => lawyer.verificationStatus === 'pending').length,
      totalConsultations: mockConsultations.length,
      pendingConsultations: mockConsultations.filter((item) => item.status === 'pending').length,
      totalReviews: mockReviews.length,
      openCases: mockCases.filter((item) => item.status !== 'closed').length,
    };
  },

  async listDomains(): Promise<LegalDomain[]> {
    await delay();
    return [...mockLegalDomains];
  },

  async toggleDomain(id: string): Promise<LegalDomain> {
    await delay();
    const domain = mockLegalDomains.find((item) => item.id === id);
    if (!domain) throw new Error('Domain not found.');
    domain.active = !domain.active;
    return domain;
  },
};
