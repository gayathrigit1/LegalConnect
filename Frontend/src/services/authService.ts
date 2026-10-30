import type { AuthSession, User, UserRole } from '../types';
import { API_BASE_URL } from './api';

const SESSION_KEY = 'lc_session';
const API_URL = `${API_BASE_URL}/auth`;

export interface RegisterPayload {
  fullName: string;
  email: string;
  password: string;
  phone: string;
  role: UserRole;
}

interface BackendUser {
  id: string;
  fullName: string;
  email: string;
  phone?: string | null;
  role: string;
  avatarUrl?: string | null;
  location?: string | null;
  createdAt?: string;
}

interface BackendAuthResponse {
  token: string;
  user: BackendUser;
}

function readSession(): AuthSession | null {
  const raw = localStorage.getItem(SESSION_KEY);
  if (!raw) return null;

  try {
    return JSON.parse(raw) as AuthSession;
  } catch {
    return null;
  }
}

function writeSession(session: AuthSession) {
  localStorage.setItem(SESSION_KEY, JSON.stringify(session));
  localStorage.setItem('lc_token', session.token);
}

function mapUser(data: BackendUser): User {
  return {
    id: data.id,
    fullName: data.fullName,
    email: data.email,
    phone: data.phone ?? '',
    role: data.role.toLowerCase() as UserRole,
    location: data.location ?? '',
    createdAt: data.createdAt ?? new Date().toISOString(),
  };
}

async function post<T>(path: string, payload: unknown): Promise<T> {
  let response: Response;

  try {
    response = await fetch(`${API_URL}${path}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    });
  } catch {
    throw new Error(
      'Cannot connect to the backend service. Please check your internet connection or verify the backend is running.'
    );
  }

  const data = await response.json().catch(() => ({}));

  if (!response.ok) {
    const message =
      data.message ||
      data.error ||
      (response.status === 401
        ? 'Invalid email or password.'
        : `Request failed (${response.status}).`);

    throw new Error(message);
  }

  return data as T;
}

export const authService = {
  async login(email: string, password: string): Promise<AuthSession> {
    const result = await post<BackendAuthResponse>('/login', {
      email: email.trim(),
      password,
    });

    const session: AuthSession = {
      token: result.token,
      user: mapUser(result.user),
    };

    writeSession(session);
    return session;
  },

  async register(payload: RegisterPayload): Promise<AuthSession> {
    const result = await post<BackendAuthResponse>('/register', {
      fullName: payload.fullName,
      email: payload.email.trim(),
      password: payload.password,
      phone: payload.phone,
      role: payload.role,
    });

    const session: AuthSession = {
      token: result.token,
      user: mapUser(result.user),
    };

    writeSession(session);
    return session;
  },

  logout() {
    localStorage.removeItem(SESSION_KEY);
    localStorage.removeItem('lc_token');
  },

  getCurrentSession(): AuthSession | null {
    return readSession();
  },
};
