import { create } from 'zustand';

interface AIStore {
  isThinking: boolean;
  thinkingSteps: string[];
  currentStepIdx: number;
  reasoningSummary: string;
  actionRecommendation: string;
  triggerThinking: (callback?: () => void) => void;
  resetAIStore: () => void;
}

const THINKING_STEPS = [
  'Reading Google Calendar events...',
  'Scanning recent Gmail messages...',
  'Analyzing WhatsApp chat notifications...',
  'Retrieving Slack workspaces alerts...',
  'Extracting hidden tasks & dates...',
  'Calculating current burnout rating...',
  'Predicting completion probabilities...',
  'Optimizing schedule configuration...',
  'Finished reasoning!',
];

export const useAIStore = create<AIStore>((set, get) => ({
  isThinking: false,
  thinkingSteps: THINKING_STEPS,
  currentStepIdx: -1,
  reasoningSummary: '',
  actionRecommendation: '',

  triggerThinking: (callback) => {
    if (get().isThinking) return;

    set({
      isThinking: true,
      currentStepIdx: 0,
      reasoningSummary: '',
      actionRecommendation: '',
    });

    let currentStep = 0;
    const interval = setInterval(() => {
      currentStep += 1;
      if (currentStep < THINKING_STEPS.length) {
        set({ currentStepIdx: currentStep });
      } else {
        clearInterval(interval);
        set({
          isThinking: false,
          currentStepIdx: THINKING_STEPS.length - 1,
          reasoningSummary:
            "I analyzed your active workload, calendar events, and communication updates. Your 'Research Paper Draft' task has a high deadline risk. If delayed by another hour, the success probability drops from 79% down to 48%, because your interview tomorrow afternoon leaves only 2.5 free hours.",
          actionRecommendation: "Start working on 'Research Paper Draft' immediately.",
        });
        if (callback) callback();
      }
    }, 450);
  },

  resetAIStore: () => {
    set({
      isThinking: false,
      currentStepIdx: -1,
      reasoningSummary: '',
      actionRecommendation: '',
    });
  },
}));
