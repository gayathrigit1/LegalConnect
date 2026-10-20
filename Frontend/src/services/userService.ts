import type { User } from '../types';
import { mockUsers } from '../data/users';
import { delay } from './api';

export const userService = {
  async list(): Promise<User[]> {
    await delay();
    return [...mockUsers];
  },

  async getById(id: string): Promise<User | undefined> {
    await delay();
    return mockUsers.find((user) => user.id === id);
  },

  async updateProfile(id: string, updates: Partial<User>): Promise<User> {
    await delay();
    const index = mockUsers.findIndex((user) => user.id === id);
    if (index === -1) throw new Error('User not found.');
    mockUsers[index] = { ...mockUsers[index], ...updates, id: mockUsers[index].id };
    return mockUsers[index];
  },
};
