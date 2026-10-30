import type { Consultation, ConsultationStatus } from '../types';
import { mockConsultations } from '../data/consultations';
import { api, delay } from './api';

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
    try {
      const response = await api.get<Consultation[]>('/consultations/my-consultations');
      if (Array.isArray(response.data)) {
        return response.data;
      }
    } catch {
      // Fallback to local mock if backend offline
    }
    await delay();
    return mockConsultations.filter((item) => item.userId === userId);
  },

  async listByLawyer(lawyerId: string): Promise<Consultation[]> {
    try {
      const response = await api.get<Consultation[]>('/consultations/my-consultations');
      if (Array.isArray(response.data)) {
        return response.data;
      }
    } catch {
      // Fallback
    }
    await delay();
    return mockConsultations.filter((item) => item.lawyerId === lawyerId);
  },

  async listAll(): Promise<Consultation[]> {
    try {
      const response = await api.get<Consultation[]>('/consultations/all');
      if (Array.isArray(response.data)) {
        return response.data;
      }
    } catch {
      // Fallback
    }
    await delay();
    return [...mockConsultations];
  },

  async getById(id: string): Promise<Consultation | undefined> {
    try {
      const response = await api.get<Consultation>(`/consultations/${id}`);
      if (response.data) {
        return response.data;
      }
    } catch {
      // Fallback
    }
    await delay();
    return mockConsultations.find((item) => item.id === id);
  },

  async create(payload: ConsultationRequestPayload): Promise<Consultation> {
    try {
      const response = await api.post<Consultation>('/consultations', payload);
      if (response.data && response.data.id) {
        // Also keep local mock list updated for seamless UX
        mockConsultations.unshift(response.data);
        return response.data;
      }
      throw new Error('Consultation was not returned by server');
    } catch (e: unknown) {
      const msg =
        (e as { response?: { data?: { message?: string } } })?.response?.data?.message ||
        (e instanceof Error ? e.message : 'Could not create consultation request on backend');
      throw new Error(msg);
    }
  },

  async updateStatus(id: string, status: ConsultationStatus): Promise<Consultation> {
    try {
      if (status === 'accepted') {
        const response = await api.put<Consultation>(`/consultations/${id}/accept`);
        return response.data;
      } else if (status === 'rejected') {
        const response = await api.put<Consultation>(`/consultations/${id}/reject`);
        return response.data;
      }
    } catch {
      // Fallback
    }
    await delay();
    const item = mockConsultations.find((consult) => consult.id === id);
    if (!item) throw new Error('Consultation not found.');
    item.status = status;
    return item;
  },

  async markPaid(id: string, paymentId: string): Promise<void> {
    const item = mockConsultations.find((consult) => consult.id === id);
    if (item) {
      item.paymentStatus = 'PAID';
      item.paymentId = paymentId;
    }
  },
};
