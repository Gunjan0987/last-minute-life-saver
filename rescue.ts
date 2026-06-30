/**
 * Rescue Mode Engine
 * Trigger detection, triage algorithm, and delegation matching
 */

import { Task } from '../store/useTaskStore';

export interface RescueTrigger {
  id: string;
  name: string;
  description: string;
  condition: string;
  isTriggered: boolean;
  severity: 'warning' | 'danger' | 'critical';
  icon: string;
  value: number;
  threshold: number;
}

export interface TriageResult {
  mustDo: Task[];
  defer: Task[];
  delegate: Task[];
  drop: Task[];
}

export type TriageAction = 'mustDo' | 'defer' | 'delegate' | 'drop';

/**
 * Check all rescue mode triggers
 */
export function checkRescueTriggers(
  tasks: Task[],
  burnoutScore: number,
  urgentMessageCount: number,
  meetingCount: number
): RescueTrigger[] {
  const now = new Date();
  const twoHoursLater = new Date(now.getTime() + 2 * 60 * 60 * 1000);

  const tasksDueIn2Hours = tasks.filter(t => {
    const deadline = new Date(t.deadline);
    return t.status === 'pending' && deadline <= twoHoursLater && deadline >= now;
  }).length;

  const overdueTasks = tasks.filter(t => {
    const deadline = new Date(t.deadline);
    return t.status === 'pending' && deadline < now;
  }).length;

  const triggers: RescueTrigger[] = [
    {
      id: 'tasks-due',
      name: 'Tasks Due Soon',
      description: '3+ tasks due within 2 hours',
      condition: `${tasksDueIn2Hours} tasks due in next 2 hours`,
      isTriggered: tasksDueIn2Hours >= 3,
      severity: tasksDueIn2Hours >= 5 ? 'critical' : tasksDueIn2Hours >= 3 ? 'danger' : 'warning',
      icon: 'time-outline',
      value: tasksDueIn2Hours,
      threshold: 3,
    },
    {
      id: 'overdue',
      name: 'Overdue Tasks',
      description: '3+ tasks are past their deadline',
      condition: `${overdueTasks} tasks overdue`,
      isTriggered: overdueTasks >= 3,
      severity: overdueTasks >= 5 ? 'critical' : overdueTasks >= 3 ? 'danger' : 'warning',
      icon: 'alert-circle-outline',
      value: overdueTasks,
      threshold: 3,
    },
    {
      id: 'urgent-messages',
      name: 'Urgent Messages',
      description: '5+ urgent messages in 1 hour',
      condition: `${urgentMessageCount} urgent messages`,
      isTriggered: urgentMessageCount >= 5,
      severity: urgentMessageCount >= 8 ? 'critical' : urgentMessageCount >= 5 ? 'danger' : 'warning',
      icon: 'mail-unread-outline',
      value: urgentMessageCount,
      threshold: 5,
    },
    {
      id: 'burnout',
      name: 'Burnout Risk',
      description: 'Burnout score above 75',
      condition: `Burnout score: ${burnoutScore}`,
      isTriggered: burnoutScore > 75,
      severity: burnoutScore > 90 ? 'critical' : burnoutScore > 75 ? 'danger' : 'warning',
      icon: 'flame-outline',
      value: burnoutScore,
      threshold: 75,
    },
    {
      id: 'meetings',
      name: 'Meeting Cascade',
      description: '5+ meetings within 2 hours',
      condition: `${meetingCount} meetings ahead`,
      isTriggered: meetingCount >= 5,
      severity: meetingCount >= 7 ? 'critical' : meetingCount >= 5 ? 'danger' : 'warning',
      icon: 'people-outline',
      value: meetingCount,
      threshold: 5,
    },
  ];

  return triggers;
}

/**
 * Should rescue mode auto-activate?
 */
export function shouldAutoActivate(triggers: RescueTrigger[]): boolean {
  const triggeredCount = triggers.filter(t => t.isTriggered).length;
  const hasCritical = triggers.some(t => t.isTriggered && t.severity === 'critical');
  return triggeredCount >= 2 || hasCritical;
}

/**
 * Auto-triage tasks based on urgency and feasibility
 */
export function autoTriage(tasks: Task[]): TriageResult {
  const pendingTasks = tasks
    .filter(t => t.status === 'pending' || t.status === 'in-progress')
    .sort((a, b) => b.priorityScore - a.priorityScore);

  const result: TriageResult = {
    mustDo: [],
    defer: [],
    delegate: [],
    drop: [],
  };

  pendingTasks.forEach(task => {
    if (task.priorityBand === 'critical') {
      result.mustDo.push(task);
    } else if (task.priorityBand === 'high') {
      // High priority: do if feasible, otherwise delegate
      if (result.mustDo.length < 3) {
        result.mustDo.push(task);
      } else {
        result.delegate.push(task);
      }
    } else if (task.priorityBand === 'medium') {
      result.defer.push(task);
    } else {
      result.drop.push(task);
    }
  });

  return result;
}

/**
 * Match a task to the best team member for delegation
 */
export function matchDelegation(
  task: Task,
  teamMembers: Array<{
    id: string;
    name: string;
    expertise: string[];
    availability: string;
    speed: string;
    currentLoad: number;
  }>
): string | null {
  // Filter available members
  const available = teamMembers.filter(m => m.availability !== 'away');
  if (available.length === 0) return null;

  // Score each member
  const scored = available.map(member => {
    let score = 0;

    // Expertise match
    const taskTags = task.tags.map(t => t.toLowerCase());
    const expertiseMatch = member.expertise.filter(e =>
      taskTags.some(t => t.includes(e.toLowerCase()) || e.toLowerCase().includes(t))
    ).length;
    score += expertiseMatch * 30;

    // Availability bonus
    if (member.availability === 'available') score += 20;

    // Speed bonus
    if (member.speed === 'fast') score += 15;
    else if (member.speed === 'medium') score += 10;

    // Load penalty (less load = better)
    score -= member.currentLoad * 0.3;

    return { member, score };
  });

  // Sort by score descending
  scored.sort((a, b) => b.score - a.score);

  return scored[0]?.member.id || null;
}

/**
 * Generate communication templates for rescue mode
 */
export function getRescueTemplates(): Array<{
  id: string;
  label: string;
  template: string;
  icon: string;
}> {
  return [
    {
      id: 'running-late',
      label: 'Running Late',
      template: "Hi, I'm running behind schedule today due to unexpected priorities. I'll update you on the revised timeline shortly. Thanks for your understanding!",
      icon: 'time-outline',
    },
    {
      id: 'need-extension',
      label: 'Need Extension',
      template: "I wanted to reach out regarding the deadline for this task. Due to competing priorities, I'd like to request a 24-hour extension. I'll deliver high-quality work by the revised time. Let me know if this works.",
      icon: 'calendar-outline',
    },
    {
      id: 'delegating',
      label: 'Delegating Task',
      template: "I'm reassigning this task to ensure it gets the attention it deserves. [Team member] will be taking over and will reach out shortly with any questions. Thank you!",
      icon: 'people-outline',
    },
    {
      id: 'status-update',
      label: 'Status Update',
      template: "Quick update: I'm actively working through my priority queue today. Here's where things stand:\n• High priority items: In progress\n• Other items: Will address by [date]\nThanks for your patience!",
      icon: 'information-circle-outline',
    },
  ];
}
