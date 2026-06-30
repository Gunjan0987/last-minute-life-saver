/**
 * Mock Analytics Data — Last Minute Life Saver
 * 30 days of daily productivity, 7×24 hourly heatmap, and weekly reports.
 */

export interface DailyProductivity {
  date: string;
  tasksCompleted: number;
  tasksTotal: number;
  focusHours: number;
  meetingHours: number;
  burnoutScore: number;
  productivityScore: number;
  energyLevel: number;
}

export interface HourlyProductivity {
  hour: number;
  dayOfWeek: number;
  score: number;
}

export interface WeeklyReport {
  tasksCompleted: number;
  tasksTotal: number;
  onTimePercentage: number;
  focusHours: number;
  meetingHours: number;
  emailVolume: number;
  avgBurnoutScore: number;
  bestDay: string;
  worstDay: string;
  insight: string;
  comparedToLastWeek: number;
}

// ---- helpers ----
function dateString(daysAgo: number): string {
  const d = new Date();
  d.setDate(d.getDate() - daysAgo);
  return d.toISOString().split('T')[0];
}

function dayName(daysAgo: number): string {
  const d = new Date();
  d.setDate(d.getDate() - daysAgo);
  return d.toLocaleDateString('en-US', { weekday: 'long' });
}

function clamp(value: number, min: number, max: number): number {
  return Math.max(min, Math.min(max, value));
}

/**
 * Seed-based pseudo-random for deterministic but realistic-looking data.
 * Uses a simple linear congruential generator so the same daysAgo offset
 * always produces the same data across hot-reloads.
 */
function seededRandom(seed: number): number {
  const x = Math.sin(seed * 9301 + 49297) * 233280;
  return x - Math.floor(x);
}

// ---- 30 days of daily data ----
function generateDailyData(): DailyProductivity[] {
  const data: DailyProductivity[] = [];

  for (let i = 29; i >= 0; i--) {
    const seed = i;
    const rand = () => seededRandom(seed + data.length * 7);
    const d = new Date();
    d.setDate(d.getDate() - i);
    const dayOfWeek = d.getDay(); // 0=Sun … 6=Sat
    const isWeekend = dayOfWeek === 0 || dayOfWeek === 6;

    // Realistic patterns: lower output on weekends, burnout creeping up mid-week
    const baseTasks = isWeekend ? 2 : 7;
    const totalTasks = isWeekend
      ? Math.round(baseTasks + rand() * 3)
      : Math.round(baseTasks + rand() * 6);

    const completionRate = isWeekend ? 0.7 + rand() * 0.3 : 0.5 + rand() * 0.45;
    const completed = Math.round(totalTasks * completionRate);

    const focusHours = isWeekend
      ? Math.round((1 + rand() * 3) * 10) / 10
      : Math.round((3 + rand() * 4) * 10) / 10;

    const meetingHours = isWeekend
      ? 0
      : Math.round((1 + rand() * 4) * 10) / 10;

    // Burnout follows a wave — builds up during the week, dips on weekends
    const weekProgress = dayOfWeek / 6; // 0 on Sunday, 1 on Saturday
    const baseBurnout = isWeekend ? 25 : 35 + weekProgress * 25;
    const burnoutScore = clamp(
      Math.round(baseBurnout + (rand() - 0.5) * 20),
      12,
      88,
    );

    // Productivity inversely correlated with burnout
    const productivityScore = clamp(
      Math.round(100 - burnoutScore * 0.6 + rand() * 20),
      20,
      95,
    );

    // Energy peaks early in the week, dips by Thursday/Friday
    const energyBase = isWeekend ? 70 : 75 - weekProgress * 20;
    const energyLevel = clamp(
      Math.round(energyBase + (rand() - 0.3) * 25),
      25,
      95,
    );

    data.push({
      date: dateString(i),
      tasksCompleted: completed,
      tasksTotal: totalTasks,
      focusHours,
      meetingHours,
      burnoutScore,
      productivityScore,
      energyLevel,
    });
  }

  return data;
}

// ---- 7×24 hourly heatmap ----
function generateHourlyData(): HourlyProductivity[] {
  const data: HourlyProductivity[] = [];

  for (let day = 0; day < 7; day++) {
    for (let hour = 0; hour < 24; hour++) {
      let score: number;
      const isWeekend = day === 0 || day === 6;

      if (hour < 6 || hour > 22) {
        // Night — very low
        score = Math.round(5 + seededRandom(day * 24 + hour) * 10);
      } else if (hour >= 6 && hour < 9) {
        // Early morning — ramp up
        score = isWeekend
          ? Math.round(15 + seededRandom(day * 24 + hour) * 25)
          : Math.round(30 + seededRandom(day * 24 + hour) * 35);
      } else if (hour >= 9 && hour < 12) {
        // Morning peak
        score = isWeekend
          ? Math.round(30 + seededRandom(day * 24 + hour) * 30)
          : Math.round(70 + seededRandom(day * 24 + hour) * 25);
      } else if (hour >= 12 && hour < 14) {
        // Lunch dip
        score = isWeekend
          ? Math.round(20 + seededRandom(day * 24 + hour) * 20)
          : Math.round(35 + seededRandom(day * 24 + hour) * 25);
      } else if (hour >= 14 && hour < 17) {
        // Afternoon — moderate to high
        score = isWeekend
          ? Math.round(25 + seededRandom(day * 24 + hour) * 25)
          : Math.round(55 + seededRandom(day * 24 + hour) * 30);
      } else if (hour >= 17 && hour < 20) {
        // Evening wind-down
        score = isWeekend
          ? Math.round(20 + seededRandom(day * 24 + hour) * 30)
          : Math.round(25 + seededRandom(day * 24 + hour) * 30);
      } else {
        // Late evening
        score = Math.round(10 + seededRandom(day * 24 + hour) * 20);
      }

      data.push({
        hour,
        dayOfWeek: day,
        score: clamp(score, 0, 100),
      });
    }
  }

  return data;
}

// ---- weekly report ----
function generateWeeklyReport(dailyData: DailyProductivity[]): WeeklyReport {
  const thisWeek = dailyData.slice(-7);
  const lastWeek = dailyData.slice(-14, -7);

  const totalCompleted = thisWeek.reduce((sum, d) => sum + d.tasksCompleted, 0);
  const totalTasks = thisWeek.reduce((sum, d) => sum + d.tasksTotal, 0);
  const onTime = totalTasks > 0 ? Math.round((totalCompleted / totalTasks) * 100) : 0;
  const focusHrs = Math.round(thisWeek.reduce((sum, d) => sum + d.focusHours, 0) * 10) / 10;
  const meetingHrs = Math.round(thisWeek.reduce((sum, d) => sum + d.meetingHours, 0) * 10) / 10;
  const avgBurnout = Math.round(thisWeek.reduce((sum, d) => sum + d.burnoutScore, 0) / thisWeek.length);

  // Find best and worst days
  const sorted = [...thisWeek].sort((a, b) => b.productivityScore - a.productivityScore);
  const bestDay = dayName(dailyData.length - 1 - dailyData.indexOf(sorted[0]));
  const worstDay = dayName(dailyData.length - 1 - dailyData.indexOf(sorted[sorted.length - 1]));

  // Compared to last week
  const lastWeekCompleted = lastWeek.reduce((sum, d) => sum + d.tasksCompleted, 0);
  const change = lastWeekCompleted > 0
    ? Math.round(((totalCompleted - lastWeekCompleted) / lastWeekCompleted) * 100)
    : 0;

  // Dynamic insight
  let insight: string;
  if (avgBurnout > 60) {
    insight = `Your burnout score averaged ${avgBurnout} this week. Consider blocking recovery time and declining non-essential meetings.`;
  } else if (meetingHrs > 15) {
    insight = `You spent ${meetingHrs}h in meetings this week — that's ${Math.round((meetingHrs / (focusHrs + meetingHrs)) * 100)}% of your scheduled time. Try to protect more focus blocks.`;
  } else if (onTime > 80) {
    insight = `Great week! You completed ${onTime}% of tasks on time. Your best productivity was on ${bestDay}. Keep up the momentum.`;
  } else {
    insight = `You completed ${totalCompleted} of ${totalTasks} tasks this week (${onTime}%). Focus on reducing work-in-progress to improve throughput.`;
  }

  return {
    tasksCompleted: totalCompleted,
    tasksTotal: totalTasks,
    onTimePercentage: onTime,
    focusHours: focusHrs,
    meetingHours: meetingHrs,
    emailVolume: Math.round(35 + seededRandom(42) * 45),
    avgBurnoutScore: avgBurnout,
    bestDay,
    worstDay,
    insight,
    comparedToLastWeek: change,
  };
}

// ---- exports ----
export const dailyProductivity: DailyProductivity[] = generateDailyData();
export const hourlyProductivity: HourlyProductivity[] = generateHourlyData();
export const weeklyReport: WeeklyReport = generateWeeklyReport(dailyProductivity);

/**
 * Get the most recent burnout score
 */
export function getCurrentBurnoutScore(): number {
  return dailyProductivity[dailyProductivity.length - 1].burnoutScore;
}

/**
 * Get average productivity for the last N days
 */
export function getAverageProductivity(days = 7): number {
  const slice = dailyProductivity.slice(-days);
  return Math.round(slice.reduce((sum, d) => sum + d.productivityScore, 0) / slice.length);
}

/**
 * Get productivity trend (positive = improving)
 */
export function getProductivityTrend(): number {
  const recent = getAverageProductivity(7);
  const prior = getAverageProductivity(14) - recent; // crude prior-week avg
  return recent - (getAverageProductivity(14) - prior);
}

/**
 * Get peak productivity hours (top 5)
 */
export function getPeakHours(): HourlyProductivity[] {
  // Only weekday data (days 1-5)
  const weekdayHours = hourlyProductivity.filter(
    (h) => h.dayOfWeek >= 1 && h.dayOfWeek <= 5,
  );

  // Average each hour across weekdays
  const avgByHour: { hour: number; avg: number }[] = [];
  for (let hr = 0; hr < 24; hr++) {
    const scores = weekdayHours.filter((h) => h.hour === hr).map((h) => h.score);
    const avg = scores.reduce((s, v) => s + v, 0) / scores.length;
    avgByHour.push({ hour: hr, avg: Math.round(avg) });
  }

  return avgByHour
    .sort((a, b) => b.avg - a.avg)
    .slice(0, 5)
    .map((h) => ({ hour: h.hour, dayOfWeek: -1, score: h.avg }));
}
