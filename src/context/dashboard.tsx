'use client';

import { CategoryChartData, Period } from '@/types';
import { createContext, useState, useContext, SetStateAction } from 'react';

type Dashboard = {
  period: Period;
  selectedCategories: {
    income: CategoryChartData[] | [];
    expense: CategoryChartData[] | [];
  };
};
type DashboardContext = {
  dashboard: Dashboard;
  setDashboard: React.Dispatch<SetStateAction<Dashboard>>;
  changeDashboardPeriod: (period: Period) => void;
  changeDashboardSelectedCategories: (
    data: CategoryChartData[],
    type: 'income' | 'expense'
  ) => void;
};

const defaultValues: Dashboard = {
  period: 'weekly',
  selectedCategories: {
    income: [],
    expense: []
  }
};

const dashboardContext = createContext<DashboardContext | null>(null);

export const DashboardContextProvider = ({
  children
}: {
  children: React.ReactNode;
}) => {
  const [dashboard, setDashboard] = useState<Dashboard>(defaultValues);

  const changeDashboardPeriod = (period: Period) => {
    setDashboard(prevState => {
      return { ...prevState, period: period };
    });
  };

  const changeDashboardSelectedCategories = (
    data: CategoryChartData[],
    type: 'income' | 'expense'
  ) => {
    if (type === 'income') {
      setDashboard(prevState => {
        return {
          ...prevState,
          selectedCategories: {
            expense: prevState.selectedCategories.expense,
            income: data
          }
        };
      });
    } else if (type === 'expense') {
      setDashboard(prevState => {
        return {
          ...prevState,
          selectedCategories: {
            income: prevState.selectedCategories.income,
            expense: data
          }
        };
      });
    }
  };

  return (
    <dashboardContext.Provider
      value={{
        dashboard,
        setDashboard,
        changeDashboardPeriod,
        changeDashboardSelectedCategories
      }}
    >
      {children}
    </dashboardContext.Provider>
  );
};

export const useDashboardContext = () => {
  const context = useContext(dashboardContext);
  if (!context) {
    throw new Error(
      'useDashboardContext must be within a <DashboardContextProvider/>'
    );
  }
  return context;
};
