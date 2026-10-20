export type UserRole = 'user' | 'lawyer' | 'admin';

export type VerificationStatus = 'pending' | 'verified' | 'rejected';

export type CaseStatus = 'open' | 'in_progress' | 'closed';

export type DocumentStatus = 'uploaded' | 'processing' | 'processed' | 'failed';

export type ConsultationStatus =
  | 'pending'
  | 'accepted'
  | 'rejected'
  | 'completed'
  | 'cancelled';

export type ConsultationType = 'video' | 'in_person' | 'phone';

export type AvailabilityStatus = 'available' | 'busy' | 'unavailable';

export interface User {
  id: string;
  fullName: string;
  email: string;
  phone: string;
  role: UserRole;
  avatarUrl?: string;
  location?: string;
  createdAt: string;
}

export interface LawyerAvailabilitySlot {
  day: string;
  startTime: string;
  endTime: string;
}

export interface Lawyer {
  id: string;
  userId: string;
  fullName: string;
  email: string;
  phone: string;
  avatarInitials: string;
  specialization: string;
  specializations: string[];
  legalDomains: string[];
  yearsOfExperience: number;
  location: string;
  consultationFee: number;
  rating: number;
  reviewCount: number;
  availability: AvailabilityStatus;
  verificationStatus: VerificationStatus;
  qualifications: string[];
  relevantExperience: string;
  bio: string;
  availabilitySlots: LawyerAvailabilitySlot[];
  profileCompletion: number;
  isDemo: true;
}

export interface LegalCase {
  id: string;
  userId: string;
  title: string;
  domain: string;
  summary: string;
  status: CaseStatus;
  createdAt: string;
  updatedAt: string;
  assignedLawyerId?: string;
}

export interface LegalDocument {
  id: string;
  userId: string;
  fileName: string;
  fileType: string;
  fileSizeKb: number;
  uploadedAt: string;
  caseId?: string;
  caseTitle?: string;
  status: DocumentStatus;
}

export interface Consultation {
  id: string;
  userId: string;
  userName: string;
  lawyerId: string;
  lawyerName: string;
  caseId?: string;
  caseTitle?: string;
  preferredDate: string;
  preferredTime: string;
  description: string;
  type: ConsultationType;
  status: ConsultationStatus;
  createdAt: string;
}

export interface Review {
  id: string;
  lawyerId: string;
  lawyerName: string;
  userId: string;
  userName: string;
  rating: number;
  comment: string;
  createdAt: string;
}

export interface Recommendation {
  lawyerId: string;
  matchPercentage: number;
  legalDomainRelevance: number;
  relevantExperienceScore: number;
  locationCompatibility: number;
  feeCompatibility: number;
  rating: number;
  availability: AvailabilityStatus;
  explanation: string;
  source: 'backend-mock';
}

export interface AiAnalysisResult {
  probableLegalDomain: string;
  importantInformation: string[];
  caseSummary: string;
  keyPoints: string[];
  recommendation: string;
  disclaimer: string;
  source: 'backend-mock';
}

export interface NotificationItem {
  id: string;
  title: string;
  message: string;
  createdAt: string;
  read: boolean;
}

export interface LegalDomain {
  id: string;
  name: string;
  description: string;
  active: boolean;
}

export interface AuthSession {
  token: string;
  user: User;
}

export interface PaginatedResult<T> {
  items: T[];
  total: number;
  page: number;
  pageSize: number;
}

export interface LawyerFilters {
  search: string;
  domain: string;
  specialization: string;
  minExperience: number;
  location: string;
  maxFee: number;
  minRating: number;
  availability: string;
  sortBy: 'rating' | 'fee' | 'experience' | 'name';
}

export interface AdminStats {
  totalUsers: number;
  totalLawyers: number;
  verifiedLawyers: number;
  pendingVerifications: number;
  totalConsultations: number;
  pendingConsultations: number;
  totalReviews: number;
  openCases: number;
}
