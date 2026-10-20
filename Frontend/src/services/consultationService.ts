import type { Consultation, ConsultationStatus } from '../types';
import { mockConsultations } from '../data/consultations';
import { delay } from './api';

export interface ConsultationRequestPayload {
  userId: string;
  userName: string;
  lawyerId: string;
  lawyerName: string;
  caseId?: string;
  caseTitle?: string;
  preferredDate: string;
  preferredTime: string;
  description: string;
  type: Consultation['type'];
}

export const consultationService = {
  async listByUser(userId: string): Promise<Consultation[]> {
    await delay();
    return mockConsultations.filter((item) => item.userId === userId);
  },

  async listByLawyer(lawyerId: string): Promise<Consultation[]> {
    await delay();
    return mockConsultations.filter((item) => item.lawyerId === lawyerId);
  },

  async listAll(): Promise<Consultation[]> {
    await delay();
    return [...mockConsultations];
  },

  async getById(id: string): Promise<Consultation | undefined> {
    await delay();
    return mockConsultations.find((item) => item.id === id);
  },

  async create(payload: ConsultationRequestPayload): Promise<Consultation> {
    await delay(600);
    const created: Consultation = {
      id: `consult-${Date.now()}`,
      ...payload,
      status: 'pending',
      createdAt: new Date().toISOString(),
    };
    mockConsultations.unshift(created);
    return created;
  },

  async updateStatus(id: string, status: ConsultationStatus): Promise<Consultation> {
    await delay();
    const item = mockConsultations.find((consult) => consult.id === id);
    if (!item) throw new Error('Consultation not found.');
    item.status = status;
    return item;
  },
};
