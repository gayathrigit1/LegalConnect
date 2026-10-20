export const APP_NAME = 'LegalConnect';

export const ALLOWED_DOCUMENT_TYPES = [
  'application/pdf',
  'application/msword',
  'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
  'image/jpeg',
  'image/png',
  'text/plain',
];

export const ALLOWED_DOCUMENT_EXTENSIONS = ['.pdf', '.doc', '.docx', '.jpg', '.jpeg', '.png', '.txt'];

export const MAX_DOCUMENT_SIZE_MB = 8;

export const NAV = {
  public: [
    { to: '/', label: 'Home' },
    { to: '/about', label: 'How It Works' },
    { to: '/login', label: 'Login' },
    { to: '/register', label: 'Register' },
  ],
  user: [
    { to: '/app', label: 'Dashboard' },
    { to: '/app/cases', label: 'My Cases' },
    { to: '/app/ai', label: 'AI Legal Assistance' },
    { to: '/app/documents', label: 'Documents' },
    { to: '/app/lawyers', label: 'Find Lawyers' },
    { to: '/app/compare', label: 'Compare Lawyers' },
    { to: '/app/consultations', label: 'Consultations' },
    { to: '/app/reviews', label: 'Reviews' },
    { to: '/app/profile', label: 'Profile' },
  ],
  lawyer: [
    { to: '/lawyer', label: 'Dashboard' },
    { to: '/lawyer/profile', label: 'Profile' },
    { to: '/lawyer/cases', label: 'Cases' },
    { to: '/lawyer/requests', label: 'Consultation Requests' },
    { to: '/lawyer/consultations', label: 'Consultations' },
    { to: '/lawyer/reviews', label: 'Reviews' },
    { to: '/lawyer/availability', label: 'Availability' },
  ],
  admin: [
    { to: '/admin', label: 'Overview' },
    { to: '/admin/users', label: 'User Management' },
    { to: '/admin/lawyers', label: 'Lawyer Management' },
    { to: '/admin/verification', label: 'Lawyer Verification' },
    { to: '/admin/domains', label: 'Legal Domains' },
    { to: '/admin/reviews', label: 'Review Management' },
    { to: '/admin/consultations', label: 'Consultation Monitoring' },
    { to: '/admin/reports', label: 'Reports' },
  ],
};
