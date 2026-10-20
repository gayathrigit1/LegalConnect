import { useMemo, useState } from 'react';

export function usePagination<T>(items: T[], pageSize = 8) {
  const [page, setPage] = useState(1);
  const totalPages = Math.max(1, Math.ceil(items.length / pageSize));
  const current = Math.min(page, totalPages);
  const paged = useMemo(() => {
    const start = (current - 1) * pageSize;
    return items.slice(start, start + pageSize);
  }, [items, current, pageSize]);

  return {
    page: current,
    setPage,
    totalPages,
    paged,
  };
}
