// import { useEffect, useState } from 'react';
// import { consultationService } from '../../services/consultationService';
// import { reviewService } from '../../services/reviewService';
// import { lawyerService } from '../../services/lawyerService';
// import { caseService } from '../../services/caseService';
// import { useAuth } from '../../context/AuthContext';
// import type { Consultation, Lawyer, Review } from '../../types';
// import { ConsultationCard } from '../../components/common/ConsultationCard';
// import { LoadingSpinner, PageHeader } from '../../components/common/Feedback';
// import { RatingStars } from '../../components/common/RatingStars';
// import { formatDate } from '../../utils/formatters';

// const LAWYER_ID = 'lawyer-1';

// export function LawyerDashboard() {
//   const { user } = useAuth();
//   const [loading, setLoading] = useState(true);
//   const [profile, setProfile] = useState<Lawyer | undefined>();
//   const [consults, setConsults] = useState<Consultation[]>([]);
//   const [reviews, setReviews] = useState<Review[]>([]);
//   const [caseCount, setCaseCount] = useState(0);

//   useEffect(() => {
//     Promise.all([
//       lawyerService.getById(LAWYER_ID),
//       consultationService.listByLawyer(LAWYER_ID),
//       reviewService.listByLawyer(LAWYER_ID),
//       user ? caseService.listByUser(user.id) : Promise.resolve([]),
//     ]).then(([lawyer, consultItems, reviewItems, cases]) => {
//       setProfile(lawyer);
//       setConsults(consultItems);
//       setReviews(reviewItems);
//       setCaseCount(cases.length);
//     }).finally(() => setLoading(false));
//   }, [user]);

//   if (loading) return <LoadingSpinner />;
//   const pending = consults.filter((item) => item.status === 'pending');
//   const upcoming = consults.filter((item) => item.status === 'accepted');

//   return (
//     <div className="stack">
//       <PageHeader title={`Welcome, ${user?.fullName}`} subtitle="Lawyer workspace using demo records tagged as mock data." />
//       <div className="grid-4">
//         <div className="stat"><span className="muted">Profile completion</span><b>{profile?.profileCompletion ?? 0}%</b></div>
//         <div className="stat"><span className="muted">Pending requests</span><b>{pending.length}</b></div>
//         <div className="stat"><span className="muted">Upcoming</span><b>{upcoming.length}</b></div>
//         <div className="stat"><span className="muted">Assigned cases</span><b>{caseCount}</b></div>
//       </div>
//       <div className="card">
//         <p className="muted">Profile completion</p>
//         <div className="progress"><span style={{ width: `${profile?.profileCompletion ?? 0}%` }} /></div>
//       </div>
//       <h2>Pending consultation requests</h2>
//       <div className="grid-2">
//         {pending.map((item) => <ConsultationCard key={item.id} item={item} basePath="/lawyer/consultations" />)}
//       </div>
//       <h2>Upcoming consultations</h2>
//       <div className="grid-2">
//         {upcoming.map((item) => <ConsultationCard key={item.id} item={item} basePath="/lawyer/consultations" />)}
//       </div>
//       <h2>Recent reviews</h2>
//       {reviews.slice(0, 3).map((review) => (
//         <article className="card" key={review.id}>
//           <strong>{review.userName}</strong>
//           <RatingStars value={review.rating} />
//           <p>{review.comment}</p>
//           <p className="muted">{formatDate(review.createdAt)}</p>
//         </article>
//       ))}
//     </div>
//   );
// }

import { useEffect, useState } from 'react';
import { consultationService } from '../../services/consultationService';
import { reviewService } from '../../services/reviewService';
import { lawyerService } from '../../services/lawyerService';
import { caseService } from '../../services/caseService';
import { useAuth } from '../../context/AuthContext';
import type { Consultation, Lawyer, Review } from '../../types';
import { ConsultationCard } from '../../components/common/ConsultationCard';
import { LoadingSpinner, PageHeader } from '../../components/common/Feedback';
import { RatingStars } from '../../components/common/RatingStars';
import { formatDate } from '../../utils/formatters';

export function LawyerDashboard() {
  const { user } = useAuth();

  const [loading, setLoading] = useState(true);
  const [profile, setProfile] = useState<Lawyer | undefined>();
  const [consults, setConsults] = useState<Consultation[]>([]);
  const [reviews, setReviews] = useState<Review[]>([]);
  const [caseCount, setCaseCount] = useState(0);

  useEffect(() => {
    if (!user) {
      setLoading(false);
      return;
    }

    const loadDashboard = async () => {
      try {
        // Find the lawyer profile belonging to the logged-in user.
        const lawyers = await lawyerService.list();
        const currentLawyer = lawyers.find(
          (lawyer) => lawyer.userId === user.id
        );

        if (!currentLawyer) {
          setProfile(undefined);
          setConsults([]);
          setReviews([]);
          setCaseCount(0);
          return;
        }

        // Use the actual lawyer ID for all lawyer-specific data.
        const [consultItems, reviewItems, cases] = await Promise.all([
          consultationService.listByLawyer(currentLawyer.id),
          reviewService.listByLawyer(currentLawyer.id),
          caseService.listByUser(user.id),
        ]);

        setProfile(currentLawyer);
        setConsults(consultItems);
        setReviews(reviewItems);
        setCaseCount(cases.length);
      } finally {
        setLoading(false);
      }
    };

    loadDashboard();
  }, [user]);

  if (loading) return <LoadingSpinner />;

  const pending = consults.filter(
    (item) => item.status === 'pending'
  );

  const upcoming = consults.filter(
    (item) => item.status === 'accepted'
  );

  return (
    <div className="stack">
      <PageHeader
        title={`Welcome, ${user?.fullName}`}
        subtitle="Your lawyer workspace"
      />

      <div className="grid-4">
        <div className="stat">
          <span className="muted">Profile completion</span>
          <b>{profile?.profileCompletion ?? 0}%</b>
        </div>

        <div className="stat">
          <span className="muted">Pending requests</span>
          <b>{pending.length}</b>
        </div>

        <div className="stat">
          <span className="muted">Upcoming</span>
          <b>{upcoming.length}</b>
        </div>

        <div className="stat">
          <span className="muted">Assigned cases</span>
          <b>{caseCount}</b>
        </div>
      </div>

      <div className="card">
        <p className="muted">Profile completion</p>

        <div className="progress">
          <span
            style={{
              width: `${profile?.profileCompletion ?? 0}%`,
            }}
          />
        </div>
      </div>

      <h2>Pending consultation requests</h2>

      <div className="grid-2">
        {pending.length > 0 ? (
          pending.map((item) => (
            <ConsultationCard
              key={item.id}
              item={item}
              basePath="/lawyer/consultations"
            />
          ))
        ) : (
          <p className="muted">No pending consultation requests.</p>
        )}
      </div>

      <h2>Upcoming consultations</h2>

      <div className="grid-2">
        {upcoming.length > 0 ? (
          upcoming.map((item) => (
            <ConsultationCard
              key={item.id}
              item={item}
              basePath="/lawyer/consultations"
            />
          ))
        ) : (
          <p className="muted">No upcoming consultations.</p>
        )}
      </div>

      <h2>Recent reviews</h2>

      {reviews.length > 0 ? (
        reviews.slice(0, 3).map((review) => (
          <article className="card" key={review.id}>
            <strong>{review.userName}</strong>

            <RatingStars value={review.rating} />

            <p>{review.comment}</p>

            <p className="muted">
              {formatDate(review.createdAt)}
            </p>
          </article>
        ))
      ) : (
        <p className="muted">No reviews yet.</p>
      )}
    </div>
  );
}
