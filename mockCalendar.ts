/**
 * Mock Calendar Events — Last Minute Life Saver
 * A full week of calendar events, all relative to today.
 */

export interface CalendarEvent {
  id: string;
  title: string;
  startTime: string;
  endTime: string;
  location?: string;
  participants: string[];
  type: 'meeting' | 'focus' | 'personal' | 'break';
  color: string;
  prepTaskGenerated?: boolean;
  followUpGenerated?: boolean;
}

function dayAt(dayOffset: number, hour: number, minute = 0): string {
  const d = new Date();
  d.setDate(d.getDate() + dayOffset);
  d.setHours(hour, minute, 0, 0);
  return d.toISOString();
}

export const mockCalendarEvents: CalendarEvent[] = [
  // ===== TODAY (day 0) =====
  {
    id: 'cal-001',
    title: 'Morning Standup',
    startTime: dayAt(0, 9, 30),
    endTime: dayAt(0, 9, 45),
    location: 'Google Meet',
    participants: ['Ananya Gupta', 'Vikram Singh', 'Neha Kapoor', 'Riya Patel'],
    type: 'meeting',
    color: '#4F8CFF',
    followUpGenerated: true,
  },
  {
    id: 'cal-002',
    title: 'Deep Work — Payment Bug Fix',
    startTime: dayAt(0, 10, 0),
    endTime: dayAt(0, 12, 0),
    participants: [],
    type: 'focus',
    color: '#8B5CF6',
  },
  {
    id: 'cal-003',
    title: 'Lunch Break',
    startTime: dayAt(0, 12, 30),
    endTime: dayAt(0, 13, 30),
    participants: [],
    type: 'break',
    color: '#10B981',
  },
  {
    id: 'cal-004',
    title: 'Client Call — Acme Corp',
    startTime: dayAt(0, 14, 0),
    endTime: dayAt(0, 15, 0),
    location: 'Zoom',
    participants: ['Rahul Verma', 'Sarah Chen (Acme)'],
    type: 'meeting',
    color: '#F97316',
    prepTaskGenerated: true,
    followUpGenerated: true,
  },
  {
    id: 'cal-005',
    title: 'Contract Review Block',
    startTime: dayAt(0, 15, 30),
    endTime: dayAt(0, 16, 30),
    participants: [],
    type: 'focus',
    color: '#8B5CF6',
  },

  // ===== TOMORROW (day 1) =====
  {
    id: 'cal-006',
    title: 'Sprint Demo',
    startTime: dayAt(1, 10, 0),
    endTime: dayAt(1, 11, 0),
    location: 'Conference Room A / Google Meet',
    participants: ['Ananya Gupta', 'Vikram Singh', 'Neha Kapoor', 'Riya Patel', 'Priya Sharma'],
    type: 'meeting',
    color: '#4F8CFF',
    prepTaskGenerated: true,
  },
  {
    id: 'cal-007',
    title: 'Doctor Appointment',
    startTime: dayAt(1, 11, 30),
    endTime: dayAt(1, 13, 0),
    location: 'Apollo Clinic, Koramangala',
    participants: [],
    type: 'personal',
    color: '#EF4444',
  },
  {
    id: 'cal-008',
    title: 'Deep Work — Blog Post',
    startTime: dayAt(1, 14, 0),
    endTime: dayAt(1, 16, 0),
    participants: [],
    type: 'focus',
    color: '#8B5CF6',
  },

  // ===== DAY 2 =====
  {
    id: 'cal-009',
    title: 'Morning Standup',
    startTime: dayAt(2, 9, 30),
    endTime: dayAt(2, 9, 45),
    location: 'Google Meet',
    participants: ['Ananya Gupta', 'Vikram Singh', 'Neha Kapoor', 'Riya Patel'],
    type: 'meeting',
    color: '#4F8CFF',
  },
  {
    id: 'cal-010',
    title: '1-on-1 with Neha',
    startTime: dayAt(2, 14, 0),
    endTime: dayAt(2, 14, 30),
    location: 'Google Meet',
    participants: ['Neha Kapoor'],
    type: 'meeting',
    color: '#06B6D4',
    prepTaskGenerated: true,
  },
  {
    id: 'cal-011',
    title: 'Investor Email Prep',
    startTime: dayAt(2, 15, 0),
    endTime: dayAt(2, 16, 0),
    participants: [],
    type: 'focus',
    color: '#8B5CF6',
  },

  // ===== DAY 3 =====
  {
    id: 'cal-012',
    title: 'Morning Standup',
    startTime: dayAt(3, 9, 30),
    endTime: dayAt(3, 9, 45),
    location: 'Google Meet',
    participants: ['Ananya Gupta', 'Vikram Singh', 'Neha Kapoor', 'Riya Patel'],
    type: 'meeting',
    color: '#4F8CFF',
  },
  {
    id: 'cal-013',
    title: 'Product Roadmap Review',
    startTime: dayAt(3, 11, 0),
    endTime: dayAt(3, 12, 0),
    location: 'Conference Room B',
    participants: ['Ananya Gupta', 'Karan Mehta', 'Priya Sharma'],
    type: 'meeting',
    color: '#F59E0B',
    followUpGenerated: true,
  },
  {
    id: 'cal-014',
    title: 'Gym Session',
    startTime: dayAt(3, 18, 0),
    endTime: dayAt(3, 19, 0),
    location: 'FitClub Gym',
    participants: [],
    type: 'personal',
    color: '#10B981',
  },

  // ===== DAY 4 =====
  {
    id: 'cal-015',
    title: 'Morning Standup',
    startTime: dayAt(4, 9, 30),
    endTime: dayAt(4, 9, 45),
    location: 'Google Meet',
    participants: ['Ananya Gupta', 'Vikram Singh', 'Neha Kapoor', 'Riya Patel'],
    type: 'meeting',
    color: '#4F8CFF',
  },
  {
    id: 'cal-016',
    title: 'Sprint Retrospective',
    startTime: dayAt(4, 15, 0),
    endTime: dayAt(4, 16, 0),
    location: 'Google Meet',
    participants: ['Ananya Gupta', 'Vikram Singh', 'Neha Kapoor', 'Riya Patel'],
    type: 'meeting',
    color: '#4F8CFF',
  },
  {
    id: 'cal-017',
    title: 'Blog Post Deadline',
    startTime: dayAt(4, 17, 0),
    endTime: dayAt(4, 17, 30),
    participants: [],
    type: 'focus',
    color: '#EC4899',
  },

  // ===== DAY 5 (end of work week) =====
  {
    id: 'cal-018',
    title: 'Pricing Strategy Workshop',
    startTime: dayAt(5, 10, 0),
    endTime: dayAt(5, 12, 0),
    location: 'Conference Room A',
    participants: ['Karan Mehta', 'Priya Sharma', 'Rahul Verma'],
    type: 'meeting',
    color: '#F97316',
    prepTaskGenerated: true,
  },
  {
    id: 'cal-019',
    title: 'Team Lunch',
    startTime: dayAt(5, 12, 30),
    endTime: dayAt(5, 13, 30),
    location: 'Cafe Mondegar',
    participants: ['Ananya Gupta', 'Vikram Singh', 'Neha Kapoor', 'Riya Patel'],
    type: 'break',
    color: '#10B981',
  },

  // ===== DAY 6 (weekend) =====
  {
    id: 'cal-020',
    title: 'React Native Course — Study Block',
    startTime: dayAt(6, 10, 0),
    endTime: dayAt(6, 12, 0),
    participants: [],
    type: 'focus',
    color: '#F59E0B',
  },
  {
    id: 'cal-021',
    title: 'Weekend Run',
    startTime: dayAt(6, 7, 0),
    endTime: dayAt(6, 8, 0),
    location: 'Cubbon Park',
    participants: [],
    type: 'personal',
    color: '#10B981',
  },
];

/**
 * Get events for a specific day offset (0 = today)
 */
export function getEventsForDay(dayOffset: number): CalendarEvent[] {
  const targetDate = new Date();
  targetDate.setDate(targetDate.getDate() + dayOffset);
  const targetStr = targetDate.toISOString().split('T')[0];

  return mockCalendarEvents.filter((event) => {
    const eventDate = new Date(event.startTime).toISOString().split('T')[0];
    return eventDate === targetStr;
  });
}

/**
 * Get today's events
 */
export function getTodayEvents(): CalendarEvent[] {
  return getEventsForDay(0);
}

/**
 * Get total meeting hours for the current week
 */
export function getWeeklyMeetingHours(): number {
  let totalMinutes = 0;
  for (const event of mockCalendarEvents) {
    if (event.type === 'meeting') {
      const start = new Date(event.startTime).getTime();
      const end = new Date(event.endTime).getTime();
      totalMinutes += (end - start) / (1000 * 60);
    }
  }
  return Math.round((totalMinutes / 60) * 10) / 10;
}

/**
 * Get total focus hours for the current week
 */
export function getWeeklyFocusHours(): number {
  let totalMinutes = 0;
  for (const event of mockCalendarEvents) {
    if (event.type === 'focus') {
      const start = new Date(event.startTime).getTime();
      const end = new Date(event.endTime).getTime();
      totalMinutes += (end - start) / (1000 * 60);
    }
  }
  return Math.round((totalMinutes / 60) * 10) / 10;
}
