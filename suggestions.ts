/**
 * Smart Suggestions — Last Minute Life Saver
 * Context-aware, time-filtered suggestions for the dashboard.
 */

export interface SmartSuggestion {
  id: string;
  text: string;
  type: 'productivity' | 'health' | 'scheduling' | 'insight' | 'rescue';
  icon: string;
  actionLabel: string;
  priority: number;
  timeRelevant?: { startHour: number; endHour: number };
}

export const allSuggestions: SmartSuggestion[] = [
  // ===== MORNING (6-12) =====
  {
    id: 'sug-001',
    text: 'Start your day with your hardest task. Your brain is freshest in the morning.',
    type: 'productivity',
    icon: '🧠',
    actionLabel: 'View top task',
    priority: 90,
    timeRelevant: { startHour: 6, endHour: 10 },
  },
  {
    id: 'sug-002',
    text: 'Morning stretch and hydration can boost focus by 20%. Take 5 minutes.',
    type: 'health',
    icon: '💧',
    actionLabel: 'Set reminder',
    priority: 70,
    timeRelevant: { startHour: 6, endHour: 9 },
  },
  {
    id: 'sug-003',
    text: 'Block your calendar for deep work before meetings fill it up.',
    type: 'scheduling',
    icon: '📅',
    actionLabel: 'Block focus time',
    priority: 85,
    timeRelevant: { startHour: 7, endHour: 9 },
  },
  {
    id: 'sug-004',
    text: 'Review your top 3 priorities for today before opening email or Slack.',
    type: 'productivity',
    icon: '🎯',
    actionLabel: 'Review tasks',
    priority: 95,
    timeRelevant: { startHour: 6, endHour: 9 },
  },

  // ===== MIDDAY (10-14) =====
  {
    id: 'sug-005',
    text: 'You\'ve been working for 2+ hours. Take a 10-minute movement break.',
    type: 'health',
    icon: '🚶',
    actionLabel: 'Take a break',
    priority: 75,
    timeRelevant: { startHour: 10, endHour: 12 },
  },
  {
    id: 'sug-006',
    text: 'Lunch time! Step away from the screen to recharge for the afternoon.',
    type: 'health',
    icon: '🍽️',
    actionLabel: 'Block lunch break',
    priority: 65,
    timeRelevant: { startHour: 12, endHour: 14 },
  },
  {
    id: 'sug-007',
    text: 'Mid-morning is peak email time. Batch-process your inbox in one 15-min block.',
    type: 'productivity',
    icon: '📧',
    actionLabel: 'Process inbox',
    priority: 60,
    timeRelevant: { startHour: 10, endHour: 12 },
  },

  // ===== AFTERNOON (14-18) =====
  {
    id: 'sug-008',
    text: 'Post-lunch energy dip is normal. Try a 5-minute walk or cold water to reset.',
    type: 'health',
    icon: '⚡',
    actionLabel: 'Quick recharge',
    priority: 70,
    timeRelevant: { startHour: 13, endHour: 15 },
  },
  {
    id: 'sug-009',
    text: 'Afternoons are great for collaborative work and code reviews. Switch from solo to social.',
    type: 'productivity',
    icon: '👥',
    actionLabel: 'View PRs to review',
    priority: 55,
    timeRelevant: { startHour: 14, endHour: 17 },
  },
  {
    id: 'sug-010',
    text: 'Start wrapping up your day. Review what you accomplished and plan tomorrow.',
    type: 'scheduling',
    icon: '📝',
    actionLabel: 'End-of-day review',
    priority: 80,
    timeRelevant: { startHour: 17, endHour: 19 },
  },
  {
    id: 'sug-011',
    text: 'Before you leave, send any pending replies. A clear inbox means a clear mind.',
    type: 'productivity',
    icon: '✉️',
    actionLabel: 'Clear inbox',
    priority: 60,
    timeRelevant: { startHour: 16, endHour: 18 },
  },

  // ===== EVENING (18-23) =====
  {
    id: 'sug-012',
    text: 'It\'s after work hours. Protect your evening — avoid checking work messages.',
    type: 'health',
    icon: '🌙',
    actionLabel: 'Enable DND',
    priority: 85,
    timeRelevant: { startHour: 19, endHour: 23 },
  },
  {
    id: 'sug-013',
    text: 'Evening is great for learning. Spend 20 minutes on your React Native course.',
    type: 'productivity',
    icon: '📚',
    actionLabel: 'Open course',
    priority: 50,
    timeRelevant: { startHour: 19, endHour: 22 },
  },
  {
    id: 'sug-014',
    text: 'Write down 3 things that went well today. Gratitude journaling reduces stress.',
    type: 'health',
    icon: '✨',
    actionLabel: 'Journal',
    priority: 45,
    timeRelevant: { startHour: 20, endHour: 23 },
  },

  // ===== CONTEXT-DEPENDENT (always visible, filtered by burnout/tasks) =====
  {
    id: 'sug-015',
    text: 'Your burnout score is rising. Consider dropping or deferring your lowest-priority tasks.',
    type: 'rescue',
    icon: '🚨',
    actionLabel: 'Triage tasks',
    priority: 95,
  },
  {
    id: 'sug-016',
    text: 'You have overdue tasks. Want to activate Rescue Mode for a quick triage?',
    type: 'rescue',
    icon: '🆘',
    actionLabel: 'Activate Rescue',
    priority: 100,
  },
  {
    id: 'sug-017',
    text: 'You\'re ahead of schedule! Use the extra time for learning or creative work.',
    type: 'insight',
    icon: '🎉',
    actionLabel: 'View suggestions',
    priority: 40,
  },
  {
    id: 'sug-018',
    text: 'Some tasks could be delegated. Your team members have capacity — check the delegation panel.',
    type: 'scheduling',
    icon: '🤝',
    actionLabel: 'View team',
    priority: 65,
  },
  {
    id: 'sug-019',
    text: 'Your meeting-to-focus ratio is off this week. Try declining one non-essential meeting.',
    type: 'insight',
    icon: '📊',
    actionLabel: 'View calendar',
    priority: 70,
  },
  {
    id: 'sug-020',
    text: '40% of your tasks aren\'t linked to any goal. Realign to make sure you\'re working on what matters.',
    type: 'insight',
    icon: '🎯',
    actionLabel: 'Review goals',
    priority: 55,
  },
  {
    id: 'sug-021',
    text: 'Try the 2-minute rule: if a task takes less than 2 minutes, do it immediately instead of adding it to your list.',
    type: 'productivity',
    icon: '⏱️',
    actionLabel: 'Quick tasks',
    priority: 50,
  },
  {
    id: 'sug-022',
    text: 'Your body needs movement. A 7-minute workout can reset your afternoon energy.',
    type: 'health',
    icon: '🏃',
    actionLabel: 'Start workout',
    priority: 60,
    timeRelevant: { startHour: 14, endHour: 17 },
  },
  {
    id: 'sug-023',
    text: 'Deep breathing for 60 seconds can reduce cortisol by 30%. Give it a try.',
    type: 'health',
    icon: '🧘',
    actionLabel: 'Breathe',
    priority: 55,
  },
];

/**
 * Get context-filtered suggestions for the dashboard.
 * Filters by time of day, burnout score, and pending task count.
 * Returns up to `limit` suggestions, sorted by priority descending.
 */
export function getContextualSuggestions(
  hour: number,
  burnoutScore: number,
  pendingTasks: number,
  limit = 5,
): SmartSuggestion[] {
  const results: SmartSuggestion[] = [];

  for (const suggestion of allSuggestions) {
    // ---- Time filter ----
    if (suggestion.timeRelevant) {
      const { startHour, endHour } = suggestion.timeRelevant;
      if (hour < startHour || hour >= endHour) continue;
    }

    // ---- Context filters ----
    // Only show rescue suggestions when burnout is elevated or tasks are piling up
    if (suggestion.id === 'sug-015' && burnoutScore < 55) continue;
    if (suggestion.id === 'sug-016' && pendingTasks < 8) continue;

    // Only show "ahead of schedule" when things are calm
    if (suggestion.id === 'sug-017' && (burnoutScore > 40 || pendingTasks > 5)) continue;

    // Show delegation suggestion when task load is high
    if (suggestion.id === 'sug-018' && pendingTasks < 6) continue;

    results.push(suggestion);
  }

  // Sort by priority descending
  results.sort((a, b) => b.priority - a.priority);

  return results.slice(0, limit);
}
