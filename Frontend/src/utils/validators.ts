export function isEmail(value: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value.trim());
}

export function isPhone(value: string): boolean {
  return /^[+0-9][0-9\s-]{8,16}$/.test(value.trim());
}

export function required(value: string, label: string): string | null {
  if (!value.trim()) return `${label} is required.`;
  return null;
}

export function minLength(value: string, length: number, label: string): string | null {
  if (value.trim().length < length) return `${label} must be at least ${length} characters.`;
  return null;
}

export function validateFile(file: File, allowedTypes: string[], maxMb: number): string | null {
  if (!allowedTypes.includes(file.type) && file.type !== '') {
    return 'This file type is not supported. Upload PDF, Word, JPG, PNG, or TXT.';
  }
  const name = file.name.toLowerCase();
  const allowedExt = ['.pdf', '.doc', '.docx', '.jpg', '.jpeg', '.png', '.txt'];
  if (!allowedExt.some((ext) => name.endsWith(ext))) {
    return 'This file extension is not supported.';
  }
  if (file.size > maxMb * 1024 * 1024) {
    return `File must be smaller than ${maxMb} MB.`;
  }
  return null;
}
