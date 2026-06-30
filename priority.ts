/**
 * Priority Scoring Engine
 * PRIORITY = (URGENCY × 0.4) + (IMPORTANCE × 0.35) + (IMPACT × 0.15) + (DEPENDENCIES × 0.10)
 */

export interface PriorityInput {
  deadline: Date | string;
  senderImportance?: 'ceo' | 'client' | 'stakeholder' | 'team' | 'self';
  keywords?: string[];
  blocksOthers?: boolean;
  revenueImpacting?: boolean;
  healthSafety?: boolean;
  personalGoal?: boolean;
  dependentTaskCount?: number;
  isCriticalPath?: boolean;
}

export type PriorityBand = 'critical' | 'high' | 'medium' | 'low';

export interface PriorityResult {
  score: number;
  band: PriorityBand;
  urgency: number;
  importance: number;
  impact: number;
  dependencies: number;
  label: string;
  emoji: string;
}

const URGENCY_KEYWORDS = ['urgent', 'asap', 'critical', 'emergency', 'immediately', '!!!'];
const IMPORTANCE_KEYWORDS = ['important', 'priority', 'key', 'essential', 'required', 'must'];

/**
 * Calculate urgency score (0-100) based on deadline proximity
 */
function calculateUrgency(deadline: Date | string): number {
  const deadlineDate = typeof deadline === 'string' ? new Date(deadline) : deadline;
  const now = new Date();
  const hoursUntilDeadline = (deadlineDate.getTime() - now.getTime()) / (1000 * 60 * 60);

  if (hoursUntilDeadline <= 0) return 100; // Overdue
  if (hoursUntilDeadline <= 2) return 95;  // Due in 2 hours
  if (hoursUntilDeadline <= 8) return 90;  // Due today
  if (hoursUntilDeadline <= 24) return 80; // Due in 24 hours
  if (hoursUntilDeadline <= 48) return 65; // Due tomorrow
  if (hoursUntilDeadline <= 72) return 50; // 2-3 days
  if (hoursUntilDeadline <= 168) return 25; // 1 week
  if (hoursUntilDeadline <= 336) return 15; // 2 weeks
  return 10; // More than 2 weeks
}

/**
 * Calculate importance score (0-100) based on sender and keywords
 */
function calculateImportance(
  senderImportance: PriorityInput['senderImportance'] = 'self',
  keywords: string[] = []
): number {
  const senderScores: Record<string, number> = {
    ceo: 95,
    client: 90,
    stakeholder: 75,
    team: 50,
    self: 30,
  };

  let score = senderScores[senderImportance] || 30;

  // Keyword boost
  const lowerKeywords = keywords.map(k => k.toLowerCase());
  const hasUrgent = lowerKeywords.some(k => URGENCY_KEYWORDS.includes(k));
  const hasImportant = lowerKeywords.some(k => IMPORTANCE_KEYWORDS.includes(k));

  if (hasUrgent) score = Math.min(100, score + 20);
  if (hasImportant) score = Math.min(100, score + 15);

  return score;
}

/**
 * Calculate impact score (0-100) based on consequences
 */
function calculateImpact(input: PriorityInput): number {
  if (input.healthSafety) return 95;
  if (input.blocksOthers) return 90;
  if (input.revenueImpacting) return 85;
  if (input.personalGoal) return 40;
  return 20; // Nice-to-have
}

/**
 * Calculate dependency score (0-50) based on dependent tasks
 */
function calculateDependencies(input: PriorityInput): number {
  if (input.isCriticalPath) return 50;
  const count = input.dependentTaskCount || 0;
  if (count === 0) return 0;
  if (count <= 2) return 20;
  if (count <= 5) return 35;
  return 50;
}

/**
 * Calculate overall priority score
 */
export function calculatePriority(input: PriorityInput): PriorityResult {
  const urgency = calculateUrgency(input.deadline);
  const importance = calculateImportance(input.senderImportance, input.keywords);
  const impact = calculateImpact(input);
  const dependencies = calculateDependencies(input);

  const score = Math.round(
    (urgency * 0.4) +
    (importance * 0.35) +
    (impact * 0.15) +
    (dependencies * 0.10)
  );

  const clampedScore = Math.min(100, Math.max(0, score));

  let band: PriorityBand;
  let label: string;
  let emoji: string;

  if (clampedScore >= 85) {
    band = 'critical';
    label = 'CRITICAL';
    emoji = '🔴';
  } else if (clampedScore >= 65) {
    band = 'high';
    label = 'HIGH';
    emoji = '🟠';
  } else if (clampedScore >= 40) {
    band = 'medium';
    label = 'MEDIUM';
    emoji = '🟡';
  } else {
    band = 'low';
    label = 'LOW';
    emoji = '🟢';
  }

  return {
    score: clampedScore,
    band,
    urgency,
    importance,
    impact,
    dependencies,
    label,
    emoji,
  };
}

/**
 * Get priority color for a given band
 */
export function getPriorityColor(band: PriorityBand): string {
  const colors: Record<PriorityBand, string> = {
    critical: '#EF4444',
    high: '#F97316',
    medium: '#F59E0B',
    low: '#10B981',
  };
  return colors[band];
}

/**
 * Re-rank tasks by priority (sort descending)
 */
export function rankTasks<T extends { priorityScore: number }>(tasks: T[]): T[] {
  return [...tasks].sort((a, b) => b.priorityScore - a.priorityScore);
}
