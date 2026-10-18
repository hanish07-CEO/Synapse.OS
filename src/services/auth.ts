import { UserProfile, DEMO_USERS } from '../types/auth';

const USER_SESSION_KEY = 'blindspot_ai_user_session';

export function getStoredUser(): UserProfile | null {
  try {
    const raw = localStorage.getItem(USER_SESSION_KEY);
    return raw ? JSON.parse(raw) : null;
  } catch (e) {
    return null;
  }
}

export function setStoredUser(user: UserProfile): void {
  localStorage.setItem(USER_SESSION_KEY, JSON.stringify(user));
}

export function clearUserSession(): void {
  localStorage.removeItem(USER_SESSION_KEY);
}

export function loginWithDemoUser(demoUser: UserProfile): UserProfile {
  setStoredUser(demoUser);
  return demoUser;
}

export function loginWithEmail(email: string, name?: string): UserProfile {
  const user: UserProfile = {
    id: `user-${Date.now()}`,
    name: name || email.split('@')[0],
    email,
    role: 'Principal Evaluator',
    department: 'Risk Management',
  };
  setStoredUser(user);
  return user;
}
