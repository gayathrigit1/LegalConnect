export function formatDate(iso: string): string {
  return new Date(iso).toLocaleDateString('en-IN', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
  });
}

export function formatFee(amount: number): string {
  return `₹${amount.toLocaleString('en-IN')}`;
}

export function formatStatus(value: string): string {
  return value.replaceAll('_', ' ');
}

export function initials(name: string): string {
  return name
    .replace('(Demo)', '')
    .trim()
    .split(/\s+/)
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase() ?? '')
    .join('');
}
