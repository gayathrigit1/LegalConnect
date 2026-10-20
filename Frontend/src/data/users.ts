import type { User } from '../types';

/** Demo accounts for frontend mock authentication. Not real users. */
export const mockUsers: User[] = [
  {
    id: 'user-1',
    fullName: 'Ananya Mehta',
    email: 'user@demo.com',
    phone: '+91 98765 01001',
    role: 'user',
    location: 'Pune, Maharashtra',
    createdAt: '2026-01-12T09:00:00.000Z',
  },
  {
    id: 'user-2',
    fullName: 'Rohit Nair',
    email: 'rohit.nair@demo.com',
    phone: '+91 98765 01002',
    role: 'user',
    location: 'Bengaluru, Karnataka',
    createdAt: '2026-02-03T11:20:00.000Z',
  },
  {
    id: 'lawyer-user-1',
    fullName: 'Kavya Iyer',
    email: 'lawyer@demo.com',
    phone: '+91 98765 02001',
    role: 'lawyer',
    location: 'Mumbai, Maharashtra',
    createdAt: '2025-11-18T08:00:00.000Z',
  },
  {
    id: 'admin-1',
    fullName: 'Campus Admin',
    email: 'admin@demo.com',
    phone: '+91 98765 03001',
    role: 'admin',
    location: 'Campus Lab',
    createdAt: '2025-10-01T08:00:00.000Z',
  },
];

export const DEMO_PASSWORD = 'demo123';
