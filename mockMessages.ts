/**
 * Mock Scanned Messages — Last Minute Life Saver
 * Simulated extracted messages from Gmail, Slack, WhatsApp, Telegram
 */

export interface ScannedMessage {
  id: string;
  platform: 'gmail' | 'slack' | 'whatsapp' | 'telegram';
  sender: string;
  senderEmail?: string;
  subject?: string;
  preview: string;
  extractedTask?: string;
  extractedDeadline?: string;
  urgencySignals: string[];
  sentiment: 'positive' | 'neutral' | 'urgent' | 'negative';
  timestamp: string;
  isProcessed: boolean;
  confidence: number;
}

function hoursAgo(h: number): string {
  const d = new Date();
  d.setHours(d.getHours() - h);
  return d.toISOString();
}

function daysFromNow(days: number, hour = 17): string {
  const d = new Date();
  d.setDate(d.getDate() + days);
  d.setHours(hour, 0, 0, 0);
  return d.toISOString();
}

export const mockMessages: ScannedMessage[] = [
  // ===== GMAIL =====
  {
    id: 'msg-001',
    platform: 'gmail',
    sender: 'Priya Sharma',
    senderEmail: 'priya.sharma@company.com',
    subject: 'URGENT: Q3 Budget — Need Your Sign-off',
    preview: 'Hi Gunjan, the board meeting is tomorrow and I still haven\'t received your reviewed budget sheet. Can you please finalize and send it by EOD? This is blocking the entire finance review.',
    extractedTask: 'Finalize and send Q3 budget review',
    extractedDeadline: daysFromNow(0, 18),
    urgencySignals: ['URGENT', 'blocking', 'EOD', 'tomorrow'],
    sentiment: 'urgent',
    timestamp: hoursAgo(2),
    isProcessed: true,
    confidence: 0.95,
  },
  {
    id: 'msg-002',
    platform: 'gmail',
    sender: 'Amit Desai',
    senderEmail: 'amit.desai@sequoia.com',
    subject: 'Re: Monthly Investor Update — June',
    preview: 'Thanks for the May update. Could you share the June numbers by Wednesday? Would love to see MRR growth and the new feature adoption metrics before our partner meeting.',
    extractedTask: 'Send June investor update with MRR and adoption metrics',
    extractedDeadline: daysFromNow(2, 12),
    urgencySignals: ['by Wednesday', 'partner meeting'],
    sentiment: 'neutral',
    timestamp: hoursAgo(8),
    isProcessed: true,
    confidence: 0.88,
  },
  {
    id: 'msg-003',
    platform: 'gmail',
    sender: 'Legal Team',
    senderEmail: 'legal@company.com',
    subject: 'CloudHost Vendor Contract — Final Draft',
    preview: 'Please review the attached contract and sign via DocuSign. The vendor has given us until end of today to execute. Key changes: liability cap updated, SLA terms revised.',
    extractedTask: 'Review and sign CloudHost vendor contract',
    extractedDeadline: daysFromNow(0, 15),
    urgencySignals: ['end of today', 'sign', 'final'],
    sentiment: 'urgent',
    timestamp: hoursAgo(5),
    isProcessed: true,
    confidence: 0.93,
  },
  {
    id: 'msg-004',
    platform: 'gmail',
    sender: 'HDFC Bank',
    senderEmail: 'alerts@hdfcbank.com',
    subject: 'Credit Card Statement — June 2026',
    preview: 'Your credit card statement for June 2026 is ready. Total due: ₹47,325. Payment due date: July 5. Auto-pay is enabled.',
    extractedTask: 'Verify credit card bill and check for disputes',
    extractedDeadline: daysFromNow(5, 23),
    urgencySignals: ['payment due'],
    sentiment: 'neutral',
    timestamp: hoursAgo(12),
    isProcessed: false,
    confidence: 0.72,
  },

  // ===== SLACK =====
  {
    id: 'msg-005',
    platform: 'slack',
    sender: 'Ananya Gupta',
    subject: '#engineering',
    preview: '@Gunjan sprint demo is Thursday. Can you prep the dashboard demo slides? I\'ve added the Jira tickets to the shared doc. Let me know if you need the latest Figma exports.',
    extractedTask: 'Prepare sprint demo presentation with dashboard features',
    extractedDeadline: daysFromNow(1, 10),
    urgencySignals: ['Thursday', 'demo'],
    sentiment: 'neutral',
    timestamp: hoursAgo(3),
    isProcessed: true,
    confidence: 0.91,
  },
  {
    id: 'msg-006',
    platform: 'slack',
    sender: 'DevOps Alert',
    subject: '#alerts-production',
    preview: '🚨 P0 BUG: Payment module — Race condition detected in discount code application. 23 failed transactions in last hour. Sentry link: https://sentry.io/issue/48291',
    extractedTask: 'Fix race condition in payment module discount code flow',
    extractedDeadline: daysFromNow(0, 23),
    urgencySignals: ['🚨', 'P0', 'failed transactions', 'race condition'],
    sentiment: 'negative',
    timestamp: hoursAgo(1),
    isProcessed: true,
    confidence: 0.97,
  },
  {
    id: 'msg-007',
    platform: 'slack',
    sender: 'Vikram Singh',
    subject: '#pull-requests',
    preview: 'Hey @Gunjan, PR #482 for the auth refactor is ready for review. Added unit tests and updated the API docs. Would appreciate a review by tomorrow so I can merge before sprint end.',
    extractedTask: 'Review PR #482 — Authentication module refactor',
    extractedDeadline: daysFromNow(2, 17),
    urgencySignals: ['by tomorrow', 'sprint end'],
    sentiment: 'neutral',
    timestamp: hoursAgo(6),
    isProcessed: true,
    confidence: 0.89,
  },
  {
    id: 'msg-008',
    platform: 'slack',
    sender: 'Riya Patel',
    subject: '#general',
    preview: 'Team offsite is confirmed for July 15! I\'ll handle the venue and catering. @Gunjan can you help with travel arrangements for the Bangalore folks? Need to book by Friday.',
    extractedTask: 'Arrange travel for Bangalore team for July offsite',
    extractedDeadline: daysFromNow(5, 17),
    urgencySignals: ['by Friday', 'need to book'],
    sentiment: 'positive',
    timestamp: hoursAgo(10),
    isProcessed: true,
    confidence: 0.85,
  },

  // ===== WHATSAPP =====
  {
    id: 'msg-009',
    platform: 'whatsapp',
    sender: 'Rahul Verma',
    preview: 'Bro, the Acme Corp team is expecting the proposal today. Their VP mentioned they\'re evaluating 2 other vendors. Let\'s not lose this one — can you send the final version by 6 PM?',
    extractedTask: 'Submit finalized proposal to Acme Corp',
    extractedDeadline: daysFromNow(0, 18),
    urgencySignals: ['today', 'by 6 PM', '2 other vendors', 'lose this'],
    sentiment: 'urgent',
    timestamp: hoursAgo(1),
    isProcessed: true,
    confidence: 0.94,
  },
  {
    id: 'msg-010',
    platform: 'whatsapp',
    sender: 'FitClub Gym',
    preview: 'Hi Gunjan! Your membership expires on July 3. Renew now and get 15% off the annual plan. Visit our app or the front desk. Use code: RENEW15.',
    extractedTask: 'Renew gym membership (15% discount available)',
    extractedDeadline: daysFromNow(3, 20),
    urgencySignals: ['expires'],
    sentiment: 'neutral',
    timestamp: hoursAgo(24),
    isProcessed: false,
    confidence: 0.78,
  },
  {
    id: 'msg-011',
    platform: 'whatsapp',
    sender: 'Mom',
    preview: 'Beta, don\'t forget your doctor appointment on Wednesday at 11:30 AM. Take your old reports. Papa is also coming. Should I book an Uber?',
    extractedTask: 'Doctor appointment — annual check-up',
    extractedDeadline: daysFromNow(1, 11),
    urgencySignals: ['appointment', 'Wednesday'],
    sentiment: 'positive',
    timestamp: hoursAgo(15),
    isProcessed: true,
    confidence: 0.92,
  },

  // ===== TELEGRAM =====
  {
    id: 'msg-012',
    platform: 'telegram',
    sender: 'Karan Mehta',
    preview: 'Hey, can you research the pricing models of our top 5 competitors? The strategy team needs this for the pricing workshop next week. No hard deadline but sooner the better.',
    extractedTask: 'Research competitor pricing models for strategy workshop',
    extractedDeadline: daysFromNow(7, 17),
    urgencySignals: ['next week', 'sooner the better'],
    sentiment: 'neutral',
    timestamp: hoursAgo(48),
    isProcessed: true,
    confidence: 0.81,
  },
  {
    id: 'msg-013',
    platform: 'telegram',
    sender: 'Startup Founders Group',
    preview: 'Great discussion today on product-market fit! @Gunjan your point about user retention was spot on. Sharing the deck from today\'s session — check it out when you can.',
    urgencySignals: [],
    sentiment: 'positive',
    timestamp: hoursAgo(20),
    isProcessed: false,
    confidence: 0.15,
  },
  {
    id: 'msg-014',
    platform: 'slack',
    sender: 'Neha Kapoor',
    subject: '#dm',
    preview: 'Hey Gunjan, can we catch up this week? I wanted to discuss my career path and get your thoughts on the tech lead role. Also have some blockers on the API integration I want to walk through.',
    extractedTask: 'Schedule 1-on-1 with Neha to discuss career growth',
    extractedDeadline: daysFromNow(2, 14),
    urgencySignals: ['this week'],
    sentiment: 'neutral',
    timestamp: hoursAgo(7),
    isProcessed: true,
    confidence: 0.83,
  },
];

/**
 * Get unprocessed messages
 */
export function getUnprocessedMessages(): ScannedMessage[] {
  return mockMessages.filter((m) => !m.isProcessed);
}

/**
 * Get urgent messages
 */
export function getUrgentMessages(): ScannedMessage[] {
  return mockMessages.filter((m) => m.sentiment === 'urgent');
}

/**
 * Get messages by platform
 */
export function getMessagesByPlatform(platform: ScannedMessage['platform']): ScannedMessage[] {
  return mockMessages.filter((m) => m.platform === platform);
}
