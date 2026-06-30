import { create } from 'zustand';
import { getAIResponse } from '../data/aiResponses';
import { useTaskStore } from './useTaskStore';
import { useAnalyticsStore } from './useAnalyticsStore';

export interface ChatMessage {
  id: string;
  text: string;
  sender: 'user' | 'ai';
  timestamp: string;
  type?: 'text' | 'task-card' | 'schedule' | 'insight';
}

interface ChatState {
  messages: ChatMessage[];
  sendMessage: (text: string) => void;
  clearChat: () => void;
}

export const useChatStore = create<ChatState>((set, get) => ({
  messages: [
    {
      id: 'welcome',
      text: "Hello! I'm your AI Executive Assistant. 🤖\n\nI can help you manage tasks, suggest optimal schedules, track goals, or activate Rescue Mode if things are getting overwhelming. Try asking 'Plan my day' or 'What should I focus on?'.",
      sender: 'ai',
      timestamp: new Date().toISOString(),
      type: 'text',
    },
  ],

  sendMessage: (text) => {
    const userMessage: ChatMessage = {
      id: `msg-${Date.now()}-user`,
      text,
      sender: 'user',
      timestamp: new Date().toISOString(),
      type: 'text',
    };

    set((state) => ({
      messages: [...state.messages, userMessage],
    }));

    // Generate AI response
    setTimeout(() => {
      const taskStore = useTaskStore.getState();
      const analyticsStore = useAnalyticsStore.getState();
      
      const context = {
        burnoutScore: analyticsStore.burnoutScore,
        taskCount: taskStore.tasks.filter(t => t.status === 'pending').length,
        completedToday: taskStore.tasks.filter(t => t.status === 'completed').length,
        overdueTasks: taskStore.tasks.filter(t => {
          const deadline = new Date(t.deadline);
          return t.status === 'pending' && deadline < new Date();
        }).length,
      };

      const aiReplyText = getAIResponse(text, context);

      const aiMessage: ChatMessage = {
        id: `msg-${Date.now()}-ai`,
        text: aiReplyText,
        sender: 'ai',
        timestamp: new Date().toISOString(),
        type: 'text',
      };

      set((state) => ({
        messages: [...state.messages, aiMessage],
      }));
    }, 1000);
  },

  clearChat: () => {
    set({
      messages: [
        {
          id: 'welcome',
          text: "Hello! I'm your AI Executive Assistant. 🤖\n\nI can help you manage tasks, suggest optimal schedules, track goals, or activate Rescue Mode if things are getting overwhelming.",
          sender: 'ai',
          timestamp: new Date().toISOString(),
          type: 'text',
        },
      ],
    });
  },
}));
