'use client';

import Bento from '@/components/sections/bento';
import { useDashboardContext } from '@/context/dashboard-context';

const Expense = () => {
  const userId = process.env.TEMP_USER_ID!;

  const { dashboard, changeDashboardPeriod } = useDashboardContext();

  console.log('Expense component rerender');

  return (
    <Bento.Box>
      <Bento.Box.Header>Expense {dashboard.period}</Bento.Box.Header>
      <Bento.Box.Content>Graph</Bento.Box.Content>
    </Bento.Box>
  );
};

export default Expense;
