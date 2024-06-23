'use client';

import { createContext, useState, useContext, SetStateAction } from 'react';

type Dashboard = {
  period: 'weekly' | 'monthly' | 'yearly';
};
type DashboardContext = {
  dashboard: Dashboard;
  setDashboard: React.Dispatch<SetStateAction<Dashboard>>;
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

  return (
    <dashboardContext.Provider
      value={{
        dashboard,
        setDashboard
      }}
    >
      {children}
    </dashboardContext.Provider>
  );
};

export const useDashboardContext = () => {
  return useContext(dashboardContext);
};
