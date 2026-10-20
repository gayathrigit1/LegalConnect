import type { LegalDomain } from '../types';

export const mockLegalDomains: LegalDomain[] = [
  { id: 'domain-1', name: 'Family', description: 'Marriage, custody, and related civil family matters (demo).', active: true },
  { id: 'domain-2', name: 'Criminal', description: 'Criminal procedure and related demo categories.', active: true },
  { id: 'domain-3', name: 'Corporate', description: 'Company, contracts, and compliance demo category.', active: true },
  { id: 'domain-4', name: 'Property', description: 'Tenancy, title, and real-estate demo category.', active: true },
  { id: 'domain-5', name: 'Labour', description: 'Employment and workplace demo category.', active: true },
  { id: 'domain-6', name: 'Cyber', description: 'IT, data, and cyber-complaint demo category.', active: true },
  { id: 'domain-7', name: 'Consumer', description: 'Consumer forum and product-service demo category.', active: true },
  { id: 'domain-8', name: 'Tax', description: 'Direct and indirect tax demo category.', active: true },
  { id: 'domain-9', name: 'Civil', description: 'General civil disputes demo category.', active: false },
];

export const SPECIALIZATIONS = [
  'Family Law',
  'Criminal Law',
  'Corporate Law',
  'Property Law',
  'Labour Law',
  'Cyber Law',
  'Consumer Law',
  'Tax Law',
  'Mediation',
  'Contracts',
];

export const LOCATIONS = [
  'Mumbai, Maharashtra',
  'Pune, Maharashtra',
  'Bengaluru, Karnataka',
  'Hyderabad, Telangana',
  'Kolkata, West Bengal',
  'Delhi, NCR',
  'Chennai, Tamil Nadu',
  'Ahmedabad, Gujarat',
];
