import { addDays, set, formatISO } from 'date-fns';

export interface Staff {
  id: string;
  name: string;
  avatar: string;
  email: string;
}

export interface Meeting {
  id: number;
  title: string;
  agenda: string;
  startTime: string;
  endTime: string;
  attendees: string[];
  isUrgent: boolean;
  organizer: string;
}

export const staff: Staff[] = [
  { id: 'u1', name: 'Amina Okoro', avatar: 'AO', email: 'amina@example.com' },
  { id: 'u2', name: 'Kwame Mensah', avatar: 'KM', email: 'kwame@example.com' },
  { id: 'u3', name: 'Fatima Diallo', avatar: 'FD', email: 'fatima@example.com' },
  { id: 'u4', name: 'Tunde Adebayo', avatar: 'TA', email: 'tunde@example.com' },
];

const today = new Date();

export const meetings: Meeting[] = [
  {
    id: 1,
    title: 'Daily Standup',
    agenda: 'Quick sync on daily tasks and blockers.',
    startTime: set(today, { hours: 9, minutes: 0, seconds: 0, milliseconds: 0 }).toISOString(),
    endTime: set(today, { hours: 9, minutes: 15, seconds: 0, milliseconds: 0 }).toISOString(),
    attendees: ['u1', 'u2', 'u3', 'u4'],
    isUrgent: false,
    organizer: 'u2',
  },
  {
    id: 2,
    title: 'Project Phoenix Kick-off',
    agenda: 'Initial planning and role assignment for the new project.',
    startTime: set(today, { hours: 11, minutes: 0, seconds: 0, milliseconds: 0 }).toISOString(),
    endTime: set(today, { hours: 12, minutes: 30, seconds: 0, milliseconds: 0 }).toISOString(),
    attendees: ['u1', 'u3'],
    isUrgent: false,
    organizer: 'u1',
  },
  {
    id: 3,
    title: 'Urgent: Server Patch Review',
    agenda: 'Critical security patch needs immediate review and deployment.',
    startTime: set(today, { hours: 15, minutes: 0, seconds: 0, milliseconds: 0 }).toISOString(),
    endTime: set(today, { hours: 15, minutes: 30, seconds: 0, milliseconds: 0 }).toISOString(),
    attendees: ['u2', 'u4'],
    isUrgent: true,
    organizer: 'u4',
  },
  {
    id: 4,
    title: 'Marketing Strategy Session',
    agenda: 'Brainstorming for Q3 marketing campaigns.',
    startTime: set(addDays(today, 1), { hours: 10, minutes: 0, seconds: 0, milliseconds: 0 }).toISOString(),
    endTime: set(addDays(today, 1), { hours: 11, minutes: 0, seconds: 0, milliseconds: 0 }).toISOString(),
    attendees: ['u1', 'u3'],
    isUrgent: false,
    organizer: 'u1',
  },
  {
    id: 5,
    title: 'Client Demo Prep',
    agenda: 'Final run-through of the client demo.',
    startTime: set(addDays(today, 2), { hours: 14, minutes: 0, seconds: 0, milliseconds: 0 }).toISOString(),
    endTime: set(addDays(today, 2), { hours: 16, minutes: 0, seconds: 0, milliseconds: 0 }).toISOString(),
    attendees: ['u2', 'u3', 'u4'],
    isUrgent: false,
    organizer: 'u3',
  },
    {
    id: 6,
    title: 'Weekly Review',
    agenda: 'Review of the past week\'s progress and planning for the next.',
    startTime: set(addDays(today, 3), { hours: 16, minutes: 0, seconds: 0, milliseconds: 0 }).toISOString(),
    endTime: set(addDays(today, 3), { hours: 17, minutes: 0, seconds: 0, milliseconds: 0 }).toISOString(),
    attendees: ['u1', 'u2', 'u3', 'u4'],
    isUrgent: false,
    organizer: 'u1',
  },
];
