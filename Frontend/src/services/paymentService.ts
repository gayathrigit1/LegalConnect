import { api } from './api';
import type { CreateOrderResponse, PaymentRecord, VerifyPaymentPayload } from '../types';

export interface RazorpayPublicConfig {
  keyId: string;
  currency: string;
  isConfigured: boolean;
  mode: string;
}

export const paymentService = {
  async getConfig(): Promise<RazorpayPublicConfig> {
    const response = await api.get<RazorpayPublicConfig>('/payments/config');
    return response.data;
  },

  async createOrder(consultationId: string): Promise<CreateOrderResponse> {
    const response = await api.post<CreateOrderResponse>('/payments/create-order', {
      consultationId,
    });
    return response.data;
  },

  async verifyPayment(payload: VerifyPaymentPayload): Promise<PaymentRecord> {
    const response = await api.post<PaymentRecord>('/payments/verify', payload);
    return response.data;
  },

  async getMyPayments(): Promise<PaymentRecord[]> {
    const response = await api.get<PaymentRecord[]>('/payments/my-payments');
    return response.data;
  },

  async getPaymentByConsultation(consultationId: string): Promise<PaymentRecord> {
    const response = await api.get<PaymentRecord>(`/payments/consultation/${consultationId}`);
    return response.data;
  },

  async getPaymentById(paymentId: string): Promise<PaymentRecord> {
    const response = await api.get<PaymentRecord>(`/payments/${paymentId}`);
    return response.data;
  },

  async getAllPayments(): Promise<PaymentRecord[]> {
    const response = await api.get<PaymentRecord[]>('/payments/all');
    return response.data;
  },
};
