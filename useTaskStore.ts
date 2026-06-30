import { create } from 'zustand';
import { mockTasks, Task } from '../data/mockTasks';
import { calculatePriority } from '../utils/priority';

export { Task };

interface TaskState {
  tasks: Task[];
  addTask: (task: Omit<Task, 'id' | 'createdAt' | 'priorityScore' | 'priorityBand' | 'status' | 'completionProbability' | 'deadlineRisk' | 'bestFocusTime' | 'energyRequired' | 'aiRecommendation' | 'impactScore' | 'confidenceScore' | 'taskBreakdown' | 'taskTimeline'> & { title: string }) => void;
  completeTask: (id: string) => void;
  deleteTask: (id: string) => void;
  deferTask: (id: string, days?: number) => void;
  delegateTask: (id: string, to: string) => void;
  dropTask: (id: string) => void;
  updateTask: (id: string, updates: Partial<Task>) => void;
  recalculateAllPriorities: () => void;
}

export const useTaskStore = create<TaskState>((set, get) => ({
  tasks: mockTasks,

  addTask: (taskData) => {
    const now = new Date();
    // Calculate initial priority based on properties
    const priorityResult = calculatePriority({
      deadline: taskData.deadline,
      senderImportance: taskData.senderName ? 'client' : 'self',
      keywords: taskData.tags,
      dependentTaskCount: taskData.dependencies?.length || 0,
      healthSafety: taskData.category === 'health',
      blocksOthers: false,
    });

    const newTask: Task = {
      ...taskData,
      id: `task-${Date.now()}`,
      createdAt: now.toISOString(),
      status: 'pending',
      priorityScore: priorityResult.score,
      priorityBand: priorityResult.band,
      completionProbability: 85, // Default prediction
      deadlineRisk: priorityResult.band === 'critical' ? 'critical' : priorityResult.band === 'high' ? 'high' : 'low',
      bestFocusTime: '10:00 AM',
      energyRequired: 'medium',
      aiRecommendation: 'Auto-prioritized based on threat matrices and due-date proximity.',
      impactScore: priorityResult.score,
      confidenceScore: 90,
      taskBreakdown: ['Verify requirements', 'Deliver core features', 'Check execution checklist'],
      taskTimeline: [
        { title: 'Task kick-off', duration: '15m', completed: false },
        { title: 'Task delivery', duration: '30m', completed: false },
      ],
    };

    set((state) => ({
      tasks: [newTask, ...state.tasks],
    }));
  },

  completeTask: (id) => {
    set((state) => ({
      tasks: state.tasks.map((task) =>
        task.id === id ? { ...task, status: 'completed' } : task
      ),
    }));
  },

  deleteTask: (id) => {
    set((state) => ({
      tasks: state.tasks.filter((task) => task.id !== id),
    }));
  },

  deferTask: (id, days = 1) => {
    set((state) => {
      return {
        tasks: state.tasks.map((task) => {
          if (task.id === id) {
            const currentDeadline = new Date(task.deadline);
            currentDeadline.setDate(currentDeadline.getDate() + days);
            
            // Recalculate priority with new deadline
            const priorityResult = calculatePriority({
              deadline: currentDeadline.toISOString(),
              senderImportance: task.senderName ? 'client' : 'self',
              keywords: task.tags,
              dependentTaskCount: task.dependencies?.length || 0,
            });

            return {
              ...task,
              deadline: currentDeadline.toISOString(),
              status: 'deferred',
              priorityScore: priorityResult.score,
              priorityBand: priorityResult.band,
            };
          }
          return task;
        }),
      };
    });
  },

  delegateTask: (id, to) => {
    set((state) => ({
      tasks: state.tasks.map((task) =>
        task.id === id
          ? { ...task, status: 'delegated', delegatedTo: to }
          : task
      ),
    }));
  },

  dropTask: (id) => {
    set((state) => ({
      tasks: state.tasks.map((task) =>
        task.id === id ? { ...task, status: 'dropped' } : task
      ),
    }));
  },

  updateTask: (id, updates) => {
    set((state) => ({
      tasks: state.tasks.map((task) => {
        if (task.id === id) {
          const merged = { ...task, ...updates };
          // If deadline updated, recalculate priority
          if (updates.deadline) {
            const priorityResult = calculatePriority({
              deadline: merged.deadline,
              senderImportance: merged.senderName ? 'client' : 'self',
              keywords: merged.tags,
              dependentTaskCount: merged.dependencies?.length || 0,
            });
            merged.priorityScore = priorityResult.score;
            merged.priorityBand = priorityResult.band;
          }
          return merged;
        }
        return task;
      }),
    }));
  },

  recalculateAllPriorities: () => {
    set((state) => ({
      tasks: state.tasks.map((task) => {
        if (task.status === 'completed' || task.status === 'dropped') return task;
        const priorityResult = calculatePriority({
          deadline: task.deadline,
          senderImportance: task.senderName ? 'client' : 'self',
          keywords: task.tags,
          dependentTaskCount: task.dependencies?.length || 0,
        });
        return {
          ...task,
          priorityScore: priorityResult.score,
          priorityBand: priorityResult.band,
        };
      }),
    }));
  },
}));
