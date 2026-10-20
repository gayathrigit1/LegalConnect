import { useMemo, useState, type ReactNode } from 'react';
import { Pagination } from '../../components/common/Pagination';
import { TextField } from '../../components/forms/Fields';
import { usePagination } from '../../hooks/usePagination';

interface Column<T> {
  key: string;
  header: string;
  render: (row: T) => ReactNode;
}

export function AdminTable<T>({
  rows,
  columns,
  searchText,
}: {
  rows: T[];
  columns: Column<T>[];
  searchText: (row: T) => string;
}) {
  const [query, setQuery] = useState('');
  const filtered = useMemo(
    () => rows.filter((row) => searchText(row).toLowerCase().includes(query.toLowerCase())),
    [rows, query, searchText],
  );
  const { page, setPage, totalPages, paged } = usePagination(filtered, 6);

  return (
    <div className="stack">
      <TextField label="Search" value={query} onChange={(e) => { setQuery(e.target.value); setPage(1); }} />
      <div className="table-wrap card" style={{ padding: 0 }}>
        <table>
          <thead>
            <tr>{columns.map((col) => <th key={col.key}>{col.header}</th>)}</tr>
          </thead>
          <tbody>
            {paged.map((row, index) => (
              <tr key={index}>
                {columns.map((col) => <td key={col.key}>{col.render(row)}</td>)}
              </tr>
            ))}
          </tbody>
        </table>
        {paged.length === 0 ? <p className="empty">No records match this search.</p> : null}
      </div>
      <Pagination page={page} totalPages={totalPages} onPage={setPage} />
    </div>
  );
}
