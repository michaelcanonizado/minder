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

export type CategoryColor = {
  _id: string;
  name: string;
  code: {
    primary: string;
    secondary: string;
  };
};
export const categoryColors: CategoryColor[] = [
  {
    _id: '668a5c05f068446619fc56e1',
    name: 'Red',
    code: {
      primary: '#d90429',
      secondary: 'rgba(217, 4, 41, 0.1)'
    }
  },
  {
    _id: '668a5c3751cbabd9759cea8f',
    name: 'Orange',
    code: {
      primary: '#faa307',
      secondary: 'rgba(241, 135, 1, 0.1)'
    }
  },
  {
    _id: '668a5c3ce78fa2b3918c44bb',
    name: 'Yellow',
    code: {
      primary: '#ffe600',
      secondary: 'rgba(255, 230, 0, 0.1)'
    }
  },
  {
    _id: '668a5c41429830d9349e972f',
    name: 'Green',
    code: {
      primary: '#38b000',
      secondary: 'rgba(56, 176, 0, 0.1)'
    }
  },
  {
    _id: '668a5c459f7752dccb2ddf54',
    name: 'Blue',
    code: {
      primary: '#00a6fb',
      secondary: 'rgba(0, 166, 251, 0.1)'
    }
  },
  {
    _id: '668a5c4952ffe2a3434ef1e7',
    name: 'Purple',
    code: {
      primary: '#8900f2',
      secondary: 'rgba(137, 0, 242, 0.1)'
    }
  },
  {
    _id: '668a5c4bc42bed6e994a6b09',
    name: 'Brown',
    code: {
      primary: '#b76935',
      secondary: 'rgba(232, 93, 4, 0.1)'
    }
  },
  {
    _id: '668a5c4e923f1fd00ccb40c5',
    name: 'Pink',
    code: {
      primary: '#ff5d8f',
      secondary: 'rgba(255, 93, 143, 0.1)'
    }
  },
  {
    _id: '668a5c52bb2a6da584792972',
    name: 'Gray',
    code: {
      primary: '#adb5bd',
      secondary: 'rgba(173, 181, 189, 0.1)'
    }
  },
  {
    _id: '668a5c557dae2b411b1800b5',
    name: 'Turquoise',
    code: {
      primary: '#02c39a',
      secondary: 'rgba(2, 195, 154, 0.1)'
    }
  }
];
export type CategoryType = 'income' | 'expense';
export type CategoryChartData = {
  _id: string;
  name: string;
  color: CategoryColor;
  amount: number;
  rows: ExpenseType[] | IncomeType[];
  percentage: number;
  type: CategoryType;
};
