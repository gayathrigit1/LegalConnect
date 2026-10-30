import type { AiAnalysisResult, Recommendation } from '../types';
import { api } from './api';

/**
 * AI case analysis service.
 * Connects to the Spring Boot backend deterministic analysis engine.
 */
export const aiService = {
  /**
   * Submits a legal problem description for case analysis.
   * POST /api/ai/analyze
   */
  async analyzeProblem(problem: string, file?: File | null): Promise<AiAnalysisResult> {
    if (file) {
      const formData = new FormData();
      formData.append('problemDescription', problem);
      formData.append('file', file);
      const response = await api.post<AiAnalysisResult>('/ai/analyze', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      return response.data;
    }

    const response = await api.post<AiAnalysisResult>('/ai/analyze', {
      problemDescription: problem,
      problem: problem,
    });
    return response.data;
  },

  /**
   * Fetches ranked lawyer recommendations from the backend for the given legal domain.
   * GET /api/ai/recommendations?domain=...
   */
  async getRecommendations(domain?: string): Promise<Recommendation[]> {
    const params = domain && domain.trim() ? { domain: domain.trim() } : {};
    const response = await api.get<Recommendation[]>('/ai/recommendations', { params });
    return response.data;
  },
};
