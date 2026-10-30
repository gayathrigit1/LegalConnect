import type { Lawyer, LawyerFilters, PaginatedResult, VerificationStatus } from '../types';
import { mockLawyers } from '../data/lawyers';
import { api, delay } from './api';

export const lawyerService = {
  async list(): Promise<Lawyer[]> {
    try {
      const response = await api.get<Lawyer[]>('/lawyers/browse');
      if (Array.isArray(response.data) && response.data.length > 0) {
        return response.data;
      }
    } catch {
      // Fallback
    }
    await delay();
    return [...mockLawyers];
  },

  async getById(id: string): Promise<Lawyer | undefined> {
    try {
      const response = await api.get<Lawyer>(`/lawyers/${id}`);
      if (response.data) {
        return response.data;
      }
    } catch {
      // Fallback
    }
    await delay(250);
    return mockLawyers.find((lawyer) => lawyer.id === id);
  },

  async search(filters: LawyerFilters, page = 1, pageSize = 6): Promise<PaginatedResult<Lawyer>> {
    await delay();
    let items = [...mockLawyers];

    if (filters.search) {
      const q = filters.search.toLowerCase();
      items = items.filter(
        (lawyer) =>
          lawyer.fullName.toLowerCase().includes(q) ||
          lawyer.specialization.toLowerCase().includes(q) ||
          lawyer.location.toLowerCase().includes(q),
      );
    }
    if (filters.domain) {
      items = items.filter((lawyer) => lawyer.legalDomains.includes(filters.domain));
    }
    if (filters.specialization) {
      items = items.filter((lawyer) => lawyer.specializations.includes(filters.specialization));
    }
    if (filters.minExperience) {
      items = items.filter((lawyer) => lawyer.yearsOfExperience >= filters.minExperience);
    }
    if (filters.location) {
      items = items.filter((lawyer) => lawyer.location === filters.location);
    }
    if (filters.maxFee) {
      items = items.filter((lawyer) => lawyer.consultationFee <= filters.maxFee);
    }
    if (filters.minRating) {
      items = items.filter((lawyer) => lawyer.rating >= filters.minRating);
    }
    if (filters.availability) {
      items = items.filter((lawyer) => lawyer.availability === filters.availability);
    }

    items.sort((a, b) => {
      switch (filters.sortBy) {
        case 'fee':
          return a.consultationFee - b.consultationFee;
        case 'experience':
          return b.yearsOfExperience - a.yearsOfExperience;
        case 'name':
          return a.fullName.localeCompare(b.fullName);
        default:
          return b.rating - a.rating;
      }
    });

    const total = items.length;
    const start = (page - 1) * pageSize;
    return {
      items: items.slice(start, start + pageSize),
      total,
      page,
      pageSize,
    };
  },

  async update(id: string, updates: Partial<Lawyer>): Promise<Lawyer> {
    await delay();
    const index = mockLawyers.findIndex((lawyer) => lawyer.id === id);
    if (index === -1) throw new Error('Lawyer not found.');
    mockLawyers[index] = { ...mockLawyers[index], ...updates, id: mockLawyers[index].id, isDemo: true };
    return mockLawyers[index];
  },

  async setVerification(id: string, verificationStatus: VerificationStatus): Promise<Lawyer> {
    return this.update(id, { verificationStatus });
  },
};
