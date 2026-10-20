import type { Review } from '../types';
import { mockReviews } from '../data/reviews';
import { delay } from './api';

export interface ReviewPayload {
  lawyerId: string;
  lawyerName: string;
  userId: string;
  userName: string;
  rating: number;
  comment: string;
}

export const reviewService = {
  async listByLawyer(lawyerId: string): Promise<Review[]> {
    await delay();
    return mockReviews.filter((review) => review.lawyerId === lawyerId);
  },

  async listByUser(userId: string): Promise<Review[]> {
    await delay();
    return mockReviews.filter((review) => review.userId === userId);
  },

  async listAll(): Promise<Review[]> {
    await delay();
    return [...mockReviews];
  },

  async create(payload: ReviewPayload): Promise<Review> {
    await delay(500);
    const created: Review = {
      id: `review-${Date.now()}`,
      ...payload,
      createdAt: new Date().toISOString(),
    };
    mockReviews.unshift(created);
    return created;
  },

  async remove(id: string): Promise<void> {
    await delay();
    const index = mockReviews.findIndex((review) => review.id === id);
    if (index !== -1) mockReviews.splice(index, 1);
  },
};
