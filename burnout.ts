/**
 * Burnout Score Calculator
 * BURNOUT = Workload(30%) + Autonomy(20%) + Recovery(25%) + Meaning(15%) + Trend(10%)
 */

export interface BurnoutInput {
  // Workload indicators (30%)
  dailyTaskCount: number;       // Number of tasks today
  weeklyHours: number;          // Hours worked this week
  meetingHoursThisWeek: number; // Meeting hours this week
  
  // Autonomy & control (20%)
  selfChosenTaskRatio: number;  // 0-1: ratio of self-chosen tasks
  canDefer: boolean;            // Can user defer tasks?
  canReschedule: boolean;       // Can user reschedule?
  
  // Recovery & rest (25%)
  afterHoursTaskRatio: number;  // 0-1: ratio of after-hours work
  weekendWorkDays: number;      // 0-2: weekend days worked
  vacationDaysTaken: number;    // In last 90 days
  avgSleepHours?: number;       // Average sleep hours
  
  // Meaning & impact (15%)
  tasksLinkedToGoals: number;   // 0-1: ratio linked to goals
  completionRatio: number;      // 0-1: tasks completed vs total
  feedbackReceived: number;     // Positive feedback count (last 7 days)
}

export type BurnoutZone = 'healthy' | 'caution' | 'atRisk' | 'critical';

export interface BurnoutResult {
  score: number;
  zone: BurnoutZone;
  label: string;
  emoji: string;
  color: string;
  workloadScore: number;
  autonomyScore: number;
  recoveryScore: number;
  meaningScore: number;
  recommendations: string[];
}

/**
 * Calculate workload indicator (0-30 points)
 * Higher = more burnout risk
 */
function calculateWorkload(input: BurnoutInput): number {
  let score = 0;

  // Daily task volume (0-10)
  if (input.dailyTaskCount > 15) score += 10;
  else if (input.dailyTaskCount > 10) score += 7;
  else if (input.dailyTaskCount > 7) score += 5;
  else if (input.dailyTaskCount > 4) score += 3;
  else score += 1;

  // Weekly hours (0-10)
  if (input.weeklyHours > 55) score += 10;
  else if (input.weeklyHours > 45) score += 7;
  else if (input.weeklyHours > 40) score += 5;
  else if (input.weeklyHours > 35) score += 2;
  else score += 0;

  // Meeting load (0-10)
  if (input.meetingHoursThisWeek > 20) score += 10;
  else if (input.meetingHoursThisWeek > 15) score += 8;
  else if (input.meetingHoursThisWeek > 10) score += 5;
  else if (input.meetingHoursThisWeek > 5) score += 3;
  else score += 1;

  return score;
}

/**
 * Calculate autonomy indicator (0-20 points)
 * Higher = more burnout risk (less autonomy)
 */
function calculateAutonomy(input: BurnoutInput): number {
  let score = 0;

  // Self-chosen task ratio (0-10)
  const autonomyDeficit = 1 - input.selfChosenTaskRatio;
  score += Math.round(autonomyDeficit * 10);

  // Ability to defer (0-5)
  if (!input.canDefer) score += 5;

  // Ability to reschedule (0-5)
  if (!input.canReschedule) score += 5;

  return score;
}

/**
 * Calculate recovery indicator (0-25 points)
 * Higher = more burnout risk (less recovery)
 */
function calculateRecovery(input: BurnoutInput): number {
  let score = 0;

  // After-hours work (0-8)
  score += Math.round(input.afterHoursTaskRatio * 8);

  // Weekend work (0-7)
  score += input.weekendWorkDays * 3.5;

  // Vacation days taken in last 90 days (0-5)
  if (input.vacationDaysTaken === 0) score += 5;
  else if (input.vacationDaysTaken < 3) score += 3;
  else if (input.vacationDaysTaken < 7) score += 1;

  // Sleep impact (0-5)
  if (input.avgSleepHours !== undefined) {
    if (input.avgSleepHours < 5) score += 5;
    else if (input.avgSleepHours < 6) score += 4;
    else if (input.avgSleepHours < 7) score += 2;
  }

  return Math.min(25, score);
}

/**
 * Calculate meaning indicator (0-15 points)
 * Higher = more burnout risk (less meaning)
 */
function calculateMeaning(input: BurnoutInput): number {
  let score = 0;

  // Tasks linked to goals (0-6)
  const meaningDeficit = 1 - input.tasksLinkedToGoals;
  score += Math.round(meaningDeficit * 6);

  // Completion ratio (0-5)
  const completionDeficit = 1 - input.completionRatio;
  score += Math.round(completionDeficit * 5);

  // Feedback received (0-4)
  if (input.feedbackReceived === 0) score += 4;
  else if (input.feedbackReceived < 2) score += 2;
  else if (input.feedbackReceived < 5) score += 1;

  return Math.min(15, score);
}

/**
 * Generate recommendations based on burnout factors
 */
function generateRecommendations(
  workload: number,
  autonomy: number,
  recovery: number,
  meaning: number,
  input: BurnoutInput
): string[] {
  const recommendations: string[] = [];

  if (workload > 20) {
    recommendations.push('Your workload is extremely high. Consider delegating or deferring non-critical tasks.');
  } else if (workload > 15) {
    recommendations.push('You have a heavy workload this week. Try to batch similar tasks together.');
  }

  if (input.meetingHoursThisWeek > 15) {
    recommendations.push(`${input.meetingHoursThisWeek}+ hours in meetings this week. Consider declining non-essential meetings.`);
  }

  if (autonomy > 12) {
    recommendations.push('Most of your tasks are assigned by others. Block time for self-directed work.');
  }

  if (recovery > 15) {
    recommendations.push('Your recovery time is insufficient. Protect your evenings and weekends.');
  }

  if (input.afterHoursTaskRatio > 0.3) {
    recommendations.push('30%+ of your work is after hours. Set boundaries for work-life balance.');
  }

  if (input.vacationDaysTaken < 3) {
    recommendations.push('You haven\'t taken enough vacation recently. Schedule time off soon.');
  }

  if (meaning > 10) {
    recommendations.push('Many tasks feel disconnected from your goals. Realign priorities with your objectives.');
  }

  if (input.avgSleepHours !== undefined && input.avgSleepHours < 7) {
    recommendations.push(`Averaging ${input.avgSleepHours}h sleep. Aim for 7-8 hours for peak productivity.`);
  }

  if (recommendations.length === 0) {
    recommendations.push('Great work-life balance! Keep maintaining your current pace.');
  }

  return recommendations.slice(0, 4); // Max 4 recommendations
}

/**
 * Calculate overall burnout score
 */
export function calculateBurnout(input: BurnoutInput): BurnoutResult {
  const workloadScore = calculateWorkload(input);
  const autonomyScore = calculateAutonomy(input);
  const recoveryScore = calculateRecovery(input);
  const meaningScore = calculateMeaning(input);

  // Raw score is sum of components (max ~90)
  const rawScore = workloadScore + autonomyScore + recoveryScore + meaningScore;
  
  // Normalize to 0-100 scale
  const maxPossible = 30 + 20 + 25 + 15; // = 90
  const score = Math.min(100, Math.round((rawScore / maxPossible) * 100));

  let zone: BurnoutZone;
  let label: string;
  let emoji: string;
  let color: string;

  if (score <= 30) {
    zone = 'healthy';
    label = 'Healthy';
    emoji = '🟢';
    color = '#10B981';
  } else if (score <= 60) {
    zone = 'caution';
    label = 'Caution';
    emoji = '🟡';
    color = '#F59E0B';
  } else if (score <= 80) {
    zone = 'atRisk';
    label = 'At Risk';
    emoji = '🟠';
    color = '#F97316';
  } else {
    zone = 'critical';
    label = 'Critical';
    emoji = '🔴';
    color = '#EF4444';
  }

  const recommendations = generateRecommendations(
    workloadScore, autonomyScore, recoveryScore, meaningScore, input
  );

  return {
    score,
    zone,
    label,
    emoji,
    color,
    workloadScore: Math.round((workloadScore / 30) * 100),
    autonomyScore: Math.round((autonomyScore / 20) * 100),
    recoveryScore: Math.round((recoveryScore / 25) * 100),
    meaningScore: Math.round((meaningScore / 15) * 100),
    recommendations,
  };
}

/**
 * Get burnout color for a given score
 */
export function getBurnoutColor(score: number): string {
  if (score <= 30) return '#10B981';
  if (score <= 60) return '#F59E0B';
  if (score <= 80) return '#F97316';
  return '#EF4444';
}

/**
 * Get burnout zone for a given score
 */
export function getBurnoutZone(score: number): BurnoutZone {
  if (score <= 30) return 'healthy';
  if (score <= 60) return 'caution';
  if (score <= 80) return 'atRisk';
  return 'critical';
}
