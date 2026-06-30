import { create } from 'zustand';
import { Task, useTaskStore } from './useTaskStore';
import { useAnalyticsStore } from './useAnalyticsStore';
import { checkRescueTriggers, autoTriage, TriageAction } from '../utils/rescue';

interface RescueState {
  status: 'idle' | 'triggered' | 'active' | 'resolved';
  triageQueue: Task[];
  triageProgress: { current: number; total: number };
  activateRescue: () => void;
  deactivateRescue: () => void;
  triageTask: (id: string, action: TriageAction, details?: any) => void;
  checkTriggers: () => void;
}

export const useRescueStore = create<RescueState>((set, get) => ({
  status: 'idle',
  triageQueue: [],
  triageProgress: { current: 0, total: 0 },

  activateRescue: () => {
    // Grab pending tasks from useTaskStore
    const pendingTasks = useTaskStore.getState().tasks.filter(
      (t) => t.status === 'pending' || t.status === 'in-progress'
    );
    // Sort tasks or get triage list
    const sorted = [...pendingTasks].sort((a, b) => b.priorityScore - a.priorityScore);
    
    set({
      status: 'active',
      triageQueue: sorted,
      triageProgress: { current: 0, total: sorted.length },
    });
  },

  deactivateRescue: () => {
    set({
      status: 'resolved',
      triageQueue: [],
      triageProgress: { current: 0, total: 0 },
    });
  },

  triageTask: (id, action, details) => {
    const { completeTask, deferTask, delegateTask, dropTask } = useTaskStore.getState();

    // Perform action in TaskStore
    if (action === 'mustDo') {
      // Keep it in pending but high priority
      // (No-op or mark in-progress)
    } else if (action === 'defer') {
      deferTask(id, details?.days || 1);
    } else if (action === 'delegate') {
      delegateTask(id, details?.to || 'team-3'); // Default to Jake Williams
    } else if (action === 'drop') {
      dropTask(id);
    }

    set((state) => {
      const nextQueue = state.triageQueue.filter((t) => t.id !== id);
      const nextCurrent = state.triageProgress.current + 1;
      const nextStatus = nextQueue.length === 0 ? 'resolved' : state.status;

      return {
        triageQueue: nextQueue,
        triageProgress: {
          current: nextCurrent,
          total: state.triageProgress.total,
        },
        status: nextStatus,
      };
    });
  },

  checkTriggers: () => {
    const tasks = useTaskStore.getState().tasks;
    const burnoutScore = useAnalyticsStore.getState().burnoutScore;
    
    // Simulate some meeting count and urgent message count
    const urgentMessages = 3;
    const meetings = 2;

    const triggers = checkRescueTriggers(tasks, burnoutScore, urgentMessages, meetings);
    const triggeredCount = triggers.filter(t => t.isTriggered).length;
    
    if (triggeredCount >= 2 && get().status === 'idle') {
      set({ status: 'triggered' });
    }
  },
}));
