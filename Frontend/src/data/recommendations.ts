import type { Recommendation } from '../types';

/**
 * Match scores are provided as mock backend values.
 * The frontend must not calculate or invent ranking scores.
 */
export const mockRecommendations: Recommendation[] = [
  {
    lawyerId: 'lawyer-5',
    matchPercentage: 91,
    legalDomainRelevance: 94,
    relevantExperienceScore: 88,
    locationCompatibility: 72,
    feeCompatibility: 90,
    rating: 4.3,
    availability: 'unavailable',
    explanation:
      'Backend-mock: labour-domain relevance and fee band aligned with the workplace notice-period case.',
    source: 'backend-mock',
  },
  {
    lawyerId: 'lawyer-1',
    matchPercentage: 84,
    legalDomainRelevance: 70,
    relevantExperienceScore: 82,
    locationCompatibility: 80,
    feeCompatibility: 86,
    rating: 4.6,
    availability: 'available',
    explanation:
      'Backend-mock: strong availability and rating; domain overlap is moderate for this demo case.',
    source: 'backend-mock',
  },
  {
    lawyerId: 'lawyer-4',
    matchPercentage: 78,
    legalDomainRelevance: 65,
    relevantExperienceScore: 80,
    locationCompatibility: 85,
    feeCompatibility: 88,
    rating: 4.4,
    availability: 'available',
    explanation:
      'Backend-mock: location and fee compatibility are high; legal-domain relevance is secondary here.',
    source: 'backend-mock',
  },
];
