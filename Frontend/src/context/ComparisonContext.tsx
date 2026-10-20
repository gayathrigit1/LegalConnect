import { createContext, useCallback, useContext, useMemo, useState, type ReactNode } from 'react';

interface ComparisonContextValue {
  lawyerIds: string[];
  addLawyer: (id: string) => void;
  removeLawyer: (id: string) => void;
  toggleLawyer: (id: string) => void;
  clear: () => void;
}

const ComparisonContext = createContext<ComparisonContextValue | undefined>(undefined);

const KEY = 'lc_compare';

export function ComparisonProvider({ children }: { children: ReactNode }) {
  const [lawyerIds, setLawyerIds] = useState<string[]>(() => {
    try {
      return JSON.parse(localStorage.getItem(KEY) || '[]') as string[];
    } catch {
      return [];
    }
  });

  const persist = (ids: string[]) => {
    setLawyerIds(ids);
    localStorage.setItem(KEY, JSON.stringify(ids));
  };

  const addLawyer = useCallback((id: string) => {
    setLawyerIds((current) => {
      if (current.includes(id) || current.length >= 4) return current;
      const next = [...current, id];
      localStorage.setItem(KEY, JSON.stringify(next));
      return next;
    });
  }, []);

  const removeLawyer = useCallback((id: string) => {
    setLawyerIds((current) => {
      const next = current.filter((item) => item !== id);
      localStorage.setItem(KEY, JSON.stringify(next));
      return next;
    });
  }, []);

  const toggleLawyer = useCallback((id: string) => {
    setLawyerIds((current) => {
      const next = current.includes(id)
        ? current.filter((item) => item !== id)
        : current.length >= 4
          ? current
          : [...current, id];
      localStorage.setItem(KEY, JSON.stringify(next));
      return next;
    });
  }, []);

  const clear = useCallback(() => persist([]), []);

  const value = useMemo(
    () => ({ lawyerIds, addLawyer, removeLawyer, toggleLawyer, clear }),
    [lawyerIds, addLawyer, removeLawyer, toggleLawyer, clear],
  );

  return <ComparisonContext.Provider value={value}>{children}</ComparisonContext.Provider>;
}

export function useComparison() {
  const ctx = useContext(ComparisonContext);
  if (!ctx) throw new Error('useComparison must be used within ComparisonProvider');
  return ctx;
}
