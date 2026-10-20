import type { ReactNode } from 'react';

export function LoadingSpinner({ label = 'Loading…' }: { label?: string }) {
  return (
    <div className="empty">
      <div className="spinner" aria-hidden />
      <p>{label}</p>
    </div>
  );
}

export function EmptyState({ title, text }: { title: string; text: string }) {
  return (
    <div className="empty card">
      <h3>{title}</h3>
      <p>{text}</p>
    </div>
  );
}

export function PageHeader({ title, subtitle, children }: { title: string; subtitle?: string; children?: ReactNode }) {
  return (
    <div className="row" style={{ justifyContent: 'space-between', marginBottom: 18 }}>
      <div>
        <h1 className="serif" style={{ margin: 0 }}>{title}</h1>
        {subtitle ? <p className="muted">{subtitle}</p> : null}
      </div>
      {children}
    </div>
  );
}
