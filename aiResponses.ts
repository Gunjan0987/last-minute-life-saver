/**
 * AI Response Engine — Last Minute Life Saver
 * Context-aware response generation for the AI Executive Assistant
 */

export interface AIResponsePattern {
  triggers: string[];
  responses: string[];
  category: 'scheduling' | 'productivity' | 'burnout' | 'general' | 'rescue' | 'goal' | 'task' | 'analysis';
}

const responsePatterns: AIResponsePattern[] = [
  // ===== SCHEDULING =====
  {
    triggers: ['schedule', 'plan', 'when', 'time', 'calendar', 'block', 'slot'],
    responses: [
      "I've analyzed your calendar and found the perfect slots. Your peak productivity is between 9-11 AM — I'd suggest scheduling deep work there. You have a 2-hour free block tomorrow morning that's ideal for your most important task.",
      "Looking at your schedule, I see 3 open slots today: 10-11:30 AM, 1-2 PM, and 4-5:30 PM. Based on your energy patterns, I'd recommend the morning slot for complex work and the afternoon for admin tasks.",
      "Your calendar is packed tomorrow with 4 meetings. I'd suggest batching your emails into two 20-minute blocks — one at 9 AM and one at 3 PM — to protect your focus time between meetings.",
    ],
    category: 'scheduling',
  },
  {
    triggers: ['reschedule', 'move', 'postpone', 'delay', 'defer', 'push'],
    responses: [
      "I can help with that! Looking at your upcoming availability, Thursday 2 PM is the next best slot. It's your typical high-energy window, and there are no conflicts. Want me to move it?",
      "Sure, I'll defer that to tomorrow. Based on your workload, the afternoon looks lighter. I'll slot it in at 2:30 PM after your last meeting. Sound good?",
      "No problem. I've found 3 alternative times this week. Tuesday at 10 AM scores highest based on your productivity patterns. Shall I reschedule?",
    ],
    category: 'scheduling',
  },
  // ===== PRODUCTIVITY =====
  {
    triggers: ['focus', 'productive', 'productivity', 'concentrate', 'deep work', 'flow'],
    responses: [
      "Your data shows you're most focused between 8-11 AM, especially on Tuesdays and Wednesdays. You complete tasks 3x faster during these windows. I'd recommend protecting this time — no meetings, no emails, just deep work.",
      "To boost focus today, I'd suggest: 1) Batch all notifications for every 90 minutes, 2) Start with your hardest task first (you have 'Architecture Design' pending), 3) Take a 10-minute break after 90 minutes. Your historical data shows this pattern gives you a 40% productivity boost.",
      "I notice you've been context-switching a lot today — 7 different task types in 3 hours. Research shows this costs 20-40% of your productive time. Try grouping similar tasks: handle all emails first, then switch to coding.",
    ],
    category: 'productivity',
  },
  {
    triggers: ['priority', 'priorities', 'important', 'urgent', 'critical', 'what first', 'top'],
    responses: [
      "Here are your top 3 priorities right now:\n\n🔴 1. Finalize Q3 budget review — Overdue, CFO waiting\n🔴 2. Client proposal for Acme Corp — Due today, revenue-blocking\n🟠 3. Team standup prep — Due in 2 hours\n\nI'd suggest tackling #1 first (estimated 45 min), then #2 (30 min). #3 can be done in 10 minutes right before the meeting.",
      "Based on the priority formula (urgency × 0.4 + importance × 0.35 + impact × 0.15 + dependencies × 0.10), your most impactful tasks today are the ones blocking other team members. 'Review Sarah's PR' is blocking 2 downstream tasks — quick win in 15 minutes.",
    ],
    category: 'task',
  },
  // ===== BURNOUT =====
  {
    triggers: ['burnout', 'tired', 'exhausted', 'overwhelmed', 'stressed', 'stress', 'too much', 'burnt out'],
    responses: [
      "I hear you. Your burnout score is currently at 62/100 (⚠️ Caution zone). Here's what's driving it:\n\n• Workload: 12 tasks today (high)\n• After-hours work: 4 hours this week\n• Recovery: Only 1 weekend day off\n\n🎯 Recommendation: Let's defer 3 non-critical tasks to tomorrow and set a hard stop at 6 PM today. Your performance actually improves 25% after proper rest.",
      "Your stress indicators are elevated. Looking at the data: you've worked 52 hours this week (your healthy average is 42). I'm going to suggest activating Energy Recovery mode — I'll mute non-urgent notifications for 2 hours and reschedule your low-priority tasks. Take a breath. You've got this. 💪",
      "Based on your patterns, burnout tends to spike when you have more than 15 hours of meetings per week. You're at 14 hours right now. I'd recommend declining the optional team social and using that time for a walk or personal task. Small recovery actions compound over time.",
    ],
    category: 'burnout',
  },
  {
    triggers: ['break', 'rest', 'breathe', 'calm', 'relax', 'meditation'],
    responses: [
      "Great idea to take a break! Here's a quick breathing exercise:\n\n🫁 Box Breathing (2 minutes):\n• Breathe in: 4 seconds\n• Hold: 4 seconds\n• Breathe out: 4 seconds\n• Hold: 4 seconds\n• Repeat 6 times\n\nI've paused your notifications for the next 5 minutes. 🧘",
      "Rest is productive! Your data shows you complete 40% more tasks after a 15-minute break vs. pushing through. I'll hold your notifications and reschedule the next 30 minutes of tasks. Take your time.",
    ],
    category: 'burnout',
  },
  // ===== RESCUE =====
  {
    triggers: ['rescue', 'sos', 'help', 'emergency', 'crisis', 'falling behind', 'behind', 'save me'],
    responses: [
      "🆘 I'm activating Rescue Mode now! Let me triage your situation:\n\n✅ MUST DO (next 2 hours): CEO email reply (5 min), Budget approval (10 min)\n⏰ DEFER: Team meeting prep → tomorrow 2 PM\n👥 DELEGATE: Data compilation → Sarah (she's available, 45 min)\n❌ DROP: Optional training → watch recording later\n\nThis gives you 90 minutes of breathing room. Ready to start with the CEO email?",
      "I can see you're overwhelmed. Here's the situation: you have 8 tasks due, but only 3 actually need your personal attention today. Let me handle the rest:\n\n1. I'll draft extension requests for 2 tasks\n2. I'll suggest Mark handles the client follow-up\n3. I'll reschedule 3 non-urgent items to Thursday\n\nThis drops your immediate workload from 8 → 3. Let's focus.",
    ],
    category: 'rescue',
  },
  // ===== GOALS =====
  {
    triggers: ['goal', 'goals', 'objective', 'target', 'q3', 'quarterly', 'annual', 'aspiration'],
    responses: [
      "Here's your goal progress:\n\n🎯 Annual: 'Become a technical leader' — 35% progress\n📊 Q3: 'Ship 2 major features' — Feature 1: 60% ✅, Feature 2: 20% ⚠️\n📅 Monthly: 'Complete system design' — 75% done\n\nFeature 2 is falling behind. You need about 8 more hours of focused work. I'd suggest scheduling 2 deep-work blocks this week (2 hours each) to catch up.",
      "Great question! 75% of your tasks this week are linked to your Q3 goals — that's excellent alignment. The 25% that aren't? Mostly admin tasks. I'd recommend delegating 2 of those to free up time for goal-aligned work.",
    ],
    category: 'goal',
  },
  {
    triggers: ['habit', 'habits', 'routine', 'streak', 'consistency', 'tracking'],
    responses: [
      "Here's your habit report:\n\n🏋️ Exercise 4x/week: 3/4 this week (75%) ⚠️\n📝 Journaling: 4/5 days (80%) ✅\n📵 No emails after 7 PM: 2/5 (40%) ❌\n📚 Read tech article: 3/5 (60%) ⚠️\n\nYour 'no emails after 7 PM' habit broke 3 days in a row. This correlates with your sleep quality dropping 15%. Want me to enable auto-DND mode after 7 PM?",
      "You've been consistent with exercise this month — 85% weekly adherence! On exercise days, your productivity jumps 25% and your burnout score drops 8 points. Keep it up! I've scheduled your workouts for next week based on your calendar gaps.",
    ],
    category: 'goal',
  },
  // ===== ANALYSIS =====
  {
    triggers: ['why', 'analyze', 'analysis', 'down', 'drop', 'decrease', 'worse', 'improve', 'insights'],
    responses: [
      "I've analyzed your recent performance. Here's what I found:\n\n📉 Productivity dipped 15% this week because:\n1. Meeting load increased by 3 hours (12→15 hours)\n2. Context switching: 8 different task types per day (healthy is 4-5)\n3. After-hours work: 6 hours (vs. your 2-hour healthy average)\n\n💡 Top recommendation: Block Tuesday and Thursday mornings for uninterrupted deep work. This single change could recover 80% of the lost productivity.",
      "Looking at the data, your performance peaks on Tuesdays and dips on Fridays. The pattern? Tuesdays have fewer meetings (avg 1.5 hours) vs. Fridays (avg 4 hours). Your energy data confirms post-meeting fatigue. Suggestion: make Fridays meeting-free admin days.",
    ],
    category: 'analysis',
  },
  {
    triggers: ['report', 'weekly', 'summary', 'stats', 'metrics', 'how am i doing', 'performance'],
    responses: [
      "📊 Your Weekly Report:\n\n✅ Tasks Completed: 34/42 (81%)\n⏰ On-Time Rate: 91%\n🎯 Focus Hours: 18/40 goal (45%)\n📧 Emails: 127 processed\n🤝 Meetings: 12 hours\n🔥 Burnout: 58/100 (Caution)\n\n📈 Trending up: Completion rate +12%, email management improved\n📉 Needs attention: Focus hours below target, burnout creeping up\n\n💡 This week, try blocking 9-11 AM daily for focus. You'll hit your 40-hour goal easily.",
    ],
    category: 'analysis',
  },
  // ===== DELEGATION =====
  {
    triggers: ['delegate', 'assign', 'team', 'who', 'member', 'send to'],
    responses: [
      "Based on your team's expertise and current workload:\n\n👩‍💻 Sarah Chen — Best for: Data analysis, research (Load: 40%, Available)\n👨‍💼 Mark Johnson — Best for: Client communication, presentations (Load: 65%, Busy)\n👨‍💻 Jake Williams — Best for: Admin, scheduling, documentation (Load: 25%, Available)\n\nFor your current task, Jake is the best match — low workload, relevant expertise, and he typically completes similar tasks in 30 minutes.",
      "I'd suggest delegating the data compilation to Sarah — she handled a similar request last week and finished it 20% faster than average. Her current load is light. Want me to draft a message to her?",
    ],
    category: 'task',
  },
  // ===== GENERAL =====
  {
    triggers: ['hello', 'hi', 'hey', 'morning', 'good'],
    responses: [
      "Hey there! 👋 Ready to make today productive. You have 8 tasks on your plate, 3 marked critical. Your burnout score is 58 — let's keep it manageable. What would you like to tackle first?",
      "Good to see you! Here's your quick briefing:\n\n📋 Tasks today: 8 (3 critical, 2 high, 3 medium)\n📊 Burnout: 58/100 — moderate, let's stay mindful\n🎯 Priority: 'Q3 Budget Review' is overdue\n💡 Tip: Your energy peaks in the next 2 hours — use them wisely!\n\nWhat can I help with?",
    ],
    category: 'general',
  },
  {
    triggers: ['what can you do', 'features', 'capabilities', 'help me with'],
    responses: [
      "I'm your AI Executive Assistant! Here's what I can do:\n\n📋 **Task Management** — Create, prioritize, schedule, delegate tasks\n📊 **Analytics** — Productivity insights, burnout tracking, weekly reports\n🆘 **Rescue Mode** — Emergency triage when things get overwhelming\n🎯 **Goal Coaching** — Track goals, build habits, stay aligned\n📅 **Scheduling** — Auto-schedule tasks at optimal times\n🧠 **Smart Suggestions** — Context-aware recommendations\n🔍 **Analysis** — Why is productivity up/down, pattern detection\n\nJust ask me anything! Try: 'Schedule my day' or 'Why is my productivity down?'",
    ],
    category: 'general',
  },
  {
    triggers: ['thanks', 'thank you', 'great', 'perfect', 'awesome', 'good job'],
    responses: [
      "Glad I could help! Remember, you're doing great — 81% task completion rate puts you in the top 20% of professionals. Keep it up! 🚀",
      "You're welcome! Let me know if anything else comes up. I'm always here to help optimize your day. 💪",
    ],
    category: 'general',
  },
  // ===== TASK SPECIFIC =====
  {
    triggers: ['add', 'create', 'new task', 'remind', 'reminder'],
    responses: [
      "I'll create that task for you. Based on the description, I'm estimating:\n\n📝 Priority: HIGH (keyword signals + deadline proximity)\n⏱️ Duration: ~45 minutes\n📅 Best time: Tomorrow 10 AM (your peak focus window)\n🏷️ Category: Work\n\nShall I schedule it automatically, or would you prefer to adjust?",
      "Task created! ✅ I've set the priority based on the deadline and added it to your schedule. It's slotted for your next available focus block. I also noticed it might depend on your 'Data Review' task — want me to link them?",
    ],
    category: 'task',
  },
  {
    triggers: ['done', 'complete', 'finished', 'mark', 'check off'],
    responses: [
      "Marked as done! ✅ Nice work — that was a high-priority task. Your completion rate for today is now 5/8 (63%). Three more to go, and you have about 3 hours of productive time left. You're on track!",
      "Completed! 🎉 That's your 3rd task done today. At this pace, you'll finish everything by 4 PM — ahead of schedule. Keep the momentum going!",
    ],
    category: 'task',
  },
  {
    triggers: ['email', 'inbox', 'messages', 'unread', 'mail'],
    responses: [
      "I've scanned your recent messages. Here's the summary:\n\n📧 Gmail: 12 unread (3 urgent, 5 normal, 4 newsletters)\n💬 Slack: 8 mentions (2 from your manager)\n📱 WhatsApp: 3 messages (1 from client)\n\nUrgent items:\n🔴 CFO Priya: 'Q3 budget needs approval TODAY'\n🔴 Client (Acme): 'Proposal feedback — can we discuss?'\n🟠 Manager: 'Team sync moved to 3 PM'\n\nI'd suggest handling the CFO email first (5 min reply), then the client message.",
    ],
    category: 'task',
  },
  {
    triggers: ['block', 'blocking', 'blocker', 'stuck', 'wait', 'waiting'],
    responses: [
      "I can see 3 blockers in your workflow right now:\n\n🔒 Task 'Submit proposal' is waiting on 'Data review' (assigned to you)\n🔒 'Deploy feature' is blocked by 'Code review' (waiting on Mark)\n🔒 'Budget approval' is blocked by 'Finance report' (overdue)\n\nQuickest unblock: Complete 'Data review' first (30 min) — this will unblock the proposal AND 2 downstream tasks. Maximum impact for minimum effort.",
    ],
    category: 'analysis',
  },
  // ===== CONTEXT-AWARE (time-based) =====
  {
    triggers: ['today', 'day', 'plan', 'morning'],
    responses: [
      "Here's your optimized day plan:\n\n☀️ Morning (Peak Energy)\n• 9:00 — Q3 Budget Review (critical, 90 min)\n• 10:30 — Break ☕\n• 10:45 — Client Proposal (high, 45 min)\n\n🌤️ Midday\n• 11:30 — Team Standup (30 min)\n• 12:00 — Lunch break 🍽️\n• 1:00 — Email batch (20 min)\n\n🌅 Afternoon (Moderate Energy)\n• 1:30 — Code Review (medium, 30 min)\n• 2:00 — 1:1 with Manager (30 min)\n• 3:00 — Admin tasks batch (45 min)\n• 4:00 — End-of-day wrap-up\n\nTotal productive time: 5.5 hours. Manageable! 👍",
    ],
    category: 'scheduling',
  },
];

/**
 * Get an AI response based on user input and context
 */
export function getAIResponse(
  input: string,
  context?: {
    burnoutScore?: number;
    taskCount?: number;
    time?: string;
    completedToday?: number;
    overdueTasks?: number;
  }
): string {
  const lowerInput = input.toLowerCase();

  // Find matching pattern
  let bestMatch: AIResponsePattern | null = null;
  let bestScore = 0;

  for (const pattern of responsePatterns) {
    let score = 0;
    for (const trigger of pattern.triggers) {
      if (lowerInput.includes(trigger.toLowerCase())) {
        score += trigger.length; // Longer matches = better
      }
    }
    if (score > bestScore) {
      bestScore = score;
      bestMatch = pattern;
    }
  }

  if (bestMatch && bestScore > 0) {
    // Pick a random response from the matching pattern
    const responses = bestMatch.responses;
    const idx = Math.floor(Math.random() * responses.length);
    let response = responses[idx];

    // Add contextual additions
    if (context?.burnoutScore && context.burnoutScore > 70) {
      response += "\n\n⚠️ Note: Your burnout score is elevated. Consider taking it easy today.";
    }

    return response;
  }

  // Default responses if no match
  const defaults = [
    "I'm here to help! You can ask me about your tasks, schedule, burnout score, goals, or anything else. Try saying 'Plan my day' or 'What should I focus on?'",
    "I didn't quite catch that. Here are some things I can help with:\n\n• 'Schedule my day'\n• 'What are my priorities?'\n• 'Show my burnout report'\n• 'Help me delegate'\n• 'Rescue me!'\n\nWhat would you like to do?",
    `Right now you have ${context?.taskCount || 'several'} tasks pending. Would you like me to help prioritize them, or would you prefer to focus on something specific?`,
  ];

  return defaults[Math.floor(Math.random() * defaults.length)];
}

/**
 * Suggestion chips for the chat interface
 */
export const suggestionChips = [
  'Plan my day',
  'What should I focus on?',
  'Show burnout report',
  'Schedule deep work',
  'Read my urgent emails',
  'Who should I delegate to?',
  'How am I doing?',
  'Rescue me! 🆘',
];
