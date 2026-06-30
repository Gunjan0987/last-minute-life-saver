/**
 * Auto-Scheduling Engine
 * Optimal time-slot scoring and conflict resolution
 */

import { Task } from '../store/useTaskStore';

export interface TimeSlot {
  startHour: number;
  endHour: number;
  dayOfWeek: number; // 0=Sun, 1=Mon, ...
  date: string;
  isAvailable: boolean;
  score: number; // 0-100 suitability score
  label: string;
}

export interface ScheduleSuggestion {
  task: Task;
  suggestedSlot: TimeSlot;
  reason: string;
  alternativeSlots: TimeSlot[];
  confidence: number; // 0-1
}

/**
 * Task type to optimal time mapping
 */
const TASK_TYPE_AFFINITY: Record<string, { optimalHours: number[]; idealDuration: number; label: string }> = {
  work: {
    optimalHours: [9, 10, 11, 14, 15],
    idealDuration: 90,
    label: 'Deep Work',
  },
  creative: {
    optimalHours: [10, 11, 15, 16],
    idealDuration: 60,
    label: 'Creative Work',
  },
  admin: {
    optimalHours: [8, 13, 16, 17],
    idealDuration: 30,
    label: 'Admin Tasks',
  },
  meeting: {
    optimalHours: [10, 11, 14, 15, 16],
    idealDuration: 45,
    label: 'Meetings',
  },
  learning: {
    optimalHours: [7, 8, 19, 20],
    idealDuration: 45,
    label: 'Learning',
  },
  health: {
    optimalHours: [6, 7, 17, 18],
    idealDuration: 60,
    label: 'Health & Wellness',
  },
  personal: {
    optimalHours: [18, 19, 20],
    idealDuration: 45,
    label: 'Personal Tasks',
  },
  finance: {
    optimalHours: [9, 10, 14],
    idealDuration: 30,
    label: 'Finance',
  },
};

/**
 * User productivity profile (simulated)
 */
const USER_PRODUCTIVITY_PROFILE = {
  peakHours: [8, 9, 10, 11], // Morning person
  dipHours: [13, 14, 15], // Post-lunch dip
  recoveryHours: [15, 16], // Afternoon recovery
  focusHours: [8, 9, 10], // Best focus time
  endOfDay: 18,
  startOfDay: 7,
};

/**
 * Score a time slot for a given task
 */
function scoreTimeSlot(hour: number, dayOfWeek: number, task: Task): number {
  let score = 50; // Base score

  const category = task.category || 'work';
  const affinity = TASK_TYPE_AFFINITY[category] || TASK_TYPE_AFFINITY.work;

  // Task type affinity bonus (+20)
  if (affinity.optimalHours.includes(hour)) {
    score += 20;
  }

  // Peak productivity bonus (+15)
  if (USER_PRODUCTIVITY_PROFILE.peakHours.includes(hour)) {
    score += 15;
  }

  // Energy dip penalty (-15)
  if (USER_PRODUCTIVITY_PROFILE.dipHours.includes(hour)) {
    score -= 15;
  }

  // Focus time bonus for deep work (+10)
  if (
    USER_PRODUCTIVITY_PROFILE.focusHours.includes(hour) &&
    (category === 'work' || category === 'creative' || category === 'learning')
  ) {
    score += 10;
  }

  // Priority urgency bonus: urgent tasks get morning slots (+10)
  if (task.priorityBand === 'critical' && hour <= 10) {
    score += 10;
  }

  // Weekend penalty for work tasks (-20)
  if ((dayOfWeek === 0 || dayOfWeek === 6) && category === 'work') {
    score -= 20;
  }

  // Weekend bonus for personal/health (+15)
  if ((dayOfWeek === 0 || dayOfWeek === 6) && (category === 'personal' || category === 'health')) {
    score += 15;
  }

  // Midweek bonus (Tue-Thu are most productive) (+5)
  if (dayOfWeek >= 2 && dayOfWeek <= 4) {
    score += 5;
  }

  // Out-of-hours penalty
  if (hour < USER_PRODUCTIVITY_PROFILE.startOfDay || hour > USER_PRODUCTIVITY_PROFILE.endOfDay) {
    score -= 25;
  }

  return Math.max(0, Math.min(100, score));
}

/**
 * Generate available time slots for a day
 */
export function generateTimeSlots(date: Date, existingEvents: Array<{ startHour: number; endHour: number }> = []): TimeSlot[] {
  const dayOfWeek = date.getDay();
  const dateStr = date.toISOString().split('T')[0];
  const slots: TimeSlot[] = [];

  for (let hour = 6; hour <= 21; hour++) {
    const isBlocked = existingEvents.some(e => hour >= e.startHour && hour < e.endHour);
    
    const hourLabel = hour <= 11 ? `${hour} AM` : hour === 12 ? '12 PM' : `${hour - 12} PM`;

    slots.push({
      startHour: hour,
      endHour: hour + 1,
      dayOfWeek,
      date: dateStr,
      isAvailable: !isBlocked,
      score: 0, // Will be calculated per task
      label: hourLabel,
    });
  }

  return slots;
}

/**
 * Suggest optimal time slots for a task
 */
export function suggestSchedule(
  task: Task,
  availableSlots: TimeSlot[]
): ScheduleSuggestion {
  // Score each available slot
  const scoredSlots = availableSlots
    .filter(s => s.isAvailable)
    .map(slot => ({
      ...slot,
      score: scoreTimeSlot(slot.startHour, slot.dayOfWeek, task),
    }))
    .sort((a, b) => b.score - a.score);

  const bestSlot = scoredSlots[0];
  const alternatives = scoredSlots.slice(1, 4);

  // Generate reason
  const category = task.category || 'work';
  const affinity = TASK_TYPE_AFFINITY[category] || TASK_TYPE_AFFINITY.work;
  let reason = `${affinity.label} is best during `;

  if (USER_PRODUCTIVITY_PROFILE.peakHours.includes(bestSlot?.startHour)) {
    reason += 'your peak productivity hours.';
  } else if (affinity.optimalHours.includes(bestSlot?.startHour)) {
    reason += `optimal ${category} hours.`;
  } else {
    reason += 'this available window.';
  }

  return {
    task,
    suggestedSlot: bestSlot,
    reason,
    alternativeSlots: alternatives,
    confidence: bestSlot ? bestSlot.score / 100 : 0,
  };
}

/**
 * Build optimal daily schedule
 */
export function buildDailySchedule(
  tasks: Task[],
  date: Date = new Date()
): ScheduleSuggestion[] {
  const slots = generateTimeSlots(date);
  const schedule: ScheduleSuggestion[] = [];
  const usedSlots = new Set<number>();

  // Sort tasks by priority (highest first)
  const sortedTasks = [...tasks].sort((a, b) => b.priorityScore - a.priorityScore);

  for (const task of sortedTasks) {
    // Filter out already-used slots
    const available = slots.filter(s => s.isAvailable && !usedSlots.has(s.startHour));

    if (available.length === 0) break;

    const suggestion = suggestSchedule(task, available);

    if (suggestion.suggestedSlot) {
      // Mark slot as used (account for estimated duration)
      const durationHours = Math.ceil((task.estimatedMinutes || 60) / 60);
      for (let h = suggestion.suggestedSlot.startHour; h < suggestion.suggestedSlot.startHour + durationHours; h++) {
        usedSlots.add(h);
      }
      schedule.push(suggestion);
    }
  }

  return schedule;
}

/**
 * Format time for display
 */
export function formatTime(hour: number): string {
  if (hour === 0 || hour === 24) return '12 AM';
  if (hour < 12) return `${hour} AM`;
  if (hour === 12) return '12 PM';
  return `${hour - 12} PM`;
}

/**
 * Get time-of-day label
 */
export function getTimeOfDay(): 'morning' | 'afternoon' | 'evening' | 'night' {
  const hour = new Date().getHours();
  if (hour < 12) return 'morning';
  if (hour < 17) return 'afternoon';
  if (hour < 21) return 'evening';
  return 'night';
}

/**
 * Get greeting based on time of day
 */
export function getGreeting(name: string): string {
  const timeOfDay = getTimeOfDay();
  const greetings = {
    morning: `Good morning, ${name} ☀️`,
    afternoon: `Good afternoon, ${name} 👋`,
    evening: `Good evening, ${name} 🌙`,
    night: `Working late, ${name}? 🌟`,
  };
  return greetings[timeOfDay];
}
