import { useEffect, useState } from 'react';
import { lawyerService } from '../../services/lawyerService';
import { LOCATIONS, SPECIALIZATIONS, mockLegalDomains } from '../../data/legalDomains';
import type { Lawyer, LawyerFilters } from '../../types';
import { LawyerCard } from '../../components/common/LawyerCard';
import { EmptyState, LoadingSpinner, PageHeader } from '../../components/common/Feedback';
import { Pagination } from '../../components/common/Pagination';
import { SelectField, TextField } from '../../components/forms/Fields';
import { useComparison } from '../../context/ComparisonContext';
import { Link } from 'react-router-dom';

const defaultFilters: LawyerFilters = {
  search: '',
  domain: '',
  specialization: '',
  minExperience: 0,
  location: '',
  maxFee: 0,
  minRating: 0,
  availability: '',
  sortBy: 'rating',
};

export function FindLawyersPage() {
  const { lawyerIds, toggleLawyer } = useComparison();
  const [filters, setFilters] = useState<LawyerFilters>(defaultFilters);
  const [page, setPage] = useState(1);
  const [items, setItems] = useState<Lawyer[]>([]);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(true);
  const pageSize = 6;

  useEffect(() => {
    setLoading(true);
    lawyerService.search(filters, page, pageSize).then((result) => {
      setItems(result.items);
      setTotal(result.total);
    }).finally(() => setLoading(false));
  }, [filters, page]);

  function update<K extends keyof LawyerFilters>(key: K, value: LawyerFilters[K]) {
    setPage(1);
    setFilters((current) => ({ ...current, [key]: value }));
  }

  const totalPages = Math.max(1, Math.ceil(total / pageSize));

  return (
    <div className="stack">
      <PageHeader title="Find lawyers" subtitle="All profiles are fictional demo records, not real advocates." />
      <div className="card filters">
        <TextField label="Search" value={filters.search} onChange={(e) => update('search', e.target.value)} placeholder="Name, specialization, city" />
        <SelectField label="Legal domain" value={filters.domain} onChange={(e) => update('domain', e.target.value)}>
          <option value="">All</option>
          {mockLegalDomains.map((domain) => <option key={domain.id} value={domain.name}>{domain.name}</option>)}
        </SelectField>
        <SelectField label="Specialization" value={filters.specialization} onChange={(e) => update('specialization', e.target.value)}>
          <option value="">All</option>
          {SPECIALIZATIONS.map((item) => <option key={item} value={item}>{item}</option>)}
        </SelectField>
        <SelectField label="Experience" value={String(filters.minExperience)} onChange={(e) => update('minExperience', Number(e.target.value))}>
          <option value="0">Any</option>
          <option value="5">5+ years</option>
          <option value="10">10+ years</option>
        </SelectField>
        <SelectField label="Location" value={filters.location} onChange={(e) => update('location', e.target.value)}>
          <option value="">All</option>
          {LOCATIONS.map((item) => <option key={item} value={item}>{item}</option>)}
        </SelectField>
        <SelectField label="Max fee" value={String(filters.maxFee)} onChange={(e) => update('maxFee', Number(e.target.value))}>
          <option value="0">Any</option>
          <option value="1500">₹1,500</option>
          <option value="2000">₹2,000</option>
          <option value="2500">₹2,500</option>
        </SelectField>
        <SelectField label="Min rating" value={String(filters.minRating)} onChange={(e) => update('minRating', Number(e.target.value))}>
          <option value="0">Any</option>
          <option value="4">4+</option>
          <option value="4.5">4.5+</option>
        </SelectField>
        <SelectField label="Availability" value={filters.availability} onChange={(e) => update('availability', e.target.value)}>
          <option value="">Any</option>
          <option value="available">Available</option>
          <option value="busy">Busy</option>
          <option value="unavailable">Unavailable</option>
        </SelectField>
        <SelectField label="Sort by" value={filters.sortBy} onChange={(e) => update('sortBy', e.target.value as LawyerFilters['sortBy'])}>
          <option value="rating">Rating</option>
          <option value="fee">Fee</option>
          <option value="experience">Experience</option>
          <option value="name">Name</option>
        </SelectField>
      </div>
      {loading ? <LoadingSpinner /> : items.length === 0 ? (
        <EmptyState title="No lawyers found" text="Adjust filters to see demo profiles." />
      ) : (
        <div className="grid-3">
          {items.map((lawyer) => (
            <LawyerCard
              key={lawyer.id}
              lawyer={lawyer}
              compared={lawyerIds.includes(lawyer.id)}
              onCompare={toggleLawyer}
            />
          ))}
        </div>
      )}
      <Pagination page={page} totalPages={totalPages} onPage={setPage} />
      {lawyerIds.length > 0 ? (
        <div className="compare-bar">
          <span>{lawyerIds.length} lawyer(s) selected for comparison (max 4)</span>
          <Link className="btn btn-gold" to="/app/compare">Open comparison</Link>
        </div>
      ) : null}
    </div>
  );
}
