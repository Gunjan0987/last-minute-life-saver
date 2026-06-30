import { create } from 'zustand';

interface Permissions {
  messageScanning: boolean;
  locationTracking: boolean;
  calendarIntegration: boolean;
  dataAnalytics: boolean;
  aiVoiceAssistant: boolean;
  autoScheduling: boolean;
  burnoutAnalytics: boolean;
}

interface SettingsState {
  permissions: Permissions;
  workHours: { start: string; end: string };
  timeBasedLocks: {
    workHoursOnly: boolean;
    muteAfterHours: boolean;
    weekendMute: boolean;
    vacationMode: boolean;
  };
  togglePermission: (key: keyof Permissions) => void;
  setWorkHours: (start: string, end: string) => void;
  toggleTimeBasedLock: (key: keyof SettingsState['timeBasedLocks']) => void;
}

export const useSettingsStore = create<SettingsState>((set) => ({
  permissions: {
    messageScanning: true,
    locationTracking: true,
    calendarIntegration: true,
    dataAnalytics: true,
    aiVoiceAssistant: true,
    autoScheduling: true,
    burnoutAnalytics: true,
  },
  workHours: { start: '09:00', end: '18:00' },
  timeBasedLocks: {
    workHoursOnly: false,
    muteAfterHours: true,
    weekendMute: true,
    vacationMode: false,
  },

  togglePermission: (key) => {
    set((state) => ({
      permissions: {
        ...state.permissions,
        [key]: !state.permissions[key],
      },
    }));
  },

  setWorkHours: (start, end) => {
    set({ workHours: { start, end } });
  },

  toggleTimeBasedLock: (key) => {
    set((state) => ({
      timeBasedLocks: {
        ...state.timeBasedLocks,
        [key]: !state.timeBasedLocks[key],
      },
    }));
  },
}));
