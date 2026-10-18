export interface UserProfile {
  id: string;
  name: string;
  email: string;
  role: string;
  department: string;
  avatarUrl?: string;
}

export const DEMO_USERS: UserProfile[] = [
  {
    id: 'user-product-lead',
    name: 'Elena Rostova',
    email: 'elena.rostova@synapse.ai',
    role: 'Principal Product Lead',
    department: 'Talent & AI Platform',
  },
  {
    id: 'user-clinical-lead',
    name: 'Dr. Marcus Vance',
    email: 'marcus.vance@synapse.ai',
    role: 'Chief Medical Informaticist',
    department: 'Clinical Decision Systems',
  },
  {
    id: 'user-tech-director',
    name: 'Aiden Chen',
    email: 'aiden.chen@synapse.ai',
    role: 'VP Infrastructure & Security',
    department: 'Global Supply Logistics',
  },
];
