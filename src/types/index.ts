export type LinkItem = {
  name: string;
  href: string;
  icon?: React.ReactNode;
};
export type LinkItems = LinkItem[];

export type Period = 'weekly' | 'monthly' | 'yearly';

export type ChartRow = {
  amount: number;
  date: Date;
};
export type ChartData = {
  balance: {
    amount: number;
    percentageChange: {
      percentage: number;
      difference: number;
      isPositive: boolean;
    };
  };
  rows: ChartRow[];
};
