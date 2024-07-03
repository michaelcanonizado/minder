import { ExpenseType } from '@/models/expense';
import { IncomeType } from '@/models/income';

export type LinkItem = {
  name: string;
  href: string;
  icon?: React.ReactNode;
};
export type LinkItems = LinkItem[];
export type LinkGroup = {
  name: string;
  links: LinkItems;
};

export type Period = 'weekly' | 'monthly' | 'yearly';
export type PeriodDates = {
  startDate: Date;
  endDate: Date;
};

export type ChartRow = {
  amount: number;
  date: Date & string;
};
export type ChartData = {
  balance: {
    amount: {
      current: number;
      previous: number;
    };
    percentageChange: {
      percentage: number;
      difference: number;
      isPositive: boolean;
    };
  };
  dates: {
    start: Date;
    end: Date;
  };
  rows: ChartRow[];
};

export type CategoryChartData = {
  _id: string;
  name: string;
  color: string;
  amount: number;
  rows: ExpenseType[] | IncomeType[];
  percentage: number;
};
