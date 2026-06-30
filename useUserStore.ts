import { create } from 'zustand';

interface Goal {
  id: string;
  title: string;
  category: string;
  targetDate: string;
  progress: number; // 0-100
  subgoals?: { title: string; completed: boolean }[];
}

interface Habit {
  id: string;
  title: string;
  frequency: string; // e.g. '4x/week', 'daily'
  streak: number;
  completedDays: string[]; // ISO Date strings (YYYY-MM-DD)
  icon: string;
}

interface UserProfile {
  name: string;
  email: string;
  avatar: string; // emoji
}

interface UserState {
  user: UserProfile;
  isOnboarded: boolean;
  goals: Goal[];
  habits: Habit[];
  setOnboarded: (val: boolean) => void;
  updateProfile: (updates: Partial<UserProfile>) => void;
  addGoal: (goal: Omit<Goal, 'id' | 'progress'>) => void;
  addHabit: (habit: Omit<Habit, 'id' | 'streak' | 'completedDays'>) => void;
  toggleHabit: (id: string, dateStr: string) => void;
}

export const useUserStore = create<UserState>((set) => ({
  user: {
    name: 'Birendra',
    email: 'birendra@life-saver.ai',
    avatar: '🚀',
  },
  isOnboarded: false,
  goals: [
    {
      id: 'g-1',
      title: 'Become technical leader',
      category: 'career',
      targetDate: '2026-12-31',
      progress: 35,
      subgoals: [
        { title: 'Read 20 tech design articles', completed: true },
        { title: 'Own system design for project Alpha', completed: false },
        { title: 'Mentor a junior engineer', completed: false },
      ],
    },
    {
      id: 'g-2',
      title: 'Ship 2 major features in Q3',
      category: 'work',
      targetDate: '2026-09-30',
      progress: 40,
      subgoals: [
        { title: 'Feature 1 release', completed: true },
        { title: 'Feature 2 release', completed: false },
      ],
    },
  ],
  habits: [
    {
      id: 'h-1',
      title: 'Exercise 4x/week',
      frequency: '4x/week',
      streak: 5,
      completedDays: [],
      icon: '🏋️',
    },
    {
      id: 'h-2',
      title: 'No emails after 7 PM',
      frequency: 'daily',
      streak: 0,
      completedDays: [],
      icon: '📵',
    },
    {
      id: 'h-3',
      title: 'Journal 5 min/day',
      frequency: 'daily',
      streak: 3,
      completedDays: [],
      icon: '📝',
    },
  ],

  setOnboarded: (val) => set({ isOnboarded: val }),

  updateProfile: (updates) =>
    set((state) => ({ user: { ...state.user, ...updates } })),

  addGoal: (goalData) => {
    const newGoal: Goal = {
      ...goalData,
      id: `g-${Date.now()}`,
      progress: 0,
    };
    set((state) => ({ goals: [...state.goals, newGoal] }));
  },

  addHabit: (habitData) => {
    const newHabit: Habit = {
      ...habitData,
      id: `h-${Date.now()}`,
      streak: 0,
      completedDays: [],
    };
    set((state) => ({ habits: [...state.habits, newHabit] }));
  },

  toggleHabit: (id, dateStr) => {
    set((state) => ({
      habits: state.habits.map((h) => {
        if (h.id === id) {
          const exists = h.completedDays.includes(dateStr);
          let newDays = [];
          if (exists) {
            newDays = h.completedDays.filter((d) => d !== dateStr);
          } else {
            newDays = [...h.completedDays, dateStr];
          }

          // Calculate simple streak based on today & yesterday
          let streak = h.streak;
          if (exists) {
            streak = Math.max(0, streak - 1);
          } else {
            streak += 1;
          }

          return {
            ...h,
            completedDays: newDays,
            streak,
          };
        }
        return h;
      }),
    }));
  },
}));
