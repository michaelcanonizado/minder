'use client';

import { Period } from '@/types';
import { createContext, useState, useContext, SetStateAction } from 'react';

type Dashboard = {
  period: Period;
};
type DashboardContext = {
  dashboard: Dashboard;
  setDashboard: React.Dispatch<SetStateAction<Dashboard>>;
  changeDashboardPeriod: (period: Period) => void;
};

const defaultValues: Dashboard = {
  period: 'weekly'
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

  return (
    <dashboardContext.Provider
      value={{
        dashboard,
        setDashboard,
        changeDashboardPeriod
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
