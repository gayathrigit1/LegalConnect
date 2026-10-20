export function Pagination({
  page,
  totalPages,
  onPage,
}: {
  page: number;
  totalPages: number;
  onPage: (page: number) => void;
}) {
  return (
    <div className="row" style={{ justifyContent: 'center', marginTop: 16 }}>
      <button className="btn btn-outline btn-sm" type="button" disabled={page <= 1} onClick={() => onPage(page - 1)}>
        Previous
      </button>
      <span className="muted">Page {page} of {totalPages}</span>
      <button className="btn btn-outline btn-sm" type="button" disabled={page >= totalPages} onClick={() => onPage(page + 1)}>
        Next
      </button>
    </div>
  );
}
