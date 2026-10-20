import { Navigate, Route, Routes } from 'react-router-dom';
import { PublicLayout } from './layouts/PublicLayout';
import { DashboardLayout } from './layouts/DashboardLayout';
import { ProtectedRoute } from './components/common/ProtectedRoute';
import { HomePage } from './pages/public/HomePage';
import { AboutPage } from './pages/public/AboutPage';
import { LoginPage } from './pages/auth/LoginPage';
import { RegisterPage } from './pages/auth/RegisterPage';
import { UserDashboard } from './pages/user/UserDashboard';
import { MyCasesPage } from './pages/user/MyCasesPage';
import { AiAssistancePage } from './pages/user/AiAssistancePage';
import { DocumentsPage } from './pages/user/DocumentsPage';
import { FindLawyersPage } from './pages/user/FindLawyersPage';
import { LawyerProfilePage } from './pages/user/LawyerProfilePage';
import { CompareLawyersPage } from './pages/user/CompareLawyersPage';
import { ConsultationsPage } from './pages/user/ConsultationsPage';
import { ConsultationDetailsPage } from './pages/user/ConsultationDetailsPage';
import { ReviewsPage } from './pages/user/ReviewsPage';
import { UserProfilePage } from './pages/user/UserProfilePage';
import { LawyerDashboard } from './pages/lawyer/LawyerDashboard';
import { LawyerProfileEditPage } from './pages/lawyer/LawyerProfileEditPage';
import { LawyerCasesPage } from './pages/lawyer/LawyerCasesPage';
import { LawyerConsultationsPage } from './pages/lawyer/LawyerConsultationsPage';
import { LawyerReviewsPage } from './pages/lawyer/LawyerReviewsPage';
import { AvailabilityPage } from './pages/lawyer/AvailabilityPage';
import { AdminDashboard } from './pages/admin/AdminDashboard';
import { UserManagementPage } from './pages/admin/UserManagementPage';
import { LawyerManagementPage } from './pages/admin/LawyerManagementPage';
import { LawyerVerificationPage } from './pages/admin/LawyerVerificationPage';
import { DomainManagementPage } from './pages/admin/DomainManagementPage';
import { ReviewManagementPage } from './pages/admin/ReviewManagementPage';
import { ConsultationMonitoringPage } from './pages/admin/ConsultationMonitoringPage';
import { ReportsPage } from './pages/admin/ReportsPage';

export default function App() {
  return (
    <Routes>
      <Route element={<PublicLayout />}>
        <Route path="/" element={<HomePage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
      </Route>

      <Route element={<ProtectedRoute roles={['user']} />}>
        <Route element={<DashboardLayout role="user" />}>
          <Route path="/app" element={<UserDashboard />} />
          <Route path="/app/cases" element={<MyCasesPage />} />
          <Route path="/app/ai" element={<AiAssistancePage />} />
          <Route path="/app/documents" element={<DocumentsPage />} />
          <Route path="/app/lawyers" element={<FindLawyersPage />} />
          <Route path="/app/lawyers/:id" element={<LawyerProfilePage />} />
          <Route path="/app/compare" element={<CompareLawyersPage />} />
          <Route path="/app/consultations" element={<ConsultationsPage />} />
          <Route path="/app/consultations/:id" element={<ConsultationDetailsPage role="user" />} />
          <Route path="/app/reviews" element={<ReviewsPage />} />
          <Route path="/app/profile" element={<UserProfilePage />} />
        </Route>
      </Route>

      <Route element={<ProtectedRoute roles={['lawyer']} />}>
        <Route element={<DashboardLayout role="lawyer" />}>
          <Route path="/lawyer" element={<LawyerDashboard />} />
          <Route path="/lawyer/profile" element={<LawyerProfileEditPage />} />
          <Route path="/lawyer/cases" element={<LawyerCasesPage />} />
          <Route path="/lawyer/requests" element={<LawyerConsultationsPage requestsOnly />} />
          <Route path="/lawyer/consultations" element={<LawyerConsultationsPage />} />
          <Route path="/lawyer/consultations/:id" element={<ConsultationDetailsPage role="lawyer" />} />
          <Route path="/lawyer/reviews" element={<LawyerReviewsPage />} />
          <Route path="/lawyer/availability" element={<AvailabilityPage />} />
        </Route>
      </Route>

      <Route element={<ProtectedRoute roles={['admin']} />}>
        <Route element={<DashboardLayout role="admin" />}>
          <Route path="/admin" element={<AdminDashboard />} />
          <Route path="/admin/users" element={<UserManagementPage />} />
          <Route path="/admin/lawyers" element={<LawyerManagementPage />} />
          <Route path="/admin/verification" element={<LawyerVerificationPage />} />
          <Route path="/admin/domains" element={<DomainManagementPage />} />
          <Route path="/admin/reviews" element={<ReviewManagementPage />} />
          <Route path="/admin/consultations" element={<ConsultationMonitoringPage />} />
          <Route path="/admin/reports" element={<ReportsPage />} />
        </Route>
      </Route>

      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}
