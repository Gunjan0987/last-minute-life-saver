import { create } from 'zustand';
import {
  DailyProductivity,
  HourlyProductivity,
  WeeklyReport,
  dailyProductivity,
  hourlyProductivity,
  weeklyReport,
} from '../data/mockAnalytics';

interface AnalyticsState {
  burnoutScore: number;
  weeklyReport: WeeklyReport;
  dailyData: DailyProductivity[];
  hourlyData: HourlyProductivity[];
  getWeeklyReport: () => WeeklyReport;
  updateBurnout: (score: number) => void;
}

export const useAnalyticsStore = create<AnalyticsState>((set, get) => ({
  burnoutScore: dailyProductivity[dailyProductivity.length - 1].burnoutScore,
  weeklyReport: weeklyReport,
  dailyData: dailyProductivity,
  hourlyData: hourlyProductivity,

  getWeeklyReport: () => {
    return get().weeklyReport;
  },

  updateBurnout: (score) => {
    set((state) => {
      const updatedDailyData = [...state.dailyData];
      if (updatedDailyData.length > 0) {
        updatedDailyData[updatedDailyData.length - 1] = {
          ...updatedDailyData[updatedDailyData.length - 1],
          burnoutScore: score,
        };
      }
      return {
        burnoutScore: score,
        dailyData: updatedDailyData,
      };
    });
  },
}));
