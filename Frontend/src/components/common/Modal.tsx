import type { ReactNode } from 'react';

interface ModalProps {
  open: boolean;
  title: string;
  onClose: () => void;
  children: ReactNode;
}

export function Modal({ open, title, onClose, children }: ModalProps) {
  if (!open) return null;
  return (
    <div className="overlay" role="dialog" aria-modal="true">
      <div className="card modal">
        <div className="row" style={{ justifyContent: 'space-between' }}>
          <h3>{title}</h3>
          <button className="btn btn-ghost btn-sm" type="button" onClick={onClose}>Close</button>
        </div>
        {children}
      </div>
    </div>
  );
}
