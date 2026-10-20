import type { Review } from '../types';

export const mockReviews: Review[] = [
  {
    id: 'review-1',
    lawyerId: 'lawyer-1',
    lawyerName: 'Kavya Iyer (Demo)',
    userId: 'user-2',
    userName: 'Rohit Nair',
    rating: 5,
    comment: 'Demo review: clear explanation of next steps. Not a real client testimonial.',
    createdAt: '2026-08-20T10:00:00.000Z',
  },
  {
    id: 'review-2',
    lawyerId: 'lawyer-1',
    lawyerName: 'Kavya Iyer (Demo)',
    userId: 'user-1',
    userName: 'Ananya Mehta',
    rating: 4,
    comment: 'Demo review: consultation was structured and timely.',
    createdAt: '2026-09-02T16:20:00.000Z',
  },
  {
    id: 'review-3',
    lawyerId: 'lawyer-2',
    lawyerName: 'Arjun Deshmukh (Demo)',
    userId: 'user-1',
    userName: 'Ananya Mehta',
    rating: 5,
    comment: 'Demo review used for rating display and admin moderation.',
    createdAt: '2026-06-11T09:15:00.000Z',
  },
  {
    id: 'review-4',
    lawyerId: 'lawyer-6',
    lawyerName: 'Vikram Sethi (Demo)',
    userId: 'user-1',
    userName: 'Ananya Mehta',
    rating: 4,
    comment: 'Demo review after a completed cyber-law consultation.',
    createdAt: '2026-08-13T18:00:00.000Z',
  },
];
