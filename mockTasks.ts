/**
 * Mock Tasks — Last Minute Life Saver
 * All dates are relative to today so data always looks fresh.
 */

export interface Task {
  id: string;
  title: string;
  description: string;
  category: 'work' | 'personal' | 'health' | 'learning' | 'admin' | 'creative' | 'meeting' | 'finance';
  source: 'gmail' | 'slack' | 'whatsapp' | 'calendar' | 'manual' | 'telegram';
  status: 'pending' | 'in-progress' | 'completed' | 'deferred' | 'delegated' | 'dropped';
  priorityScore: number;
  priorityBand: 'critical' | 'high' | 'medium' | 'low';
  deadline: string;
  createdAt: string;
  estimatedMinutes: number;
  assignee?: string;
  delegatedTo?: string;
  senderName?: string;
  tags: string[];
  linkedGoal?: string;
  isRecurring?: boolean;
  dependencies?: string[];

  // Advanced AI fields
  completionProbability: number; // 0-100
  deadlineRisk: 'low' | 'medium' | 'high' | 'critical';
  bestFocusTime: string;
  energyRequired: 'low' | 'medium' | 'high';
  aiRecommendation: string;
  impactScore: number;
  confidenceScore: number;
  taskBreakdown: string[];
  taskTimeline: { title: string; duration: string; completed: boolean }[];
}

// ---- helpers to generate relative dates ----
function daysFromNow(days: number, hour = 9, minute = 0): string {
  const d = new Date();
  d.setDate(d.getDate() + days);
  d.setHours(hour, minute, 0, 0);
  return d.toISOString();
}

function daysAgo(days: number, hour = 10, minute = 0): string {
  return daysFromNow(-days, hour, minute);
}

// ---- mock data ----
export const mockTasks: Task[] = [
  // ===== CRITICAL / OVERDUE =====
  {
    id: 'task-001',
    title: 'Finalize Q3 budget review',
    description: 'Complete the budget review spreadsheet and submit to finance team for approval. CFO needs it before board meeting.',
    category: 'finance',
    source: 'gmail',
    status: 'in-progress',
    priorityScore: 95,
    priorityBand: 'critical',
    deadline: daysFromNow(-1, 17, 0), // overdue — yesterday
    createdAt: daysAgo(5),
    estimatedMinutes: 90,
    senderName: 'Priya Sharma (CFO)',
    tags: ['finance', 'q3', 'board-meeting'],
    linkedGoal: 'Hit Q3 revenue target',
    dependencies: ['task-003'],

    // AI fields
    completionProbability: 48,
    deadlineRisk: 'critical',
    bestFocusTime: '9:00 AM',
    energyRequired: 'high',
    aiRecommendation: 'Overdue task requested by CFO. Success probability has degraded. Tackle this in your morning high-energy peak.',
    impactScore: 95,
    confidenceScore: 92,
    taskBreakdown: [
      'Audit Q3 spreadsheet for anomalies',
      'Integrate department expense projections',
      'Format and send PDF draft to Priya',
    ],
    taskTimeline: [
      { title: 'Validate raw numbers', duration: '30m', completed: true },
      { title: 'Run expense models', duration: '40m', completed: false },
      { title: 'Generate executive summary', duration: '20m', completed: false },
    ],
  },
  {
    id: 'task-002',
    title: 'Submit client proposal to Acme Corp',
    description: 'Final version of the SaaS integration proposal including revised pricing tier and implementation timeline.',
    category: 'work',
    source: 'slack',
    status: 'pending',
    priorityScore: 92,
    priorityBand: 'critical',
    deadline: daysFromNow(0, 18, 0), // due today
    createdAt: daysAgo(3),
    estimatedMinutes: 120,
    senderName: 'Rahul Verma',
    tags: ['sales', 'proposal', 'acme-corp'],
    linkedGoal: 'Close 3 enterprise deals',

    // AI fields
    completionProbability: 79,
    deadlineRisk: 'high',
    bestFocusTime: '10:00 AM',
    energyRequired: 'high',
    aiRecommendation: 'Crucial for closing the Acme Corp deal. Delaying it past today will decrease completion success to 48% due to tomorrow\'s schedule conflicts.',
    impactScore: 90,
    confidenceScore: 88,
    taskBreakdown: [
      'Write revised pricing sheet',
      'Draft SaaS timeline specs',
      'Send document package to Acme stakeholders',
    ],
    taskTimeline: [
      { title: 'Draft SaaS spec', duration: '60m', completed: false },
      { title: 'Compile pricing tiers', duration: '30m', completed: false },
      { title: 'Review and send package', duration: '30m', completed: false },
    ],
  },
  {
    id: 'task-003',
    title: 'Review and sign vendor contract',
    description: 'Legal has sent the final draft of the CloudHost vendor contract. Review terms, flag concerns, and DocuSign.',
    category: 'admin',
    source: 'gmail',
    status: 'pending',
    priorityScore: 88,
    priorityBand: 'critical',
    deadline: daysFromNow(0, 15, 0), // due today
    createdAt: daysAgo(4),
    estimatedMinutes: 45,
    senderName: 'Legal Team',
    tags: ['legal', 'contract', 'vendor'],

    // AI fields
    completionProbability: 82,
    deadlineRisk: 'high',
    bestFocusTime: '11:30 AM',
    energyRequired: 'medium',
    aiRecommendation: 'Overlaps with your afternoon sync block. Review in late morning to unblock engineering hosting deployment.',
    impactScore: 85,
    confidenceScore: 90,
    taskBreakdown: [
      'Verify SLA parameters in contract',
      'Check pricing terms against quote',
      'Apply signature in DocuSign',
    ],
    taskTimeline: [
      { title: 'SLA verification', duration: '20m', completed: false },
      { title: 'Docusign signing', duration: '25m', completed: false },
    ],
  },

  // ===== HIGH PRIORITY — DUE SOON =====
  {
    id: 'task-004',
    title: 'Prepare sprint demo presentation',
    description: 'Create slides for the sprint demo showcasing the new dashboard features. Include metrics and screenshots.',
    category: 'work',
    source: 'slack',
    status: 'pending',
    priorityScore: 78,
    priorityBand: 'high',
    deadline: daysFromNow(1, 10, 0), // tomorrow
    createdAt: daysAgo(2),
    estimatedMinutes: 60,
    senderName: 'Ananya Gupta',
    tags: ['sprint', 'demo', 'presentation'],
    linkedGoal: 'Ship dashboard v2',
    dependencies: ['task-006'],

    // AI fields
    completionProbability: 85,
    deadlineRisk: 'medium',
    bestFocusTime: '2:00 PM',
    energyRequired: 'medium',
    aiRecommendation: 'Depends on fixing the payment module bug first. Focus on slide assembly during your post-lunch recovery hour.',
    impactScore: 80,
    confidenceScore: 86,
    taskBreakdown: [
      'Collect feature screenshots',
      'Write slide outline',
      'Record 2-min demo walkthrough',
    ],
    taskTimeline: [
      { title: 'Gather screenshots', duration: '15m', completed: false },
      { title: 'Build slides structure', duration: '30m', completed: false },
      { title: 'Record video demo', duration: '15m', completed: false },
    ],
  },
  {
    id: 'task-005',
    title: 'Doctor appointment — annual check-up',
    description: 'Annual health check-up at Apollo Clinic. Bring previous reports and insurance card.',
    category: 'health',
    source: 'calendar',
    status: 'pending',
    priorityScore: 75,
    priorityBand: 'high',
    deadline: daysFromNow(1, 11, 30),
    createdAt: daysAgo(14),
    estimatedMinutes: 90,
    tags: ['health', 'appointment'],
    isRecurring: true,

    // AI fields
    completionProbability: 95,
    deadlineRisk: 'low',
    bestFocusTime: '11:00 AM',
    energyRequired: 'low',
    aiRecommendation: 'Scheduled medical slot. Ensure commute buffers are blocked on your calendar.',
    impactScore: 70,
    confidenceScore: 98,
    taskBreakdown: [
      'Pre-register on Apollo health app',
      'Pack medical reports portfolio',
      'Block transit times in calendar',
    ],
    taskTimeline: [
      { title: 'App registration', duration: '10m', completed: false },
      { title: 'Pack records portfolio', duration: '10m', completed: false },
    ],
  },
  {
    id: 'task-006',
    title: 'Fix critical bug in payment module',
    description: 'Users are experiencing a race condition when applying discount codes during checkout. P0 bug.',
    category: 'work',
    source: 'slack',
    status: 'in-progress',
    priorityScore: 82,
    priorityBand: 'high',
    deadline: daysFromNow(0, 23, 59), // due today
    createdAt: daysAgo(1),
    estimatedMinutes: 180,
    senderName: 'DevOps Alert',
    tags: ['bug', 'p0', 'payments'],
    linkedGoal: 'Zero critical bugs in prod',
    assignee: 'Birendra',

    // AI fields
    completionProbability: 65,
    deadlineRisk: 'high',
    bestFocusTime: '9:30 AM',
    energyRequired: 'high',
    aiRecommendation: 'High cognitive complexity. Recommended to resolve in morning session while focus score is peak.',
    impactScore: 95,
    confidenceScore: 75,
    taskBreakdown: [
      'Write integration test replicating race condition',
      'Apply mutex lock in payment middleware',
      'Verify fix on staging build',
    ],
    taskTimeline: [
      { title: 'Write failing test case', duration: '60m', completed: true },
      { title: 'Refactor middleware logic', duration: '90m', completed: false },
      { title: 'Verify checkout pipelines', duration: '30m', completed: false },
    ],
  },
  {
    id: 'task-007',
    title: 'Reply to investor update email',
    description: 'Respond to Sequoia partner with updated MRR numbers, user growth stats, and product roadmap highlights.',
    category: 'work',
    source: 'gmail',
    status: 'pending',
    priorityScore: 72,
    priorityBand: 'high',
    deadline: daysFromNow(2, 12, 0),
    createdAt: daysAgo(1),
    estimatedMinutes: 30,
    senderName: 'Amit Desai (Sequoia)',
    tags: ['investor', 'email', 'metrics'],
    linkedGoal: 'Close Series A',

    // AI fields
    completionProbability: 90,
    deadlineRisk: 'low',
    bestFocusTime: '4:00 PM',
    energyRequired: 'low',
    aiRecommendation: 'Quick win. Draft and send during your late-afternoon email batch block.',
    impactScore: 88,
    confidenceScore: 94,
    taskBreakdown: [
      'Extract MRR metrics from Stripe dashboard',
      'Format user growth sparklines',
      'Draft email reply template',
    ],
    taskTimeline: [
      { title: 'Gather Stripe data', duration: '10m', completed: false },
      { title: 'Write email draft', duration: '20m', completed: false },
    ],
  },

  // ===== MEDIUM PRIORITY =====
  {
    id: 'task-008',
    title: 'Write blog post on AI productivity',
    description: 'Draft a 1500-word blog post about how AI tools can boost personal productivity. Include case studies.',
    category: 'creative',
    source: 'manual',
    status: 'pending',
    priorityScore: 55,
    priorityBand: 'medium',
    deadline: daysFromNow(4, 17, 0),
    createdAt: daysAgo(7),
    estimatedMinutes: 120,
    tags: ['blog', 'content', 'ai'],
    linkedGoal: 'Publish 2 blog posts per month',

    // AI fields
    completionProbability: 75,
    deadlineRisk: 'low',
    bestFocusTime: '10:00 AM',
    energyRequired: 'medium',
    aiRecommendation: 'Fits ideal creative slot on Thursday morning. Block out distractions.',
    impactScore: 50,
    confidenceScore: 80,
    taskBreakdown: [
      'Create outline and select case studies',
      'Write first draft (1200 words)',
      'Edit and add featured graphic asset',
    ],
    taskTimeline: [
      { title: 'Blog outline design', duration: '30m', completed: false },
      { title: 'Draft content body', duration: '90m', completed: false },
    ],
  },
  {
    id: 'task-009',
    title: 'Conduct 1-on-1 with Neha',
    description: 'Weekly 1-on-1 with Neha. Discuss project progress, blockers, and career development goals.',
    category: 'meeting',
    source: 'calendar',
    status: 'pending',
    priorityScore: 52,
    priorityBand: 'medium',
    deadline: daysFromNow(2, 14, 0),
    createdAt: daysAgo(7),
    estimatedMinutes: 30,
    tags: ['1-on-1', 'management'],
    isRecurring: true,

    // AI fields
    completionProbability: 98,
    deadlineRisk: 'low',
    bestFocusTime: '2:00 PM',
    energyRequired: 'low',
    aiRecommendation: 'Collaborative meeting. Review Neha\'s project update before starting.',
    impactScore: 60,
    confidenceScore: 99,
    taskBreakdown: [
      'Read Neha\'s status report doc',
      'Note key agenda review items',
    ],
    taskTimeline: [
      { title: 'Agenda prep', duration: '30m', completed: false },
    ],
  },
  {
    id: 'task-010',
    title: 'Complete React Native course — Module 5',
    description: 'Finish module 5 of the Udemy React Native course: Navigation & State Management.',
    category: 'learning',
    source: 'manual',
    status: 'in-progress',
    priorityScore: 45,
    priorityBand: 'medium',
    deadline: daysFromNow(5, 20, 0),
    createdAt: daysAgo(10),
    estimatedMinutes: 90,
    tags: ['course', 'react-native', 'learning'],
    linkedGoal: 'Master mobile development',

    // AI fields
    completionProbability: 80,
    deadlineRisk: 'low',
    bestFocusTime: '7:30 AM',
    energyRequired: 'medium',
    aiRecommendation: 'Schedule post-exercise during cognitive boost block.',
    impactScore: 40,
    confidenceScore: 85,
    taskBreakdown: [
      'Watch lecture videos (45 mins)',
      'Complete modules code challenge',
    ],
    taskTimeline: [
      { title: 'Watch lectures', duration: '45m', completed: true },
      { title: 'Code exercises', duration: '45m', completed: false },
    ],
  },

  // ===== COMPLETED =====
  {
    id: 'task-017',
    title: 'Send weekly team standup summary',
    description: 'Compile all standup notes from the week and send consolidated summary to leadership.',
    category: 'work',
    source: 'slack',
    status: 'completed',
    priorityScore: 60,
    priorityBand: 'medium',
    deadline: daysAgo(0, 12, 0),
    createdAt: daysAgo(1),
    estimatedMinutes: 20,
    tags: ['standup', 'summary', 'team'],
    isRecurring: true,

    // AI fields
    completionProbability: 100,
    deadlineRisk: 'low',
    bestFocusTime: '11:00 AM',
    energyRequired: 'low',
    aiRecommendation: 'Task complete.',
    impactScore: 60,
    confidenceScore: 100,
    taskBreakdown: [],
    taskTimeline: [],
  },
  {
    id: 'task-018',
    title: 'Pay credit card bill',
    description: 'HDFC credit card bill due. Auto-pay is set but verify the amount and check for any disputes.',
    category: 'finance',
    source: 'gmail',
    status: 'completed',
    priorityScore: 70,
    priorityBand: 'high',
    deadline: daysAgo(1, 23, 59),
    createdAt: daysAgo(5),
    estimatedMinutes: 10,
    senderName: 'HDFC Bank',
    tags: ['finance', 'bill', 'credit-card'],

    // AI fields
    completionProbability: 100,
    deadlineRisk: 'low',
    bestFocusTime: '9:00 AM',
    energyRequired: 'low',
    aiRecommendation: 'Task complete.',
    impactScore: 90,
    confidenceScore: 100,
    taskBreakdown: [],
    taskTimeline: [],
  },
];

/**
 * Helper to get today's date string (YYYY-MM-DD)
 */
export function getTodayString(): string {
  return new Date().toISOString().split('T')[0];
}

/**
 * Check if a deadline is overdue
 */
export function isOverdue(deadline: string): boolean {
  return new Date(deadline) < new Date();
}

/**
 * Check if a deadline is today
 */
export function isToday(deadline: string): boolean {
  const d = new Date(deadline);
  const now = new Date();
  return (
    d.getFullYear() === now.getFullYear() &&
    d.getMonth() === now.getMonth() &&
    d.getDate() === now.getDate()
  );
}

/**
 * Get human-readable relative deadline
 */
export function getRelativeDeadline(deadline: string): string {
  const d = new Date(deadline);
  const now = new Date();
  const diffMs = d.getTime() - now.getTime();
  const diffHours = diffMs / (1000 * 60 * 60);
  const diffDays = diffMs / (1000 * 60 * 60 * 24);

  if (diffHours < -24) return `${Math.abs(Math.ceil(diffDays))}d overdue`;
  if (diffHours < 0) return `${Math.abs(Math.ceil(diffHours))}h overdue`;
  if (diffHours < 1) return `${Math.max(1, Math.ceil(diffMs / 60000))}m left`;
  if (diffHours < 24) return `${Math.ceil(diffHours)}h left`;
  if (diffDays < 7) return `${Math.ceil(diffDays)}d left`;
  return `${Math.ceil(diffDays / 7)}w left`;
}
