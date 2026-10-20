export function RatingStars({ value, onChange }: { value: number; onChange?: (n: number) => void }) {
  return (
    <div className="stars" aria-label={`Rating ${value} of 5`}>
      {[1, 2, 3, 4, 5].map((star) => (
        <button
          key={star}
          type="button"
          className="btn-ghost"
          style={{ padding: 0, color: star <= Math.round(value) ? 'var(--gold)' : '#c5ccd6', fontSize: 18 }}
          onClick={() => onChange?.(star)}
          disabled={!onChange}
        >
          ★
        </button>
      ))}
      <span className="muted" style={{ marginLeft: 6 }}>{value.toFixed(1)}</span>
    </div>
  );
}
