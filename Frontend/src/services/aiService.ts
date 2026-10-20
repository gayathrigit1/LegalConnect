import type { AiAnalysisResult, Recommendation } from '../types';
import { mockRecommendations } from '../data/recommendations';
import { delay } from './api';

/**
 * Placeholder AI service. Replace delay/mock return with api.post once Spring Boot is ready.
 * The frontend never generates a live legal opinion.
 */
export const aiService = {
  async analyzeProblem(_problem: string, _file?: File | null): Promise<AiAnalysisResult> {
    await delay(1200);
    return {
      probableLegalDomain: 'Labour / Employment (demo classification)',
      importantInformation: [
        'Dates of employment, notice period, and last working day are relevant.',
        'Written offer letter, appointment letter, and resignation/termination emails should be preserved.',
        'Any settlement amounts already paid should be documented.',
      ],
      caseSummary:
        'This is a mock analysis result. A workplace notice-period or settlement issue may fall under labour and contract principles. A qualified lawyer should review the actual documents and facts.',
      keyPoints: [
        'The platform cannot determine liability or likely outcomes.',
        'Jurisdiction, contract wording, and company policy all affect next steps.',
        'Time-sensitive notices should be reviewed by a professional promptly.',
      ],
      recommendation:
        'Consult a qualified labour or employment lawyer before sending formal replies or signing a settlement.',
      disclaimer:
        'This output is a structured demo summary for academic demonstration. It is not legal advice and does not replace a lawyer.',
      source: 'backend-mock',
    };
  },

  async getRecommendations(_caseId?: string): Promise<Recommendation[]> {
    await delay();
    return mockRecommendations.map((item) => ({ ...item }));
  },
};
